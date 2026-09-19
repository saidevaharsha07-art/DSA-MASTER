'use client';

import React from 'react';
import Link from 'next/link';
import { Play, StopCircle, Zap, FastForward } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface ActiveSprintCardProps {
  activeSessionSummary: DashboardSummary['activeSessionSummary'];
  onEndSession: () => void;
}

export function ActiveSprintCard({ activeSessionSummary, onEndSession }: ActiveSprintCardProps) {
  if (activeSessionSummary?.hasActiveSession) {
    const {
      completedCount,
      sessionSize,
      progressPercent,
      currentProblem,
      continueUrl,
    } = activeSessionSummary;

    return (
      <div
        data-testid="continue-session-card"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.04)] shadow-sm transition-all duration-200"
      >
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#10B981]">
              Active Practice Sprint in Progress
            </span>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              ({completedCount} / {sessionSize} completed)
            </span>
          </div>

          {currentProblem && (
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              Current Problem: <span className="text-[var(--text-primary)] font-bold">{currentProblem.title}</span>{' '}
              <span className="text-xs font-mono text-[var(--text-secondary)]">({currentProblem.difficulty})</span>
            </div>
          )}

          {/* Progress Bar */}
          <div className="w-full max-w-md h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
            <div
              className="h-full bg-[#10B981] rounded-full transition-all duration-300"
              style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onEndSession}
            data-testid="end-session-btn"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-semibold cursor-pointer transition-colors"
          >
            <StopCircle className="w-3.5 h-3.5" />
            <span>End Sprint</span>
          </button>

          <Link href={continueUrl} className="no-underline">
            <button
              type="button"
              data-testid="continue-session-btn"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Continue Practice</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // Restrained Empty State: Sprint launcher
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] text-xs">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center shrink-0">
          <Zap className="w-3.5 h-3.5" />
        </div>
        <div>
          <span className="font-semibold text-[var(--text-primary)] block">
            Start a 5 / 10 / 20 problem sprint
          </span>
          <span className="text-[11px] text-[var(--text-secondary)]">
            Jump into a fast, targeted adaptive practice set
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Link href="/practice?mode=recommended&count=5" className="no-underline">
          <button
            type="button"
            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs font-mono font-bold cursor-pointer transition-colors"
          >
            5
          </button>
        </Link>
        <Link href="/practice?mode=recommended&count=10" className="no-underline">
          <button
            type="button"
            className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs font-mono font-bold cursor-pointer transition-colors"
          >
            10
          </button>
        </Link>
        <Link href="/practice?mode=recommended&count=20" className="no-underline">
          <button
            type="button"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs font-mono font-bold cursor-pointer transition-colors"
          >
            <FastForward className="w-3 h-3 text-[var(--accent)]" />
            <span>20</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
