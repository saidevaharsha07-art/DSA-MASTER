/**
 * Reminder Model
 */

import { ScheduleFrequency } from './schedule.models';
import { NotificationCategory } from './notification.models';

export interface Reminder {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly category: NotificationCategory;
  readonly frequency: ScheduleFrequency;
  readonly nextTriggerAt: string;
  readonly isEnabled: boolean;
}
