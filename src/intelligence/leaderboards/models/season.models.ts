/**
 * Season & Historical Snapshot Model
 */

import { LeaderboardEntry } from './leaderboard-entry.models';

export interface LeaderboardSeason {
  readonly seasonId: string;
  readonly name: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly isActive: boolean;
  readonly topPerformers: ReadonlyArray<LeaderboardEntry>;
}
