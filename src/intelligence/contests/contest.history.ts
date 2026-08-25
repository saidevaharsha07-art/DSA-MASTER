/**
 * Contest Intelligence — History Tracker & Immutable Snapshot Store
 * Tracks user contest history across platforms and stores immutable ContestSnapshots over time.
 */

import { ContestRecord, ContestSnapshot } from './contest.models';

export class ContestHistoryTracker {
  private records: Map<string, ContestRecord[]> = new Map();
  private snapshots: Map<string, ContestSnapshot[]> = new Map();

  /**
   * Records a completed contest performance and captures an immutable snapshot.
   */
  public recordContest(userId: string, record: ContestRecord): void {
    if (!this.records.has(userId)) {
      this.records.set(userId, []);
    }
    const list = this.records.get(userId)!;
    const frozenRecord = Object.freeze({ ...record });
    list.push(frozenRecord);

    // Create immutable snapshot
    if (!this.snapshots.has(userId)) {
      this.snapshots.set(userId, []);
    }
    const snapList = this.snapshots.get(userId)!;
    snapList.push(
      Object.freeze({
        snapshotId: `snap-${record.id}`,
        userId,
        contestId: record.contestId,
        platform: record.platform,
        date: record.date,
        rank: record.rank,
        ratingAfter: record.ratingAfter,
        ratingChange: record.ratingChange,
        solvedCount: record.solvedCount,
        capturedAt: new Date().toISOString(),
      })
    );
  }

  /**
   * Returns user contest records.
   */
  public getHistory(userId: string): ReadonlyArray<ContestRecord> {
    return Object.freeze(this.records.get(userId) || []);
  }

  /**
   * Returns user contest performance snapshots.
   */
  public getSnapshots(userId: string): ReadonlyArray<ContestSnapshot> {
    return Object.freeze(this.snapshots.get(userId) || []);
  }

  /**
   * Clears history for testing/resetting.
   */
  public clear(userId: string): void {
    this.records.delete(userId);
    this.snapshots.delete(userId);
  }
}
