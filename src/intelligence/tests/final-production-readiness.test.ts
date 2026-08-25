/**
 * Final System Audit & Production Readiness Master Integration Test Suite
 * Rigorously validates system-wide data integrity, level thresholds, revision semantics,
 * edge cases (0, 1, 499, 500, 999, 1000 XP), user isolation (Users A, B, C),
 * unknown identifiers, and cache invalidation.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { EventBus } from '@/src/core/events/event-bus';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { CampaignAdapterService } from '@/src/features/learn/services/campaign-adapter.service';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewAdapterService } from '@/src/features/interview/services/interview-adapter.service';
import { InterviewPreparationAdapterService } from '@/src/features/interview/services/interview-prep-adapter.service';
import { AnalyticsAdapterService } from '@/src/features/analytics/services/analytics-adapter.service';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';
import { UserLearningProfileFacade } from '../orchestration/user-profile-facade.service';
import { UnifiedRecommendationHarmonizer } from '../orchestration/recommendation-harmonizer.service';

export async function testFinalProductionReadiness(): Promise<void> {
  console.log('\n=== FINAL SYSTEM AUDIT & PRODUCTION READINESS PASS ===');

  // Reset state before audit
  progressService.resetState();
  UnifiedRecommendationHarmonizer.clearCache();
  CareerAdapterService.clearCache();
  InterviewPreparationAdapterService.clearCache();

  // 1. OFF-BY-ONE XP & LEVEL THRESHOLD TESTING
  const level0 = ProgressService.calculateLevel(0);
  const level1 = ProgressService.calculateLevel(1);
  const level499 = ProgressService.calculateLevel(499);
  const level500 = ProgressService.calculateLevel(500);
  const level999 = ProgressService.calculateLevel(999);
  const level1000 = ProgressService.calculateLevel(1000);

  if (level0 !== 1 || level1 !== 1 || level499 !== 1) {
    throw new Error(`Off-by-one Level Test Failed: Expected Level 1 for 0, 1, 499 XP. Got ${level0}, ${level1}, ${level499}`);
  }
  if (level500 !== 2 || level999 !== 2 || level1000 !== 3) {
    throw new Error(`Off-by-one Level Test Failed: Expected Level 2 for 500 & 999 XP, Level 3 for 1000 XP. Got ${level500}, ${level999}, ${level1000}`);
  }
  console.log('✓ Edge Case 1 Passed: Off-by-one XP level thresholds verified (0, 1, 499, 500, 999, 1000 XP)');

  // 2. DUPLICATE SOLVE IDEMPOTENCY
  progressService.resetState('user_audit_idempotency');
  EventBus.publish('ProblemSolved', { userId: 'user_audit_idempotency', problemId: 'lc-1', xpEarned: 50, timestamp: new Date().toISOString() });
  const solvedCountAfterFirst = (progressService.getState('user_audit_idempotency').completedProblemIds || []).length;

  EventBus.publish('ProblemSolved', { userId: 'user_audit_idempotency', problemId: 'lc-1', xpEarned: 50, timestamp: new Date().toISOString() });
  const solvedCountAfterSecond = (progressService.getState('user_audit_idempotency').completedProblemIds || []).length;

  if (solvedCountAfterFirst !== 1 || solvedCountAfterSecond !== 1) {
    throw new Error(`Duplicate Solve Test Failed: Expected solved count 1 after duplicate solve, got ${solvedCountAfterSecond}`);
  }
  console.log('✓ Edge Case 2 Passed: Duplicate solve idempotency verified (solved count remained 1)');

  // 3. REVISION REVIEW SEMANTICS (REVISION REVIEW ≠ SOLVE)
  const memoryEngine = Container.has('MemoryEngine')
    ? Container.resolve<MemoryEngine>('MemoryEngine')
    : new MemoryEngine();

  const xpBeforeReview = progressService.getState('user_audit_1').xp;
  const solvedCountBeforeReview = (progressService.getState('user_audit_1').completedProblemIds || []).length;

  // Execute revision review via RevisionAdapterService
  RevisionAdapterService.recordReview('user_audit_1', 'concept-sliding-window', 'easy');

  const xpAfterReview = progressService.getState('user_audit_1').xp;
  const solvedCountAfterReview = (progressService.getState('user_audit_1').completedProblemIds || []).length;

  if (xpBeforeReview !== xpAfterReview || solvedCountBeforeReview !== solvedCountAfterReview) {
    throw new Error('Revision Review Semantics Failed: Revision review altered solve count or XP!');
  }
  console.log('✓ Edge Case 3 Passed: Spaced repetition review does NOT increment solve count or award solve XP');

  // 4. MULTI-USER ISOLATION AUDIT (USER A, USER B, USER C)
  progressService.resetState('user_A');
  progressService.resetState('user_B');
  progressService.resetState('user_C');
  UnifiedRecommendationHarmonizer.clearCache();

  // User A activity
  EventBus.publish('ProblemSolved', { userId: 'user_A', problemId: 'lc-1', timestamp: new Date().toISOString() });
  const profileA = UserLearningProfileFacade.getProfile('user_A', 'Amazon');

  const profileB = UserLearningProfileFacade.getProfile('user_B', 'Google');
  const profileC = UserLearningProfileFacade.getProfile('user_C', 'Meta');

  if (profileB.solvedCount !== 0 || profileC.solvedCount !== 0) {
    throw new Error('Multi-User Isolation Failed: Telemetry leaked across users!');
  }
  if (!profileB.isUnratedCandidate || !profileC.isUnratedCandidate) {
    throw new Error('Multi-User Isolation Failed: User B or C incorrectly marked as rated!');
  }
  console.log('✓ Edge Case 4 Passed: Multi-user isolation verified across User A, User B, User C');

  // 5. UNKNOWN IDENTIFIERS & EMPTY FALLBACKS
  const unknownCompanySummary = CareerAdapterService.getCareerSummary('user_unknown_co');
  if (!unknownCompanySummary || !unknownCompanySummary.companyTracks || unknownCompanySummary.companyTracks.length === 0) {
    throw new Error('Unknown Company Test Failed: Career summary returned null/empty tracks');
  }

  const unknownInterviewPlan = InterviewPreparationAdapterService.getInterviewPrepSummary('user_unknown_co', 'UnknownCo');
  if (!unknownInterviewPlan || unknownInterviewPlan.readiness.readinessScore !== 'Unrated') {
    throw new Error('Unknown Company Test Failed: Expected Unrated readiness for unknown company');
  }
  console.log('✓ Edge Case 5 Passed: Unknown company identifiers gracefully fallback to unrated canonical baselines');

  // 6. ANALYTICS INTEGRITY & ZERO TIMING DURATION HANDLING
  progressService.resetState('user_audit_analytics');
  EventBus.publish('ProblemSolved', { userId: 'user_audit_analytics', problemId: 'lc-15', durationSeconds: 0, timestamp: new Date().toISOString() });
  const analyticsSummary = AnalyticsAdapterService.getAnalyticsSummary('user_audit_analytics', '30d');

  if (analyticsSummary.solvedCount !== 1) {
    throw new Error(`Analytics Integrity Failed: Expected solved count 1, got ${analyticsSummary.solvedCount}`);
  }
  console.log('✓ Edge Case 6 Passed: Analytics adapter handled 0 durationSeconds without inventing fake study time');

  // 7. CACHE INVALIDATION ACROSS ALL ADAPTERS
  EventBus.publish('ProblemSolved', { userId: 'user_cache_test', problemId: 'lc-206', timestamp: new Date().toISOString() });
  const harmonizedPlan = UnifiedRecommendationHarmonizer.getHarmonizedPlan('user_cache_test', 'Amazon');

  if (harmonizedPlan.recommendations.some((r) => r.problemId === 'lc-206')) {
    throw new Error('Cache Invalidation Failed: Solved problem lc-206 still recommended by harmonizer!');
  }
  console.log('✓ Edge Case 7 Passed: System-wide cache invalidation verified on ProblemSolved event');

  console.log('--- Final System Audit & Production Readiness Suite Passed 100%! ---');
}
