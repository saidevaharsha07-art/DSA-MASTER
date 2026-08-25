'use client';

import React, { useState, useEffect } from 'react';
import { BackupService } from '@/src/lib/backup/services/backup.service';
import { BackupStateSnapshot } from '@/src/lib/backup/services/backup-state.service';
import { Container } from '@/src/core/container/container';
import { JSONViewer } from '../components/JSONViewer';

export default function DevBackupsPage() {
  const [service] = useState<BackupService>(() => {
    if (!Container.has('BackupService')) {
      Container.registerSingleton('BackupService', new BackupService());
    }
    return Container.resolve<BackupService>('BackupService');
  });

  const [state, setState] = useState<BackupStateSnapshot>(() => service.stateService.getState());
  const [lastReport, setLastReport] = useState<unknown>(null);

  useEffect(() => {
    const unsub = service.stateService.subscribe((next) => setState(next));
    return unsub;
  }, [service]);

  const handleCreateBackup = async () => {
    const snapshot = await service.createBackup('Manual Developer Snapshot');
    setLastReport(snapshot.manifest);
  };

  const handleVerifyLatest = async () => {
    if (state.backups.length > 0) {
      const report = await service.verifyBackup(state.backups[state.backups.length - 1].backupId);
      setLastReport(report);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>💾</span> Versioned Backup & Restore Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect snapshot manifests, integrity checksum reports, schema version migrations, and trigger backup/restore operations.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Backup & Restore Triggers</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={handleCreateBackup} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Create Full Backup Snapshot Now
          </button>
          <button onClick={handleVerifyLatest} className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium">
            Verify Integrity of Latest Backup
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Total Backups</span>
          <strong className="text-xl font-bold text-slate-200">{state.backups.length}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Last Backup At</span>
          <strong className="text-sm font-bold text-emerald-400">{state.lastBackupAt ? new Date(state.lastBackupAt).toLocaleTimeString() : 'Never'}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Status</span>
          <strong className="text-xl font-bold text-amber-400">{state.isBackingUp ? 'Backing Up...' : state.isRestoring ? 'Restoring...' : 'Idle'}</strong>
        </div>
      </div>

      <JSONViewer data={{ state, lastReport }} title="Raw Backup State & Integrity Report" defaultExpanded={true} />
    </div>
  );
}
