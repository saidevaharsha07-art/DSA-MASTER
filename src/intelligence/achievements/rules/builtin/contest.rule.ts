/**
 * Contest Participation Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class ContestRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-contest-1',
    name: 'Contest Warrior',
    description: 'Successfully complete your first rated competitive contest.',
    category: 'contest',
    rarity: 'Epic',
    icon: '🏆',
    points: 250,
    rewards: {
      xpBonus: 1000,
      coinReward: 500,
      titleReward: { id: 'title-warrior', title: 'Contest Warrior', description: 'Completed a contest', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 1,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'ContestCompleted') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 1,
      isComplete: true,
    };
  }
}
