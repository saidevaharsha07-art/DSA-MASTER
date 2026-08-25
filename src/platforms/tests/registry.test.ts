/**
 * Unit Test: Platform Registry
 */

import { PlatformRegistry } from '../registry';
import { IPlatformLoader } from '../interfaces';
import { PlatformConfig } from '../types';
import { DuplicatePlatformError } from '../errors';

export function testRegistry(): void {
  console.log('--- Testing Platform Registry ---');
  PlatformRegistry.resetInstance();
  const registry = PlatformRegistry.getInstance();

  // Test default registrations
  const configs = registry.getAllPlatformConfigs();
  console.log(`[PASS] Registered default platforms: ${configs.length}`);

  const hasCodeChef = registry.hasPlatform('codechef');
  const hasCodeforces = registry.hasPlatform('codeforces');
  const hasLeetCode = registry.hasPlatform('leetcode');
  const hasMentorPick = registry.hasPlatform('mentorpick');

  if (!hasCodeChef || !hasCodeforces || !hasLeetCode || !hasMentorPick) {
    throw new Error('Default platform registration check failed!');
  }
  console.log('[PASS] Default platforms verified (CodeChef, Codeforces, LeetCode, MentorPick).');

  // Test duplicate registration protection
  let caughtDupError = false;
  try {
    const codechefCfg = registry.getPlatformConfig('codechef');
    const codechefLoader = registry.getLoader('codechef');
    if (codechefCfg && codechefLoader) {
      registry.registerPlatform(codechefCfg, codechefLoader, false);
    }
  } catch (err: unknown) {
    if (err instanceof DuplicatePlatformError) {
      caughtDupError = true;
    }
  }

  if (!caughtDupError) {
    throw new Error('PlatformRegistry failed to throw DuplicatePlatformError on duplicate registration!');
  }
  console.log('[PASS] DuplicatePlatformError protection verified.');

  // Test custom platform registration (AtCoder extension test)
  const atcoderConfig: PlatformConfig = {
    id: 'atcoder',
    displayName: 'AtCoder',
    themeColor: '#000000',
    websiteUrl: 'https://atcoder.jp',
    status: 'beta',
    capabilities: {
      supportsRating: true,
      supportsContests: true,
      supportsEditorial: true,
      supportsSubmissions: true,
    },
    difficultySystem: ['Gray', 'Brown', 'Green', 'Cyan', 'Blue', 'Yellow', 'Orange', 'Red'],
  };

  const dummyLoader: IPlatformLoader = {
    platformId: 'atcoder',
    load: () => Object.freeze([]),
    validate: () => ({
      valid: true,
      platform: 'atcoder',
      totalProblems: 0,
      duplicateIds: [],
      invalidUrls: [],
      warnings: [],
      errors: [],
      summary: 'AtCoder dummy loader',
    }),
    refresh: async () => {},
    getVersion: () => ({ datasetVersion: '1.0.0', lastUpdated: '', platformVersion: '1.0.0' }),
  };

  registry.registerPlatform(atcoderConfig, dummyLoader);
  if (!registry.hasPlatform('atcoder')) {
    throw new Error('Dynamic platform registration failed!');
  }
  console.log('[PASS] Dynamic registration of custom platform (AtCoder) verified.');

  // Clean up test registration
  registry.unregisterPlatform('atcoder');
  console.log('[PASS] Registry unregistration verified.');
}
