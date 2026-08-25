/**
 * Rating Engine — Deterministic Rating Predictor
 * Predicts future rating progression using historical moving averages and solve speed trends.
 */

import { ContestRecord } from '../contests/contest.models';
import { RatingPredictionReport } from './rating.models';
import { PlatformId } from '@/src/platforms/types';

export class RatingPredictor {
  /**
   * Deterministically predicts projected rating over N target contests based on historical performance.
   */
  public predictRating(
    platform: PlatformId,
    records: ReadonlyArray<ContestRecord>,
    targetContestsCount: number = 3
  ): RatingPredictionReport {
    const platRecords = records.filter((r) => r.platform === platform);
    const lastRecord = platRecords[platRecords.length - 1];
    const currentRating = lastRecord ? lastRecord.ratingAfter : 1400;

    if (platRecords.length === 0) {
      return {
        platform,
        currentRating,
        projectedRating: currentRating + 50,
        estimatedContestsToTarget: targetContestsCount,
        confidenceScore: 50,
        assumptions: Object.freeze(['Assumed baseline participation in 3 upcoming rated contests.']),
        influencingFactors: Object.freeze(['No prior contest history for platform.']),
        suggestedActions: Object.freeze(['Participate in your first rated contest.']),
        predictedAt: new Date().toISOString(),
      };
    }

    const last3 = platRecords.slice(-3);
    const avgDelta = Number((last3.reduce((sum, r) => sum + r.ratingChange, 0) / last3.length).toFixed(1));
    const projectedGain = Math.round(avgDelta * targetContestsCount);
    const projectedRating = Math.max(0, currentRating + projectedGain);

    const assumptions: string[] = [
      `Assumed participation in ${targetContestsCount} rated contests on ${platform}.`,
      `Assumed average rating change of ${avgDelta >= 0 ? '+' : ''}${avgDelta} per contest based on last ${last3.length} performances.`,
    ];

    const factors: string[] = [
      `Recent net gain over last 3 contests: ${last3.reduce((sum, r) => sum + r.ratingChange, 0)} points.`,
      `Average solve count: ${(last3.reduce((sum, r) => sum + r.solvedCount, 0) / last3.length).toFixed(1)} problems/contest.`,
    ];

    const actions: string[] = [
      'Maintain practice consistency before contest weekend.',
      'Focus on speed for problem A and B in contest.',
    ];

    return {
      platform,
      currentRating,
      projectedRating,
      estimatedContestsToTarget: targetContestsCount,
      confidenceScore: platRecords.length >= 3 ? 85 : 65,
      assumptions: Object.freeze(assumptions),
      influencingFactors: Object.freeze(factors),
      suggestedActions: Object.freeze(actions),
      predictedAt: new Date().toISOString(),
    };
  }
}
