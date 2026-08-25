/**
 * Oracle AI Engine — Sub-suite Test Runner
 * Executes all Oracle AI tests deterministically.
 */

import { testOracleEngine } from './oracle.test';
import { testRankingEngine } from './ranking.test';
import { testSimulationEngine } from './simulation.test';
import { testOraclePlanners } from './planner.test';
import { testDashboardSnapshot } from './dashboard.test';

export function runOracleTests(): void {
  console.log('\n=== PHASE 3.6: ORACLE AI RECOMMENDATION ENGINE ===');
  testOracleEngine();
  testRankingEngine();
  testSimulationEngine();
  testOraclePlanners();
  testDashboardSnapshot();
}

runOracleTests();
