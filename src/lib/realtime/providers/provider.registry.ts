/**
 * Real-Time Provider Registry
 */

import { IRealtimeProvider } from './realtime-provider.interface';
import { LocalRealtimeProvider } from './local.provider';
import {
  WebSocketProvider,
  SSEProvider,
  FirebaseRealtimeProvider,
  SupabaseRealtimeProvider,
} from './mock-realtime.provider';

export class RealtimeProviderRegistry {
  private static providers: Map<string, IRealtimeProvider> = new Map();
  private static activeProviderId = 'local_realtime';

  public static register(provider: IRealtimeProvider): void {
    this.providers.set(provider.providerId, provider);
  }

  public static getActiveProvider(): IRealtimeProvider {
    return this.providers.get(this.activeProviderId) || new LocalRealtimeProvider();
  }

  public static registerDefaults(): void {
    if (this.providers.size > 0) return;
    this.register(new LocalRealtimeProvider());
    this.register(new WebSocketProvider());
    this.register(new SSEProvider());
    this.register(new FirebaseRealtimeProvider());
    this.register(new SupabaseRealtimeProvider());
  }
}
