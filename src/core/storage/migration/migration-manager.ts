/**
 * LocalStorage Migration Manager (Phase 12)
 * Executes idempotent migration: LocalStorage -> Migration Detector -> Schema Validation -> Canonical DB -> Migration Marker.
 */

import { storage } from '../LocalStorageAdapter';
import { canonicalDb, ProgressRecord } from '../db/canonical-db.service';
import { activityStoreService } from '@/src/services/activity/activity-store.service';
import { progressService } from '@/src/services/progress/progress.service';

export interface MigrationResult {
  migrated: boolean;
  userId: string;
  progressItems: number;
  activityItems: number;
  errors: string[];
}

export class LocalStorageMigrationManager {
  private static instance: LocalStorageMigrationManager;
  private migratedUsers: Set<string> = new Set();

  public static getInstance(): LocalStorageMigrationManager {
    if (!LocalStorageMigrationManager.instance) {
      LocalStorageMigrationManager.instance = new LocalStorageMigrationManager();
    }
    return LocalStorageMigrationManager.instance;
  }

  public isMigrated(userId: string): boolean {
    if (this.migratedUsers.has(userId)) return true;
    if (typeof window === 'undefined') return false;
    return !!storage.get<boolean>(`dsa-migration-v1_completed_${userId}`);
  }

  public migrateUser(userId: string, mockData?: { progress?: any; activityLogs?: any[] }): MigrationResult {
    const result: MigrationResult = {
      migrated: false,
      userId,
      progressItems: 0,
      activityItems: 0,
      errors: [],
    };

    if (this.isMigrated(userId) && !mockData) {
      result.migrated = true;
      return result;
    }

    try {
      // 1. Migrate Progress State
      let rawProgress = mockData?.progress;
      if (!rawProgress && typeof window !== 'undefined') {
        rawProgress =
          storage.get<any>(`dsa-user-state-v1_${userId}`) ||
          storage.get<any>(`dsa-user-progress`) ||
          storage.get<any>('dsa-state');
      }

      if (rawProgress && typeof rawProgress === 'object') {
        const completedProblemIds = Array.isArray(rawProgress.completedProblemIds)
          ? rawProgress.completedProblemIds
          : Array.isArray(rawProgress.completed)
          ? rawProgress.completed.map((id: number) => `leetcode:${id}`)
          : [];

        const record: ProgressRecord = {
          userId,
          xp: typeof rawProgress.xp === 'number' ? Math.max(0, rawProgress.xp) : 0,
          level: Math.floor((rawProgress.xp || 0) / 500) + 1,
          currentStreak: typeof rawProgress.currentStreak === 'number' ? rawProgress.currentStreak : 0,
          longestStreak: typeof rawProgress.longestStreak === 'number' ? rawProgress.longestStreak : 0,
          completedProblemIds,
          favorites: Array.isArray(rawProgress.favorites) ? rawProgress.favorites : [],
          notes: typeof rawProgress.notes === 'object' && rawProgress.notes ? rawProgress.notes : {},
          lastActiveDate: rawProgress.lastActiveDate || new Date().toISOString(),
        };

        canonicalDb.saveProgress(record);
        result.progressItems = completedProblemIds.length;
      }

      // 2. Migrate Activity Logs
      let rawLogs = mockData?.activityLogs;
      if (!rawLogs && typeof window !== 'undefined') {
        rawLogs =
          storage.get<any[]>(`dsa-activity-events-v1_${userId}`) ||
          storage.get<any[]>('dsa-activity-log') ||
          undefined;
      }

      if (Array.isArray(rawLogs) && rawLogs.length > 0) {
        rawLogs.forEach((item) => {
          if (item && typeof item === 'object') {
            activityStoreService.recordActivity({
              eventId: item.eventId || item.id || `migrated-${Date.now()}-${Math.random()}`,
              userId,
              action: item.action || 'solved',
              timestamp: item.timestamp || new Date().toISOString(),
              problemId: item.problemId ? String(item.problemId) : undefined,
              platform: item.platform || 'leetcode',
              xpEarned: typeof item.xpEarned === 'number' ? item.xpEarned : 0,
            });
          }
        });
        result.activityItems = rawLogs.length;
      }

      // Mark migration completed
      this.migratedUsers.add(userId);
      if (typeof window !== 'undefined') {
        storage.save(`dsa-migration-v1_completed_${userId}`, true);
      }
      result.migrated = true;
    } catch (err: any) {
      result.errors.push(err.message || 'Migration error');
    }

    return result;
  }
}

export const migrationManager = LocalStorageMigrationManager.getInstance();
