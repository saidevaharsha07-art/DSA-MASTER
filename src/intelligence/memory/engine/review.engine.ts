/**
 * Memory Engine — Review Outcome Processor
 * Processes review outcomes, applies state transitions, stability updates, and appends immutable ReviewEvent history.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewOutcome, ReviewEvent } from '../models/review.models';
import { MemoryStateMachine } from './memory.state-machine';
import { StabilityEngine } from './stability.engine';
import { ForgettingEngine } from './forgetting.engine';

export interface ProcessReviewResult {
  readonly updatedConcept: ConceptMemory;
  readonly reviewEvent: ReviewEvent;
}

export class ReviewEngine {
  /**
   * Pure function: Processes review outcome and returns updated ConceptMemory and immutable ReviewEvent.
   */
  public static processReview(
    concept: ConceptMemory,
    outcome: ReviewOutcome,
    now: Date = new Date()
  ): ProcessReviewResult {
    const validNow = now && !isNaN(now.getTime()) ? now : new Date();
    const stabilityCalc = StabilityEngine.calculateNextStability(concept, outcome, validNow);
    const recallProb = ForgettingEngine.calculateRecallProbability(0, stabilityCalc.newStabilityScore);
    const forgettingRisk = ForgettingEngine.calculateForgettingRisk(recallProb);

    // Calculate new state
    const tempConcept: ConceptMemory = {
      ...concept,
      stabilityScore: stabilityCalc.newStabilityScore,
      estimatedRecallProbability: recallProb,
      forgettingRisk,
    };
    const newState = MemoryStateMachine.transitionState(tempConcept, outcome);

    const isSuccess = outcome === 'success';
    const newRetention = isSuccess
      ? Math.min(100, concept.retentionRate + 5)
      : Math.max(20, concept.retentionRate - 15);

    const updatedConcept: ConceptMemory = {
      ...concept,
      state: newState,
      stabilityScore: stabilityCalc.newStabilityScore,
      retentionRate: newRetention,
      forgettingRisk,
      estimatedRecallProbability: recallProb,
      reviewCount: concept.reviewCount + 1,
      successfulReviews: concept.successfulReviews + (isSuccess ? 1 : 0),
      failedReviews: concept.failedReviews + (outcome === 'failure' ? 1 : 0),
      lastReviewed: validNow.toISOString(),
      nextReview: stabilityCalc.newNextReview,
    };

    const reviewEvent: ReviewEvent = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      conceptId: concept.conceptId,
      userId: concept.userId,
      timestamp: validNow.toISOString(),
      outcome,
      previousState: concept.state,
      newState,
      stabilityChange: stabilityCalc.stabilityDelta,
      retentionChange: newRetention - concept.retentionRate,
      scheduledIntervalDays: stabilityCalc.nextIntervalDays,
    };

    return { updatedConcept, reviewEvent };
  }
}
