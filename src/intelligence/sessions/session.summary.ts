/**
 * Session Management — Session Summary
 * High-level summary report for completed practice sessions.
 */

import { SessionEvaluation } from './session.evaluator';
import { AdaptiveSession } from '../adaptive/adaptive.session';

export interface SessionSummaryReport {
  readonly sessionTitle: string;
  readonly strategyUsed: string;
  readonly problemsCount: number;
  readonly completionPercentage: number;
  readonly accuracyPercentage: number;
  readonly xpEarnedEstimate: number;
  readonly nextRecommendation: string;
  readonly summaryText: string;
}

export class SessionSummaryFormatter {
  public static format(session: AdaptiveSession, evalResult: SessionEvaluation): SessionSummaryReport {
    const compPct = Math.round(evalResult.completionRate * 100);
    const accPct = Math.round(evalResult.accuracy * 100);

    return {
      sessionTitle: session.title,
      strategyUsed: session.strategyName,
      problemsCount: session.selectedProblems.length,
      completionPercentage: compPct,
      accuracyPercentage: accPct,
      xpEarnedEstimate: Math.round(session.totalXpAvailable * (compPct / 100)),
      nextRecommendation: evalResult.recommendedNextAction,
      summaryText: `Completed ${session.title} (${compPct}% completion, ${accPct}% accuracy). Next action: ${evalResult.recommendedNextAction}.`,
    };
  }
}
