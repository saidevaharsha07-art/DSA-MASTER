/**
 * Background Sync Orchestrator
 */

import { SyncScheduler } from '../scheduler/sync.scheduler';

export class BackgroundSyncService {
  public static start(syncTask: () => Promise<void>): void {
    SyncScheduler.startBackgroundSync(syncTask);
  }

  public static stop(): void {
    SyncScheduler.stopBackgroundSync();
  }
}
