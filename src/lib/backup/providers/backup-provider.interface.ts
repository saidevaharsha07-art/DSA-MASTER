/**
 * Backup Provider Interface Contract
 */

import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';

export interface IBackupProvider {
  readonly providerId: string;
  readonly name: string;
  saveBackup(snapshot: BackupSnapshot): Promise<boolean>;
  getBackup(backupId: string): Promise<BackupSnapshot | null>;
  listBackups(): Promise<ReadonlyArray<BackupMetadata>>;
  deleteBackup(backupId: string): Promise<boolean>;
}
