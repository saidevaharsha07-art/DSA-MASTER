/**
 * Sync State Container & Observable Store
 */

import { SyncStatus } from '../models/sync.models';

export interface SyncState {
  readonly status: SyncStatus;
  readonly isOnline: boolean;
  readonly lastSyncAt?: string;
  readonly queuedCount: number;
  readonly conflictsCount: number;
}

export class SyncStateService {
  private state: SyncState = {
    status: 'idle',
    isOnline: true,
    queuedCount: 0,
    conflictsCount: 0,
  };

  private listeners: Set<(state: SyncState) => void> = new Set();

  public getState(): SyncState {
    return this.state;
  }

  public setState(next: Partial<SyncState>): void {
    this.state = Object.freeze({ ...this.state, ...next });
    this.listeners.forEach((listener) => listener(this.state));
  }

  public subscribe(listener: (state: SyncState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}
