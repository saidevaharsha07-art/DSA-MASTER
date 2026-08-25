/**
 * Unit & Performance Test: Provider Query Caching & Defensive Copy Integrity
 */

import { ProblemProvider } from '../problem.provider';
import { PlatformRegistry } from '../registry';

export function testPerformanceAndCaching(): void {
  console.log('--- Testing Performance & Query Caching ---');
  PlatformRegistry.resetInstance();
  const provider = new ProblemProvider();

  // Initial query (Cache MISS)
  provider.clearCache();
  const initialStats = provider.getCacheStats();
  if (initialStats.hits !== 0 || initialStats.misses !== 0 || initialStats.entries !== 0) {
    throw new Error('Initial cache stats should be zero after clearCache()!');
  }
  console.log('[PASS] Initial cache stats zeroed.');

  // First call -> Cache MISS
  const res1 = provider.getPlatformProblems('codechef', { difficulty: 'Easy' });
  const statsAfterFirst = provider.getCacheStats();
  if (statsAfterFirst.misses !== 1 || statsAfterFirst.hits !== 0) {
    throw new Error(`Expected 1 miss and 0 hits, got misses=${statsAfterFirst.misses}, hits=${statsAfterFirst.hits}`);
  }
  console.log('[PASS] First query recorded Cache MISS.');

  // Second call with same parameters -> Cache HIT
  const res2 = provider.getPlatformProblems('codechef', { difficulty: 'Easy' });
  const statsAfterSecond = provider.getCacheStats();
  if (statsAfterSecond.hits !== 1 || statsAfterSecond.misses !== 1) {
    throw new Error(`Expected 1 hit and 1 miss, got hits=${statsAfterSecond.hits}, misses=${statsAfterSecond.misses}`);
  }
  if (res1.length !== res2.length) {
    throw new Error('Cached query returned different result count!');
  }
  console.log('[PASS] Second identical query recorded Cache HIT.');

  // Verify Immutability / Defensive Copy
  try {
    (res1 as any)[0] = { ...res1[0], title: 'Hacked Title' };
  } catch (err: unknown) {
    // Expected error when trying to mutate frozen array
  }

  const res3 = provider.getPlatformProblems('codechef', { difficulty: 'Easy' });
  if (res3[0].title === 'Hacked Title') {
    throw new Error('Defensive copy failed! Mutation leaked into cached problem state!');
  }
  console.log('[PASS] Immutable result array prevents state mutation leakage.');

  // Test clearPlatformCache
  provider.clearPlatformCache('codechef');
  const statsAfterClear = provider.getCacheStats();
  const codechefKeys = statsAfterClear.keys.filter((k) => k.startsWith('codechef:'));
  if (codechefKeys.length > 0) {
    throw new Error('clearPlatformCache("codechef") failed to remove CodeChef keys!');
  }
  console.log('[PASS] clearPlatformCache("codechef") verified.');
}
