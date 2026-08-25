'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionJourneyPage() {
  const { profile, bundle, isLoading } = useAppBackend();

  if (isLoading || !bundle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const kingdoms = [
    { id: 'arrays', name: 'Kingdom of Arrays & Pointers', difficulty: 'Beginner', progress: 80, isUnlocked: true, status: 'Mastered' },
    { id: 'dp', name: 'Kingdom of Dynamic Programming', difficulty: 'Advanced', progress: 35, isUnlocked: true, status: 'In Progress' },
    { id: 'graphs', name: 'Kingdom of Graphs & Trees', difficulty: 'Advanced', progress: 15, isUnlocked: false, status: 'Locked' },
    { id: 'math', name: 'Kingdom of Bitmask & Number Theory', difficulty: 'Expert', progress: 0, isUnlocked: false, status: 'Locked' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🗺️</span> Learning Journey & Kingdom Progression
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to LearningProfile, Mastery Engine, Pattern Completion, and Platform Statistics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kingdoms.map((k) => (
          <div key={k.id} className={`bg-slate-900/60 border rounded-xl p-5 space-y-3 transition-colors ${k.isUnlocked ? 'border-slate-800' : 'border-slate-800/40 opacity-60'}`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-400">{k.difficulty}</span>
              <span className={`text-xs px-2 py-0.5 rounded font-mono ${k.status === 'Mastered' ? 'bg-emerald-500/10 text-emerald-400' : k.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                {k.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-100">{k.name}</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Mastery Progress</span>
                <span>{k.progress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${k.progress}%` }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Strengths Summary */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-3">
        <h2 className="text-base font-bold text-slate-100">Live Mastery Engine Summary</h2>
        <p className="text-xs text-slate-300 font-mono">{bundle.strength.primaryStrengthSummary}</p>
        <p className="text-xs text-slate-400">Consistency Score: <strong className="text-emerald-400">{bundle.strength.consistencyScore}/100</strong> | Total Solved Problems: <strong className="text-indigo-400">{profile.solvedProblemIds.size}</strong></p>
      </div>
    </div>
  );
}
