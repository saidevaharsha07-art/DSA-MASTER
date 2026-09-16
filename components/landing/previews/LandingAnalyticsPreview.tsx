'use client';

import React from 'react';
import { Flame, Star } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingAnalyticsPreview() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';
  const data = LANDING_PREVIEW_DATA.analytics;

  return (
    <div className={`rounded-xl p-4 border space-y-4 transition-colors ${
      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#06090F] border-slate-800/80 shadow-inner'
    }`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium border ${
          isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
        }`}>
          Example dashboard
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className={`flex items-center gap-2 rounded-lg p-2.5 border ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
            <Flame className="h-4 w-4 fill-amber-500" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Streak</div>
            <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{data.streakDays} days</div>
          </div>
        </div>

        <div className={`flex items-center gap-2 rounded-lg p-2.5 border ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-500">
            <Star className="h-4 w-4 fill-indigo-400" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium">Total XP</div>
            <div className={`text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{data.totalXp.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Bar Graph */}
      <div className="flex items-end justify-between gap-1.5 h-14 pt-2">
        {data.activityHistogram.map((val, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-t bg-gradient-to-t from-sky-600 to-sky-400 shadow-sm shadow-sky-500/20"
              style={{ height: `${val}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
