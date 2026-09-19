'use client';

import React from 'react';
import { Timer, Zap, BarChart3 } from 'lucide-react';

interface InterviewLandingHeaderProps {
  isLight: boolean;
  selectedDuration: number;
  selectedCount: number;
  showSampleReport: boolean;
  onToggleSampleReport: () => void;
  onStart: () => void;
}

export function InterviewLandingHeader({
  isLight,
  selectedDuration,
  selectedCount,
  showSampleReport,
  onToggleSampleReport,
  onStart,
}: InterviewLandingHeaderProps) {
  return (
    <div
      className={`p-6 sm:p-8 md:p-9 rounded-2xl border transition-all relative overflow-hidden ${
        isLight
          ? 'bg-white border-slate-200/80 shadow-sm'
          : 'bg-slate-900/70 border-slate-800'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <Timer className="w-3 h-3 text-cyan-500" />
            <span>SIMULATED TECHNICAL INTERVIEW ENVIRONMENT</span>
          </div>

          <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Interview Arena
          </h1>

          <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Simulate real-world technical interview rounds under authentic clock pressure. Features realistic pattern concealment, approach & invariant notes, interviewer checklist milestones, and factual engineering diagnostics.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleSampleReport}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center gap-2 ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showSampleReport ? 'Hide Sample Preview' : 'Preview Sample Report'}</span>
          </button>

          <button
            type="button"
            onClick={onStart}
            data-testid="start-interview-btn"
            className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Start Interview ({selectedDuration}m • {selectedCount}P)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
