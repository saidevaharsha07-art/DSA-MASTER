/**
 * Provider Registry
 */

import { INotificationProvider } from './notification-provider.interface';
import { NotificationChannel } from '../models/notification-channel.models';
import { InAppNotificationProvider } from './inapp.provider';
import { BrowserNotificationProvider } from './browser.provider';
import { MockExternalNotificationProvider } from './mock.provider';

export class NotificationProviderRegistry {
  private static providers: Map<NotificationChannel, INotificationProvider> = new Map();

  public static register(provider: INotificationProvider): void {
    this.providers.set(provider.channel, provider);
  }

  public static getProvider(channel: NotificationChannel): INotificationProvider | undefined {
    return this.providers.get(channel);
  }

  public static registerDefaults(): void {
    if (this.providers.size > 0) return;
    this.register(new InAppNotificationProvider());
    this.register(new BrowserNotificationProvider());
    this.register(new MockExternalNotificationProvider('email', 'Email Provider Stub'));
    this.register(new MockExternalNotificationProvider('push', 'Mobile Push Stub'));
    this.register(new MockExternalNotificationProvider('discord', 'Discord Bot Stub'));
    this.register(new MockExternalNotificationProvider('slack', 'Slack App Stub'));
  }
}
