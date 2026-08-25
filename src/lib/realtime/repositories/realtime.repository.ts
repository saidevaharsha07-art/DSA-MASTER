/**
 * Real-Time Stream History Repository
 */

import { RealtimeEvent } from '../models/realtime-event.models';

export class RealtimeRepository {
  private history: RealtimeEvent[] = [];

  public async saveEvent(event: RealtimeEvent): Promise<void> {
    this.history.push(event);
  }

  public async getHistory(channel?: string): Promise<ReadonlyArray<RealtimeEvent>> {
    if (channel) {
      return Object.freeze(this.history.filter((e) => e.channel === channel));
    }
    return Object.freeze([...this.history]);
  }

  public async clear(): Promise<void> {
    this.history = [];
  }
}
