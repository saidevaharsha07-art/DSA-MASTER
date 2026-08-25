/**
 * Settings & Feature Flags Adapter
 * Bridges Settings page configuration panels with ConfigService & FeatureFlagsService.
 */

import { Container } from '@/src/core/container/container';
import { ConfigService } from '@/src/lib/config/config.service';
import { FeatureFlagMap } from '@/src/lib/config/feature-flags';

export class SettingsFeatureFlagsAdapter {
  private static get configService(): ConfigService {
    return Container.resolve<ConfigService>('ConfigService');
  }

  public static getFlags(): FeatureFlagMap {
    return this.configService.featureFlags.getAllFlags();
  }

  public static setFlag(flagName: keyof FeatureFlagMap, enabled: boolean): void {
    this.configService.featureFlags.setFlag(flagName, enabled);
  }
}
