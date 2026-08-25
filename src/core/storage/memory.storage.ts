/**
 * Memory Storage Provider
 */

import { IStorageProvider } from './storage-provider.interface';

export class MemoryStorageProvider implements IStorageProvider {
  private store: Map<string, unknown> = new Map();

  public async get<T>(key: string): Promise<T | null> {
    if (!this.store.has(key)) return null;
    return this.store.get(key) as T;
  }

  public async set<T>(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }

  public async remove(key: string): Promise<void> {
    this.store.delete(key);
  }

  public async clear(): Promise<void> {
    this.store.clear();
  }

  public async getAllKeys(): Promise<string[]> {
    return Array.from(this.store.keys());
  }
}
