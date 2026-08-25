/**
 * Unit Test: Oracle AI Recommendation Engine & Decision Traces
 */

import { OracleService } from '../services/oracle.service';
import { OracleContextService } from '../services/context.service';
import { DevMockDataManager } from '@/src/app/(dev)/dev/services/mock-data.manager';
import { ContestEngine } from '../../contests/contest.engine';
import { RatingEngine } from '../../ratings/rating.engine';
import { MemoryEngine } from '../../memory/engine/memory.engine';

export function testOracleEngine(): void {
  console.log('--- Testing Oracle AI Recommendation Engine & Decision Traces ---');

  const profile = DevMockDataManager.getProfilePreset('Intermediate');
  const contestEngine = new ContestEngine();
  const ratingEngine = new RatingEngine();
  const memoryEngine = new MemoryEngine();

  // Populate memory for test user
  memoryEngine.processReview(profile.userId, 'concept-arrays', 'success');

  const service = new OracleService();
  const bundle = OracleContextService.buildContextBundle(profile, contestEngine, ratingEngine, memoryEngine);

  // 1. Unified Recommendations test
  const { recommendations } = service.getRecommendations(bundle);
  if (recommendations.length === 0) {
    throw new Error('Oracle Engine failed to generate unified recommendations!');
  }
  const topRec = recommendations[0];
  if (!topRec.decisionTraces || topRec.decisionTraces.length === 0) {
    throw new Error('UnifiedOracleRecommendation missing explicit DecisionTrace!');
  }
  if (!topRec.engineContributionMap || topRec.engineContributionMap.MemoryEngine === undefined) {
    throw new Error('UnifiedOracleRecommendation missing engineContributionMap percentage breakdown!');
  }
  console.log(`[PASS] Generated ${recommendations.length} ranked recommendations with Decision Traces & Engine Contribution Maps (Top: '${topRec.title}').`);

  // 2. Dashboard Snapshot test
  const snapshot = service.getDashboardSnapshot(bundle);
  if (snapshot.overallLearningScore.overallScore <= 0 || snapshot.overallLearningScore.memoryContribution === undefined) {
    throw new Error('OracleDashboardSnapshot missing UnifiedLearningScore breakdown!');
  }
  console.log(`[PASS] OracleDashboardSnapshot generated (Overall Score: ${snapshot.overallLearningScore.overallScore}/100, Memory Contribution: ${snapshot.overallLearningScore.memoryContribution}).`);
}
