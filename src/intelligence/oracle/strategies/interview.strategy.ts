/**
 * Oracle AI Strategy — Interview Prep Strategy
 * Prioritizes high-frequency interview patterns and core algorithm topics.
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleInterviewStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Interview Prep';
  public readonly description = 'Focuses on high-frequency interview coding patterns, medium difficulty problems, and optimal time complexity.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.25,
      masteryGapWeight: 0.45,
      contestReadinessWeight: 0.15,
      ratingGainWeight: 0.15,
    };
  }
}
