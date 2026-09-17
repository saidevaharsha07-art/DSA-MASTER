/**
 * Interview Arena Engine & Session Service (Phase 12)
 * Orchestrates multi-problem timed interview sessions, sandboxed code execution,
 * telemetry recording, factual report generation, weakness targeting, and user-isolated history.
 */

import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel } from '@/src/curriculum/types';
import { TemplateService } from '@/src/problems/services/template.service';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';
import { judgeEngine } from '@/src/engines/judge';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { EventBus } from '@/src/core/events/event-bus';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import {
  InterviewConfig,
  InterviewArenaSession,
  InterviewArenaProblemAttempt,
  InterviewArenaReport,
  InterviewHistoryRecord,
  InterviewLanguage,
} from '../types/interview.types';

const STORAGE_KEY_HISTORY_PREFIX = 'dsa-interview-history-v1';

export class InterviewArenaService {
  private static activeSessions: Map<string, InterviewArenaSession> = new Map();
  private static memoryHistory: Map<string, InterviewHistoryRecord[]> = new Map();

  private static getHistoryStorageKey(userId: string): string {
    return `${STORAGE_KEY_HISTORY_PREFIX}_${userId || 'default_user'}`;
  }

  /**
   * Selects balanced problems matching config criteria & optional user weakness data.
   */
  public static selectProblems(config: InterviewConfig, userId = 'default_user'): ProblemModel[] {
    const allProblems = CurriculumRepository.getAllProblems();
    if (!allProblems || allProblems.length === 0) return [];

    let filtered = [...allProblems];

    // Filter by Topic Type
    if (config.type === 'Arrays & Hashing') {
      filtered = filtered.filter(
        (p) =>
          p.categorySlug === 'beginnings' ||
          p.categoryTitle?.toLowerCase().includes('array') ||
          p.patternId?.toLowerCase().includes('hash') ||
          p.patternId?.toLowerCase().includes('array')
      );
    } else if (config.type === 'Trees & Graphs') {
      filtered = filtered.filter(
        (p) =>
          p.categorySlug?.includes('tree') ||
          p.categorySlug?.includes('graph') ||
          p.categoryTitle?.toLowerCase().includes('tree') ||
          p.categoryTitle?.toLowerCase().includes('graph') ||
          p.patternId?.toLowerCase().includes('traversal') ||
          p.patternId?.toLowerCase().includes('bfs') ||
          p.patternId?.toLowerCase().includes('dfs')
      );
    } else if (config.type === 'Dynamic Programming') {
      filtered = filtered.filter(
        (p) =>
          p.categorySlug?.includes('dynamic') ||
          p.categoryTitle?.toLowerCase().includes('dynamic') ||
          p.patternId?.toLowerCase().includes('dp') ||
          p.patternId?.toLowerCase().includes('memo') ||
          p.patternId?.toLowerCase().includes('subproblem')
      );
    } else if (config.type === 'Mixed Patterns') {
      filtered = allProblems;
    }

    if (filtered.length === 0) {
      filtered = allProblems;
    }

    // Incorporate Weakness Targeting if requested
    if (config.useWeakness && userId) {
      try {
        const attempts = AdaptiveDataAdapterService.getCanonicalAttempts(userId);
        const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
        const weakness = WeaknessAnalyzer.analyze(attempts, profile);
        if (weakness.weakTopics.length > 0) {
          const weakTitles = weakness.weakTopics.map((w) => w.topic.toLowerCase());
          const weaknessProblems = filtered.filter((p) =>
            weakTitles.some(
              (wt) =>
                (p.categoryTitle && p.categoryTitle.toLowerCase().includes(wt)) ||
                (p.patternId && p.patternId.toLowerCase().includes(wt))
            )
          );
          if (weaknessProblems.length >= config.problemCount) {
            filtered = weaknessProblems;
          }
        }
      } catch (e) {
        // Fallback gracefully to normal filtered pool
      }
    }

    // Filter / Sort by Difficulty (ProgressionLevel: 'Learn' | 'Practice' | 'Master')
    const easyProblems = filtered.filter((p) => p.level === 'Learn');
    const medProblems = filtered.filter((p) => p.level === 'Practice');
    const hardProblems = filtered.filter((p) => p.level === 'Master');

    const selected: ProblemModel[] = [];
    const count = config.problemCount;

    if (config.difficulty === 'Easy') {
      const pool = easyProblems.length >= count ? easyProblems : filtered;
      selected.push(...this.pickRandom(pool, count));
    } else if (config.difficulty === 'Medium') {
      const pool = medProblems.length >= count ? medProblems : filtered;
      selected.push(...this.pickRandom(pool, count));
    } else if (config.difficulty === 'Hard') {
      const pool = hardProblems.length >= count ? hardProblems : filtered;
      selected.push(...this.pickRandom(pool, count));
    } else {
      // Mixed Difficulty distribution
      if (count === 1) {
        selected.push(...this.pickRandom(medProblems.length > 0 ? medProblems : filtered, 1));
      } else if (count === 2) {
        selected.push(...this.pickRandom(easyProblems.length > 0 ? easyProblems : filtered, 1));
        selected.push(...this.pickRandom(medProblems.length > 0 ? medProblems : filtered, 1));
      } else if (count === 3) {
        selected.push(...this.pickRandom(easyProblems.length > 0 ? easyProblems : filtered, 1));
        selected.push(...this.pickRandom(medProblems.length > 0 ? medProblems : filtered, 1));
        selected.push(...this.pickRandom(hardProblems.length > 0 ? hardProblems : medProblems, 1));
      } else {
        selected.push(...this.pickRandom(easyProblems.length > 0 ? easyProblems : filtered, 1));
        selected.push(...this.pickRandom(medProblems.length > 0 ? medProblems : filtered, 2));
        selected.push(...this.pickRandom(hardProblems.length > 0 ? hardProblems : medProblems, 1));
      }
    }

    // Fallback if needed
    while (selected.length < count) {
      const remaining = allProblems.filter((p) => !selected.some((s) => s.id === p.id));
      if (remaining.length === 0) break;
      selected.push(remaining[Math.floor(Math.random() * remaining.length)]);
    }

    return selected.slice(0, count);
  }

  private static pickRandom<T>(array: T[], n: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  }

  /**
   * Initializes a new live interview session.
   */
  public static createSession(config: InterviewConfig, userId = 'default_user'): InterviewArenaSession {
    const selectedProblems = this.selectProblems(config, userId);
    const sessionId = `arena_sess_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date();
    const durationSeconds = config.durationMinutes * 60;
    const expiresAt = new Date(now.getTime() + durationSeconds * 1000).toISOString();

    const problemAttempts: InterviewArenaProblemAttempt[] = selectedProblems.map((prob) => {
      const detail = getProblemDetailInfo(prob);
      const starterCode = TemplateService.getTemplate(prob.slug || prob.id, config.language) ||
        `// Solution for ${prob.title}\nfunction solve() {\n  // Write your code here\n}\n`;

      return {
        problemId: prob.id,
        title: prob.title,
        difficulty: prob.level === 'Learn' ? 'Easy' : prob.level === 'Master' ? 'Hard' : 'Medium',
        pattern: prob.patternId || prob.categoryTitle || 'Algorithms',
        categorySlug: prob.categorySlug || 'general',
        description: detail.statement || `Implement an optimal solution for ${prob.title}.`,
        examples: (detail.examples || []).map((ex) => ({
          input: ex.input,
          output: ex.output,
          explanation: ex.explanation,
        })),
        constraints: detail.constraints || ['1 <= n <= 10^5', 'Time Limit: 2.0s'],
        hints: detail.hints || ['Consider optimal time and space complexity constraints.'],
        starterCode,
        userCode: starterCode,
        language: config.language,
        status: 'unattempted',
        attemptsCount: 0,
        timeSpentSeconds: 0,
        testcasesPassed: 0,
        totalTestcases: 0,
      };
    });

    const session: InterviewArenaSession = {
      id: sessionId,
      userId,
      config,
      startedAt: now.toISOString(),
      expiresAt,
      durationSeconds,
      problems: problemAttempts,
      activeProblemIndex: 0,
      status: 'in_progress',
    };

    this.activeSessions.set(sessionId, session);
    return session;
  }

  public static getSession(sessionId: string): InterviewArenaSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  public static updateProblemCode(
    sessionId: string,
    problemIndex: number,
    code: string,
    language?: InterviewLanguage
  ): void {
    const session = this.activeSessions.get(sessionId);
    if (!session || !session.problems[problemIndex]) return;

    session.problems[problemIndex].userCode = code;
    if (language) {
      session.problems[problemIndex].language = language;
    }
  }

  /**
   * Executes sample testcases (Run Code) inside the local sandbox.
   */
  public static async executeRun(
    problemId: string,
    code: string,
    language: InterviewLanguage
  ): Promise<{
    status: string;
    stdout: string;
    stderr: string;
    runtimeMs: number;
    memoryMb: number;
    passedTestcases: number;
    totalTestcases: number;
  }> {
    let res: any;
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problemId, language, code }),
      });
      res = await response.json();
    } else {
      const { judgeEvaluator } = await import('@/src/services/judge/evaluator');
      res = await judgeEvaluator.evaluateRun({
        problemId,
        language: language as any,
        code,
      });
    }

    return {
      status: res.status || 'runtime_error',
      stdout: res.stdout || '',
      stderr: res.stderr || res.compileOutput || '',
      runtimeMs: res.runtimeMs ?? 0,
      memoryMb: res.memoryMb ?? 0,
      passedTestcases: res.passedTestcases ?? res.testcasesPassed ?? 0,
      totalTestcases: res.totalTestcases ?? 0,
    };
  }

  /**
   * Submits a problem solution within the interview, updates attempts, and records telemetry.
   */
  public static async submitSolution(
    sessionId: string,
    problemIndex: number,
    code: string,
    language: InterviewLanguage,
    userId = 'default_user'
  ): Promise<{
    session: InterviewArenaSession;
    verdict: string;
    passed: boolean;
    runtimeMs: number;
    memoryMb: number;
    testcasesPassed: number;
    totalTestcases: number;
    outputDetails: string;
  }> {
    const session = this.activeSessions.get(sessionId);
    if (!session || !session.problems[problemIndex]) {
      throw new Error('Invalid interview session or problem index');
    }

    const currentAttempt = session.problems[problemIndex];
    currentAttempt.userCode = code;
    currentAttempt.language = language;
    currentAttempt.attemptsCount += 1;

    let evalResult: any;
    if (typeof window !== 'undefined') {
      const response = await fetch('/api/judge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({
          problemId: currentAttempt.problemId,
          language,
          code,
          userId,
        }),
      });
      evalResult = await response.json();
    } else {
      const { judgeEvaluator } = await import('@/src/services/judge/evaluator');
      evalResult = await judgeEvaluator.evaluateSubmit({
        problemId: currentAttempt.problemId,
        language: language as any,
        code,
        userId,
      });
    }

    const isPassed = evalResult.verdict === 'Accepted';
    currentAttempt.status = isPassed ? 'passed' : 'failed';
    currentAttempt.lastVerdict = evalResult.verdict || 'Evaluation Error';

    currentAttempt.runtimeMs = evalResult.runtimeMs ?? 0;
    currentAttempt.memoryMb = evalResult.memoryMb ?? 0;
    currentAttempt.testcasesPassed = evalResult.testcasesPassed ?? 0;
    currentAttempt.totalTestcases = evalResult.totalTestcases ?? 0;
    currentAttempt.lastOutput = evalResult.errorLog || evalResult.stderr || '';

    // Record submission to JudgeEngine for historical tracking
    judgeEngine.recordSubmission(
      {
        problemId: currentAttempt.problemId,
        language,
        verdict: currentAttempt.lastVerdict as any,
        runtimeMs: evalResult.runtimeMs ?? 0,
        memoryMb: evalResult.memoryMb ?? 0,
        codeSnapshot: code,
        testcasesPassed: evalResult.testcasesPassed ?? 0,
        totalTestcases: evalResult.totalTestcases ?? 0,
        xpEarned: 0, // No double XP awarded in interview mode
      },
      userId
    );

    // If failed, record to EventBus so Mistake Intelligence captures the struggle event
    if (!isPassed) {
      EventBus.publish('ProblemFailed', {
        userId,
        problemId: currentAttempt.problemId,
        platform: 'leetcode',
        status: 'failed',
        topic: currentAttempt.pattern,
        pattern: currentAttempt.pattern,
        difficulty: currentAttempt.difficulty,
        durationSeconds: currentAttempt.timeSpentSeconds,
        timestamp: new Date().toISOString(),
        xpEarned: 0,
      });
    }

    return {
      session: { ...session },
      verdict: currentAttempt.lastVerdict || 'Evaluation Error',
      passed: isPassed,
      runtimeMs: evalResult.runtimeMs ?? 0,
      memoryMb: evalResult.memoryMb ?? 0,
      testcasesPassed: evalResult.testcasesPassed ?? 0,
      totalTestcases: evalResult.totalTestcases ?? 0,
      outputDetails: currentAttempt.lastOutput || '',
    };
  }

  /**
   * Finalizes the interview session, computes data-grounded report, and persists history.
   */
  public static finishSession(
    sessionId: string,
    userId = 'default_user',
    status: 'completed' | 'expired' = 'completed'
  ): InterviewArenaReport {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error(`Interview session '${sessionId}' not found.`);
    }

    const now = new Date();
    session.status = status;
    session.completedAt = now.toISOString();

    const elapsedSeconds = Math.min(
      session.durationSeconds,
      Math.max(1, Math.round((now.getTime() - new Date(session.startedAt).getTime()) / 1000))
    );

    const totalProblems = session.problems.length;
    const passedProblems = session.problems.filter((p) => p.status === 'passed').length;
    const failedProblems = session.problems.filter((p) => p.status === 'failed').length;

    const totalAttempts = session.problems.reduce((acc, p) => acc + p.attemptsCount, 0);

    // 1. Calculate Grounded Performance Metrics
    const accuracy = totalAttempts > 0 ? Math.round((passedProblems / totalAttempts) * 100) : 0;
    const problemSolving = Math.round((passedProblems / totalProblems) * 100);

    // Time Management: ratio of problems completed within time allowance
    const timeRatio = elapsedSeconds / session.durationSeconds;
    let timeManagement = 70;
    if (passedProblems === totalProblems && timeRatio <= 0.8) {
      timeManagement = 95;
    } else if (passedProblems === totalProblems) {
      timeManagement = 85;
    } else if (passedProblems > 0) {
      timeManagement = Math.max(40, Math.round(75 - timeRatio * 25));
    } else {
      timeManagement = 30;
    }

    // Pattern Recognition: rewarded for fast, low-attempt passes
    let patternRecognition = 50;
    if (passedProblems > 0) {
      const avgAttemptsPerPass = totalAttempts / passedProblems;
      patternRecognition = avgAttemptsPerPass === 1 ? 95 : avgAttemptsPerPass <= 2 ? 80 : 65;
    } else if (failedProblems > 0) {
      patternRecognition = 40;
    }

    // Consistency: whether attempts were methodical
    const consistency = Math.round((accuracy * 0.5) + (problemSolving * 0.5));

    const overallScore = Math.round(
      problemSolving * 0.4 +
      accuracy * 0.2 +
      timeManagement * 0.2 +
      patternRecognition * 0.2
    );

    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
    let verdict = 'Needs Structured Practice';

    if (overallScore >= 90) {
      grade = 'A+';
      verdict = 'Strong Candidate — Ready for Technical Rounds';
    } else if (overallScore >= 80) {
      grade = 'A';
      verdict = 'Interview Ready — Solid Problem Solving Baseline';
    } else if (overallScore >= 70) {
      grade = 'B';
      verdict = 'Developing — Good Progress with Minor Edge Case Gaps';
    } else if (overallScore >= 55) {
      grade = 'C';
      verdict = 'Needs Revision — Review Core Patterns & Timing';
    } else if (overallScore >= 40) {
      grade = 'D';
      verdict = 'Foundational Gaps — Focus on Core Algorithm Templates';
    }

    // 2. Build Grounded Factual Feedback
    const whatWentWell: string[] = [];
    const whatNeedsWork: string[] = [];
    const recommendedNextSteps: Array<{ title: string; type: 'practice' | 'revision'; url: string; reason: string }> = [];

    session.problems.forEach((p, idx) => {
      const timeMins = Math.max(1, Math.round(p.timeSpentSeconds / 60));
      if (p.status === 'passed') {
        if (p.attemptsCount === 1) {
          whatWentWell.push(`Solved Problem ${idx + 1} (${p.title}) cleanly on the first submission in ${timeMins} min.`);
        } else {
          whatWentWell.push(`Passed all test cases for Problem ${idx + 1} (${p.title}) after ${p.attemptsCount} iterations.`);
        }
      } else if (p.status === 'failed') {
        whatNeedsWork.push(`Problem ${idx + 1} (${p.title}) failed with verdict: ${p.lastVerdict || 'Failed'}. (${p.attemptsCount} attempts recorded)`);
        recommendedNextSteps.push({
          title: `Practice ${p.pattern}`,
          type: 'practice',
          url: `/practice/${p.categorySlug}`,
          reason: `Reinforce ${p.pattern} edge cases and time constraints after interview difficulty.`,
        });
      } else {
        whatNeedsWork.push(`Problem ${idx + 1} (${p.title}) remained unattempted due to time limits.`);
      }
    });

    if (whatWentWell.length === 0) {
      whatWentWell.push('Demonstrated persistence under timed interview conditions.');
    }

    if (whatNeedsWork.length === 0) {
      whatNeedsWork.push('No significant algorithmic friction detected during this interview.');
    }

    if (recommendedNextSteps.length === 0) {
      recommendedNextSteps.push({
        title: 'Review Spaced Repetition Concepts',
        type: 'revision',
        url: '/revision',
        reason: 'Keep active recall fresh for interview patterns.',
      });
    }

    // AI Mentor Query Context
    const mentorContext = `I just completed a ${session.config.durationMinutes}-minute ${session.config.type} interview on DSA MASTER. I solved ${passedProblems} of ${totalProblems} problems with an overall score of ${overallScore}% (${grade}). What should I focus on next?`;

    const report: InterviewArenaReport = {
      id: `report_${sessionId}`,
      sessionId,
      userId,
      date: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      interviewType: session.config.type,
      difficulty: session.config.difficulty,
      durationSeconds: session.durationSeconds,
      timeUsedSeconds: elapsedSeconds,
      overallScore,
      grade,
      verdict,
      metrics: {
        accuracy,
        problemSolving,
        timeManagement,
        patternRecognition,
        consistency,
      },
      problemBreakdown: session.problems.map((p) => ({
        problemId: p.problemId,
        title: p.title,
        difficulty: p.difficulty,
        pattern: p.pattern,
        result: p.status === 'passed' ? 'Passed' : p.status === 'failed' ? 'Failed' : 'Incomplete',
        attempts: p.attemptsCount,
        timeSpentMinutes: Math.max(1, Math.round(p.timeSpentSeconds / 60)),
        testcasesPassed: p.testcasesPassed || 0,
        totalTestcases: p.totalTestcases || 0,
      })),
      whatWentWell,
      whatNeedsWork,
      recommendedNextSteps,
      mentorQueryContext: mentorContext,
    };

    session.report = report;

    // Persist to user-isolated interview history
    this.saveInterviewToHistory(userId, report, session);

    // Notify application EventBus
    EventBus.publish('ContestCompleted', {
      userId,
      contestId: sessionId,
      score: overallScore,
      problemsSolved: passedProblems,
      totalProblems,
      durationSeconds: elapsedSeconds,
      timestamp: now.toISOString(),
    });

    return report;
  }

  /**
   * Saves completed interview to user-scoped storage.
   */
  private static saveInterviewToHistory(
    userId: string,
    report: InterviewArenaReport,
    session: InterviewArenaSession
  ): void {
    if (!userId || userId === 'guest') return;

    const key = this.getHistoryStorageKey(userId);
    const existing = this.getHistory(userId);

    const historyRecord: InterviewHistoryRecord = {
      id: report.id,
      userId,
      date: report.date,
      type: report.interviewType,
      difficulty: report.difficulty,
      score: report.overallScore,
      grade: report.grade,
      durationMinutes: Math.round(report.durationSeconds / 60),
      timeUsedMinutes: Math.max(1, Math.round(report.timeUsedSeconds / 60)),
      problemsCompleted: session.problems.filter((p) => p.status === 'passed').length,
      totalProblems: session.problems.length,
      report,
    };

    const updated = [historyRecord, ...existing.filter((h) => h.id !== report.id)].slice(0, 50); // Keep last 50
    this.memoryHistory.set(userId, updated);
    storage.save(key, updated);

    // Sync to durable server bridge
    serverPersistenceBridge
      .saveDurableData('interview_history', userId, updated)
      .catch(() => {});
  }

  /**
   * Retrieves past interviews for a user (strictly isolated).
   */
  public static getHistory(userId = 'default_user'): InterviewHistoryRecord[] {
    if (!userId || userId === 'guest') return [];
    if (this.memoryHistory.has(userId)) {
      return this.memoryHistory.get(userId)!;
    }
    const key = this.getHistoryStorageKey(userId);
    const stored = storage.get<InterviewHistoryRecord[]>(key);
    if (stored) {
      this.memoryHistory.set(userId, stored);
      return stored;
    }
    return [];
  }

  /**
   * Returns a sample report for public / guest exploration without writing user data.
   */
  public static getSampleReport(): InterviewArenaReport {
    return {
      id: 'report_sample_preview',
      sessionId: 'sess_sample_preview',
      userId: 'guest',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      interviewType: 'Mixed Patterns',
      difficulty: 'Medium',
      durationSeconds: 2700,
      timeUsedSeconds: 2160,
      overallScore: 84,
      grade: 'A',
      verdict: 'Interview Ready — Solid Problem Solving Baseline',
      metrics: {
        accuracy: 80,
        problemSolving: 100,
        timeManagement: 85,
        patternRecognition: 88,
        consistency: 90,
      },
      problemBreakdown: [
        {
          problemId: '1',
          title: 'Two Sum',
          difficulty: 'Easy',
          pattern: 'Hash Map Lookup',
          result: 'Passed',
          attempts: 1,
          timeSpentMinutes: 8,
          testcasesPassed: 10,
          totalTestcases: 10,
        },
        {
          problemId: '11',
          title: 'Container With Most Water',
          difficulty: 'Medium',
          pattern: 'Two Pointers (Inward Squeeze)',
          result: 'Passed',
          attempts: 2,
          timeSpentMinutes: 14,
          testcasesPassed: 15,
          totalTestcases: 15,
        },
        {
          problemId: '3',
          title: 'Longest Substring Without Repeating Characters',
          difficulty: 'Medium',
          pattern: 'Sliding Window (Dynamic Resizing)',
          result: 'Passed',
          attempts: 2,
          timeSpentMinutes: 14,
          testcasesPassed: 20,
          totalTestcases: 20,
        },
      ],
      whatWentWell: [
        'Solved Problem 1 (Two Sum) cleanly on the first submission in 8 min.',
        'Successfully identified optimal Two Pointer inward convergence for Problem 2.',
        'Strong edge case verification for duplicate character windows in Problem 3.',
      ],
      whatNeedsWork: [
        'Problem 2 required 2 attempts due to off-by-one boundary on the inner loop.',
        'Consider writing quick test case dry runs before initial submission.',
      ],
      recommendedNextSteps: [
        {
          title: 'Deepen Two Pointer Patterns',
          type: 'practice',
          url: '/practice/two-pointers',
          reason: 'Solidify boundary checks on two-pointer narrowing algorithms.',
        },
        {
          title: 'Review Hash Map Invalidation in SRS',
          type: 'revision',
          url: '/revision',
          reason: 'Maintain fast retrieval speed under timed pressure.',
        },
      ],
      mentorQueryContext: 'I just completed a 45-minute Mixed Patterns interview on DSA MASTER with an 84% score. How can I optimize my Two Pointer speed further?',
    };
  }
}
