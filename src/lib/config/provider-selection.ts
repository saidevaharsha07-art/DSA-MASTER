/**
 * Dynamic Provider Selection Registry
 */

export interface ProviderSelectionConfig {
  authProvider: string;
  syncProvider: string;
  realtimeProvider: string;
  backupProvider: string;
  notificationProvider: string;
  analyticsProvider: string;
  databaseProvider: string;
}

export class ProviderSelectionManager {
  private selection: ProviderSelectionConfig = {
    authProvider: 'guest',
    syncProvider: 'local',
    realtimeProvider: 'local_realtime',
    backupProvider: 'local_backup',
    notificationProvider: 'in_app',
    analyticsProvider: 'local',
    databaseProvider: 'memory',
  };

  public getSelection(): Readonly<ProviderSelectionConfig> {
    return Object.freeze({ ...this.selection });
  }

  public setProvider(group: keyof ProviderSelectionConfig, providerId: string): void {
    this.selection[group] = providerId;
  }
}
