/**
 * Observable Real-Time State Store
 */

import { ConnectionState } from '../models/connection.models';
import { ChannelState } from '../models/channel.models';
import { PresenceState } from '../models/presence.models';

export interface RealtimeStateSnapshot {
  readonly connection: ConnectionState;
  readonly channels: ReadonlyArray<ChannelState>;
  readonly presence: PresenceState;
  readonly eventThroughputCount: number;
}

export class RealtimeStateService {
  private state: RealtimeStateSnapshot = {
    connection: { status: 'disconnected', providerId: 'local_realtime', reconnectAttempts: 0 },
    channels: [],
    presence: { userId: 'guest', status: 'offline', lastActiveAt: new Date().toISOString() },
    eventThroughputCount: 0,
  };

  private listeners: Set<(state: RealtimeStateSnapshot) => void> = new Set();

  public getState(): RealtimeStateSnapshot {
    return this.state;
  }

  public setState(next: Partial<RealtimeStateSnapshot>): void {
    this.state = Object.freeze({ ...this.state, ...next });
    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: RealtimeStateSnapshot) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
