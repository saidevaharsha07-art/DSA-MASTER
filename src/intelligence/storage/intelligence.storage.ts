/**
 * Intelligence Storage Abstraction
 * Fully abstract storage driver contract supporting LocalStorage, IndexedDB, SQLite, or Cloud Sync implementations.
 */

import { LearningProfile } from '../models/learning-profile';
import { PracticeAttempt } from '../models/practice-history';

export interface IIntelligenceStorage {
  getProfile(userId: string): Promise<LearningProfile | null> | LearningProfile | null;
  saveProfile(profile: LearningProfile): Promise<void> | void;

  getAttempts(userId: string): Promise<ReadonlyArray<PracticeAttempt>> | ReadonlyArray<PracticeAttempt>;
  saveAttempt(attempt: PracticeAttempt): Promise<void> | void;

  clear(userId: string): Promise<void> | void;
}

/**
 * Default In-Memory Storage implementation for testing, server-side execution, and fallback.
 */
export class InMemoryIntelligenceStorage implements IIntelligenceStorage {
  private profiles: Map<string, LearningProfile> = new Map();
  private attempts: Map<string, PracticeAttempt[]> = new Map();

  public getProfile(userId: string): LearningProfile | null {
    return this.profiles.get(userId) || null;
  }

  public saveProfile(profile: LearningProfile): void {
    this.profiles.set(profile.userId, Object.freeze({ ...profile }));
  }

  public getAttempts(userId: string): ReadonlyArray<PracticeAttempt> {
    const list = this.attempts.get(userId) || [];
    return Object.freeze([...list]);
  }

  public saveAttempt(attempt: PracticeAttempt): void {
    const list = this.attempts.get(attempt.userId) || [];
    list.push(Object.freeze({ ...attempt }));
    this.attempts.set(attempt.userId, list);
  }

  public clear(userId: string): void {
    this.profiles.delete(userId);
    this.attempts.delete(userId);
  }
}
