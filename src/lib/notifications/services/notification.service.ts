/**
 * Unified Notification Service API
 */

import { INotificationRepository, MockNotificationRepository } from '../repositories/notification.repository';
import { NotificationStateService } from './notification-state.service';
import { PreferenceService } from './preference.service';
import { DeliveryEngine } from '../engine/delivery.engine';
import { NotificationProviderRegistry } from '../providers/provider.registry';
import { NotificationItem, NotificationCategory } from '../models/notification.models';
import { Reminder } from '../models/reminder.models';
import { ScheduleFrequency } from '../models/schedule.models';
import { SchedulingEngine } from '../engine/scheduling.engine';
import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { NotificationEngine } from '../engine/notification.engine';

export class NotificationService {
  private repository: INotificationRepository;
  public readonly stateService: NotificationStateService;
  public readonly preferenceService: PreferenceService;
  private deliveryEngine: DeliveryEngine;

  constructor(repository?: INotificationRepository, stateService?: NotificationStateService, preferenceService?: PreferenceService) {
    this.repository = repository || new MockNotificationRepository();
    this.stateService = stateService || new NotificationStateService();
    this.preferenceService = preferenceService || new PreferenceService();
    this.deliveryEngine = new DeliveryEngine();

    NotificationProviderRegistry.registerDefaults();

    EventBus.subscribeAll((event: AppEvent) => {
      this.handleEvent(event);
    });
  }

  private async handleEvent(event: AppEvent): Promise<void> {
    const notif = NotificationEngine.fromEvent(event, this.preferenceService);
    if (notif) {
      await this.sendNotification(notif);
    }
  }

  public async sendNotification(item: NotificationItem): Promise<void> {
    if (!this.preferenceService.shouldDeliver(item.category, item.priority)) return;

    await this.repository.saveNotification(item);
    this.deliveryEngine.enqueue(item);
    await this.deliveryEngine.processQueue();

    const all = await this.repository.getNotifications();
    this.stateService.setState({ items: all });
    EventBus.publish('NotificationCreated', item);
  }

  public async getNotifications(): Promise<ReadonlyArray<NotificationItem>> {
    return this.repository.getNotifications();
  }

  public async getUnread(): Promise<ReadonlyArray<NotificationItem>> {
    const all = await this.getNotifications();
    return all.filter((i) => !i.isRead && !i.isDismissed);
  }

  public async markRead(id: string): Promise<void> {
    await this.repository.markRead(id);
    const all = await this.repository.getNotifications();
    this.stateService.setState({ items: all });
    EventBus.publish('NotificationRead', { id });
  }

  public async dismiss(id: string): Promise<void> {
    await this.repository.dismiss(id);
    const all = await this.repository.getNotifications();
    this.stateService.setState({ items: all });
    EventBus.publish('NotificationDismissed', { id });
  }

  public async scheduleReminder(
    title: string,
    message: string,
    category: NotificationCategory,
    frequency: ScheduleFrequency
  ): Promise<Reminder> {
    const reminder: Reminder = {
      id: `rem-${Date.now()}`,
      title,
      message,
      category,
      frequency,
      nextTriggerAt: SchedulingEngine.calculateNextTrigger(frequency),
      isEnabled: true,
    };

    await this.repository.saveReminder(reminder);
    const reminders = await this.repository.getReminders();
    this.stateService.setState({ reminders });
    return reminder;
  }
}
