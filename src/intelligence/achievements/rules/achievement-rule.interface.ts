/**
 * Independent Achievement Rule Contract
 */

import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../models/achievement.models';

export interface RuleEvaluationResult {
  readonly achievementId: string;
  readonly newProgressDelta: number;
  readonly forceSetProgress?: number;
  readonly isComplete: boolean;
}

export interface IAchievementRule {
  readonly definition: AchievementDefinition;
  evaluate(event: AppEvent): RuleEvaluationResult | null;
}
