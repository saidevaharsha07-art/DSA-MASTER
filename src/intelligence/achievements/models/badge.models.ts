/**
 * Badge & Title Models
 */

import { AchievementRarity } from './category.models';

export interface Badge {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly color: string;
  readonly tier: AchievementRarity;
  readonly animation: string;
  readonly earnedAt: string;
}

export interface UserTitle {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly unlockedAt: string;
}
