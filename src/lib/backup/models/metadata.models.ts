/**
 * Backup Metadata Model
 */

export interface BackupMetadata {
  readonly backupId: string;
  readonly createdAt: string;
  readonly applicationVersion: string;
  readonly schemaVersion: number;
  readonly backupVersion: string;
  readonly snapshotSizeBytes: number;
  readonly recordCount: number;
  readonly checksum: string;
  readonly description?: string;
}
