/**
 * Daily Study Planner 2.0 — Unit & Integration Test Suite
 * Validates:
 * 1. Time budget persistence
 * 2. Zero-state baseline generation (no fake mastery)
 * 3. Grounded activity selection & prioritization
 * 4. Completion tracking & actual vs estimated duration
 * 5. Skip behavior
 * 6. Mid-day adaptive replanning
 * 7. Pattern Academy custom pattern injection
 * 8. Factual end-of-day summary metrics (zero arbitrary grades)
 * 9. Multi-user isolation
 */

import { StudyPlanOrchestratorService } from '../services/study-plan.service';

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    throw new Error(`Assertion Failed: ${message}`);
  }
  passedTests++;
  console.log(`✓ Passed: ${message}`);
}

export async function runStudyPlanTestSuite(): Promise<boolean> {
  console.log('\n======================================================================');
  console.log('         DAILY STUDY PLANNER 2.0 INTEGRATION TEST SUITE               ');
  console.log('======================================================================\n');

  const userA = `test_plan_user_a_${Date.now()}`;
  const userB = `test_plan_user_b_${Date.now()}`;

  // 1. Time Budget Persistence
  console.log('--- Test 1: Time budget selection and persistence ---');
  StudyPlanOrchestratorService.setTimeBudget(userA, 60);
  assert(StudyPlanOrchestratorService.getTimeBudget(userA) === 60, 'User A budget is saved as 60m');

  StudyPlanOrchestratorService.setTimeBudget(userB, 30);
  assert(StudyPlanOrchestratorService.getTimeBudget(userB) === 30, 'User B budget is saved as 30m');
  assert(StudyPlanOrchestratorService.getTimeBudget(userA) === 60, 'User A budget remains isolated from User B');

  // 2. Zero-State Day 1 Plan Generation
  console.log('\n--- Test 2: Zero-state foundational day-1 plan ---');
  const freshPlan = StudyPlanOrchestratorService.generateDailyPlan(userA, 45);
  assert(freshPlan.isZeroState === true, 'Fresh user plan identifies as zero-state foundation');
  assert(freshPlan.items.length >= 2, 'Zero-state generates at least 2 foundational activities');
  assert(freshPlan.items[0].type === 'LEARN', 'First activity is concept learning (Arrays foundation)');
  assert(freshPlan.items[0].areaSlug === 'basic-arrays', 'First area is Arrays & Hashing foundation');
  assert(freshPlan.status === 'active', 'Initial plan status is active');
  assert(freshPlan.completedCount === 0, 'Completed count is 0');
  assert(freshPlan.remainingCount === freshPlan.items.length, 'Remaining count matches items length');

  // 3. Activity Starting and Completing
  console.log('\n--- Test 3: Activity lifecycle: start and complete ---');
  const firstItemId = freshPlan.items[0].id;
  const startedPlan = StudyPlanOrchestratorService.startActivity(userA, firstItemId);
  const startedItem = startedPlan.items.find((i) => i.id === firstItemId);
  assert(startedItem?.status === 'in_progress', 'Started item has status in_progress');

  const completedPlan = StudyPlanOrchestratorService.completeActivity(userA, firstItemId, 14);
  const completedItem = completedPlan.items.find((i) => i.id === firstItemId);
  assert(completedItem?.status === 'completed', 'Item marked as completed');
  assert(completedItem?.actualMinutes === 14, 'Recorded 14m actual time spent');
  assert(completedPlan.actualTimeSpentMinutes === 14, 'Plan total actual time updated to 14m');
  assert(completedPlan.completedCount === 1, 'Completed count incremented to 1');
  assert(completedPlan.remainingCount === freshPlan.items.length - 1, 'Remaining count decremented');

  // 4. Skipping Activity
  console.log('\n--- Test 4: Skipping an activity ---');
  const secondItemId = completedPlan.items[1].id;
  const skippedPlan = StudyPlanOrchestratorService.skipActivity(userA, secondItemId);
  const skippedItem = skippedPlan.items.find((i) => i.id === secondItemId);
  assert(skippedItem?.status === 'skipped', 'Item marked as skipped');
  assert(skippedPlan.skippedCount === 1, 'Skipped count is 1');

  // 5. Mid-day Adaptive Replanning
  console.log('\n--- Test 5: Mid-day adaptive replanning ---');
  const replanned = StudyPlanOrchestratorService.replanDailyPlan(userA, 'User requested optimization');
  assert(replanned.lastReplannedAt !== undefined, 'Replanned plan records lastReplannedAt');
  assert(replanned.replanReason === 'User requested optimization', 'Replan reason recorded');
  const completedRetained = replanned.items.find((i) => i.id === firstItemId);
  assert(completedRetained?.status === 'completed', 'Completed item preserved across replan');
  const skippedRetained = replanned.items.find((i) => i.id === secondItemId);
  assert(skippedRetained?.status === 'skipped', 'Skipped item preserved across replan');

  // 6. Pattern Concept Academy Custom Pattern Injection
  console.log('\n--- Test 6: Pattern Concept Academy custom pattern injection ---');
  const withCustom = StudyPlanOrchestratorService.addCustomPatternActivity(userA, {
    areaTitle: 'Two Pointers',
    areaSlug: 'two-pointers',
    subtopicTitle: 'Two Pointer Technique',
    subtopicSlug: 'two-pointer-technique',
    patternTitle: 'Opposite Ends Two Pointers',
    patternSlug: 'opposite-ends',
    type: 'LEARN',
  });
  const injectedItem = withCustom.items.find((i) => i.patternSlug === 'opposite-ends');
  assert(injectedItem !== undefined, 'Injected pattern item exists in plan');
  assert(injectedItem?.type === 'LEARN', 'Injected item is LEARN type');
  assert(Boolean(injectedItem?.actionUrl?.includes('two-pointers')), 'Injected item links to correct pattern URL');

  // 7. End-Of-Day Factual Summary
  console.log('\n--- Test 7: Factual End-of-Day summary ---');
  const summary = StudyPlanOrchestratorService.getEndOfDaySummary(userA);
  assert(summary.activitiesCompleted >= 1, 'Summary reports at least 1 activity completed');
  assert(summary.actualTimeSpentMinutes >= 14, 'Summary reports accurate actual time spent');
  assert(Array.isArray(summary.patternsPracticed), 'Patterns practiced is an array');
  assert(Array.isArray(summary.nextRecommendedWork), 'Next recommended work is an array');

  // 8. User Data Isolation
  console.log('\n--- Test 8: User data isolation ---');
  const planB = StudyPlanOrchestratorService.getTodayPlan(userB);
  assert(planB.userId === userB, 'User B plan belongs strictly to User B');
  assert(planB.completedCount === 0, 'User B has 0 completed activities despite User A having completed items');
  assert(planB.actualTimeSpentMinutes === 0, 'User B has 0m time spent');

  console.log(`\n✅ ALL ${passedTests}/${totalTests} TESTS PASSED CLEANLY!\n`);
  return true;
}

if (typeof require !== 'undefined' && require.main === module) {
  runStudyPlanTestSuite().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
