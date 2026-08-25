/**
 * Speed Solve Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class SpeedRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-speed-solve',
    name: 'Speed Demon',
    description: 'Solve a problem in under 5 minutes.',
    category: 'practice',
    rarity: 'Rare',
    icon: '⚡',
    points: 150,
    rewards: {
      xpBonus: 500,
      coinReward: 200,
    },
    hidden: false,
    secret: false,
    maxProgress: 1,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'ProblemSolved') return null;
    const payload = event.payload as { solveTimeSec?: number };
    if (typeof payload?.solveTimeSec === 'number' && payload.solveTimeSec <= 300) {
      return {
        achievementId: this.definition.id,
        newProgressDelta: 1,
        isComplete: true,
      };
    }
    return null;
  }
}
