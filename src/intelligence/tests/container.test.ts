/**
 * Unit Test: Dependency Injection Container & Service Registry
 */

import { Container } from '@/src/core/container/container';
import { initializeServiceRegistry } from '@/src/core/container/service-registry';

export function testContainer(): void {
  console.log('--- Testing IoC Dependency Container & Service Registry ---');

  initializeServiceRegistry();

  if (!Container.has('OracleService') || !Container.has('MemoryEngine')) {
    throw new Error('IoC Container service registry initialization failed!');
  }

  const oracle = Container.resolve('OracleService');
  if (!oracle) {
    throw new Error('Failed to resolve OracleService from IoC Container!');
  }

  console.log('[PASS] IoC Container registration and service resolution verified.');
}
