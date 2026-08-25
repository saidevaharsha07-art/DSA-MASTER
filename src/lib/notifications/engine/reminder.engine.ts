/**
 * Reminder Engine
 */

import { Reminder } from '../models/reminder.models';
import { NotificationItem } from '../models/notification.models';
import { EventBus } from '@/src/core/events/event-bus';

export class ReminderEngine {
  public static triggerReminder(reminder: Reminder): NotificationItem {
    const notification: NotificationItem = {
      id: `notif-rem-${reminder.id}-${Date.now()}`,
      title: `Reminder: ${reminder.title}`,
      message: reminder.message,
      category: reminder.category,
      priority: 'High',
      channel: 'in_app',
      isRead: false,
      isDismissed: false,
      createdAt: new Date().toISOString(),
    };

    EventBus.publish('ReminderTriggered', reminder);
    return notification;
  }
}
