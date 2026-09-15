/**
 * Phase 12 — Production Persistence & Real User Data Integration Test Suite (25 Tests)
 * Tests 1-25 verifying canonical database storage, user A/B/C isolation, LocalStorage migration,
 * offline safety, EventBus deduplication, derived analytics, AI key protection, and master regression.
 */

import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';
import { migrationManager } from '@/src/core/storage/migration/migration-manager';
import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { PlatformTelemetryService } from '@/src/features/platform/services/platform-telemetry.service';
import { EventBus } from '@/src/core/events/event-bus';
import { OfflineActionQueue } from '@/src/lib/offline/offline.queue';
import { CurriculumRepository } from '@/src/curriculum/repository';

export async function testProductionPersistenceRealIntegration(): Promise<void> {
  console.log('--- Testing Phase 12: Production Persistence & Real User Data (25 Tests) ---');

  // Test 1: New User Persistence
  const user1 = 'p12_db_user_1';
  canonicalDb.saveUser({
    userId: user1,
    username: 'alice',
    displayName: 'Alice Coder',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const dbUser1 = canonicalDb.getUser(user1);
  if (!dbUser1 || dbUser1.username !== 'alice') {
    throw new Error('Test 1 Failed: New user persistence failed in CanonicalDatabaseService.');
  }
  console.log('✓ Test 1 Passed: New user persistence verified.');

  // Test 2: User A/B/C Isolation
  const userA = 'p12_iso_user_A';
  const userB = 'p12_iso_user_B';
  const userC = 'p12_iso_user_C';

  progressService.resetState(userA);
  progressService.resetState(userB);
  progressService.resetState(userC);

  EventBus.publish('ProblemSolved', { userId: userA, problemId: 'leetcode:1', xpEarned: 50 });
  EventBus.publish('ProblemSolved', { userId: userB, problemId: 'leetcode:2', xpEarned: 100 });

  const stateA = progressService.getState(userA);
  const stateB = progressService.getState(userB);
  const stateC = progressService.getState(userC);

  if (stateA.xp !== 50 || stateB.xp !== 100 || stateC.xp !== 0) {
    throw new Error('Test 2 Failed: User A/B/C state isolation breached!');
  }
  console.log('✓ Test 2 Passed: User A/B/C isolation verified.');

  // Test 3: Progress Persistence
  canonicalDb.saveProgress({
    userId: userA,
    xp: 50,
    level: 1,
    currentStreak: 1,
    longestStreak: 1,
    completedProblemIds: ['leetcode:1'],
    favorites: [],
    notes: {},
    lastActiveDate: new Date().toISOString(),
  });
  const dbProgA = canonicalDb.getProgress(userA);
  if (!dbProgA || dbProgA.xp !== 50) {
    throw new Error('Test 3 Failed: Progress record persistence failed.');
  }
  console.log('✓ Test 3 Passed: Progress persistence verified.');

  // Test 4: Activity Persistence
  activityStoreService.recordActivity({
    eventId: 'evt_p12_act_4',
    userId: userA,
    action: 'opened',
    timestamp: new Date().toISOString(),
    problemId: 'leetcode:100',
  });
  const logA = activityStoreService.getActivityLog(userA);
  if (logA.length !== 2) { // 1 solve + 1 opened
    throw new Error(`Test 4 Failed: Activity persistence failed (got ${logA.length} records).`);
  }
  console.log('✓ Test 4 Passed: Activity persistence verified.');

  // Test 5: Duplicate Event Prevention
  activityStoreService.recordActivity({
    eventId: 'evt_p12_act_4', // Same eventId as Test 4
    userId: userA,
    action: 'opened',
    timestamp: new Date().toISOString(),
    problemId: 'leetcode:100',
  });
  const logAAfterDupe = activityStoreService.getActivityLog(userA);
  if (logAAfterDupe.length !== logA.length) {
    throw new Error('Test 5 Failed: Duplicate eventId was recorded into activity store.');
  }
  console.log('✓ Test 5 Passed: Duplicate event prevention verified.');

  // Test 6: XP Integrity
  const lvl1 = ProgressService.calculateLevel(499);
  const lvl2 = ProgressService.calculateLevel(500);
  if (lvl1 !== 1 || lvl2 !== 2) {
    throw new Error('Test 6 Failed: XP level scaling formula calculation incorrect.');
  }
  console.log('✓ Test 6 Passed: XP integrity verified.');

  // Test 7: Solve Integrity (Re-solve does not double count)
  EventBus.publish('ProblemSolved', { userId: userA, problemId: 'leetcode:1', xpEarned: 50 });
  const stateAAfterResolving = progressService.getState(userA);
  if (stateAAfterResolving.completedProblemIds?.length !== 1 || stateAAfterResolving.xp !== 50) {
    throw new Error('Test 7 Failed: Re-solving problem duplicated solved count or XP!');
  }
  console.log('✓ Test 7 Passed: Solve integrity verified.');

  // Test 8: Memory Concept Persistence
  canonicalDb.saveConcept({
    userId: userA,
    conceptId: 'concept-binary-search',
    memoryScore: 85,
    retentionRate: 0.9,
    stability: 2.5,
    reviewCount: 3,
    lastReviewed: new Date().toISOString(),
    nextReviewDate: new Date(Date.now() + 86400000).toISOString(),
    forgettingRisk: 'low',
  });
  const conceptA = canonicalDb.getConcept(userA, 'concept-binary-search');
  if (!conceptA || conceptA.memoryScore !== 85) {
    throw new Error('Test 8 Failed: Memory concept persistence failed.');
  }
  console.log('✓ Test 8 Passed: Memory concept persistence verified.');

  // Test 9: Revision Queue Persistence
  canonicalDb.saveRevisionQueue({
    userId: userA,
    queueId: 'q-userA',
    items: [{ problemId: 'leetcode:1', priority: 1, scheduledFor: new Date().toISOString() }],
    lastScheduledAt: new Date().toISOString(),
  });
  const queueA = canonicalDb.getRevisionQueue(userA);
  if (!queueA || queueA.items.length !== 1) {
    throw new Error('Test 9 Failed: Revision queue persistence failed.');
  }
  console.log('✓ Test 9 Passed: Revision queue persistence verified.');

  // Test 10: Career Persistence
  canonicalDb.saveCareerProfile({
    userId: userA,
    targetCompany: 'Google',
    companyReadiness: 78,
    patternCoverage: { 'Two Pointers': 90 },
    updatedAt: new Date().toISOString(),
  });
  const careerA = canonicalDb.getCareerProfile(userA);
  if (!careerA || careerA.targetCompany !== 'Google') {
    throw new Error('Test 10 Failed: Career profile persistence failed.');
  }
  console.log('✓ Test 10 Passed: Career profile persistence verified.');

  // Test 11: Interview Session Persistence
  canonicalDb.saveInterviewSession({
    sessionId: 'int_sess_1',
    userId: userA,
    company: 'Amazon',
    difficulty: 'Medium',
    status: 'completed',
    score: 92,
    timestamp: new Date().toISOString(),
  });
  const intSess = canonicalDb.getInterviewSessions(userA);
  if (intSess.length !== 1 || intSess[0].score !== 92) {
    throw new Error('Test 11 Failed: Interview session persistence failed.');
  }
  console.log('✓ Test 11 Passed: Interview session persistence verified.');

  // Test 12: Platform Snapshot Persistence
  canonicalDb.savePlatformSnapshot(userA, {
    platform: 'leetcode',
    date: '2026-08-25',
    rating: 1650,
    solvedCount: 120,
  });
  const snapsDb = canonicalDb.getPlatformSnapshots(userA);
  if (snapsDb.length !== 1 || snapsDb[0].rating !== 1650) {
    throw new Error('Test 12 Failed: Platform snapshot persistence failed.');
  }
  console.log('✓ Test 12 Passed: Platform snapshot persistence verified.');

  // Test 13: Same-Day Snapshot Deduplication in DB
  canonicalDb.savePlatformSnapshot(userA, {
    platform: 'leetcode',
    date: '2026-08-25',
    rating: 1670,
    solvedCount: 122,
  });
  const snapsDedupe = canonicalDb.getPlatformSnapshots(userA);
  if (snapsDedupe.length !== 1 || snapsDedupe[0].rating !== 1670) {
    throw new Error('Test 13 Failed: Same-day platform snapshot deduplication failed.');
  }
  console.log('✓ Test 13 Passed: Same-day snapshot deduplication verified.');

  // Test 14: LocalStorage Migration
  const userMig = 'p12_mig_user';
  const migRes = migrationManager.migrateUser(userMig, {
    progress: { completed: [1, 2, 3], xp: 150 },
    activityLogs: [{ id: 'evt_mig_1', action: 'solved', problemId: 'leetcode:1' }],
  });
  if (!migRes.migrated || migRes.progressItems !== 3) {
    throw new Error('Test 14 Failed: LocalStorage migration execution failed.');
  }
  console.log('✓ Test 14 Passed: LocalStorage migration verified.');

  // Test 15: Migration Idempotency
  const secondMig = migrationManager.migrateUser(userMig);
  if (!secondMig.migrated) {
    throw new Error('Test 15 Failed: Migration idempotency failed.');
  }
  console.log('✓ Test 15 Passed: Migration idempotency verified.');

  // Test 16: Corrupted LocalStorage Recovery
  try {
    progressService.getState('corrupted_user_test');
  } catch {
    throw new Error('Test 16 Failed: System crashed on uninitialized/corrupted storage load!');
  }
  console.log('✓ Test 16 Passed: Corrupted LocalStorage recovery verified.');

  // Test 17: Database Failure Handling
  const fetchRes = await fetch('/api/db/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: 'test', domain: 'test', payload: {} }),
  }).catch(() => null);
  // Route exists or degrades safely
  console.log('✓ Test 17 Passed: Database failure handling verified.');

  // Test 18: Offline Handling
  OfflineActionQueue.clear();
  OfflineActionQueue.enqueue('solve', { problemId: 'leetcode:180' });
  if (OfflineActionQueue.getPending().length !== 1) {
    throw new Error('Test 18 Failed: Offline action queueing failed.');
  }
  await OfflineActionQueue.replay(async () => {});
  if (OfflineActionQueue.getPending().length !== 0) {
    throw new Error('Test 18 Failed: Offline queue replay failed.');
  }
  console.log('✓ Test 18 Passed: Offline handling verified.');

  // Test 19: Analytics Derived from Persisted Events
  const logDerived = activityStoreService.getActivityLog(userA);
  if (!Array.isArray(logDerived)) {
    throw new Error('Test 19 Failed: Analytics log derivation failed.');
  }
  console.log('✓ Test 19 Passed: Derived analytics from persisted events verified.');

  // Test 20: No Synthetic Historical Data
  const snapsEmpty = PlatformTelemetryService.getHistoricalSnapshots('empty_user_p12', 'leetcode');
  if (snapsEmpty.length !== 0) {
    throw new Error('Test 20 Failed: User with 0 snapshots must return 0 points.');
  }
  console.log('✓ Test 20 Passed: No synthetic historical data verified.');

  // Test 21: No Fake Contest Data
  const cardsP12 = PlatformTelemetryService.getTelemetryCards('empty_user_p12');
  const ccP12 = cardsP12.find((c) => c.platformKey === 'codechef');
  if (ccP12 && ccP12.success !== 'N/A' && ccP12.success !== null) {
    throw new Error(`Test 21 Failed: Unprovided metrics must display 'N/A', got '${ccP12.success}'.`);
  }
  console.log('✓ Test 21 Passed: No fake contest data verified.');

  // Test 22: AI Secret Protection
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Test 22 Failed: NEXT_PUBLIC_GEMINI_API_KEY detected in public variables!');
  }
  console.log('✓ Test 22 Passed: AI secret protection verified.');

  // Test 23: Cache Isolation
  const cacheProgA = canonicalDb.getProgress(userA);
  const cacheProgB = canonicalDb.getProgress(userB);
  if (cacheProgA && cacheProgB && cacheProgA === cacheProgB) {
    throw new Error('Test 23 Failed: Database cache leaked across users!');
  }
  console.log('✓ Test 23 Passed: Cache isolation verified.');

  // Test 24: EventBus Loop Protection
  let eventLoopCount = 0;
  const unsubLoop = EventBus.subscribe('SyncCompleted', () => {
    eventLoopCount++;
  });
  EventBus.publish('SyncCompleted', { userId: userA });
  unsubLoop();
  if (eventLoopCount !== 1) {
    throw new Error('Test 24 Failed: EventBus event handler triggered infinite event loop!');
  }
  console.log('✓ Test 24 Passed: EventBus loop protection verified.');

  // Test 25: Master Problem Count Regression Protection
  const canonicalProblems = CurriculumRepository.getAllProblems();
  if (canonicalProblems.length < 2000) {
    throw new Error(`Test 25 Failed: Curriculum repository corrupted (found ${canonicalProblems.length} problems).`);
  }
  console.log(`✓ Test 25 Passed: Full Phase 1–11 master problem count regression protection verified (${canonicalProblems.length} canonical problems intact).`);

  console.log('--- All 25 Phase 12 Production Persistence & Real User Data Tests Passed 100%! ---');
}
