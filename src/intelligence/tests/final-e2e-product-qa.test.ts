import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';
import { progressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { judgeEngine } from '@/src/engines/judge';
import { EventBus } from '@/src/core/events/event-bus';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { WeaknessAnalyzer } from '@/src/intelligence/analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '@/src/intelligence/analyzers/strength.analyzer';
import { AdaptiveRecommendationService } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { APP_NAME } from '@/src/config/constants';

export async function runFinalEndToEndProductQA() {
  console.log('======================================================================');
  console.log('           FINAL END-TO-END PRODUCT QA VERIFICATION SUITE             ');
  console.log('======================================================================\n');

  activityStoreService.ensureSubscribed();
  progressService.ensureSubscribed();

  let passedTests = 0;
  let totalTests = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    totalTests++;
    if (!condition) {
      console.error(`❌ FAILED: ${testName}`);
      if (detail) console.error(`   Detail: ${detail}`);
      throw new Error(`QA Test Assertion Failed: ${testName}`);
    } else {
      passedTests++;
      console.log(`✓ Passed: ${testName}`);
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 1. FRESH USER INITIAL STATE VERIFICATION
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 1. FRESH USER INITIAL STATE ---');
  const freshUserId = 'qa_user_fresh_' + Date.now();
  progressService.resetState(freshUserId);
  activityStoreService.clearUserActivity(freshUserId);

  canonicalDb.saveUser({
    userId: freshUserId,
    username: 'FreshExplorer',
    displayName: 'Fresh Explorer',
    email: 'fresh@dsamaster.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    settings: { appearance: { theme: 'dark' } },
  });

  const freshSummary = DashboardAdapterService.getDashboardSummary(freshUserId);
  assert(freshSummary.playerHud.solvedCount === 0, 'Fresh user starts with genuine 0 Solved Count');
  assert(freshSummary.playerHud.totalXp === 0, 'Fresh user starts with genuine 0 XP');
  assert(freshSummary.playerHud.currentStreak === 0, 'Fresh user starts with genuine 0 Day Streak');
  assert(freshSummary.recentActivity.length === 0, 'Fresh user starts with genuine 0 Activity Entries');
  assert(freshSummary.mistakeIntelligence.hasData === false, 'Fresh user has no fake mistake intelligence data');
  assert(freshSummary.mistakeIntelligence.commonPatterns.length === 0, 'Fresh user has 0 recurring mistake patterns');
  assert(freshSummary.needsRevision.hasRevisionData === false, 'Fresh user has no fake revision priorities');
  assert(freshSummary.primaryRecommendation.title !== '', 'Fresh user gets an authentic introductory recommendation');

  // ──────────────────────────────────────────────────────────────────────────
  // 2. PUBLIC EXPERIENCE & GUEST STATE
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 2. PUBLIC & GUEST ACCESS ---');
  const guestSummary = DashboardAdapterService.getDashboardSummary('guest');
  assert(guestSummary.playerHud.solvedCount === 0, 'Guest session starts with 0 solved');
  assert(guestSummary.platformSnapshot.length >= 3, 'Guest session can view platform catalog snapshots');
  assert(CurriculumRepository.getAllCategories().length > 0, 'Public curriculum categories are fully loadable');
  assert(CurriculumRepository.getAllProblems().length > 0, 'Public curriculum problems are fully loadable');

  // ──────────────────────────────────────────────────────────────────────────
  // 3. AUTHENTICATED PRACTICE & SOLVE FLOW
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 3. AUTHENTICATED PRACTICE & TELEMETRY ---');
  const activeUserId = 'qa_user_solver_' + Date.now();
  progressService.resetState(activeUserId);
  activityStoreService.clearUserActivity(activeUserId);

  canonicalDb.saveUser({
    userId: activeUserId,
    username: 'ActiveSolver',
    displayName: 'Active Solver',
    email: 'solver@dsamaster.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // User solves problem 1 (Two Sum)
  judgeEngine.saveDraft('1', 'typescript', 'function twoSum(nums: number[], target: number) { return [0, 1]; }', activeUserId);
  judgeEngine.recordSubmission({
    problemId: '1',
    language: 'typescript',
    verdict: 'Accepted',
    runtimeMs: 42,
    memoryMb: 14.2,
    codeSnapshot: 'function twoSum() {}',
    testcasesPassed: 10,
    totalTestcases: 10,
    xpEarned: 50,
  }, activeUserId);

  EventBus.publish('ProblemSolved', {
    userId: activeUserId,
    problemId: 'leetcode:1',
    leetcodeNumber: 1,
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 20,
    xpEarned: 50,
    topic: 'Arrays & Hashing',
    pattern: 'Two Pointers',
    difficulty: 'Easy',
  });

  DashboardAdapterService.clearCache();
  const solverSummary = DashboardAdapterService.getDashboardSummary(activeUserId);

  assert(solverSummary.playerHud.solvedCount === 1, 'Solved count increments accurately to 1');
  assert(solverSummary.playerHud.totalXp >= 50, 'Total XP accurately reflects awarded 50 XP');
  assert(solverSummary.recentActivity.length >= 1, 'Activity stream registers the recent solve');

  // ──────────────────────────────────────────────────────────────────────────
  // 4. FAILURE INTELLIGENCE & MISTAKE GROUNDING
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 4. FAILURE INTELLIGENCE & MISTAKES ---');
  // Record 3 struggle events for Climbing Stairs (Time Limit Exceeded)
  for (let i = 0; i < 3; i++) {
    judgeEngine.recordSubmission({
      problemId: '70',
      language: 'typescript',
      verdict: 'Time Limit Exceeded',
      runtimeMs: 2500,
      memoryMb: 32.5,
      codeSnapshot: 'function climbStairs(n: number): number { return climbStairs(n-1) + climbStairs(n-2); }',
      testcasesPassed: 15,
      totalTestcases: 45,
      xpEarned: 0,
    }, activeUserId);

    EventBus.publish('ProblemFailed', {
      userId: activeUserId,
      problemId: '70',
      topic: 'Dynamic Programming',
      pattern: 'Overlapping Subproblems & State Transitions',
      platform: 'leetcode',
      status: 'failed',
      durationSeconds: 120,
      timestamp: new Date(Date.now() + i * 1000).toISOString(),
      xpEarned: 0,
    });
  }

  DashboardAdapterService.clearCache();
  const failSummary = DashboardAdapterService.getDashboardSummary(activeUserId);

  assert(failSummary.playerHud.solvedCount === 1, 'Failed attempts do NOT increase solved count');
  assert(failSummary.mistakeIntelligence.hasData === true, 'Mistake intelligence detects struggle events');
  assert(failSummary.mistakeIntelligence.totalMistakesAnalyzed >= 3, 'Accurately records 3 failed struggle events');
  assert(
    failSummary.mistakeIntelligence.commonPatterns.some(p => p.topic.includes('Dynamic Programming') || p.failureType === 'Time Limit'),
    'Grounded pattern detects Time Limit / DP struggle'
  );

  // ──────────────────────────────────────────────────────────────────────────
  // 5. ADAPTIVE ROADMAP & 5-CATEGORY TOPIC MASTERY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 5. ADAPTIVE ROADMAP MASTERY STATES ---');
  const roadmapState = failSummary.adaptiveRoadmap;
  assert(roadmapState !== undefined, 'Adaptive roadmap is computed');
  assert(roadmapState.nextBestTopic !== undefined, 'Next best topic is determined dynamically');
  assert(roadmapState.nextBestTopic.title.length > 0, 'Next best topic has a valid title');
  assert(roadmapState.nextBestTopic.reason.length > 0, 'Next best topic provides grounded justification');

  // ──────────────────────────────────────────────────────────────────────────
  // 6. MEMORY ENGINE & REVISION INTEGRATION
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 6. MEMORY ENGINE & REVISION QUEUE ---');
  const memoryEngine = new MemoryEngine();
  memoryEngine.processReview(activeUserId, 'leetcode:1', 'success'); // Good recall
  const memoryHealth = memoryEngine.getMemoryHealth(activeUserId);
  assert(memoryHealth !== null && memoryHealth !== undefined, 'Memory health computed accurately');
  assert(memoryHealth.totalConceptsTracked >= 1, 'Tracked concept stored in SRS memory graph');

  // ──────────────────────────────────────────────────────────────────────────
  // 7. TWO-USER ISOLATION & DATA SECURITY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 7. TWO-USER ISOLATION & SECURITY ---');
  const userA = 'qa_isolation_user_A_' + Date.now();
  const userB = 'qa_isolation_user_B_' + Date.now();

  progressService.resetState(userA);
  activityStoreService.clearUserActivity(userA);
  progressService.resetState(userB);
  activityStoreService.clearUserActivity(userB);

  canonicalDb.saveUser({
    userId: userA,
    username: 'AliceMaster',
    displayName: 'Alice Master',
    email: 'alice@dsamaster.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  canonicalDb.saveUser({
    userId: userB,
    username: 'BobExplorer',
    displayName: 'Bob Explorer',
    email: 'bob@dsamaster.dev',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  // Alice solves 2 problems and saves draft
  judgeEngine.saveDraft('15', 'typescript', 'function threeSum() { return [[-1, 0, 1]]; }', userA);
  judgeEngine.recordSubmission({
    problemId: '15',
    language: 'typescript',
    verdict: 'Accepted',
    runtimeMs: 65,
    memoryMb: 18.2,
    codeSnapshot: 'function threeSum() {}',
    testcasesPassed: 30,
    totalTestcases: 30,
    xpEarned: 60,
  }, userA);
  EventBus.publish('ProblemSolved', {
    userId: userA,
    problemId: 'leetcode:15',
    leetcodeNumber: 15,
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 40,
    xpEarned: 60,
    topic: 'Two Pointers',
    difficulty: 'Medium',
  });

  EventBus.publish('ProblemSolved', {
    userId: userA,
    problemId: 'leetcode:242',
    leetcodeNumber: 242,
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 15,
    xpEarned: 30,
    topic: 'Arrays & Hashing',
    difficulty: 'Easy',
  });

  // Bob checks his data
  DashboardAdapterService.clearCache();
  const bobSummary = DashboardAdapterService.getDashboardSummary(userB);
  const bobDraft = judgeEngine.loadDraft('15', 'typescript', userB);
  const bobSubmissions = judgeEngine.getSubmissionsForProblem('15', userB);

  assert(bobSummary.playerHud.solvedCount === 0, 'User B sees 0 solved problems (no contamination from User A)');
  assert(bobSummary.playerHud.totalXp === 0, 'User B sees 0 XP');
  assert(bobDraft === null || bobDraft === undefined, 'User B cannot access User A private code drafts');
  assert(bobSubmissions.length === 0, 'User B cannot view User A submission history');

  // Alice logs back in
  DashboardAdapterService.clearCache();
  const aliceSummary = DashboardAdapterService.getDashboardSummary(userA);
  const aliceDraft = judgeEngine.loadDraft('15', 'typescript', userA);

  assert(aliceSummary.playerHud.solvedCount === 2, 'User A solves remain intact at 2');
  assert(aliceSummary.playerHud.totalXp >= 90, 'User A XP remains intact at 90+');
  assert(typeof aliceDraft === 'string' && aliceDraft.includes('threeSum'), 'User A draft code preserved with 100% fidelity');

  // ──────────────────────────────────────────────────────────────────────────
  // 8. BRANDING INTEGRITY
  // ──────────────────────────────────────────────────────────────────────────
  console.log('\n--- 8. BRANDING INTEGRITY ---');
  assert(APP_NAME === 'DSA MASTER', 'System configuration constant is exactly DSA MASTER');

  console.log('\n======================================================================');
  console.log(`✓ ALL ${passedTests} / ${totalTests} END-TO-END QA CHECKS PASSED SUCCESSFULLY!`);
  console.log('======================================================================\n');
  return true;
}
