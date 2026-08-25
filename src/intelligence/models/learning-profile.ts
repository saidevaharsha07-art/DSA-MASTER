/**
 * Intelligence Models — Learning Profile
 * Core user profile state model storing solved problems, mastery levels, and progression.
 */

import { PlatformId } from '@/src/platforms/types';

export type MasteryLevel = 'Novice' | 'Intermediate' | 'Proficient' | 'Master';

export interface TopicMasteryState {
  readonly topic: string;
  readonly solvedCount: number;
  readonly totalAttempts: number;
  readonly accuracy: number; // 0.0 to 1.0
  readonly masteryScore: number; // 0 to 100
  readonly level: MasteryLevel;
  readonly lastPracticedAt: string;
}

export interface PatternMasteryState {
  readonly pattern: string;
  readonly topic: string;
  readonly solvedCount: number;
  readonly totalAttempts: number;
  readonly accuracy: number; // 0.0 to 1.0
  readonly masteryScore: number; // 0 to 100
  readonly level: MasteryLevel;
}

export interface DifficultyProgressionState {
  readonly difficulty: string;
  readonly solvedCount: number;
  readonly accuracy: number;
  readonly isCeiling: boolean;
  readonly readyToAdvance: boolean;
}

export interface StreakInfo {
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly lastActiveDate: string; // YYYY-MM-DD
  readonly activeDaysCount: number;
}

export interface PlatformDistributionState {
  readonly platform: PlatformId;
  readonly solvedCount: number;
  readonly percentage: number;
}

export interface LearningProfile {
  readonly userId: string;
  readonly createdAt: string;
  readonly lastActivityAt: string;
  readonly totalXp: number;
  readonly solvedProblemIds: ReadonlySet<string>;
  readonly attemptedProblemIds: ReadonlySet<string>;
  readonly topicMastery: ReadonlyMap<string, TopicMasteryState>;
  readonly patternMastery: ReadonlyMap<string, PatternMasteryState>;
  readonly difficultyProgression: ReadonlyMap<string, DifficultyProgressionState>;
  readonly platformDistribution: ReadonlyMap<PlatformId, PlatformDistributionState>;
  readonly streakInfo: StreakInfo;
}
