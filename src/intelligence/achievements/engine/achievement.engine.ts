/**
 * Master Achievement Engine (Event-Driven Execution)
 */

import { AppEvent } from '@/src/core/events/event-bus';
import { RuleRegistry } from '../rules/rule.registry';
import { ProgressEngine } from './progress.engine';
import { RewardEngine } from './reward.engine';
import { NotificationEngine } from './notification.engine';
import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';

export class AchievementEngine {
  constructor() {
    RuleRegistry.registerDefaults();
  }

  public processEvent(
    event: AppEvent,
    currentItems: ReadonlyArray<AchievementItem>
  ): {
    updatedItems: AchievementItem[];
    unlockedAchievements: AchievementItem[];
    newBadges: Badge[];
    newTitles: UserTitle[];
  } {
    const itemMap = new Map<string, AchievementItem>();
    currentItems.forEach((i) => itemMap.set(i.id, i));

    // Ensure all defined rules have an AchievementItem instance
    RuleRegistry.getAllRules().forEach((rule) => {
      if (!itemMap.has(rule.definition.id)) {
        itemMap.set(rule.definition.id, {
          ...rule.definition,
          currentProgress: 0,
          completed: false,
          state: 'locked',
        });
      }
    });

    const unlockedAchievements: AchievementItem[] = [];
    const newBadges: Badge[] = [];
    const newTitles: UserTitle[] = [];

    RuleRegistry.getAllRules().forEach((rule) => {
      const existing = itemMap.get(rule.definition.id)!;
      if (existing.completed) return;

      const evalRes = rule.evaluate(event);
      if (evalRes) {
        const nextItem = ProgressEngine.updateProgress(existing, evalRes);
        itemMap.set(nextItem.id, nextItem);

        if (nextItem.completed && !existing.completed) {
          unlockedAchievements.push(nextItem);
          NotificationEngine.notifyUnlocked(nextItem);

          const { badge, title } = RewardEngine.grantRewards(nextItem);
          if (badge) newBadges.push(badge);
          if (title) newTitles.push(title);
        }
      }
    });

    return {
      updatedItems: Array.from(itemMap.values()),
      unlockedAchievements,
      newBadges,
      newTitles,
    };
  }
}
