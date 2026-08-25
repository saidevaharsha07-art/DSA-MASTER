/**
 * Master Achievement Definition Model
 */

import { AchievementCategory, AchievementRarity } from './category.models';
import { AchievementState } from './progress.models';
import { RewardBundle } from './reward.models';

export interface AchievementDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: AchievementCategory;
  readonly rarity: AchievementRarity;
  readonly icon: string;
  readonly points: number;
  readonly rewards: RewardBundle;
  readonly hidden: boolean;
  readonly secret: boolean;
  readonly maxProgress: number;
  readonly version: number;
}

export interface AchievementItem extends AchievementDefinition {
  readonly currentProgress: number;
  readonly completed: boolean;
  readonly completedAt?: string;
  readonly state: AchievementState;
}
