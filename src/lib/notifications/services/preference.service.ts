/**
 * Preference Service
 */

import { UserNotificationPreferences, CategoryPreference } from '../models/notification-preference.models';
import { NotificationCategory, NotificationPriority } from '../models/notification.models';
import { NotificationStorage } from '../storage/notification.storage';

export class PreferenceService {
  private storage: NotificationStorage;
  private currentPreferences: UserNotificationPreferences;

  constructor(storage?: NotificationStorage) {
    this.storage = storage || new NotificationStorage();
    this.currentPreferences = this.getDefaultPreferences();
  }

  public getDefaultPreferences(): UserNotificationPreferences {
    const defaultCatPref: CategoryPreference = { enabled: true, channels: ['in_app', 'browser'] };
    const categories: NotificationCategory[] = [
      'achievement',
      'daily_practice',
      'revision_due',
      'memory_review',
      'contest_reminder',
      'contest_result',
      'oracle_recommendation',
      'strategy_changed',
      'xp_milestone',
      'rating_change',
      'leaderboard_update',
      'badge_earned',
      'title_unlocked',
      'system',
      'warning',
      'success',
      'error',
      'information',
    ];

    const categoryPreferences = {} as Record<NotificationCategory, CategoryPreference>;
    categories.forEach((cat) => (categoryPreferences[cat] = defaultCatPref));

    return {
      globalEnabled: true,
      doNotDisturb: false,
      categoryPreferences,
    };
  }

  public getPreferences(): UserNotificationPreferences {
    return this.currentPreferences;
  }

  public async updatePreferences(next: Partial<UserNotificationPreferences>): Promise<UserNotificationPreferences> {
    this.currentPreferences = { ...this.currentPreferences, ...next };
    await this.storage.savePreferences(this.currentPreferences);
    return this.currentPreferences;
  }

  public shouldDeliver(category: NotificationCategory, priority: NotificationPriority): boolean {
    if (!this.currentPreferences.globalEnabled) return false;
    if (this.currentPreferences.doNotDisturb && priority !== 'Critical') return false;
    const catPref = this.currentPreferences.categoryPreferences[category];
    return catPref ? catPref.enabled : true;
  }
}
