/**
 * Unit Test: Real-Time Update Layer & Reactive Event Streaming (Milestone 5.9)
 */

import { RealtimeService } from '@/src/lib/realtime/services/realtime.service';
import { RealtimeApi } from '@/src/lib/realtime/api/realtime.api';
import { RealtimeEvent } from '@/src/lib/realtime/models/realtime-event.models';
import { EventBus } from '@/src/core/events/event-bus';

export async function testRealtimeSystem(): Promise<void> {
  console.log('--- Testing Milestone 5.9 Real-Time Update Layer & Reactive Event Streaming ---');

  const service = new RealtimeService();

  // 1. Connection Lifecycle
  const connected = await RealtimeApi.connect();
  if (!connected || RealtimeApi.getConnectionState().status !== 'connected') {
    throw new Error('Real-Time connection failed!');
  }
  console.log('[PASS] Real-time connection lifecycle verified.');

  // 2. Channel Subscription & Event Publishing
  let receivedEvent: RealtimeEvent | null = null;
  const unsub = RealtimeApi.subscribe('practice', (evt) => {
    receivedEvent = evt;
  });

  await RealtimeApi.publish('practice', 'ProblemSolved', { problemId: 'P-999', xp: 100 });
  if (!receivedEvent || (receivedEvent as RealtimeEvent).type !== 'ProblemSolved') {
    throw new Error('Real-time pub/sub event broadcast failed!');
  }
  console.log(`[PASS] Channel pub/sub broadcast verified (${(receivedEvent as RealtimeEvent).type} on 'practice').`);
  unsub();

  // 3. EventBus Event Bridging
  let notifStreamEvent: RealtimeEvent | null = null;
  const unsubNotif = RealtimeApi.subscribe('notifications', (evt) => {
    notifStreamEvent = evt;
  });

  EventBus.publish('NotificationCreated', { title: 'Broadcast Test' });
  await new Promise((r) => setTimeout(r, 50));
  unsubNotif();

  if (!notifStreamEvent || (notifStreamEvent as RealtimeEvent).type !== 'NotificationCreated') {
    throw new Error('EventBus to Real-Time stream bridging failed!');
  }
  console.log('[PASS] EventBus system event to stream channel bridging verified.');

  // 4. Benchmark: 10,000 Streamed Events Latency Test
  console.log('Simulating 10,000 streamed events routing benchmark...');
  const start = performance.now();
  for (let i = 0; i < 10000; i++) {
    await service.publish('analytics', 'TelemetryPing', { seq: i });
  }
  const totalMs = performance.now() - start;
  const avgLatencyMs = totalMs / 10000;

  console.log(`[PASS] 10,000 events streamed in ${totalMs.toFixed(2)}ms (Avg Latency: ${avgLatencyMs.toFixed(4)}ms per event).`);

  if (avgLatencyMs > 5.0) {
    throw new Error(`Latency target violated: ${avgLatencyMs.toFixed(4)}ms > 5ms`);
  }

  // 5. Replay Queue
  const replayedCount = RealtimeApi.replay();
  if (replayedCount === 0) {
    throw new Error('Replay queue execution failed!');
  }
  console.log(`[PASS] Replay queue execution verified (${replayedCount} events replayed).`);
}
