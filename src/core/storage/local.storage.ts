/**
 * LocalStorage Provider
 */

import { IStorageProvider } from './storage-provider.interface';

export class LocalStorageProvider implements IStorageProvider {
  public async get<T>(key: string): Promise<T | null> {
    if (typeof window === 'undefined') return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  public async set<T>(key: string, value: T): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  public async remove(key: string): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  public async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }

  public async getAllKeys(): Promise<string[]> {
    if (typeof window === 'undefined') return [];
    return Object.keys(localStorage);
  }
}
