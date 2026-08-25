/**
 * Mock Browser Notification Provider (Zero real browser permission prompts in tests)
 */

import { INotificationProvider } from './notification-provider.interface';
import { NotificationItem } from '../models/notification.models';
import { NotificationChannel } from '../models/notification-channel.models';

export class BrowserNotificationProvider implements INotificationProvider {
  public readonly channel: NotificationChannel = 'browser';
  public readonly name = 'Browser Web Push Provider (Mock)';

  public async send(notification: NotificationItem): Promise<boolean> {
    return true;
  }
}
