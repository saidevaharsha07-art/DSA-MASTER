'use client';

import React, { useState } from 'react';
import { ConnectorRegistry } from '@/src/platforms/connectors/providers/connector.registry';
import { ConnectorManager } from '@/src/platforms/connectors/services/connector.manager';
import { ConnectorService } from '@/src/platforms/connectors/services/connector.service';
import { Container } from '@/src/core/container/container';
import { JSONViewer } from '../components/JSONViewer';

export default function DevConnectorsPage() {
  const [service] = useState<ConnectorService>(() => {
    if (!Container.has('ConnectorService')) {
      const mgr = new ConnectorManager();
      Container.registerSingleton('ConnectorService', new ConnectorService(mgr));
    }
    return Container.resolve<ConnectorService>('ConnectorService');
  });

  const [connectors] = useState(() => ConnectorRegistry.getAllConnectors());
  const [selectedPlatform, setSelectedPlatform] = useState<string>('mock');
  const [searchResults, setSearchResults] = useState<unknown>(null);

  const handleTestSearch = async () => {
    try {
      const res = await service.searchProblems(selectedPlatform, { keyword: 'Arrays', page: 1, pageSize: 5 });
      setSearchResults(res);
    } catch (err) {
      setSearchResults({ error: String(err) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔌</span> Official Platform Connectors & Gateway Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect registered platform connectors, capabilities matrix, health metrics, rate limiter state, and mock request runner.
        </p>
      </div>

      {/* Mock Runner */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Connector Request Runner (Zero Real Network Calls in Milestone 5.3)</h2>
        <div className="flex items-center gap-3 text-xs">
          <label className="text-slate-400">Target Platform:</label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200"
          >
            {connectors.map((c) => (
              <option key={c.platformId} value={c.platformId}>
                {c.name} ({c.platformId})
              </option>
            ))}
          </select>
          <button onClick={handleTestSearch} className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium">
            Run Search Test
          </button>
        </div>
      </div>

      {/* Capabilities Matrix Grid */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-100">Capabilities Matrix ({connectors.length} Connectors)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {connectors.map((c) => {
            const cap = c.capabilities();
            return (
              <div key={c.platformId} className="bg-slate-950 p-4 rounded border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-indigo-400">{c.name}</h3>
                  <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800/40 px-2 py-0.5 rounded font-mono">{cap.apiVersion}</span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-slate-400 font-mono text-[11px]">
                  <span>Profiles: {cap.supportsProfiles ? '✅' : '❌'}</span>
                  <span>Contests: {cap.supportsContests ? '✅' : '❌'}</span>
                  <span>Submissions: {cap.supportsSubmissions ? '✅' : '❌'}</span>
                  <span>Ratings: {cap.supportsRatings ? '✅' : '❌'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <JSONViewer data={{ selectedPlatform, searchResults, connectors: connectors.map((c) => c.capabilities()) }} title="Raw Connector Response Inspector" defaultExpanded={true} />
    </div>
  );
}
