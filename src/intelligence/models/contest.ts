/**
 * Intelligence Models — Contest Performance
 * Models for contest analytics and performance tracking.
 */

import { PlatformId } from '@/src/platforms/types';

export interface ContestPerformance {
  readonly contestId: string;
  readonly platform: PlatformId;
  readonly name: string;
  readonly rank: number;
  readonly totalParticipants: number;
  readonly ratingBefore: number;
  readonly ratingAfter: number;
  readonly ratingChange: number;
  readonly solvedCount: number;
  readonly totalProblems: number;
  readonly attendedAt: string; // ISO date
}

export interface ContestIntelligenceSummary {
  readonly platform: PlatformId;
  readonly totalContestsAttended: number;
  readonly averageRank: number;
  readonly bestRank: number;
  readonly netRatingGain: number;
  readonly currentRating: number;
  readonly maxRating: number;
  readonly contestReadinessScore: number; // 0 to 100
}
