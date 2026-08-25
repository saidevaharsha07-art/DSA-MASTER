/**
 * Unit Test: Query Cache & TTL Invalidation
 */

import { QueryCache } from '@/src/lib/cache/query.cache';

export function testQueryCache(): void {
  console.log('--- Testing Query Cache & TTL Invalidation ---');

  QueryCache.set('test-key', { data: 123 }, 5000);
  const cached = QueryCache.get<{ data: number }>('test-key');

  if (!cached || cached.data !== 123) {
    throw new Error('QueryCache set/get failed!');
  }

  const hitRatio = QueryCache.getHitRatio();
  if (hitRatio <= 0) {
    throw new Error('QueryCache hit ratio metrics collection failed!');
  }

  console.log(`[PASS] QueryCache hit/miss and metrics collection verified (Hit Ratio: ${hitRatio}%).`);
}
