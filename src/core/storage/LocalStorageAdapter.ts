import { StorageAdapter } from './StorageAdapter';

export class LocalStorageAdapter implements StorageAdapter {
  private static memoryStore = new Map<string, string>();

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') {
      const mem = LocalStorageAdapter.memoryStore.get(key);
      return mem ? JSON.parse(mem) : null;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return null;
    }
  }

  save<T>(key: string, data: T): void {
    if (typeof window === 'undefined') {
      LocalStorageAdapter.memoryStore.set(key, JSON.stringify(data));
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Error saving localStorage key "${key}":`, e);
    }
  }

  update<T>(key: string, updater: (prev: T | null) => T): void {
    const current = this.get<T>(key);
    const next = updater(current);
    this.save(key, next);
  }

  remove(key: string): void {
    if (typeof window === 'undefined') {
      LocalStorageAdapter.memoryStore.delete(key);
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing localStorage key "${key}":`, e);
    }
  }

  clear(): void {
    if (typeof window === 'undefined') {
      LocalStorageAdapter.memoryStore.clear();
      return;
    }
    try {
      window.localStorage.clear();
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
  }
}

// Global default storage instance
export const storage = new LocalStorageAdapter();
