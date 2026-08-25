/**
 * Memory Engine — Daily Review Plan Builder
 * Assembles ReviewSessionPlan for today's due concepts.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewSessionPlan } from '../models/review.models';
import { RevisionQueueBuilder } from './revision.queue';

export class DailyReviewBuilder {
  public static buildDailyPlan(
    concepts: ReadonlyArray<ConceptMemory>,
    now: Date = new Date(),
    maxItems: number = 5
  ): ReviewSessionPlan {
    const fullQueue = RevisionQueueBuilder.buildQueue(concepts, now);
    const dueToday = fullQueue.filter((item) => item.priority === 'Critical' || item.priority === 'High' || new Date(item.nextReview) <= now);

    const items = (dueToday.length > 0 ? dueToday : fullQueue).slice(0, maxItems);
    const estDuration = items.reduce((sum, item) => sum + item.suggestedPracticeDurationMinutes, 0);

    return {
      title: "Today's Spaced Repetition Review Session",
      horizon: 'today',
      targetConceptsCount: items.length,
      estimatedDurationMinutes: estDuration,
      items: Object.freeze(items),
      createdAt: now.toISOString(),
    };
  }
}
