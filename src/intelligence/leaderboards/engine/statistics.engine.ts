/**
 * Statistics Engine
 */

import { LeaderboardEntry } from '../models/leaderboard-entry.models';

export class StatisticsEngine {
  public static computeAverageScore(entries: ReadonlyArray<LeaderboardEntry>): number {
    if (entries.length === 0) return 0;
    const total = entries.reduce((sum, e) => sum + e.score, 0);
    return Math.round(total / entries.length);
  }
}
