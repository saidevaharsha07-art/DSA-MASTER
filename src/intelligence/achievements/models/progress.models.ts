/**
 * Progress & State Models
 */

export type AchievementState = 'locked' | 'in_progress' | 'completed' | 'claimed' | 'expired';

export interface AchievementProgress {
  readonly achievementId: string;
  readonly currentProgress: number;
  readonly maxProgress: number;
  readonly percentage: number;
  readonly state: AchievementState;
  readonly lastUpdatedAt: string;
}
