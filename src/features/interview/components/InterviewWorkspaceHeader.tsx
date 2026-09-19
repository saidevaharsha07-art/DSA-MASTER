'use client';

import React from 'react';
import { Timer, Play, Pause, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';
import { InterviewArenaSession, InterviewArenaProblemAttempt } from '../types/interview.types';

interface InterviewWorkspaceHeaderProps {
  isLight: boolean;
  session: InterviewArenaSession;
  activeIndex: number;
  onSelectProblem: (index: number) => void;
  remainingSeconds: number;
  isPaused: boolean;
  onTogglePause: () => void;
  onOpenFinishModal: () => void;
}

export function InterviewWorkspaceHeader({
  isLight,
  session,
  activeIndex,
  onSelectProblem,
  remainingSeconds,
  isPaused,
  onTogglePause,
  onOpenFinishModal,
}: InterviewWorkspaceHeaderProps) {
  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Timer state
  const timerState: 'paused' | 'critical' | 'warning' | 'normal' = isPaused
    ? 'paused'
    : remainingSeconds <= 60
    ? 'critical'
    : remainingSeconds <= 300
    ? 'warning'
    : 'normal';

  return (
    <header
      className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 select-none ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}
    >
      {/* Left: Quiet Brand & Round Meta */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              isPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'
            }`}
            aria-hidden="true"
          />
          <div className="flex items-center gap-1.5 font-mono">
            <span className={`font-black text-xs tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
              DSA MASTER
            </span>
            <span className="text-slate-400 text-xs">/</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Technical Interview
            </span>
          </div>
        </div>

        {session.config.targetCompany && (
          <span className="hidden sm:inline-flex text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            {session.config.targetCompany}
          </span>
        )}

        <span className="hidden md:inline-flex text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {session.config.difficulty}
        </span>
      </div>

      {/* Center: Compact Problem Progress Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto py-0.5" data-testid="problem-tabs-container" role="tablist">
        {session.problems.map((p: InterviewArenaProblemAttempt, idx: number) => {
          const isCurrent = idx === activeIndex;
          const isCompleted = p.status === 'passed';
          const isFailed = p.status === 'failed';

          return (
            <button
              key={p.problemId || idx}
              type="button"
              role="tab"
              aria-selected={isCurrent}
              onClick={() => onSelectProblem(idx)}
              data-testid={`problem-tab-${idx + 1}`}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border shrink-0 ${
                isCurrent
                  ? isLight
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-cyan-500 text-slate-950 border-cyan-500 font-black'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              <span>Problem {idx + 1}</span>
              {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" aria-label="Solved" />}
              {isFailed && <XCircle className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" aria-label="Failed" />}
              {!isCompleted && !isFailed && <span className="w-1.5 h-1.5 rounded-full bg-slate-400" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      {/* Right: Restrained Timer, Pause, & Exit/Finish */}
      <div className="flex items-center gap-2">
        {/* Pause Button */}
        <button
          type="button"
          onClick={onTogglePause}
          data-testid="pause-resume-btn"
          aria-label={isPaused ? 'Resume Interview' : 'Pause Interview'}
          className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-colors flex items-center gap-1.5 ${
            isPaused
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 dark:text-amber-400'
              : isLight
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
          }`}
        >
          {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3" />}
          <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
        </button>

        {/* Countdown Timer with Accessible Labels */}
        <div
          data-testid="interview-timer"
          role="timer"
          aria-live="polite"
          aria-label={`Time remaining: ${formatTime(remainingSeconds)}`}
          className={`px-3 py-1 rounded-lg border flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm tracking-wider transition-all ${
            timerState === 'critical'
              ? 'bg-rose-500/20 text-rose-500 dark:text-rose-400 border-rose-500/40 ring-1 ring-rose-500 animate-pulse'
              : timerState === 'warning'
              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40 ring-1 ring-amber-500/30'
              : timerState === 'paused'
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
              : isLight
              ? 'bg-slate-100 text-slate-900 border-slate-200'
              : 'bg-slate-800/80 text-cyan-400 border-slate-700'
          }`}
        >
          <Timer className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{formatTime(remainingSeconds)}</span>
          {timerState === 'critical' && <span className="sr-only">(Critical time remaining)</span>}
          {timerState === 'warning' && <span className="sr-only">(5 minutes or less remaining)</span>}
        </div>

        {/* Finish Interview Button */}
        <button
          type="button"
          onClick={onOpenFinishModal}
          data-testid="finish-interview-btn"
          className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all shrink-0"
        >
          Finish
        </button>
      </div>
    </header>
  );
}
