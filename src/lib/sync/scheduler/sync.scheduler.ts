/**
 * Sync Task Scheduler
 */

import { BackgroundScheduler } from '@/src/core/workers/background-scheduler';
import { SyncPolicy } from './sync-policy';

export class SyncScheduler {
  public static startBackgroundSync(task: () => Promise<void>): void {
    BackgroundScheduler.schedule({
      id: 'background-cloud-sync',
      name: 'Background Cloud Sync Scheduler',
      intervalMs: SyncPolicy.DEFAULT_BACKGROUND_INTERVAL_MS,
      handler: task,
    });
  }

  public static stopBackgroundSync(): void {
    BackgroundScheduler.stop('background-cloud-sync');
  }
}
