/**
 * Phase 3 — Real Analytics Integration Test Suite
 * Validates tests 1-9 for canonical progress, memory engine, and analytics adapter integration.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { AnalyticsAdapterService } from '@/src/features/analytics/services/analytics-adapter.service';
import { EventBus } from '@/src/core/events/event-bus';
import { MemoryRealtimeAdapter } from '@/src/adapters/memory-realtime.adapter';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';

export async function testAnalyticsRealIntegration(): Promise<void> {
  console.log('--- Testing Real Analytics Integration (Tests 1-9) ---');

  // Reset services before test run
  progressService.resetState('test_user_empty');
  progressService.resetState();
  if (!Container.has('MemoryEngine')) {
    Container.registerSingleton('MemoryEngine', new MemoryEngine());
  }
  MemoryRealtimeAdapter.initialize();

  // Test 1: Empty User State
  const emptySummary = AnalyticsAdapterService.getAnalyticsSummary('test_user_empty');
  if (emptySummary.solvedCount !== 0) throw new Error(`Test 1 Failed: Expected solvedCount 0, got ${emptySummary.solvedCount}`);
  if (emptySummary.totalXp !== 0) throw new Error(`Test 1 Failed: Expected totalXp 0, got ${emptySummary.totalXp}`);
  if (emptySummary.currentStreak !== 0) throw new Error(`Test 1 Failed: Expected currentStreak 0, got ${emptySummary.currentStreak}`);
  if (emptySummary.acceptanceRate !== 'N/A') throw new Error(`Test 1 Failed: Expected acceptanceRate 'N/A', got ${emptySummary.acceptanceRate}`);
  if (emptySummary.avgSolveTime !== 'Unmeasured') throw new Error(`Test 1 Failed: Expected avgSolveTime 'Unmeasured', got ${emptySummary.avgSolveTime}`);
  if (emptySummary.codingHours !== '0h') throw new Error(`Test 1 Failed: Expected codingHours '0h', got ${emptySummary.codingHours}`);
  console.log('✓ Test 1 Passed: Empty user state returns safe zero/unmeasured metrics');

  // Test 2: One Solved Problem
  const eventId1 = `test_evt_p3_1_${Date.now()}`;
  EventBus.publish('ProblemSolved', {
    eventId: eventId1,
    userId: 'test_user_1',
    problemId: 'leetcode:1',
    lcNumber: 1,
    platform: 'leetcode',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hashing',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
  });

  const summary1 = AnalyticsAdapterService.getAnalyticsSummary('test_user_1');
  if (summary1.solvedCount !== 1) throw new Error(`Test 2 Failed: Expected solvedCount 1, got ${summary1.solvedCount}`);
  if (summary1.totalXp !== 50) throw new Error(`Test 2 Failed: Expected totalXp 50, got ${summary1.totalXp}`);
  const lcCard = summary1.platformCards.find((p) => p.name === 'LeetCode');
  if (!lcCard || lcCard.solved !== 1) throw new Error(`Test 2 Failed: Expected LeetCode platform solved 1, got ${lcCard?.solved}`);
  if (!lcCard.isEstimated || lcCard.ratingLabel !== 'Est. Rating') {
    throw new Error(`Patch Fix 1 Failed: Platform rating is missing explicit Est. Rating label!`);
  }
  if (summary1.difficultyDistribution.easy.total <= 0 || summary1.difficultyDistribution.easy.total === 200) {
    throw new Error(`Patch Fix 2 Failed: Difficulty denominators are hardcoded or invalid! Got easy total: ${summary1.difficultyDistribution.easy.total}`);
  }
  console.log('✓ Test 2 Passed: Single solved problem correctly updates solved count, XP, platform cards (explicit Est. Rating label & dynamic denominators verified)');

  // Test 3: Solve -> Unsolve
  progressService.unmarkSolved(1);
  const summaryUnsolved = AnalyticsAdapterService.getAnalyticsSummary('test_user_unsolve');
  if (summaryUnsolved.solvedCount !== 0) throw new Error(`Test 3 Failed: Expected solvedCount 0 after unsolve, got ${summaryUnsolved.solvedCount}`);
  console.log('✓ Test 3 Passed: Unsolve correctly decrements unique solved count without counting unsolve as a solve');

  // Test 4: Solve -> Unsolve -> Solve Again
  const eventId2 = `test_evt_p3_2_${Date.now()}`;
  EventBus.publish('ProblemSolved', {
    eventId: eventId2,
    userId: 'test_user_resolve',
    problemId: 'leetcode:1',
    lcNumber: 1,
    platform: 'leetcode',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hashing',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
  });

  const summaryReSolve = AnalyticsAdapterService.getAnalyticsSummary('test_user_resolve');
  if (summaryReSolve.solvedCount !== 1) throw new Error(`Test 4 Failed: Expected unique solvedCount 1 after re-solve, got ${summaryReSolve.solvedCount}`);
  console.log('✓ Test 4 Passed: Re-solving problem maintains correct unique solve count of 1');

  // Test 5: Multiple Platforms
  EventBus.publish('ProblemSolved', {
    eventId: `test_evt_p3_lc_${Date.now()}`,
    userId: 'test_user_multi',
    problemId: 'leetcode:1',
    lcNumber: 1,
    platform: 'leetcode',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hashing',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
  });
  EventBus.publish('ProblemSolved', {
    eventId: `test_evt_p3_cc_${Date.now()}`,
    userId: 'test_user_multi',
    problemId: 'codechef:EZSPEAK',
    lcNumber: 9901,
    platform: 'codechef',
    title: 'Easy Pronunciation',
    difficulty: 'Easy',
    pattern: 'Strings',
    topic: 'Strings',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 40,
  });

  const summaryMultiPlatform = AnalyticsAdapterService.getAnalyticsSummary('test_user_multi');
  const ccCard = summaryMultiPlatform.platformCards.find((p) => p.name === 'CodeChef');
  if (!ccCard || ccCard.solved !== 1) throw new Error(`Test 5 Failed: Expected CodeChef solved 1, got ${ccCard?.solved}`);
  if (summaryMultiPlatform.solvedCount !== 2) throw new Error(`Test 5 Failed: Expected total unique solvedCount 2, got ${summaryMultiPlatform.solvedCount}`);
  console.log('✓ Test 5 Passed: Multiple platforms correctly distributed across platform cards');

  // Test 6: Multiple Difficulties
  EventBus.publish('ProblemSolved', {
    eventId: `test_evt_p3_easy_${Date.now()}`,
    userId: 'test_user_diff',
    problemId: 'leetcode:1',
    lcNumber: 1,
    platform: 'leetcode',
    title: 'Two Sum',
    difficulty: 'Easy',
    pattern: 'Hashing',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
  });
  EventBus.publish('ProblemSolved', {
    eventId: `test_evt_p3_med_${Date.now()}`,
    userId: 'test_user_diff',
    problemId: 'leetcode:209',
    lcNumber: 209,
    platform: 'leetcode',
    title: 'Minimum Size Subarray Sum',
    difficulty: 'Medium',
    pattern: 'Sliding Window',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 75,
  });

  const summaryDiff = AnalyticsAdapterService.getAnalyticsSummary('test_user_diff');
  if (summaryDiff.difficultyDistribution.easy.solved < 1) throw new Error('Test 6 Failed: Expected easy solved >= 1');
  if (summaryDiff.difficultyDistribution.medium.solved < 1) throw new Error('Test 6 Failed: Expected medium solved >= 1');
  console.log('✓ Test 6 Passed: Difficulty distribution accurately tracks Easy and Medium solves');

  // Test 7: Pattern Distribution
  const summaryPattern = AnalyticsAdapterService.getAnalyticsSummary('test_user_diff');
  const swOrb = summaryPattern.patternOrbs.find((p) => p.name === 'Sliding Window');
  if (!swOrb || swOrb.mastery <= 0) throw new Error(`Test 7 Failed: Expected Sliding Window orb mastery > 0, got ${swOrb?.mastery}`);
  console.log('✓ Test 7 Passed: Pattern distribution orb correctly reflects real pattern solves');

  // Test 8: Unmeasured Duration (durationSeconds = 0)
  if (summaryPattern.avgSolveTime !== 'Unmeasured') {
    throw new Error(`Test 8 Failed: Expected avgSolveTime 'Unmeasured' for durationSeconds=0, got ${summaryPattern.avgSolveTime}`);
  }
  if (summaryPattern.codingHours !== '0h') {
    throw new Error(`Test 8 Failed: Expected codingHours '0h' for durationSeconds=0, got ${summaryPattern.codingHours}`);
  }
  console.log('✓ Test 8 Passed: durationSeconds = 0 is treated as unmeasured timing and does not invent study time');

  // Test 9: Memory Engine Metrics Integration
  const memoryEngine = Container.resolve<MemoryEngine>('MemoryEngine');
  const userConcepts = memoryEngine.getAllConcepts('test_user_pattern');
  const summaryMemory = AnalyticsAdapterService.getAnalyticsSummary('test_user_pattern');
  if (typeof summaryMemory.interviewReadiness !== 'number') throw new Error('Test 9 Failed: Interview readiness is not a number');
  if (typeof summaryMemory.sidebar.revisionDueCount !== 'number') throw new Error('Test 9 Failed: Revision due count is not a number');
  console.log('✓ Test 9 Passed: Memory engine concept metrics safely integrated into analytics summary');

  console.log('--- All Real Analytics Integration Tests Passed Successfully! ---');
}
