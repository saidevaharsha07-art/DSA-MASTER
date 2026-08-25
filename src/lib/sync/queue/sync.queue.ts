/**
 * Offline Sync Action Queue
 */

import { SyncRecord } from '../models/sync.models';

export class SyncQueue {
  private queue: SyncRecord[] = [];

  public enqueue(record: SyncRecord): void {
    // Deduplicate by domain
    this.queue = this.queue.filter((r) => r.metadata.domain !== record.metadata.domain);
    this.queue.push(record);
  }

  public peekAll(): ReadonlyArray<SyncRecord> {
    return Object.freeze([...this.queue]);
  }

  public dequeueAll(): SyncRecord[] {
    const items = [...this.queue];
    this.queue = [];
    return items;
  }

  public size(): number {
    return this.queue.length;
  }

  public clear(): void {
    this.queue = [];
  }
}
