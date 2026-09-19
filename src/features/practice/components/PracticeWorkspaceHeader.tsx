'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Zap, 
  Play, 
  Flame, 
  CalendarCheck, 
  Compass, 
  Layers, 
  Sparkles,
  Trophy,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface PracticeWorkspaceHeaderProps {
  totalPlatformSolved: number;
  totalPlatformProblems: number;
  totalSolvedOverall: number;
  totalProblemsOverall: number;
  accuracyPct: number;
  currentStreak: number;
  currentPlatformName: string;
  currentPlatformColor: string;
  activeContext?: {
    areaTitle?: string;
    subtopicTitle?: string;
    patternTitle?: string;
  };
  onStartSession: (count: number) => void;
}

export function PracticeWorkspaceHeader({
  totalPlatformSolved,
  totalPlatformProblems,
  totalSolvedOverall,
  totalProblemsOverall,
  accuracyPct,
  currentStreak,
  currentPlatformName,
  currentPlatformColor,
  activeContext,
  onStartSession,
}: PracticeWorkspaceHeaderProps) {
  const hasContext = Boolean(
    activeContext?.areaTitle || activeContext?.subtopicTitle || activeContext?.patternTitle
  );

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* ── Context Ribbon (if arrived from Journey, Pattern Academy, or Roadmap) ── */}
      {hasContext && (
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-xs font-mono text-[var(--text-muted)] overflow-x-auto scrollbar-none">
          <span className="flex items-center gap-1 text-[var(--accent)] font-semibold shrink-0">
            <Compass size={12} /> Active Context:
          </span>
          {activeContext?.areaTitle && (
            <span className="text-[var(--text-primary)] font-medium shrink-0">
              {activeContext.areaTitle}
            </span>
          )}
          {activeContext?.subtopicTitle && (
            <>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-medium shrink-0">
                {activeContext.subtopicTitle}
              </span>
            </>
          )}
          {activeContext?.patternTitle && (
            <>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--accent)] font-semibold shrink-0">
                {activeContext.patternTitle}
              </span>
            </>
          )}
        </div>
      )}

      {/* ── Top Hero Bar: Title & Sprint Launchers ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent)]/25 flex items-center justify-center text-[var(--accent)] shrink-0">
              <Code2 size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              Practice Arena
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
                Workspace 2.5
              </span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
            Professional coding workstation: <span className="font-mono text-[var(--text-primary)] font-medium">Read → Think → Code → Run → Submit → Review → Next</span>
          </p>
        </div>

        {/* Quick Sprint Session Launchers & Today's Plan CTA */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] font-semibold mr-1">
            Sprint:
          </span>
          <button
            type="button"
            onClick={() => onStartSession(5)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all cursor-pointer"
            aria-label="Start 5 problem session"
          >
            <Zap size={13} className="text-emerald-400" />
            <span>5 Problems</span>
          </button>
          <button
            type="button"
            onClick={() => onStartSession(10)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-sky-500/50 hover:text-sky-400 hover:bg-sky-500/10 transition-all cursor-pointer"
            aria-label="Start 10 problem session"
          >
            <Play size={13} className="text-sky-400" />
            <span>10 Problems</span>
          </button>
          <button
            type="button"
            onClick={() => onStartSession(20)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] hover:border-purple-500/50 hover:text-purple-400 hover:bg-purple-500/10 transition-all cursor-pointer"
            aria-label="Start 20 problem session"
          >
            <Flame size={13} className="text-purple-400" />
            <span>20 Problems</span>
          </button>

          <Link
            href="/study-plan"
            data-testid="continue-today-plan-btn"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500 hover:text-white transition-all ml-1 shadow-xs"
          >
            <CalendarCheck size={13} />
            <span>Continue Today&apos;s Plan</span>
          </Link>
        </div>
      </div>

      {/* ── 4 Telemetry Metrics HUD Tiles ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="flex flex-col p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            {currentPlatformName} Solved
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 font-mono">
            <strong className="text-lg font-bold" style={{ color: currentPlatformColor }}>
              {totalPlatformSolved}
            </strong>
            <span className="text-xs text-[var(--text-muted)]">/ {totalPlatformProblems}</span>
          </div>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Total Solved
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 font-mono">
            <strong className="text-lg font-bold text-emerald-400">
              {totalSolvedOverall}
            </strong>
            <span className="text-xs text-[var(--text-muted)]">/ {totalProblemsOverall}</span>
          </div>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Accuracy Rate
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 font-mono">
            <strong className="text-lg font-bold text-[var(--accent)]">
              {accuracyPct}%
            </strong>
            <span className="text-xs text-[var(--text-muted)]">acceptance</span>
          </div>
        </div>

        <div className="flex flex-col p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Active Streak
          </span>
          <div className="flex items-baseline gap-1 mt-0.5 font-mono">
            <strong className="text-lg font-bold text-amber-400">
              {currentStreak}d
            </strong>
            <span className="text-xs text-[var(--text-muted)]">consecutive</span>
          </div>
        </div>
      </div>
    </div>
  );
}
