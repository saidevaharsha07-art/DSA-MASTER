/**
 * Notification Preference & State Storage
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { UserNotificationPreferences } from '../models/notification-preference.models';

export class NotificationStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async savePreferences(prefs: UserNotificationPreferences): Promise<void> {
    await this.storage.set('notification_user_preferences', prefs);
  }

  public async getPreferences(): Promise<UserNotificationPreferences | null> {
    return this.storage.get<UserNotificationPreferences>('notification_user_preferences');
  }
}
