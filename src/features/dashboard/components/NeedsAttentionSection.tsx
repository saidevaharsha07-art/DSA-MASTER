'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, AlertTriangle, ArrowRight, ShieldAlert } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface NeedsAttentionSectionProps {
  revisionQueueSnapshot: DashboardSummary['revisionQueueSnapshot'];
  mistakeSnapshot: DashboardSummary['mistakeSnapshot'];
}

export function NeedsAttentionSection({
  revisionQueueSnapshot,
  mistakeSnapshot,
}: NeedsAttentionSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-[#F59E0B]" />
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] m-0">
          Needs Attention
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {/* Card 1: Revision Queue (SRS) */}
        <div
          data-testid="revision-queue-card"
          className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 hover:border-[var(--border-strong)]"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[rgba(139,92,246,0.12)] text-[#8B5CF6] flex items-center justify-center shrink-0">
                <RotateCcw className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)] block">
                  Revision Queue (SRS)
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  Spaced Repetition Schedule
                </span>
              </div>
            </div>

            <Link href={revisionQueueSnapshot?.reviseUrl || '/practice?mode=mistakes'} className="no-underline">
              <button
                type="button"
                data-testid="revise-now-btn"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[rgba(139,92,246,0.1)] hover:bg-[rgba(139,92,246,0.18)] border border-[rgba(139,92,246,0.3)] text-[#8B5CF6] text-xs font-bold cursor-pointer transition-colors"
              >
                <span>Revise Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* 3 Metric Pills: Due Now, Due Today, Upcoming */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.2)]">
              <span className="text-base font-mono font-bold text-[#EF4444] block leading-none">
                {revisionQueueSnapshot?.dueNowCount || 0}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                Due Now
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.2)]">
              <span className="text-base font-mono font-bold text-[#F59E0B] block leading-none">
                {revisionQueueSnapshot?.dueTodayCount || 0}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                Due Today
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[rgba(59,130,246,0.06)] border border-[rgba(59,130,246,0.2)]">
              <span className="text-base font-mono font-bold text-[#3B82F6] block leading-none">
                {revisionQueueSnapshot?.upcomingCount || 0}
              </span>
              <span className="text-[10px] text-[var(--text-muted)] font-medium mt-1 block">
                Upcoming
              </span>
            </div>
          </div>

          {/* Due Items Preview or Clean State */}
          {(!revisionQueueSnapshot?.items || revisionQueueSnapshot.items.length === 0) ? (
            <div className="p-2.5 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-subtle)]">
              No cards due for revision right now!
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {revisionQueueSnapshot.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs"
                >
                  <span className="font-medium text-[var(--text-primary)] truncate">
                    {item.problem.title}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">
                    {item.dueText}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Card 2: Mistake Snapshot */}
        <div
          data-testid="mistake-snapshot-card"
          className="flex flex-col gap-3 p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 hover:border-[var(--border-strong)]"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[rgba(249,115,22,0.12)] text-[#F97316] flex items-center justify-center shrink-0">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-[var(--text-primary)] block">
                  Mistakes Intelligence
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">
                  {mistakeSnapshot?.totalMistakesCount || 0} Unresolved Patterns
                </span>
              </div>
            </div>

            <Link href={mistakeSnapshot?.reviewMistakesUrl || '/practice?mode=mistakes'} className="no-underline">
              <button
                type="button"
                data-testid="review-mistakes-btn"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[rgba(249,115,22,0.1)] hover:bg-[rgba(249,115,22,0.18)] border border-[rgba(249,115,22,0.3)] text-[#F97316] text-xs font-bold cursor-pointer transition-colors"
              >
                <span>Review Mistakes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Link>
          </div>

          {/* Recent Mistakes List or Clean State */}
          {(!mistakeSnapshot?.hasMistakes || !mistakeSnapshot.recentMistakes || mistakeSnapshot.recentMistakes.length === 0) ? (
            <div className="p-2.5 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-subtle)]">
              No recent mistakes logged. Clean performance!
            </div>
          ) : (
            <div className="flex flex-col gap-1.5">
              {mistakeSnapshot.recentMistakes.slice(0, 3).map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 p-2 rounded-md bg-[rgba(249,115,22,0.04)] border border-[rgba(249,115,22,0.15)] text-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[var(--text-primary)] font-semibold truncate">
                      {m.problem.title}
                    </strong>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[rgba(239,68,68,0.1)] text-[#EF4444] border border-[rgba(239,68,68,0.2)] shrink-0">
                      {m.failureType}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)] font-mono">
                    <span>{m.platform}</span>
                    <span>•</span>
                    <span>{m.pattern}</span>
                    <span>•</span>
                    <span>{m.failedAttemptsCount} attempts</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
