/**
 * Event-Driven Notification Generator Engine
 * Converts incoming EventBus events into typed notifications based on user preferences.
 */

import { AppEvent } from '@/src/core/events/event-bus';
import { NotificationItem } from '../models/notification.models';
import { PreferenceService } from '../services/preference.service';

export class NotificationEngine {
  public static fromEvent(event: AppEvent, preferenceService: PreferenceService): NotificationItem | null {
    let item: NotificationItem | null = null;

    switch (event.type) {
      case 'AchievementUnlocked': {
        const payload = event.payload as { name?: string };
        item = {
          id: `notif-${Date.now()}-${Math.random()}`,
          title: '🏆 Achievement Unlocked!',
          message: `Congratulations! You unlocked '${payload.name || 'Achievement'}'.`,
          category: 'achievement',
          priority: 'High',
          channel: 'in_app',
          isRead: false,
          isDismissed: false,
          createdAt: event.timestamp,
        };
        break;
      }
      case 'BadgeEarned': {
        const payload = event.payload as { name?: string };
        item = {
          id: `notif-${Date.now()}-${Math.random()}`,
          title: '🥇 Badge Earned!',
          message: `You earned the '${payload.name || 'Badge'}'.`,
          category: 'badge_earned',
          priority: 'Medium',
          channel: 'in_app',
          isRead: false,
          isDismissed: false,
          createdAt: event.timestamp,
        };
        break;
      }
      case 'ContestCompleted': {
        item = {
          id: `notif-${Date.now()}-${Math.random()}`,
          title: '🎯 Contest Finished',
          message: 'Your contest performance analysis is ready to view.',
          category: 'contest_result',
          priority: 'High',
          channel: 'in_app',
          isRead: false,
          isDismissed: false,
          createdAt: event.timestamp,
        };
        break;
      }
      default:
        break;
    }

    if (item && !preferenceService.shouldDeliver(item.category, item.priority)) {
      return null;
    }

    return item;
  }
}
