/**
 * Problem Repository
 * Separates multi-platform problem queries from business engines.
 */

import { PracticeAttempt } from '@/src/intelligence/models/practice-history';
import { IStorageProvider } from '../storage/storage-provider.interface';
import { MemoryStorageProvider } from '../storage/memory.storage';

export class ProblemRepository {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async getAttempts(userId: string): Promise<ReadonlyArray<PracticeAttempt>> {
    const attempts = await this.storage.get<PracticeAttempt[]>(`attempts-${userId}`);
    return attempts ? Object.freeze(attempts) : Object.freeze([]);
  }

  public async saveAttempt(attempt: PracticeAttempt): Promise<void> {
    const existing = (await this.storage.get<PracticeAttempt[]>(`attempts-${attempt.userId}`)) || [];
    existing.push(attempt);
    await this.storage.set(`attempts-${attempt.userId}`, existing);
  }
}
