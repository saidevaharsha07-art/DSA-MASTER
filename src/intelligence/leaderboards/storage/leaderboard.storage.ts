/**
 * Leaderboard Storage backing IStorageProvider
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { LeaderboardSeason } from '../models/season.models';

export class LeaderboardStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async saveSeasons(seasons: ReadonlyArray<LeaderboardSeason>): Promise<void> {
    await this.storage.set('leaderboard_seasons', seasons);
  }

  public async getSeasons(): Promise<ReadonlyArray<LeaderboardSeason>> {
    const res = await this.storage.get<LeaderboardSeason[]>('leaderboard_seasons');
    return res ? Object.freeze(res) : Object.freeze([]);
  }
}
