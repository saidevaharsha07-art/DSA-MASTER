/**
 * Sync Manager Engine Coordinator
 */

import { SyncQueue } from '../queue/sync.queue';
import { RetryQueue } from '../queue/retry.queue';
import { SyncStorage } from '../storage/sync.storage';
import { SyncStateService } from './sync-state.service';
import { SyncProviderRegistry } from '../providers/sync-provider.registry';
import { LocalSyncProvider } from '../providers/local.provider';
import { MockCloudSyncProvider } from '../providers/mock-cloud.provider';

export class SyncManager {
  public readonly queue: SyncQueue = new SyncQueue();
  public readonly retryQueue: RetryQueue = new RetryQueue();
  public readonly storage: SyncStorage = new SyncStorage();
  public readonly stateService: SyncStateService = new SyncStateService();

  constructor() {
    SyncProviderRegistry.register(new LocalSyncProvider());
    SyncProviderRegistry.register(new MockCloudSyncProvider());
  }
}
