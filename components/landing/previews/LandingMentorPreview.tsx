'use client';

import React from 'react';
import { Bot, ChevronRight, Target } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingMentorPreview() {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';
  const data = LANDING_PREVIEW_DATA.mentor;

  return (
    <div className={`rounded-xl p-4 border space-y-3 transition-colors ${
      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#06090F] border-slate-800/80 shadow-inner'
    }`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-medium border ${
          isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800/80 text-slate-400 border-slate-700/50'
        }`}>
          Product preview
        </span>
      </div>

      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
          <Bot className="h-4 w-4" />
        </div>
        <div className="text-[11px] leading-relaxed">
          <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{data.mentorName}</span>
          <p className={`text-[10px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Recommended next challenge for your skill progression:</p>
        </div>
      </div>

      {/* Recommended Problem Card */}
      <div className={`flex items-center justify-between rounded-lg p-3 border transition cursor-pointer ${
        isLight 
          ? 'bg-slate-50 border-slate-200 hover:border-purple-400 hover:bg-slate-100/80' 
          : 'bg-slate-900/90 border-slate-700/60 hover:border-purple-500/40'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>{data.recommendedProblem}</span>
            <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-500 border border-amber-500/20">
              {data.recommendedDifficulty}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
            <Target className="h-3 w-3 text-sky-500" />
            <span>Focus: {data.recommendedFocus}</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-sky-500" />
      </div>
    </div>
  );
}
