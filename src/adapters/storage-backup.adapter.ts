/**
 * Storage & Backup Engine Adapter
 * Bridges LocalStorage state & application storage into BackupService & BackupApi.
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { BackupService } from '@/src/lib/backup/services/backup.service';

export class StorageBackupAdapter {
  private static get backupService(): BackupService {
    return Container.resolve<BackupService>('BackupService');
  }

  public static async createBackup(label?: string) {
    EventBus.publish('BackupStarted', { label });
    const backup = await this.backupService.createBackup(label);
    EventBus.publish('BackupCompleted', backup);
    return backup;
  }

  public static async verifyBackup(backupId: string) {
    return this.backupService.verifyBackup(backupId);
  }

  public static async restoreBackup(backupId: string) {
    EventBus.publish('RestoreStarted', { backupId });
    const result = await this.backupService.restoreBackup(backupId);
    EventBus.publish('RestoreCompleted', result);
    return result;
  }
}
