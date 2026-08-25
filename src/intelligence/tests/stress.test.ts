/**
 * Large Dataset & Stress Test
 * Tests stateless analyzers and scoring under 1,000+ attempts.
 */

import { WeaknessAnalyzer } from '../analyzers/weakness.analyzer';
import { PracticeAttempt } from '../models/practice-history';

export function testLargeDatasetStress(): void {
  console.log('--- Testing Large Dataset & Memory Stress Test ---');

  const largeAttempts: PracticeAttempt[] = [];
  const topics = ['Arrays', 'Strings', 'DP', 'Bit Manipulation', 'Graphs'];
  for (let i = 0; i < 1000; i++) {
    largeAttempts.push({
      id: `stress-${i}`,
      userId: 'stress-user',
      problemId: `P-${i}`,
      platform: 'codechef',
      status: i % 3 === 0 ? 'accepted' : 'wrong_answer',
      timestamp: new Date().toISOString(),
      durationSeconds: 300,
      xpEarned: i % 3 === 0 ? 20 : 0,
      hintsUsed: 0,
      topic: topics[i % topics.length],
      difficulty: 'Medium',
    });
  }

  const start = performance.now();
  const weakness = WeaknessAnalyzer.analyze(largeAttempts);
  const duration = performance.now() - start;

  if (weakness.weakTopics.length === 0 || duration > 100) {
    throw new Error(`Large dataset stress test failed! Analyzed 1,000 items in ${duration.toFixed(2)}ms.`);
  }

  console.log(`[PASS] Stress test verified (Analyzed 1,000 attempts in ${duration.toFixed(2)}ms).`);
}
