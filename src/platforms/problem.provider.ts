/**
 * Problem Provider
 * Unified dispatcher service querying platform problems across registered platform loaders
 * with query result caching and defensive state protection.
 */

import { IProblemProvider } from './interfaces';
import { PlatformRegistry } from './registry';
import {
  PlatformId,
  PlatformProblem,
  PlatformConfig,
  PlatformQueryOptions,
  CacheStats,
} from './types';
import { PlatformNotFoundError } from './errors';
import { logger } from './logger';

export class ProblemProvider implements IProblemProvider {
  private registry: PlatformRegistry;
  private cache: Map<string, ReadonlyArray<PlatformProblem>> = new Map();
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  constructor(registry?: PlatformRegistry) {
    this.registry = registry || PlatformRegistry.getInstance();
  }

  /**
   * Gets problems for a given platform with optional query options.
   */
  public getPlatformProblems(
    platform: PlatformId,
    options?: PlatformQueryOptions
  ): ReadonlyArray<PlatformProblem> {
    if (!this.registry.hasPlatform(platform)) {
      logger.warn(`[ProblemProvider] Platform '${platform}' is not registered.`);
      return Object.freeze([]);
    }

    const cacheKey = this.generateCacheKey(platform, options);
    if (this.cache.has(cacheKey)) {
      this.cacheHits++;
      logger.debug(`[ProblemProvider] Cache HIT for key '${cacheKey}'`);
      return this.cache.get(cacheKey)!;
    }

    this.cacheMisses++;
    logger.debug(`[ProblemProvider] Cache MISS for key '${cacheKey}'`);

    const loader = this.registry.getLoader(platform);
    if (!loader) {
      logger.warn(`[ProblemProvider] No loader registered for platform '${platform}'.`);
      return Object.freeze([]);
    }

    try {
      const raw = loader.load();
      const problems: PlatformProblem[] = Array.isArray(raw) ? [...raw] : [];
      const filtered = this.applyOptions(problems, options);
      const frozenResult = Object.freeze(filtered.map((p) => Object.freeze({ ...p })));

      this.cache.set(cacheKey, frozenResult);
      return frozenResult;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      logger.error(`[ProblemProvider] Failed to load problems for '${platform}': ${msg}`);
      return Object.freeze([]);
    }
  }

  /**
   * Gets all available registered platform configurations.
   */
  public getAvailablePlatforms(): ReadonlyArray<Readonly<PlatformConfig>> {
    return this.registry.getAllPlatformConfigs();
  }

  /**
   * Checks if a platform is registered and supported.
   */
  public hasPlatform(platform: PlatformId): boolean {
    return this.registry.hasPlatform(platform);
  }

  /**
   * Gets problems across all active registered platforms.
   */
  public getAllPlatformProblems(options?: PlatformQueryOptions): ReadonlyArray<PlatformProblem> {
    const cacheKey = this.generateCacheKey('all', options);
    if (this.cache.has(cacheKey)) {
      this.cacheHits++;
      return this.cache.get(cacheKey)!;
    }

    this.cacheMisses++;
    const configs = this.getAvailablePlatforms();
    let allProblems: PlatformProblem[] = [];

    for (const cfg of configs) {
      if (cfg.status === 'active') {
        const probs = this.getPlatformProblems(cfg.id);
        allProblems = allProblems.concat([...probs]);
      }
    }

    const filtered = this.applyOptions(allProblems, options);
    const frozenResult = Object.freeze(filtered.map((p) => Object.freeze({ ...p })));
    this.cache.set(cacheKey, frozenResult);

    return frozenResult;
  }

  /**
   * Clears all query caches.
   */
  public clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    logger.info('[ProblemProvider] Cleared all query caches.');
  }

  /**
   * Clears query cache for a specific platform ID.
   */
  public clearPlatformCache(platformId: PlatformId): void {
    const prefix = `${platformId}:`;
    for (const key of Array.from(this.cache.keys())) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
    // Also clear 'all:' cache if any platform cache is cleared
    for (const key of Array.from(this.cache.keys())) {
      if (key.startsWith('all:')) {
        this.cache.delete(key);
      }
    }
    logger.info(`[ProblemProvider] Cleared cache for platform '${platformId}'.`);
  }

  /**
   * Returns cache metrics.
   */
  public getCacheStats(): CacheStats {
    return Object.freeze({
      hits: this.cacheHits,
      misses: this.cacheMisses,
      entries: this.cache.size,
      keys: Object.freeze(Array.from(this.cache.keys())),
    });
  }

  /**
   * Generates a deterministic cache key for a platform and query options.
   */
  private generateCacheKey(platform: string, options?: PlatformQueryOptions): string {
    if (!options) {
      return `${platform}:default`;
    }
    const diff = options.difficulty || 'all';
    const top = options.topic || 'all';
    const pat = options.pattern || 'all';
    const sol = options.solvedStatus || 'all';
    const lim = options.limit || 0;
    const off = options.offset || 0;
    const q = options.searchQuery || '';

    return `${platform}:d=${diff}:t=${top}:p=${pat}:s=${sol}:l=${lim}:o=${off}:q=${q}`;
  }

  /**
   * Applies query options (filtering, pagination, search) to a problem list.
   */
  private applyOptions(
    problems: PlatformProblem[],
    options?: PlatformQueryOptions
  ): PlatformProblem[] {
    if (!options) {
      return problems;
    }

    let filtered = [...problems];

    if (options.difficulty && options.difficulty !== 'all') {
      const d = options.difficulty.toLowerCase();
      filtered = filtered.filter((p) => p.difficulty.toLowerCase() === d);
    }

    if (options.topic && options.topic !== 'all') {
      const t = options.topic.toLowerCase();
      filtered = filtered.filter((p) => p.topic.toLowerCase().includes(t));
    }

    if (options.pattern && options.pattern !== 'all') {
      const pat = options.pattern.toLowerCase();
      filtered = filtered.filter((p) => p.pattern.toLowerCase().includes(pat));
    }

    if (options.solvedStatus) {
      if (options.solvedStatus === 'solved') {
        filtered = filtered.filter((p) => p.solved);
      } else if (options.solvedStatus === 'unsolved') {
        filtered = filtered.filter((p) => !p.solved);
      }
    }

    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const q = options.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.pattern.toLowerCase().includes(q)
      );
    }

    const offset = options.offset || 0;
    if (offset > 0) {
      filtered = filtered.slice(offset);
    }

    if (options.limit && options.limit > 0) {
      filtered = filtered.slice(0, options.limit);
    }

    return filtered;
  }
}
