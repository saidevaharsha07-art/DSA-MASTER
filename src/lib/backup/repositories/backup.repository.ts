/**
 * Backup Repository (Abstracts Backup Storage & Providers)
 */

import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';
import { BackupProviderRegistry } from '../providers/provider.registry';

export class BackupRepository {
  public async saveBackup(snapshot: BackupSnapshot): Promise<boolean> {
    const provider = BackupProviderRegistry.getActiveProvider();
    return provider.saveBackup(snapshot);
  }

  public async getBackup(backupId: string): Promise<BackupSnapshot | null> {
    const provider = BackupProviderRegistry.getActiveProvider();
    return provider.getBackup(backupId);
  }

  public async listBackups(): Promise<ReadonlyArray<BackupMetadata>> {
    const provider = BackupProviderRegistry.getActiveProvider();
    return provider.listBackups();
  }

  public async deleteBackup(backupId: string): Promise<boolean> {
    const provider = BackupProviderRegistry.getActiveProvider();
    return provider.deleteBackup(backupId);
  }
}
