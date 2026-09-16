'use client';

import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingRevisionPreview() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';
  const data = LANDING_PREVIEW_DATA.revision;

  const items = [
    { label: 'Due for Review', count: data.dueForReview, dotColor: 'bg-rose-500' },
    { label: 'At Risk', count: data.atRisk, dotColor: 'bg-amber-500' },
    { label: 'Good Recall', count: data.good, dotColor: 'bg-emerald-500' },
    { label: 'Mastered', count: data.mastered, dotColor: 'bg-sky-500' },
  ];

  return (
    <div className={`rounded-xl p-4 border space-y-2.5 transition-colors ${
      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#06090F] border-slate-800/80 shadow-inner'
    }`}>
      <div className="flex items-center justify-between pb-1">
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium border ${
          isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
        }`}>
          Example dashboard
        </span>
      </div>

      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between rounded-lg px-3 py-2 border transition ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900/60 border-slate-800/60 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span className={`h-2 w-2 rounded-full ${item.dotColor}`} />
            <span className="text-xs font-medium">{item.label}</span>
          </div>
          <span className={`text-xs font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{item.count}</span>
        </div>
      ))}
    </div>
  );
}
