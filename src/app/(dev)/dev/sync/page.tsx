'use client';

import React, { useState, useEffect } from 'react';
import { SyncService } from '@/src/lib/sync/services/sync.service';
import { SyncState } from '@/src/lib/sync/services/sync-state.service';
import { SyncProviderRegistry } from '@/src/lib/sync/providers/sync-provider.registry';
import { Container } from '@/src/core/container/container';
import { JSONViewer } from '../components/JSONViewer';

export default function DevSyncPage() {
  const [syncService] = useState<SyncService>(() => {
    if (!Container.has('SyncService')) {
      Container.registerSingleton('SyncService', new SyncService());
    }
    return Container.resolve<SyncService>('SyncService');
  });

  const [state, setState] = useState<SyncState>(() => syncService.getManager().stateService.getState());
  const [activeProvider, setActiveProvider] = useState(() => SyncProviderRegistry.getActiveProvider()?.info);

  useEffect(() => {
    const unsub = syncService.getManager().stateService.subscribe((nextState) => {
      setState(nextState);
      setActiveProvider(SyncProviderRegistry.getActiveProvider()?.info);
    });
    return unsub;
  }, [syncService]);

  const handleManualSync = async () => {
    await syncService.sync('manual');
  };

  const handleEnqueueAction = () => {
    syncService.enqueueLocalChange('xp', { xpGain: 50, reason: 'Solved Medium Problem' });
    setState(syncService.getManager().stateService.getState());
  };

  const handleSwitchProvider = (id: string) => {
    SyncProviderRegistry.setActiveProvider(id);
    setActiveProvider(SyncProviderRegistry.getActiveProvider()?.info);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔄</span> Offline-First Cloud Sync Engine Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect sync status, active provider, offline action queue, conflict resolution logs, and manual sync triggers.
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Sync Controls & Triggers (No Real Cloud Requests)</h2>
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <button onClick={handleManualSync} className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Trigger Manual Sync Now
          </button>
          <button onClick={handleEnqueueAction} className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded font-medium">
            Enqueue Mock Local Action (+50 XP)
          </button>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center gap-3 text-xs">
          <span className="text-slate-400 font-mono">Provider Switcher:</span>
          <button onClick={() => handleSwitchProvider('prov-local-1')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700">
            Select Local Offline Provider
          </button>
          <button onClick={() => handleSwitchProvider('prov-mock-cloud-1')} className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded border border-slate-700">
            Select Mock Cloud Provider
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Sync Status</span>
          <strong className="text-xl font-bold text-emerald-400 uppercase">{state.status}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Active Provider</span>
          <strong className="text-xl font-bold text-indigo-400">{activeProvider?.name || 'Local'}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Queued Items</span>
          <strong className="text-xl font-bold text-amber-400">{state.queuedCount}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Conflicts Resolved</span>
          <strong className="text-xl font-bold text-emerald-400">{state.conflictsCount}</strong>
        </div>
      </div>

      <JSONViewer data={{ state, activeProvider, queue: syncService.getManager().queue.peekAll() }} title="Raw Sync State & Queue Inspector" defaultExpanded={true} />
    </div>
  );
}
