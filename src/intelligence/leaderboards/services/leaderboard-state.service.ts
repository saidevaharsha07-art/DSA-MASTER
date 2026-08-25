/**
 * Immutable Leaderboard State Store
 */

import { PaginatedLeaderboard } from '../models/leaderboard-entry.models';
import { LeaderboardType } from '../models/leaderboard.models';

export interface LeaderboardState {
  readonly activeType: LeaderboardType;
  readonly currentLeaderboard?: PaginatedLeaderboard;
  readonly lastUpdated: string;
}

export class LeaderboardStateService {
  private state: LeaderboardState = {
    activeType: 'global',
    lastUpdated: new Date().toISOString(),
  };

  private listeners: Set<(state: LeaderboardState) => void> = new Set();

  public getState(): LeaderboardState {
    return this.state;
  }

  public setState(next: Partial<LeaderboardState>): void {
    this.state = Object.freeze({
      ...this.state,
      ...next,
      lastUpdated: new Date().toISOString(),
    });
    this.listeners.forEach((l) => l(this.state));
  }

  public subscribe(listener: (state: LeaderboardState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
