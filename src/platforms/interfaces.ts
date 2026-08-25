/**
 * Platform Engine — Interfaces
 * Abstract contracts for platform loaders, provider dispatchers, and validators.
 */

import {
  PlatformId,
  PlatformProblem,
  PlatformQueryOptions,
  PlatformConfig,
  PlatformVersionInfo,
  PlatformValidationReport,
  DatasetHealthReport,
  CacheStats,
} from './types';

/**
 * Common loader interface implemented by every platform data source.
 * Decouples data fetching/loading completely from the Platform Engine.
 */
export interface IPlatformLoader {
  readonly platformId: PlatformId;

  /**
   * Loads and normalizes platform problems into unified PlatformProblem objects.
   */
  load(): ReadonlyArray<PlatformProblem>;

  /**
   * Optional async loader for API/database-backed data sources.
   */
  loadAsync?(): Promise<ReadonlyArray<PlatformProblem>>;

  /**
   * Validates the loaded dataset and produces a structured validation report.
   */
  validate(): Promise<PlatformValidationReport> | PlatformValidationReport;

  /**
   * Produces a dataset health report.
   */
  getHealthReport?(): DatasetHealthReport;

  /**
   * Optional refresh trigger for dynamic/API-backed data sources.
   */
  refresh(): Promise<void>;

  /**
   * Returns dataset and loader versioning metadata.
   */
  getVersion(): PlatformVersionInfo;
}

/**
 * Platform Provider Interface
 * Single unified provider contract for dispatching queries across platforms.
 */
export interface IProblemProvider {
  /**
   * Gets problems for a specific platform with optional filtering options.
   */
  getPlatformProblems(platform: PlatformId, options?: PlatformQueryOptions): ReadonlyArray<PlatformProblem>;

  /**
   * Returns all available platform configurations registered in the engine.
   */
  getAvailablePlatforms(): ReadonlyArray<PlatformConfig>;

  /**
   * Checks if a platform is registered and available.
   */
  hasPlatform(platform: PlatformId): boolean;

  /**
   * Gets all problems across all registered platforms with optional options.
   */
  getAllPlatformProblems(options?: PlatformQueryOptions): ReadonlyArray<PlatformProblem>;

  /**
   * Clears query caches across all platforms.
   */
  clearCache(): void;

  /**
   * Clears query cache for a specific platform.
   */
  clearPlatformCache(platformId: PlatformId): void;

  /**
   * Returns cache statistics (hits, misses, entries).
   */
  getCacheStats(): CacheStats;
}
