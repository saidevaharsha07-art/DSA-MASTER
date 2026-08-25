/**
 * Unit Test: Recommendation & Practice Engines (Explainability & Consistency)
 */

import { RecommendationEngine } from '../recommendations/recommendation.engine';
import { PracticeEngine } from '../recommendations/practice.engine';
import { NextProblemEngine } from '../recommendations/next-problem.engine';
import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '../analyzers/strength.analyzer';
import { ProfileService } from '../services/profile.service';
import { PracticeAttempt } from '../models/practice-history';

export async function testRecommendations(): Promise<void> {
  console.log('--- Testing Recommendation Engines (Explainability & Consistency) ---');
  const profileService = new ProfileService();

  const sampleAttempts: PracticeAttempt[] = [
    {
      id: 'a1',
      userId: 'user-rec-1',
      problemId: 'BIT1',
      platform: 'codechef',
      status: 'wrong_answer',
      timestamp: '2026-07-29T10:00:00Z',
      durationSeconds: 300,
      xpEarned: 0,
      hintsUsed: 1,
      topic: 'Bit Manipulation',
      pattern: 'Basic Bit Operations',
      difficulty: 'Medium',
    },
    {
      id: 'a2',
      userId: 'user-rec-1',
      problemId: 'BIT1',
      platform: 'codechef',
      status: 'wrong_answer',
      timestamp: '2026-07-29T10:10:00Z',
      durationSeconds: 300,
      xpEarned: 0,
      hintsUsed: 2,
      topic: 'Bit Manipulation',
      pattern: 'Basic Bit Operations',
      difficulty: 'Medium',
    },
  ];

  for (const att of sampleAttempts) {
    await profileService.recordAttempt(att);
  }

  const profile = await profileService.getProfile('user-rec-1');
  const weakness = WeaknessAnalyzer.analyze(sampleAttempts, profile);
  const strength = StrengthAnalyzer.analyze(sampleAttempts, profile);

  // 1. Recommendation Engine explainable cards check
  const recEngine = new RecommendationEngine();
  const cards = recEngine.generateRecommendations(weakness, strength);

  if (!cards || cards.length === 0) {
    throw new Error('RecommendationEngine failed to generate recommendation cards!');
  }

  for (const card of cards) {
    if (!card.reason || typeof card.reason !== 'string' || card.reason.trim() === '') {
      throw new Error(`Recommendation card '${card.id}' is missing explainable reason!`);
    }
    if (card.confidenceScore < 0 || card.confidenceScore > 100) {
      throw new Error(`Recommendation card '${card.id}' confidenceScore out of bounds: ${card.confidenceScore}`);
    }
  }
  console.log(`[PASS] Generated ${cards.length} explainable recommendation cards with confidence scores.`);

  // 2. Practice Engine test
  const practiceEngine = new PracticeEngine();
  const pset = practiceEngine.generatePracticeSet(profile, { platform: 'codechef', topic: 'Arrays', difficulty: 'Easy' });

  if (!pset.problemIds || pset.problemIds.length === 0) {
    throw new Error('PracticeEngine failed to generate problem set!');
  }
  if (!pset.rationale || pset.rationale.trim() === '') {
    throw new Error('PracticeEngine recommendation set missing rationale!');
  }
  console.log(`[PASS] Generated practice set '${pset.title}' (${pset.problemIds.length} problems).`);

  // 3. Next Problem Engine test
  const nextEngine = new NextProblemEngine();
  const nextProb = nextEngine.selectNextProblem(profile, weakness, 'codechef');

  if (!nextProb) {
    throw new Error('NextProblemEngine failed to select next problem!');
  }
  console.log(`[PASS] Selected optimal next problem: ${nextProb.id} - ${nextProb.title}`);
}
