/**
 * Connector Cache Service Wrapper
 */

import { QueryCache } from '@/src/lib/cache/query.cache';

export class ConnectorCacheService {
  public static getCached<T>(key: string): T | null {
    return QueryCache.get<T>(key);
  }

  public static setCached<T>(key: string, value: T, ttlMs: number = 300000): void {
    QueryCache.set(key, value, ttlMs);
  }
}
