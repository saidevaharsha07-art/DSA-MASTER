/**
 * Notification Item & Priority Models
 */

import { NotificationChannel } from './notification-channel.models';

export type NotificationPriority = 'Critical' | 'High' | 'Medium' | 'Low' | 'Silent';

export type NotificationCategory =
  | 'achievement'
  | 'daily_practice'
  | 'revision_due'
  | 'memory_review'
  | 'contest_reminder'
  | 'contest_result'
  | 'oracle_recommendation'
  | 'strategy_changed'
  | 'xp_milestone'
  | 'rating_change'
  | 'leaderboard_update'
  | 'badge_earned'
  | 'title_unlocked'
  | 'system'
  | 'warning'
  | 'success'
  | 'error'
  | 'information';

export interface NotificationItem {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly category: NotificationCategory;
  readonly priority: NotificationPriority;
  readonly channel: NotificationChannel;
  readonly isRead: boolean;
  readonly isDismissed: boolean;
  readonly createdAt: string;
  readonly readAt?: string;
  readonly metadata?: Record<string, unknown>;
}
