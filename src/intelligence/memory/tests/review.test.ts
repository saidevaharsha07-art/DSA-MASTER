/**
 * Unit Test: Review Scheduler & Prioritized Revision Queue
 */

import { ReviewScheduler } from '../scheduler/review.scheduler';
import { RevisionQueueBuilder } from '../scheduler/revision.queue';
import { ConceptMemory } from '../models/memory.models';

export function testReviewScheduler(): void {
  console.log('--- Testing Review Scheduler & Revision Queue ---');

  const concepts: ConceptMemory[] = [
    {
      conceptId: 'c1',
      userId: 'u1',
      topic: 'Arrays',
      pattern: 'Sliding Window',
      state: 'Stable',
      masteryScore: 90,
      memoryStrength: 90,
      stabilityScore: 14.0,
      retentionRate: 90,
      forgettingRisk: 10,
      reviewCount: 4,
      successfulReviews: 4,
      failedReviews: 0,
      firstLearned: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
      lastReviewed: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
      nextReview: new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString(),
      estimatedRecallProbability: 0.95,
    },
    {
      conceptId: 'c2',
      userId: 'u1',
      topic: 'Graphs',
      pattern: 'BFS',
      state: 'AtRisk',
      masteryScore: 40,
      memoryStrength: 40,
      stabilityScore: 2.0,
      retentionRate: 40,
      forgettingRisk: 80,
      reviewCount: 1,
      successfulReviews: 1,
      failedReviews: 1,
      firstLearned: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
      lastReviewed: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
      nextReview: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
      estimatedRecallProbability: 0.20,
    },
  ];

  // 1. Revision queue ordering test
  const queue = RevisionQueueBuilder.buildQueue(concepts);
  if (queue[0].conceptId !== 'c2' || queue[0].priority !== 'Critical') {
    throw new Error('RevisionQueueBuilder failed to prioritize high-risk/overdue concept first!');
  }
  console.log(`[PASS] Revision queue correctly prioritized '${queue[0].pattern}' as Critical priority.`);

  // 2. Today review plan generation test
  const scheduler = new ReviewScheduler();
  const todayPlan = scheduler.generateTodayPlan(concepts);
  if (todayPlan.targetConceptsCount <= 0 || !todayPlan.items) {
    throw new Error('ReviewScheduler failed to generate today review plan!');
  }
  console.log(`[PASS] Generated Today review plan (${todayPlan.targetConceptsCount} target concepts, ~${todayPlan.estimatedDurationMinutes} mins).`);
}
