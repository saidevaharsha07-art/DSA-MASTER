/**
 * Topic Mastery Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class MasteryRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-mastery-solve-5',
    name: 'Problem Solver',
    description: 'Solve 5 problems successfully.',
    category: 'practice',
    rarity: 'Common',
    icon: '🎯',
    points: 75,
    rewards: {
      xpBonus: 300,
      coinReward: 100,
    },
    hidden: false,
    secret: false,
    maxProgress: 5,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'ProblemSolved') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 1,
      isComplete: false,
    };
  }
}
