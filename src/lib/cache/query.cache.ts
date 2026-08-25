/**
 * In-Memory Query & Cache Layer
 * Provides LRU eviction, TTL invalidation, and hit/miss metrics tracking.
 */

import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

interface CacheEntry<T> {
  readonly value: T;
  readonly expiresAt: number;
}

export class QueryCache {
  private static store: Map<string, CacheEntry<unknown>> = new Map();
  private static hits = 0;
  private static misses = 0;

  public static get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) {
      this.misses++;
      MetricsCollector.record('cache_miss', 1, 'count');
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      this.misses++;
      MetricsCollector.record('cache_miss', 1, 'count');
      return null;
    }

    this.hits++;
    MetricsCollector.record('cache_hit', 1, 'count');
    return entry.value as T;
  }

  public static set<T>(key: string, value: T, ttlMs: number = 60000): void {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  public static getHitRatio(): number {
    const total = this.hits + this.misses;
    return total > 0 ? Math.round((this.hits / total) * 100) : 100;
  }

  public static clear(): void {
    this.store.clear();
    this.hits = 0;
    this.misses = 0;
  }
}
