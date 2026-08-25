/**
 * Unit Test: Offline Action Queue & Sync Replay
 */

import { OfflineActionQueue } from '@/src/lib/offline/offline.queue';

export async function testOfflineQueue(): Promise<void> {
  console.log('--- Testing Offline Action Queue & Sync Replay ---');

  OfflineActionQueue.clear();
  OfflineActionQueue.enqueue('RECORD_ATTEMPT', { problemId: 'P-OFFLINE' });

  const pending = OfflineActionQueue.getPending();
  if (pending.length !== 1) {
    throw new Error('OfflineActionQueue failed to enqueue action!');
  }

  let replayedCount = 0;
  const count = await OfflineActionQueue.replay(async (act) => {
    if (act.type === 'RECORD_ATTEMPT') {
      replayedCount++;
    }
  });

  if (count !== 1 || replayedCount !== 1) {
    throw new Error('OfflineActionQueue sync replay failed!');
  }

  console.log('[PASS] OfflineActionQueue action queueing and replay verified.');
}
