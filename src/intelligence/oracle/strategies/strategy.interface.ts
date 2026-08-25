/**
 * Oracle AI Engine — Strategy Interface
 * Defines strategy weights for memory risk, mastery gap, contest readiness, and rating gain.
 */

export type OracleStrategyName =
  | 'Balanced'
  | 'Revision Focus'
  | 'Contest Prep'
  | 'Interview Prep'
  | 'Rating Climb'
  | 'Topic Mastery';

export interface StrategyWeights {
  readonly memoryRiskWeight: number;
  readonly masteryGapWeight: number;
  readonly contestReadinessWeight: number;
  readonly ratingGainWeight: number;
}

export interface IOracleStrategy {
  readonly name: OracleStrategyName;
  readonly description: string;
  getWeights(): StrategyWeights;
}
