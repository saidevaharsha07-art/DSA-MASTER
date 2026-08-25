/**
 * Conflict Resolution Models
 */

import { SyncDomain, SyncRecord } from './sync.models';

export type ConflictStrategy = 'newest_wins' | 'highest_xp_wins' | 'merge_arrays' | 'merge_maps' | 'manual' | 'custom';

export interface ConflictReport {
  readonly conflictId: string;
  readonly domain: SyncDomain;
  readonly localRecord: SyncRecord;
  readonly remoteRecord: SyncRecord;
  readonly strategyUsed: ConflictStrategy;
  readonly resolvedRecord: SyncRecord;
  readonly detectedAt: string;
  readonly resolvedAt: string;
}
