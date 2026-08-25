/**
 * Memory Engine — Review Explanation Model
 * Provides human-readable & Oracle AI-consumable explanations for review recommendations.
 */

import { ReviewPriority } from './review.models';

export interface ReviewExplanation {
  readonly conceptId: string;
  readonly topic: string;
  readonly pattern: string;
  readonly priority: ReviewPriority;
  readonly whyDue: string;
  readonly forgettingRisk: number; // 0 to 100
  readonly expectedRecallProbability: number; // 0.0 to 1.0
  readonly lastSuccessfulReview: string;
  readonly recommendedIntervalDays: number;
  readonly confidenceScore: number; // 0 to 100
  readonly contributingFactors: ReadonlyArray<string>;
}
