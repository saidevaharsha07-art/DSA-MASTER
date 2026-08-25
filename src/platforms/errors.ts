/**
 * Platform Engine — Custom Error Classes
 * Domain-specific error hierarchy for clean debugging and logging.
 */

import { PlatformId } from './types';

/**
 * Base error class for all Platform Engine operations.
 */
export class PlatformEngineError extends Error {
  public readonly code: string;

  constructor(message: string, code: string = 'PLATFORM_ENGINE_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Error thrown when a requested platform is not registered.
 */
export class PlatformNotFoundError extends PlatformEngineError {
  public readonly platformId: string;

  constructor(platformId: string) {
    super(`Platform '${platformId}' is not registered in PlatformRegistry.`, 'PLATFORM_NOT_FOUND');
    this.platformId = platformId;
  }
}

/**
 * Error thrown when registering a duplicate platform without explicit overwrite permission.
 */
export class DuplicatePlatformError extends PlatformEngineError {
  public readonly platformId: PlatformId;

  constructor(platformId: PlatformId) {
    super(
      `Platform '${platformId}' is already registered. Cannot re-register without overwrite flag.`,
      'DUPLICATE_PLATFORM'
    );
    this.platformId = platformId;
  }
}

/**
 * Error thrown when a platform dataset loader fails unrecoverably.
 */
export class LoaderError extends PlatformEngineError {
  public readonly platformId: PlatformId;
  public readonly causeError?: Error;

  constructor(platformId: PlatformId, message: string, causeError?: Error) {
    super(`[${platformId}] Loader error: ${message}`, 'LOADER_ERROR');
    this.platformId = platformId;
    this.causeError = causeError;
  }
}

/**
 * Error thrown when dataset validation fails strict verification checks.
 */
export class ValidationError extends PlatformEngineError {
  public readonly platformId: PlatformId;
  public readonly errorsCount: number;

  constructor(platformId: PlatformId, errorsCount: number, summary: string) {
    super(`[${platformId}] Validation failed with ${errorsCount} errors. ${summary}`, 'VALIDATION_ERROR');
    this.platformId = platformId;
    this.errorsCount = errorsCount;
  }
}
