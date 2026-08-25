/**
 * Provider-Agnostic Cloud Sync Provider Interface Contract
 */

import { SyncProviderInfo } from '../models/sync-provider.models';
import { SyncRecord, SyncDomain } from '../models/sync.models';

export interface ISyncProvider {
  readonly info: SyncProviderInfo;
  connect(): Promise<boolean>;
  disconnect(): Promise<void>;
  pushRecord(record: SyncRecord): Promise<boolean>;
  fetchRecord(domain: SyncDomain): Promise<SyncRecord | null>;
  fetchAllRecords(): Promise<ReadonlyArray<SyncRecord>>;
}
