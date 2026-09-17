/**
 * DSA MASTER — First-Time Learner Onboarding 1.0 E2E Test Suite
 * Tests the complete onboarding lifecycle, weak prior signals, diagnostic assessment,
 * state persistence & resume, zero fake mastery, multi-user isolation, and unified system integrations.
 */

import { OnboardingService } from '../onboarding/services/onboarding.service';
import { RecommendationEngineService } from '../recommendations/services/recommendation-engine.service';
import { AdaptiveRoadmapService } from '@/src/features/journey/services/adaptive-roadmap.service';
import { DashboardAdapterService } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { storage } from '@/src/core/storage/LocalStorageAdapter';

let totalPassed = 0;
let totalFailed = 0;

function assert(description: string, condition: boolean, details?: string) {
  if (condition) {
    totalPassed++;
    console.log('  ✓ [PASS] ' + description + (details ? ' -> ' + details : ''));
  } else {
    totalFailed++;
    console.error('  ✗ [FAIL] ' + description + (details ? ' -> ' + details : ''));
    process.exitCode = 1;
  }
}

export async function runOnboardingE2ETestSuite() {
  console.log('================================================================');
  console.log(' DSA MASTER — ONBOARDING 1.0 INTELLIGENCE & INTEGRATION E2E     ');
  console.log('================================================================\n');

  const timestamp = Date.now();
  const userA = 'test_onboard_alpha_' + timestamp;
  const userB = 'test_onboard_beta_' + timestamp;

  // Clean any previous test keys
  OnboardingService.resetForUser(userA);
  OnboardingService.resetForUser(userB);

  // ══════════════════════════════════════════════════════════════════
  // 1. NEW USER DETECTION & DEFAULT PROFILE
  // ══════════════════════════════════════════════════════════════════
  console.log('[1. NEW USER DETECTION & INITIAL STATE]');
  const initialProfileA = OnboardingService.getProfile(userA);
  assert('New user gets ONBOARDING_NOT_STARTED status', initialProfileA.status === 'ONBOARDING_NOT_STARTED');
  assert('New user begins at step 1', initialProfileA.currentStep === 1);
  assert('New user has empty selected topics array', initialProfileA.selectedTopics.length === 0);
  assert('New user has empty assessment evidence', initialProfileA.assessmentEvidence.length === 0);

  // ══════════════════════════════════════════════════════════════════
  // 2. STEP PROGRESSION & STATE PERSISTENCE
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[2. STEP PROGRESSION & PERSISTENCE]');
  // Advance to Step 2 (Level)
  const step2 = OnboardingService.updateStep(userA, 2, { selfReportedLevel: 'easy_solver' });
  assert('Step transitions to 2', step2.currentStep === 2);
  assert('Status transitions to ONBOARDING_IN_PROGRESS', step2.status === 'ONBOARDING_IN_PROGRESS');
  assert('Self-reported level is saved', step2.selfReportedLevel === 'easy_solver');

  // Advance to Step 3 (Experience)
  const step3 = OnboardingService.updateStep(userA, 3, { selectedTopics: ['Arrays', 'Hashing', 'Two Pointers'] });
  assert('Step transitions to 3', step3.currentStep === 3);
  assert('Selected topics saved correctly', step3.selectedTopics.length === 3 && step3.selectedTopics.includes('Hashing'));

  // Advance to Step 4 (Goal)
  const step4 = OnboardingService.updateStep(userA, 4, { learningGoal: 'coding_interviews' });
  assert('Step transitions to 4', step4.currentStep === 4);
  assert('Learning goal saved', step4.learningGoal === 'coding_interviews');

  // Verify state persists across fresh getProfile call (simulating page reload)
  const reloadedProfileA = OnboardingService.getProfile(userA);
  assert('State survives reload at current step', reloadedProfileA.currentStep === 4);
  assert('Level survives reload', reloadedProfileA.selfReportedLevel === 'easy_solver');
  assert('Goal survives reload', reloadedProfileA.learningGoal === 'coding_interviews');
  assert('Topics survive reload', reloadedProfileA.selectedTopics.length === 3);

  // ══════════════════════════════════════════════════════════════════
  // 3. DIAGNOSTIC MICRO-ASSESSMENT SCORING & EVIDENCE
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[3. DIAGNOSTIC MICRO-ASSESSMENT]');
  const questions = OnboardingService.getQuestions();
  assert('Assessment contains exactly 4 diagnostic questions', questions.length === 4);

  // Answer 3 correct, 1 skipped
  const testAnswers = [
    { questionId: questions[0].id, selectedOptionId: questions[0].correctOptionId, isCorrect: true, skipped: false, timeSpentMs: 4500, topicId: questions[0].topicId },
    { questionId: questions[1].id, selectedOptionId: questions[1].correctOptionId, isCorrect: true, skipped: false, timeSpentMs: 5200, topicId: questions[1].topicId },
    { questionId: questions[2].id, selectedOptionId: questions[2].correctOptionId, isCorrect: true, skipped: false, timeSpentMs: 6100, topicId: questions[2].topicId },
    { questionId: questions[3].id, selectedOptionId: undefined, isCorrect: false, skipped: true, timeSpentMs: 1200, topicId: questions[3].topicId },
  ];

  const assessedProfile = OnboardingService.submitAssessment(userA, testAnswers);
  assert('Assessment score is 75% (3/4)', assessedProfile.assessmentScore === 75);
  assert('Current step advances to 6 (Results)', assessedProfile.currentStep === 6);
  assert('Assessment evidence contains score summary', assessedProfile.assessmentEvidence.some(e => e.includes('3/4 questions correct')));
  assert('Assessment evidence includes self-reported level', assessedProfile.assessmentEvidence.some(e => e.includes('easy_solver')));
  assert('Assessment evidence includes goal', assessedProfile.assessmentEvidence.some(e => e.includes('coding interviews')));
  assert('Assessment evidence explicitly notes baseline prior', assessedProfile.assessmentEvidence.some(e => e.includes('Zero verified practice solves')));

  // ══════════════════════════════════════════════════════════════════
  // 4. FIRST MISSION GENERATION & COMPLETION
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[4. FIRST MISSION & ONBOARDING COMPLETION]');
  assert('First mission generated', !!assessedProfile.firstMission);
  assert('First mission has actionable steps', (assessedProfile.firstMission?.steps.length || 0) >= 3);
  assert('First mission provides direct destination route', !!assessedProfile.firstMission?.destinationRoute.startsWith('/'));

  const completedProfileA = OnboardingService.completeOnboarding(userA);
  assert('Onboarding transitions to ONBOARDING_COMPLETED', completedProfileA.status === 'ONBOARDING_COMPLETED');
  assert('Completion timestamp recorded', !!completedProfileA.completedAt);

  // ══════════════════════════════════════════════════════════════════
  // 5. ZERO FAKE MASTERY GUARANTEE (CRITICAL PRINCIPLE)
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[5. ZERO FAKE MASTERY AUDIT]');
  const roadmapA = AdaptiveRoadmapService.computeRoadmap(userA);
  assert('Overall roadmap mastery remains exactly 0% after onboarding', roadmapA.overallMasteryPercent === 0);
  assert('All roadmap topic node mastery scores remain 0', roadmapA.topics.every(t => t.masteryScore === 0));
  assert('Roadmap identifies isZeroState true for unpracticed user', roadmapA.isZeroState === true);
  assert('Roadmap includes onboardingPrior metadata', !!roadmapA.onboardingPrior);
  assert('Roadmap onboardingPrior flags isBaselineOnly true', roadmapA.onboardingPrior?.isBaselineOnly === true);
  assert('Roadmap onboardingPrior preserves 75% baseline assessment score', roadmapA.onboardingPrior?.assessmentScore === 75);

  // ══════════════════════════════════════════════════════════════════
  // 6. RECOMMENDATION ENGINE INTEGRATION
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[6. RECOMMENDATION ENGINE INTEGRATION]');
  const recs = RecommendationEngineService.getRecommendations(userA, 3);
  assert('Unified recommendations generated for onboarded user', recs.length > 0);
  assert('Top recommendation targets foundation LEARN action', recs[0].actionType === 'LEARN');
  assert('Top recommendation includes Onboarding:BaselineSignal', recs[0].sourceSignals.includes('Onboarding:BaselineSignal'));
  assert('Top recommendation contains onboarding baseline evidence', recs[0].supportingEvidence.some(e => e.includes('Diagnostic Assessment')));
  assert('Mentor payload includes baseline assessment context', Boolean(recs[0]?.mentorContextPayload?.contextSummary?.includes('75% score')));

  // ══════════════════════════════════════════════════════════════════
  // 7. DASHBOARD COMMAND CENTER INTEGRATION
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[7. DASHBOARD ADAPTER INTEGRATION]');
  DashboardAdapterService.clearCache();
  const dashSummary = DashboardAdapterService.getDashboardSummary(userA);
  assert('Dashboard returns aligned top recommendation', !!dashSummary.topRecommendation);
  assert('Dashboard top recommendation targets Arrays & Hashing', dashSummary.topRecommendation.topic.includes('Arrays'));
  assert('Dashboard includes unified recommendations list', dashSummary.unifiedRecommendations.length > 0);

  // ══════════════════════════════════════════════════════════════════
  // 8. SKIP FLOW VERIFICATION (USER BETA)
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[8. SKIP FLOW (USER BETA)]');
  const skippedB = OnboardingService.skipOnboarding(userB);
  assert('User Beta status is ONBOARDING_SKIPPED', skippedB.status === 'ONBOARDING_SKIPPED');
  assert('User Beta receives default foundational first mission', skippedB.firstMission?.topicId === 'arrays-hashing');
  assert('User Beta skipped timestamp recorded', !!skippedB.skippedAt);

  // ══════════════════════════════════════════════════════════════════
  // 9. MULTI-USER ISOLATION AUDIT
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[9. MULTI-USER ISOLATION]');
  const profileA_final = OnboardingService.getProfile(userA);
  const profileB_final = OnboardingService.getProfile(userB);
  assert('User A is COMPLETED while User B is SKIPPED', profileA_final.status === 'ONBOARDING_COMPLETED' && profileB_final.status === 'ONBOARDING_SKIPPED');
  assert('User A has assessmentScore 75 while User B has undefined', profileA_final.assessmentScore === 75 && profileB_final.assessmentScore === undefined);
  assert('User A selected topics are isolated from User B', profileA_final.selectedTopics.length === 3 && profileB_final.selectedTopics.length === 0);

  // ══════════════════════════════════════════════════════════════════
  // 10. GUEST SAFETY & ZERO PERSISTENCE
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[10. GUEST SAFETY]');
  const guestProfile = OnboardingService.getProfile('guest');
  assert('Guest receives NOT_STARTED state', guestProfile.status === 'ONBOARDING_NOT_STARTED');
  OnboardingService.saveProfile({ ...guestProfile, status: 'ONBOARDING_COMPLETED' });
  const guestRecheck = OnboardingService.getProfile('guest');
  assert('Guest state is NOT persisted to local storage', guestRecheck.status === 'ONBOARDING_NOT_STARTED');

  // ══════════════════════════════════════════════════════════════════
  // 11. IDEMPOTENT TELEMETRY EVENT EMISSION
  // ══════════════════════════════════════════════════════════════════
  console.log('\n[11. ANALYTICS & EVENT HISTORY]');
  const eventsA = OnboardingService.getEventHistory(userA);
  assert('Events recorded for User A', eventsA.length >= 3);
  assert('Includes OnboardingStepCompleted event', eventsA.some(e => e.eventName === 'OnboardingStepCompleted'));
  assert('Includes OnboardingAssessmentCompleted event', eventsA.some(e => e.eventName === 'OnboardingAssessmentCompleted'));
  assert('Includes OnboardingCompleted event', eventsA.some(e => e.eventName === 'OnboardingCompleted'));

  // Clean up test keys
  OnboardingService.resetForUser(userA);
  OnboardingService.resetForUser(userB);

  console.log('================================================================');
  console.log(' ONBOARDING E2E RESULT: ' + totalPassed + ' PASSED, ' + totalFailed + ' FAILED');
  console.log('================================================================\n');
}

if (require.main === module || process.argv[1]?.includes('onboarding-e2e.test')) {
  runOnboardingE2ETestSuite().catch((err) => {
    console.error('Test suite crashed:', err);
    process.exit(1);
  });
}
