/**
 * Rating Engine — Statistics Generator
 * Computes cross-platform rating distribution, maximum rating achieved, and rating milestones.
 */

import { ContestRecord } from '../contests/contest.models';
import { NormalizedRating } from './rating.models';
import { RatingNormalizer } from './rating.progression';
import { PlatformId } from '@/src/platforms/types';

export interface PlatformRatingSummary {
  readonly platform: PlatformId;
  readonly currentRating: number;
  readonly maxRating: number;
  readonly normalized: NormalizedRating;
}

export class RatingStatisticsGenerator {
  public static generateRatingSummary(records: ReadonlyArray<ContestRecord>): ReadonlyArray<PlatformRatingSummary> {
    const map = new Map<PlatformId, { current: number; max: number }>();

    for (const r of records) {
      const entry = map.get(r.platform) || { current: r.ratingAfter, max: r.ratingAfter };
      map.set(r.platform, {
        current: r.ratingAfter,
        max: Math.max(entry.max, r.ratingAfter),
      });
    }

    const result: PlatformRatingSummary[] = [];
    for (const [plat, data] of Array.from(map.entries())) {
      const normalized = RatingNormalizer.normalize(plat, data.current);
      result.push({
        platform: plat,
        currentRating: data.current,
        maxRating: data.max,
        normalized,
      });
    }

    return Object.freeze(result);
  }
}
