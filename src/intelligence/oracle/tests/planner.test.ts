/**
 * Unit Test: Oracle Daily & Weekly Planners
 */

import { OracleEngine } from '../engine/oracle.engine';

export function testOraclePlanners(): void {
  console.log('--- Testing Oracle Daily & Weekly Planners ---');
  const engine = new OracleEngine();

  const daily = engine.generateDailyPlan([]);
  if (daily.totalMinutes <= 0 || !daily.morning || !daily.afternoon || !daily.evening) {
    throw new Error('Daily study plan generation failed!');
  }
  console.log(`[PASS] Daily study plan generated (${daily.totalMinutes} total mins across Morning/Afternoon/Evening).`);
}
