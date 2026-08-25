/**
 * Memory Engine — Spaced Repetition Stability Engine
 * Calculates memory stability increases (e.g. 2.5x growth), drops on failure (0.5x), and next due intervals.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewOutcome } from '../models/review.models';

export interface StabilityCalculationResult {
  readonly newStabilityScore: number; // in days
  readonly stabilityDelta: number;
  readonly newNextReview: string; // ISO date
  readonly nextIntervalDays: number;
}

export class StabilityEngine {
  /**
   * Calculates new stability and next review date following a review event.
   */
  public static calculateNextStability(
    current: ConceptMemory,
    outcome: ReviewOutcome,
    now: Date = new Date()
  ): StabilityCalculationResult {
    const validNow = now && !isNaN(now.getTime()) ? now : new Date();
    const currentStability = typeof current?.stabilityScore === 'number' && !isNaN(current.stabilityScore) && current.stabilityScore > 0 ? current.stabilityScore : 1.0;

    let newStability = currentStability;

    if (outcome === 'success') {
      const multiplier = 2.5;
      newStability = Number(Math.max(1.0, currentStability * multiplier).toFixed(1));
    } else if (outcome === 'partial') {
      newStability = Number(Math.max(1.0, currentStability * 1.2).toFixed(1));
    } else {
      // Failure resets stability back down
      newStability = Number(Math.max(1.0, currentStability * 0.5).toFixed(1));
    }

    // Cap maximum interval to 10 years (3,650 days) to prevent JS Date overflow
    const calculatedInterval = Math.max(1, Math.round(newStability));
    const validInterval = Math.min(3650, isNaN(calculatedInterval) ? 1 : calculatedInterval);

    const nextTime = validNow.getTime() + validInterval * 24 * 3600 * 1000;
    const nextRevDate = new Date(isNaN(nextTime) ? validNow.getTime() + 86400000 : nextTime);

    return {
      newStabilityScore: newStability,
      stabilityDelta: Number((newStability - currentStability).toFixed(1)),
      newNextReview: nextRevDate.toISOString(),
      nextIntervalDays: validInterval,
    };
  }
}
