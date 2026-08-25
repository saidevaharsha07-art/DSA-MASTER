/**
 * Reactive Stream Router Engine
 */

import { RealtimeEvent } from '../models/realtime-event.models';
import { EventBus } from '@/src/core/events/event-bus';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class StreamRouter {
  public static routeEvent(event: RealtimeEvent, dispatch: (evt: RealtimeEvent) => void): void {
    const start = performance.now();
    dispatch(event);
    const durationMs = performance.now() - start;

    MetricsCollector.record('realtime_routing_latency_ms', durationMs, 'ms');
    EventBus.publish('StreamEventReceived', event);
  }
}
