'use client';

import React, { useState } from 'react';
import { ProblemProvider, PlatformRegistry, PlatformValidator } from '@/src/platforms';
import { StatusBadge } from '../components/StatusBadge';
import { JSONViewer } from '../components/JSONViewer';
import { useDev } from '../dev-context';

export default function PlatformInspectorPage() {
  const { logAction } = useDev();
  const registry = PlatformRegistry.getInstance();
  const provider = new ProblemProvider();

  const configs = registry.getAllPlatformConfigs();
  const cacheStats = provider.getCacheStats();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('codechef');

  const handleValidate = async (platId: string) => {
    const loader = registry.getLoader(platId as any);
    if (loader) {
      const report = await Promise.resolve(loader.validate());
      logAction(`Validated Platform Dataset: ${platId}`, 'Platform Engine', 3);
      alert(`Validation Report for ${platId}: ${report.summary}`);
    }
  };

  const selectedLoader = registry.getLoader(selectedPlatform as any);
  const selectedConfig = registry.getPlatformConfig(selectedPlatform as any);
  const selectedVersion = selectedLoader?.getVersion();
  const healthReport = selectedLoader?.getHealthReport ? selectedLoader.getHealthReport() : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔌</span> Platform Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect registered loaders, metadata, platform capabilities, dataset health scores, and cache stats.
        </p>
      </div>

      {/* Cache Stats Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
        <div><span className="text-slate-400">Cache Entries:</span> <span className="text-slate-100 font-bold">{cacheStats.entries}</span></div>
        <div><span className="text-slate-400">Cache Hits:</span> <span className="text-emerald-400 font-bold">{cacheStats.hits}</span></div>
        <div><span className="text-slate-400">Cache Misses:</span> <span className="text-amber-400 font-bold">{cacheStats.misses}</span></div>
        <div>
          <button
            onClick={() => {
              provider.clearCache();
              logAction('Cleared Platform Provider Caches', 'Platform Engine', 1);
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded text-[11px] font-sans"
          >
            Clear Cache
          </button>
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {configs.map((cfg) => (
          <div
            key={cfg.id}
            onClick={() => setSelectedPlatform(cfg.id)}
            className={`bg-slate-900/60 border rounded-lg p-5 cursor-pointer transition-all ${
              selectedPlatform === cfg.id ? 'border-indigo-500 ring-1 ring-indigo-500' : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.themeColor }} />
                <h3 className="text-sm font-bold text-slate-100">{cfg.displayName}</h3>
                <span className="text-[10px] font-mono text-slate-500">({cfg.id})</span>
              </div>
              <StatusBadge status={cfg.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div>Website: <a href={cfg.websiteUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:underline">{cfg.websiteUrl}</a></div>
              <div>Difficulty Tiers: <span className="text-slate-200">{cfg.difficultySystem.length}</span></div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-slate-800/80 pt-3">
              <span className="text-xs text-slate-400">Capabilities:</span>
              <div className="flex gap-1.5 text-[10px]">
                {cfg.capabilities.supportsRating && <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Rating</span>}
                {cfg.capabilities.supportsContests && <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Contests</span>}
                {cfg.capabilities.supportsEditorial && <span className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">Editorials</span>}
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleValidate(cfg.id);
                }}
                className="text-xs bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 px-2.5 py-1 rounded"
              >
                Validate Dataset
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Platform Detailed Inspection */}
      {selectedConfig && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-200">Inspecting Selected Platform: {selectedConfig.displayName}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-slate-950 p-3 rounded border border-slate-800">
              <span className="text-slate-500">Dataset Version:</span> <span className="text-indigo-400 font-bold">{selectedVersion?.datasetVersion}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800">
              <span className="text-slate-500">Last Updated:</span> <span className="text-slate-200">{selectedVersion?.lastUpdated || 'Static'}</span>
            </div>
            <div className="bg-slate-950 p-3 rounded border border-slate-800">
              <span className="text-slate-500">Health Score:</span> <span className="text-emerald-400 font-bold">{healthReport?.healthScore || 100}%</span>
            </div>
          </div>

          <JSONViewer data={{ config: selectedConfig, healthReport }} title={`Platform Configuration & Health (${selectedPlatform})`} />
        </div>
      )}
    </div>
  );
}
