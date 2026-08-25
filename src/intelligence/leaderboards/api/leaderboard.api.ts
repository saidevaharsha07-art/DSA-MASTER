/**
 * Public Leaderboard & Public Profile API Facade
 */

import { Container } from '@/src/core/container/container';
import { LeaderboardService } from '../services/leaderboard.service';
import { LeaderboardType, LeaderboardQueryOptions } from '../models/leaderboard.models';
import { PaginatedLeaderboard, LeaderboardEntry } from '../models/leaderboard-entry.models';
import { PublicProfileSummary } from '../models/profile-summary.models';
import { LeaderboardSeason } from '../models/season.models';

export class LeaderboardApi {
  private static get service(): LeaderboardService {
    if (!Container.has('LeaderboardService')) {
      Container.registerSingleton('LeaderboardService', new LeaderboardService());
    }
    return Container.resolve<LeaderboardService>('LeaderboardService');
  }

  public static async getLeaderboard(type: LeaderboardType = 'global', options?: Partial<LeaderboardQueryOptions>): Promise<PaginatedLeaderboard> {
    return this.service.getLeaderboard(type, options);
  }

  public static async getPage(options: LeaderboardQueryOptions): Promise<PaginatedLeaderboard> {
    return this.service.getLeaderboard(options.type, options);
  }

  public static async getUserRank(username: string, type: LeaderboardType = 'global'): Promise<LeaderboardEntry | null> {
    return this.service.getUserRank(username, type);
  }

  public static async getProfile(username: string): Promise<PublicProfileSummary | null> {
    return this.service.getProfile(username);
  }

  public static async searchUsers(query: string): Promise<ReadonlyArray<PublicProfileSummary>> {
    return this.service.searchUsers(query);
  }

  public static async getSeason(seasonId: string = 'current'): Promise<LeaderboardSeason> {
    return {
      seasonId,
      name: 'Season 1: Grand DSA Championship',
      startDate: '2026-07-01T00:00:00Z',
      endDate: '2026-08-31T23:59:59Z',
      isActive: true,
      topPerformers: (await this.getLeaderboard('global', { pageSize: 5 })).entries,
    };
  }
}
