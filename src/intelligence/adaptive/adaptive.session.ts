/**
 * Adaptive Engine — Session & Goal Models
 * Core session contract, structured SessionGoal, and candidate specifications.
 */

import { PlatformId, PlatformProblem } from '@/src/platforms/types';

export interface SessionGoal {
  readonly objective: string;
  readonly targetTopics: ReadonlyArray<string>;
  readonly targetPatterns: ReadonlyArray<string>;
  readonly targetDifficulty: string;
  readonly expectedAccuracy: number; // 0.0 to 1.0
  readonly estimatedDurationMinutes: number;
  readonly successCriteria: string;
}

export interface AdaptiveSession {
  readonly id: string;
  readonly userId: string;
  readonly title: string;
  readonly strategyName: string;
  readonly goal: SessionGoal;
  readonly selectedProblems: ReadonlyArray<PlatformProblem>;
  readonly targetPlatform: PlatformId;
  readonly totalXpAvailable: number;
  readonly createdAt: string;
}
