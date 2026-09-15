/**
 * Cloud Sync Engine (Phase 13)
 * Manages offline mutation queuing, online reconnection replay, deterministic conflict resolution (Newest Wins),
 * and honest UI status tracking ('Synced' | 'Syncing' | 'Offline' | 'Pending' | 'Sync failed').
 */

import { storage } from '../LocalStorageAdapter';
import { EventBus } from '../../events/event-bus';
import { remoteDatabaseAdapter } from '../db/remote-db.adapter';

export type SyncStateStatus = 'Synced' | 'Syncing' | 'Offline' | 'Pending' | 'Sync failed';

export interface PendingMutation {
  id: string;
  userId: string;
  domain: string;
  payload: any;
  timestamp: string;
  attempts: number;
}

export interface UserSyncState {
  userId: string;
  status: SyncStateStatus;
  lastLocalSync: string | null;
  lastRemoteSync: string | null;
  pendingCount: number;
  error?: string;
}

export class CloudSyncEngine {
  private static instance: CloudSyncEngine;
  private syncStates: Map<string, UserSyncState> = new Map();
  private pendingQueues: Map<string, PendingMutation[]> = new Map();
  private processedMutationIds: Set<string> = new Set();
  private isOnline: boolean = true;

  private constructor() {
    this.initNetworkListeners();
    this.listenToSystemEvents();
  }

  public static getInstance(): CloudSyncEngine {
    if (!CloudSyncEngine.instance) {
      CloudSyncEngine.instance = new CloudSyncEngine();
    }
    return CloudSyncEngine.instance;
  }

  private initNetworkListeners(): void {
    if (typeof window === 'undefined') return;
    this.isOnline = navigator.onLine;

    window.addEventListener('online', () => {
      this.isOnline = true;
      this.triggerReplayAll();
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.syncStates.forEach((st, userId) => {
        this.updateState(userId, { status: 'Offline' });
      });
    });
  }

  private listenToSystemEvents(): void {
    EventBus.subscribe('ProblemSolved', (evt: any) => {
      const payload = evt.payload || {};
      const userId = payload.userId || 'default_user';
      this.enqueueMutation(userId, 'progress', payload);
    });

    EventBus.subscribe('MemoryReviewed', (evt: any) => {
      const payload = evt.payload || {};
      const userId = payload.userId || 'default_user';
      this.enqueueMutation(userId, 'memory', payload);
    });
  }

  public getSyncState(userId: string): UserSyncState {
    if (!this.syncStates.has(userId)) {
      const queue = this.getPendingQueue(userId);
      this.syncStates.set(userId, {
        userId,
        status: !this.isOnline ? 'Offline' : queue.length > 0 ? 'Pending' : 'Synced',
        lastLocalSync: new Date().toISOString(),
        lastRemoteSync: queue.length === 0 ? new Date().toISOString() : null,
        pendingCount: queue.length,
      });
    }
    return this.syncStates.get(userId)!;
  }

  private updateState(userId: string, partial: Partial<UserSyncState>): void {
    const current = this.getSyncState(userId);
    const updated = { ...current, ...partial, userId };
    this.syncStates.set(userId, updated);
    EventBus.publish('SyncCompleted', { userId, status: updated.status });
  }

  public getPendingQueue(userId: string): PendingMutation[] {
    if (this.pendingQueues.has(userId)) {
      return this.pendingQueues.get(userId)!;
    }
    if (typeof window === 'undefined') return [];
    const saved = storage.get<PendingMutation[]>(`dsa-sync-queue-v1_${userId}`);
    const queue = Array.isArray(saved) ? saved : [];
    this.pendingQueues.set(userId, queue);
    return queue;
  }

  private savePendingQueue(userId: string, queue: PendingMutation[]): void {
    this.pendingQueues.set(userId, queue);
    if (typeof window !== 'undefined') {
      storage.save(`dsa-sync-queue-v1_${userId}`, queue);
    }
    this.updateState(userId, { pendingCount: queue.length });
  }

  public enqueueMutation(userId: string, domain: string, payload: any): void {
    const queue = this.getPendingQueue(userId);
    const mutationId = payload.eventId || payload.id || `mut-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // Prevent duplicate queuing of same mutation ID
    if (this.processedMutationIds.has(mutationId) || queue.some((m) => m.id === mutationId)) return;

    this.processedMutationIds.add(mutationId);

    const newMutation: PendingMutation = {
      id: mutationId,
      userId,
      domain,
      payload,
      timestamp: payload.timestamp || new Date().toISOString(),
      attempts: 0,
    };

    const updatedQueue = [...queue, newMutation];
    this.savePendingQueue(userId, updatedQueue);

    if (this.isOnline) {
      this.triggerReplay(userId);
    } else {
      this.updateState(userId, { status: 'Offline' });
    }
  }

  public async triggerReplay(userId: string): Promise<boolean> {
    if (!this.isOnline) {
      this.updateState(userId, { status: 'Offline' });
      return false;
    }

    const queue = this.getPendingQueue(userId);
    if (queue.length === 0) {
      this.updateState(userId, { status: 'Synced', lastRemoteSync: new Date().toISOString() });
      return true;
    }

    this.updateState(userId, { status: 'Syncing' });

    let remainingQueue = [...queue];
    let hasFailure = false;

    // Deterministic ordering by timestamp
    remainingQueue.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    for (const item of queue) {
      const res = await remoteDatabaseAdapter.executeSync(item.domain, item.userId, item.payload);
      if (res.success) {
        remainingQueue = remainingQueue.filter((m) => m.id !== item.id);
      } else {
        hasFailure = true;
        item.attempts += 1;
      }
    }

    this.savePendingQueue(userId, remainingQueue);

    if (hasFailure && remainingQueue.length > 0) {
      this.updateState(userId, {
        status: 'Sync failed',
        error: 'Remote synchronization failed for some items',
      });
      return false;
    }

    this.updateState(userId, {
      status: 'Synced',
      lastRemoteSync: new Date().toISOString(),
      pendingCount: 0,
    });
    return true;
  }

  public triggerReplayAll(): void {
    this.syncStates.forEach((_, userId) => {
      this.triggerReplay(userId);
    });
  }

  /**
   * Deterministic Conflict Resolution (Newest Wins)
   */
  public resolveConflict<T extends { timestamp?: string }>(localRecord: T, remoteRecord: T): T {
    const localTs = localRecord.timestamp ? new Date(localRecord.timestamp).getTime() : 0;
    const remoteTs = remoteRecord.timestamp ? new Date(remoteRecord.timestamp).getTime() : 0;

    return remoteTs > localTs ? remoteRecord : localRecord;
  }

  public resetAll(): void {
    this.syncStates.clear();
    this.pendingQueues.clear();
  }
}

export const cloudSyncEngine = CloudSyncEngine.getInstance();
