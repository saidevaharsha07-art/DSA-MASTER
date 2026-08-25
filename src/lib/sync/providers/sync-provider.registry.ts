/**
 * Sync Provider Registry
 */

import { ISyncProvider } from './sync-provider.interface';
import { SyncProviderType } from '../models/sync-provider.models';

export class SyncProviderRegistry {
  private static providers: Map<string, ISyncProvider> = new Map();
  private static activeId: string = 'local';

  public static register(provider: ISyncProvider): void {
    this.providers.set(provider.info.id, provider);
  }

  public static getActiveProvider(): ISyncProvider | undefined {
    return Array.from(this.providers.values()).find((p) => p.info.id === this.activeId) || this.providers.values().next().value;
  }

  public static setActiveProvider(id: string): void {
    if (this.providers.has(id)) {
      this.activeId = id;
    }
  }

  public static getAllProviders(): ReadonlyArray<ISyncProvider> {
    return Array.from(this.providers.values());
  }
}
