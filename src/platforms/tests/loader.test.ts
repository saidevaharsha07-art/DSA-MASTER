/**
 * Unit Test: Platform Loaders
 */

import { CodeChefLoader } from '../loaders/codechef.loader';
import { CodeforcesLoader } from '../loaders/codeforces.loader';
import { LeetCodeLoader } from '../loaders/leetcode.loader';

export function testLoaders(): void {
  console.log('--- Testing Platform Loaders ---');

  // Test CodeChef loader
  const ccLoader = new CodeChefLoader();
  const ccProbs = ccLoader.load();
  if (!ccProbs || ccProbs.length === 0) {
    throw new Error('CodeChefLoader failed to load problems!');
  }
  const ccVer = ccLoader.getVersion();
  if (!ccVer.datasetVersion) {
    throw new Error('CodeChefLoader getVersion failed!');
  }
  console.log(`[PASS] CodeChefLoader loaded ${ccProbs.length} problems (v${ccVer.datasetVersion}).`);

  // Test Codeforces loader
  const cfLoader = new CodeforcesLoader();
  const cfProbs = cfLoader.load();
  if (!cfProbs || cfProbs.length === 0) {
    throw new Error('CodeforcesLoader failed to load problems!');
  }
  const cfVer = cfLoader.getVersion();
  console.log(`[PASS] CodeforcesLoader loaded ${cfProbs.length} problems (v${cfVer.datasetVersion}).`);

  // Test LeetCode loader
  const lcLoader = new LeetCodeLoader();
  const lcProbs = lcLoader.load();
  if (!lcProbs || lcProbs.length === 0) {
    throw new Error('LeetCodeLoader failed to load problems!');
  }
  console.log(`[PASS] LeetCodeLoader loaded ${lcProbs.length} problems.`);
}
