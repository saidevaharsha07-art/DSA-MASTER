/**
 * Contest Intelligence — Platform-Agnostic Contest Models
 * Core models, lifecycle states, and immutable performance snapshots.
 */

import { PlatformId } from '@/src/platforms/types';

export type ContestLifecycleState = 'upcoming' | 'registered' | 'active' | 'completed' | 'analyzed';

export interface ContestRecord {
  readonly id: string;
  readonly platform: PlatformId;
  readonly contestId: string;
  readonly name: string;
  readonly date: string; // ISO date string
  readonly durationMinutes: number;
  readonly lifecycleState: ContestLifecycleState;
  readonly rank: number;
  readonly totalParticipants: number;
  readonly ratingBefore: number;
  readonly ratingAfter: number;
  readonly ratingChange: number;
  readonly solvedCount: number;
  readonly attemptedCount: number;
  readonly penaltiesMinutes: number;
  readonly performanceRating?: number;
}

export interface ContestSnapshot {
  readonly snapshotId: string;
  readonly userId: string;
  readonly contestId: string;
  readonly platform: PlatformId;
  readonly date: string;
  readonly rank: number;
  readonly ratingAfter: number;
  readonly ratingChange: number;
  readonly solvedCount: number;
  readonly capturedAt: string;
}

export interface ContestAnalysis {
  readonly userId: string;
  readonly analyzedAt: string;
  readonly totalContests: number;
  readonly averageRank: number;
  readonly averagePercentile: number; // 0.0 to 100.0
  readonly averageRatingGain: number;
  readonly netRatingGain: number;
  readonly solveSpeedAvgMinutes: number;
  readonly consistencyScore: number; // 0 to 100
  readonly primaryContestSummary: string;
}
