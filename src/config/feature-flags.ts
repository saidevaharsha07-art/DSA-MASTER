/**
 * Tiered Feature Flag Framework
 * Supports development, experimental, beta, and production feature flag tiers.
 */

import { Environment } from './environment';

export type FeatureFlagTier = 'development' | 'experimental' | 'beta' | 'production';

export interface FeatureFlagDefinition {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly tier: FeatureFlagTier;
  readonly enabledByDefault: boolean;
}

export class FeatureFlags {
  private static flags: Map<string, FeatureFlagDefinition> = new Map([
    ['ENABLE_OFFLINE_SYNC', { id: 'ENABLE_OFFLINE_SYNC', name: 'Offline Sync Engine', description: 'Enables background offline action queueing and sync replay', tier: 'production', enabledByDefault: true }],
    ['ENABLE_TELEMETRY', { id: 'ENABLE_TELEMETRY', name: 'System Telemetry', description: 'Collects high-resolution engine execution timings', tier: 'production', enabledByDefault: true }],
    ['ENABLE_BACKGROUND_WORKERS', { id: 'ENABLE_BACKGROUND_WORKERS', name: 'Background Scheduler', description: 'Runs background review recalculation and cache flushing', tier: 'production', enabledByDefault: true }],
    ['ENABLE_PLUGINS', { id: 'ENABLE_PLUGINS', name: 'Plugin Architecture', description: 'Enables dynamic platform and strategy plugin registration', tier: 'production', enabledByDefault: true }],
    ['EXPERIMENTAL_SIMULATION_V2', { id: 'EXPERIMENTAL_SIMULATION_V2', name: 'Simulation V2', description: 'Experimental What-If scenario projection features', tier: 'experimental', enabledByDefault: false }],
  ]);

  private static overrides: Map<string, boolean> = new Map();

  public static isEnabled(flagId: string): boolean {
    const flag = this.flags.get(flagId);
    if (!flag) return false;

    if (this.overrides.has(flagId)) {
      return this.overrides.get(flagId)!;
    }

    if (flag.tier === 'production') return true;
    if (flag.tier === 'beta' && (Environment.isDevelopment || Environment.isProduction)) return true;
    if (flag.tier === 'experimental' && Environment.isDevelopment) return flag.enabledByDefault;
    if (flag.tier === 'development' && Environment.isDevelopment) return true;

    return flag.enabledByDefault;
  }

  public static setOverride(flagId: string, enabled: boolean): void {
    this.overrides.set(flagId, enabled);
  }

  public static getAllFlags(): ReadonlyArray<FeatureFlagDefinition> {
    return Array.from(this.flags.values());
  }
}
