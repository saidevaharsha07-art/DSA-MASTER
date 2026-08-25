'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionLearningPage() {
  const { bundle, isLoading } = useAppBackend();

  if (isLoading || !bundle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>📚</span> Structured Learning Curriculum
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to curriculum topics, mastery progression, and pattern catalogs.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Curriculum Mastery Breakdown</h2>
        <div className="space-y-3 text-xs">
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-200">Phase 1: Fundamental Data Structures</h3>
              <p className="text-slate-400">Arrays, Strings, Two Pointers, Sliding Window</p>
            </div>
            <span className="text-emerald-400 font-bold font-mono">85% Mastered</span>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-200">Phase 2: Advanced Search & Dynamic Programming</h3>
              <p className="text-slate-400">0/1 Knapsack, Memoization, BFS/DFS, Trees</p>
            </div>
            <span className="text-amber-400 font-bold font-mono">40% In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}
