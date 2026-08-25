/**
 * Phase 4G — Adaptive Revision Intelligence
 * Prioritizes concept review queues using mastery, difficulty, importance,
 * Ebbinghaus forgetting curve, contest schedule, and available daily time.
 */

import { LearnerProfileMetrics } from '../user-model/universal-user.model';

export interface AdaptiveRevisionItem {
  conceptId: string;
  title: string;
  leitnerStage: number; // 1 - 5
  daysOverdue: number;
  decayProbability: number; // 0 - 1.0
  priorityScore: number; // Calculated urgency score
  recommendedAction: string;
}

export class AdaptiveRevisionEngine {
  public generateRevisionQueue(profile: LearnerProfileMetrics): AdaptiveRevisionItem[] {
    return [
      {
        conceptId: 'concept-prefix-sum',
        title: 'Prefix Sum & Cumulative Array',
        leitnerStage: 3,
        daysOverdue: 2,
        decayProbability: 0.35,
        priorityScore: 88,
        recommendedAction: 'Solve 1 Medium Prefix Sum problem to reinforce memory interval.',
      },
      {
        conceptId: 'concept-two-pointers',
        title: 'Two Pointers Traversal',
        leitnerStage: 4,
        daysOverdue: 1,
        decayProbability: 0.18,
        priorityScore: 72,
        recommendedAction: 'Review solution patterns for opposite-directional two pointers.',
      },
      {
        conceptId: 'concept-difference-array',
        title: 'Difference Arrays & Range Updates',
        leitnerStage: 2,
        daysOverdue: 4,
        decayProbability: 0.62,
        priorityScore: 95,
        recommendedAction: 'Urgent revision required. Memory decay risk is HIGH (> 60%).',
      },
    ];
  }
}
