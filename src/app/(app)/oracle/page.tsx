'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionOraclePanelPage() {
  const { snapshot, activeStrategyName, setStrategy, isLoading } = useAppBackend();

  if (isLoading || !snapshot) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>🤖</span> Oracle AI Recommendation Engine Panel
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Connected live to Oracle AI Engine. Displays unified recommendations, decision traces, engine contribution breakdowns, and planners.
        </p>
      </div>

      {/* Strategy Switcher */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <span className="text-xs font-semibold text-slate-200 block">Active Oracle Strategy:</span>
        <div className="flex flex-wrap gap-2">
          {['Balanced', 'Contest Prep', 'Revision Focus', 'Interview Prep', 'Rating Climb', 'Topic Mastery'].map((strat) => (
            <button
              key={strat}
              onClick={() => setStrategy(strat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-colors ${
                activeStrategyName === strat
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {strat}
            </button>
          ))}
        </div>
      </div>

      {/* Unified Score Composition */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-100">Unified Learning Score Composition</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs font-mono">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Memory</span>
            <strong className="text-indigo-400 font-bold">{snapshot.overallLearningScore.memoryContribution}/25</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Mastery</span>
            <strong className="text-emerald-400 font-bold">{snapshot.overallLearningScore.masteryContribution}/25</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Contest</span>
            <strong className="text-amber-400 font-bold">{snapshot.overallLearningScore.contestContribution}/15</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Rating</span>
            <strong className="text-purple-400 font-bold">{snapshot.overallLearningScore.ratingContribution}/15</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Consistency</span>
            <strong className="text-sky-400 font-bold">{snapshot.overallLearningScore.consistencyContribution}/10</strong>
          </div>
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-slate-400 block">Adaptive</span>
            <strong className="text-rose-400 font-bold">{snapshot.overallLearningScore.adaptiveContribution}/10</strong>
          </div>
        </div>
      </div>

      {/* Decision Traces & Recommendations */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-base font-bold text-slate-100">Live Recommendations & Decision Traces</h2>
        <div className="space-y-4">
          {snapshot.recommendations.map((rec) => (
            <div key={rec.id} className="bg-slate-950 border border-slate-800 rounded-lg p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-slate-100">{rec.title}</h3>
                <span className="text-xs font-mono text-emerald-400 font-bold">Score: {rec.rankingScore}/100</span>
              </div>
              <p className="text-xs text-slate-300">{rec.description}</p>

              {/* Engine Contribution Map Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-900 text-xs font-mono">
                <span className="text-slate-400">Engine Contributions:</span>
                {Object.entries(rec.engineContributionMap || {}).map(([eng, pct]) => (
                  <span key={eng} className="bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 px-2 py-0.5 rounded">
                    {eng}: {pct}%
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
