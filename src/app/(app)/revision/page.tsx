'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionRevisionCenterPage() {
  const { bundle, processMemoryReview, isLoading } = useAppBackend();

  if (isLoading || !bundle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const { memoryHealth, revisionQueue } = bundle;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🧠</span> Spaced Repetition Revision Center
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to Learning Memory Engine, Ebbinghaus decay curve calculation, and retention reports.
        </p>
      </div>

      {/* Memory Health Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
          <span className="text-xs text-slate-400 font-mono block">Overall Memory Score</span>
          <strong className="text-2xl font-bold text-indigo-400">{memoryHealth.overallMemoryScore}/100</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
          <span className="text-xs text-slate-400 font-mono block">Average Retention</span>
          <strong className="text-2xl font-bold text-emerald-400">{(memoryHealth.averageRetention * 100).toFixed(0)}%</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
          <span className="text-xs text-slate-400 font-mono block">Concepts at Risk</span>
          <strong className="text-2xl font-bold text-rose-400">{memoryHealth.conceptsAtRiskCount}</strong>
        </div>
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 text-center">
          <span className="text-xs text-slate-400 font-mono block">Review Coverage</span>
          <strong className="text-2xl font-bold text-amber-400">{memoryHealth.reviewCoveragePercentage}%</strong>
        </div>
      </div>

      {/* Overdue Revision Queue */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span>⏳</span> Due Today Revision Queue ({revisionQueue.length})
          </h2>
          <span className="text-xs font-mono text-slate-400">Est. Workload: {memoryHealth.estimatedWeeklyWorkloadMinutes} mins</span>
        </div>

        {revisionQueue.length > 0 ? (
          <div className="space-y-3">
            {revisionQueue.map((item) => (
              <div key={item.conceptId} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-mono ${item.priority === 'Critical' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400'}`}>
                      {item.priority}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{item.pattern} ({item.topic})</h3>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Forgetting Risk: <strong className="text-rose-400">{item.forgettingRisk}%</strong> | Recall Probability: <strong className="text-indigo-400">{(item.recallProbability * 100).toFixed(0)}%</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => processMemoryReview(item.conceptId, 'success')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition-colors"
                  >
                    Mark Remembered
                  </button>
                  <button
                    onClick={() => processMemoryReview(item.conceptId, 'failure')}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-medium transition-colors"
                  >
                    Mark Forgotten
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">Zero overdue reviews! All concepts are currently in stable memory state.</p>
        )}
      </div>
    </div>
  );
}
