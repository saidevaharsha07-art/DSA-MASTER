/**
 * Dev Tools Suite — Performance Monitor Service
 * Collects execution timings, cache hits/misses, and object counts.
 */

import { ProblemProvider } from '@/src/platforms/problem.provider';

export interface PerformanceStats {
  readonly cacheHits: number;
  readonly cacheMisses: number;
  readonly cacheEntries: number;
  readonly cacheHitRatio: number;
  readonly lastExecutionTimeMs: number;
  readonly totalObjectsProcessed: number;
}

export class DevPerformanceMonitor {
  private static provider = new ProblemProvider();
  private static lastExecTimeMs = 0;
  private static processedCount = 0;

  public static recordExecutionTime(timeMs: number, objectsCount: number = 0): void {
    this.lastExecTimeMs = timeMs;
    this.processedCount += objectsCount;
  }

  public static getStats(): PerformanceStats {
    const cacheStats = this.provider.getCacheStats();
    const totalRequests = cacheStats.hits + cacheStats.misses;
    const ratio = totalRequests > 0 ? Number(((cacheStats.hits / totalRequests) * 100).toFixed(1)) : 0;

    return {
      cacheHits: cacheStats.hits,
      cacheMisses: cacheStats.misses,
      cacheEntries: cacheStats.entries,
      cacheHitRatio: ratio,
      lastExecutionTimeMs: this.lastExecTimeMs,
      totalObjectsProcessed: this.processedCount,
    };
  }
}
