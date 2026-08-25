/**
 * Achievement Categories & Rarities
 */

export type AchievementCategory =
  | 'xp'
  | 'daily_streak'
  | 'weekly_streak'
  | 'monthly_streak'
  | 'contest'
  | 'rating'
  | 'practice'
  | 'revision'
  | 'memory'
  | 'kingdom'
  | 'boss'
  | 'pattern'
  | 'platform'
  | 'oracle'
  | 'hidden'
  | 'seasonal';

export type AchievementRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
