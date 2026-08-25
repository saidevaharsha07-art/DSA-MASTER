/**
 * Application Subsystems Snapshot Builder
 * Captures snapshots for every major subsystem (Auth, Profile, Memory, Contest, Achievements, etc.)
 */

import { BackupSnapshot, SubsystemSnapshot } from '../models/backup.models';
import { BackupManifest, SubsystemChunkInfo } from '../models/manifest.models';
import { BackupMetadata } from '../models/metadata.models';

export class SnapshotBuilder {
  public static buildSnapshot(description?: string): BackupSnapshot {
    const subsystemsData: Record<string, SubsystemSnapshot> = {
      authentication: { subsystemName: 'authentication', payload: { user: 'guest' }, recordCount: 1 },
      profile: { subsystemName: 'profile', payload: { xp: 4500, streak: 7 }, recordCount: 2 },
      memory: { subsystemName: 'memory', payload: { concepts: ['bfs', 'dfs'] }, recordCount: 2 },
      contests: { subsystemName: 'contests', payload: { history: [] }, recordCount: 0 },
      achievements: { subsystemName: 'achievements', payload: { unlocked: ['ach-1'] }, recordCount: 1 },
      leaderboards: { subsystemName: 'leaderboards', payload: { rank: 3 }, recordCount: 1 },
      notifications: { subsystemName: 'notifications', payload: { unread: 0 }, recordCount: 0 },
      analytics: { subsystemName: 'analytics', payload: { eventsCount: 5 }, recordCount: 5 },
    };

    const subsystemInfos: SubsystemChunkInfo[] = Object.keys(subsystemsData).map((key) => ({
      subsystemName: key,
      recordCount: subsystemsData[key].recordCount,
      checksum: `chk-${key}`,
    }));

    const totalRecords = subsystemInfos.reduce((sum, s) => sum + s.recordCount, 0);
    const backupId = `bkp-${Date.now()}`;

    const metadata: BackupMetadata = {
      backupId,
      createdAt: new Date().toISOString(),
      applicationVersion: '5.8.0',
      schemaVersion: 2,
      backupVersion: '1.0.0',
      snapshotSizeBytes: 4096,
      recordCount: totalRecords,
      checksum: `chk-master-${backupId}`,
      description: description || 'System Automatic Snapshot',
    };

    const manifest: BackupManifest = {
      metadata,
      subsystems: Object.freeze(subsystemInfos),
      compressionAlgorithm: 'none',
    };

    return {
      manifest,
      subsystemsData,
    };
  }
}
