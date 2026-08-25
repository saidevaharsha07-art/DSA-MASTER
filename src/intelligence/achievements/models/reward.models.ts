/**
 * Reward Engine Models
 */

import { Badge, UserTitle } from './badge.models';

export interface RewardBundle {
  readonly xpBonus: number;
  readonly coinReward: number;
  readonly titleReward?: UserTitle;
  readonly badgeReward?: Badge;
  readonly cosmeticBorder?: string;
  readonly avatarUrl?: string;
}
