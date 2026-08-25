'use client';

import React from 'react';

export default function DependencyViewerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <span>🕸️</span> Engine Dependency Relationship Viewer
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Visual representation of strictly enforced one-way architecture dependencies across backend engine layers.
        </p>
      </div>

      {/* Architecture Diagram Box */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-6 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
        <h2 className="text-sm font-bold text-slate-100 font-sans mb-4">Architecture & Dependency Flow</h2>
        <pre className="text-indigo-300 bg-slate-950 p-4 rounded border border-slate-800">
{`                        UI Layer (Future Phase 3.7)
                                    │
                                    ▼
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
Practice Scheduler            Contest Engine               Rating Engine
 (Daily / Weekly)          (Contest Analytics)       (Rating Normalization)
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │
                                    ▼
                             Adaptive Engine
                    (Strategy Pattern & Constraints)
                                    │
                                    ▼
                      Intelligence Foundation Layer
                     (Profile, Analyzers, Storage, Stats)
                                    │
                                    ▼
                             Platform Engine
                         (src/platforms/ Provider)
                                    │
                                    ▼
                            Platform Loaders
                    (CodeChef, Codeforces, LeetCode)`}
        </pre>
      </div>

      {/* Layer Description Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-slate-200 mb-1">Layer 1: Platform Engine (@/platforms)</h3>
          <p className="text-slate-400">Decouples problem datasets. Implements IPlatformLoader and PlatformRegistry with query caching.</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-slate-200 mb-1">Layer 2: Intelligence Foundation (@/intelligence)</h3>
          <p className="text-slate-400">Pure stateless analyzers, domain scoring rules (0-100), and storage abstraction.</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-slate-200 mb-1">Layer 3: Adaptive Engine & Practice Scheduler</h3>
          <p className="text-slate-400">7 interchangeable practice strategies, constraint engine, and multi-horizon scheduler.</p>
        </div>
        <div className="bg-slate-900/40 border border-slate-800 rounded-lg p-4">
          <h3 className="font-bold text-slate-200 mb-1">Layer 4: Contest Intelligence & Rating Engine</h3>
          <p className="text-slate-400">Contest analytics, percentile calculations, cross-platform rating normalizers, & rating predictor.</p>
        </div>
      </div>
    </div>
  );
}
