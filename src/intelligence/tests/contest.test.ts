/**
 * Unit Test: Contest Intelligence Engine & Analyzers
 */

import { ContestEngine } from '../contests/contest.engine';
import { ContestRecord } from '../contests/contest.models';
import { ContestPerformanceCalculator } from '../contests/contest.performance';
import { ProfileService } from '../services/profile.service';

export async function testContestEngine(): Promise<void> {
  console.log('--- Testing Contest Intelligence Engine & Analyzers ---');
  const engine = new ContestEngine();
  const profileService = new ProfileService();

  // 1. Record completed contest
  const record1: ContestRecord = {
    id: 'contest-cc-101',
    platform: 'codechef',
    contestId: 'START100',
    name: 'Starters 100',
    date: '2026-07-28T14:30:00Z',
    durationMinutes: 120,
    lifecycleState: 'completed',
    rank: 450,
    totalParticipants: 5000,
    ratingBefore: 1400,
    ratingAfter: 1445,
    ratingChange: 45,
    solvedCount: 3,
    attemptedCount: 4,
    penaltiesMinutes: 10,
    performanceRating: 1550,
  };

  engine.recordContest('user-contest-1', record1);

  const history = engine.getHistory('user-contest-1');
  if (history.length !== 1 || history[0].ratingChange !== 45) {
    throw new Error('Contest record tracking failed!');
  }

  const snapshots = engine.getSnapshots('user-contest-1');
  if (snapshots.length !== 1 || snapshots[0].ratingAfter !== 1445) {
    throw new Error('Immutable ContestSnapshot creation failed!');
  }
  console.log('[PASS] Contest recording & immutable snapshot creation verified.');

  // 2. Contest Analysis test
  const analysis = engine.analyzeContests('user-contest-1');
  if (analysis.totalContests !== 1 || analysis.netRatingGain !== 45 || analysis.averagePercentile < 90) {
    throw new Error(`Contest analysis failed! Average percentile: ${analysis.averagePercentile}`);
  }
  console.log(`[PASS] Contest analysis calculated (Percentile: ${analysis.averagePercentile}%).`);

  // 3. Performance Trend test
  const trend = ContestPerformanceCalculator.calculateTrend(history);
  if (trend.ratingTrend !== 'improving') {
    throw new Error(`Expected rating trend 'improving', got '${trend.ratingTrend}'`);
  }
  console.log('[PASS] Contest performance trend calculation verified.');

  // 4. Contest Readiness test
  const profile = await profileService.getProfile('user-contest-1');
  const readiness = engine.evaluateReadiness(profile);
  if (!readiness.readinessLevel || readiness.confidenceScore <= 0) {
    throw new Error('Contest readiness evaluation invalid!');
  }
  console.log(`[PASS] Contest readiness calculated: ${readiness.readinessLevel} (Confidence: ${readiness.confidenceScore}%).`);

  // 5. Contest Recommendations test
  const recs = engine.generateRecommendations('user-contest-1', profile);
  if (!recs || recs.length === 0) {
    throw new Error('Contest recommendation generation failed!');
  }
  console.log(`[PASS] Generated ${recs.length} contest recommendation cards.`);
}
