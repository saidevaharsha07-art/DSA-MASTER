/**
 * Sync Job & Mode Models
 */

import { SyncDomain } from './sync.models';

export type SyncMode = 'manual' | 'background' | 'startup' | 'shutdown' | 'incremental' | 'full' | 'retry';

export interface SyncJob {
  readonly jobId: string;
  readonly mode: SyncMode;
  readonly domains: ReadonlyArray<SyncDomain>;
  readonly createdAt: string;
  readonly status: 'pending' | 'running' | 'completed' | 'failed';
}
