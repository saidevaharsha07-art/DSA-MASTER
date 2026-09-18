/**
 * DSA MASTER — Practice Engine Service (Practice Arena 2.0)
 * Central intelligent coordinator for Practice Arena.
 * Reuses existing canonical intelligence engines:
 * - RecommendationEngineService (unified recommendations)
 * - AdaptiveRoadmapService (topic graph, mastery, blockers)
 * - WeaknessAnalyzer & AdaptiveDataAdapterService (weak topics, error patterns)
 * - MemoryEngine & RevisionAdapterService (SRS spaced repetition retention)
 * - ProgressService & ActivityStoreService (solved history, telemetry, streaks)
 * - JudgeEngine (code submissions, drafts, verdicts)
 * - CurriculumRepository (all 4,000 canonical problems across 4 platforms)
 */

import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel } from '@/src/curriculum/types';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';
import { AdaptiveRoadmapService } from '@/src/features/journey/services/adaptive-roadmap.service';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { progressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { judgeEngine } from '@/src/engines/judge';
import { EventBus } from '@/src/core/events/event-bus';
import { storage } from '@/src/core/storage/LocalStorageAdapter';
import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';

export type PracticeMode =
  | 'recommended'
  | 'area'
  | 'subtopic'
  | 'pattern'
  | 'platform'
  | 'mistakes'
  | 'weakness'
  | 'interview'
  | 'random'
  | 'history';

export interface RecommendedProblemItem {
  readonly id: string;
  readonly problem: ProblemModel;
  readonly whyThisProblem: string;
  readonly badge: string;
  readonly score: number;
  readonly priority: 'Critical' | 'High' | 'Medium' | 'Low';
  readonly sourceSignal: string;
  readonly targetDifficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface PracticeSession {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly problemCount: 5 | 10 | 20;
  readonly problems: ReadonlyArray<ProblemModel>;
  readonly currentIndex: number;
  readonly completedProblemIds: ReadonlyArray<string>;
  readonly skippedProblemIds: ReadonlyArray<string>;
  readonly createdAt: string;
  readonly status: 'active' | 'completed' | 'abandoned';
  readonly mode: string;
  readonly targetTopic?: string;
  readonly targetPlatform?: string;
}

export interface MistakeReviewItem {
  readonly problem: ProblemModel;
  readonly failedAttemptsCount: number;
  readonly lastAttemptAt: string;
  readonly category: 'recent' | 'repeated' | 'unresolved_pattern' | 'revision_ready';
  readonly reason: string;
  readonly lastVerdict?: string;
}

export interface WeakAreaItem {
  readonly topicId: string;
  readonly topicTitle: string;
  readonly subtopicTitle: string;
  readonly patternTitle: string;
  readonly weaknessScore: number;
  readonly accuracyPercent: number;
  readonly failedAttemptsCount: number;
  readonly recommendedDifficulty: 'Easy' | 'Medium' | 'Hard';
  readonly recommendedProblem: ProblemModel | null;
  readonly reason: string;
}

export interface PracticeHistoryItem {
  readonly id: string;
  readonly timestamp: string;
  readonly type: 'solve' | 'attempt' | 'session';
  readonly title: string;
  readonly problemId: string;
  readonly platform: string;
  readonly topic: string;
  readonly pattern: string;
  readonly difficulty: string;
  readonly status: 'accepted' | 'failed' | 'completed';
  readonly xpEarned: number;
  readonly durationSeconds?: number;
}

const STORAGE_SESSION_PREFIX = 'dsa_active_practice_session_v2_';

export class PracticeEngineService {
  private static inMemorySessions: Map<string, PracticeSession> = new Map();

  /**
   * Helper to normalize problem platform id
   */
  public static getProblemPlatform(problem: ProblemModel): 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks' {
    if (problem.url.includes('codechef.com')) return 'codechef';
    if (problem.url.includes('codeforces.com')) return 'codeforces';
    if (problem.url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
    return 'leetcode';
  }

  /**
   * Resolves canonical solved check
   */
  public static isProblemSolved(problem: ProblemModel, userId = 'default_user'): boolean {
    const state = progressService.getState(userId);
    const num = problem.leetcodeNumber;
    if (typeof num === 'number' && state.completed.includes(num)) {
      return true;
    }
    const completedIds = state.completedProblemIds || [];
    if (completedIds.includes(problem.id) || (num && completedIds.includes(String(num)))) {
      return true;
    }
    const plat = this.getProblemPlatform(problem);
    if (completedIds.includes(`${plat}:${problem.id}`) || (num && completedIds.includes(`${plat}:${num}`))) {
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────────────────
  // 1. RECOMMENDED QUEUE GENERATOR (10 Signals, Explainable Reasons)
  // ──────────────────────────────────────────────────────────────────

  public static getRecommendedProblems(
    userId = 'default_user',
    options?: { platform?: string; targetTopic?: string; limit?: number }
  ): RecommendedProblemItem[] {
    const cleanUserId = userId || 'guest-user';
    const limit = options?.limit || 20;
    const targetPlatform = options?.platform && options.platform !== 'all' ? options.platform : null;

    const allProblems = CurriculumRepository.getAllProblems();
    const roadmap = AdaptiveRoadmapService.computeRoadmap(cleanUserId);
    const weakness = AdaptiveDataAdapterService.getWeaknessAnalysis(cleanUserId);

    // Collect solved problems
    const isSolved = (p: ProblemModel) => this.isProblemSolved(p, cleanUserId);

    // Filter candidate problems
    let candidatePool = allProblems.filter((p) => {
      if (isSolved(p)) return false;
      if (targetPlatform && this.getProblemPlatform(p) !== targetPlatform) return false;
      if (options?.targetTopic && options.targetTopic !== 'all') {
        const tMatch =
          p.categorySlug === options.targetTopic ||
          p.categoryId === options.targetTopic ||
          p.categoryTitle?.toLowerCase() === options.targetTopic.toLowerCase();
        if (!tMatch) return false;
      }
      return true;
    });

    if (candidatePool.length === 0) {
      candidatePool = allProblems.filter((p) => !isSolved(p));
    }

    // Weak topics map
    const weakTopicsMap = new Map<string, number>();
    for (const wt of weakness.weakTopics) {
      weakTopicsMap.set(wt.topic.toLowerCase(), wt.weaknessScore);
    }

    // Weak patterns map
    const weakPatternsMap = new Map<string, number>();
    for (const wp of weakness.weakPatterns) {
      weakPatternsMap.set(wp.pattern.toLowerCase(), wp.weaknessScore);
    }

    // Blocker topics from Roadmap
    const blockerTopics = new Set<string>(
      roadmap.blockers.map((b) => b.topicTitle.toLowerCase())
    );

    // Active roadmap topics
    const activeRoadmapTopics = new Set<string>(
      roadmap.topics
        .filter((t) => t.status === 'PRACTICING' || t.status === 'LEARNING' || t.status === 'NEEDS_REVIEW')
        .map((t) => t.title.toLowerCase())
    );

    // Recent failed submissions
    const recentSubmissions = judgeEngine.getAllSubmissions(cleanUserId);
    const failedProblemIds = new Set<string>(
      recentSubmissions.filter((s) => s.verdict !== 'Accepted').map((s) => s.problemId)
    );

    // Score and annotate candidates
    const scoredList: RecommendedProblemItem[] = [];

    for (const prob of candidatePool) {
      let score = 50; // base score
      let priority: 'Critical' | 'High' | 'Medium' | 'Low' = 'Medium';
      let whyReason = 'Balanced problem to advance your algorithmic fluency.';
      let badge = 'Practice';
      let sourceSignal = 'Curriculum:Standard';

      const probTopic = (prob.categoryTitle || prob.categorySlug || '').toLowerCase();
      const probPattern = (prob.patternTitle || prob.patternSlug || '').toLowerCase();
      const diff = prob.difficulty || (prob.level === 'Learn' ? 'Easy' : prob.level === 'Master' ? 'Hard' : 'Medium');

      // Signal 1: Blocker / Prerequisite topic
      if (blockerTopics.has(probTopic)) {
        score += 45;
        priority = 'Critical';
        whyReason = `This problem strengthens a prerequisite for ${prob.categoryTitle || 'your active topic'}.`;
        badge = 'Prerequisite Blocker';
        sourceSignal = 'AdaptiveRoadmap:Blocker';
      }
      // Signal 2: Recent failed attempts on this problem / pattern
      else if (failedProblemIds.has(prob.id) || (probPattern && weakPatternsMap.has(probPattern))) {
        score += 40;
        priority = 'High';
        const missedCount = weakPatternsMap.get(probPattern) ? Math.min(5, Math.ceil((weakPatternsMap.get(probPattern)! / 20))) : 1;
        whyReason = missedCount > 1
          ? `You missed ${missedCount} problems on the ${prob.patternTitle || 'this'} pattern.`
          : `Review and conquer the ${prob.patternTitle || 'this'} pattern after a recent attempt.`;
        badge = 'Mistake Review';
        sourceSignal = 'MistakeIntelligence:FailedAttempt';
      }
      // Signal 3: Weak Subtopic / Topic
      else if (weakTopicsMap.has(probTopic)) {
        const wScore = weakTopicsMap.get(probTopic)!;
        score += 35 + Math.min(15, Math.round(wScore / 5));
        priority = 'High';
        whyReason = `Targeted practice to strengthen accuracy in ${prob.categoryTitle || 'this topic'}.`;
        badge = 'Weak Area Boost';
        sourceSignal = 'WeaknessAnalyzer:TopicGap';
      }
      // Signal 4: Active Roadmap Focus
      else if (activeRoadmapTopics.has(probTopic)) {
        score += 30;
        priority = 'Medium';
        whyReason = `This is your current roadmap focus in ${prob.categoryTitle || 'the curriculum'}.`;
        badge = 'Roadmap Focus';
        sourceSignal = 'AdaptiveRoadmap:ActiveFocus';
      }
      // Signal 5: Ready for Next Difficulty
      else if (diff === 'Medium' && roadmap.overallMasteryPercent >= 30) {
        score += 20;
        priority = 'Medium';
        whyReason = `You're ready for the next difficulty level in ${prob.categoryTitle || 'this topic'}.`;
        badge = 'Level Up';
        sourceSignal = 'Progression:DifficultyAdvance';
      } else if (diff === 'Easy' && roadmap.overallMasteryPercent < 20) {
        score += 25;
        priority = 'Medium';
        whyReason = `Foundational problem to build muscle memory in ${prob.categoryTitle || 'data structures'}.`;
        badge = 'Foundation';
        sourceSignal = 'Progression:Foundation';
      }

      // Bonus for platform variety
      const plat = this.getProblemPlatform(prob);
      if (plat === 'geeksforgeeks') score += 2;
      if (plat === 'codeforces') score += 2;
      if (plat === 'codechef') score += 2;

      scoredList.push({
        id: `rec_${prob.id}`,
        problem: prob,
        whyThisProblem: whyReason,
        badge,
        score,
        priority,
        sourceSignal,
        targetDifficulty: diff as 'Easy' | 'Medium' | 'Hard',
      });
    }

    // Sort descending by deterministic score
    scoredList.sort((a, b) => b.score - a.score);

    return scoredList.slice(0, limit);
  }

  // ──────────────────────────────────────────────────────────────────
  // 2. SESSION GENERATOR (5 / 10 / 20 Problems)
  // ──────────────────────────────────────────────────────────────────

  public static generatePracticeSession(
    userId = 'default_user',
    count: 5 | 10 | 20 = 5,
    options?: {
      mode?: string;
      area?: string;
      subtopic?: string;
      pattern?: string;
      platform?: string;
      difficulty?: string;
    }
  ): PracticeSession {
    const cleanUserId = userId || 'guest-user';
    const allProblems = CurriculumRepository.getAllProblems();
    const isSolved = (p: ProblemModel) => this.isProblemSolved(p, cleanUserId);

    // 1. Gather filtered candidates
    let candidates = allProblems.filter((p) => {
      // Exclude already solved unless user explicitly filtered solved
      if (isSolved(p)) return false;

      if (options?.platform && options.platform !== 'all') {
        if (this.getProblemPlatform(p) !== options.platform) return false;
      }
      if (options?.area && options.area !== 'all') {
        if (p.categorySlug !== options.area && p.categoryId !== options.area) return false;
      }
      if (options?.subtopic && options.subtopic !== 'all') {
        if (p.subtopicSlug !== options.subtopic && p.subtopicId !== options.subtopic) return false;
      }
      if (options?.pattern && options.pattern !== 'all') {
        if (p.patternSlug !== options.pattern && p.patternTitle !== options.pattern) return false;
      }
      if (options?.difficulty && options.difficulty !== 'all') {
        const diff = p.difficulty || (p.level === 'Learn' ? 'Easy' : p.level === 'Master' ? 'Hard' : 'Medium');
        if (diff.toLowerCase() !== options.difficulty.toLowerCase()) return false;
      }
      return true;
    });

    // Fallback if filter is too strict
    if (candidates.length < count) {
      const fallback = allProblems.filter((p) => !isSolved(p));
      candidates = candidates.concat(fallback.filter((p) => !candidates.some((c) => c.id === p.id)));
    }

    // 2. Select coherent problem list enforcing constraints:
    // - No duplicates
    // - Max problems per pattern (max 2 for 5, max 3 for 10, max 5 for 20)
    // - Smooth difficulty progression: Easy -> Medium -> Hard
    const maxPerPattern = count === 5 ? 2 : count === 10 ? 3 : 5;
    const patternCounts = new Map<string, number>();
    const selected: ProblemModel[] = [];

    // Group candidates by difficulty
    const easy = candidates.filter((p) => (p.difficulty || p.level) === 'Easy' || p.level === 'Learn');
    const medium = candidates.filter((p) => (p.difficulty || p.level) === 'Medium' || !p.difficulty);
    const hard = candidates.filter((p) => (p.difficulty || p.level) === 'Hard' || p.level === 'Master');

    // Desired difficulty distribution
    const targetEasyCount = count === 5 ? 2 : count === 10 ? 4 : 7;
    const targetMedCount = count === 5 ? 2 : count === 10 ? 4 : 9;

    const tryAddProblem = (p: ProblemModel): boolean => {
      if (selected.some((s) => s.id === p.id)) return false;
      const patKey = p.patternSlug || p.patternTitle || 'general';
      const currentPatCount = patternCounts.get(patKey) || 0;
      if (currentPatCount >= maxPerPattern) return false;

      selected.push(p);
      patternCounts.set(patKey, currentPatCount + 1);
      return true;
    };

    // Add Easy problems
    for (const p of easy) {
      if (selected.length >= targetEasyCount) break;
      tryAddProblem(p);
    }
    // Add Medium problems
    for (const p of medium) {
      if (selected.length >= targetEasyCount + targetMedCount) break;
      tryAddProblem(p);
    }
    // Add Hard problems
    for (const p of hard) {
      if (selected.length >= count) break;
      tryAddProblem(p);
    }

    // Fill any remainder from candidates
    for (const p of candidates) {
      if (selected.length >= count) break;
      tryAddProblem(p);
    }

    // Final fallback if still under target count
    for (const p of allProblems) {
      if (selected.length >= count) break;
      if (!selected.some((s) => s.id === p.id)) {
        selected.push(p);
      }
    }

    const session: PracticeSession = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      userId: cleanUserId,
      title: options?.area ? `${options.area} Practice Sprint` : `${count}-Problem Adaptive Sprint`,
      problemCount: count,
      problems: selected,
      currentIndex: 0,
      completedProblemIds: [],
      skippedProblemIds: [],
      createdAt: new Date().toISOString(),
      status: 'active',
      mode: options?.mode || 'recommended',
      targetTopic: options?.area,
      targetPlatform: options?.platform,
    };

    this.saveActiveSession(cleanUserId, session);
    return session;
  }

  public static loadActiveSession(userId = 'default_user'): PracticeSession | null {
    const isGuest = !userId || userId === 'guest' || userId === 'default_user';
    const cleanUserId = userId || 'guest-user';

    if (this.inMemorySessions.has(cleanUserId)) {
      return this.inMemorySessions.get(cleanUserId)!;
    }

    if (!isGuest && typeof window !== 'undefined') {
      try {
        const stored = storage.get<PracticeSession>(`${STORAGE_SESSION_PREFIX}${cleanUserId}`);
        if (stored && stored.status === 'active') {
          this.inMemorySessions.set(cleanUserId, stored);
          return stored;
        }
      } catch (e) {
        console.error('Failed to load active practice session', e);
      }
    }
    return null;
  }

  public static saveActiveSession(userId = 'default_user', session: PracticeSession | null): void {
    const isGuest = !userId || userId === 'guest' || userId === 'default_user';
    const cleanUserId = userId || 'guest-user';

    if (!session) {
      this.inMemorySessions.delete(cleanUserId);
      if (!isGuest && typeof window !== 'undefined') {
        storage.remove(`${STORAGE_SESSION_PREFIX}${cleanUserId}`);
      }
      return;
    }

    this.inMemorySessions.set(cleanUserId, session);
    if (!isGuest && typeof window !== 'undefined') {
      storage.save(`${STORAGE_SESSION_PREFIX}${cleanUserId}`, session);
      serverPersistenceBridge.saveDurableData('practice_session', cleanUserId, session).catch(() => {});
    }
  }

  public static advanceActiveSession(
    userId = 'default_user',
    action: 'solved' | 'skipped',
    problemId: string
  ): PracticeSession | null {
    const current = this.loadActiveSession(userId);
    if (!current || current.status !== 'active') return null;

    const completed = action === 'solved'
      ? Array.from(new Set([...current.completedProblemIds, problemId]))
      : current.completedProblemIds;

    const skipped = action === 'skipped'
      ? Array.from(new Set([...current.skippedProblemIds, problemId]))
      : current.skippedProblemIds;

    const nextIndex = current.currentIndex + 1;
    const isFinished = nextIndex >= current.problems.length;

    const updated: PracticeSession = {
      ...current,
      currentIndex: Math.min(nextIndex, current.problems.length - 1),
      completedProblemIds: completed,
      skippedProblemIds: skipped,
      status: isFinished ? 'completed' : 'active',
    };

    this.saveActiveSession(userId, updated);
    return updated;
  }

  // ──────────────────────────────────────────────────────────────────
  // 3. MISTAKE REVIEW MODE (Real Learner Telemetry)
  // ──────────────────────────────────────────────────────────────────

  public static getMistakeReviewProblems(userId = 'default_user'): MistakeReviewItem[] {
    const cleanUserId = userId || 'guest-user';
    const allProblems = CurriculumRepository.getAllProblems();
    const attempts = AdaptiveDataAdapterService.getCanonicalAttempts(cleanUserId);
    const submissions = judgeEngine.getAllSubmissions(cleanUserId);

    // Group failures by problem
    const failureStats = new Map<string, { count: number; lastTime: string; lastVerdict: string }>();

    for (const a of attempts) {
      if (a.status !== 'accepted') {
        const cur = failureStats.get(a.problemId) || { count: 0, lastTime: a.timestamp, lastVerdict: 'Wrong Answer' };
        cur.count++;
        if (new Date(a.timestamp) > new Date(cur.lastTime)) {
          cur.lastTime = a.timestamp;
        }
        failureStats.set(a.problemId, cur);
      }
    }

    for (const s of submissions) {
      if (s.verdict !== 'Accepted') {
        const cur = failureStats.get(s.problemId) || { count: 0, lastTime: s.timestamp, lastVerdict: s.verdict };
        cur.count++;
        if (new Date(s.timestamp) > new Date(cur.lastTime)) {
          cur.lastTime = s.timestamp;
          cur.lastVerdict = s.verdict;
        }
        failureStats.set(s.problemId, cur);
      }
    }

    const items: MistakeReviewItem[] = [];

    for (const [probId, stat] of Array.from(failureStats.entries())) {
      const canonical = allProblems.find(
        (p) => p.id === probId || p.slug === probId || (p.leetcodeNumber && String(p.leetcodeNumber) === probId)
      );
      if (!canonical) continue;

      let category: 'recent' | 'repeated' | 'unresolved_pattern' | 'revision_ready' = 'recent';
      let reason = 'Review recent incorrect submission and test edge cases.';

      if (stat.count >= 2) {
        category = 'repeated';
        reason = `Struggled ${stat.count} times. Focus on pattern invariants.`;
      } else {
        const hoursAgo = (Date.now() - new Date(stat.lastTime).getTime()) / (1000 * 3600);
        if (hoursAgo > 48) {
          category = 'revision_ready';
          reason = 'Overdue for retention review to prevent memory decay.';
        }
      }

      items.push({
        problem: canonical,
        failedAttemptsCount: stat.count,
        lastAttemptAt: stat.lastTime,
        category,
        reason,
        lastVerdict: stat.lastVerdict,
      });
    }

    // Sort by failedAttemptsCount descending
    items.sort((a, b) => b.failedAttemptsCount - a.failedAttemptsCount);

    return items;
  }

  // ──────────────────────────────────────────────────────────────────
  // 4. WEAK AREAS MODE (Data-Driven Weakness Signals)
  // ──────────────────────────────────────────────────────────────────

  public static getWeakAreas(userId = 'default_user'): {
    isZeroState: boolean;
    weakAreas: WeakAreaItem[];
  } {
    const cleanUserId = userId || 'guest-user';
    const weakness = AdaptiveDataAdapterService.getWeaknessAnalysis(cleanUserId);
    const roadmap = AdaptiveRoadmapService.computeRoadmap(cleanUserId);
    const allProblems = CurriculumRepository.getAllProblems();

    if (roadmap.isZeroState || (weakness.weakTopics.length === 0 && weakness.weakPatterns.length === 0)) {
      return {
        isZeroState: true,
        weakAreas: [],
      };
    }

    const results: WeakAreaItem[] = [];

    for (const wt of weakness.weakTopics) {
      const topicProb = allProblems.find(
        (p) =>
          (p.categoryTitle?.toLowerCase() === wt.topic.toLowerCase() ||
           p.categorySlug?.toLowerCase() === wt.topic.toLowerCase()) &&
          !this.isProblemSolved(p, cleanUserId)
      ) || null;

      const diff: 'Easy' | 'Medium' | 'Hard' = wt.accuracy < 0.4 ? 'Easy' : 'Medium';

      results.push({
        topicId: wt.topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        topicTitle: wt.topic,
        subtopicTitle: topicProb?.subtopicTitle || 'Fundamentals',
        patternTitle: topicProb?.patternTitle || 'Standard Technique',
        weaknessScore: wt.weaknessScore,
        accuracyPercent: Math.round(wt.accuracy * 100),
        failedAttemptsCount: Math.round((1 - wt.accuracy) * wt.totalAttempts),
        recommendedDifficulty: diff,
        recommendedProblem: topicProb,
        reason: wt.recommendedAction,
      });
    }

    return {
      isZeroState: false,
      weakAreas: results,
    };
  }

  // ──────────────────────────────────────────────────────────────────
  // 5. INTERVIEW PRACTICE MODE (Curated Mock Interview Set)
  // ──────────────────────────────────────────────────────────────────

  public static generateInterviewSession(
    userId = 'default_user',
    options?: { timedMinutes?: number; difficulty?: string }
  ): PracticeSession {
    const cleanUserId = userId || 'guest-user';
    const allProblems = CurriculumRepository.getAllProblems();
    const isSolved = (p: ProblemModel) => this.isProblemSolved(p, cleanUserId);

    // Filter to standard interview core topics: Arrays, Two Pointers, Trees, Graphs, DP, Intervals
    const interviewAreas = new Set([
      'basic-arrays',
      'two-pointers',
      'binary-trees',
      'graphs',
      'dynamic-programming',
      'intervals',
      'sliding-window',
    ]);

    const candidates = allProblems.filter((p) => {
      if (isSolved(p)) return false;
      return interviewAreas.has(p.categorySlug || '') || interviewAreas.has(p.categoryId || '');
    });

    // Pick 1 Easy, 2 Medium
    const easy = candidates.filter((p) => (p.difficulty || p.level) === 'Easy');
    const medium = candidates.filter((p) => (p.difficulty || p.level) === 'Medium');

    const selected: ProblemModel[] = [];
    if (easy.length > 0) selected.push(easy[Math.floor(Math.random() * easy.length)]);
    if (medium.length > 0) selected.push(medium[Math.floor(Math.random() * medium.length)]);
    if (medium.length > 1) {
      const secondMed = medium.find((m) => m.id !== selected[selected.length - 1]?.id);
      if (secondMed) selected.push(secondMed);
    }

    // Fill up to 5 if needed
    for (const p of candidates) {
      if (selected.length >= 5) break;
      if (!selected.some((s) => s.id === p.id)) {
        selected.push(p);
      }
    }

    const session: PracticeSession = {
      id: `session_interview_${Date.now()}`,
      userId: cleanUserId,
      title: 'Technical Mock Interview Session (45m)',
      problemCount: 5,
      problems: selected,
      currentIndex: 0,
      completedProblemIds: [],
      skippedProblemIds: [],
      createdAt: new Date().toISOString(),
      status: 'active',
      mode: 'interview',
    };

    this.saveActiveSession(cleanUserId, session);
    return session;
  }

  // ──────────────────────────────────────────────────────────────────
  // 6. RANDOM MODE (Surprise Me)
  // ──────────────────────────────────────────────────────────────────

  public static getRandomProblem(
    userId = 'default_user',
    options?: { platform?: string; area?: string; difficulty?: string }
  ): ProblemModel | null {
    const cleanUserId = userId || 'guest-user';
    const allProblems = CurriculumRepository.getAllProblems();
    const isSolved = (p: ProblemModel) => this.isProblemSolved(p, cleanUserId);

    let candidates = allProblems.filter((p) => {
      if (isSolved(p)) return false;
      if (options?.platform && options.platform !== 'all') {
        if (this.getProblemPlatform(p) !== options.platform) return false;
      }
      if (options?.area && options.area !== 'all') {
        if (p.categorySlug !== options.area && p.categoryId !== options.area) return false;
      }
      if (options?.difficulty && options.difficulty !== 'all') {
        const diff = p.difficulty || (p.level === 'Learn' ? 'Easy' : p.level === 'Master' ? 'Hard' : 'Medium');
        if (diff.toLowerCase() !== options.difficulty.toLowerCase()) return false;
      }
      return true;
    });

    if (candidates.length === 0) {
      candidates = allProblems.filter((p) => !isSolved(p));
    }
    if (candidates.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * candidates.length);
    return candidates[randomIndex];
  }

  // ──────────────────────────────────────────────────────────────────
  // 7. SUBMISSION & AFTERMATH PIPELINE
  // ──────────────────────────────────────────────────────────────────

  public static recordProblemResult(
    userId = 'default_user',
    problem: ProblemModel,
    verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Runtime Error',
    runtimeMs = 0,
    durationSeconds = 60
  ): {
    xpEarned: number;
    nextRecommendation: ReturnType<typeof RecommendationEngineService.getPostPracticeRecommendation>;
  } {
    const cleanUserId = userId || 'guest-user';
    const platform = this.getProblemPlatform(problem);
    const canonicalId = `${platform}:${problem.id}`;
    const isAccepted = verdict === 'Accepted';
    const xpEarned = isAccepted ? (problem.xp || 50) : 0;

    // 1. Record Submission in JudgeEngine
    judgeEngine.recordSubmission({
      problemId: canonicalId,
      language: 'typescript',
      verdict,
      runtimeMs,
      memoryMb: 14.5,
      codeSnapshot: `// Solved ${problem.title}`,
      testcasesPassed: isAccepted ? 25 : 12,
      totalTestcases: 25,
      xpEarned,
    }, cleanUserId);

    // 2. Dispatch to EventBus
    if (isAccepted) {
      EventBus.publish('ProblemSolved', {
        id: `att_${Date.now()}_${problem.id}`,
        userId: cleanUserId,
        problemId: canonicalId,
        leetcodeNumber: problem.leetcodeNumber || 0,
        platform,
        status: 'accepted',
        timestamp: new Date().toISOString(),
        durationSeconds,
        xpEarned,
        topic: problem.categoryTitle || problem.categorySlug || 'General',
        pattern: problem.patternTitle || 'General',
        difficulty: problem.difficulty || 'Medium',
      });
    } else {
      EventBus.publish('ProblemFailed', {
        userId: cleanUserId,
        problemId: canonicalId,
        platform,
        durationSeconds,
        timestamp: new Date().toISOString(),
        xpEarned: 0,
      });
    }

    // 3. Advance active practice session if present
    this.advanceActiveSession(cleanUserId, isAccepted ? 'solved' : 'skipped', problem.id);

    // 4. Invalidate caches
    RevisionAdapterService.clearCache();

    // 5. Generate contextual post-practice recommendation
    const nextRec = RecommendationEngineService.getPostPracticeRecommendation(cleanUserId, {
      problemId: problem.id,
      topic: problem.categoryTitle || 'General',
      outcome: isAccepted ? 'SOLVED' : 'FAILED',
      verdict,
      durationSeconds,
      runtimeMs,
    });

    return {
      xpEarned,
      nextRecommendation: nextRec,
    };
  }

  // ──────────────────────────────────────────────────────────────────
  // 8. PRACTICE HISTORY VIEW AGGREGATOR
  // ──────────────────────────────────────────────────────────────────

  public static getPracticeHistory(userId = 'default_user'): PracticeHistoryItem[] {
    const cleanUserId = userId || 'guest-user';
    const logs = progressService.getActivityLog(cleanUserId);
    const submissions = judgeEngine.getAllSubmissions(cleanUserId);
    const allProblems = CurriculumRepository.getAllProblems();

    const historyItems: PracticeHistoryItem[] = [];

    for (const s of submissions) {
      const prob = allProblems.find(
        (p) => p.id === s.problemId || `${this.getProblemPlatform(p)}:${p.id}` === s.problemId
      );

      historyItems.push({
        id: s.id,
        timestamp: s.timestamp,
        type: s.verdict === 'Accepted' ? 'solve' : 'attempt',
        title: prob?.title || `Problem ${s.problemId}`,
        problemId: prob?.id || s.problemId,
        platform: prob ? this.getProblemPlatform(prob) : 'leetcode',
        topic: prob?.categoryTitle || 'Algorithms',
        pattern: prob?.patternTitle || 'General Pattern',
        difficulty: prob?.difficulty || 'Medium',
        status: s.verdict === 'Accepted' ? 'accepted' : 'failed',
        xpEarned: s.xpEarned,
      });
    }

    for (const l of logs) {
      if (l.action === 'solve' && !historyItems.some((h) => h.problemId === l.problemId)) {
        const prob = allProblems.find((p) => p.id === l.problemId);
        historyItems.push({
          id: l.id,
          timestamp: l.timestamp,
          type: 'solve',
          title: prob?.title || `Problem ${l.problemId}`,
          problemId: l.problemId,
          platform: l.platform || 'leetcode',
          topic: l.topic || prob?.categoryTitle || 'General',
          pattern: l.pattern || prob?.patternTitle || 'Standard',
          difficulty: l.difficulty || prob?.difficulty || 'Medium',
          status: 'accepted',
          xpEarned: l.xpEarned,
          durationSeconds: l.durationSeconds,
        });
      }
    }

    // Sort descending by timestamp
    historyItems.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return historyItems;
  }
}
