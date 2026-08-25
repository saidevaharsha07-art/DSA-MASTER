'use client';

import React, { useState, useEffect } from 'react';
import { MetricsCollector } from '@/src/core/metrics/metrics.collector';
import { QueryCache } from '@/src/lib/cache/query.cache';
import { JSONViewer } from '../components/JSONViewer';

export default function DevPerformancePage() {
  const [samples, setSamples] = useState(() => MetricsCollector.getSamples());
  const [renderCounts, setRenderCounts] = useState(() => MetricsCollector.getRenderCounts());
  const [hitRatio, setHitRatio] = useState(() => QueryCache.getHitRatio());

  useEffect(() => {
    const timer = setInterval(() => {
      setSamples(MetricsCollector.getSamples());
      setRenderCounts(MetricsCollector.getRenderCounts());
      setHitRatio(QueryCache.getHitRatio());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>⚡</span> Performance & Observability Monitor
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Real-time metrics: FPS, engine execution timing benchmarks, cache hit ratios, render counts, and recommendation latency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Cache Hit Ratio</span>
          <strong className="text-xl font-bold text-emerald-400">{hitRatio}%</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Execution Samples</span>
          <strong className="text-xl font-bold text-indigo-400">{samples.length}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl text-center">
          <span className="text-slate-400 block">Tracked Components</span>
          <strong className="text-xl font-bold text-amber-400">{Object.keys(renderCounts).length}</strong>
        </div>
      </div>

      <JSONViewer data={{ samples, renderCounts, hitRatio }} title="Raw Telemetry & Metric Samples" defaultExpanded={true} />
    </div>
  );
}
