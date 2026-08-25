/**
 * Canonical Platform Telemetry & Daily Snapshot Persistence Service
 * Manages user-isolated real platform snapshots ('dsa-platform-snapshots-v1'),
 * same-day deduplication, platform sync execution via ConnectorRegistry, and EventBus integration.
 */

import {
  PlatformDailySnapshot,
  PlatformKey,
  PlatformSyncState,
  PlatformTelemetryCard,
} from '../types/platform-telemetry.types';
import { ConnectorRegistry } from '@/src/platforms/connectors/providers/connector.registry';
import { ConnectorManager } from '@/src/platforms/connectors/services/connector.manager';
import { EventBus } from '@/src/core/events/event-bus';
import { progressService } from '@/src/services/progress/progress.service';

const SNAPSHOTS_STORAGE_KEY = 'dsa-platform-snapshots-v1';
const SYNC_STORAGE_KEY = 'dsa-platform-sync-v1';

// Seeded synthetic date strings that MUST be scrubbed if found in legacy storage
const SYNTHETIC_DATES = new Set(['Apr 20', 'Apr 27', 'May 4', 'May 11', 'May 18', '2026-04-20', '2026-04-27', '2026-05-04', '2026-05-11', '2026-05-18']);

export class PlatformTelemetryService {
  private static inMemorySnapshots: Map<string, Map<PlatformKey, PlatformDailySnapshot[]>> = new Map();
  private static inMemorySyncState: Map<string, Map<PlatformKey, PlatformSyncState>> = new Map();
  private static initialized = false;

  private static ensureInitialized(): void {
    if (this.initialized) return;

    // Ensure connectors are registered
    if (ConnectorRegistry.getAllConnectors().length === 0) {
      new ConnectorManager().registerAll();
    }

    this.loadFromStorage();
    this.cleanLegacySyntheticSnapshots();

    // Subscribe to EventBus to invalidate/update snapshots on problem solves or contest completions
    EventBus.subscribe('ProblemSolved', (evt) => {
      const payload = evt.payload as { userId?: string; problemId?: string };
      if (payload && payload.userId) {
        this.handleEventTriggeredSync(payload.userId);
      }
    });

    EventBus.subscribe('ContestCompleted', (evt) => {
      const payload = evt.payload as { userId?: string };
      if (payload && payload.userId) {
        this.handleEventTriggeredSync(payload.userId);
      }
    });

    this.initialized = true;
  }

  /**
   * Safely loads stored snapshots and sync state from localStorage if in browser environment.
   */
  private static loadFromStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      const rawSnapshots = localStorage.getItem(SNAPSHOTS_STORAGE_KEY);
      if (rawSnapshots) {
        const parsed = JSON.parse(rawSnapshots);
        Object.keys(parsed).forEach((uId) => {
          const userMap = new Map<PlatformKey, PlatformDailySnapshot[]>();
          Object.keys(parsed[uId]).forEach((pKey) => {
            userMap.set(pKey as PlatformKey, parsed[uId][pKey]);
          });
          this.inMemorySnapshots.set(uId, userMap);
        });
      }

      const rawSync = localStorage.getItem(SYNC_STORAGE_KEY);
      if (rawSync) {
        const parsedSync = JSON.parse(rawSync);
        Object.keys(parsedSync).forEach((uId) => {
          const userSyncMap = new Map<PlatformKey, PlatformSyncState>();
          Object.keys(parsedSync[uId]).forEach((pKey) => {
            userSyncMap.set(pKey as PlatformKey, parsedSync[uId][pKey]);
          });
          this.inMemorySyncState.set(uId, userSyncMap);
        });
      }
    } catch (err) {
      console.error('[PlatformTelemetryService] Failed to load from localStorage:', err);
    }
  }

  /**
   * Persists in-memory snapshots and sync state to localStorage.
   */
  private static saveToStorage(): void {
    if (typeof window === 'undefined' || !window.localStorage) return;

    try {
      const snapshotsObj: Record<string, Record<string, PlatformDailySnapshot[]>> = {};
      this.inMemorySnapshots.forEach((userMap, uId) => {
        snapshotsObj[uId] = {};
        userMap.forEach((snapshots, pKey) => {
          snapshotsObj[uId][pKey] = snapshots;
        });
      });
      localStorage.setItem(SNAPSHOTS_STORAGE_KEY, JSON.stringify(snapshotsObj));

      const syncObj: Record<string, Record<string, PlatformSyncState>> = {};
      this.inMemorySyncState.forEach((userSyncMap, uId) => {
        syncObj[uId] = {};
        userSyncMap.forEach((syncState, pKey) => {
          syncObj[uId][pKey] = syncState;
        });
      });
      localStorage.setItem(SYNC_STORAGE_KEY, JSON.stringify(syncObj));
    } catch (err) {
      console.error('[PlatformTelemetryService] Failed to save to localStorage:', err);
    }
  }

  /**
   * Cleans legacy synthetic April/May snapshots from storage without touching canonical data.
   */
  public static cleanLegacySyntheticSnapshots(): void {
    let dirty = false;
    this.inMemorySnapshots.forEach((userMap) => {
      userMap.forEach((snapshots, pKey) => {
        const filtered = snapshots.filter((s) => !SYNTHETIC_DATES.has(s.date));
        if (filtered.length !== snapshots.length) {
          userMap.set(pKey, filtered);
          dirty = true;
        }
      });
    });

    if (dirty) {
      this.saveToStorage();
    }
  }

  /**
   * Retrieves all historical snapshots for a user & platform, filtered by timeframe.
   */
  public static getHistoricalSnapshots(
    userId: string,
    platform: PlatformKey,
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d'
  ): PlatformDailySnapshot[] {
    this.ensureInitialized();

    const userMap = this.inMemorySnapshots.get(userId);
    if (!userMap) return [];

    const snapshots = userMap.get(platform) || [];
    if (snapshots.length === 0) return [];

    // Filter by timeframe days
    const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '90d': 90, '1y': 365 };
    const maxDays = daysMap[timeframe] || 365;

    const nowMs = Date.now();
    const cutoffMs = nowMs - maxDays * 24 * 3600 * 1000;

    return snapshots
      .filter((s) => new Date(s.timestamp || s.date).getTime() >= cutoffMs)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  /**
   * Records or updates a daily snapshot. Same-day deduplication ensures at most 1 snapshot per YYYY-MM-DD.
   */
  public static recordDailySnapshot(userId: string, snapshot: Omit<PlatformDailySnapshot, 'userId'>): PlatformDailySnapshot {
    this.ensureInitialized();

    if (!this.inMemorySnapshots.has(userId)) {
      this.inMemorySnapshots.set(userId, new Map());
    }

    const userMap = this.inMemorySnapshots.get(userId)!;
    const pKey = snapshot.platform;

    if (!userMap.has(pKey)) {
      userMap.set(pKey, []);
    }

    const snapshots = userMap.get(pKey)!;
    const fullSnapshot: PlatformDailySnapshot = {
      ...snapshot,
      userId,
    };

    // Check if snapshot for today (YYYY-MM-DD) already exists
    const existingIndex = snapshots.findIndex((s) => s.date === snapshot.date);

    if (existingIndex >= 0) {
      // Upsert: update today's snapshot in place
      snapshots[existingIndex] = {
        ...snapshots[existingIndex],
        ...fullSnapshot,
        timestamp: new Date().toISOString(), // update latest sync timestamp for today
      };
    } else {
      // New calendar day: append new snapshot
      snapshots.push(fullSnapshot);
    }

    // Sort by date ascending
    snapshots.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    userMap.set(pKey, snapshots);

    this.saveToStorage();
    return fullSnapshot;
  }

  /**
   * Performs a real platform sync for a specific platform & user using registered platform connectors.
   */
  public static async syncPlatform(userId: string, platform: PlatformKey, handle = 'default_handle'): Promise<PlatformDailySnapshot | null> {
    this.ensureInitialized();

    const connector = ConnectorRegistry.getConnector(platform);
    if (!connector) {
      this.updateSyncState(userId, platform, 'Sync Failed', `No connector registered for platform '${platform}'`);
      return null;
    }

    try {
      this.updateSyncState(userId, platform, 'Syncing');
      EventBus.publish('PlatformSyncStarted', { userId, platform, timestamp: new Date().toISOString() });

      const timeoutMs = 10000;
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`Sync timeout after ${timeoutMs}ms`)), timeoutMs)
      );

      // Execute real connector calls with timeout protection
      const profile = await Promise.race([connector.fetchProfile(handle), timeoutPromise]);
      const contestHistory = connector.capabilities().supportsContests
        ? await Promise.race([connector.fetchContestHistory(handle), timeoutPromise])
        : null;
      const submissions = connector.capabilities().supportsSubmissions
        ? await Promise.race([connector.fetchSubmissions(handle), timeoutPromise])
        : null;

      const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      let successRate: string | null = profile?.successRate || null;
      if (!successRate && submissions && submissions.length > 0) {
        const accepted = submissions.filter((s) => s.status === 'accepted').length;
        successRate = `${Math.round((accepted / submissions.length) * 100)}%`;
      }

      // Latest contest metrics if available
      let latestContestDate: string | null = null;
      let latestContestRank: string | null = null;
      let latestContestRatingChange: number | null = null;

      if (contestHistory && contestHistory.length > 0) {
        const latest = contestHistory[contestHistory.length - 1];
        latestContestDate = latest.date;
        latestContestRank = latest.rank ? `#${latest.rank}` : null;
        latestContestRatingChange = latest.ratingChange ?? null;
      }

      const snapshot: Omit<PlatformDailySnapshot, 'userId'> = {
        platform,
        date: todayStr,
        timestamp: new Date().toISOString(),
        rating: profile?.rating ?? null,
        solvedCount: profile?.solvedCount ?? null,
        contestCount: profile?.contestCount ?? (contestHistory ? contestHistory.length : null),
        successRate,
        rank: profile?.rankTitle ?? null,
        latestContestDate,
        latestContestRank,
        latestContestRatingChange,
      };

      const recorded = this.recordDailySnapshot(userId, snapshot);
      this.updateSyncState(userId, platform, 'Connected');

      // Emit PlatformSynced event
      EventBus.publish('PlatformSynced', {
        userId,
        platform,
        timestamp: recorded.timestamp,
        snapshot: recorded,
      });

      return recorded;
    } catch (err: any) {
      console.error(`[PlatformTelemetryService] Sync failed for '${platform}':`, err);
      this.updateSyncState(userId, platform, 'Sync Failed', err?.message || 'Platform connector request failed');
      EventBus.publish('PlatformSyncFailed', {
        userId,
        platform,
        timestamp: new Date().toISOString(),
        error: err?.message || 'Platform connector request failed',
      });
      return null;
    }
  }

  /**
   * Synchronizes all registered platforms for a user.
   */
  public static async syncAllPlatforms(userId: string): Promise<void> {
    const platforms: PlatformKey[] = ['leetcode', 'codechef', 'codeforces', 'mentorpick'];
    await Promise.all(platforms.map((p) => this.syncPlatform(userId, p)));
  }

  /**
   * Internal helper to update sync state in memory & storage.
   */
  private static updateSyncState(
    userId: string,
    platform: PlatformKey,
    status: PlatformSyncState['status'],
    error?: string
  ): void {
    if (!this.inMemorySyncState.has(userId)) {
      this.inMemorySyncState.set(userId, new Map());
    }

    const userSyncMap = this.inMemorySyncState.get(userId)!;
    const currentState = userSyncMap.get(platform);

    const newState: PlatformSyncState = {
      userId,
      platform,
      lastSyncedAt: status === 'Connected' ? new Date().toISOString() : currentState?.lastSyncedAt || null,
      status,
      error,
    };

    userSyncMap.set(platform, newState);
    this.saveToStorage();
  }

  /**
   * Helper to execute background sync when EventBus signals activity.
   */
  private static handleEventTriggeredSync(userId: string): void {
    // Non-blocking sync trigger
    this.syncAllPlatforms(userId).catch((err) => {
      console.error('[PlatformTelemetryService] Event-triggered sync error:', err);
    });
  }

  /**
   * Returns human-readable relative last synced text.
   */
  public static getLastSyncedText(timestamp: string | null): string {
    if (!timestamp) return 'Sync unavailable';

    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /**
   * Builds production UI-ready PlatformTelemetryCard objects for each platform.
   * Strictly uses real connector data and persisted historical snapshots, falling back to local progress.
   */
  public static getPlatformCards(
    userId: string,
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d'
  ): PlatformTelemetryCard[] {
    this.ensureInitialized();

    const platformsConfig: Array<{ key: PlatformKey; name: string; color: string }> = [
      { key: 'leetcode', name: 'LeetCode', color: '#10B981' },
      { key: 'codechef', name: 'CodeChef', color: '#F59E0B' },
      { key: 'codeforces', name: 'Codeforces', color: '#3B82F6' },
      { key: 'mentorpick', name: 'MentorPick', color: 'var(--primary)' },
    ];

    const userSyncMap = this.inMemorySyncState.get(userId);
    const state = progressService.getState(userId);
    const solvedSet = new Set<string>([
      ...state.completed.map((num) => `leetcode:${num}`),
      ...(state.completedProblemIds || []),
    ]);

    return platformsConfig.map((cfg) => {
      const historicalSnapshots = this.getHistoricalSnapshots(userId, cfg.key, timeframe);
      const syncState = userSyncMap?.get(cfg.key);

      const latestSnapshot = historicalSnapshots.length > 0
        ? historicalSnapshots[historicalSnapshots.length - 1]
        : null;

      let localSolved = 0;
      solvedSet.forEach((id) => {
        if (cfg.key === 'leetcode') {
          if (id.startsWith('leetcode:') || id.startsWith('lc-')) localSolved++;
        } else if (cfg.key === 'codechef') {
          if (id.startsWith('codechef:')) localSolved++;
        } else if (cfg.key === 'codeforces') {
          if (id.startsWith('codeforces:')) localSolved++;
        } else if (cfg.key === 'mentorpick') {
          if (id.startsWith('mentorpick:')) localSolved++;
        }
      });

      // Solved count
      const solved = latestSnapshot && latestSnapshot.solvedCount !== null
        ? latestSnapshot.solvedCount
        : localSolved;

      // Rating calculation & Trend
      let rating: number | string = 'N/A';
      let ratingLabel = 'Platform Rating';
      let isEstimated = false;
      let trend = '0';

      if (latestSnapshot && latestSnapshot.rating !== null) {
        rating = latestSnapshot.rating;
        ratingLabel = 'Platform Rating';
        isEstimated = false;

        if (historicalSnapshots.length > 1) {
          const firstSnapshot = historicalSnapshots[0];
          if (firstSnapshot.rating !== null) {
            const diff = latestSnapshot.rating - firstSnapshot.rating;
            trend = diff >= 0 ? `+${diff}` : `${diff}`;
          }
        }
      } else {
        isEstimated = true;
        ratingLabel = 'Est. Rating';
        const solvedNum = typeof solved === 'number' ? solved : 0;
        rating = solvedNum > 0 ? 1400 + solvedNum * 15 : 'Unrated';
      }

      // Contests
      const contests = latestSnapshot && latestSnapshot.contestCount !== null
        ? latestSnapshot.contestCount
        : 'Contest data unavailable';

      // Success
      const success = latestSnapshot && latestSnapshot.successRate !== null
        ? latestSnapshot.successRate
        : 'N/A';

      // Rank
      const rank = latestSnapshot && latestSnapshot.rank !== null
        ? latestSnapshot.rank
        : 'Unranked';

      // Status
      let status: 'Connected' | 'Disconnected' | 'Syncing' | 'Sync Failed' | 'Stale' =
        syncState?.status || (historicalSnapshots.length > 0 ? 'Connected' : 'Disconnected');

      const lastSyncedAt = syncState?.lastSyncedAt || (latestSnapshot ? latestSnapshot.timestamp : null);
      const lastSyncedText = this.getLastSyncedText(lastSyncedAt);

      return {
        name: cfg.name,
        platformKey: cfg.key,
        rating,
        ratingLabel,
        isEstimated,
        trend,
        solved,
        contests,
        success,
        rank,
        status,
        color: cfg.color,
        lastSyncedText,
        lastSyncedAt,
        historicalSnapshots,
        isStale: syncState?.status === 'Sync Failed',
      };
    });
  }

  public static getTelemetryCards(
    userId: string,
    timeframe: '7d' | '30d' | '90d' | '1y' = '30d'
  ): PlatformTelemetryCard[] {
    return this.getPlatformCards(userId, timeframe);
  }

  /**
   * Resets all in-memory and persistent snapshots for test environment isolation.
   */
  public static clearAllData(): void {
    this.inMemorySnapshots.clear();
    this.inMemorySyncState.clear();
    this.initialized = false;
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem(SNAPSHOTS_STORAGE_KEY);
        localStorage.removeItem(SYNC_STORAGE_KEY);
      } catch (err) {
        // ignore
      }
    }
  }
}
