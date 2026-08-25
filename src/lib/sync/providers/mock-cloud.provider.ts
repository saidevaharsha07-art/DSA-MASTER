/**
 * Mock Cloud Sync Provider (No Real Network Requests)
 */

import { ISyncProvider } from './sync-provider.interface';
import { SyncProviderInfo } from '../models/sync-provider.models';
import { SyncRecord, SyncDomain } from '../models/sync.models';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';

export class MockCloudSyncProvider implements ISyncProvider {
  public readonly info: SyncProviderInfo = {
    id: 'prov-mock-cloud-1',
    type: 'mock-cloud',
    name: 'Mock Cloud Storage Provider',
    isConnected: true,
  };

  private remoteStore: MemoryStorageProvider = new MemoryStorageProvider();

  public async connect(): Promise<boolean> {
    return true;
  }

  public async disconnect(): Promise<void> {}

  public async pushRecord(record: SyncRecord): Promise<boolean> {
    const cloudVersion: SyncRecord = {
      ...record,
      metadata: {
        ...record.metadata,
        source: 'cloud',
        syncStatus: 'success',
      },
    };
    await this.remoteStore.set(`cloud_${record.metadata.domain}`, cloudVersion);
    return true;
  }

  public async fetchRecord(domain: SyncDomain): Promise<SyncRecord | null> {
    return this.remoteStore.get<SyncRecord>(`cloud_${domain}`);
  }

  public async fetchAllRecords(): Promise<ReadonlyArray<SyncRecord>> {
    const keys = await this.remoteStore.getAllKeys();
    const records: SyncRecord[] = [];
    for (const k of keys) {
      if (k.startsWith('cloud_')) {
        const r = await this.remoteStore.get<SyncRecord>(k);
        if (r) records.push(r);
      }
    }
    return Object.freeze(records);
  }
}
