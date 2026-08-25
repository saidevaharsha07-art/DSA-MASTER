/**
 * Exponential Backoff Retry Queue
 */

import { SyncRecord } from '../models/sync.models';

export interface RetryItem {
  readonly record: SyncRecord;
  readonly attempts: number;
  readonly nextAttemptAt: number;
}

export class RetryQueue {
  private items: RetryItem[] = [];

  public add(record: SyncRecord, attempts: number = 0): void {
    const nextAttemptAt = Date.now() + Math.pow(2, attempts) * 1000;
    this.items.push({ record, attempts: attempts + 1, nextAttemptAt });
  }

  public getReadyItems(): RetryItem[] {
    const now = Date.now();
    const ready = this.items.filter((i) => i.nextAttemptAt <= now);
    this.items = this.items.filter((i) => i.nextAttemptAt > now);
    return ready;
  }

  public size(): number {
    return this.items.length;
  }

  public clear(): void {
    this.items = [];
  }
}
