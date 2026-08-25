/**
 * Pure Stateless Analyzer — Contest Analyzer
 * Analyzes contest history deterministically and produces structured ContestAnalysis.
 */

import { ContestRecord, ContestAnalysis } from './contest.models';
import { calculateContestPercentile } from './contest.utils';

export class ContestAnalyzer {
  /**
   * Pure function: calculates structured ContestAnalysis from historical contest records.
   */
  public static analyze(userId: string, records: ReadonlyArray<ContestRecord>): ContestAnalysis {
    if (!records || records.length === 0) {
      return {
        userId,
        analyzedAt: new Date().toISOString(),
        totalContests: 0,
        averageRank: 0,
        averagePercentile: 0.0,
        averageRatingGain: 0.0,
        netRatingGain: 0,
        solveSpeedAvgMinutes: 0,
        consistencyScore: 0,
        primaryContestSummary: 'No contest participation history available.',
      };
    }

    const totalContests = records.length;
    const rankSum = records.reduce((sum, r) => sum + r.rank, 0);
    const averageRank = Math.round(rankSum / totalContests);

    const percentileSum = records.reduce((sum, r) => sum + calculateContestPercentile(r.rank, r.totalParticipants), 0);
    const averagePercentile = Number((percentileSum / totalContests).toFixed(1));

    const netRatingGain = records.reduce((sum, r) => sum + r.ratingChange, 0);
    const averageRatingGain = Number((netRatingGain / totalContests).toFixed(1));

    const solvedSum = records.reduce((sum, r) => sum + r.solvedCount, 0);
    const durationSum = records.reduce((sum, r) => sum + r.durationMinutes, 0);
    const solveSpeedAvgMinutes = solvedSum > 0 ? Number((durationSum / solvedSum).toFixed(1)) : 0;

    const consistencyScore = Math.min(100, Math.round((totalContests / 5) * 50 + (averagePercentile * 0.5)));

    const summary = `Participated in ${totalContests} contests with an average percentile of ${averagePercentile}% (Net Rating Gain: ${netRatingGain >= 0 ? '+' : ''}${netRatingGain}).`;

    return {
      userId,
      analyzedAt: new Date().toISOString(),
      totalContests,
      averageRank,
      averagePercentile,
      averageRatingGain,
      netRatingGain,
      solveSpeedAvgMinutes,
      consistencyScore,
      primaryContestSummary: summary,
    };
  }
}
