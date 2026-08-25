/**
 * Unit Test: Application Event Bus
 */

import { EventBus } from '@/src/core/events/event-bus';

export function testEventBus(): void {
  console.log('--- Testing Decoupled Application Event Bus ---');

  let eventHandled = false;
  const unsub = EventBus.subscribe('ProblemSolved', (evt) => {
    if (evt.payload === 'P100') {
      eventHandled = true;
    }
  });

  EventBus.publish('ProblemSolved', 'P100');
  unsub();

  if (!eventHandled) {
    throw new Error('EventBus failed to receive published event!');
  }

  console.log('[PASS] EventBus publish & subscribe lifecycle verified.');
}
