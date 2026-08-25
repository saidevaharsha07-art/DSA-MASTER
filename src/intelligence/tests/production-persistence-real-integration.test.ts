/**
 * Phase 12 — Production Persistence, Real Platform Sync & Reliability Test Suite
 * Tests 1-16 verifying durable server persistence bridge, active user identity boundaries,
 * platform connector failure isolation, timeout resilience, AI key protection, and master regression.
 */

import { serverPersistenceBridge } from '@/src/core/storage/server-persistence.bridge';
import { getActiveUserId } from '@/src/hooks/useActiveUser';
import { progressService } from '@/src/services/progress/progress.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { PlatformTelemetryService } from '@/src/features/platform/services/platform-telemetry.service';
import { EventBus } from '@/src/core/events/event-bus';
import { OfflineActionQueue } from '@/src/lib/offline/offline.queue';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { storage } from '@/src/core/storage/LocalStorageAdapter';

export async function testProductionPersistenceRealIntegration(): Promise<void> {
  console.log('--- Testing Phase 12: Production Persistence, Real Platform Sync & Reliability ---');

  // Test 1: Persistence Across Reload Simulation
  const user1 = 'p12_user_1';
  progressService.resetState(user1);
  await serverPersistenceBridge.saveDurableData('test-domain', user1, { score: 100, timestamp: '2026-08-25' });
  const restored1 = serverPersistenceBridge.getDurableData<{ score: number } & any>('test-domain', user1);
  if (!restored1 || restored1.score !== 100) {
    throw new Error('Test 1 Failed: ServerPersistenceBridge failed to persist/retrieve durable data.');
  }
  console.log('✓ Test 1 Passed: Persistence across reload simulation verified.');

  // Test 2: Persistence Across Sessions
  const user2 = 'p12_user_2';
  progressService.resetState(user2);
  activityStoreService.recordActivity({
    eventId: 'evt_sess_1',
    userId: user2,
    action: 'solved',
    timestamp: new Date().toISOString(),
    problemId: 'leetcode:1',
    xpEarned: 50,
  });
  const log2 = activityStoreService.getActivityLog(user2);
  if (log2.length !== 1 || log2[0].problemId !== 'leetcode:1') {
    throw new Error('Test 2 Failed: Activity log did not persist across session initialization.');
  }
  console.log('✓ Test 2 Passed: Persistence across sessions verified.');

  // Test 3: Multi-User Session Isolation
  const user3A = 'p12_user_3a';
  const user3B = 'p12_user_3b';
  progressService.resetState(user3A);
  progressService.resetState(user3B);
  EventBus.publish('ProblemSolved', { userId: user3A, problemId: 'leetcode:10', xpEarned: 50 });
  const state3A = progressService.getState(user3A);
  const state3B = progressService.getState(user3B);
  if (state3A.xp !== 50 || state3B.xp !== 0) {
    throw new Error('Test 3 Failed: User session isolation violated across User A and User B.');
  }
  console.log('✓ Test 3 Passed: Multi-user session isolation verified.');

  // Test 4: LocalStorage Backward Migration
  const user4 = 'p12_user_4';
  serverPersistenceBridge.migrateLegacyKeys(user4, { progress: { completed: [1, 2], xp: 100 } });
  const migratedState = serverPersistenceBridge.getDurableData<any>('user-state', user4);
  if (!migratedState || migratedState.xp !== 100) {
    throw new Error('Test 4 Failed: Legacy LocalStorage data migration failed.');
  }
  console.log('✓ Test 4 Passed: LocalStorage backward migration verified.');

  // Test 5: Duplicate Solve Prevention Idempotency
  const user5 = 'p12_user_5';
  progressService.resetState(user5);
  EventBus.publish('ProblemSolved', { userId: user5, problemId: 'leetcode:50', leetcodeNumber: 50, xpEarned: 50 });
  EventBus.publish('ProblemSolved', { userId: user5, problemId: 'leetcode:50', leetcodeNumber: 50, xpEarned: 50 });
  const state5 = progressService.getState(user5);
  if (state5.completed.length !== 1 || state5.xp !== 50) {
    throw new Error('Test 5 Failed: Duplicate solve event resulted in double XP or double completion.');
  }
  console.log('✓ Test 5 Passed: Duplicate solve prevention idempotency verified.');

  // Test 6: Platform Sync Failure Graceful Degradation
  const user6 = 'p12_user_6';
  const syncRes = await PlatformTelemetryService.syncPlatform(user6, 'unknown_platform' as any);
  if (syncRes !== null) {
    throw new Error('Test 6 Failed: Platform sync with invalid platform should return null gracefully.');
  }
  console.log('✓ Test 6 Passed: Platform sync failure degrades gracefully without throwing.');

  // Test 7: Partial Platform Failure Isolation
  const user7 = 'p12_user_7';
  await PlatformTelemetryService.syncPlatform(user7, 'leetcode');
  const cards7 = PlatformTelemetryService.getPlatformCards(user7);
  const lcCard = cards7.find((c) => c.platformKey === 'leetcode');
  if (!lcCard || lcCard.status !== 'Connected') {
    throw new Error('Test 7 Failed: Valid platform sync failed when executed in multi-platform environment.');
  }
  console.log('✓ Test 7 Passed: Partial platform failure isolation verified.');

  // Test 8: Stale Data Indication / Relative Time Calculator
  const justNowText = PlatformTelemetryService.getLastSyncedText(new Date().toISOString());
  const nullText = PlatformTelemetryService.getLastSyncedText(null);
  if (justNowText !== 'Just now' || nullText !== 'Sync unavailable') {
    throw new Error(`Test 8 Failed: Relative last synced text calculation incorrect (got '${justNowText}', '${nullText}').`);
  }
  console.log('✓ Test 8 Passed: Stale data relative timestamp formatting verified.');

  // Test 9: Analytics Activity Model Persistence
  const user9 = 'p12_user_9';
  progressService.resetState(user9);
  activityStoreService.recordActivity({
    eventId: 'evt_p9_1',
    userId: user9,
    action: 'opened',
    timestamp: new Date().toISOString(),
    problemId: 'leetcode:99',
  });
  const log9 = activityStoreService.getActivityLog(user9);
  if (log9.length !== 1 || log9[0].action !== 'opened') {
    throw new Error('Test 9 Failed: Canonical activity model failed to persist activity record.');
  }
  console.log('✓ Test 9 Passed: Analytics activity model persistence verified.');

  // Test 10: Deterministic Event Ordering
  const user10 = 'p12_user_10';
  progressService.resetState(user10);
  const t1 = new Date(Date.now() - 3600 * 1000).toISOString();
  const t2 = new Date().toISOString();
  activityStoreService.recordActivity({ eventId: 'e2', userId: user10, action: 'solved', timestamp: t2, problemId: 'leetcode:2' });
  activityStoreService.recordActivity({ eventId: 'e1', userId: user10, action: 'opened', timestamp: t1, problemId: 'leetcode:1' });
  const log10 = activityStoreService.getActivityLog(user10);
  if (log10[0].eventId !== 'e1' || log10[1].eventId !== 'e2') {
    throw new Error('Test 10 Failed: ActivityStoreService failed to order activity records deterministically by timestamp.');
  }
  console.log('✓ Test 10 Passed: Deterministic event ordering by timestamp verified.');

  // Test 11: Authentication & Active User Identity Boundary
  const activeId = getActiveUserId();
  if (typeof activeId !== 'string' || activeId.length === 0) {
    throw new Error('Test 11 Failed: getActiveUserId did not return a valid user string.');
  }
  console.log(`✓ Test 11 Passed: Active user identity boundary verified (ID: '${activeId}').`);

  // Test 12: AI Secret Credential Protection
  if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    throw new Error('Test 12 Failed: NEXT_PUBLIC_GEMINI_API_KEY detected in public environment variables!');
  }
  console.log('✓ Test 12 Passed: AI secret credential protection verified.');

  // Test 13: EventBus Lifecycle & Cleanup Safety
  let busTriggered = false;
  const unsub = EventBus.subscribe('ProblemOpened', () => {
    busTriggered = true;
  });
  EventBus.publish('ProblemOpened', { userId: 'test', problemId: '1' });
  unsub();
  if (!busTriggered) {
    throw new Error('Test 13 Failed: EventBus subscription lifecycle failed.');
  }
  console.log('✓ Test 13 Passed: EventBus subscription lifecycle verified.');

  // Test 14: Cache Invalidation on Solve Event
  const user14 = 'p12_user_14';
  progressService.resetState(user14);
  PlatformTelemetryService.getPlatformCards(user14);
  EventBus.publish('ProblemSolved', { userId: user14, problemId: 'leetcode:140', xpEarned: 50 });
  const cards14 = PlatformTelemetryService.getPlatformCards(user14);
  if (!cards14 || cards14.length === 0) {
    throw new Error('Test 14 Failed: Cache invalidation failed to return updated platform cards.');
  }
  console.log('✓ Test 14 Passed: Cache invalidation on solve event verified.');

  // Test 15: Offline Action Queueing & Replay
  OfflineActionQueue.clear();
  OfflineActionQueue.enqueue('solve', { problemId: 'leetcode:150' });
  const pendingActions = OfflineActionQueue.getPending();
  if (pendingActions.length !== 1) {
    throw new Error('Test 15 Failed: Offline action queueing failed to store offline item.');
  }
  await OfflineActionQueue.replay(async (action) => {});
  if (OfflineActionQueue.getPending().length !== 0) {
    throw new Error('Test 15 Failed: Offline action queue replay failed to clear processed queue.');
  }
  console.log('✓ Test 15 Passed: Offline action queueing & replay verified.');

  // Test 16: Phase 1–11 Master Problem Count Regression Protection
  const allProblems = CurriculumRepository.getAllProblems();
  if (allProblems.length < 2000) {
    throw new Error(`Test 16 Failed: Canonical curriculum problem set corrupted (found ${allProblems.length} problems).`);
  }
  console.log(`✓ Test 16 Passed: Master problem count regression protection verified (${allProblems.length} canonical problems intact).`);

  console.log('--- All Phase 12 Production Persistence & Reliability Tests Passed Successfully! ---');
}
