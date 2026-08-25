/**
 * User Notification Preference Model
 */

import { NotificationCategory } from './notification.models';
import { NotificationChannel } from './notification-channel.models';

export interface CategoryPreference {
  readonly enabled: boolean;
  readonly channels: ReadonlyArray<NotificationChannel>;
}

export interface UserNotificationPreferences {
  readonly globalEnabled: boolean;
  readonly doNotDisturb: boolean;
  readonly quietHoursStart?: string; // e.g. "22:00"
  readonly quietHoursEnd?: string;   // e.g. "08:00"
  readonly categoryPreferences: Readonly<Record<NotificationCategory, CategoryPreference>>;
}
