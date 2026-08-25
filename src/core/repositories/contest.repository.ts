/**
 * Contest Repository
 */

import { ContestRecord } from '@/src/intelligence/contests/contest.models';
import { IStorageProvider } from '../storage/storage-provider.interface';
import { MemoryStorageProvider } from '../storage/memory.storage';

export class ContestRepository {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async getHistory(userId: string): Promise<ReadonlyArray<ContestRecord>> {
    const history = await this.storage.get<ContestRecord[]>(`contests-${userId}`);
    return history ? Object.freeze(history) : Object.freeze([]);
  }

  public async saveContest(userId: string, contest: ContestRecord): Promise<void> {
    const existing = (await this.storage.get<ContestRecord[]>(`contests-${userId}`)) || [];
    existing.push(contest);
    await this.storage.set(`contests-${userId}`, existing);
  }
}
