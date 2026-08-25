/**
 * Rating Engine — Main Facade
 * Provides cross-platform rating normalization, progression tracking, and rating prediction.
 */

import { RatingNormalizer } from './rating.progression';
import { RatingPredictor } from './rating.predictor';
import { RatingStatisticsGenerator, PlatformRatingSummary } from './rating.statistics';
import { NormalizedRating, RatingPredictionReport } from './rating.models';
import { ContestRecord } from '../contests/contest.models';
import { PlatformId } from '@/src/platforms/types';

export class RatingEngine {
  private predictor: RatingPredictor;

  constructor() {
    this.predictor = new RatingPredictor();
  }

  public normalizeRating(platform: PlatformId, rawRating: number): NormalizedRating {
    return RatingNormalizer.normalize(platform, rawRating);
  }

  public predictRating(platform: PlatformId, records: ReadonlyArray<ContestRecord>, targetContestsCount: number = 3): RatingPredictionReport {
    return this.predictor.predictRating(platform, records, targetContestsCount);
  }

  public getRatingSummary(records: ReadonlyArray<ContestRecord>): ReadonlyArray<PlatformRatingSummary> {
    return RatingStatisticsGenerator.generateRatingSummary(records);
  }
}
