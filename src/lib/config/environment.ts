/**
 * Environment Manager
 * Safe access wrapper for environment detection and variable retrieval.
 */

export type AppEnvironment = 'development' | 'production' | 'test' | 'ci';

export class EnvironmentManager {
  public static getEnvironment(): AppEnvironment {
    const env = process.env.NODE_ENV;
    if (env === 'production') return 'production';
    if (env === 'test') return 'test';
    if (process.env.CI === 'true') return 'ci';
    return 'development';
  }

  public static getVar(key: string, defaultValue: string = ''): string {
    return process.env[key] || defaultValue;
  }

  public static isProduction(): boolean {
    return this.getEnvironment() === 'production';
  }

  public static isDevelopment(): boolean {
    return this.getEnvironment() === 'development';
  }
}
