/**
 * Unit Test: Unified Notifications & Reminder Framework (Milestone 5.6)
 */

import { NotificationService } from '@/src/lib/notifications/services/notification.service';
import { NotificationApi } from '@/src/lib/notifications/api/notification.api';
import { EventBus } from '@/src/core/events/event-bus';

import { Container } from '@/src/core/container/container';

export async function testNotificationFramework(): Promise<void> {
  console.log('--- Testing Milestone 5.6 Unified Notifications & Reminder Framework ---');

  EventBus.clear();
  const notificationService = new NotificationService();
  Container.registerSingleton('NotificationService', notificationService);

  // 1. Event-Driven Notification Creation via EventBus
  let notifCreatedFired = false;
  const unsub = EventBus.subscribe('NotificationCreated', () => {
    notifCreatedFired = true;
  });

  EventBus.publish('AchievementUnlocked', { name: 'Master Speedrunner' });
  await new Promise((r) => setTimeout(r, 50));
  unsub();

  const unread = await notificationService.getUnread();
  if (unread.length === 0 || !notifCreatedFired) {
    throw new Error('Event-driven notification creation or EventBus publication failed!');
  }
  console.log(`[PASS] Event-driven notification creation verified (${unread[0].title}).`);

  // 2. Mark Read & Dismiss
  const notifId = unread[0].id;
  await NotificationApi.markRead(notifId);

  const unreadAfterRead = await NotificationApi.getUnread();
  if (unreadAfterRead.length !== 0) {
    throw new Error('Mark notification read failed!');
  }
  console.log('[PASS] Notification read status state update verified.');

  // 3. Schedule Reminder
  const reminder = await NotificationApi.scheduleReminder('Daily Practice', 'Time to solve problems', 'daily_practice', 'daily');
  if (!reminder || !reminder.isEnabled || reminder.frequency !== 'daily') {
    throw new Error('Reminder scheduling failed!');
  }
  console.log('[PASS] Recurring reminder scheduling verified.');
}
