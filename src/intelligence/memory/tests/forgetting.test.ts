/**
 * Unit Test: Forgetting Decay Engine & Ebbinghaus Curves
 */

import { ForgettingEngine } from '../engine/forgetting.engine';
import { ConceptMemory } from '../models/memory.models';

export function testForgettingEngine(): void {
  console.log('--- Testing Forgetting Decay Engine & Ebbinghaus Curves ---');

  // 1. Zero days decay (R(0) = 1.0)
  const r0 = ForgettingEngine.calculateRecallProbability(0, 10);
  if (r0 !== 1.0) {
    throw new Error(`Expected recall probability 1.0 at day 0, got ${r0}`);
  }

  // 2. Decay at elapsed = stability (R(S) = exp(-1) = 0.3679)
  const rS = ForgettingEngine.calculateRecallProbability(10, 10);
  if (rS < 0.35 || rS > 0.38) {
    throw new Error(`Expected recall probability ~0.3679 at elapsed=stability, got ${rS}`);
  }
  console.log(`[PASS] Ebbinghaus decay curve calculation verified (R(S) = ${rS}).`);

  // 3. Forgetting risk evaluation
  const mockConcept: ConceptMemory = {
    conceptId: 'c-test',
    userId: 'u1',
    topic: 'Math',
    pattern: 'GCD',
    state: 'Learning',
    masteryScore: 50,
    memoryStrength: 50,
    stabilityScore: 2.0,
    retentionRate: 70,
    forgettingRisk: 30,
    reviewCount: 1,
    successfulReviews: 1,
    failedReviews: 0,
    firstLearned: new Date(Date.now() - 10 * 24 * 3600 * 1000).toISOString(),
    lastReviewed: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(),
    nextReview: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    estimatedRecallProbability: 0.1,
  };

  const riskReport = ForgettingEngine.evaluateRisk(mockConcept);
  if (riskReport.urgency !== 'Critical' || riskReport.forgettingRisk < 70) {
    throw new Error(`Expected Critical urgency and high risk for overdue concept, got ${riskReport.urgency}`);
  }
  console.log(`[PASS] Overdue concept evaluated as Critical risk (${riskReport.forgettingRisk}% risk).`);
}
