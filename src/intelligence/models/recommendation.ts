/**
 * Intelligence Models — Recommendations
 * Explainable recommendation cards and problem set recommendations.
 */

import { PlatformId } from '@/src/platforms/types';

export type RecommendationType =
  | 'topic_focus'
  | 'pattern_mastery'
  | 'difficulty_level_up'
  | 'spaced_revision'
  | 'contest_prep'
  | 'weakness_repair';

export type RecommendationPriority = 'high' | 'medium' | 'low';

export interface SupportingMetrics {
  readonly accuracy?: number;
  readonly attemptsCount?: number;
  readonly masteryScore?: number;
  readonly daysSinceLastPracticed?: number;
  readonly weaknessScore?: number;
}

export interface RecommendationCard {
  readonly id: string;
  readonly type: RecommendationType;
  readonly priority: RecommendationPriority;
  readonly title: string;
  readonly description: string;
  readonly reason: string;
  readonly confidenceScore: number; // 0 to 100
  readonly targetPlatform?: PlatformId;
  readonly targetTopic?: string;
  readonly targetPattern?: string;
  readonly targetDifficulty?: string;
  readonly problemIds: ReadonlyArray<string>;
  readonly supportingMetrics: SupportingMetrics;
  readonly createdAt: string;
}

export interface PracticeSetRecommendation {
  readonly id: string;
  readonly title: string;
  readonly targetTopic: string;
  readonly targetPattern?: string;
  readonly targetDifficulty: string;
  readonly targetPlatform?: PlatformId;
  readonly problemIds: ReadonlyArray<string>;
  readonly estimatedTotalTimeMinutes: number;
  readonly totalXpAvailable: number;
  readonly rationale: string;
}
