/**
 * Master Test Suite (Phases 3.1 - 5.10)
 */

import { testProductionReadiness } from './production.test';
import { testSystemHealth } from './system-health.test';

export async function runMasterProductionSuite(): Promise<void> {
  console.log('\n=== PHASE 5.10 & 5.11: PRODUCTION INFRASTRUCTURE & MASTER HEALTH ===');
  await testProductionReadiness();
  await testSystemHealth();
  console.log('[OK] Master production infrastructure suite passed.');
}
