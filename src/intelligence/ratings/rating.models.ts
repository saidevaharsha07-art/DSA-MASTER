/**
 * Rating Engine — Models & Abstractions
 * Platform-agnostic rating abstractions, normalized rating models, and deterministic prediction reports.
 */

import { PlatformId } from '@/src/platforms/types';

export interface NormalizedRating {
  readonly platform: PlatformId;
  readonly rawRating: number;
  readonly normalizedScore: number; // 0 to 100
  readonly division: string;
  readonly percentile: number;
  readonly performanceScore: number; // 0 to 100
}

export interface RatingPredictionReport {
  readonly platform: PlatformId;
  readonly currentRating: number;
  readonly projectedRating: number;
  readonly estimatedContestsToTarget: number;
  readonly confidenceScore: number; // 0 to 100
  readonly assumptions: ReadonlyArray<string>;
  readonly influencingFactors: ReadonlyArray<string>;
  readonly suggestedActions: ReadonlyArray<string>;
  readonly predictedAt: string;
}

export interface RatingHistoryPoint {
  readonly date: string;
  readonly platform: PlatformId;
  readonly rating: number;
  readonly ratingChange: number;
}
