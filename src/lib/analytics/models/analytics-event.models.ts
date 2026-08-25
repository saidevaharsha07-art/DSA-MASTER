/**
 * Core Analytics Event Models
 */

export type AnalyticsEventType =
  | 'session_start'
  | 'session_end'
  | 'problem_viewed'
  | 'problem_started'
  | 'hint_used'
  | 'solution_viewed'
  | 'problem_solved'
  | 'concept_revised'
  | 'concept_mastered'
  | 'contest_participated'
  | 'achievement_unlocked'
  | 'sync_completed'
  | 'user_signed_in';

export interface AnalyticsEvent {
  readonly eventId: string;
  readonly type: AnalyticsEventType;
  readonly timestamp: string;
  readonly anonymousUserId: string;
  readonly properties: Record<string, unknown>;
}
