/**
 * Master Application Configuration Object
 */

import { APP_NAME, APP_VERSION, ENGINE_VERSIONS, DEFAULT_ORACLE_STRATEGY } from './constants';
import { Environment } from './environment';
import { FeatureFlags } from './feature-flags';

export class AppConfig {
  public static get appName(): string {
    return APP_NAME;
  }

  public static get version(): string {
    return APP_VERSION;
  }

  public static get engineVersions(): Record<string, string> {
    return ENGINE_VERSIONS;
  }

  public static get defaultStrategy(): string {
    return DEFAULT_ORACLE_STRATEGY;
  }

  public static get environment(): string {
    return Environment.current;
  }

  public static isFeatureEnabled(flagId: string): boolean {
    return FeatureFlags.isEnabled(flagId);
  }
}
