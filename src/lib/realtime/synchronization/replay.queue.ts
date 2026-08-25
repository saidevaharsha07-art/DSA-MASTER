/**
 * Event Replay Queue & Ordering Engine
 */

import { RealtimeEvent } from '../models/realtime-event.models';
import { EventBus } from '@/src/core/events/event-bus';

export class ReplayQueue {
  private queue: RealtimeEvent[] = [];
  private processedIds: Set<string> = new Set();

  public enqueue(event: RealtimeEvent): void {
    if (this.processedIds.has(event.eventId)) return; // Deduplication
    this.processedIds.add(event.eventId);
    this.queue.push(event);
    this.queue.sort((a, b) => a.sequenceNumber - b.sequenceNumber); // Ordering guarantee
  }

  public replay(onEvent: (event: RealtimeEvent) => void): number {
    EventBus.publish('ReplayStarted', { queueLength: this.queue.length });
    const count = this.queue.length;
    const items = [...this.queue];
    this.queue = [];

    items.forEach((evt) => onEvent(evt));

    EventBus.publish('ReplayCompleted', { replayedCount: count });
    return count;
  }

  public getQueueLength(): number {
    return this.queue.length;
  }
}
