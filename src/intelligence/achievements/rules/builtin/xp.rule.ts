/**
 * XP Milestone Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class XpRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-xp-1000',
    name: 'XP Novice',
    description: 'Accumulate 1,000 total experience points.',
    category: 'xp',
    rarity: 'Common',
    icon: '⭐',
    points: 50,
    rewards: {
      xpBonus: 200,
      coinReward: 50,
      titleReward: { id: 'title-novice', title: 'Novice', description: 'Reached 1,000 XP', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 1000,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'ProfileUpdated') return null;
    const payload = event.payload as { xp?: number };
    if (typeof payload?.xp !== 'number') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 0,
      forceSetProgress: payload.xp,
      isComplete: payload.xp >= this.definition.maxProgress,
    };
  }
}
