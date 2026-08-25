/**
 * Unit Test: Pure Stateless Analyzers (Determinism & Edge Cases)
 */

import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { StrengthAnalyzer } from '../analyzers/strength.analyzer';
import { TopicAnalyzer } from '../analyzers/topic.analyzer';
import { DifficultyAnalyzer } from '../analyzers/difficulty.analyzer';
import { PracticeAttempt } from '../models/practice-history';

export function testAnalyzers(): void {
  console.log('--- Testing Stateless Analyzers (Determinism & Edge Cases) ---');

  // Edge case: Empty history
  const emptyAttempts: PracticeAttempt[] = [];
  const emptyWeakness = WeaknessAnalyzer.analyze(emptyAttempts);
  if (emptyWeakness.weakTopics.length !== 0 || emptyWeakness.overallAccuracy !== 0) {
    throw new Error('Empty history weakness analysis failed!');
  }
  console.log('[PASS] Empty history weakness analysis verified.');

  // Determinism check (Same input -> Same output)
  const sampleAttempts: PracticeAttempt[] = [
    {
      id: 'a1',
      userId: 'user-1',
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
    {
      id: 'a2',
      userId: 'user-1',
      problemId: 'P1',
      platform: 'codechef',
      status: 'wrong_answer',
      timestamp: '2026-07-29T10:10:00Z',
      durationSeconds: 300,
      xpEarned: 0,
      hintsUsed: 2,
      topic: 'Bit Manipulation',
      pattern: 'XOR Properties',
      difficulty: 'Medium',
    },
    {
      id: 'a3',
      userId: 'user-1',
      problemId: 'P2',
      platform: 'codechef',
      status: 'accepted',
      timestamp: '2026-07-29T11:00:00Z',
      durationSeconds: 600,
      xpEarned: 20,
      hintsUsed: 0,
      topic: 'Arrays',
      pattern: 'Basic Traversal',
      difficulty: 'Easy',
    },
  ];

  const wRun1 = WeaknessAnalyzer.analyze(sampleAttempts);
  const wRun2 = WeaknessAnalyzer.analyze(sampleAttempts);
  const w1Clean = { ...wRun1, analyzedAt: '' };
  const w2Clean = { ...wRun2, analyzedAt: '' };
  if (JSON.stringify(w1Clean) !== JSON.stringify(w2Clean)) {
    throw new Error('WeaknessAnalyzer is not deterministic! Different output for identical input.');
  }
  console.log('[PASS] WeaknessAnalyzer determinism verified.');

  if (wRun1.weakTopics.length === 0 || wRun1.weakTopics[0].topic !== 'Bit Manipulation') {
    throw new Error('WeaknessAnalyzer failed to detect "Bit Manipulation" weakness!');
  }
  console.log('[PASS] Weak topic detection verified.');

  // Strength analyzer determinism check
  const sRun1 = StrengthAnalyzer.analyze(sampleAttempts);
  const sRun2 = StrengthAnalyzer.analyze(sampleAttempts);
  const s1Clean = { ...sRun1, analyzedAt: '' };
  const s2Clean = { ...sRun2, analyzedAt: '' };
  if (JSON.stringify(s1Clean) !== JSON.stringify(s2Clean)) {
    throw new Error('StrengthAnalyzer is not deterministic!');
  }
  console.log('[PASS] StrengthAnalyzer determinism verified.');

  // Topic and Difficulty Analyzers
  const topicsMap = TopicAnalyzer.analyzeTopics(sampleAttempts);
  if (!topicsMap.has('Arrays') || !topicsMap.has('Bit Manipulation')) {
    throw new Error('TopicAnalyzer topic mapping failed!');
  }
  console.log('[PASS] TopicAnalyzer verified.');

  const diffMap = DifficultyAnalyzer.analyzeDifficultyProgression(sampleAttempts);
  if (!diffMap.has('Easy') || !diffMap.has('Medium')) {
    throw new Error('DifficultyAnalyzer progression mapping failed!');
  }
  console.log('[PASS] DifficultyAnalyzer verified.');
}
