/**
 * Intelligence Service — Profile Service
 * Manages user profile persistence, records problem attempts, updates streaks, and calculates XP gains.
 */

import { LearningProfile, StreakInfo } from '../models/learning-profile';
import { PracticeAttempt } from '../models/practice-history';
import { IIntelligenceStorage, InMemoryIntelligenceStorage } from '../storage/intelligence.storage';
import { TopicAnalyzer } from '../analyzers/topic.analyzer';
import { DifficultyAnalyzer } from '../analyzers/difficulty.analyzer';
import { calculateUpdatedStreak } from '../domain/streak.rules';
import { formatDateYYYYMMDD, safeISODateString } from '../utils/data-helpers';
import { PlatformId } from '@/src/platforms/types';

export class ProfileService {
  private storage: IIntelligenceStorage;

  constructor(storage?: IIntelligenceStorage) {
    this.storage = storage || new InMemoryIntelligenceStorage();
  }

  /**
   * Gets or initializes user learning profile.
   */
  public async getProfile(userId: string): Promise<LearningProfile> {
    const existing = await this.storage.getProfile(userId);
    if (existing) {
      return existing;
    }
    return ProfileService.createEmptyProfile(userId);
  }

  /**
   * Records a problem attempt/solve and updates profile state & streak.
   */
  public async recordAttempt(attempt: PracticeAttempt): Promise<LearningProfile> {
    await this.storage.saveAttempt(attempt);

    const attempts = await this.storage.getAttempts(attempt.userId);
    const profile = await this.getProfile(attempt.userId);

    // Update solved and attempted IDs
    const solvedSet = new Set(profile.solvedProblemIds);
    const attemptedSet = new Set(profile.attemptedProblemIds);

    attemptedSet.add(attempt.problemId);
    if (attempt.status === 'accepted') {
      solvedSet.add(attempt.problemId);
    }

    // Recalculate streak
    const dateStr = formatDateYYYYMMDD(attempt.timestamp);
    const streakInfo: StreakInfo = calculateUpdatedStreak(profile.streakInfo, dateStr);

    // Recalculate topic & pattern mastery
    const topicMastery = TopicAnalyzer.analyzeTopics(attempts);
    const patternMastery = TopicAnalyzer.analyzePatterns(attempts);
    const difficultyProgression = DifficultyAnalyzer.analyzeDifficultyProgression(attempts);

    // Recalculate platform distribution
    const platformDistribution = new Map();
    const platCounts = new Map<PlatformId, number>();
    for (const a of attempts) {
      if (a.status === 'accepted') {
        const c = platCounts.get(a.platform) || 0;
        platCounts.set(a.platform, c + 1);
      }
    }
    const totalSolvedCount = solvedSet.size;
    for (const [plat, count] of Array.from(platCounts.entries())) {
      const percentage = totalSolvedCount > 0 ? Number(((count / totalSolvedCount) * 100).toFixed(1)) : 0;
      platformDistribution.set(plat, { platform: plat, solvedCount: count, percentage });
    }

    const updatedProfile: LearningProfile = {
      userId: attempt.userId,
      createdAt: profile.createdAt,
      lastActivityAt: safeISODateString(attempt.timestamp),
      totalXp: profile.totalXp + (attempt.status === 'accepted' ? attempt.xpEarned : 0),
      solvedProblemIds: Object.freeze(solvedSet),
      attemptedProblemIds: Object.freeze(attemptedSet),
      topicMastery: Object.freeze(topicMastery),
      patternMastery: Object.freeze(patternMastery),
      difficultyProgression: Object.freeze(difficultyProgression),
      platformDistribution: Object.freeze(platformDistribution),
      streakInfo,
    };

    await this.storage.saveProfile(updatedProfile);
    return updatedProfile;
  }

  /**
   * Helper: Creates a clean empty profile for a new user.
   */
  public static createEmptyProfile(userId: string): LearningProfile {
    const now = new Date().toISOString();
    return {
      userId,
      createdAt: now,
      lastActivityAt: now,
      totalXp: 0,
      solvedProblemIds: Object.freeze(new Set<string>()),
      attemptedProblemIds: Object.freeze(new Set<string>()),
      topicMastery: Object.freeze(new Map()),
      patternMastery: Object.freeze(new Map()),
      difficultyProgression: Object.freeze(new Map()),
      platformDistribution: Object.freeze(new Map()),
      streakInfo: {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: '',
        activeDaysCount: 0,
      },
    };
  }

  public static recordAttempt(profile: LearningProfile, attempt: PracticeAttempt): LearningProfile {
    const solvedSet = new Set(profile.solvedProblemIds);
    const attemptedSet = new Set(profile.attemptedProblemIds);

    attemptedSet.add(attempt.problemId);
    if (attempt.status === 'accepted') {
      solvedSet.add(attempt.problemId);
    }

    const dateStr = formatDateYYYYMMDD(attempt.timestamp);
    const streakInfo: StreakInfo = calculateUpdatedStreak(profile.streakInfo, dateStr);

    return {
      ...profile,
      lastActivityAt: safeISODateString(attempt.timestamp),
      totalXp: profile.totalXp + (attempt.status === 'accepted' ? attempt.xpEarned : 0),
      solvedProblemIds: Object.freeze(solvedSet),
      attemptedProblemIds: Object.freeze(attemptedSet),
      streakInfo,
    };
  }
}
