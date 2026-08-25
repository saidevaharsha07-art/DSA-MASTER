/**
 * Oracle AI Engine — Simulation Models
 * Defines SimulationScenario and SimulationResult for What-If scenario projections.
 */

import { OracleDashboardSnapshot } from './dashboard.models';
import { UnifiedOracleRecommendation } from './recommendation.models';

export type SimulationScenarioType =
  | 'solve_10_arrays'
  | 'increase_rating_100'
  | 'complete_review_queue'
  | 'skip_revision_1_week';

export interface SimulationResult {
  readonly scenarioType: SimulationScenarioType;
  readonly scenarioDescription: string;
  readonly projectedDashboard: OracleDashboardSnapshot;
  readonly projectedRecommendations: ReadonlyArray<UnifiedOracleRecommendation>;
  readonly projectedScoreDelta: number;
  readonly simulatedAt: string;
}
