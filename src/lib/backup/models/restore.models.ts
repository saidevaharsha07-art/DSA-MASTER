/**
 * Restore Modes & Reports
 */

export type RestoreMode = 'full' | 'partial' | 'merge' | 'preview' | 'dry_run';

export interface RestorePlan {
  readonly backupId: string;
  readonly mode: RestoreMode;
  readonly targetSubsystems: ReadonlyArray<string>;
  readonly requiresSchemaMigration: boolean;
  readonly targetSchemaVersion: number;
}

export interface RestoreReport {
  readonly restoreId: string;
  readonly backupId: string;
  readonly mode: RestoreMode;
  readonly success: boolean;
  readonly restoredSubsystemsCount: number;
  readonly restoredRecordsCount: number;
  readonly durationMs: number;
  readonly completedAt: string;
  readonly error?: string;
}
