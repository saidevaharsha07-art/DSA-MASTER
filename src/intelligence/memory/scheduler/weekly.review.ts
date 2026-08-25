/**
 * Memory Engine — Weekly Review Plan Builder
 * Assembles ReviewSessionPlan for 7-day review horizon.
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewSessionPlan } from '../models/review.models';
import { RevisionQueueBuilder } from './revision.queue';

export class WeeklyReviewBuilder {
  public static buildWeeklyPlan(
    concepts: ReadonlyArray<ConceptMemory>,
    now: Date = new Date(),
    maxItems: number = 15
  ): ReviewSessionPlan {
    const fullQueue = RevisionQueueBuilder.buildQueue(concepts, now);
    const items = fullQueue.slice(0, maxItems);
    const estDuration = items.reduce((sum, item) => sum + item.suggestedPracticeDurationMinutes, 0);

    return {
      title: '7-Day Comprehensive Memory Review Schedule',
      horizon: 'weekly',
      targetConceptsCount: items.length,
      estimatedDurationMinutes: estDuration,
      items: Object.freeze(items),
      createdAt: now.toISOString(),
    };
  }
}
