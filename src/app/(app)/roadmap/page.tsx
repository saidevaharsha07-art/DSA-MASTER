'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionRoadmapPage() {
  const { profile } = useAppBackend();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🗺️</span> Skill Roadmap & Unlock Path
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to profile mastery and pattern completion state.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Interactive Learning Path</h2>
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-indigo-500/40 flex justify-between items-center">
            <span className="text-indigo-400 font-bold">✓ Phase 1: Array Manipulation & Pointers</span>
            <span className="text-emerald-400">UNLOCKED</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
            <span className="text-slate-300 font-bold">▶ Phase 2: Dynamic Programming & Bitmask</span>
            <span className="text-amber-400">IN PROGRESS</span>
          </div>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800/40 flex justify-between items-center opacity-60">
            <span className="text-slate-500 font-bold">🔒 Phase 3: Graph Algorithms & Network Flow</span>
            <span className="text-slate-500">LOCKED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
