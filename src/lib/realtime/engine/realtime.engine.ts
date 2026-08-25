/**
 * Master Real-Time Streaming Engine
 */

import { RealtimeEvent } from '../models/realtime-event.models';
import { RealtimeProviderRegistry } from '../providers/provider.registry';
import { StreamRouter } from '../streaming/stream.router';
import { ReplayQueue } from '../synchronization/replay.queue';
import { EventBus } from '@/src/core/events/event-bus';

export class RealtimeEngine {
  private replayQueue: ReplayQueue;

  constructor(replayQueue?: ReplayQueue) {
    this.replayQueue = replayQueue || new ReplayQueue();
  }

  public async publishEvent(event: RealtimeEvent): Promise<boolean> {
    this.replayQueue.enqueue(event);
    const provider = RealtimeProviderRegistry.getActiveProvider();

    StreamRouter.routeEvent(event, (evt) => {
      provider.publish(evt);
    });

    return true;
  }

  public replayEvents(onEvent: (evt: RealtimeEvent) => void): number {
    return this.replayQueue.replay(onEvent);
  }
}
