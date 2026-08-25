/**
 * Main Leaderboard Service
 */

import { LeaderboardEngine } from '../engine/leaderboard.engine';
import { ILeaderboardRepository, MockLeaderboardRepository } from '../repositories/leaderboard.repository';
import { LeaderboardStateService } from './leaderboard-state.service';
import { LeaderboardQueryOptions, LeaderboardType } from '../models/leaderboard.models';
import { PaginatedLeaderboard, LeaderboardEntry } from '../models/leaderboard-entry.models';
import { PublicProfileSummary } from '../models/profile-summary.models';
import { EventBus, AppEvent } from '@/src/core/events/event-bus';
import { ProfileEngine } from '../engine/profile.engine';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class LeaderboardService {
  private engine: LeaderboardEngine;
  private repository: ILeaderboardRepository;
  public readonly stateService: LeaderboardStateService;

  constructor(engine?: LeaderboardEngine, repository?: ILeaderboardRepository, stateService?: LeaderboardStateService) {
    this.engine = engine || new LeaderboardEngine();
    this.repository = repository || new MockLeaderboardRepository();
    this.stateService = stateService || new LeaderboardStateService();

    EventBus.subscribeAll((event: AppEvent) => {
      this.handleEvent(event);
    });
  }

  private handleEvent(event: AppEvent): void {
    const relevantEvents = [
      'AchievementUnlocked',
      'ProblemSolved',
      'ContestCompleted',
      'ProfileUpdated',
      'RatingChanged',
      'MemoryReviewed',
      'RecommendationCompleted',
    ];
    if (relevantEvents.includes(event.type)) {
      MetricsCollector.record('leaderboard_recalculation', 1, 'count');
    }
  }

  public async getLeaderboard(type: LeaderboardType = 'global', options?: Partial<LeaderboardQueryOptions>): Promise<PaginatedLeaderboard> {
    const profiles = await this.repository.getAllProfiles();
    const result = this.engine.buildLeaderboard(profiles, { type, ...options });
    this.stateService.setState({ activeType: type, currentLeaderboard: result });
    return result;
  }

  public async getUserRank(username: string, type: LeaderboardType = 'global'): Promise<LeaderboardEntry | null> {
    const board = await this.getLeaderboard(type, { pageSize: 1000 });
    return board.entries.find((e) => e.username.toLowerCase() === username.toLowerCase()) || null;
  }

  public async getProfile(username: string): Promise<PublicProfileSummary | null> {
    const raw = await this.repository.getProfileByUsername(username);
    return raw ? ProfileEngine.sanitize(raw) : null;
  }

  public async searchUsers(query: string): Promise<ReadonlyArray<PublicProfileSummary>> {
    const all = await this.repository.getAllProfiles();
    const q = query.toLowerCase();
    return all.filter((p) => p.username.toLowerCase().includes(q)).map((p) => ProfileEngine.sanitize(p));
  }
}
