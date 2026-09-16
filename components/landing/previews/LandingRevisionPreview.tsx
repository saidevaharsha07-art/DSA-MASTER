'use client';

import React from 'react';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingRevisionPreview() {
  const data = LANDING_PREVIEW_DATA.revision;

  const items = [
    { label: 'Due for Review', count: data.dueForReview, dotColor: 'bg-rose-500 shadow-rose-500/50' },
    { label: 'At Risk', count: data.atRisk, dotColor: 'bg-amber-500 shadow-amber-500/50' },
    { label: 'Good', count: data.good, dotColor: 'bg-emerald-500 shadow-emerald-500/50' },
    { label: 'Mastered', count: data.mastered, dotColor: 'bg-sky-500 shadow-sky-500/50' },
  ];

  return (
    <div className="mt-8 rounded-xl bg-[#06090F] p-4 border border-slate-800/80 space-y-2.5">
      <div className="flex items-center justify-between pb-1">
        <span className="inline-flex items-center rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-400 border border-slate-700/50">
          Example dashboard
        </span>
      </div>

      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between rounded-lg bg-slate-900/60 px-3 py-2 border border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${item.dotColor} shadow-sm`} />
            <span className="text-xs font-medium text-slate-300">{item.label}</span>
          </div>
          <span className="text-xs font-mono font-bold text-white">{item.count}</span>
        </div>
      ))}
    </div>
  );
}
