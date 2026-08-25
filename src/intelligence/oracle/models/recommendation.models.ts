/**
 * Oracle AI Engine — Recommendation & Category Models
 * Defines UnifiedOracleRecommendation, RecommendationCategory, and RecommendationLifecycleState.
 */

import { DecisionTrace } from './oracle.models';
import { ConfidenceBreakdown } from './confidence.models';

export type RecommendationCategory =
  | 'Solve Next'
  | 'Revise'
  | 'Learn'
  | 'Contest'
  | 'Rating'
  | 'Interview'
  | 'Review'
  | 'Long-Term Goal';

export type RecommendationLifecycleState =
  | 'Generated'
  | 'Accepted'
  | 'Deferred'
  | 'Ignored'
  | 'Completed'
  | 'Expired';

export interface UnifiedOracleRecommendation {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category: RecommendationCategory;
  readonly state: RecommendationLifecycleState;
  readonly priority: 'Critical' | 'High' | 'Medium' | 'Low';
  readonly rankingScore: number; // 0 to 100
  readonly confidenceBreakdown: ConfidenceBreakdown;
  readonly expectedBenefit: string;
  readonly estimatedDurationMinutes: number;
  readonly contributingEngines: ReadonlyArray<string>;
  readonly engineContributionMap: Record<string, number>; // e.g. { MemoryEngine: 40, WeaknessAnalyzer: 25, ... }
  readonly decisionTraces: ReadonlyArray<DecisionTrace>;
  readonly supportingMetrics: Record<string, number | string>;
  readonly reasoning: string;
  readonly suggestedAction: string;
  readonly followUpAction: string;
  readonly createdAt: string;
}
