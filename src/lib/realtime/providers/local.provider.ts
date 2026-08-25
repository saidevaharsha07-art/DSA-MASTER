/**
 * Local Reactive Real-Time Provider
 */

import { IRealtimeProvider } from './realtime-provider.interface';
import { RealtimeEvent } from '../models/realtime-event.models';

export class LocalRealtimeProvider implements IRealtimeProvider {
  public readonly providerId = 'local_realtime';
  public readonly name = 'Local Event Streaming Bus Provider';
  private subscribers: Map<string, Set<(event: RealtimeEvent) => void>> = new Map();
  private isConnected = false;

  public async connect(): Promise<boolean> {
    this.isConnected = true;
    return true;
  }

  public async disconnect(): Promise<void> {
    this.isConnected = false;
  }

  public async publish(event: RealtimeEvent): Promise<boolean> {
    if (!this.isConnected) return false;
    const channelSubs = this.subscribers.get(event.channel);
    if (channelSubs) {
      channelSubs.forEach((cb) => cb(event));
    }
    return true;
  }

  public subscribe(channel: string, callback: (event: RealtimeEvent) => void): () => void {
    if (!this.subscribers.has(channel)) {
      this.subscribers.set(channel, new Set());
    }
    const set = this.subscribers.get(channel)!;
    set.add(callback);
    return () => set.delete(callback);
  }
}
