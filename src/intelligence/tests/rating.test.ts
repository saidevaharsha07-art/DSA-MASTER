/**
 * Unit Test: Rating Normalization & Deterministic Predictor
 */

import { RatingEngine } from '../ratings/rating.engine';
import { ContestRecord } from '../contests/contest.models';

export function testRatingEngine(): void {
  console.log('--- Testing Rating Engine & Deterministic Predictor ---');
  const engine = new RatingEngine();

  // 1. Rating Normalization test
  const cfNorm = engine.normalizeRating('codeforces', 1500);
  if (cfNorm.normalizedScore <= 0 || cfNorm.division !== 'Specialist (Div. 2)') {
    throw new Error(`Codeforces rating normalization failed! Division: ${cfNorm.division}`);
  }

  const ccNorm = engine.normalizeRating('codechef', 1650);
  if (ccNorm.normalizedScore <= 0 || ccNorm.division !== '3★ (Div. 2)') {
    throw new Error(`CodeChef rating normalization failed! Division: ${ccNorm.division}`);
  }
  console.log('[PASS] Codeforces & CodeChef rating normalization verified.');

  // 2. Deterministic Rating Prediction test
  const mockRecords: ContestRecord[] = [
    {
      id: 'c1',
      platform: 'codechef',
      contestId: 'START98',
      name: 'Starters 98',
      date: '2026-07-20T14:30:00Z',
      durationMinutes: 120,
      lifecycleState: 'completed',
      rank: 500,
      totalParticipants: 4000,
      ratingBefore: 1400,
      ratingAfter: 1430,
      ratingChange: 30,
      solvedCount: 3,
      attemptedCount: 4,
      penaltiesMinutes: 0,
    },
    {
      id: 'c2',
      platform: 'codechef',
      contestId: 'START99',
      name: 'Starters 99',
      date: '2026-07-25T14:30:00Z',
      durationMinutes: 120,
      lifecycleState: 'completed',
      rank: 400,
      totalParticipants: 4000,
      ratingBefore: 1430,
      ratingAfter: 1470,
      ratingChange: 40,
      solvedCount: 4,
      attemptedCount: 5,
      penaltiesMinutes: 0,
    },
  ];

  const prediction = engine.predictRating('codechef', mockRecords, 3);
  if (prediction.projectedRating <= prediction.currentRating) {
    throw new Error('Deterministic rating predictor failed to calculate projected gain!');
  }
  if (!prediction.assumptions || prediction.assumptions.length === 0) {
    throw new Error('RatingPredictionReport missing explicit assumptions!');
  }
  console.log(`[PASS] Deterministic rating predictor verified (Current: ${prediction.currentRating} -> Projected: ${prediction.projectedRating}).`);
}
