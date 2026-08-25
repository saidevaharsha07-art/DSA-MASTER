'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionKingdomsPage() {
  const { bundle } = useAppBackend();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🏰</span> DSA Kingdoms & Boss Battles
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to Mastery Engine and Pattern Completion thresholds.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-emerald-400 font-bold font-mono">Unconquered Kingdom</span>
          <h3 className="text-sm font-bold text-slate-100">Kingdom of Two Pointers</h3>
          <p className="text-slate-400">Boss: The Sliding Window Dragon (Level 3)</p>
          <button className="mt-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded font-medium transition-colors">
            Challenge Boss
          </button>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-2">
          <span className="text-amber-400 font-bold font-mono">In Progress</span>
          <h3 className="text-sm font-bold text-slate-100">Kingdom of Dynamic Programming</h3>
          <p className="text-slate-400">Boss: The Memoization Golem (Level 5)</p>
          <button className="mt-2 px-3 py-1.5 bg-slate-800 text-slate-400 rounded font-medium">
            Requires 60% DP Mastery
          </button>
        </div>
      </div>
    </div>
  );
}
