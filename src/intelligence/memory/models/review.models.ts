/**
 * Memory Engine — Review Event & Priority Models
 * Defines ReviewEvent history log, ReviewOutcome, and ReviewPriority levels.
 */

import { MemoryState } from './memory.models';

export type ReviewOutcome = 'success' | 'failure' | 'partial';
export type ReviewPriority = 'Critical' | 'High' | 'Medium' | 'Low';

export interface ReviewEvent {
  readonly id: string;
  readonly conceptId: string;
  readonly userId: string;
  readonly timestamp: string; // ISO string
  readonly outcome: ReviewOutcome;
  readonly previousState: MemoryState;
  readonly newState: MemoryState;
  readonly stabilityChange: number; // Delta in days
  readonly retentionChange: number; // Delta in percentage
  readonly scheduledIntervalDays: number;
}

export interface ReviewSessionPlan {
  readonly title: string;
  readonly horizon: 'today' | 'tomorrow' | 'weekly' | 'custom';
  readonly targetConceptsCount: number;
  readonly estimatedDurationMinutes: number;
  readonly items: ReadonlyArray<RevisionQueueItem>;
  readonly createdAt: string;
}

export interface RevisionQueueItem {
  readonly conceptId: string;
  readonly topic: string;
  readonly pattern: string;
  readonly priority: ReviewPriority;
  readonly priorityScore: number; // 0 to 100
  readonly forgettingRisk: number; // 0 to 100
  readonly recallProbability: number; // 0.0 to 1.0
  readonly lastReviewed: string;
  readonly nextReview: string;
  readonly reason: string;
  readonly suggestedPracticeDurationMinutes: number;
}
