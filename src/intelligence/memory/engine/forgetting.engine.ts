/**
 * Memory Engine — Deterministic Forgetting Decay Engine
 * Implements Ebbinghaus forgetting curve decay calculations (Recall = exp(-elapsedDays / stability)).
 */

import { ConceptMemory } from '../models/memory.models';
import { ForgettingRiskReport } from '../models/forgetting.models';

export class ForgettingEngine {
  /**
   * Calculates recall probability R(t) = exp(-elapsedDays / S)
   */
  public static calculateRecallProbability(elapsedDays: number, stabilityScore: number): number {
    if (stabilityScore <= 0) return 0;
    const p = Math.exp(-elapsedDays / Math.max(1, stabilityScore));
    return Number(Math.max(0.0, Math.min(1.0, p)).toFixed(4));
  }

  /**
   * Calculates forgetting risk score (0 to 100).
   */
  public static calculateForgettingRisk(recallProbability: number): number {
    return Math.max(0, Math.min(100, Math.round((1 - recallProbability) * 100)));
  }

  /**
   * Calculates live recall probability for a ConceptMemory at a given time point.
   */
  public static getLiveRecallProbability(concept: ConceptMemory, now: Date = new Date()): number {
    const validNow = now && !isNaN(now.getTime()) ? now : new Date();
    const lastRevDate = concept.lastReviewed ? new Date(concept.lastReviewed) : validNow;
    const validLast = !isNaN(lastRevDate.getTime()) ? lastRevDate : validNow;
    const elapsedDays = Math.max(0, Number(((validNow.getTime() - validLast.getTime()) / (1000 * 3600 * 24)).toFixed(1)));
    return this.calculateRecallProbability(elapsedDays, concept.stabilityScore);
  }

  /**
   * Generates a detailed ForgettingRiskReport for a given ConceptMemory.
   */
  public static evaluateRisk(concept: ConceptMemory, now: Date = new Date()): ForgettingRiskReport {
    const validNow = now && !isNaN(now.getTime()) ? now : new Date();
    const lastRevDate = concept.lastReviewed ? new Date(concept.lastReviewed) : validNow;
    const nextRevDate = concept.nextReview ? new Date(concept.nextReview) : validNow;

    const validLast = !isNaN(lastRevDate.getTime()) ? lastRevDate : validNow;
    const validNext = !isNaN(nextRevDate.getTime()) ? nextRevDate : validNow;

    const elapsedDays = Math.max(0, Number(((validNow.getTime() - validLast.getTime()) / (1000 * 3600 * 24)).toFixed(1)));
    const daysOverdue = Math.max(0, Number(((validNow.getTime() - validNext.getTime()) / (1000 * 3600 * 24)).toFixed(1)));

    const recallProb = this.calculateRecallProbability(elapsedDays, concept.stabilityScore);
    const risk = this.calculateForgettingRisk(recallProb);

    let urgency: 'Critical' | 'High' | 'Moderate' | 'Low' = 'Low';
    let action = 'Memory stable. No immediate review required.';

    if (daysOverdue > 3 || risk >= 70) {
      urgency = 'Critical';
      action = 'High probability of memory loss. Immediate review recommended.';
    } else if (daysOverdue > 0 || risk >= 50) {
      urgency = 'High';
      action = 'Concept due for revision today.';
    } else if (risk >= 30) {
      urgency = 'Moderate';
      action = 'Concept stability declining. Review soon.';
    }

    return {
      conceptId: concept.conceptId,
      topic: concept.topic || 'General',
      pattern: concept.pattern || 'Basic',
      recallProbability: recallProb,
      forgettingRisk: risk,
      daysSinceLastReview: elapsedDays,
      daysOverdue,
      urgency,
      recommendedAction: action,
    };
  }
}
