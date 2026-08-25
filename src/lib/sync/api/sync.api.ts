/**
 * Public Sync API
 */

import { Container } from '@/src/core/container/container';
import { SyncService } from '../services/sync.service';
import { SyncReport } from '../models/sync-report.models';
import { SyncMode } from '../models/sync-job.models';
import { SyncDomain } from '../models/sync.models';

export class SyncApi {
  private static get service(): SyncService {
    if (!Container.has('SyncService')) {
      Container.registerSingleton('SyncService', new SyncService());
    }
    return Container.resolve<SyncService>('SyncService');
  }

  public static async sync(mode: SyncMode = 'manual', domains?: ReadonlyArray<SyncDomain>): Promise<SyncReport> {
    return this.service.sync(mode, domains);
  }

  public static enqueueChange<T>(domain: SyncDomain, payload: T): void {
    this.service.enqueueLocalChange(domain, payload);
  }
}
