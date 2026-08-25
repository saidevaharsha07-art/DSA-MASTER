'use client';

import React from 'react';
import { useAppBackend } from '@/src/components/providers/AppBackendProvider';

export default function ProductionSettingsPage() {
  const { activeStrategyName, setStrategy } = useAppBackend();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <span>⚙️</span> Application Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure Oracle AI Engine strategy, target learning profiles, and platform integrations.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100">Oracle AI Strategy Selection</h2>
        <p className="text-xs text-slate-400">
          The selected strategy changes recommendation prioritization weights across Memory Risk, Mastery Gaps, Contest Readiness, and Rating Gain Potential.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {[
            { name: 'Balanced', desc: 'Equal weights across revision, weakness, contest, and rating climb.' },
            { name: 'Revision Focus', desc: 'Prioritizes Ebbinghaus memory decay repair and overdue reviews.' },
            { name: 'Contest Prep', desc: 'Focuses on contest readiness and speed under time pressure.' },
            { name: 'Interview Prep', desc: 'Targets high-frequency interview coding patterns.' },
            { name: 'Rating Climb', desc: 'Targets competitive programming rating milestones.' },
            { name: 'Topic Mastery', desc: 'Systematically advances topic mastery to Master level.' },
          ].map((strat) => (
            <div
              key={strat.name}
              onClick={() => setStrategy(strat.name)}
              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                activeStrategyName === strat.name
                  ? 'bg-indigo-950/60 border-indigo-500 shadow-md ring-1 ring-indigo-500'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <h3 className="text-xs font-bold text-slate-100">{strat.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{strat.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <span>🔧</span> Developer System Suite & Diagnostics
        </h2>
        <p className="text-xs text-slate-400">
          Access the 28 live developer diagnostic inspectors, platform connector health matrix, memory inspectors, and IoC container service state.
        </p>

        <a
          href="/dev/system"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-md"
        >
          <span>🚀</span> Open Developer System Dashboard (/dev/system)
        </a>
      </div>
    </div>
  );
}
