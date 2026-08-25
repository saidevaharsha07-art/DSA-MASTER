'use client';

import React, { useState } from 'react';
import { useDev } from '../dev-context';
import { DevErrorSimulator, SimulatedErrorType } from '../services/error-simulator';
import { JSONViewer } from '../components/JSONViewer';
import { ProblemProvider, PlatformRegistry } from '@/src/platforms';

export default function DiagnosticsPage() {
  const { metrics, performanceStats, resetAll, logAction } = useDev();
  const provider = new ProblemProvider();
  const registry = PlatformRegistry.getInstance();

  const [simType, setSimType] = useState<SimulatedErrorType>('UnknownPlatform');
  const [simResult, setSimResult] = useState<any>(null);

  const handleSimulate = () => {
    const result = DevErrorSimulator.simulate(simType);
    setSimResult(result);
    logAction(`Simulated Dev Error: ${simType}`, 'Diagnostics', 2);
  };

  const handleExportDiagnostics = () => {
    const diagData = {
      engineMetrics: metrics,
      performanceStats,
      registeredPlatforms: registry.getAllPlatformConfigs().map((c) => c.id),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(diagData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `engine-diagnostics-${Date.now()}.json`;
    a.click();
    logAction('Exported System Diagnostics Report', 'Diagnostics', 2);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🛠️</span> Diagnostics & Development Utilities
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Central debugging hub for error simulation, cache flushing, mock state resetting, and engine diagnostics export.
        </p>
      </div>

      {/* Development Error Simulator */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-200">Development Error Simulator</h2>
        <p className="text-xs text-slate-400">Trigger dev-only edge case errors to verify graceful handling.</p>

        <div className="flex items-center gap-3 text-xs">
          <select
            value={simType}
            onChange={(e) => setSimType(e.target.value as SimulatedErrorType)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
          >
            <option value="UnknownPlatform">Unknown Platform Lookup (&apos;cses&apos;)</option>
            <option value="EmptyDataset">Empty Dataset Validation</option>
            <option value="InvalidUrl">Invalid Problem URL Warning</option>
            <option value="MalformedProfile">Malformed Profile Payload</option>
          </select>

          <button
            onClick={handleSimulate}
            className="bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/30 text-amber-300 font-medium px-3 py-1.5 rounded transition-colors"
          >
            ⚠️ Run Error Simulation
          </button>
        </div>

        {simResult && <JSONViewer data={simResult} title={`Error Simulation Result (${simType})`} defaultExpanded={true} />}
      </div>

      {/* Dev Action Buttons */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-200">Developer Actions & Cache Control</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              provider.clearCache();
              logAction('Flushed Platform Provider Caches', 'Diagnostics', 1);
              alert('Cleared all platform provider query caches.');
            }}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2 rounded font-medium"
          >
            🧹 Flush Query Cache
          </button>

          <button
            onClick={handleExportDiagnostics}
            className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500 px-4 py-2 rounded font-medium"
          >
            📥 Export System Diagnostics JSON
          </button>

          <button
            onClick={resetAll}
            className="text-xs bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 px-4 py-2 rounded font-medium"
          >
            🗑️ Reset All Development Data
          </button>
        </div>
      </div>

      {/* System Diagnostics JSON */}
      <JSONViewer
        data={{
          engineMetrics: metrics,
          performanceStats,
          registeredPlatformsCount: registry.getAllPlatformConfigs().length,
          storageProvider: 'InMemoryIntelligenceStorage',
        }}
        title="Full Engine Diagnostics System Report"
        defaultExpanded={true}
      />
    </div>
  );
}
