/**
 * Oracle AI Engine — Prioritization Score Calculator
 * Calculates a normalized 0-100 priority score using strategy weights and engine metrics.
 */

import { StrategyWeights } from '../strategies/strategy.interface';

export interface PrioritizationInput {
  readonly memoryRisk: number; // 0 to 100
  readonly masteryGap: number; // 0 to 100 (100 - mastery)
  readonly contestReadiness: number; // 0 to 100
  readonly ratingGainPotential: number; // 0 to 100
}

export class PrioritizationEngine {
  /**
   * Calculates a weighted priority score from 0 to 100.
   */
  public static calculatePriorityScore(input: PrioritizationInput, weights: StrategyWeights): number {
    const rawScore =
      input.memoryRisk * weights.memoryRiskWeight +
      input.masteryGap * weights.masteryGapWeight +
      input.contestReadiness * weights.contestReadinessWeight +
      input.ratingGainPotential * weights.ratingGainWeight;

    return Math.max(0, Math.min(100, Math.round(rawScore)));
  }
}
