/**
 * Consistency Rule (Perfect Practice Sessions)
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class ConsistencyRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-consistency-100',
    name: 'Perfectionist',
    description: 'Complete a practice session with 100% accuracy.',
    category: 'practice',
    rarity: 'Legendary',
    icon: '💎',
    points: 300,
    rewards: {
      xpBonus: 1500,
      coinReward: 800,
    },
    hidden: false,
    secret: false,
    maxProgress: 1,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'SessionFinished') return null;
    const payload = event.payload as { accuracy?: number };
    if (typeof payload?.accuracy === 'number' && payload.accuracy === 100) {
      return {
        achievementId: this.definition.id,
        newProgressDelta: 1,
        isComplete: true,
      };
    }
    return null;
  }
}
