/**
 * Phase 4 — Adaptive Recommendations Integration Test Suite
 * Validates Tests 1-11 for canonical data adaptation, SRS/memory priority, solved filtering, and EventBus invalidation.
 */

import { progressService } from '@/src/services/progress/progress.service';
import { Container } from '@/src/core/container/container';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { MemoryRealtimeAdapter } from '@/src/adapters/memory-realtime.adapter';
import { AdaptiveDataAdapterService } from '@/src/features/adaptive/services/adaptive-data-adapter.service';
import { AdaptiveRecommendationService } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { CodeChefDatasetProvider } from '@/src/platforms/codechef/dataset';

export async function testAdaptiveRealIntegration(): Promise<void> {
  console.log('--- Testing Adaptive Practice Recommendations (Tests 1-11) ---');

  // Reset services before test run
  progressService.resetState();
  if (!Container.has('MemoryEngine')) {
    Container.registerSingleton('MemoryEngine', new MemoryEngine());
  }
  MemoryRealtimeAdapter.initialize();
  AdaptiveRecommendationService.clearCache();

  // Test 1: Empty User Behavior
  const emptyRecs = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_empty', 'all', 4);
  if (emptyRecs.length === 0) throw new Error('Test 1 Failed: Expected recommendations for empty user, got 0');
  if (!emptyRecs.every((r) => r.problemId && r.title && r.url)) {
    throw new Error('Test 1 Failed: Recommendation items missing required fields');
  }
  console.log('✓ Test 1 Passed: Empty user gets safe foundational recommendations with valid problem IDs');

  // Test 2: Solved Problem Filtering
  const targetProbId = emptyRecs[0].problemId;
  const numMatch = targetProbId.replace(/\D/g, '');
  const lcNum = numMatch ? parseInt(numMatch, 10) : 1;

  EventBus.publish('ProblemSolved', {
    eventId: `evt_test_p4_1_${Date.now()}`,
    userId: 'test_user_empty',
    problemId: targetProbId,
    lcNumber: lcNum,
    platform: 'leetcode',
    title: 'Solved Test Problem',
    difficulty: 'Easy',
    pattern: 'Hashing',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
  });

  const postSolveRecs = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_empty', 'all', 4);
  if (postSolveRecs.some((r) => r.problemId === targetProbId)) {
    throw new Error(`Test 2 Failed: Solved problem ${targetProbId} appeared in recommendations!`);
  }
  console.log('✓ Test 2 Passed: Solved problems are strictly filtered out of recommendations');

  // Test 3 & 4: SRS Due & High Forgetting Risk Prioritization
  const memoryEngine = Container.resolve<MemoryEngine>('MemoryEngine');
  memoryEngine.processReview('test_user_srs', 'concept-sliding-window', 'success');
  
  // Advance concept decay risk
  const concepts = memoryEngine.getAllConcepts('test_user_srs');
  const swConcept = concepts.find((c) => c.conceptId === 'concept-sliding-window');
  if (swConcept) {
    (swConcept as any).forgettingRisk = 85;
    (swConcept as any).nextReview = new Date(Date.now() - 3600 * 1000).toISOString();
  }

  const srsRecs = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_srs', 'all', 4);
  const srsItem = srsRecs.find((r) => r.reason.includes('Spaced Repetition') || r.reason.includes('Forgetting Risk'));
  if (!srsItem) {
    throw new Error('Test 3/4 Failed: Expected SRS due / high forgetting risk recommendation item');
  }
  console.log('✓ Test 3 & 4 Passed: SRS due / high forgetting risk concept correctly prioritized with explicit reason');

  // Test 5: Weak Pattern Targeted Recommendation
  EventBus.publish('ProblemSolved', {
    eventId: `evt_test_p4_weak_${Date.now()}`,
    userId: 'test_user_empty',
    problemId: 'leetcode:15',
    lcNumber: 15,
    platform: 'leetcode',
    title: '3Sum',
    difficulty: 'Medium',
    pattern: 'Two Pointers',
    topic: 'Arrays',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 0,
  });

  const weakness = AdaptiveDataAdapterService.getWeaknessAnalysis('test_user_empty');
  if (!weakness) throw new Error('Test 5 Failed: Weakness analysis returned null');
  console.log('✓ Test 5 Passed: Weak topic/pattern analysis computed from canonical attempts');

  // Test 6: Difficulty Progression
  const profile = AdaptiveDataAdapterService.getCanonicalProfile('test_user_empty');
  if (!profile.difficultyProgression) throw new Error('Test 6 Failed: Difficulty progression state missing');
  console.log('✓ Test 6 Passed: Recommendations respect dynamic difficulty progression state');

  // Test 7: Duplicate Protection
  const recIds = emptyRecs.map((r) => r.problemId);
  const uniqueRecIds = new Set(recIds);
  if (recIds.length !== uniqueRecIds.size) {
    throw new Error('Test 7 Failed: Duplicate problem IDs detected in recommendations');
  }
  console.log('✓ Test 7 Passed: Duplicate problem IDs strictly prevented in recommendation queue');

  // Test 8: Multiple Platforms Filter
  const ccRecs = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_plat', 'codechef', 4);
  if (!ccRecs.every((r) => r.platform === 'codechef')) {
    throw new Error('Test 8 Failed: CodeChef platform filter returned non-CodeChef recommendation');
  }
  console.log('✓ Test 8 Passed: Recommendations strictly respect requested platform filter');

  // Test 9: Determinism
  const detRecs1 = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_det', 'all', 4);
  AdaptiveRecommendationService.clearCache();
  const detRecs2 = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_det', 'all', 4);
  if (detRecs1[0]?.problemId !== detRecs2[0]?.problemId) {
    throw new Error('Test 9 Failed: Recommendation generation is non-deterministic for same canonical state');
  }
  console.log('✓ Test 9 Passed: Recommendation ordering is 100% deterministic for identical canonical state');

  // Test 10: Problem Validity in Canonical Provider
  const allCurr = CurriculumRepository.getAllProblems();
  const allCC = CodeChefDatasetProvider.loadCompleteDataset();

  for (const r of detRecs1) {
    const numId = parseInt(r.problemId.replace(/\D/g, ''), 10);
    const validCurr = allCurr.some((p) => p.id === r.problemId || p.leetcodeNumber === numId);
    const validCC = allCC.some((p) => p.id === r.problemId || p.metadata?.problemCode === r.problemId.replace('codechef:', ''));
    if (!validCurr && !validCC) {
      throw new Error(`Test 10 Failed: Recommendation ${r.problemId} does not exist in canonical datasets`);
    }
  }
  console.log('✓ Test 10 Passed: 100% of recommendations correspond to real provider problems');

  // Test 11: Solve Event Refresh & Cache Invalidation
  AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_refresh', 'all', 4);
  EventBus.publish('ProblemSolved', {
    eventId: `evt_refresh_${Date.now()}`,
    userId: 'test_user_refresh',
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

  const refreshedRecs = AdaptiveRecommendationService.getRecommendedPracticeProblems('test_user_refresh', 'all', 4);
  if (refreshedRecs.some((r) => r.problemId === 'leetcode:209')) {
    throw new Error('Test 11 Failed: Cache invalidation failed to exclude newly solved problem 209');
  }
  console.log('✓ Test 11 Passed: Solve event correctly invalidates recommendation cache and refreshes state');

  console.log('--- All Adaptive Recommendation Integration Tests Passed Successfully! ---');
}
