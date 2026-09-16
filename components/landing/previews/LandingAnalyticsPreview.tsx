'use client';

import React from 'react';
import { Flame, Star } from 'lucide-react';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingAnalyticsPreview() {
  const data = LANDING_PREVIEW_DATA.analytics;

  return (
    <div className="mt-8 rounded-xl bg-[#06090F] p-4 border border-slate-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-400 border border-slate-700/50">
          Example dashboard
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2.5 border border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
            <Flame className="h-4 w-4 fill-amber-400" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Streak</div>
            <div className="text-xs font-bold text-white">{data.streakDays} days</div>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-900/80 p-2.5 border border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
            <Star className="h-4 w-4 fill-indigo-400" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400">Total XP</div>
            <div className="text-xs font-bold text-white">{data.totalXp.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Bar Graph */}
      <div className="flex items-end justify-between gap-1.5 h-14 pt-2">
        {data.activityHistogram.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-t bg-gradient-to-t from-sky-600 to-sky-400 shadow-sm shadow-sky-500/30"
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
