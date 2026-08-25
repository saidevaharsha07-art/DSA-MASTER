/**
 * Kingdom Completion & Boss Defeat Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class KingdomRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-kingdom-conqueror',
    name: 'King Conqueror',
    description: 'Conquer a complete DSA Kingdom and defeat the Kingdom Boss.',
    category: 'kingdom',
    rarity: 'Mythic',
    icon: '👑',
    points: 500,
    rewards: {
      xpBonus: 2500,
      coinReward: 1000,
      titleReward: { id: 'title-king', title: 'King Conqueror', description: 'Defeated Kingdom Boss', unlockedAt: '' },
    },
    hidden: false,
    secret: true,
    maxProgress: 1,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'KingdomCompleted' && event.type !== 'BossDefeated') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 1,
      isComplete: true,
    };
  }
}
