'use client';

import React, { useState } from 'react';
import { PluginRegistry } from '@/src/core/plugins/plugin.registry';
import { JSONViewer } from '../components/JSONViewer';

export default function DevPluginsPage() {
  const [plugins] = useState(() => PluginRegistry.getAllPlugins());

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🔌</span> Plugin Registry & Extensions Inspector
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Inspect registered platform loaders, recommendation strategies, analytics providers, AI providers, and visualizers.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-bold text-slate-100">Registered Plugins ({plugins.length})</h2>
        {plugins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {plugins.map((p) => (
              <div key={p.id} className="bg-slate-950 p-4 rounded border border-slate-800 space-y-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-indigo-400">{p.name}</h3>
                  <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-800/40 px-2 py-0.5 rounded font-mono">{p.type}</span>
                </div>
                <p className="text-slate-400">{p.description}</p>
                <span className="text-xs text-slate-400 font-mono block">v{p.version}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">Zero custom plugins currently registered.</p>
        )}
      </div>

      <JSONViewer data={plugins} title="Plugin Instances" defaultExpanded={true} />
    </div>
  );
}
