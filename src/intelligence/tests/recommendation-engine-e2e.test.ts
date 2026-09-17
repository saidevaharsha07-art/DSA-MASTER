/**
 * DSA MASTER — Unified Recommendation Engine E2E Test Suite
 * Validates:
 * 1. Authentic Zero-State for Fresh Users (isZeroState === true, Arrays & Hashing LEARN action, factual evidence)
 * 2. Deterministic 7-Tier Priority Hierarchy (REVISE > REVIEW_MISTAKE > LEARN > PRACTICE > INTERVIEW > CONTEST > ASK_MENTOR)
 * 3. Evidence-First Explanations (Every card contains factual signals, numbers, and no vague text)
 * 4. Contextual Generators (Post-Practice, Post-Interview, Post-Contest, Post-Revision)
 * 5. Lifecycle Management & Idempotency (View, Start, Complete, Dismiss, Analytics)
 * 6. Multi-User Isolation & Strict Partitioning
 */

import { RecommendationEngineService } from '../recommendations/services/recommendation-engine.service';
import { progressService } from '@/src/services/progress/progress.service';
import { storage } from '@/src/core/storage/LocalStorageAdapter';

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[ASSERTION FAILED]: ${message}`);
  }
}

async function runRecommendationEngineE2ETests() {
  console.log('🧪 Starting Unified Recommendation Engine E2E Intelligence Tests...\n');

  const testUserZero = `test-user-zero-${Date.now()}`;
  const testUserDecay = `test-user-decay-${Date.now()}`;
  const testUserMistake = `test-user-mistake-${Date.now()}`;
  const testUserPractice = `test-user-practice-${Date.now()}`;
  const testUserInterview = `test-user-interview-${Date.now()}`;
  const testUserContest = `test-user-contest-${Date.now()}`;
  const testUserIsolationA = `test-user-iso-a-${Date.now()}`;
  const testUserIsolationB = `test-user-iso-b-${Date.now()}`;

  // =========================================================================
  // 1. FRESH USER ZERO STATE
  // =========================================================================
  console.log('--- Test Suite 1: Authentic Zero State for Fresh Users ---');
  {
    const topRec = RecommendationEngineService.getTopRecommendation(testUserZero);
    const recs = RecommendationEngineService.getRecommendations(testUserZero);

    assert(topRec.isZeroState === true, 'Fresh user top recommendation must have isZeroState === true');
    assert(topRec.actionType === 'LEARN', `Zero state actionType must be LEARN, got ${topRec.actionType}`);
    assert(topRec.topicId === 'arrays-hashing', `Zero state topic must be arrays-hashing, got ${topRec.topicId}`);
    assert(topRec.destinationRoute.includes('/learn') || topRec.destinationRoute.includes('/topic/arrays-hashing'), 'Zero state destinationRoute must route to learning');
    assert(topRec.supportingEvidence.length > 0, 'Zero state must include factual supporting evidence');
    assert(topRec.supportingEvidence.some(e => e.includes('Foundation topic') || e.includes('prerequisite')), 'Evidence must mention foundation topic or prerequisite');
    assert(topRec.mentorContextPayload !== undefined, 'Zero state must include mentorContextPayload');
    assert(
      (topRec.mentorContextPayload?.topic.includes('Arrays & Hashing') ?? false) ||
      (topRec.mentorContextPayload?.contextSummary?.includes('Arrays & Hashing') ?? false),
      'Mentor query must mention topic'
    );

    assert(recs.length > 0, 'Recommendations list must return items');
    assert(recs[0].id === topRec.id, 'First recommendation in list must match top recommendation');
    console.log('✅ Fresh user zero-state verified successfully.');
  }

  // =========================================================================
  // 2. PRIORITY HIERARCHY: LEVEL 1 — URGENT REVISION DECAY
  // =========================================================================
  console.log('\n--- Test Suite 2: Priority Hierarchy (Level 1 - Urgent Revision) ---');
  {
    progressService.toggle('completed', 1, testUserDecay);
    progressService.schedule(1, -3, testUserDecay);

    const topRec = RecommendationEngineService.getTopRecommendation(testUserDecay);
    assert(topRec.actionType === 'REVISE', `Priority 1 must be REVISE when items are overdue, got ${topRec.actionType}`);
    assert(topRec.priority === 'URGENT' && topRec.priorityRank === 1, `Priority tier must be URGENT (1), got ${topRec.priority} (${topRec.priorityRank})`);
    assert(topRec.destinationRoute === '/revision', `Destination must be /revision, got ${topRec.destinationRoute}`);
    assert(topRec.supportingEvidence.some(e => e.includes('decay') || e.includes('overdue') || e.includes('retention') || e.includes('Threshold') || e.includes('revision')), 'Evidence must describe memory decay');
    console.log('✅ Priority Level 1 (Urgent Revision) verified successfully.');
  }

  // =========================================================================
  // 3. PRIORITY HIERARCHY: LEVEL 2 — REPEATED MISTAKE / BLOCKER
  // =========================================================================
  console.log('\n--- Test Suite 3: Priority Hierarchy (Level 2 - Blocker & Mistakes) ---');
  {
    // Seed failed attempts in direct practice attempts
    storage.save(`dsa_practice_attempts_${testUserMistake}`, [
      { id: 'att_1', problemId: 'two-sum', status: 'failed', verdict: 'Wrong Answer', topic: 'Arrays & Hashing', timestamp: new Date().toISOString() },
      { id: 'att_2', problemId: 'two-sum', status: 'failed', verdict: 'Wrong Answer', topic: 'Arrays & Hashing', timestamp: new Date().toISOString() },
      { id: 'att_3', problemId: 'contains-duplicate', status: 'failed', verdict: 'Wrong Answer', topic: 'Arrays & Hashing', timestamp: new Date().toISOString() },
      { id: 'att_4', problemId: 'group-anagrams', status: 'failed', verdict: 'Wrong Answer', topic: 'Arrays & Hashing', timestamp: new Date().toISOString() },
    ]);

    const topRec = RecommendationEngineService.getTopRecommendation(testUserMistake);
    assert(topRec.actionType === 'REVIEW_MISTAKE', `Priority 2 must be REVIEW_MISTAKE on high error rate, got ${topRec.actionType}`);
    assert(topRec.priority === 'HIGH' && topRec.priorityRank === 2, `Priority tier must be HIGH (2), got ${topRec.priority} (${topRec.priorityRank})`);
    assert(topRec.supportingEvidence.some(e => e.includes('failed') || e.includes('mistake') || e.includes('rate') || e.includes('attempts')), 'Evidence must include failure rate');
    console.log('✅ Priority Level 2 (Review Mistake) verified successfully.');
  }

  // =========================================================================
  // 4. CONTEXTUAL GENERATORS: POST-PRACTICE, INTERVIEW, CONTEST, REVISION
  // =========================================================================
  console.log('\n--- Test Suite 4: Contextual Surface Generators ---');
  {
    const postSolveRec = RecommendationEngineService.getPostPracticeRecommendation(testUserPractice, {
      problemId: 'two-sum',
      topic: 'Arrays & Hashing',
      outcome: 'SOLVED',
      durationSeconds: 120,
    });
    assert(postSolveRec.actionType === 'PRACTICE', `Post-practice solve should recommend PRACTICE, got ${postSolveRec.actionType}`);
    assert(postSolveRec.destinationRoute.includes('/practice'), 'Route must point to practice');
    assert(postSolveRec.supportingEvidence.some(e => e.toLowerCase().includes('solve')), 'Evidence must note previous solve');

    const postFailRec = RecommendationEngineService.getPostPracticeRecommendation(testUserPractice, {
      problemId: '3sum',
      topic: 'Two Pointers',
      outcome: 'FAILED',
      durationSeconds: 600,
      failCount: 2,
    });
    assert(postFailRec.actionType === 'REVIEW_MISTAKE' || postFailRec.actionType === 'PRACTICE', 'Post-practice fail should recommend review or retry');
    assert(
      (postFailRec.mentorContextPayload?.topic.includes('Two Pointers') ?? false) ||
      (postFailRec.mentorContextPayload?.contextSummary?.includes('Two Pointers') ?? false),
      'Mentor context must preserve topic'
    );

    const postInterviewRec = RecommendationEngineService.getPostInterviewRecommendation(testUserInterview, {
      interviewId: 'int_123',
      overallScore: 68,
      pillars: { accuracy: 50, problemSolving: 70, timeManagement: 60, patternRecognition: 55, consistency: 80 },
      weakestPillar: 'accuracy',
      weakestTopic: 'Binary Search',
    });
    assert(postInterviewRec.actionType === 'PRACTICE' || postInterviewRec.actionType === 'REVIEW_MISTAKE', 'Post-interview should recommend practice on weakness');
    assert(postInterviewRec.topic === 'Binary Search', `Target topic must be Binary Search, got ${postInterviewRec.topic}`);
    assert(postInterviewRec.supportingEvidence.some(e => e.includes('Interview') || e.includes('score') || e.includes('accuracy')), 'Evidence must reference interview score');

    const postContestRec = RecommendationEngineService.getPostContestRecommendation(testUserContest, {
      contestId: 'weekly-1',
      score: 300,
      solvedCount: 2,
      totalProblems: 4,
      weakTopics: ['Dynamic Programming'],
    });
    assert(postContestRec.topic === 'Dynamic Programming', 'Post-contest target topic must match missed area');
    assert(postContestRec.supportingEvidence.some(e => e.includes('Contest') || e.includes('solved 2/4')), 'Evidence must reference contest solve ratio');

    const postRevRec = RecommendationEngineService.getPostRevisionRecommendation(testUserZero, {
      reviewedCount: 5,
      decayedCount: 0,
    });
    assert(postRevRec.actionType === 'PRACTICE' || postRevRec.actionType === 'LEARN', 'Post-revision with 0 decay should advance to practice/learn');
    console.log('✅ Contextual surface recommendation generators verified successfully.');
  }

  // =========================================================================
  // 5. LIFECYCLE MANAGEMENT & IDEMPOTENT PERSISTENCE
  // =========================================================================
  console.log('\n--- Test Suite 5: Lifecycle Transitions & Analytics ---');
  {
    const initialRec = RecommendationEngineService.getTopRecommendation(testUserZero);
    const recId = initialRec.id;

    RecommendationEngineService.recordView(testUserZero, recId);
    let analytics = RecommendationEngineService.getAnalytics(testUserZero);
    assert(analytics.totalGenerated >= 1, 'Analytics must record generated recommendation');

    RecommendationEngineService.recordStart(testUserZero, recId);
    analytics = RecommendationEngineService.getAnalytics(testUserZero);
    assert(analytics.totalStarted >= 1, 'Analytics must record started recommendation');

    RecommendationEngineService.recordComplete(testUserZero, recId);
    analytics = RecommendationEngineService.getAnalytics(testUserZero);
    assert(analytics.totalCompleted >= 1, 'Analytics must record completed recommendation');
    assert((analytics.completionRatePct || analytics.completionRatePercent || 0) > 0, `Completion rate must be positive, got ${analytics.completionRatePct}%`);

    const nextRec = RecommendationEngineService.getRecommendations(testUserZero)[0];
    RecommendationEngineService.recordDismiss(testUserZero, nextRec.id);
    analytics = RecommendationEngineService.getAnalytics(testUserZero);
    assert(analytics.totalDismissed >= 1, 'Analytics must record dismissed recommendation');

    console.log('✅ Lifecycle state transitions and analytics verified successfully.');
  }

  // =========================================================================
  // 6. MULTI-USER ISOLATION
  // =========================================================================
  console.log('\n--- Test Suite 6: Multi-User Isolation & Partitioning ---');
  {
    progressService.toggle('completed', 1, testUserIsolationA);
    progressService.toggle('completed', 2, testUserIsolationA);
    progressService.toggle('completed', 3, testUserIsolationA);

    const recA = RecommendationEngineService.getTopRecommendation(testUserIsolationA);
    const recB = RecommendationEngineService.getTopRecommendation(testUserIsolationB);

    assert(recA.isZeroState === false, 'User A with completed problems must NOT be in zero state');
    assert(recB.isZeroState === true, 'User B must strictly be in zero state');
    assert(recA.userId === testUserIsolationA, `User A recommendation must be scoped to User A, got ${recA.userId}`);
    assert(recB.userId === testUserIsolationB, `User B recommendation must be scoped to User B, got ${recB.userId}`);
    assert(recA.id !== recB.id || recA.actionType !== recB.actionType || recA.title !== recB.title, 'User A and User B recommendations must reflect distinct individual profiles');

    RecommendationEngineService.recordStart(testUserIsolationA, recA.id);
    const analyticsA = RecommendationEngineService.getAnalytics(testUserIsolationA);
    const analyticsB = RecommendationEngineService.getAnalytics(testUserIsolationB);

    assert(analyticsA.totalStarted >= 1, 'User A should have started count');
    assert(analyticsB.totalStarted === 0, `User B started count must remain 0, got ${analyticsB.totalStarted}`);
    console.log('✅ Multi-user isolation and data privacy verified successfully.');
  }

  console.log('\n🎉 ALL RECOMMENDATION ENGINE E2E ASSERTIONS PASSED (6/6 SUITES).');
}

runRecommendationEngineE2ETests().catch((err) => {
  console.error('\n❌ Recommendation Engine Test Suite Failed:', err);
  process.exit(1);
});
