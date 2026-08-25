/**
 * Real-Time Channel & Connection Storage Wrapper
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';

export class RealtimeStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async saveActiveChannels(channels: ReadonlyArray<string>): Promise<void> {
    await this.storage.set('realtime_active_channels', channels);
  }

  public async getActiveChannels(): Promise<ReadonlyArray<string> | null> {
    return this.storage.get<ReadonlyArray<string>>('realtime_active_channels');
  }
}
