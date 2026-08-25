/**
 * Adaptive Engine — Decision Explanation Models
 * Structured, human-readable explanations for all adaptive strategies and progression decisions.
 */

export interface AdaptiveDecisionExplanation {
  readonly selectedStrategy: string;
  readonly reasoning: string;
  readonly confidenceScore: number; // 0 to 100
  readonly contributingFactors: ReadonlyArray<string>;
  readonly createdAt: string;
}
