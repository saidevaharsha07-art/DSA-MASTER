/**
 * Backup Policy Model
 */

export type BackupSchedulePolicy =
  | 'manual'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'before_upgrade'
  | 'before_migration'
  | 'before_sync';

export interface BackupPolicy {
  readonly autoBackupEnabled: boolean;
  readonly policy: BackupSchedulePolicy;
  readonly maxLocalBackupsToRetain: number;
}
