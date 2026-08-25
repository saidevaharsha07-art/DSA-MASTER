/**
 * Local Storage Sync Provider (Fully Functional Offline Backend)
 */

import { ISyncProvider } from './sync-provider.interface';
import { SyncProviderInfo } from '../models/sync-provider.models';
import { SyncRecord, SyncDomain } from '../models/sync.models';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';

export class LocalSyncProvider implements ISyncProvider {
  public readonly info: SyncProviderInfo = {
    id: 'prov-local-1',
    type: 'local',
    name: 'Local Offline Provider',
    isConnected: true,
  };

  private storage: MemoryStorageProvider = new MemoryStorageProvider();

  public async connect(): Promise<boolean> {
    return true;
  }

  public async disconnect(): Promise<void> {}

  public async pushRecord(record: SyncRecord): Promise<boolean> {
    await this.storage.set(`sync_${record.metadata.domain}`, record);
    return true;
  }

  public async fetchRecord(domain: SyncDomain): Promise<SyncRecord | null> {
    return this.storage.get<SyncRecord>(`sync_${domain}`);
  }

  public async fetchAllRecords(): Promise<ReadonlyArray<SyncRecord>> {
    const keys = await this.storage.getAllKeys();
    const records: SyncRecord[] = [];
    for (const k of keys) {
      if (k.startsWith('sync_')) {
        const r = await this.storage.get<SyncRecord>(k);
        if (r) records.push(r);
      }
    }
    return Object.freeze(records);
  }
}
