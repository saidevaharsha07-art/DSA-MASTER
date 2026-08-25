/**
 * Core Backup & Restore Service
 */

import { BackupRepository } from '../repositories/backup.repository';
import { BackupStateService } from './backup-state.service';
import { BackupEngine } from '../engine/backup.engine';
import { RestoreEngine } from '../engine/restore.engine';
import { SerializerService } from '../engine/serializer.service';
import { IntegrityVerifier } from '../integrity/integrity.verifier';
import { BackupSnapshot } from '../models/backup.models';
import { BackupMetadata } from '../models/metadata.models';
import { RestoreMode, RestorePlan, RestoreReport } from '../models/restore.models';
import { IntegrityReport } from '../models/integrity.models';
import { BackupProviderRegistry } from '../providers/provider.registry';

export class BackupService {
  private repository: BackupRepository;
  public readonly stateService: BackupStateService;

  constructor(repository?: BackupRepository, stateService?: BackupStateService) {
    this.repository = repository || new BackupRepository();
    this.stateService = stateService || new BackupStateService();
    BackupProviderRegistry.registerDefaults();
  }

  public async createBackup(description?: string): Promise<BackupSnapshot> {
    this.stateService.setState({ isBackingUp: true });
    try {
      const snapshot = await BackupEngine.createBackup(description);
      const backups = await this.repository.listBackups();
      this.stateService.setState({
        backups,
        lastBackupAt: snapshot.manifest.metadata.createdAt,
        isBackingUp: false,
      });
      return snapshot;
    } catch (err) {
      this.stateService.setState({ isBackingUp: false });
      throw err;
    }
  }

  public async listBackups(): Promise<ReadonlyArray<BackupMetadata>> {
    return this.repository.listBackups();
  }

  public async restoreBackup(backupId: string, mode: RestoreMode = 'full'): Promise<RestoreReport> {
    this.stateService.setState({ isRestoring: true });
    try {
      const snapshot = await this.repository.getBackup(backupId);
      if (!snapshot) throw new Error(`Backup '${backupId}' not found.`);

      const plan = RestoreEngine.createRestorePlan(snapshot, mode);
      const report = await RestoreEngine.executeRestore(snapshot, plan);
      this.stateService.setState({ isRestoring: false });
      return report;
    } catch (err) {
      this.stateService.setState({ isRestoring: false });
      throw err;
    }
  }

  public async previewRestore(backupId: string): Promise<RestorePlan> {
    const snapshot = await this.repository.getBackup(backupId);
    if (!snapshot) throw new Error(`Backup '${backupId}' not found.`);
    return RestoreEngine.createRestorePlan(snapshot, 'preview');
  }

  public async verifyBackup(backupId: string): Promise<IntegrityReport> {
    const snapshot = await this.repository.getBackup(backupId);
    if (!snapshot) {
      return {
        isValid: false,
        checksumMatch: false,
        schemaVersionValid: false,
        manifestValid: false,
        corruptedSubsystems: ['all'],
        verifiedAt: new Date().toISOString(),
      };
    }
    return IntegrityVerifier.verify(snapshot);
  }

  public async exportBackup(backupId: string): Promise<string> {
    const snapshot = await this.repository.getBackup(backupId);
    if (!snapshot) throw new Error(`Backup '${backupId}' not found.`);
    return SerializerService.serialize(snapshot);
  }

  public async importBackup(rawJson: string): Promise<BackupSnapshot> {
    const snapshot = SerializerService.deserialize(rawJson);
    await this.repository.saveBackup(snapshot);
    const backups = await this.repository.listBackups();
    this.stateService.setState({ backups });
    return snapshot;
  }

  public async deleteBackup(backupId: string): Promise<boolean> {
    const ok = await this.repository.deleteBackup(backupId);
    const backups = await this.repository.listBackups();
    this.stateService.setState({ backups });
    return ok;
  }
}
