/**
 * Oracle AI Strategy — Contest Prep Strategy
 * Prioritizes contest readiness, speed under time pressure, and timed simulation.
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleContestStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Contest Prep';
  public readonly description = 'Prioritizes contest readiness, speed optimization, and division ladder climb.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.15,
      masteryGapWeight: 0.20,
      contestReadinessWeight: 0.45,
      ratingGainWeight: 0.20,
    };
  }
}
