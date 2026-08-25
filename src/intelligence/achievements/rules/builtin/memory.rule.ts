/**
 * Memory Review Rule
 */

import { IAchievementRule, RuleEvaluationResult } from '../achievement-rule.interface';
import { AppEvent } from '@/src/core/events/event-bus';
import { AchievementDefinition } from '../../models/achievement.models';

export class MemoryRule implements IAchievementRule {
  public readonly definition: AchievementDefinition = {
    id: 'ach-memory-10',
    name: 'Memory Master',
    description: 'Complete 10 concept spaced repetition reviews.',
    category: 'memory',
    rarity: 'Epic',
    icon: '🧠',
    points: 200,
    rewards: {
      xpBonus: 800,
      coinReward: 300,
      titleReward: { id: 'title-memory', title: 'Memory Master', description: 'Reviewed 10 concepts', unlockedAt: '' },
    },
    hidden: false,
    secret: false,
    maxProgress: 10,
    version: 1,
  };

  public evaluate(event: AppEvent): RuleEvaluationResult | null {
    if (event.type !== 'MemoryReviewed') return null;

    return {
      achievementId: this.definition.id,
      newProgressDelta: 1,
      isComplete: false, // Calculated dynamically in ProgressEngine
    };
  }
}
