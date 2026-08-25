/**
 * Unified Runtime Config Service
 */

import { EnvironmentManager, AppEnvironment } from './environment';
import { FeatureFlagsService } from './feature-flags';
import { ProviderSelectionManager, ProviderSelectionConfig } from './provider-selection';
import { CURRENT_VERSION_INFO, VersionInfo } from './version';
import { ConfigValidator, ConfigValidationResult } from './validation';

export interface RuntimeConfigSnapshot {
  readonly environment: AppEnvironment;
  readonly version: VersionInfo;
  readonly featureFlags: ReturnType<FeatureFlagsService['getAllFlags']>;
  readonly providerSelection: ProviderSelectionConfig;
  readonly validation: ConfigValidationResult;
}

export class ConfigService {
  public readonly featureFlags: FeatureFlagsService;
  public readonly providerSelection: ProviderSelectionManager;

  constructor() {
    this.featureFlags = new FeatureFlagsService();
    this.providerSelection = new ProviderSelectionManager();
  }

  public getSnapshot(): RuntimeConfigSnapshot {
    return {
      environment: EnvironmentManager.getEnvironment(),
      version: CURRENT_VERSION_INFO,
      featureFlags: this.featureFlags.getAllFlags(),
      providerSelection: this.providerSelection.getSelection(),
      validation: ConfigValidator.validate(),
    };
  }
}
