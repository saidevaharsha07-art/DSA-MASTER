/**
 * Unit Test: Session Builder, Evaluator & History
 */

import { SessionBuilder } from '../sessions/session.builder';
import { SessionEvaluator } from '../sessions/session.evaluator';
import { SessionHistoryTracker } from '../sessions/session.history';
import { RecommendationHistoryTracker } from '../sessions/recommendation.history';
import { PracticeAttempt } from '../models/practice-history';

export function testSessionEngine(): void {
  console.log('--- Testing Session Builder & Evaluator ---');

  // 1. Session Builder
  const session = new SessionBuilder()
    .setUserId('user-sess-1')
    .setTitle('Test Arrays Practice')
    .setStrategyName('Weakness First')
    .setTargetPlatform('codechef')
    .setGoal({
      objective: 'Master array traversal',
      targetTopics: ['Arrays'],
      targetDifficulty: 'Easy',
      expectedAccuracy: 0.80,
    })
    .setProblems([
      {
        id: 'FLOW001',
        title: 'Add Two Numbers',
        platform: 'codechef',
        difficulty: 'Easy',
        rating: 800,
        topic: 'Arrays',
        pattern: 'Basic',
        url: 'https://codechef.com',
        solved: false,
        estimatedTime: 15,
        xp: 10,
        metadata: {},
      },
    ])
    .build();

  if (!session.id || session.selectedProblems.length !== 1 || session.goal.objective !== 'Master array traversal') {
    throw new Error('SessionBuilder assembly failed!');
  }
  console.log('[PASS] SessionBuilder assembly verified.');

  // 2. Session Evaluator
  const attempts: PracticeAttempt[] = [
    {
      id: 'att-s1',
      userId: 'user-sess-1',
      problemId: 'FLOW001',
      platform: 'codechef',
      status: 'accepted',
      timestamp: '2026-07-29T10:00:00Z',
      durationSeconds: 900,
      xpEarned: 10,
      hintsUsed: 0,
      topic: 'Arrays',
    },
  ];

  const evaluator = new SessionEvaluator();
  const evalResult = evaluator.evaluate(session, attempts, 15);

  if (evalResult.completionRate !== 1.0 || evalResult.accuracy !== 1.0) {
    throw new Error('SessionEvaluator metrics calculation failed!');
  }
  console.log('[PASS] SessionEvaluator accuracy & completion calculation verified.');

  // 3. Recommendation History Tracker
  const recTracker = new RecommendationHistoryTracker();
  recTracker.recordRecommendations('user-sess-1', ['FLOW001', 'FLOW002']);
  const recHistory = recTracker.getRecommendedIds('user-sess-1');
  if (!recHistory.has('FLOW001') || !recHistory.has('FLOW002')) {
    throw new Error('RecommendationHistoryTracker failed to track problem IDs!');
  }
  console.log('[PASS] RecommendationHistoryTracker duplicate prevention memory verified.');
}
