/**
 * Memory Engine — Memory State Machine
 * Deterministically computes memory state transitions based on review count, recall probability, and mastery score.
 */

import { MemoryState, ConceptMemory } from '../models/memory.models';
import { ReviewOutcome } from '../models/review.models';

export class MemoryStateMachine {
  /**
   * Deterministically transition concept memory state based on review outcome and current recall metrics.
   */
  public static transitionState(
    current: ConceptMemory,
    outcome: ReviewOutcome
  ): MemoryState {
    if (outcome === 'failure') {
      return current.estimatedRecallProbability < 0.30 ? 'Forgotten' : 'AtRisk';
    }

    if (current.state === 'New') {
      return 'Learning';
    }

    if (current.reviewCount + 1 >= 3 && current.stabilityScore >= 14 && current.masteryScore >= 85) {
      return 'Mastered';
    }

    if (current.stabilityScore >= 14 && current.estimatedRecallProbability >= 0.80) {
      return 'Stable';
    }

    if (current.reviewCount + 1 >= 2) {
      return 'Reinforcing';
    }

    return 'Learning';
  }
}
