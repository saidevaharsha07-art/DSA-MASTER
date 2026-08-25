/**
 * Canonical Activity Model & Discriminated Types (Phase 11)
 * Source of truth for platform-wide user activity telemetry.
 */

import { PracticeAttempt, AttemptStatus } from './practice-history';
import { PlatformId } from '@/src/platforms/types';

export type CanonicalActionType =
  | 'opened'
  | 'started'
  | 'run'
  | 'failed'
  | 'solved'
  | 'favorite_toggled'
  | 'note_saved'
  | 'review'
  | 'contest_completed'
  | 'profile_updated';

export interface BaseCanonicalActivityRecord {
  readonly eventId: string;
  readonly userId: string;
  readonly action: CanonicalActionType;
  readonly timestamp: string;
  readonly problemId?: string;
  readonly platform?: string;
  readonly durationSeconds?: number;
  readonly status?: string;
  readonly topic?: string;
  readonly pattern?: string;
  readonly difficulty?: string;
  readonly xpEarned?: number;
  readonly metadata?: Record<string, unknown>;
}

export interface ProblemOpenedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'opened';
  readonly problemId: string;
}

export interface AttemptStartedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'started';
  readonly problemId: string;
}

export interface CodeRunActivity extends BaseCanonicalActivityRecord {
  readonly action: 'run';
  readonly problemId: string;
  readonly status?: string;
}

export interface ProblemFailedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'failed';
  readonly problemId: string;
}

export interface ProblemSolvedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'solved';
  readonly problemId: string;
  readonly xpEarned: number;
}

export interface FavoriteToggledActivity extends BaseCanonicalActivityRecord {
  readonly action: 'favorite_toggled';
  readonly problemId: string;
  readonly metadata?: { isFavorite: boolean };
}

export interface NoteSavedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'note_saved';
  readonly problemId: string;
}

export interface ReviewActivity extends BaseCanonicalActivityRecord {
  readonly action: 'review';
  readonly problemId: string;
}

export interface ContestCompletedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'contest_completed';
  readonly metadata?: { contestId?: string; rank?: number; score?: number };
}

export interface ProfileUpdatedActivity extends BaseCanonicalActivityRecord {
  readonly action: 'profile_updated';
}

export type CanonicalActivityRecord =
  | ProblemOpenedActivity
  | AttemptStartedActivity
  | CodeRunActivity
  | ProblemFailedActivity
  | ProblemSolvedActivity
  | FavoriteToggledActivity
  | NoteSavedActivity
  | ReviewActivity
  | ContestCompletedActivity
  | ProfileUpdatedActivity;

/**
 * Adapter helper: Convert canonical activity record to legacy PracticeAttempt format
 */
export function canonicalToPracticeAttempt(record: BaseCanonicalActivityRecord): PracticeAttempt {
  const status: AttemptStatus =
    record.action === 'solved'
      ? 'accepted'
      : record.action === 'failed'
      ? 'wrong_answer'
      : 'attempted';

  return {
    id: record.eventId,
    userId: record.userId,
    problemId: record.problemId || 'unknown',
    platform: (record.platform || 'leetcode') as PlatformId,
    status,
    timestamp: record.timestamp,
    durationSeconds: record.durationSeconds || 0,
    xpEarned: record.xpEarned || 0,
    hintsUsed: 0,
    topic: record.topic || 'Arrays',
    pattern: record.pattern || 'General',
    difficulty: record.difficulty || 'Medium',
  };
}
