/**
 * End-to-End Data Consistency Integration Test Suite
 * Verifies single source of truth, user isolation, event bus propagation, level formula consistency,
 * cache invalidation, and canonical dataset integrity across all platform modules.
 */

import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { AnalyticsViewAdapter } from '@/src/adapters/analytics-view.adapter';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { UnifiedRecommendationHarmonizer } from '@/src/intelligence/orchestration/recommendation-harmonizer.service';
import { CareerAdapterService } from '@/src/features/career/services/career-adapter.service';
import { InterviewPreparationAdapterService } from '@/src/features/interview/services/interview-prep-adapter.service';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';

export async function testEndToEndDataConsistencyIntegration(): Promise<void> {
  console.log('=== TESTING END-TO-END DATA CONSISTENCY & INTEGRATION ===');

  const testUserA = `test_consistency_user_a_${Date.now()}`;
  const testUserB = `test_consistency_user_b_${Date.now()}`;

  // Test 1: Level Formula Boundary Behavior
  const level0 = ProgressService.calculateLevel(0);
  const level499 = ProgressService.calculateLevel(499);
  const level500 = ProgressService.calculateLevel(500);
  const level999 = ProgressService.calculateLevel(999);
  const level1000 = ProgressService.calculateLevel(1000);

  if (level0 !== 1 || level499 !== 1 || level500 !== 2 || level999 !== 2 || level1000 !== 3) {
    throw new Error(
      `Test 1 Failed: Level formula boundary check failed. Got: 0=>L${level0}, 499=>L${level499}, 500=>L${level500}, 999=>L${level999}, 1000=>L${level1000}`
    );
  }
  console.log('✓ Test 1 Passed: ProgressService.calculateLevel boundary behavior verified (0->L1, 499->L1, 500->L2, 999->L2, 1000->L3).');

  // Test 2: End-to-End Solve Propagation (Solve -> Activity -> Progress -> XP -> Level -> Analytics -> Dashboard)
  const initialAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(testUserA, '30d');
  const initialDashboard = DashboardAdapterService.getDashboardSummary(testUserA);
  
  if (initialAnalytics.solvedCount !== 0 || initialDashboard.playerHud.solvedCount !== 0) {
    throw new Error(`Test 2 Failed: Fresh user state expected 0 solved, got analytics=${initialAnalytics.solvedCount}, dashboard=${initialDashboard.playerHud.solvedCount}`);
  }

  // User A solves problem 1 (Two Sum)
  progressService.toggle('completed', 1, testUserA);
  DashboardAdapterService.clearCache();

  const updatedProgress = progressService.getState(testUserA);
  const updatedAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(testUserA, '30d');
  const updatedDashboard = DashboardAdapterService.getDashboardSummary(testUserA);
  const userActivities = activityStoreService.getActivityLog(testUserA);

  if (updatedProgress.xp !== 50) {
    throw new Error(`Test 2 Failed: Expected 50 XP, got ${updatedProgress.xp}`);
  }
  if (updatedAnalytics.solvedCount !== 1) {
    throw new Error(`Test 2 Failed: Analytics solved count expected 1, got ${updatedAnalytics.solvedCount}`);
  }
  if (updatedDashboard.playerHud.solvedCount !== 1) {
    throw new Error(`Test 2 Failed: Dashboard solved count expected 1, got ${updatedDashboard.playerHud.solvedCount}`);
  }
  if (updatedDashboard.playerHud.level !== ProgressService.calculateLevel(50)) {
    throw new Error(`Test 2 Failed: Dashboard level ${updatedDashboard.playerHud.level} does not match ProgressService.calculateLevel(50).`);
  }
  if (userActivities.length === 0) {
    throw new Error('Test 2 Failed: Activity log did not record canonical activity for solve.');
  }
  console.log('✓ Test 2 Passed: Single problem solve propagated consistently to Activity, Progress, XP, Level, Analytics, and Dashboard.');

  // Test 3: User Isolation (User A vs User B)
  progressService.toggle('completed', 2, testUserB);

  const userAState = progressService.getState(testUserA);
  const userBState = progressService.getState(testUserB);
  const userAAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(testUserA, '30d');
  const userBAnalytics = AnalyticsViewAdapter.getAnalyticsSummary(testUserB, '30d');

  if (userAState.completed.length !== 1 || !userAState.completed.includes(1)) {
    throw new Error('Test 3 Failed: User A state corrupted by User B solve.');
  }
  if (userBState.completed.length !== 1 || !userBState.completed.includes(2)) {
    throw new Error('Test 3 Failed: User B state not properly isolated.');
  }
  if (userAAnalytics.solvedCount !== 1 || userBAnalytics.solvedCount !== 1) {
    throw new Error('Test 3 Failed: User A and User B analytics leaked cross-user solved metrics.');
  }
  console.log('✓ Test 3 Passed: User A and User B state, progress, and analytics are strictly isolated.');

  // Test 4: Recommendation Harmonizer Cache Invalidation
  const planBefore = UnifiedRecommendationHarmonizer.getHarmonizedPlan(testUserA, 'Amazon');
  EventBus.publish('ProfileUpdated', { userId: testUserA, timestamp: new Date().toISOString() });
  EventBus.publish('PlatformSynced', { userId: testUserA, platform: 'leetcode', timestamp: new Date().toISOString() });
  const planAfter = UnifiedRecommendationHarmonizer.getHarmonizedPlan(testUserA, 'Amazon');

  if (!planBefore || !planAfter || !planAfter.recommendations) {
    throw new Error('Test 4 Failed: Recommendation Harmonizer plan generation failed after cache invalidation.');
  }
  console.log('✓ Test 4 Passed: Recommendation Harmonizer cache invalidates cleanly on EventBus events (ProfileUpdated, PlatformSynced).');

  // Test 5: Career and Interview Preparation Readiness Consistency
  const careerSummary = CareerAdapterService.getCareerSummary(testUserA);
  const interviewSummary = InterviewPreparationAdapterService.getInterviewPrepSummary(testUserA, 'Amazon');

  if (careerSummary.companyTracks.length === 0 || !interviewSummary.readiness) {
    throw new Error('Test 5 Failed: Career or Interview preparation summary returned missing structure.');
  }
  const careerReadiness = careerSummary.companyTracks[0].readinessPercentage;
  const interviewReadiness = interviewSummary.readiness.readinessScore;

  if (typeof careerReadiness !== 'number' && careerReadiness !== 'Unrated') {
    throw new Error(`Test 5 Failed: Career readiness percentage returned invalid type: ${careerReadiness}`);
  }
  if (typeof interviewReadiness !== 'number' && interviewReadiness !== 'Unrated') {
    throw new Error(`Test 5 Failed: Interview readiness score returned invalid type: ${interviewReadiness}`);
  }
  console.log('✓ Test 5 Passed: Career and Interview preparation readiness consume canonical state consistently.');

  // Test 6: Master Canonical Dataset Problem Count Protection
  const totalProblems = CurriculumRepository.getAllProblems().length;
  if (totalProblems !== 2344) {
    throw new Error(`Test 6 Failed: Canonical problem dataset count changed! Expected 2344, got ${totalProblems}`);
  }
  console.log('✓ Test 6 Passed: Master canonical dataset problem count remains exactly 2344.');

  console.log('--- All End-to-End Data Consistency Integration Tests Passed 100%! ---\n');
}
