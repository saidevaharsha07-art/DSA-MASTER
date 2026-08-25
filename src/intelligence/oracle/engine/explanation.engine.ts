/**
 * Oracle AI Engine — Explanation Engine
 * Generates human-readable and AI-consumable explainability metadata for recommendations.
 */

import { UnifiedOracleRecommendation } from '../models/recommendation.models';

export interface RecommendationExplanationReport {
  readonly recommendationId: string;
  readonly why: string;
  readonly contributingEngines: ReadonlyArray<string>;
  readonly confidenceScore: number;
  readonly supportingMetrics: Record<string, number | string>;
  readonly assumptions: ReadonlyArray<string>;
  readonly expectedOutcome: string;
}

export class ExplanationEngine {
  /**
   * Generates a complete RecommendationExplanationReport for a recommendation.
   */
  public static explain(rec: UnifiedOracleRecommendation): RecommendationExplanationReport {
    return {
      recommendationId: rec.id,
      why: rec.reasoning,
      contributingEngines: rec.contributingEngines,
      confidenceScore: rec.confidenceBreakdown.overallConfidence,
      supportingMetrics: rec.supportingMetrics,
      assumptions: Object.freeze([
        'Assumed active participation during planned session window.',
        'Assumed consistent focus without frequent hint usage.',
      ]),
      expectedOutcome: rec.expectedBenefit,
    };
  }
}
