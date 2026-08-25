/**
 * Persistent Storage Wrapper for Backup Configuration & Policy
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { BackupPolicy } from '../models/policy.models';

export class BackupStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async savePolicy(policy: BackupPolicy): Promise<void> {
    await this.storage.set('backup_policy_config', policy);
  }

  public async getPolicy(): Promise<BackupPolicy | null> {
    return this.storage.get<BackupPolicy>('backup_policy_config');
  }
}
