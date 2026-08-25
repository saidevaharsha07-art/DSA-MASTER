/**
 * Unit Test: OracleDashboardSnapshot Structure & Validation
 */

import { DashboardEngine } from '../engine/dashboard.engine';
import { DevMockDataManager } from '@/src/app/(dev)/dev/services/mock-data.manager';
import { ContestEngine } from '../../contests/contest.engine';
import { RatingEngine } from '../../ratings/rating.engine';
import { MemoryEngine } from '../../memory/engine/memory.engine';
import { OracleContextService } from '../services/context.service';

export function testDashboardSnapshot(): void {
  console.log('--- Testing OracleDashboardSnapshot Structure & Validation ---');

  const profile = DevMockDataManager.getProfilePreset('Intermediate');
  const contestEngine = new ContestEngine();
  const ratingEngine = new RatingEngine();
  const memoryEngine = new MemoryEngine();

  const bundle = OracleContextService.buildContextBundle(profile, contestEngine, ratingEngine, memoryEngine);

  const snapshot = DashboardEngine.assembleSnapshot(
    bundle.profile,
    bundle.weakness,
    bundle.contestAnalysis,
    bundle.ratingPrediction,
    bundle.memoryHealth,
    'Balanced',
    []
  );

  if (!snapshot.userId || snapshot.overallLearningScore.overallScore <= 0 || !snapshot.todayPractice || !snapshot.weeklyPractice) {
    throw new Error('OracleDashboardSnapshot validation failed! Missing required snapshot properties.');
  }

  if (!snapshot.engineVersions.OracleEngine) {
    throw new Error('OracleDashboardSnapshot missing engineVersions tracking metadata!');
  }

  console.log(`[PASS] OracleDashboardSnapshot validated (Overall Score: ${snapshot.overallLearningScore.overallScore}/100, Engines: ${Object.keys(snapshot.engineVersions).length}).`);
}
