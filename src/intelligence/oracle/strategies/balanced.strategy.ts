/**
 * Oracle AI Strategy — Balanced Strategy (Default)
 * Equal weights across memory retention, topic mastery, contest readiness, and rating progression.
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleBalancedStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Balanced';
  public readonly description = 'Balances memory revision, weakness repair, contest preparation, and rating climb equally.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.30,
      masteryGapWeight: 0.30,
      contestReadinessWeight: 0.20,
      ratingGainWeight: 0.20,
    };
  }
}
