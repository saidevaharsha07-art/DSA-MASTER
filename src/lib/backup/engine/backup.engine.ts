/**
 * Master Backup Engine
 */

import { SnapshotBuilder } from './snapshot.builder';
import { BackupSnapshot } from '../models/backup.models';
import { BackupProviderRegistry } from '../providers/provider.registry';
import { EventBus } from '@/src/core/events/event-bus';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class BackupEngine {
  public static async createBackup(description?: string): Promise<BackupSnapshot> {
    const start = performance.now();
    const snapshot = SnapshotBuilder.buildSnapshot(description);
    const backupId = snapshot.manifest.metadata.backupId;

    EventBus.publish('BackupStarted', { backupId });

    try {
      const provider = BackupProviderRegistry.getActiveProvider();
      await provider.saveBackup(snapshot);

      const durationMs = performance.now() - start;
      MetricsCollector.record('backup_creation_ms', durationMs, 'ms');
      EventBus.publish('BackupCompleted', { backupId, durationMs, metadata: snapshot.manifest.metadata });

      return snapshot;
    } catch (err) {
      EventBus.publish('BackupFailed', { backupId, error: String(err) });
      throw err;
    }
  }
}
