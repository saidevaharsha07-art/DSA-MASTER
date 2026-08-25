/**
 * Replay Service for Offline Queued Actions
 */

import { SyncQueue } from '../queue/sync.queue';
import { ISyncProvider } from '../providers/sync-provider.interface';
import { EventBus } from '@/src/core/events/event-bus';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class ReplayService {
  public static async replayQueue(queue: SyncQueue, provider: ISyncProvider): Promise<number> {
    const items = queue.dequeueAll();
    if (items.length === 0) return 0;

    EventBus.publish('ReplayStarted', { count: items.length });
    const start = performance.now();
    let replayed = 0;

    for (const item of items) {
      const ok = await provider.pushRecord(item);
      if (ok) replayed++;
    }

    const duration = performance.now() - start;
    MetricsCollector.record('sync_replay_duration', duration, 'ms');
    MetricsCollector.record('sync_replayed_count', replayed, 'count');

    EventBus.publish('ReplayFinished', { replayed, total: items.length });
    return replayed;
  }
}
