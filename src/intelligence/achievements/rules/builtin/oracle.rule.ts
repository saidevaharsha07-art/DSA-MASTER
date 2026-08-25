/**
 * Oracle AI Recommendation Completion Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class OracleRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-oracle-chosen',
    name: "Oracle's Chosen",
    description: 'Complete an AI-recommended daily targeted study plan.',
    category: 'oracle',
    rarity: 'Legendary',
    icon: '🔮',
    points: 400,
    rewards: {
      xpBonus: 2000,
      coinReward: 900,
      titleReward: { id: 'title-oracle', title: "Oracle's Chosen", description: 'Followed Oracle guidance', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 1,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'RecommendationCompleted') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 1,
      isComplete: true,
    };
  }
}
