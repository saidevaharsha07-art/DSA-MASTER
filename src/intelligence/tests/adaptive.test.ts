/**
 * Unit Test: Adaptive Practice Engine & Strategies
 */

import { AdaptiveEngine } from '../adaptive/adaptive.engine';
import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '../analyzers/strength.analyzer';
import { ProfileService } from '../services/profile.service';
import { PracticeAttempt } from '../models/practice-history';

export async function testAdaptiveEngine(): Promise<void> {
  console.log('--- Testing Adaptive Practice Engine & Strategies ---');
  const profileService = new ProfileService();

  const attempts: PracticeAttempt[] = [
    {
      id: 'a1',
      userId: 'user-adapt-1',
      problemId: 'P1',
      platform: 'codechef',
      status: 'wrong_answer',
      timestamp: '2026-07-29T10:00:00Z',
      durationSeconds: 300,
      xpEarned: 0,
      hintsUsed: 1,
      topic: 'Bit Manipulation',
      pattern: 'XOR Properties',
      difficulty: 'Medium',
    },
  ];

  for (const att of attempts) {
    await profileService.recordAttempt(att);
  }

  const profile = await profileService.getProfile('user-adapt-1');
  const weakness = WeaknessAnalyzer.analyze(attempts, profile);
  const strength = StrengthAnalyzer.analyze(attempts, profile);

  const engine = new AdaptiveEngine();

  // 1. Session generation using Weakness First Strategy
  const { session, explanation } = engine.generateSession(profile, weakness, strength, 'Weakness First');
  if (!session || session.selectedProblems.length === 0) {
    throw new Error('AdaptiveEngine failed to generate session!');
  }
  if (session.strategyName !== 'Weakness First') {
    throw new Error(`Expected strategy 'Weakness First', got '${session.strategyName}'`);
  }
  if (!explanation.reasoning || explanation.confidenceScore <= 0) {
    throw new Error('Adaptive engine decision explanation invalid!');
  }
  console.log(`[PASS] Weakness First strategy session generated (${session.selectedProblems.length} problems).`);

  // 2. Strategy switching test (Balanced Learning)
  const { session: balancedSession } = engine.generateSession(profile, weakness, strength, 'Balanced Learning');
  if (balancedSession.strategyName !== 'Balanced Learning') {
    throw new Error('Strategy switching failed!');
  }
  console.log('[PASS] Strategy switching to Balanced Learning verified.');

  // 3. Progression Engine test
  const decision = engine.evaluateProgression(profile, weakness, 'Bit Manipulation', 'Medium');
  if (!decision.action || !decision.reasoning) {
    throw new Error('ProgressionEngine return structure invalid!');
  }
  console.log(`[PASS] Progression decision calculated: ${decision.action} (${decision.reasoning})`);
}
