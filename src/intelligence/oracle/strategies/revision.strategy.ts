/**
 * Oracle AI Strategy — Revision Focus Strategy
 * Heavily prioritizes concepts at risk of memory decay and overdue spaced repetition reviews.
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleRevisionStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Revision Focus';
  public readonly description = 'Heavily prioritizes Ebbinghaus memory decay repair and overdue spaced repetition reviews.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.60,
      masteryGapWeight: 0.20,
      contestReadinessWeight: 0.10,
      ratingGainWeight: 0.10,
    };
  }
}
