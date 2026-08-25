/**
 * Intelligence Models — Weakness & Strength Analysis
 * Models representing analyzed user strengths, weaknesses, and performance ceilings.
 */

import { PlatformId } from '@/src/platforms/types';
import { MasteryLevel } from './learning-profile';

export interface WeakTopicMetric {
  readonly topic: string;
  readonly accuracy: number; // 0.0 to 1.0
  readonly weaknessScore: number; // 0 to 100
  readonly totalAttempts: number;
  readonly failureRate: number;
  readonly recommendedAction: string;
}

export interface WeakPatternMetric {
  readonly pattern: string;
  readonly topic: string;
  readonly weaknessScore: number; // 0 to 100
  readonly accuracy: number;
  readonly totalAttempts: number;
}

export interface WeaknessAnalysis {
  readonly userId: string;
  readonly analyzedAt: string;
  readonly weakTopics: ReadonlyArray<WeakTopicMetric>;
  readonly weakPatterns: ReadonlyArray<WeakPatternMetric>;
  readonly weakDifficulties: ReadonlyArray<string>;
  readonly overallAccuracy: number;
  readonly consistencyScore: number; // 0 to 100
  readonly primaryWeaknessSummary: string;
}

export interface StrongTopicMetric {
  readonly topic: string;
  readonly accuracy: number;
  readonly masteryScore: number; // 0 to 100
  readonly level: MasteryLevel;
}

export interface StrengthAnalysis {
  readonly userId: string;
  readonly analyzedAt: string;
  readonly masteredTopics: ReadonlyArray<StrongTopicMetric>;
  readonly masteredPatterns: ReadonlyArray<string>;
  readonly strongestPlatform: PlatformId;
  readonly difficultyCeiling: string;
  readonly consistencyScore: number; // 0 to 100
  readonly primaryStrengthSummary: string;
}
