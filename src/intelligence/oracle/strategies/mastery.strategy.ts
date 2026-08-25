/**
 * Oracle AI Strategy — Topic Mastery Strategy
 * Focuses on systematically advancing topic mastery levels from Novice to Master.
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleMasteryStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Topic Mastery';
  public readonly description = 'Systematically elevates weak topics to Master level through structured problem sets.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.20,
      masteryGapWeight: 0.55,
      contestReadinessWeight: 0.12,
      ratingGainWeight: 0.13,
    };
  }
}
