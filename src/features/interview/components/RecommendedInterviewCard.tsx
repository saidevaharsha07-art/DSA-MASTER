'use client';

import React from 'react';
import { Sparkles, ArrowRight, Clock, Target } from 'lucide-react';
import { InterviewReadinessData } from '../types/interview.types';

interface RecommendedInterviewCardProps {
  isLight: boolean;
  recommended: InterviewReadinessData['recommendedSession'];
  onStartRecommended: () => void;
}

export function RecommendedInterviewCard({
  isLight,
  recommended,
  onStartRecommended,
}: RecommendedInterviewCardProps) {
  return (
    <div
      className={`p-6 rounded-2xl border flex flex-col justify-between gap-4 relative overflow-hidden transition-all ${
        isLight
          ? 'bg-gradient-to-br from-cyan-50/40 via-white to-slate-50 border-cyan-200/80 shadow-sm'
          : 'bg-gradient-to-br from-cyan-950/20 via-slate-900/60 to-slate-900 border-cyan-900/30'
      }`}
      data-testid="recommended-interview-card"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            <span>RECOMMENDED INTERVIEW</span>
          </span>

          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{recommended.durationMinutes}m</span>
          </span>
        </div>

        <div>
          <h3 className={`text-base sm:text-lg font-black leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {recommended.title}
          </h3>
          <p className={`text-xs leading-relaxed mt-1.5 font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {recommended.reason}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {recommended.problemCount} {recommended.problemCount === 1 ? 'Problem' : 'Problems'}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            {recommended.difficulty}
          </span>
          {recommended.targetArea && (
            <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex items-center gap-1">
              <Target className="w-2.5 h-2.5" />
              <span>{recommended.targetArea}</span>
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onStartRecommended}
        data-testid="start-recommended-interview-btn"
        className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/15"
      >
        <span>Start Recommended Session</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
