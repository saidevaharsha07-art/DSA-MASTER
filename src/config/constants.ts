/**
 * System-Wide Configuration Constants
 * Centralized immutable values eliminating hardcoded strings and magic numbers.
 */

export const APP_NAME = 'DSA CRACKER';
export const APP_VERSION = '4.0.0';

export const ENGINE_VERSIONS = Object.freeze({
  PlatformEngine: '2.5.0',
  IntelligenceEngine: '3.1.0',
  AdaptiveEngine: '3.2.0',
  ContestEngine: '3.3.0',
  MemoryEngine: '3.5.0',
  OracleEngine: '3.6.0',
  CoreInfrastructure: '4.0.0',
});

export const CACHE_TTL_MS = Object.freeze({
  PLATFORM_PROBLEMS: 3600 * 1000, // 1 hour
  ORACLE_DASHBOARD: 60 * 1000,     // 1 minute
  MEMORY_HEALTH: 5 * 60 * 1000,   // 5 minutes
  CONTEST_READINESS: 15 * 60 * 1000, // 15 minutes
});

export const SCORE_WEIGHTS = Object.freeze({
  MEMORY_CONTRIBUTION: 0.25,
  MASTERY_CONTRIBUTION: 0.25,
  CONTEST_CONTRIBUTION: 0.15,
  RATING_CONTRIBUTION: 0.15,
  CONSISTENCY_CONTRIBUTION: 0.10,
  ADAPTIVE_CONTRIBUTION: 0.10,
});

export const DEFAULT_ORACLE_STRATEGY = 'Balanced';
