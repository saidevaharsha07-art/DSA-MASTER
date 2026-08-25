/**
 * Persistent Sync State & Conflict History Storage
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { ConflictReport } from '../models/sync-conflict.models';
import { SyncReport } from '../models/sync-report.models';

export class SyncStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async saveConflictReport(report: ConflictReport): Promise<void> {
    const existing = (await this.storage.get<ConflictReport[]>('sync_conflicts')) || [];
    existing.push(report);
    await this.storage.set('sync_conflicts', existing);
  }

  public async getConflictHistory(): Promise<ReadonlyArray<ConflictReport>> {
    const res = await this.storage.get<ConflictReport[]>('sync_conflicts');
    return res ? Object.freeze(res) : Object.freeze([]);
  }

  public async saveSyncReport(report: SyncReport): Promise<void> {
    const existing = (await this.storage.get<SyncReport[]>('sync_reports')) || [];
    existing.push(report);
    await this.storage.set('sync_reports', existing);
  }

  public async getSyncReports(): Promise<ReadonlyArray<SyncReport>> {
    const res = await this.storage.get<SyncReport[]>('sync_reports');
    return res ? Object.freeze(res) : Object.freeze([]);
  }
}
