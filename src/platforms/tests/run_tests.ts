/**
 * Platform Engine — Unit & Performance Test Suite Runner
 */

import { testRegistry } from './registry.test';
import { testProvider } from './provider.test';
import { testLoaders } from './loader.test';
import { testValidator } from './validator.test';
import { testPerformanceAndCaching } from './performance.test';

export function runAllTests(): void {
  console.log('==================================================');
  console.log('RUNNING PLATFORM ENGINE UNIT & STABILIZATION SUITE');
  console.log('==================================================');

  try {
    testRegistry();
    testLoaders();
    testValidator();
    testProvider();
    testPerformanceAndCaching();

    console.log('\n==================================================');
    console.log('[OK] ALL PLATFORM ENGINE STABILIZATION TESTS PASSED');
    console.log('==================================================');
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('\n==================================================');
    console.error(`[FAIL] TEST SUITE FAILED: ${msg}`);
    console.error('==================================================');
    process.exit(1);
  }
}

runAllTests();
