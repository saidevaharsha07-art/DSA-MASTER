export interface StorageAdapter {
  get<T>(key: string): T | null;
  save<T>(key: string, data: T): void;
  update<T>(key: string, updater: (prev: T | null) => T): void;
  remove(key: string): void;
  clear?(): void;
}
