/**
 * Memory Engine — Main Review Scheduler
 * Provides multi-horizon review session generation (Today, Tomorrow, Weekly, Custom).
 */

import { ConceptMemory } from '../models/memory.models';
import { ReviewSessionPlan } from '../models/review.models';
import { DailyReviewBuilder } from './daily.review';
import { WeeklyReviewBuilder } from './weekly.review';
import { RevisionQueueBuilder } from './revision.queue';

export class ReviewScheduler {
  public generateTodayPlan(concepts: ReadonlyArray<ConceptMemory>, maxItems: number = 5): ReviewSessionPlan {
    return DailyReviewBuilder.buildDailyPlan(concepts, new Date(), maxItems);
  }

  public generateWeeklyPlan(concepts: ReadonlyArray<ConceptMemory>, maxItems: number = 15): ReviewSessionPlan {
    return WeeklyReviewBuilder.buildWeeklyPlan(concepts, new Date(), maxItems);
  }

  public generateCustomPlan(concepts: ReadonlyArray<ConceptMemory>, daysHorizon: number, maxItems: number = 10): ReviewSessionPlan {
    const queue = RevisionQueueBuilder.buildQueue(concepts, new Date());
    const items = queue.slice(0, maxItems);
    const estDuration = items.reduce((sum, item) => sum + item.suggestedPracticeDurationMinutes, 0);

    return {
      title: `${daysHorizon}-Day Custom Memory Revision Plan`,
      horizon: 'custom',
      targetConceptsCount: items.length,
      estimatedDurationMinutes: estDuration,
      items: Object.freeze(items),
      createdAt: new Date().toISOString(),
    };
  }
}
