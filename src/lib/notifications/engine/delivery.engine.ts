/**
 * Priority Delivery Queue Engine
 */

import { NotificationItem, NotificationPriority } from '../models/notification.models';
import { NotificationProviderRegistry } from '../providers/provider.registry';
import { EventBus } from '@/src/core/events/event-bus';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

const PRIORITY_ORDER: Record<NotificationPriority, number> = {
  Critical: 5,
  High: 4,
  Medium: 3,
  Low: 2,
  Silent: 1,
};

export class DeliveryEngine {
  private queue: NotificationItem[] = [];

  public enqueue(notification: NotificationItem): void {
    // Deduplicate by ID
    this.queue = this.queue.filter((item) => item.id !== notification.id);
    this.queue.push(notification);
    // Sort by priority descending
    this.queue.sort((a, b) => PRIORITY_ORDER[b.priority] - PRIORITY_ORDER[a.priority]);
  }

  public async processQueue(): Promise<number> {
    const items = [...this.queue];
    this.queue = [];
    let delivered = 0;

    for (const item of items) {
      const provider = NotificationProviderRegistry.getProvider(item.channel);
      if (provider) {
        const ok = await provider.send(item);
        if (ok) {
          delivered++;
          EventBus.publish('NotificationDelivered', item);
        }
      }
    }

    MetricsCollector.record('notifications_delivered', delivered, 'count');
    return delivered;
  }
}
