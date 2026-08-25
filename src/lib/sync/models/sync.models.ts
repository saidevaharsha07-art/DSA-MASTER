/**
 * Sync Resource & State Models
 */

export type SyncDomain =
  | 'profile'
  | 'xp'
  | 'streak'
  | 'settings'
  | 'memory'
  | 'reviews'
  | 'contests'
  | 'adaptive'
  | 'oracle'
  | 'achievements';

export type SyncStatus = 'idle' | 'syncing' | 'queued' | 'conflict' | 'error' | 'success';

export interface SyncResourceMetadata {
  readonly domain: SyncDomain;
  readonly version: number;
  readonly timestamp: string;
  readonly checksum: string;
  readonly source: string; // client / cloud
  readonly syncStatus: SyncStatus;
}

export interface SyncRecord<T = unknown> {
  readonly metadata: SyncResourceMetadata;
  readonly payload: T;
}
