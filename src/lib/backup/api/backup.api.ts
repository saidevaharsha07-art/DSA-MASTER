/**
 * Public Versioned Backup API Facade
 */

import { Container } from '@/src/core/container/container';
import { BackupService } from '../services/backup.service';
import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';
import { RestoreMode, RestorePlan, RestoreReport } from '../models/restore.models';
import { IntegrityReport } from '../models/integrity.models';

export class BackupApi {
  private static get service(): BackupService {
    if (!Container.has('BackupService')) {
      Container.registerSingleton('BackupService', new BackupService());
    }
    return Container.resolve<BackupService>('BackupService');
  }

  public static async createBackup(description?: string): Promise<BackupSnapshot> {
    return this.service.createBackup(description);
  }

  public static async listBackups(): Promise<ReadonlyArray<BackupMetadata>> {
    return this.service.listBackups();
  }

  public static async restoreBackup(backupId: string, mode: RestoreMode = 'full'): Promise<RestoreReport> {
    return this.service.restoreBackup(backupId, mode);
  }

  public static async previewRestore(backupId: string): Promise<RestorePlan> {
    return this.service.previewRestore(backupId);
  }

  public static async verifyBackup(backupId: string): Promise<IntegrityReport> {
    return this.service.verifyBackup(backupId);
  }

  public static async exportBackup(backupId: string): Promise<string> {
    return this.service.exportBackup(backupId);
  }

  public static async importBackup(rawJson: string): Promise<BackupSnapshot> {
    return this.service.importBackup(rawJson);
  }

  public static async deleteBackup(backupId: string): Promise<boolean> {
    return this.service.deleteBackup(backupId);
  }
}
