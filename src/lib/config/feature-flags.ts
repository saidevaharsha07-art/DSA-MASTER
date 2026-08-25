/**
 * Dynamic Feature Flags Engine
 */

export interface FeatureFlagMap {
  AUTH_ENABLED: boolean;
  SYNC_ENABLED: boolean;
  REALTIME_ENABLED: boolean;
  ANALYTICS_ENABLED: boolean;
  NOTIFICATIONS_ENABLED: boolean;
  LEADERBOARDS_ENABLED: boolean;
  BACKUPS_ENABLED: boolean;
  ACHIEVEMENTS_ENABLED: boolean;
  CONNECTORS_ENABLED: boolean;
  MEMORY_ENGINE_ENABLED: boolean;
  ORACLE_ENABLED: boolean;
  REVISION_ENGINE_ENABLED: boolean;
}

export class FeatureFlagsService {
  private flags: FeatureFlagMap = {
    AUTH_ENABLED: true,
    SYNC_ENABLED: true,
    REALTIME_ENABLED: true,
    ANALYTICS_ENABLED: true,
    NOTIFICATIONS_ENABLED: true,
    LEADERBOARDS_ENABLED: true,
    BACKUPS_ENABLED: true,
    ACHIEVEMENTS_ENABLED: true,
    CONNECTORS_ENABLED: true,
    MEMORY_ENGINE_ENABLED: true,
    ORACLE_ENABLED: true,
    REVISION_ENGINE_ENABLED: true,
  };

  public isEnabled(flagName: keyof FeatureFlagMap): boolean {
    return this.flags[flagName];
  }

  public setFlag(flagName: keyof FeatureFlagMap, enabled: boolean): void {
    this.flags[flagName] = enabled;
  }

  public getAllFlags(): Readonly<FeatureFlagMap> {
    return Object.freeze({ ...this.flags });
  }
}
