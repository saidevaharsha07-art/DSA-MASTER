/**
 * Notification Generator Engine (Emits EventBus events, NO direct UI rendering)
 */

import { EventBus } from '@/src/core/events/event-bus';
import { AchievementItem } from '../models/achievement.models';
import { Badge, UserTitle } from '../models/badge.models';
import { RewardBundle } from '../models/reward.models';

export class NotificationEngine {
  public static notifyUnlocked(item: AchievementItem): void {
    EventBus.publish('AchievementUnlocked', { achievementId: item.id, name: item.name });
  }

  public static notifyBadgeEarned(badge: Badge): void {
    EventBus.publish('BadgeEarned', badge);
  }

  public static notifyTitleUnlocked(title: UserTitle): void {
    EventBus.publish('TitleUnlocked', title);
  }

  public static notifyRewardGranted(reward: RewardBundle): void {
    EventBus.publish('RewardGranted', reward);
  }
}
