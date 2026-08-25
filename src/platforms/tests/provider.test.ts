/**
 * Unit Test: Problem Provider Dispatcher
 */

import { ProblemProvider } from '../problem.provider';
import { PlatformId } from '../types';

export function testProvider(): void {
  console.log('--- Testing Problem Provider Dispatcher ---');
  const provider = new ProblemProvider();

  // Test available platforms lookup
  const platforms = provider.getAvailablePlatforms();
  if (platforms.length < 3) {
    throw new Error('ProblemProvider getAvailablePlatforms returned fewer platforms than expected!');
  }
  console.log(`[PASS] Available platforms count: ${platforms.length}`);

  // Test CodeChef provider dispatch
  const codechefProbs = provider.getPlatformProblems('codechef');
  if (!codechefProbs || codechefProbs.length === 0) {
    throw new Error('ProblemProvider getPlatformProblems("codechef") returned no problems!');
  }
  console.log(`[PASS] CodeChef provider dispatch returned ${codechefProbs.length} problems.`);

  // Test Codeforces provider dispatch
  const cfProbs = provider.getPlatformProblems('codeforces');
  if (!cfProbs || cfProbs.length === 0) {
    throw new Error('ProblemProvider getPlatformProblems("codeforces") returned no problems!');
  }
  console.log(`[PASS] Codeforces provider dispatch returned ${cfProbs.length} problems.`);

  // Test filtering options
  const easyProbs = provider.getPlatformProblems('codechef', { difficulty: 'Easy' });
  if (!easyProbs || easyProbs.length === 0) {
    throw new Error('ProblemProvider filtering by difficulty failed!');
  }
  console.log(`[PASS] Filtered CodeChef Easy problems count: ${easyProbs.length}`);

  // Test limit option
  const limitedProbs = provider.getPlatformProblems('codechef', { limit: 10 });
  if (limitedProbs.length !== 10) {
    throw new Error(`ProblemProvider limit option failed (expected 10, got ${limitedProbs.length})`);
  }
  console.log('[PASS] Query limit option verified.');

  // Test unknown platform handling
  const unknownProbs = provider.getPlatformProblems('cses' as PlatformId);
  if (!Array.isArray(unknownProbs) || unknownProbs.length !== 0) {
    throw new Error('ProblemProvider handling of unknown platform did not return empty array!');
  }
  console.log('[PASS] Graceful handling of unknown platform verified.');
}
