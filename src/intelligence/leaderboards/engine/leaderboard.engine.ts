/**
 * Master Leaderboard Engine (Filtering, Paging, Ranking)
 */

import { RankingEngine } from './ranking.engine';
import { PublicProfileSummary } from '../models/profile-summary.models';
import { LeaderboardQueryOptions } from '../models/leaderboard.models';
import { PaginatedLeaderboard, LeaderboardEntry } from '../models/leaderboard-entry.models';

export class LeaderboardEngine {
  public buildLeaderboard(
    profiles: ReadonlyArray<PublicProfileSummary>,
    options: LeaderboardQueryOptions
  ): PaginatedLeaderboard {
    let filtered = [...profiles];

    if (options.searchQuery) {
      const q = options.searchQuery.toLowerCase();
      filtered = filtered.filter((p) => p.username.toLowerCase().includes(q));
    }

    if (options.countryFilter) {
      filtered = filtered.filter((p) => p.country === options.countryFilter);
    }

    const entries = RankingEngine.rankProfiles(filtered);

    // Apply secondary sort based on specific leaderboard type
    if (options.type === 'xp') {
      entries.sort((a, b) => b.xp - a.xp);
    } else if (options.type === 'rating') {
      entries.sort((a, b) => b.rating - a.rating);
    } else if (options.type === 'streak') {
      entries.sort((a, b) => b.streak - a.streak);
    }

    // Re-index ranks
    const reRanked: LeaderboardEntry[] = entries.map((e, idx) => ({ ...e, rank: idx + 1 }));

    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const totalEntries = reRanked.length;
    const totalPages = Math.ceil(totalEntries / pageSize) || 1;
    const startIndex = (page - 1) * pageSize;
    const sliced = reRanked.slice(startIndex, startIndex + pageSize);

    return {
      type: options.type,
      entries: Object.freeze(sliced),
      page,
      pageSize,
      totalEntries,
      totalPages,
      hasMore: page < totalPages,
    };
  }
}
