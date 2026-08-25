/**
 * Persistent Storage Abstraction — Interface Contract
 * Allows switching between Memory, LocalStorage, IndexedDB, and future cloud databases (Firebase, Supabase, Postgres) seamlessly.
 */

export interface IStorageProvider {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  getAllKeys(): Promise<string[]>;
}
