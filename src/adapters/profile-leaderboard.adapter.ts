/**
 * Profile & Leaderboard Engine Adapter
 * Bridges existing profile metrics, solved problem counts, and XP into LeaderboardService.
 */

import { Container } from '@/src/core/container/container';
import { EventBus } from '@/src/core/events/event-bus';
import { LeaderboardService } from '@/src/intelligence/leaderboards/services/leaderboard.service';
import { LeaderboardEntry } from '@/src/intelligence/leaderboards/models/leaderboard-entry.models';

export class ProfileLeaderboardAdapter {
  private static get leaderboardService(): LeaderboardService {
    return Container.resolve<LeaderboardService>('LeaderboardService');
  }

  public static syncUserProfileRank(userId: string, username: string, totalXp: number, solvedCount: number): void {
    EventBus.publish('LeaderboardUpdated', { userId, username, totalXp, solvedCount });
  }

  public static async getUserRank(username: string): Promise<LeaderboardEntry | null> {
    return this.leaderboardService.getUserRank(username);
  }
}
