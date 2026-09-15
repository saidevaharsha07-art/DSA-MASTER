/**
 * Adaptive Data Adapter Service (Phase 4A)
 * Converts canonical ProgressService state (UserState, dsa-activity-log) and MemoryEngine state
 * into existing intelligence domain contracts (LearningProfile, PracticeAttempt, WeaknessAnalysis, StrengthAnalysis).
 */

import { progressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { PracticeAttempt } from '@/src/intelligence/models/practice-history';
import { LearningProfile } from '@/src/intelligence/models/learning-profile';
import { WeaknessAnalysis, StrengthAnalysis } from '@/src/intelligence/models/weakness';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { TopicAnalyzer } from '@/src/intelligence/analyzers/topic.analyzer';
import { DifficultyAnalyzer } from '@/src/intelligence/analyzers/difficulty.analyzer';
import { PlatformId } from '@/src/platforms/types';

export class AdaptiveDataAdapterService {
  private static get memoryEngine(): MemoryEngine {
    if (!Container.has('MemoryEngine')) {
      Container.registerSingleton('MemoryEngine', new MemoryEngine());
    }
    return Container.resolve<MemoryEngine>('MemoryEngine');
  }

  /**
   * Reconstructs canonical PracticeAttempt array from ProgressService activity log.
   */
  public static getCanonicalAttempts(userId = 'default_user'): PracticeAttempt[] {
    const logs = progressService.getActivityLog(userId);
    return logs.map((l, idx) => ({
      id: `att-${l.timestamp}-${idx}`,
      userId,
      problemId: l.problemId,
      platform: (l.platform as PlatformId) || 'codechef',
      status: l.action === 'solve' ? 'accepted' : 'attempted',
      timestamp: l.timestamp,
      durationSeconds: l.durationSeconds || 0,
      xpEarned: l.xpEarned || (l.action === 'solve' ? 50 : 0),
      hintsUsed: 0,
      topic: l.topic,
      pattern: l.pattern,
    }));
  }

  /**
   * Builds a unified LearningProfile from canonical ProgressService state and ActivityRecords.
   */
  public static getCanonicalProfile(userId = 'default_user'): LearningProfile {
    const state = progressService.getState(userId);
    const attempts = this.getCanonicalAttempts(userId);

    const solvedSet = new Set<string>([
      ...state.completed.map((num) => `leetcode:${num}`),
      ...(state.completedProblemIds || []),
    ]);

    const attemptedSet = new Set<string>([
      ...Array.from(solvedSet),
      ...attempts.map((a) => a.problemId),
    ]);

    const topicMastery = TopicAnalyzer.analyzeTopics(attempts);
    const patternMastery = TopicAnalyzer.analyzePatterns(attempts);
    const difficultyProgression = DifficultyAnalyzer.analyzeDifficultyProgression(attempts);

    const platCounts = new Map<PlatformId, number>();
    for (const a of attempts) {
      if (a.status === 'accepted') {
        const c = platCounts.get(a.platform) || 0;
        platCounts.set(a.platform, c + 1);
      }
    }

    const platformDistribution = new Map();
    const totalSolved = solvedSet.size;
    for (const [plat, count] of Array.from(platCounts.entries())) {
      const percentage = totalSolved > 0 ? Number(((count / totalSolved) * 100).toFixed(1)) : 0;
      platformDistribution.set(plat, { platform: plat, solvedCount: count, percentage });
    }

    return {
      userId,
      createdAt: new Date().toISOString(),
      lastActivityAt: attempts.length > 0 ? attempts[attempts.length - 1].timestamp : new Date().toISOString(),
      totalXp: state.xp || 0,
      solvedProblemIds: Object.freeze(solvedSet),
      attemptedProblemIds: Object.freeze(attemptedSet),
      topicMastery: Object.freeze(topicMastery),
      patternMastery: Object.freeze(patternMastery),
      difficultyProgression: Object.freeze(difficultyProgression),
      platformDistribution: Object.freeze(platformDistribution),
      streakInfo: {
        currentStreak: state.currentStreak || 0,
        longestStreak: state.currentStreak || 0,
        lastActiveDate: new Date().toISOString().split('T')[0],
        activeDaysCount: Math.min(30, state.currentStreak || 0),
      },
    };
  }

  /**
   * Computes WeaknessAnalysis using pure WeaknessAnalyzer.
   */
  public static getWeaknessAnalysis(userId = 'default_user'): WeaknessAnalysis {
    const attempts = this.getCanonicalAttempts(userId);
    const profile = this.getCanonicalProfile(userId);
    return WeaknessAnalyzer.analyze(attempts, profile);
  }

  /**
   * Computes StrengthAnalysis using pure StrengthAnalyzer.
   */
  public static getStrengthAnalysis(userId = 'default_user'): StrengthAnalysis {
    const attempts = this.getCanonicalAttempts(userId);
    const profile = this.getCanonicalProfile(userId);
    return StrengthAnalyzer.analyze(attempts, profile);
  }
}
