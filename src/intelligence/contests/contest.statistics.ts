/**
 * Contest Intelligence — Aggregated Statistics Generator
 * Generates structured ContestStatisticsSummary objects.
 */

import { ContestRecord } from './contest.models';
import { PlatformId } from '@/src/platforms/types';

export interface ContestPlatformStats {
  readonly platform: PlatformId;
  readonly contestsAttended: number;
  readonly netRatingGain: number;
  readonly averageRank: number;
  readonly bestRank: number;
}

export interface ContestStatisticsSummary {
  readonly userId: string;
  readonly totalAttempted: number;
  readonly totalCompleted: number;
  readonly averageRatingChange: number;
  readonly netRatingChangeTotal: number;
  readonly participationStreak: number;
  readonly bestRankOverall: number;
  readonly platformBreakdown: ReadonlyArray<ContestPlatformStats>;
  readonly generatedAt: string;
}

export class ContestStatisticsGenerator {
  public static generateSummary(userId: string, records: ReadonlyArray<ContestRecord>): ContestStatisticsSummary {
    if (!records || records.length === 0) {
      return {
        userId,
        totalAttempted: 0,
        totalCompleted: 0,
        averageRatingChange: 0,
        netRatingChangeTotal: 0,
        participationStreak: 0,
        bestRankOverall: 0,
        platformBreakdown: Object.freeze([]),
        generatedAt: new Date().toISOString(),
      };
    }

    const totalAttempted = records.length;
    const completed = records.filter((r) => r.lifecycleState === 'completed' || r.lifecycleState === 'analyzed').length;

    const netChange = records.reduce((sum, r) => sum + r.ratingChange, 0);
    const avgChange = Number((netChange / records.length).toFixed(1));

    const bestRank = Math.min(...records.map((r) => r.rank));

    const platMap = new Map<PlatformId, ContestRecord[]>();
    for (const r of records) {
      if (!platMap.has(r.platform)) platMap.set(r.platform, []);
      platMap.get(r.platform)!.push(r);
    }

    const platformBreakdown: ContestPlatformStats[] = [];
    for (const [plat, pRecords] of Array.from(platMap.entries())) {
      const pNet = pRecords.reduce((sum, r) => sum + r.ratingChange, 0);
      const pAvgRank = Math.round(pRecords.reduce((sum, r) => sum + r.rank, 0) / pRecords.length);
      const pBestRank = Math.min(...pRecords.map((r) => r.rank));

      platformBreakdown.push({
        platform: plat,
        contestsAttended: pRecords.length,
        netRatingGain: pNet,
        averageRank: pAvgRank,
        bestRank: pBestRank,
      });
    }

    return {
      userId,
      totalAttempted,
      totalCompleted: completed,
      averageRatingChange: avgChange,
      netRatingChangeTotal: netChange,
      participationStreak: records.length,
      bestRankOverall: bestRank,
      platformBreakdown: Object.freeze(platformBreakdown),
      generatedAt: new Date().toISOString(),
    };
  }
}
