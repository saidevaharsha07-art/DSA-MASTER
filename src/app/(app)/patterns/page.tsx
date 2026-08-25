'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionPatternsPage() {
  const { bundle } = useAppBackend();

  const patterns = [
    { id: 'pat-two-pointers', name: 'Two Pointers', topic: 'Arrays', difficulty: 'Easy', mastery: 85 },
    { id: 'pat-sliding-window', name: 'Sliding Window', topic: 'Strings', difficulty: 'Medium', mastery: 70 },
    { id: 'pat-xor', name: 'XOR Properties', topic: 'Bit Manipulation', difficulty: 'Medium', mastery: 40 },
    { id: 'pat-01-knapsack', name: '0/1 Knapsack', topic: 'Dynamic Programming', difficulty: 'Hard', mastery: 25 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>⚡</span> Coding Pattern Catalog
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to Memory Engine stability scores and recall probabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {patterns.map((pat) => (
          <div key={pat.id} className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-indigo-400">{pat.topic}</span>
              <span className="text-slate-400">{pat.difficulty}</span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">{pat.name}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Mastery</span>
                <span className="text-emerald-400 font-bold">{pat.mastery}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${pat.mastery}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
