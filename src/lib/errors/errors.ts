/**
 * Typed Error Hierarchy & Custom Error Classes
 */

export class AppError extends Error {
  constructor(message: string, public readonly code: string = 'APP_ERROR') {
    super(message);
    this.name = 'AppError';
  }
}

export class PlatformError extends AppError {
  constructor(message: string, public readonly platformId: string) {
    super(message, 'PLATFORM_ERROR');
    this.name = 'PlatformError';
  }
}

export class EngineError extends AppError {
  constructor(message: string, public readonly engineName: string) {
    super(message, 'ENGINE_ERROR');
    this.name = 'EngineError';
  }
}

export class CacheError extends AppError {
  constructor(message: string) {
    super(message, 'CACHE_ERROR');
    this.name = 'CacheError';
  }
}

export class SyncError extends AppError {
  constructor(message: string) {
    super(message, 'SYNC_ERROR');
    this.name = 'SyncError';
  }
}
