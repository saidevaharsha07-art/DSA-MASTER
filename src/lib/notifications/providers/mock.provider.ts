/**
 * External Channel Provider Stubs (Email, Push, Slack, Discord)
 */

import { INotificationProvider } from './notification-provider.interface';
import { NotificationItem } from '../models/notification.models';
import { NotificationChannel } from '../models/notification-channel.models';

export class MockExternalNotificationProvider implements INotificationProvider {
  constructor(public readonly channel: NotificationChannel, public readonly name: string) {}

  public async send(notification: NotificationItem): Promise<boolean> {
    return true;
  }
}
