/**
 * Reward Engine
 */

import { RewardBundle } from '../models/reward.models';
import { Badge, UserTitle } from '../models/badge.models';
import { AchievementItem } from '../models/achievement.models';
import { NotificationEngine } from './notification.engine';

export class RewardEngine {
  public static grantRewards(item: AchievementItem): { badge?: Badge; title?: UserTitle } {
    const rewards: RewardBundle = item.rewards;
    let earnedBadge: Badge | undefined = undefined;
    let earnedTitle: UserTitle | undefined = undefined;

    if (rewards.titleReward) {
      earnedTitle = {
        ...rewards.titleReward,
        unlockedAt: new Date().toISOString(),
      };
      NotificationEngine.notifyTitleUnlocked(earnedTitle);
    }

    earnedBadge = {
      id: `badge-${item.id}`,
      name: `${item.name} Badge`,
      icon: item.icon,
      color: '#6366F1',
      tier: item.rarity,
      animation: 'pulse',
      earnedAt: new Date().toISOString(),
    };
    NotificationEngine.notifyBadgeEarned(earnedBadge);
    NotificationEngine.notifyRewardGranted(rewards);

    return { badge: earnedBadge, title: earnedTitle };
  }
}
