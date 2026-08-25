/**
 * Local Backup Provider (Storage / Memory Backed)
 */

import { IBackupProvider } from './backup-provider.interface';
import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';

export class LocalBackupProvider implements IBackupProvider {
  public readonly providerId = 'local_backup';
  public readonly name = 'Local Disk Backup Provider';
  private snapshots: Map<string, BackupSnapshot> = new Map();

  public async saveBackup(snapshot: BackupSnapshot): Promise<boolean> {
    this.snapshots.set(snapshot.manifest.metadata.backupId, snapshot);
    return true;
  }

  public async getBackup(backupId: string): Promise<BackupSnapshot | null> {
    return this.snapshots.get(backupId) || null;
  }

  public async listBackups(): Promise<ReadonlyArray<BackupMetadata>> {
    return Object.freeze(Array.from(this.snapshots.values()).map((s) => s.manifest.metadata));
  }

  public async deleteBackup(backupId: string): Promise<boolean> {
    return this.snapshots.delete(backupId);
  }
}
