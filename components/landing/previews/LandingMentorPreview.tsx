'use client';

import React from 'react';
import { Bot, ChevronRight, Target } from 'lucide-react';
import { LANDING_PREVIEW_DATA } from '../preview-constants';

export function LandingMentorPreview() {
  const data = LANDING_PREVIEW_DATA.mentor;

  return (
    <div className="mt-8 rounded-xl bg-[#06090F] p-4 border border-slate-800/80 space-y-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded bg-slate-800/80 px-1.5 py-0.5 text-[9px] font-medium text-slate-400 border border-slate-700/50">
          Product preview
        </span>
      </div>

      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
          <Bot className="h-4 w-4" />
        </div>
        <div className="text-[11px] leading-relaxed text-slate-300">
          <span className="font-bold text-white">{data.mentorName}</span>
          <p className="text-slate-400 text-[10px]">Here&apos;s a problem I recommend for you based on your recent activity:</p>
        </div>
      </div>

      {/* Recommended Problem Card */}
      <div className="flex items-center justify-between rounded-lg bg-slate-900/90 p-3 border border-slate-700/60 hover:border-purple-500/40 transition cursor-pointer">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-100">{data.recommendedProblem}</span>
            <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold text-amber-400 border border-amber-500/20">
              {data.recommendedDifficulty}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
            <Target className="h-3 w-3 text-sky-400" />
            <span>Focus: {data.recommendedFocus}</span>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-sky-400" />
      </div>
    </div>
  );
}
