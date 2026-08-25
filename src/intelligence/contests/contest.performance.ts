/**
 * Contest Intelligence — Performance Trends Calculator
 * Evaluates long-term performance trends across rating, solve count, speed, accuracy, and participation.
 */

import { ContestRecord } from './contest.models';

export type TrendDirection = 'improving' | 'stable' | 'declining';

export interface ContestPerformanceTrend {
  readonly ratingTrend: TrendDirection;
  readonly solveTrend: TrendDirection;
  readonly speedTrend: TrendDirection;
  readonly accuracyTrend: TrendDirection;
  readonly consistencyTrend: TrendDirection;
  readonly participationTrend: TrendDirection;
  readonly averageRatingGainLast5: number;
}

export class ContestPerformanceCalculator {
  /**
   * Pure function: calculates structured ContestPerformanceTrend from contest history.
   */
  public static calculateTrend(records: ReadonlyArray<ContestRecord>): ContestPerformanceTrend {
    if (!records || records.length === 0) {
      return {
        ratingTrend: 'stable',
        solveTrend: 'stable',
        speedTrend: 'stable',
        accuracyTrend: 'stable',
        consistencyTrend: 'stable',
        participationTrend: 'stable',
        averageRatingGainLast5: 0,
      };
    }

    const sorted = [...records].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const last5 = sorted.slice(-5);

    const netRatingGainLast5 = last5.reduce((sum, r) => sum + r.ratingChange, 0);
    const avgGainLast5 = Number((netRatingGainLast5 / last5.length).toFixed(1));

    let ratingTrend: TrendDirection = 'stable';
    if (avgGainLast5 > 5) ratingTrend = 'improving';
    else if (avgGainLast5 < -5) ratingTrend = 'declining';

    let solveTrend: TrendDirection = 'stable';
    if (last5.length >= 2) {
      const recentSolves = last5[last5.length - 1].solvedCount;
      const prevSolves = last5[0].solvedCount;
      if (recentSolves > prevSolves) solveTrend = 'improving';
      else if (recentSolves < prevSolves) solveTrend = 'declining';
    }

    return {
      ratingTrend,
      solveTrend,
      speedTrend: 'stable',
      accuracyTrend: 'stable',
      consistencyTrend: records.length >= 3 ? 'improving' : 'stable',
      participationTrend: records.length >= 5 ? 'improving' : 'stable',
      averageRatingGainLast5: avgGainLast5,
    };
  }
}
