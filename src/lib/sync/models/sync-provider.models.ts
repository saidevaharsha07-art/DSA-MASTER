/**
 * Sync Provider Models
 */

export type SyncProviderType = 'local' | 'mock-cloud' | 'firebase' | 'supabase' | 'custom-rest';

export interface SyncProviderInfo {
  readonly id: string;
  readonly type: SyncProviderType;
  readonly name: string;
  readonly isConnected: boolean;
  readonly lastSyncAt?: string;
}
