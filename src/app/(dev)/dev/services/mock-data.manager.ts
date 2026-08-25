/**
 * Dev Tools Suite — Centralized Mock Data Manager
 * Generates pre-built profile presets (Beginner, Intermediate, Advanced, Empty, Random) and mock histories.
 */

import { LearningProfile, MasteryLevel, PlatformDistributionState, TopicMasteryState } from '@/src/intelligence/models/learning-profile';
import { ContestRecord } from '@/src/intelligence/contests/contest.models';
import { PlatformId } from '@/src/platforms/types';

export type ProfilePreset = 'Beginner' | 'Intermediate' | 'Advanced' | 'Empty' | 'Random';

export class DevMockDataManager {
  public static getProfilePreset(preset: ProfilePreset, userId: string = 'dev-user'): LearningProfile {
    const now = new Date().toISOString();

    if (preset === 'Empty') {
      return {
        userId,
        createdAt: now,
        lastActivityAt: now,
        totalXp: 0,
        solvedProblemIds: Object.freeze(new Set<string>()),
        attemptedProblemIds: Object.freeze(new Set<string>()),
        topicMastery: Object.freeze(new Map<string, TopicMasteryState>()),
        patternMastery: Object.freeze(new Map()),
        difficultyProgression: Object.freeze(new Map()),
        platformDistribution: Object.freeze(new Map<PlatformId, PlatformDistributionState>()),
        streakInfo: { currentStreak: 0, longestStreak: 0, lastActiveDate: '', activeDaysCount: 0 },
      };
    }

    if (preset === 'Beginner') {
      const solved = new Set<string>(['FLOW001', 'FLOW002', 'FLOW004', 'START01', 'lc-1']);
      const attempted = new Set<string>(['FLOW001', 'FLOW002', 'FLOW004', 'START01', 'lc-1', 'FLOW006']);
      return {
        userId,
        createdAt: now,
        lastActivityAt: now,
        totalXp: 120,
        solvedProblemIds: Object.freeze(solved),
        attemptedProblemIds: Object.freeze(attempted),
        topicMastery: Object.freeze(
          new Map<string, TopicMasteryState>([
            ['Arrays', { topic: 'Arrays', solvedCount: 4, totalAttempts: 5, accuracy: 0.80, masteryScore: 55, level: 'Intermediate' as MasteryLevel, lastPracticedAt: now }],
            ['Math', { topic: 'Math', solvedCount: 1, totalAttempts: 2, accuracy: 0.50, masteryScore: 30, level: 'Novice' as MasteryLevel, lastPracticedAt: now }],
          ])
        ),
        patternMastery: Object.freeze(new Map()),
        difficultyProgression: Object.freeze(
          new Map([
            ['Beginner', { difficulty: 'Beginner', solvedCount: 4, accuracy: 0.85, isCeiling: false, readyToAdvance: true }],
            ['Easy', { difficulty: 'Easy', solvedCount: 1, accuracy: 0.50, isCeiling: true, readyToAdvance: false }],
          ])
        ),
        platformDistribution: Object.freeze(
          new Map<PlatformId, PlatformDistributionState>([
            ['codechef', { platform: 'codechef', solvedCount: 4, percentage: 80 }],
            ['leetcode', { platform: 'leetcode', solvedCount: 1, percentage: 20 }],
          ])
        ),
        streakInfo: { currentStreak: 3, longestStreak: 5, lastActiveDate: now.split('T')[0], activeDaysCount: 6 },
      };
    }

    // Advanced or Intermediate default
    const solved = new Set<string>(['FLOW001', 'FLOW002', 'FLOW004', 'START01', 'lc-1', 'lc-3', 'lc-146', 'CF101A', 'CF101B', 'CF102A', 'FLOW016']);
    const attempted = new Set<string>(Array.from(solved).concat(['CF102B', 'DP001', 'GRAPH01']));
    return {
      userId,
      createdAt: now,
      lastActivityAt: now,
      totalXp: 450,
      solvedProblemIds: Object.freeze(solved),
      attemptedProblemIds: Object.freeze(attempted),
      topicMastery: Object.freeze(
        new Map<string, TopicMasteryState>([
          ['Arrays', { topic: 'Arrays', solvedCount: 5, totalAttempts: 6, accuracy: 0.83, masteryScore: 85, level: 'Master' as MasteryLevel, lastPracticedAt: now }],
          ['Strings', { topic: 'Strings', solvedCount: 3, totalAttempts: 4, accuracy: 0.75, masteryScore: 70, level: 'Proficient' as MasteryLevel, lastPracticedAt: now }],
          ['Dynamic Programming', { topic: 'Dynamic Programming', solvedCount: 1, totalAttempts: 3, accuracy: 0.33, masteryScore: 25, level: 'Novice' as MasteryLevel, lastPracticedAt: now }],
        ])
      ),
      patternMastery: Object.freeze(new Map()),
      difficultyProgression: Object.freeze(
        new Map([
          ['Beginner', { difficulty: 'Beginner', solvedCount: 5, accuracy: 0.90, isCeiling: false, readyToAdvance: true }],
          ['Easy', { difficulty: 'Easy', solvedCount: 4, accuracy: 0.80, isCeiling: false, readyToAdvance: true }],
          ['Medium', { difficulty: 'Medium', solvedCount: 2, accuracy: 0.50, isCeiling: true, readyToAdvance: false }],
        ])
      ),
      platformDistribution: Object.freeze(
        new Map<PlatformId, PlatformDistributionState>([
          ['codechef', { platform: 'codechef', solvedCount: 6, percentage: 54.5 }],
          ['codeforces', { platform: 'codeforces', solvedCount: 3, percentage: 27.3 }],
          ['leetcode', { platform: 'leetcode', solvedCount: 2, percentage: 18.2 }],
        ])
      ),
      streakInfo: { currentStreak: 7, longestStreak: 12, lastActiveDate: now.split('T')[0], activeDaysCount: 18 },
    };
  }

  public static getDemoContestHistory(userId: string = 'dev-user'): ContestRecord[] {
    return [
      {
        id: 'c-cc-101',
        platform: 'codechef',
        contestId: 'START99',
        name: 'Starters 99',
        date: '2026-07-15T14:30:00Z',
        durationMinutes: 120,
        lifecycleState: 'completed',
        rank: 600,
        totalParticipants: 5000,
        ratingBefore: 1400,
        ratingAfter: 1435,
        ratingChange: 35,
        solvedCount: 3,
        attemptedCount: 4,
        penaltiesMinutes: 10,
        performanceRating: 1520,
      },
      {
        id: 'c-cf-201',
        platform: 'codeforces',
        contestId: 'CF900',
        name: 'Codeforces Div. 3 Round 900',
        date: '2026-07-22T14:35:00Z',
        durationMinutes: 120,
        lifecycleState: 'completed',
        rank: 1200,
        totalParticipants: 12000,
        ratingBefore: 1200,
        ratingAfter: 1245,
        ratingChange: 45,
        solvedCount: 3,
        attemptedCount: 5,
        penaltiesMinutes: 15,
        performanceRating: 1350,
      },
    ];
  }
}
