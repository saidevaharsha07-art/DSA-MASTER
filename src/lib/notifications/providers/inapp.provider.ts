/**
 * In-App Notification Provider
 */

import { INotificationProvider } from './notification-provider.interface';
import { NotificationItem } from '../models/notification.models';
import { NotificationChannel } from '../models/notification-channel.models';

export class InAppNotificationProvider implements INotificationProvider {
  public readonly channel: NotificationChannel = 'in_app';
  public readonly name = 'In-App Feed Provider';

  public async send(notification: NotificationItem): Promise<boolean> {
    // In-app feed items are stored in state/repository automatically
    return true;
  }
}
