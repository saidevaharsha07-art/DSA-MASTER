/**
 * Session Management — Session History Tracker
 * Persistent memory for adaptive session evaluations and historical performance trends.
 */

import { SessionEvaluation } from './session.evaluator';

export class SessionHistoryTracker {
  private evaluations: Map<string, SessionEvaluation[]> = new Map();

  public recordEvaluation(evaluation: SessionEvaluation): void {
    if (!this.evaluations.has(evaluation.userId)) {
      this.evaluations.set(evaluation.userId, []);
    }
    this.evaluations.get(evaluation.userId)!.push(Object.freeze({ ...evaluation }));
  }

  public getHistory(userId: string): ReadonlyArray<SessionEvaluation> {
    return Object.freeze(this.evaluations.get(userId) || []);
  }

  public getAverageAccuracy(userId: string): number {
    const history = this.getHistory(userId);
    if (history.length === 0) return 0.0;
    const sum = history.reduce((acc, h) => acc + h.accuracy, 0);
    return Number((sum / history.length).toFixed(2));
  }
}
