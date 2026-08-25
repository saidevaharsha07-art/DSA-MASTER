/**
 * Leaderboard Type & Filter Models
 */

export type LeaderboardType =
  | 'global'
  | 'friends'
  | 'college'
  | 'weekly'
  | 'monthly'
  | 'all_time'
  | 'country'
  | 'city'
  | 'kingdom'
  | 'contest'
  | 'rating'
  | 'xp'
  | 'streak'
  | 'memory'
  | 'oracle';

export interface LeaderboardQueryOptions {
  readonly type: LeaderboardType;
  readonly page?: number;
  readonly pageSize?: number;
  readonly searchQuery?: string;
  readonly kingdomFilter?: string;
  readonly countryFilter?: string;
}
