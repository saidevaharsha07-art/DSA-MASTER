/**
 * Provider Interface Contract for Notifications
 */

import { NotificationItem } from '../models/notification.models';
import { NotificationChannel } from '../models/notification-channel.models';

export interface INotificationProvider {
  readonly channel: NotificationChannel;
  readonly name: string;
  send(notification: NotificationItem): Promise<boolean>;
}
