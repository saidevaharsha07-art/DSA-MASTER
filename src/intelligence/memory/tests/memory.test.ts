/**
 * Unit Test: Memory Engine & State Machine
 */

import { MemoryEngine } from '../engine/memory.engine';
import { MemoryStateMachine } from '../engine/memory.state-machine';
import { ConceptMemory } from '../models/memory.models';

export function testMemoryEngine(): void {
  console.log('--- Testing Memory Engine & State Machine ---');
  const engine = new MemoryEngine();

  // 1. Initial state test
  let concept = engine.getConcept('user-mem-1', 'concept-arrays');
  if (concept) {
    throw new Error('Expected concept to be undefined initially.');
  }

  // 2. Process first review (New -> Learning)
  concept = engine.processReview('user-mem-1', 'concept-arrays', 'success');
  if (concept.state !== 'Learning' || concept.reviewCount !== 1) {
    throw new Error(`Expected state 'Learning', got '${concept.state}'`);
  }
  console.log('[PASS] First review state transition (New -> Learning) verified.');

  // 3. Process multiple reviews to reach Stable state
  concept = engine.processReview('user-mem-1', 'concept-arrays', 'success');
  concept = engine.processReview('user-mem-1', 'concept-arrays', 'success');

  if (concept.stabilityScore <= 1.0) {
    throw new Error('Expected stabilityScore to increase after successive successful reviews.');
  }
  console.log(`[PASS] Stability growth verified (New stability: ${concept.stabilityScore} days).`);

  // 4. Memory Health report test
  const health = engine.getMemoryHealth('user-mem-1');
  if (health.totalConceptsTracked !== 1 || health.overallMemoryScore <= 0) {
    throw new Error('Memory health report generation failed!');
  }
  console.log(`[PASS] MemoryHealthReport generated (Overall Score: ${health.overallMemoryScore}/100).`);
}
