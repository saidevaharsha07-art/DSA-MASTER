/**
 * Oracle AI Engine — What-If Simulation Engine
 * Simulates future scenarios ("If user solves 10 Array problems", "If rating increases by 100", etc.) without mutating actual state.
 */

import { OracleDashboardSnapshot } from '../models/dashboard.models';
import { SimulationScenarioType, SimulationResult } from '../models/simulation.models';

export class SimulationEngine {
  /**
   * Pure function: Simulates future scenario projections on top of a current OracleDashboardSnapshot.
   */
  public static simulate(currentSnapshot: OracleDashboardSnapshot, scenario: SimulationScenarioType): SimulationResult {
    let scoreDelta = 0;
    let description = '';

    const projectedScore = { ...currentSnapshot.overallLearningScore };

    switch (scenario) {
      case 'solve_10_arrays': {
        scoreDelta = 6;
        description = 'Simulated outcome if user solves 10 targeted Array problems.';
        break;
      }
      case 'increase_rating_100': {
        scoreDelta = 8;
        description = 'Simulated outcome if user rating increases by +100 points.';
        break;
      }
      case 'complete_review_queue': {
        scoreDelta = 10;
        description = 'Simulated outcome if user completes all overdue memory reviews today.';
        break;
      }
      case 'skip_revision_1_week': {
        scoreDelta = -12;
        description = 'Simulated outcome if user skips spaced repetition revisions for 1 week.';
        break;
      }
    }

    const newOverall = Math.max(0, Math.min(100, projectedScore.overallScore + scoreDelta));
    const projectedDashboard: OracleDashboardSnapshot = {
      ...currentSnapshot,
      memoryHealth: Math.max(0, Math.min(100, currentSnapshot.memoryHealth + (scoreDelta > 0 ? 5 : -10))),
      overallLearningScore: {
        ...projectedScore,
        overallScore: newOverall,
      },
      lastUpdated: new Date().toISOString(),
    };

    return {
      scenarioType: scenario,
      scenarioDescription: description,
      projectedDashboard,
      projectedRecommendations: currentSnapshot.recommendations,
      projectedScoreDelta: scoreDelta,
      simulatedAt: new Date().toISOString(),
    };
  }
}
