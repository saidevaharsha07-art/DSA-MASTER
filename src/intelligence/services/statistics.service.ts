/**
 * Intelligence Service — Statistics Service
 * Aggregates structured platform-independent statistics models.
 */

import { LearningProfile } from '../models/learning-profile';
import { PracticeAttempt } from '../models/practice-history';
import { PlatformId } from '@/src/platforms/types';

export interface PlatformBreakdown {
  readonly platform: PlatformId;
  readonly solvedCount: number;
  readonly percentage: number;
}

export interface TopicBreakdownItem {
  readonly topic: string;
  readonly solvedCount: number;
  readonly accuracy: number;
  readonly masteryScore: number;
}

export interface PatternBreakdownItem {
  readonly pattern: string;
  readonly topic: string;
  readonly solvedCount: number;
  readonly accuracy: number;
}

export interface RatingDistributionItem {
  readonly difficulty: string;
  readonly solvedCount: number;
  readonly accuracy: number;
}

export interface ActivityTimelineItem {
  readonly date: string; // YYYY-MM-DD
  readonly solvedCount: number;
  readonly attemptsCount: number;
}

export interface UserStatisticsSummary {
  readonly userId: string;
  readonly totalSolved: number;
  readonly totalAttempted: number;
  readonly overallAccuracy: number;
  readonly totalXp: number;
  readonly platformBreakdown: ReadonlyArray<PlatformBreakdown>;
  readonly topicBreakdown: ReadonlyArray<TopicBreakdownItem>;
  readonly patternBreakdown: ReadonlyArray<PatternBreakdownItem>;
  readonly ratingDistribution: ReadonlyArray<RatingDistributionItem>;
  readonly activityTimeline: ReadonlyArray<ActivityTimelineItem>;
  readonly currentStreak: number;
  readonly longestStreak: number;
}

export class StatisticsService {
  /**
   * Generates a structured UserStatisticsSummary from profile and attempts history.
   */
  public generateStatistics(
    profile: LearningProfile,
    attempts: ReadonlyArray<PracticeAttempt>
  ): UserStatisticsSummary {
    const totalSolved = profile.solvedProblemIds.size;
    const totalAttempted = profile.attemptedProblemIds.size;
    const acceptedAttempts = attempts.filter((a) => a.status === 'accepted').length;
    const overallAccuracy = attempts.length > 0 ? Number((acceptedAttempts / attempts.length).toFixed(2)) : 0.0;

    // Platform Breakdown
    const platformBreakdown: PlatformBreakdown[] = Array.from(profile.platformDistribution.values());

    // Topic Breakdown
    const topicBreakdown: TopicBreakdownItem[] = [];
    for (const [topic, state] of Array.from(profile.topicMastery.entries())) {
      topicBreakdown.push({
        topic,
        solvedCount: state.solvedCount,
        accuracy: state.accuracy,
        masteryScore: state.masteryScore,
      });
    }
    topicBreakdown.sort((a, b) => b.solvedCount - a.solvedCount);

    // Pattern Breakdown
    const patternBreakdown: PatternBreakdownItem[] = [];
    for (const [pattern, state] of Array.from(profile.patternMastery.entries())) {
      patternBreakdown.push({
        pattern,
        topic: state.topic,
        solvedCount: state.solvedCount,
        accuracy: state.accuracy,
      });
    }
    patternBreakdown.sort((a, b) => b.solvedCount - a.solvedCount);

    // Rating Distribution
    const ratingDistribution: RatingDistributionItem[] = [];
    for (const [diff, state] of Array.from(profile.difficultyProgression.entries())) {
      ratingDistribution.push({
        difficulty: diff,
        solvedCount: state.solvedCount,
        accuracy: state.accuracy,
      });
    }

    // Activity Timeline
    const timelineMap = new Map<string, { solved: number; attempts: number }>();
    for (const a of attempts) {
      const dateStr = a.timestamp.split('T')[0] || new Date().toISOString().split('T')[0];
      const entry = timelineMap.get(dateStr) || { solved: 0, attempts: 0 };
      entry.attempts++;
      if (a.status === 'accepted') entry.solved++;
      timelineMap.set(dateStr, entry);
    }

    const activityTimeline: ActivityTimelineItem[] = Array.from(timelineMap.entries())
      .map(([date, data]) => ({ date, solvedCount: data.solved, attemptsCount: data.attempts }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return {
      userId: profile.userId,
      totalSolved,
      totalAttempted,
      overallAccuracy,
      totalXp: profile.totalXp,
      platformBreakdown: Object.freeze(platformBreakdown),
      topicBreakdown: Object.freeze(topicBreakdown),
      patternBreakdown: Object.freeze(patternBreakdown),
      ratingDistribution: Object.freeze(ratingDistribution),
      activityTimeline: Object.freeze(activityTimeline),
      currentStreak: profile.streakInfo.currentStreak,
      longestStreak: profile.streakInfo.longestStreak,
    };
  }
}
