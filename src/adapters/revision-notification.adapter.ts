/**
 * Revision & Notification Engine Adapter
 * Bridges MemoryEngine reviews and spaced repetition schedules into NotificationApi reminders.
 */

import { EventBus } from '@/src/core/events/event-bus';
import { NotificationApi } from '@/src/lib/notifications/api/notification.api';

export class RevisionNotificationAdapter {
  public static async scheduleRevisionReminder(conceptTitle: string, dueDays: number): Promise<void> {
    await NotificationApi.scheduleReminder(
      '🧠 Concept Revision Due',
      `Time to review "${conceptTitle}" in Memory Sanctuary to prevent memory decay.`,
      'revision_due',
      'once'
    );
    EventBus.publish('ReminderTriggered', { conceptTitle, dueDays });
  }

  public static onRevisionFinished(conceptId: string, outcome: 'success' | 'failure'): void {
    EventBus.publish('MemoryReviewed', { conceptId, outcome });
  }
}
