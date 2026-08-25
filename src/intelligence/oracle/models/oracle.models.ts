/**
 * Oracle AI Engine — Core Models & Decision Trace
 * Defines OracleContext, DecisionTrace, and configuration structures.
 */

export interface DecisionTrace {
  readonly contributingEngine: string;
  readonly engineOutputSummary: string;
  readonly weightApplied: number;
  readonly contributionScore: number;
  readonly finalWeightedScore: number;
}

export interface OracleConfig {
  readonly activeStrategy: string;
  readonly maxRecommendations: number;
  readonly enableConflictResolution: boolean;
}

export interface OracleContext {
  readonly userId: string;
  readonly timestamp: string;
}
