/**
 * Analytics Storage Backing IStorageProvider
 */

import { IStorageProvider } from '@/src/core/storage/storage-provider.interface';
import { MemoryStorageProvider } from '@/src/core/storage/memory.storage';
import { ConsentState } from '../models/consent.models';

export class AnalyticsStorage {
  private storage: IStorageProvider;

  constructor(storage?: IStorageProvider) {
    this.storage = storage || new MemoryStorageProvider();
  }

  public async saveConsent(consent: ConsentState): Promise<void> {
    await this.storage.set('analytics_consent_state', consent);
  }

  public async getConsent(): Promise<ConsentState | null> {
    return this.storage.get<ConsentState>('analytics_consent_state');
  }
}
