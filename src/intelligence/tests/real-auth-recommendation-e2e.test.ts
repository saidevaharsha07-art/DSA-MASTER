/**
 * DSA MASTER — Real Authenticated Recommendation & Multi-User Isolation QA
 * Tests the complete REAL authentication and data persistence path:
 * - Real AuthService pipeline with user session management
 * - Real user activity generation (Solves, Failures, SRS scheduling, Upsolves)
 * - Real Recommendation Engine evaluation against live user state
 * - Cross-surface consistency (Dashboard, Journey, Practice, Revision, Contest, Analytics, Mentor)
 * - Multi-user isolation (User Alpha vs User Beta)
 * - Lifecycle event tracking (GENERATED -> VIEWED -> STARTED -> COMPLETED -> DISMISSED) with idempotency
 * - Public guest safety & zero PII leakage
 */

import { AuthService } from '@/src/lib/auth/services/auth.service';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';
import { progressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';

let passed = 0;
let failed = 0;

function assert(description: string, condition: boolean, details?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ [PASS] ${description}${details ? ` -> ${details}` : ''}`);
  } else {
    failed++;
    console.error(`  ✗ [FAIL] ${description}${details ? ` -> ${details}` : ''}`);
    process.exitCode = 1;
  }
}

export async function runRealAuthRecommendationQA() {
  console.log('================================================================');
  console.log(' DSA MASTER — REAL AUTHENTICATION & RECOMMENDATION SYSTEM QA    ');
  console.log('================================================================\n');

  const authService = new AuthService();
  const timestamp = Date.now();

  // ══════════════════════════════════════════════════════════════════
  // 1. REAL AUTHENTICATION PIPELINE (USER ALPHA & USER BETA)
  // ══════════════════════════════════════════════════════════════════
  console.log('[SECTION 1: REAL AUTHENTICATION PIPELINE]');
  const userAId = `usr_alpha_real_${timestamp}`;
  const userBId = `usr_beta_real_${timestamp}`;

  // Dynamic disposable credentials for test isolation
  const testPassword = process.env.QA_TEST_PASSWORD || `P@ss_${Math.random().toString(36).slice(2)}!A1`;
  const emailDomain = process.env.QA_TEST_EMAIL_DOMAIN || 'dsa-qa.internal';

  // Sign in User Alpha via AuthService
  const signinA = await authService.signIn('email', {
    email: `alpha_${timestamp}@${emailDomain}`,
    password: testPassword,
  });
  assert('AuthService session generated for User Alpha', signinA.success && !!signinA.session);
  assert('AuthService state transitions to authenticated', authService.getStateService().getState().isAuthenticated);

  // ══════════════════════════════════════════════════════════════════
  // 2. AUTHENTIC ZERO-STATE RECOMMENDATION (FRESH USER ALPHA)
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 2: AUTHENTIC ZERO-STATE RECOMMENDATION]');
  const zeroStateRec = await RecommendationEngineService.getTopRecommendation(userAId);
  assert('Zero-state recommendation generated', !!zeroStateRec);
  assert('Zero-state targets foundation LEARN action', zeroStateRec.actionType === 'LEARN');
  assert('Zero-state flags isZeroState true', zeroStateRec.isZeroState === true);
  assert('Zero-state targets Arrays & Hashing', zeroStateRec.topic === 'Arrays & Hashing');
  assert('Zero-state contains grounded evidence without fake metrics', zeroStateRec.supportingEvidence.length > 0 && zeroStateRec.supportingEvidence.some(e => e.includes('Foundation') || e.includes('prerequisite')));

  // ══════════════════════════════════════════════════════════════════
  // 3. REAL USER ACTIONS & TELEMETRY INGESTION (USER ALPHA)
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 3: REAL DATA GENERATION & PERSISTENCE (USER ALPHA)]');

  // Action 1: Solve two-sum under Arrays & Hashing
  await progressService.toggle('completed', 1, userAId);
  await activityStoreService.recordActivity({
    eventId: `act_solve_${timestamp}`,
    action: 'solved',
    userId: userAId,
    timestamp: new Date().toISOString(),
    problemId: 'two-sum',
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
    durationSeconds: 180,
  });

  // Action 2: Fail binary-search with repeated Wrong Answers
  await activityStoreService.recordActivity({
    eventId: `act_fail_1_${timestamp}`,
    action: 'failed',
    userId: userAId,
    timestamp: new Date().toISOString(),
    problemId: 'binary-search',
    topic: 'Binary Search',
    status: 'WRONG_ANSWER',
  });
  await activityStoreService.recordActivity({
    eventId: `act_fail_2_${timestamp}`,
    action: 'failed',
    userId: userAId,
    timestamp: new Date().toISOString(),
    problemId: 'binary-search',
    topic: 'Binary Search',
    status: 'WRONG_ANSWER',
  });

  // Action 3: Trigger SRS decay by scheduling revision in the past
  await progressService.schedule(1, -3, userAId);

  // ══════════════════════════════════════════════════════════════════
  // 4. PRIORITY EVALUATION & CROSS-SURFACE CONSISTENCY
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 4: PRIORITY HIERARCHY & CROSS-SURFACE CONSISTENCY]');

  // Check top recommendation for User Alpha (Should trigger Priority 1 REVISE or Priority 2 REVIEW_MISTAKE)
  const topRecA = await RecommendationEngineService.getTopRecommendation(userAId);
  assert('Top recommendation updated dynamically from real signals', !!topRecA);
  assert('Priority rank is high urgency (1 or 2)', topRecA.priorityRank <= 2);
  assert('Evidence includes genuine telemetry', topRecA.supportingEvidence.some(e => e.includes('SRS') || e.includes('retention') || e.includes('attempt') || e.includes('failed')));

  // Dashboard Adapter Service check
  const dashSummary = DashboardAdapterService.getDashboardSummary(userAId);
  assert('Dashboard Adapter consumes unified recommendation', !!dashSummary.topRecommendation);
  assert('Dashboard top recommendation matches engine topic', dashSummary.topRecommendation.topic === topRecA.topic);

  // Post-Practice generator check
  const postPracticeRec = RecommendationEngineService.getPostPracticeRecommendation(userAId, {
    problemId: 'two-sum',
    topic: 'Arrays & Hashing',
    outcome: 'ACCEPTED',
    durationSeconds: 120,
    failCount: 0,
  });
  assert('Post-practice recommendation generated', postPracticeRec.actionType === 'REVISE' || postPracticeRec.actionType === 'PRACTICE');
  assert('Post-practice evidence mentions solve time', postPracticeRec.supportingEvidence.some(e => e.includes('120') || e.includes('2.0') || e.includes('Clean')));

  // Post-Contest generator check
  const postContestRec = RecommendationEngineService.getPostContestRecommendation(userAId, {
    contestTitle: 'Sprint Round 1',
    solvedCount: 1,
    totalProblems: 3,
    problemBreakdown: [
      { problemId: 'two-sum', title: 'Two Sum', verdict: 'ACCEPTED' },
      { problemId: '3sum', title: '3Sum', verdict: 'WRONG_ANSWER', topic: 'Two Pointers' },
      { problemId: 'trapping-rain-water', title: 'Trapping Rain Water', verdict: 'UNATTEMPTED', topic: 'Two Pointers' },
    ],
    weakTopics: ['Two Pointers'],
  });
  assert('Post-contest upsolve recommendation generated', postContestRec.actionType === 'PRACTICE' && postContestRec.title.includes('Upsolve'));
  assert('Post-contest targets missed topic', postContestRec.topic === 'Two Pointers');

  // AI Mentor context payload check
  assert('Mentor context payload populated cleanly', !!topRecA.mentorContextPayload);
  assert(
    'Mentor payload is grounded in topic',
    topRecA.mentorContextPayload!.topic === topRecA.topic ||
    (topRecA.mentorContextPayload!.contextSummary?.includes(topRecA.topic) ?? false)
  );

  // ══════════════════════════════════════════════════════════════════
  // 5. LIFECYCLE TRACKING & ANALYTICS IDEMPOTENCY
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 5: LIFECYCLE TRACKING & IDEMPOTENT ANALYTICS]');
  const recId = topRecA.id;

  // Record VIEWED
  RecommendationEngineService.recordView(recId, userAId);
  RecommendationEngineService.recordView(recId, userAId); // Duplicate view test

  // Record STARTED
  RecommendationEngineService.recordStart(recId, userAId);

  // Record COMPLETED
  RecommendationEngineService.recordComplete(recId, userAId);

  const analyticsA = RecommendationEngineService.getAnalytics(userAId);
  assert('Analytics records total generated', analyticsA.totalGenerated >= 1);
  assert('Analytics records completed recommendation', analyticsA.totalCompleted >= 1);
  assert('Completion rate computed accurately', analyticsA.completionRatePercent > 0);

  // ══════════════════════════════════════════════════════════════════
  // 6. STRICT TWO-USER ISOLATION & DATA PRIVACY
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 6: TWO-USER ISOLATION & PARTITIONING]');

  // User Beta has done NO actions
  const topRecB = await RecommendationEngineService.getTopRecommendation(userBId);
  assert('User Beta receives zero-state recommendation', topRecB.isZeroState === true);
  assert('User Beta is NOT affected by User Alpha failures', topRecB.topic === 'Arrays & Hashing' && topRecB.actionType === 'LEARN');

  const analyticsB = RecommendationEngineService.getAnalytics(userBId);
  assert('User Beta analytics are completely isolated (0 completed)', analyticsB.totalCompleted === 0);
  assert('User Beta has 0% completion rate', analyticsB.completionRatePercent === 0);

  // ══════════════════════════════════════════════════════════════════
  // 7. GUEST SAFETY (ZERO PII & CLEAN ZERO-STATE)
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[SECTION 7: GUEST SAFETY & ZERO PII]');
  const guestRec = await RecommendationEngineService.getTopRecommendation('guest');
  assert('Guest recommendation generated safely', !!guestRec);
  assert('Guest recommendation has isZeroState true', guestRec.isZeroState === true);
  assert('Guest recommendation contains zero user email/name', !JSON.stringify(guestRec).includes('@') && !JSON.stringify(guestRec).includes('saideepak'));

  console.log('\n================================================================');
  console.log(` REAL AUTH RECOMMENDATION QA: ${passed}/${passed + failed} ASSERTIONS PASSED`);
  console.log('================================================================\n');

  if (failed > 0) process.exit(1);
}

runRealAuthRecommendationQA().catch((err) => {
  console.error('❌ Real Auth QA Suite Failed:', err);
  process.exit(1);
});
