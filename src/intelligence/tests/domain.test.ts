/**
 * Unit Test: Domain Scoring & Mastery Rules
 */

import { calculateMasteryScore, calculateWeaknessScore, calculateConsistencyScore } from '../domain/scoring.rules';
import { getMasteryLevel, isReadyToAdvanceDifficulty } from '../domain/mastery.rules';
import { calculateUpdatedStreak } from '../domain/streak.rules';

export function testDomainRules(): void {
  console.log('--- Testing Domain Rules & Scoring ---');

  // Test normalized mastery score [0, 100]
  const m1 = calculateMasteryScore(20, 1.0);
  if (m1 !== 100) throw new Error(`Expected mastery 100, got ${m1}`);

  const m0 = calculateMasteryScore(0, 0.0);
  if (m0 !== 0) throw new Error(`Expected mastery 0, got ${m0}`);
  console.log('[PASS] Mastery score calculations verified.');

  // Test weakness score [0, 100]
  const w1 = calculateWeaknessScore(0.0, 5, 5);
  if (w1 !== 100) throw new Error(`Expected weakness 100 for 100% failure rate, got ${w1}`);
  console.log('[PASS] Weakness score calculations verified.');

  // Test mastery level mapping
  if (getMasteryLevel(10) !== 'Novice') throw new Error('Mastery level Novice check failed!');
  if (getMasteryLevel(40) !== 'Intermediate') throw new Error('Mastery level Intermediate check failed!');
  if (getMasteryLevel(70) !== 'Proficient') throw new Error('Mastery level Proficient check failed!');
  if (getMasteryLevel(95) !== 'Master') throw new Error('Mastery level Master check failed!');
  console.log('[PASS] Mastery level thresholds verified.');

  // Test difficulty advancement
  if (!isReadyToAdvanceDifficulty(10, 0.80)) throw new Error('Advancement check positive failed!');
  if (isReadyToAdvanceDifficulty(2, 0.50)) throw new Error('Advancement check negative failed!');
  console.log('[PASS] Difficulty advancement rules verified.');

  // Test streak rules
  const s0 = { currentStreak: 1, longestStreak: 1, lastActiveDate: '2026-07-28', activeDaysCount: 1 };
  const s1 = calculateUpdatedStreak(s0, '2026-07-29');
  if (s1.currentStreak !== 2) throw new Error(`Expected streak 2, got ${s1.currentStreak}`);

  const sReset = calculateUpdatedStreak(s1, '2026-07-31');
  if (sReset.currentStreak !== 1) throw new Error(`Expected streak reset to 1, got ${sReset.currentStreak}`);
  console.log('[PASS] Streak update & reset rules verified.');
}
