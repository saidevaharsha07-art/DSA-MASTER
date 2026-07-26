import { StorageAdapter } from './StorageAdapter';

export class LocalStorageAdapter implements StorageAdapter {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.warn(`Error reading localStorage key "${key}":`, e);
      return null;
    }
  }

  save<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Error saving localStorage key "${key}":`, e);
    }
  }

  update<T>(key: string, updater: (prev: T | null) => T): void {
    if (typeof window === 'undefined') return;
    const current = this.get<T>(key);
    const next = updater(current);
    this.save(key, next);
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing localStorage key "${key}":`, e);
    }
  }
}

// Global default storage instance
export const storage = new LocalStorageAdapter();
