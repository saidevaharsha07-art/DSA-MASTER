/**
 * Session Management — Session Evaluator
 * Computes post-session metrics, completion rate, accuracy, and progression recommendations.
 */

import { AdaptiveSession } from '../adaptive/adaptive.session';
import { PracticeAttempt } from '../models/practice-history';
import { ProgressionAction } from '../adaptive/adaptive.progression';

export interface SessionEvaluation {
  readonly sessionId: string;
  readonly userId: string;
  readonly completionRate: number; // 0.0 to 1.0
  readonly accuracy: number; // 0.0 to 1.0
  readonly averageDifficulty: string;
  readonly estimatedVsActualTimeRatio: number;
  readonly masteryChange: number; // e.g. +5.5
  readonly confidenceChange: number; // e.g. +4.0
  readonly recommendedNextAction: ProgressionAction;
  readonly evaluatedAt: string;
}

export class SessionEvaluator {
  /**
   * Evaluates post-session completion results against session goal and produces SessionEvaluation model.
   */
  public evaluate(
    session: AdaptiveSession,
    attempts: ReadonlyArray<PracticeAttempt>,
    actualDurationMinutes: number
  ): SessionEvaluation {
    const totalProblems = session.selectedProblems.length;
    const sessionProbIds = new Set(session.selectedProblems.map((p) => p.id));

    const sessionAttempts = attempts.filter((a) => sessionProbIds.has(a.problemId));
    const solvedSet = new Set(sessionAttempts.filter((a) => a.status === 'accepted').map((a) => a.problemId));

    const completionRate = totalProblems > 0 ? Number((solvedSet.size / totalProblems).toFixed(2)) : 0.0;
    const accuracy = sessionAttempts.length > 0
      ? Number((sessionAttempts.filter((a) => a.status === 'accepted').length / sessionAttempts.length).toFixed(2))
      : 0.0;

    const estTime = session.goal.estimatedDurationMinutes || 30;
    const timeRatio = actualDurationMinutes > 0 ? Number((estTime / actualDurationMinutes).toFixed(2)) : 1.0;

    const masteryChange = Math.round(completionRate * 10 + accuracy * 5);
    const confidenceChange = Math.round(accuracy * 10);

    let nextAction: ProgressionAction = 'MaintainDifficulty';
    if (accuracy >= 0.85 && completionRate >= 1.0) {
      nextAction = 'IncreaseDifficulty';
    } else if (accuracy < 0.40) {
      nextAction = 'DecreaseDifficulty';
    }

    return {
      sessionId: session.id,
      userId: session.userId,
      completionRate,
      accuracy,
      averageDifficulty: session.goal.targetDifficulty,
      estimatedVsActualTimeRatio: timeRatio,
      masteryChange,
      confidenceChange,
      recommendedNextAction: nextAction,
      evaluatedAt: new Date().toISOString(),
    };
  }
}
