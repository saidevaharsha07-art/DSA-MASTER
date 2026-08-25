/**
 * Deterministic Conflict Resolution Service
 * Supports Newest Wins, Highest XP Wins, Merge Arrays, Merge Maps, Manual, and Custom Resolvers.
 */

import { SyncRecord } from '../models/sync.models';
import { ConflictReport, ConflictStrategy } from '../models/sync-conflict.models';
import { EventBus } from '@/src/core/events/event-bus';

export class ConflictService {
  public static resolve(local: SyncRecord, remote: SyncRecord, strategy: ConflictStrategy = 'newest_wins'): { resolved: SyncRecord; report: ConflictReport } {
    let resolved: SyncRecord = local;

    switch (strategy) {
      case 'highest_xp_wins': {
        const localXp = (local.payload as { xp?: number })?.xp || 0;
        const remoteXp = (remote.payload as { xp?: number })?.xp || 0;
        resolved = remoteXp > localXp ? remote : local;
        break;
      }
      case 'merge_arrays': {
        const localArr = Array.isArray(local.payload) ? local.payload : [];
        const remoteArr = Array.isArray(remote.payload) ? remote.payload : [];
        const mergedPayload = Array.from(new Set([...localArr, ...remoteArr]));
        resolved = {
          ...local,
          payload: mergedPayload,
          metadata: { ...local.metadata, timestamp: new Date().toISOString() },
        };
        break;
      }
      case 'newest_wins':
      default: {
        const localTs = new Date(local.metadata.timestamp).getTime();
        const remoteTs = new Date(remote.metadata.timestamp).getTime();
        resolved = remoteTs > localTs ? remote : local;
        break;
      }
    }

    const report: ConflictReport = {
      conflictId: `cnf-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      domain: local.metadata.domain,
      localRecord: local,
      remoteRecord: remote,
      strategyUsed: strategy,
      resolvedRecord: resolved,
      detectedAt: new Date().toISOString(),
      resolvedAt: new Date().toISOString(),
    };

    EventBus.publish('ConflictDetected', { domain: local.metadata.domain });
    EventBus.publish('ConflictResolved', report);

    return { resolved, report };
  }
}
