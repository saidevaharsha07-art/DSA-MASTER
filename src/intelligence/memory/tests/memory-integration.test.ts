/**
 * Unit & Integration Test: Phase 2 Memory & SRS Event Integration
 */

import { EventBus } from '@/src/core/events/event-bus';
import { MemoryRealtimeAdapter } from '@/src/adapters/memory-realtime.adapter';
import { MemoryEngine } from '@/src/intelligence/memory/engine/memory.engine';
import { testMemoryEngine } from './memory.test';
import { testForgettingEngine } from './forgetting.test';
import { testReviewScheduler } from './review.test';

export async function testMemoryEventIntegration(): Promise<void> {
  console.log('--- Testing Phase 2 Memory & SRS Event Integration ---');

  MemoryRealtimeAdapter.initialize();
  MemoryRealtimeAdapter.resetDeduplicationForTests();
  const engine = MemoryRealtimeAdapter.memoryEngine;

  // Test 1: ProblemSolved with valid pattern/concept
  const initialConcept = engine.getConcept('default_user', 'concept-sliding-window');
  const initialReviewCount = initialConcept ? initialConcept.reviewCount : 0;

  EventBus.publish('ProblemSolved', {
    id: 'attempt_mem_test_001',
    userId: 'default_user',
    problemId: 'leetcode:209',
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
    topic: 'Two Pointers',
    pattern: 'Sliding Window',
    difficulty: 'Medium',
  });

  const updatedConcept = engine.getConcept('default_user', 'concept-sliding-window');
  if (!updatedConcept) {
    throw new Error('[FAIL] Test 1: ConceptMemory concept-sliding-window was not created/updated!');
  }
  if (updatedConcept.reviewCount !== initialReviewCount + 1) {
    throw new Error(`[FAIL] Test 1: Expected reviewCount ${initialReviewCount + 1}, got ${updatedConcept.reviewCount}`);
  }
  console.log('[PASS] Test 1: ProblemSolved mapped to concept-sliding-window and updated ConceptMemory.');

  // Test 2: ProblemSolved without resolvable concept
  const totalConceptsBefore = engine.getAllConcepts('default_user').length;

  EventBus.publish('ProblemSolved', {
    id: 'attempt_mem_test_002',
    userId: 'default_user',
    problemId: '',
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
    topic: 'General',
    pattern: 'General',
    difficulty: 'Easy',
  });

  const totalConceptsAfter = engine.getAllConcepts('default_user').length;
  if (totalConceptsAfter !== totalConceptsBefore) {
    throw new Error('[FAIL] Test 2: Unmapped ProblemSolved event created fake concept data!');
  }
  console.log('[PASS] Test 2: ProblemSolved without resolvable concept handled safely without fake data.');

  // Test 3: Duplicate ProblemSolved (Idempotency)
  const reviewCountBeforeDuplicate = updatedConcept.reviewCount;

  EventBus.publish('ProblemSolved', {
    id: 'attempt_mem_test_001', // Same event ID
    userId: 'default_user',
    problemId: 'leetcode:209',
    platform: 'leetcode',
    status: 'accepted',
    timestamp: new Date().toISOString(),
    durationSeconds: 0,
    xpEarned: 50,
    topic: 'Two Pointers',
    pattern: 'Sliding Window',
    difficulty: 'Medium',
  });

  const conceptAfterDuplicate = engine.getConcept('default_user', 'concept-sliding-window');
  if (conceptAfterDuplicate?.reviewCount !== reviewCountBeforeDuplicate) {
    throw new Error('[FAIL] Test 3: Duplicate ProblemSolved event triggered extra memory review!');
  }
  console.log('[PASS] Test 3: Duplicate ProblemSolved event protection (idempotency) verified.');

  // Test 4: Existing Memory Mathematics Tests
  testMemoryEngine();
  testForgettingEngine();
  testReviewScheduler();
  console.log('[PASS] Test 4: Existing Memory & SRS mathematical engine test suites passed unchanged.');

  // Test 5: Revision Queue Visibility
  const queue = engine.getRevisionQueue('default_user');
  if (!Array.isArray(queue)) {
    throw new Error('[FAIL] Test 5: Revision queue is not readable after memory update!');
  }
  console.log(`[PASS] Test 5: SRS Revision queue verified (${queue.length} items queued for revision).`);
}
