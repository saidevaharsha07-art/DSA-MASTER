/**
 * Environment Detector
 * Resolves active runtime environment profile (development, production, test).
 */

export type EnvironmentName = 'development' | 'production' | 'test';

export class Environment {
  public static get current(): EnvironmentName {
    if (process.env.NODE_ENV === 'test') return 'test';
    if (process.env.NODE_ENV === 'production') return 'production';
    return 'development';
  }

  public static get isDevelopment(): boolean {
    return this.current === 'development';
  }

  public static get isProduction(): boolean {
    return this.current === 'production';
  }

  public static get isTest(): boolean {
    return this.current === 'test';
  }
}
