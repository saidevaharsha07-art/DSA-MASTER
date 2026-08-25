/**
 * Oracle AI Strategy — Rating Climb Strategy
 * Focuses on competitive programming rating milestones (e.g. Codeforces Specialist, CodeChef 3★).
 */

import { IOracleStrategy, OracleStrategyName, StrategyWeights } from './strategy.interface';

export class OracleRatingStrategy implements IOracleStrategy {
  public readonly name: OracleStrategyName = 'Rating Climb';
  public readonly description = 'Targets rating progression milestones on CodeChef, Codeforces, and LeetCode.';

  public getWeights(): StrategyWeights {
    return {
      memoryRiskWeight: 0.15,
      masteryGapWeight: 0.25,
      contestReadinessWeight: 0.20,
      ratingGainWeight: 0.40,
    };
  }
}
