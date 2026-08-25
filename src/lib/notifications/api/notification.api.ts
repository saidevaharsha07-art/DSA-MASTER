/**
 * Public Notification API Facade
 */

import { Container } from '@/src/core/container/container';
import { NotificationService } from '../services/notification.service';
import { NotificationItem, NotificationCategory } from '../models/notification.models';
import { Reminder } from '../models/reminder.models';
import { ScheduleFrequency } from '../models/schedule.models';
import { UserNotificationPreferences } from '../models/notification-preference.models';

export class NotificationApi {
  private static get service(): NotificationService {
    if (!Container.has('NotificationService')) {
      Container.registerSingleton('NotificationService', new NotificationService());
    }
    return Container.resolve<NotificationService>('NotificationService');
  }

  public static async getNotifications(): Promise<ReadonlyArray<NotificationItem>> {
    return this.service.getNotifications();
  }

  public static async getUnread(): Promise<ReadonlyArray<NotificationItem>> {
    return this.service.getUnread();
  }

  public static async markRead(id: string): Promise<void> {
    return this.service.markRead(id);
  }

  public static async dismiss(id: string): Promise<void> {
    return this.service.dismiss(id);
  }

  public static async scheduleReminder(
    title: string,
    message: string,
    category: NotificationCategory,
    frequency: ScheduleFrequency
  ): Promise<Reminder> {
    return this.service.scheduleReminder(title, message, category, frequency);
  }

  public static getPreferences(): UserNotificationPreferences {
    return this.service.preferenceService.getPreferences();
  }

  public static async updatePreferences(next: Partial<UserNotificationPreferences>): Promise<UserNotificationPreferences> {
    return this.service.preferenceService.updatePreferences(next);
  }
}
