/**
 * Sync Execution Report Model
 */

import { ConflictReport } from './sync-conflict.models';
import { SyncJob } from './sync-job.models';

export interface SyncReport {
  readonly reportId: string;
  readonly job: SyncJob;
  readonly durationMs: number;
  readonly success: boolean;
  readonly itemsSynced: number;
  readonly conflictsResolved: ReadonlyArray<ConflictReport>;
  readonly bytesTransferred: number;
  readonly error?: string;
  readonly completedAt: string;
}
