/**
 * Notification Repository (Mock / Local Storage Backed)
 */

import { NotificationItem } from '../models/notification.models';
import { Reminder } from '../models/reminder.models';

export interface INotificationRepository {
  getNotifications(): Promise<ReadonlyArray<NotificationItem>>;
  saveNotification(notification: NotificationItem): Promise<void>;
  markRead(id: string): Promise<void>;
  dismiss(id: string): Promise<void>;
  getReminders(): Promise<ReadonlyArray<Reminder>>;
  saveReminder(reminder: Reminder): Promise<void>;
}

export class MockNotificationRepository implements INotificationRepository {
  private notifications: Map<string, NotificationItem> = new Map();
  private reminders: Map<string, Reminder> = new Map();

  public async getNotifications(): Promise<ReadonlyArray<NotificationItem>> {
    return Array.from(this.notifications.values());
  }

  public async saveNotification(notification: NotificationItem): Promise<void> {
    this.notifications.set(notification.id, notification);
  }

  public async markRead(id: string): Promise<void> {
    const item = this.notifications.get(id);
    if (item) {
      this.notifications.set(id, { ...item, isRead: true, readAt: new Date().toISOString() });
    }
  }

  public async dismiss(id: string): Promise<void> {
    const item = this.notifications.get(id);
    if (item) {
      this.notifications.set(id, { ...item, isDismissed: true });
    }
  }

  public async getReminders(): Promise<ReadonlyArray<Reminder>> {
    return Array.from(this.reminders.values());
  }

  public async saveReminder(reminder: Reminder): Promise<void> {
    this.reminders.set(reminder.id, reminder);
  }
}
