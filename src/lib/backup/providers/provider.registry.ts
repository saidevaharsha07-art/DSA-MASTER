/**
 * Backup Provider Registry
 */

import { IBackupProvider } from './backup-provider.interface';
import { LocalBackupProvider } from './local.provider';
import {
  MockCloudBackupProvider,
  FirebaseBackupProvider,
  SupabaseBackupProvider,
  S3BackupProvider,
  GoogleDriveBackupProvider,
  OneDriveBackupProvider,
} from './mock-cloud.provider';

export class BackupProviderRegistry {
  private static providers: Map<string, IBackupProvider> = new Map();
  private static activeProviderId = 'local_backup';

  public static register(provider: IBackupProvider): void {
    this.providers.set(provider.providerId, provider);
  }

  public static getProvider(id: string): IBackupProvider | undefined {
    return this.providers.get(id);
  }

  public static getActiveProvider(): IBackupProvider {
    return this.providers.get(this.activeProviderId) || new LocalBackupProvider();
  }

  public static registerDefaults(): void {
    if (this.providers.size > 0) return;
    this.register(new LocalBackupProvider());
    this.register(new FirebaseBackupProvider());
    this.register(new SupabaseBackupProvider());
    this.register(new S3BackupProvider());
    this.register(new GoogleDriveBackupProvider());
    this.register(new OneDriveBackupProvider());
  }
}
