/**
 * Production Readiness & Runtime Validation Test (Part 9)
 */

import { ConfigService } from '@/src/lib/config/config.service';

export async function testProductionReadiness(): Promise<void> {
  console.log('--- Testing Part 9 Production Readiness & Runtime Configuration ---');

  const config = new ConfigService();
  const snapshot = config.getSnapshot();

  // 1. Validate Environment & Versions
  if (!snapshot.environment || !snapshot.version.appVersion) {
    throw new Error('Runtime environment metadata missing!');
  }
  console.log(`[PASS] Runtime environment verified (Env: ${snapshot.environment}, Version: ${snapshot.version.appVersion}).`);

  // 2. Validate Dynamic Feature Flags
  if (!snapshot.featureFlags.AUTH_ENABLED || !snapshot.featureFlags.ORACLE_ENABLED) {
    throw new Error('Core feature flags are disabled!');
  }
  console.log('[PASS] Feature flags validation verified.');

  // 3. Provider Selection Matrix
  if (!snapshot.providerSelection.authProvider || !snapshot.providerSelection.syncProvider) {
    throw new Error('Provider selection configuration missing!');
  }
  console.log('[PASS] Provider selection matrix verified.');
}
