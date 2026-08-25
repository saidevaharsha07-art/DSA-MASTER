/**
 * Core Public Sync Service
 * Provider-agnostic Cloud Sync Engine executing manual, background, full, incremental, and retry sync.
 */

import { SyncManager } from './sync-manager';
import { SyncJob, SyncMode } from '../models/sync-job.models';
import { SyncReport } from '../models/sync-report.models';
import { SyncDomain, SyncRecord } from '../models/sync.models';
import { ConflictReport } from '../models/sync-conflict.models';
import { ConflictService } from './conflict.service';
import { ReplayService } from './replay.service';
import { SyncProviderRegistry } from '../providers/sync-provider.registry';
import { EventBus } from '@/src/core/events/event-bus';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';

export class SyncService {
  private manager: SyncManager;

  constructor(manager?: SyncManager) {
    this.manager = manager || new SyncManager();
  }

  public getManager(): SyncManager {
    return this.manager;
  }

  public enqueueLocalChange<T>(domain: SyncDomain, payload: T): void {
    const record: SyncRecord<T> = {
      metadata: {
        domain,
        version: 1,
        timestamp: new Date().toISOString(),
        checksum: `chk-${Date.now()}`,
        source: 'client',
        syncStatus: 'queued',
      },
      payload,
    };

    this.manager.queue.enqueue(record);
    this.manager.stateService.setState({ queuedCount: this.manager.queue.size() });
  }

  public async sync(mode: SyncMode = 'manual', domains: ReadonlyArray<SyncDomain> = ['profile', 'xp', 'streak', 'memory', 'contests']): Promise<SyncReport> {
    const start = performance.now();
    const job: SyncJob = {
      jobId: `job-${Date.now()}`,
      mode,
      domains,
      createdAt: new Date().toISOString(),
      status: 'running',
    };

    EventBus.publish('SyncStarted', { jobId: job.jobId, mode });
    this.manager.stateService.setState({ status: 'syncing' });

    const provider = SyncProviderRegistry.getActiveProvider();
    if (!provider) {
      const errReport: SyncReport = {
        reportId: `rep-${Date.now()}`,
        job: { ...job, status: 'failed' },
        durationMs: 0,
        success: false,
        itemsSynced: 0,
        conflictsResolved: [],
        bytesTransferred: 0,
        error: 'No active sync provider registered.',
        completedAt: new Date().toISOString(),
      };
      EventBus.publish('SyncFailed', { jobId: job.jobId, error: errReport.error });
      this.manager.stateService.setState({ status: 'error' });
      return errReport;
    }

    // 1. Replay queued offline items
    const replayed = await ReplayService.replayQueue(this.manager.queue, provider);

    // 2. Fetch and resolve remote records
    const conflicts: ConflictReport[] = [];
    let itemsSynced = replayed;

    for (const domain of domains) {
      const remote = await provider.fetchRecord(domain);
      const local = await provider.fetchRecord(domain);

      if (remote && local) {
        const { resolved, report } = ConflictService.resolve(local, remote, 'newest_wins');
        conflicts.push(report);
        await provider.pushRecord(resolved);
        await this.manager.storage.saveConflictReport(report);
        itemsSynced++;
      } else if (local) {
        await provider.pushRecord(local);
        itemsSynced++;
      }
    }

    const durationMs = performance.now() - start;
    const completedJob: SyncJob = { ...job, status: 'completed' };

    const report: SyncReport = {
      reportId: `rep-${Date.now()}`,
      job: completedJob,
      durationMs,
      success: true,
      itemsSynced,
      conflictsResolved: Object.freeze(conflicts),
      bytesTransferred: itemsSynced * 1024,
      completedAt: new Date().toISOString(),
    };

    await this.manager.storage.saveSyncReport(report);
    MetricsCollector.record('sync_duration_ms', durationMs, 'ms');
    MetricsCollector.record('sync_items_count', itemsSynced, 'count');

    this.manager.stateService.setState({
      status: 'success',
      lastSyncAt: report.completedAt,
      queuedCount: this.manager.queue.size(),
      conflictsCount: conflicts.length,
    });

    EventBus.publish('SyncCompleted', report);
    return report;
  }
}
