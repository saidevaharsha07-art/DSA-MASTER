/**
 * IndexedDB Storage Provider
 */

import { IStorageProvider } from './storage-provider.interface';
import { MemoryStorageProvider } from './memory.storage';

export class IndexedDBStorageProvider implements IStorageProvider {
  private fallback: MemoryStorageProvider = new MemoryStorageProvider();

  public async get<T>(key: string): Promise<T | null> {
    return this.fallback.get<T>(key);
  }

  public async set<T>(key: string, value: T): Promise<void> {
    await this.fallback.set<T>(key, value);
  }

  public async remove(key: string): Promise<void> {
    await this.fallback.remove(key);
  }

  public async clear(): Promise<void> {
    await this.fallback.clear();
  }

  public async getAllKeys(): Promise<string[]> {
    return this.fallback.getAllKeys();
  }
}
