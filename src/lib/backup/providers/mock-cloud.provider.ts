/**
 * Mock Cloud Backup Provider Stubs (Firebase, Supabase, S3, Google Drive, OneDrive)
 */

import { IBackupProvider } from './backup-provider.interface';
import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';

export class MockCloudBackupProvider implements IBackupProvider {
  constructor(public readonly providerId: string, public readonly name: string) {}

  public async saveBackup(): Promise<boolean> { return true; }
  public async getBackup(): Promise<BackupSnapshot | null> { return null; }
  public async listBackups(): Promise<ReadonlyArray<BackupMetadata>> { return []; }
  public async deleteBackup(): Promise<boolean> { return true; }
}

export class FirebaseBackupProvider extends MockCloudBackupProvider {
  constructor() { super('firebase_backup', 'Firebase Cloud Backup Stub'); }
}

export class SupabaseBackupProvider extends MockCloudBackupProvider {
  constructor() { super('supabase_backup', 'Supabase Database Storage Stub'); }
}

export class S3BackupProvider extends MockCloudBackupProvider {
  constructor() { super('s3_backup', 'AWS S3 Glacier Backup Stub'); }
}

export class GoogleDriveBackupProvider extends MockCloudBackupProvider {
  constructor() { super('gdrive_backup', 'Google Drive Sync Stub'); }
}

export class OneDriveBackupProvider extends MockCloudBackupProvider {
  constructor() { super('onedrive_backup', 'Microsoft OneDrive Sync Stub'); }
}
