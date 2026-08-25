/**
 * Intelligence Models — Practice History & Events
 * Models for problem solving attempts, submission events, and activity tracking.
 */

import { PlatformId } from '@/src/platforms/types';

export type AttemptStatus = 'accepted' | 'wrong_answer' | 'time_limit' | 'runtime_error' | 'attempted';

export interface PracticeAttempt {
  readonly id: string;
  readonly userId: string;
  readonly problemId: string;
  readonly platform: PlatformId;
  readonly status: AttemptStatus;
  readonly timestamp: string; // ISO date string
  readonly durationSeconds: number;
  readonly xpEarned: number;
  readonly hintsUsed: number;
  readonly topic?: string;
  readonly pattern?: string;
  readonly difficulty?: string;
}

export type IntelligenceEventType =
  | 'problem_solved'
  | 'problem_attempted'
  | 'contest_completed'
  | 'revision_finished'
  | 'streak_updated';

export interface BaseIntelligenceEvent {
  readonly eventId: string;
  readonly type: IntelligenceEventType;
  readonly userId: string;
  readonly timestamp: string;
}

export interface ProblemSolvedEvent extends BaseIntelligenceEvent {
  readonly type: 'problem_solved';
  readonly attempt: PracticeAttempt;
}

export interface ContestCompletedEvent extends BaseIntelligenceEvent {
  readonly type: 'contest_completed';
  readonly contestId: string;
  readonly platform: PlatformId;
  readonly rank: number;
  readonly ratingChange: number;
}

export interface StreakUpdatedEvent extends BaseIntelligenceEvent {
  readonly type: 'streak_updated';
  readonly currentStreak: number;
  readonly longestStreak: number;
}

export type IntelligenceEvent = ProblemSolvedEvent | ContestCompletedEvent | StreakUpdatedEvent;
