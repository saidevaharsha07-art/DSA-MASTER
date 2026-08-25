/**
 * Response & Data Payload Models
 */

import { PlatformProblem } from '@/src/platforms/types';
import { ContestRecord } from '@/src/intelligence/contests/contest.models';

export interface ConnectorPaginatedResponse<T> {
  readonly items: ReadonlyArray<T>;
  readonly page: number;
  readonly pageSize: number;
  readonly totalItems?: number;
  readonly hasMore: boolean;
}

export interface PlatformUserProfile {
  readonly platformUserId: string;
  readonly handle: string;
  readonly rating: number | null;
  readonly maxRating: number | null;
  readonly rankTitle: string | null;
  readonly solvedCount: number | null;
  readonly successRate?: string | null;
  readonly contestCount?: number | null;
  readonly profileUrl: string;
}

export interface PlatformSubmission {
  readonly submissionId: string;
  readonly problemId: string;
  readonly status: 'accepted' | 'wrong_answer';
  readonly language: string;
  readonly timestamp: string;
  readonly executionTimeMs: number;
}
