/**
 * System Health & Subsystem Integrity Test (Part 11)
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';

export async function testSystemHealth(): Promise<void> {
  console.log('--- Testing Part 11 Overall System Health & Subsystems ---');

  // 1. Container Health
  Container.registerSingleton('HealthCheckService', { status: 'healthy' });
  const health = Container.resolve<{ status: string }>('HealthCheckService');
  if (health.status !== 'healthy') {
    throw new Error('IoC Container health check failed!');
  }
  console.log('[PASS] IoC Container health verified.');

  // 2. EventBus Health
  let pingFired = false;
  const unsub = EventBus.subscribe('SyncCompleted', () => { pingFired = true; });
  EventBus.publish('SyncCompleted', { itemsSynced: 0 });
  unsub();

  if (!pingFired) {
    throw new Error('EventBus system health check failed!');
  }
  console.log('[PASS] Decoupled EventBus health verified.');
}
