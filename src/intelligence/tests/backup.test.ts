/**
 * Unit Test: Versioned Backup, Restore & Data Integrity System (Milestone 5.8)
 */

import { BackupService } from '@/src/lib/backup/services/backup.service';
import { BackupApi } from '@/src/lib/backup/api/backup.api';
import { EventBus } from '@/src/core/events/event-bus';

export async function testBackupSystem(): Promise<void> {
  console.log('--- Testing Milestone 5.8 Versioned Backup, Restore & Data Integrity System ---');

  const backupService = new BackupService();

  // 1. Create Backup Snapshot & EventBus Emission
  let backupCompletedFired = false;
  const unsub = EventBus.subscribe('BackupCompleted', () => {
    backupCompletedFired = true;
  });

  const snapshot = await backupService.createBackup('Test System Snapshot');
  unsub();

  if (!snapshot || !snapshot.manifest || !backupCompletedFired) {
    throw new Error('Backup creation or EventBus publication failed!');
  }
  console.log(`[PASS] Backup snapshot creation verified (ID: ${snapshot.manifest.metadata.backupId}).`);

  // 2. Integrity Verification
  const integrity = await backupService.verifyBackup(snapshot.manifest.metadata.backupId);
  if (!integrity.isValid || !integrity.manifestValid) {
    throw new Error('Integrity verification failed for valid snapshot!');
  }
  console.log('[PASS] Integrity verification & checksum check verified.');

  // 3. Preview & Full Restore Execution
  const previewPlan = await BackupApi.previewRestore(snapshot.manifest.metadata.backupId);
  if (previewPlan.targetSubsystems.length < 5) {
    throw new Error('Restore plan generation failed!');
  }

  const restoreReport = await BackupApi.restoreBackup(snapshot.manifest.metadata.backupId, 'full');
  if (!restoreReport.success || restoreReport.restoredSubsystemsCount === 0) {
    throw new Error('Restore execution failed!');
  }
  console.log(`[PASS] State reconstruction & restore execution verified (${restoreReport.restoredRecordsCount} records restored).`);

  // 4. Export & Import Verification
  const exportedJson = await BackupApi.exportBackup(snapshot.manifest.metadata.backupId);
  const importedSnapshot = await BackupApi.importBackup(exportedJson);

  if (importedSnapshot.manifest.metadata.backupId !== snapshot.manifest.metadata.backupId) {
    throw new Error('Backup export/import roundtrip failed!');
  }
  console.log('[PASS] Backup export/import roundtrip verified.');
}
