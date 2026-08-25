/**
 * Oracle AI Engine — Conflict Resolution Model
 * Defines ConflictResolutionReport for resolving conflicting engine recommendations deterministically.
 */

import { UnifiedOracleRecommendation } from './recommendation.models';

export interface ConflictResolutionReport {
  readonly id: string;
  readonly detectedConflict: string;
  readonly winningRecommendation: UnifiedOracleRecommendation;
  readonly rejectedAlternatives: ReadonlyArray<UnifiedOracleRecommendation>;
  readonly conflictReason: string;
  readonly resolvedAt: string;
}
