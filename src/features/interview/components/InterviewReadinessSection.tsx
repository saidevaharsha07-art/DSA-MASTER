'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { InterviewReadinessData } from '../types/interview.types';

interface InterviewReadinessSectionProps {
  isLight: boolean;
  readiness: InterviewReadinessData;
}

export function InterviewReadinessSection({
  isLight,
  readiness,
}: InterviewReadinessSectionProps) {
  return (
    <div
      className={`p-6 rounded-2xl border flex flex-col justify-between gap-5 transition-all ${
        isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-slate-900/60 border-slate-800'
      }`}
      data-testid="interview-readiness-hud"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Evidence-Based Interview Readiness
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h2 className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {readiness.level}
            </h2>

            <span
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${
                readiness.level === 'Strong Evidence'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : readiness.level === 'Developing'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
                  : readiness.level === 'Needs Practice'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
              }`}
            >
              {readiness.totalCompletedSessions} {readiness.totalCompletedSessions === 1 ? 'Round' : 'Rounds'} Completed
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Confidence Metric:</span>
          <span className="font-mono font-bold text-cyan-500 dark:text-cyan-400">{readiness.confidenceScore}%</span>
        </div>
      </div>

      {/* 4 Telemetry Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Historical Accuracy</div>
          <div className="text-base font-mono font-black text-emerald-500 dark:text-emerald-400 mt-0.5">
            {readiness.historicalAccuracyPercent}%
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Speed Pacing</div>
          <div className="text-base font-mono font-black text-cyan-500 dark:text-cyan-400 mt-0.5">
            {readiness.speedPacingScore > 0 ? `${readiness.speedPacingScore}m / prob` : 'No data'}
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Pattern Coverage</div>
          <div className="text-base font-mono font-black text-purple-500 dark:text-purple-400 mt-0.5">
            {readiness.patternCoverageCount} / 113
          </div>
        </div>

        <div className={`p-3 rounded-xl border text-center ${isLight ? 'bg-slate-50/70 border-slate-200' : 'bg-slate-950/40 border-slate-800/80'}`}>
          <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Recommended Focus</div>
          <div className="text-xs font-semibold text-amber-500 dark:text-amber-400 mt-1 truncate" title={readiness.recommendedFocus}>
            {readiness.recommendedFocus}
          </div>
        </div>
      </div>

      {/* Weak Areas & Strong Areas Chips */}
      <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-slate-200/60 dark:border-slate-800/60">
        <span className="font-semibold text-slate-500 dark:text-slate-400">Weak Spots:</span>
        {readiness.weakestAreas && readiness.weakestAreas.length > 0 ? (
          readiness.weakestAreas.map((area, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20"
            >
              {area}
            </span>
          ))
        ) : (
          <span className="text-slate-400 text-xs font-mono">None detected yet</span>
        )}

        <span className="text-slate-400 mx-1">•</span>
        <span className="font-semibold text-slate-500 dark:text-slate-400">Solid:</span>
        {readiness.strongestAreas && readiness.strongestAreas.length > 0 ? (
          readiness.strongestAreas.map((area, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20"
            >
              {area}
            </span>
          ))
        ) : (
          <span className="text-slate-400 text-xs font-mono">Building baseline</span>
        )}
      </div>
    </div>
  );
}
