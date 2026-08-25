/**
 * Multi-Platform Explorer Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class PlatformRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-platform-explorer',
    name: 'Platform Explorer',
    description: 'Solve problems on multiple competitive programming platforms.',
    category: 'platform',
    rarity: 'Rare',
    icon: '🌐',
    points: 150,
    rewards: {
      xpBonus: 600,
      coinReward: 250,
      titleReward: { id: 'title-explorer', title: 'Explorer', description: 'Explored multiple platforms', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 3,
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
