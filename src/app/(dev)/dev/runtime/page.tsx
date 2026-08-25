'use client';

import React, { useState } from 'react';
import { ConfigService } from '@/src/lib/config/config.service';
import { JSONViewer } from '../components/JSONViewer';

export default function DevRuntimePage() {
  const [configService] = useState<ConfigService>(() => new ConfigService());
  const snapshot = configService.getSnapshot();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>⚙️</span> Runtime Configuration & Environment Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect environment variables, application versions, dynamic feature flags, provider selection matrix, and configuration validation.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Environment</span>
          <strong className="text-xl font-bold text-emerald-400">{snapshot.environment.toUpperCase()}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">App Version</span>
          <strong className="text-xl font-bold text-indigo-400">{snapshot.version.appVersion}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Migration Version</span>
          <strong className="text-xl font-bold text-amber-400">v{snapshot.version.migrationVersion}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Config Valid?</span>
          <strong className="text-xl font-bold text-purple-400">{snapshot.validation.isValid ? 'YES' : 'NO'}</strong>
        </div>
      </div>

      <JSONViewer data={snapshot} title="Raw Runtime Config Snapshot" defaultExpanded={true} />
    </div>
  );
}
