/**
 * Daily Streak Milestones Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class StreakRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-streak-7',
    name: '7-Day Streak Warrior',
    description: 'Maintain a consecutive daily practice streak for 7 days.',
    category: 'daily_streak',
    rarity: 'Rare',
    icon: '🔥',
    points: 100,
    rewards: {
      xpBonus: 500,
      coinReward: 100,
      titleReward: { id: 'title-slayer', title: 'Problem Slayer', description: 'Solved 7 consecutive days', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 7,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'ProfileUpdated') return null;
    const payload = event.payload as { streak?: number };
    if (typeof payload?.streak !== 'number') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 0,
      forceSetProgress: payload.streak,
      isComplete: payload.streak >= this.definition.maxProgress,
    };
  }
}
