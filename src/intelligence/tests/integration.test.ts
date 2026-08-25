/**
 * Integration Test: Production Integration Suite (Phase 3.7)
 * Verifies live backend engine binding across Dashboard, Journey, Practice, Revision, Contest, and Oracle AI.
 */

import { OracleService, OracleContextService, ProfileService, ContestEngine, RatingEngine, MemoryEngine } from '@/src/intelligence';

export function testProductionIntegration(): void {
  console.log('--- Testing Phase 3.7 Production Integration Suite ---');

  const profile = ProfileService.createEmptyProfile('integration-user');
  const contestEngine = new ContestEngine();
  const ratingEngine = new RatingEngine();
  const memoryEngine = new MemoryEngine();
  const oracleService = new OracleService();

  // 1. Build live OracleContextBundle
  const bundle = OracleContextService.buildContextBundle(profile, contestEngine, ratingEngine, memoryEngine);
  if (!bundle.profile || !bundle.weakness || !bundle.strength || !bundle.memoryHealth) {
    throw new Error('OracleContextBundle integration failed!');
  }
  console.log('[PASS] OracleContextBundle built cleanly from live backend engines.');

  // 2. Build live OracleDashboardSnapshot
  const snapshot = oracleService.getDashboardSnapshot(bundle);
  if (snapshot.overallLearningScore.overallScore <= 0 || !snapshot.todayPractice || !snapshot.weeklyPractice) {
    throw new Error('OracleDashboardSnapshot integration rendering failed!');
  }
  console.log(`[PASS] Live OracleDashboardSnapshot verified (Score: ${snapshot.overallLearningScore.overallScore}/100, Memory Health: ${snapshot.memoryHealth}).`);

  // 3. Verify Engine Contributions
  const { recommendations } = oracleService.getRecommendations(bundle);
  if (recommendations.length === 0 || !recommendations[0].engineContributionMap) {
    throw new Error('Engine contribution mapping integration failed!');
  }
  console.log(`[PASS] Live recommendations verified (${recommendations.length} items with engineContributionMap).`);
}
