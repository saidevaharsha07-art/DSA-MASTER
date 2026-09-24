/**
 * DSA MASTER — Contest Arena Service
 * Engine for competitive programming contests, authoritative timer management,
 * deterministic ICPC/LeetCode scoring, submission telemetry, privacy-preserving leaderboards,
 * 7-pillar diagnostics, weakness intelligence, and AI Mentor handoffs.
 */

import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel } from '@/src/curriculum/types';
import { TemplateService } from '@/src/problems/services/template.service';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { EventBus } from '@/src/core/events/event-bus';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import {
  ContestConfig,
  ContestSession,
  ContestProblemSummary,
  ContestProblemStatus,
  ContestPerformanceReport,
  ContestPreset,
  LeaderboardEntry,
  ProblemTelemetry,
  PerformancePillar,
  DifficultyLevel,
} from '../types/contest.types';

const STORAGE_KEY_HISTORY_PREFIX = 'dsa-contest-history-v1';
const STORAGE_KEY_ACTIVE_SESSION = 'dsa-contest-active-session-v1';

export class ContestArenaService {
  private static activeSessions: Map<string, ContestSession> = new Map();
  private static memoryHistory: Map<string, ContestPerformanceReport[]> = new Map();

  private static getHistoryStorageKey(userId: string): string {
    return `${STORAGE_KEY_HISTORY_PREFIX}_${userId || 'default_user'}`;
  }

  /**
   * Catalog of pre-configured contest presets
   */
  public static getPresets(): ContestPreset[] {
    return [
      {
        id: 'sprint-mock',
        title: 'Weekly Sprint Round',
        tagline: 'Fast-paced algorithmic agility contest with 2 problems.',
        format: 'sprint',
        durationMinutes: 30,
        problemCount: 2,
        difficulty: 'Easy+Medium',
        topics: ['Arrays', 'Strings', 'Two Pointers'],
        recommendedFor: 'Quick contest warmup & speed optimization',
        isLive: true,
      },
      {
        id: 'standard-biweekly',
        title: 'Div. 2 Standard Round',
        tagline: 'Balanced competitive contest with 3 problems across patterns.',
        format: 'standard',
        durationMinutes: 60,
        problemCount: 3,
        difficulty: 'Mixed',
        topics: ['Arrays', 'Trees', 'Dynamic Programming', 'Binary Search'],
        recommendedFor: 'Comprehensive rating building & ICPC simulation',
        isLive: true,
      },
      {
        id: 'grand-master',
        title: 'Div. 1 Grandmaster Cup',
        tagline: 'Challenging high-pressure contest featuring advanced algorithms.',
        format: 'hardcore',
        durationMinutes: 90,
        problemCount: 4,
        difficulty: 'Medium-heavy',
        topics: ['Graphs', 'Dynamic Programming', 'Trie', 'Advanced Backtracking'],
        recommendedFor: 'Senior candidates & competitive Olympiad prep',
        isLive: true,
      },
      {
        id: 'topic-dp-clash',
        title: 'Dynamic Programming Clash',
        tagline: 'Focused battle purely testing recurrence, memoization & tabulation.',
        format: 'topic',
        durationMinutes: 45,
        problemCount: 3,
        difficulty: 'Medium-heavy',
        topics: ['Dynamic Programming', 'Recursion'],
        recommendedFor: 'Overcoming DP weakness and mastery drill',
      },
      {
        id: 'tree-graph-cup',
        title: 'Trees & Graph Invitational',
        tagline: 'Traversal, shortest paths, topological sort & tree transforms.',
        format: 'topic',
        durationMinutes: 60,
        problemCount: 3,
        difficulty: 'Mixed',
        topics: ['Trees', 'Graphs', 'BFS', 'DFS'],
        recommendedFor: 'Graph theory & non-linear structure fluency',
      },
    ];
  }

  /**
   * Selects balanced problems for contest based on config and optional learner weakness
   */
  public static selectProblems(config: ContestConfig, userId = 'default_user'): ProblemModel[] {
    const allProblems = CurriculumRepository.getAllProblems();
    if (!allProblems || allProblems.length === 0) return [];

    let filtered = [...allProblems];

    // Filter by Topic
    if (config.topic && config.topic !== 'General DSA' && config.topic !== 'All Topics') {
      const targetTopic = config.topic.toLowerCase();
      filtered = filtered.filter((p) => {
        const cat = (p.categoryTitle || p.categorySlug || '').toLowerCase();
        const pat = (p.patternId || '').toLowerCase();
        return cat.includes(targetTopic) || pat.includes(targetTopic);
      });
    }

    if (filtered.length === 0) {
      filtered = [...allProblems];
    }

    // Filter / Sort by Difficulty Mix
    if (config.difficultyMix === 'Easy') {
      const easies = filtered.filter((p) => p.difficulty?.toLowerCase() === 'easy');
      if (easies.length >= config.problemCount) filtered = easies;
    } else if (config.difficultyMix === 'Hard') {
      const hards = filtered.filter((p) => p.difficulty?.toLowerCase() === 'hard');
      if (hards.length >= config.problemCount) filtered = hards;
    }

    // Incorporate Weakness Targeting if requested and available
    if (config.targetWeaknesses && userId) {
      try {
        const attempts = AdaptiveDataAdapterService.getCanonicalAttempts(userId);
        const profile = AdaptiveDataAdapterService.getCanonicalProfile(userId);
        const weakness = WeaknessAnalyzer.analyze(attempts, profile);
        if (weakness.weakTopics && weakness.weakTopics.length > 0) {
          const weakNames = weakness.weakTopics.map((w) => w.topic.toLowerCase());
          const weaknessMatched = filtered.filter((p) =>
            weakNames.some(
              (wn) =>
                (p.categoryTitle && p.categoryTitle.toLowerCase().includes(wn)) ||
                (p.patternId && p.patternId.toLowerCase().includes(wn))
            )
          );
          if (weaknessMatched.length >= Math.min(config.problemCount, 2)) {
            // Prepend weakness matched problems to prioritize them
            const others = filtered.filter((p) => !weaknessMatched.includes(p));
            filtered = [...weaknessMatched, ...others];
          }
        }
      } catch (err) {
        console.warn('Weakness analysis fallback for contest:', err);
      }
    }

    // Select distinct problems sorted Easy -> Medium -> Hard
    const difficultyWeight = (d: string) => {
      const ld = (d || '').toLowerCase();
      if (ld === 'easy') return 1;
      if (ld === 'medium') return 2;
      return 3;
    };

    const sorted = [...filtered].sort((a, b) => difficultyWeight(a.difficulty) - difficultyWeight(b.difficulty));

    // Pick requested problem count
    const selected: ProblemModel[] = [];
    const usedIds = new Set<string>();

    for (const p of sorted) {
      if (!usedIds.has(p.id)) {
        selected.push(p);
        usedIds.add(p.id);
        if (selected.length === config.problemCount) break;
      }
    }

    // If still short, backfill from all problems
    if (selected.length < config.problemCount) {
      for (const p of allProblems) {
        if (!usedIds.has(p.id)) {
          selected.push(p);
          usedIds.add(p.id);
          if (selected.length === config.problemCount) break;
        }
      }
    }

    return selected;
  }

  /**
   * Transforms curriculum problem models into rich contest problem summaries
   */
  public static mapProblemSummaries(problems: ProblemModel[]): ContestProblemSummary[] {
    return problems.map((p) => {
      let detail: any = null;
      try {
        detail = getProblemDetailInfo(p);
      } catch {
        detail = null;
      }

      const getCode = (lang: string) => {
        try {
          const t = TemplateService.getTemplate(p.slug || p.id, lang);
          if (t) return t;
        } catch {}
        return `// Solution for ${p.title}\nfunction solve() {\n  // Write your code here\n}\n`;
      };

      const initialCode = {
        javascript: getCode('javascript'),
        typescript: getCode('typescript'),
        python: getCode('python'),
        cpp: getCode('cpp'),
        java: getCode('java'),
      };

      const examples = (detail?.examples || []).map((ex: any) => ({
        input: ex.input || '',
        output: ex.output || '',
        explanation: ex.explanation,
      }));

      if (examples.length === 0) {
        examples.push({
          input: 'nums = [2, 7, 11, 15], target = 9',
          output: '[0, 1]',
          explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
        });
      }

      const rawDiff = (p.difficulty || p.level || 'Medium').toLowerCase();
      const difficulty: DifficultyLevel =
        rawDiff === 'easy' || rawDiff === 'learn' ? 'Easy' : rawDiff === 'hard' || rawDiff === 'master' ? 'Hard' : 'Medium';

      return {
        id: p.id,
        title: p.title,
        slug: p.slug || p.id,
        difficulty,
        topic: p.categoryTitle || 'Algorithms',
        description: detail?.statement || detail?.description || (p as any).description || `Implement an optimal solution for ${p.title}.`,
        examples,
        constraints: detail?.constraints && detail.constraints.length > 0
          ? detail.constraints
          : ['1 <= n <= 10^5', 'Time Limit: 2.0s', 'Memory Limit: 256MB'],
        initialCode,
        testCases: (detail?.testCases || []).map((tc: any, idx: number) => ({
          id: `tc_${idx + 1}`,
          input: tc.input || '',
          expectedOutput: tc.expectedOutput || '',
          isHidden: tc.isHidden ?? idx > 1,
        })),
      };
    });
  }

  /**
   * Initializes a new live Contest Session
   */
  public static createSession(config: ContestConfig, userId = 'default_user'): ContestSession {
    const problems = this.selectProblems(config, userId);
    const summaries = this.mapProblemSummaries(problems);

    const now = Date.now();
    const durationSeconds = config.durationMinutes * 60;
    const sessionId = `contest_${now}_${Math.random().toString(36).substring(2, 9)}`;

    const problemStatuses: Record<string, ContestProblemStatus> = {};
    const telemetry: Record<string, ProblemTelemetry> = {};

    summaries.forEach((p, idx) => {
      problemStatuses[p.id] = 'unattempted';
      telemetry[p.id] = {
        problemId: p.id,
        firstOpenedAt: idx === 0 ? now : undefined,
        runCount: 0,
        submissionCount: 0,
        accepted: false,
        compileErrorCount: 0,
        runtimeErrorCount: 0,
        wrongAnswerCount: 0,
        timeSpentSeconds: 0,
        lastCode: { ...p.initialCode },
        lastLanguage: 'javascript',
      };
    });

    const session: ContestSession = {
      id: sessionId,
      userId: userId || 'default_user',
      config,
      problems: summaries,
      startedAt: now,
      durationSeconds,
      endsAt: now + durationSeconds * 1000,
      status: 'active',
      currentProblemIndex: 0,
      problemStatuses,
      telemetry,
      score: 0,
      penaltyMinutes: 0,
      solvedCount: 0,
    };

    this.activeSessions.set(sessionId, session);
    this.persistActiveSessionToStorage(session);

    return session;
  }

  /**
   * Retrieves an active contest session by ID (checking memory and localStorage)
   */
  public static getSession(sessionId: string): ContestSession | null {
    if (this.activeSessions.has(sessionId)) {
      return this.activeSessions.get(sessionId)!;
    }

    try {
      const stored = storage.get<ContestSession>(STORAGE_KEY_ACTIVE_SESSION);
      if (stored && stored.id === sessionId) {
        this.activeSessions.set(sessionId, stored);
        return stored;
      }
    } catch {
      // Ignore storage parse error
    }

    return null;
  }

  /**
   * Updates problem code or view telemetry
   */
  public static updateProblemTelemetry(
    sessionId: string,
    problemId: string,
    update: Partial<ProblemTelemetry>
  ): ContestSession | null {
    const session = this.getSession(sessionId);
    if (!session || session.status !== 'active') return session;

    const currentTel = session.telemetry[problemId] || {
      problemId,
      runCount: 0,
      submissionCount: 0,
      accepted: false,
      compileErrorCount: 0,
      runtimeErrorCount: 0,
      wrongAnswerCount: 0,
      timeSpentSeconds: 0,
      lastCode: {},
      lastLanguage: 'javascript',
    };

    session.telemetry[problemId] = {
      ...currentTel,
      ...update,
    };

    if (session.problemStatuses[problemId] === 'unattempted' && (update.runCount || update.submissionCount || update.firstCodeChangeAt)) {
      session.problemStatuses[problemId] = 'attempted';
    }

    this.activeSessions.set(sessionId, session);
    this.persistActiveSessionToStorage(session);
    return session;
  }

  /**
   * Records a formal Contest Submission with ICPC-style scoring and penalty calculations
   */
  public static recordSubmission(
    sessionId: string,
    problemId: string,
    language: string,
    code: string,
    verdict: string,
    passedCases: number,
    totalCases: number
  ): { session: ContestSession; isFirstAccepted: boolean; scoreDelta: number } {
    const session = this.getSession(sessionId);
    if (!session) throw new Error('Contest session not found');

    const now = Date.now();
    // Reject submissions if contest has strictly expired
    if (now > session.endsAt + 5000) {
      throw new Error('Contest duration has expired. Submissions are closed.');
    }

    const tel = session.telemetry[problemId] || {
      problemId,
      runCount: 0,
      submissionCount: 0,
      accepted: false,
      compileErrorCount: 0,
      runtimeErrorCount: 0,
      wrongAnswerCount: 0,
      timeSpentSeconds: 0,
      lastCode: {},
      lastLanguage: language,
    };

    tel.submissionCount += 1;
    tel.lastLanguage = language;
    tel.lastCode[language] = code;
    tel.finalVerdict = verdict;

    const isAccepted = verdict.toLowerCase().includes('accepted');
    let isFirstAccepted = false;
    let scoreDelta = 0;

    if (isAccepted) {
      if (!tel.accepted) {
        tel.accepted = true;
        isFirstAccepted = true;
        const elapsedMinutes = Math.max(1, Math.floor((now - session.startedAt) / 60000));
        tel.firstAcceptedAt = elapsedMinutes;

        // 100 points per problem
        scoreDelta = 100;
        session.score += scoreDelta;
        session.solvedCount += 1;
        session.problemStatuses[problemId] = 'solved';

        // ICPC Penalty = ElapsedMinutes + (WrongSubmissions * 20)
        const wrongAttempts = tel.wrongAnswerCount + tel.runtimeErrorCount + tel.compileErrorCount;
        const problemPenalty = elapsedMinutes + wrongAttempts * 20;
        session.penaltyMinutes += problemPenalty;
      }
    } else {
      if (session.problemStatuses[problemId] !== 'solved') {
        session.problemStatuses[problemId] = 'attempted';
      }

      if (verdict.toLowerCase().includes('compile')) {
        tel.compileErrorCount += 1;
      } else if (verdict.toLowerCase().includes('runtime')) {
        tel.runtimeErrorCount += 1;
      } else {
        tel.wrongAnswerCount += 1;
      }
    }

    session.telemetry[problemId] = tel;
    this.activeSessions.set(sessionId, session);
    this.persistActiveSessionToStorage(session);

    return { session, isFirstAccepted, scoreDelta };
  }

  /**
   * Finalizes the contest session, computes 7-pillar diagnostics, rankings, and stores history
   */
  public static finalizeContest(sessionId: string): ContestPerformanceReport {
    const session = this.getSession(sessionId);
    if (!session) throw new Error('Contest session not found');

    const now = Date.now();
    session.status = 'completed';
    session.completedAt = now;

    const totalTimeMinutes = Math.min(
      session.config.durationMinutes,
      Math.max(1, Math.round((now - session.startedAt) / 60000))
    );

    const totalProblems = session.problems.length;
    const maxScore = totalProblems * 100;
    const solvedCount = session.solvedCount;

    // 1. Accuracy Pillar
    let totalSubmissions = 0;
    let totalAccepted = 0;
    Object.values(session.telemetry).forEach((t) => {
      totalSubmissions += t.submissionCount;
      if (t.accepted) totalAccepted += 1;
    });

    const accuracyScore = totalSubmissions > 0
      ? Math.round((totalAccepted / totalSubmissions) * 100)
      : 0;

    const accuracyPillar: PerformancePillar = {
      name: 'Accuracy',
      score: accuracyScore,
      grade: accuracyScore >= 90 ? 'S' : accuracyScore >= 75 ? 'A' : accuracyScore >= 50 ? 'B' : accuracyScore >= 30 ? 'C' : 'D',
      insight: accuracyScore >= 75
        ? 'High precision on first submissions with minimal penalty.'
        : 'Frequent false submissions increased penalty time. Run dry tests before submitting.',
      recommendation: accuracyScore < 70
        ? 'Trace edge cases (empty arrays, duplicates, boundary constraints) manually before submitting.'
        : 'Continue maintaining rigorous verification discipline.',
    };

    // 2. Speed Pillar
    const allottedMinutes = session.config.durationMinutes;
    const timeRatio = totalTimeMinutes / allottedMinutes;
    const speedScore = solvedCount === 0
      ? 20
      : Math.max(10, Math.min(100, Math.round((solvedCount / totalProblems) * 100 * (1.2 - timeRatio * 0.4))));

    const speedPillar: PerformancePillar = {
      name: 'Speed & Time Management',
      score: speedScore,
      grade: speedScore >= 85 ? 'S' : speedScore >= 70 ? 'A' : speedScore >= 50 ? 'B' : 'C',
      insight: `Solved ${solvedCount}/${totalProblems} problems in ${totalTimeMinutes}m (${Math.round(totalTimeMinutes / Math.max(1, solvedCount))}m/solve avg).`,
      recommendation: speedScore < 70
        ? 'Spend the first 3 minutes writing pseudocode to avoid mid-implementation refactors.'
        : 'Great pace control throughout the contest window.',
    };

    // 3. Problem Selection Pillar
    const firstProblemSolved = session.problems[0] && session.problemStatuses[session.problems[0].id] === 'solved';
    const selectionScore = firstProblemSolved ? 90 : 60;
    const selectionPillar: PerformancePillar = {
      name: 'Problem Selection Strategy',
      score: selectionScore,
      grade: selectionScore >= 80 ? 'A' : 'B',
      insight: firstProblemSolved
        ? 'Solid strategic approach tackling approachable problems first.'
        : 'Consider securing early points on Easy/Medium challenges before deep-diving.',
      recommendation: 'Always scan all problem descriptions in the first 2 minutes before coding.',
    };

    // 4. Submission Discipline Pillar
    let totalRuns = 0;
    Object.values(session.telemetry).forEach((t) => (totalRuns += t.runCount));
    const disciplineScore = totalRuns >= totalSubmissions
      ? 88
      : Math.max(40, Math.round((totalRuns / Math.max(1, totalSubmissions)) * 80));

    const disciplinePillar: PerformancePillar = {
      name: 'Submission Discipline',
      score: disciplineScore,
      grade: disciplineScore >= 85 ? 'S' : disciplineScore >= 70 ? 'A' : 'B',
      insight: `Executed ${totalRuns} local test runs across ${totalSubmissions} contest submissions.`,
      recommendation: 'Test with non-trivial custom testcases before submitting to the judge.',
    };

    // 5. Pattern Recognition Pillar
    const patternScore = Math.round((solvedCount / Math.max(1, totalProblems)) * 100);
    const patternPillar: PerformancePillar = {
      name: 'Pattern Recognition',
      score: patternScore,
      grade: patternScore >= 80 ? 'S' : patternScore >= 60 ? 'A' : patternScore >= 33 ? 'B' : 'C',
      insight: `Identified and solved ${solvedCount} core algorithmic patterns.`,
      recommendation: 'Review standard templates for unsolved problems in the revision deck.',
    };

    // 6. Consistency Pillar
    const consistencyScore = solvedCount >= 1 ? 80 : 30;
    const consistencyPillar: PerformancePillar = {
      name: 'Consistency & Focus',
      score: consistencyScore,
      grade: consistencyScore >= 75 ? 'A' : 'C',
      insight: `Maintained contest engagement for ${totalTimeMinutes} minutes.`,
      recommendation: 'Participate in weekly sprints to build mental stamina for 90m+ contests.',
    };

    // 7. Topic Performance Pillar
    const topicScore = Math.round((solvedCount / Math.max(1, totalProblems)) * 100);
    const topicPillar: PerformancePillar = {
      name: 'Topic Mastery',
      score: topicScore,
      grade: topicScore >= 80 ? 'S' : topicScore >= 50 ? 'A' : 'B',
      insight: `Performance evaluated across topic focus: ${session.config.topic}.`,
      recommendation: 'Practice mixed pattern sets to reinforce multi-topic breadth.',
    };

    // Problem Breakdown
    const problemBreakdown = session.problems.map((p) => {
      const tel = session.telemetry[p.id];
      return {
        problemId: p.id,
        title: p.title,
        difficulty: p.difficulty,
        topic: p.topic,
        status: session.problemStatuses[p.id] || 'unattempted',
        solvedAtMinutes: tel?.firstAcceptedAt,
        attempts: tel?.submissionCount || 0,
        timeSpentSeconds: tel?.timeSpentSeconds || 0,
        finalVerdict: tel?.finalVerdict || (session.problemStatuses[p.id] === 'solved' ? 'Accepted' : 'Unattempted'),
      };
    });

    // Strengths & Weaknesses derivation
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendedPractice: Array<{ topic: string; difficulty: DifficultyLevel; reason: string; suggestedProblemId?: string }> = [];

    problemBreakdown.forEach((pb) => {
      if (pb.status === 'solved') {
        strengths.push(`Mastered ${pb.difficulty} ${pb.topic}: "${pb.title}" in ${pb.solvedAtMinutes || 0}m.`);
      } else {
        weaknesses.push(`Unfinished ${pb.difficulty} ${pb.topic}: "${pb.title}" (${pb.attempts} attempts).`);
        recommendedPractice.push({
          topic: pb.topic,
          difficulty: pb.difficulty,
          reason: pb.attempts > 0 ? 'Fumbled edge cases under contest timer.' : 'Unreached during allotted time.',
          suggestedProblemId: pb.problemId,
        });
      }
    });

    if (strengths.length === 0) {
      strengths.push('Completed timed competitive simulation under strict tournament constraints.');
    }

    // Rank & Leaderboard Placement
    const totalParticipants = 120;
    let rank = 1;
    if (solvedCount === totalProblems) {
      rank = Math.max(1, Math.floor(Math.random() * 5) + 1);
    } else if (solvedCount > 0) {
      rank = Math.floor(totalParticipants * (1 - solvedCount / totalProblems * 0.75)) + 1;
    } else {
      rank = totalParticipants - Math.floor(Math.random() * 10);
    }
    const percentile = Math.max(1, Math.round(((totalParticipants - rank) / totalParticipants) * 100));

    // Mentor Context Prompt
    const mentorPromptContext = `I just finished the "${session.config.title}" contest on DSA Magna.
Score: ${session.score}/${maxScore} (${solvedCount}/${totalProblems} solved).
Total Time: ${totalTimeMinutes} min, Penalty: ${session.penaltyMinutes} min, Rank: ${rank}/${totalParticipants} (Top ${percentile}%).
Breakdown:
${problemBreakdown.map((p) => `- ${p.title} (${p.difficulty}, ${p.topic}): ${p.status === 'solved' ? `SOLVED in ${p.solvedAtMinutes}m` : `MISSED (${p.attempts} attempts)`}`).join('\n')}
Please analyze my contest performance, explain how I could optimize my solving strategy, and walk me through the optimal solutions for the problems I missed.`;

    const report: ContestPerformanceReport = {
      contestId: session.id,
      userId: session.userId,
      contestTitle: session.config.title,
      completedAt: new Date(now).toISOString(),
      score: session.score,
      maxScore,
      solvedCount,
      totalProblems,
      totalTimeMinutes,
      penaltyMinutes: session.penaltyMinutes,
      rank,
      totalParticipants,
      percentile,
      pillars: {
        accuracy: accuracyPillar,
        speed: speedPillar,
        problemSelection: selectionPillar,
        submissionDiscipline: disciplinePillar,
        patternRecognition: patternPillar,
        consistency: consistencyPillar,
        topicPerformance: topicPillar,
      },
      problemBreakdown,
      strengths,
      weaknesses,
      recommendedPractice,
      mentorPromptContext,
    };

    // Save to user history
    this.saveReportToHistory(session.userId, report);

    // Emit platform event
    try {
      EventBus.publish('ContestCompleted', {
        contestId: session.id,
        userId: session.userId,
        score: session.score,
        solvedCount,
        penaltyMinutes: session.penaltyMinutes,
      });
    } catch {
      // Non-fatal
    }

    return report;
  }

  /**
   * Generates a privacy-preserving leaderboard with safe public aliases
   */
  public static getLeaderboard(sessionId: string): LeaderboardEntry[] {
    const session = this.getSession(sessionId);
    const userSolved = session ? session.solvedCount : 2;
    const userScore = session ? session.score : 200;
    const userPenalty = session ? session.penaltyMinutes : 45;
    const totalProblems = session ? session.problems.length : 3;

    // Deterministic peer benchmark participants (Sanitized aliases, 0 PII leak)
    const simulatedPeers: Array<{ name: string; country: string; solved: number; penalty: number }> = [
      { name: 'tourist_algo', country: 'NL', solved: totalProblems, penalty: 24 },
      { name: 'byte_ninja', country: 'IN', solved: totalProblems, penalty: 38 },
      { name: 'matrix_solver', country: 'US', solved: Math.max(1, totalProblems - 1), penalty: 42 },
      { name: 'binary_sage', country: 'CA', solved: Math.max(1, totalProblems - 1), penalty: 55 },
      { name: 'code_alchemist', country: 'DE', solved: Math.max(1, totalProblems - 1), penalty: 68 },
      { name: 'quantum_coder', country: 'SG', solved: Math.max(1, totalProblems - 2), penalty: 74 },
      { name: 'dp_sorcerer', country: 'JP', solved: Math.max(0, totalProblems - 2), penalty: 82 },
      { name: 'graph_walker', country: 'GB', solved: Math.max(0, totalProblems - 2), penalty: 95 },
    ];

    const entries: LeaderboardEntry[] = simulatedPeers.map((peer, idx) => ({
      rank: idx + 1,
      userId: `peer_${idx + 1}`,
      displayName: peer.name,
      solvedCount: peer.solved,
      totalProblems,
      score: peer.solved * 100,
      penaltyMinutes: peer.penalty,
      countryCode: peer.country,
      problemScores: Array.from({ length: totalProblems }).map((_, pIdx) => ({
        problemId: `prob_${pIdx + 1}`,
        solved: pIdx < peer.solved,
        attempts: pIdx < peer.solved ? 1 : 2,
        solveTimeMinutes: (pIdx + 1) * 12,
      })),
    }));

    // Insert user into ranking
    const userEntry: LeaderboardEntry = {
      rank: 1,
      userId: session?.userId || 'you',
      displayName: 'You (DSA Magna)',
      solvedCount: userSolved,
      totalProblems,
      score: userScore,
      penaltyMinutes: userPenalty,
      isCurrentUser: true,
      countryCode: 'GLOBAL',
      problemScores: session
        ? session.problems.map((p) => {
            const tel = session.telemetry[p.id];
            return {
              problemId: p.id,
              solved: tel?.accepted || false,
              attempts: tel?.submissionCount || 0,
              solveTimeMinutes: tel?.firstAcceptedAt,
            };
          })
        : [],
    };

    entries.push(userEntry);

    // Sort leaderboard by Score (descending), then Penalty (ascending)
    entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.penaltyMinutes - b.penaltyMinutes;
    });

    // Re-index ranks
    entries.forEach((e, idx) => {
      e.rank = idx + 1;
    });

    return entries;
  }

  /**
   * Retrieves private contest history for active user
   */
  public static getUserHistory(userId: string): ContestPerformanceReport[] {
    const key = this.getHistoryStorageKey(userId);
    try {
      const stored = storage.get<ContestPerformanceReport[]>(key);
      if (Array.isArray(stored)) {
        this.memoryHistory.set(userId, stored);
        return stored;
      }
    } catch {
      // Ignore parse failure
    }

    return this.memoryHistory.get(userId) || [];
  }

  private static saveReportToHistory(userId: string, report: ContestPerformanceReport): void {
    const existing = this.getUserHistory(userId);
    const updated = [report, ...existing.filter((r) => r.contestId !== report.contestId)].slice(0, 50);
    this.memoryHistory.set(userId, updated);

    try {
      const key = this.getHistoryStorageKey(userId);
      storage.save(key, updated);
    } catch {
      // Ignore storage write failure
    }
  }

  private static persistActiveSessionToStorage(session: ContestSession): void {
    try {
      storage.save(STORAGE_KEY_ACTIVE_SESSION, session);
    } catch {
      // Ignore
    }
  }
}
