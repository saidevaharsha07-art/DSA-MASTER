/**
 * Leaderboard Entry Model
 */

import { Badge, UserTitle } from '@/src/intelligence/achievements/models/badge.models';
import { LeaderboardType } from './leaderboard.models';

export interface LeaderboardEntry {
  readonly rank: number;
  readonly userId: string;
  readonly username: string;
  readonly avatarUrl?: string;
  readonly score: number;
  readonly xp: number;
  readonly rating: number;
  readonly streak: number;
  readonly problemsSolved: number;
  readonly memoryHealthScore: number;
  readonly activeTitle?: UserTitle;
  readonly activeBadge?: Badge;
  readonly country?: string;
  readonly college?: string;
}

export interface PaginatedLeaderboard {
  readonly type: LeaderboardType;
  readonly entries: ReadonlyArray<LeaderboardEntry>;
  readonly page: number;
  readonly pageSize: number;
  readonly totalEntries: number;
  readonly totalPages: number;
  readonly hasMore: boolean;
}
