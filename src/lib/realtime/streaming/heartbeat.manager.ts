/**
 * Heartbeat Manager
 */

import { HeartbeatStatus } from '../models/presence.models';
import { EventBus } from '@/src/core/events/event-bus';

export class HeartbeatManager {
  private lastBeatAt: string = new Date().toISOString();
  private isAlive = true;

  public ping(): HeartbeatStatus {
    this.lastBeatAt = new Date().toISOString();
    this.isAlive = true;
    return {
      isAlive: true,
      lastHeartbeatAt: this.lastBeatAt,
      latencyMs: 1,
    };
  }

  public reportLoss(): void {
    this.isAlive = false;
    EventBus.publish('HeartbeatLost', { lastHeartbeatAt: this.lastBeatAt });
  }

  public reportRecovery(): void {
    this.isAlive = true;
    EventBus.publish('HeartbeatRecovered', { recoveredAt: new Date().toISOString() });
  }
}
