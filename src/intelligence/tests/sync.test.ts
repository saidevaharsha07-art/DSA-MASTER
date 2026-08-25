/**
 * Unit Test: Offline-First Cloud Sync Engine (Milestone 5.2)
 */

import { SyncService } from '@/src/lib/sync/services/sync.service';
import { ConflictService } from '@/src/lib/sync/services/conflict.service';
import { SyncRecord } from '@/src/lib/sync/models/sync.models';
import { EventBus } from '@/src/core/events/event-bus';

export async function testSyncEngine(): Promise<void> {
  console.log('--- Testing Milestone 5.2 Offline-First Cloud Sync Engine ---');

  const syncService = new SyncService();

  // 1. Local Queue Enqueue
  syncService.enqueueLocalChange('xp', { xp: 150 });
  syncService.enqueueLocalChange('streak', { streak: 5 });

  if (syncService.getManager().queue.size() !== 2) {
    throw new Error('SyncEngine failed to queue local offline changes!');
  }
  console.log('[PASS] Local offline action queuing verified.');

  // 2. EventBus Publication on Sync
  let syncStarted = false;
  let syncCompleted = false;

  const unsub1 = EventBus.subscribe('SyncStarted', () => { syncStarted = true; });
  const unsub2 = EventBus.subscribe('SyncCompleted', () => { syncCompleted = true; });

  const report = await syncService.sync('manual', ['xp', 'streak']);
  unsub1();
  unsub2();

  if (!report.success || !syncStarted || !syncCompleted) {
    throw new Error('Sync execution or EventBus notifications failed!');
  }
  console.log(`[PASS] Sync execution and EventBus publication verified (${report.itemsSynced} items synced).`);

  // 3. Conflict Resolution Engine
  const localRecord: SyncRecord = {
    metadata: { domain: 'xp', version: 1, timestamp: '2026-07-30T10:00:00Z', checksum: 'c1', source: 'client', syncStatus: 'idle' },
    payload: { xp: 100 },
  };

  const remoteRecord: SyncRecord = {
    metadata: { domain: 'xp', version: 2, timestamp: '2026-07-30T10:05:00Z', checksum: 'c2', source: 'cloud', syncStatus: 'idle' },
    payload: { xp: 200 },
  };

  const { resolved } = ConflictService.resolve(localRecord, remoteRecord, 'newest_wins');
  if (resolved.metadata.timestamp !== remoteRecord.metadata.timestamp) {
    throw new Error('Conflict resolution (newest_wins) failed!');
  }
  console.log('[PASS] Deterministic conflict resolution (Newest Wins) verified.');
}
