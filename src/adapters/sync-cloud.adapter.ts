/**
 * Sync & Cloud Sync Engine Adapter
 * Bridges local user progress & solved state into SyncService queue.
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { SyncService } from '@/src/lib/sync/services/sync.service';
import { SyncDomain } from '@/src/lib/sync/models/sync.models';

export class SyncCloudAdapter {
  private static get syncService(): SyncService {
    return Container.resolve<SyncService>('SyncService');
  }

  public static enqueueSyncItem(domain: SyncDomain, data: Record<string, unknown>): void {
    EventBus.publish('SyncStarted', { domain });
    this.syncService.enqueueLocalChange(domain, data);
    EventBus.publish('SyncCompleted', { domain, status: 'synced' });
  }

  public static async triggerSync() {
    return this.syncService.sync('manual');
  }
}
