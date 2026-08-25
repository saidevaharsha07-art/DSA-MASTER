/**
 * Memory Engine — Revision Queue Builder
 * Constructs prioritized, explainable RevisionQueueItems grouped by ReviewPriority (Critical, High, Medium, Low).
 */

import { ConceptMemory } from '../models/memory.models';
import { RevisionQueueItem, ReviewPriority } from '../models/review.models';
import { ForgettingEngine } from '../engine/forgetting.engine';

export class RevisionQueueBuilder {
  /**
   * Generates a prioritized list of RevisionQueueItem objects based on forgetting risk and mastery.
   */
  public static buildQueue(
    concepts: ReadonlyArray<ConceptMemory>,
    now: Date = new Date()
  ): ReadonlyArray<RevisionQueueItem> {
    const queue: RevisionQueueItem[] = [];

    for (const c of concepts) {
      const riskReport = ForgettingEngine.evaluateRisk(c, now);

      // Priority score calculation (0 to 100)
      const priorityScore = Math.min(
        100,
        Math.round(riskReport.forgettingRisk * 0.5 + (100 - c.masteryScore) * 0.3 + riskReport.daysOverdue * 10)
      );

      let priority: ReviewPriority = 'Low';
      if (priorityScore >= 75 || riskReport.urgency === 'Critical') priority = 'Critical';
      else if (priorityScore >= 50 || riskReport.urgency === 'High') priority = 'High';
      else if (priorityScore >= 25 || riskReport.urgency === 'Moderate') priority = 'Medium';

      queue.push({
        conceptId: c.conceptId,
        topic: c.topic,
        pattern: c.pattern,
        priority,
        priorityScore,
        forgettingRisk: riskReport.forgettingRisk,
        recallProbability: riskReport.recallProbability,
        lastReviewed: c.lastReviewed,
        nextReview: c.nextReview,
        reason: riskReport.recommendedAction,
        suggestedPracticeDurationMinutes: priority === 'Critical' ? 25 : priority === 'High' ? 15 : 10,
      });
    }

    // Sort descending by priority score
    queue.sort((a, b) => b.priorityScore - a.priorityScore);

    return Object.freeze(queue);
  }
}
