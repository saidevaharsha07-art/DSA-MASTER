/**
 * Public Real-Time Update API Facade
 */

import { Container } from '@/src/core/container/container';
import { RealtimeService } from '../services/realtime.service';
import { RealtimeEvent } from '../models/realtime-event.models';
import { ConnectionState } from '../models/connection.models';
import { ChannelState } from '../models/channel.models';

export class RealtimeApi {
  private static get service(): RealtimeService {
    if (!Container.has('RealtimeService')) {
      Container.registerSingleton('RealtimeService', new RealtimeService());
    }
    return Container.resolve<RealtimeService>('RealtimeService');
  }

  public static async connect(): Promise<boolean> {
    return this.service.connect();
  }

  public static async disconnect(): Promise<void> {
    return this.service.disconnect();
  }

  public static subscribe(channel: string, callback: (event: RealtimeEvent) => void): () => void {
    return this.service.subscribe(channel, callback);
  }

  public static async publish(channel: string, type: string, payload: unknown): Promise<boolean> {
    return this.service.publish(channel, type, payload);
  }

  public static replay(): number {
    return this.service.replay();
  }

  public static getConnectionState(): ConnectionState {
    return this.service.getConnectionState();
  }

  public static getSubscriptions(): ReadonlyArray<ChannelState> {
    return this.service.getSubscriptions();
  }
}
