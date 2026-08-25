/**
 * Oracle AI Engine — Confidence Breakdown Model
 * Exposes data completeness, engine agreement, and historical reliability.
 */

export interface ConfidenceBreakdown {
  readonly overallConfidence: number; // 0 to 100
  readonly dataCompleteness: number; // 0 to 100
  readonly engineAgreement: number; // 0 to 100
  readonly historicalReliability: number; // 0 to 100
}
