'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface WeakAreasCardProps {
  weakAreasList: DashboardSummary['weakAreasList'];
}

export function WeakAreasCard({ weakAreasList }: WeakAreasCardProps) {
  return (
    <div
      data-testid="weak-areas-card"
      className="flex flex-col gap-3.5 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 hover:border-[var(--border-strong)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(244,63,94,0.12)] text-[#F43F5E] flex items-center justify-center shrink-0">
            <AlertCircle className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Diagnostic Insights
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] m-0 leading-tight">
              Where you&apos;re getting stuck
            </h3>
          </div>
        </div>

        <Link href="/practice?mode=weakness" className="no-underline">
          <button
            type="button"
            data-testid="practice-weakness-btn"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[rgba(244,63,94,0.1)] hover:bg-[rgba(244,63,94,0.18)] border border-[rgba(244,63,94,0.3)] text-[#F43F5E] text-xs font-bold cursor-pointer transition-colors"
          >
            <span>Practice Weakness</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </Link>
      </div>

      {/* Weak Areas Rows */}
      {(!weakAreasList || weakAreasList.length === 0) ? (
        <div className="p-4 text-center text-xs text-[var(--text-muted)] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-subtle)]">
          No critical weak areas detected. Solve more problems to unlock diagnostic analysis.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {weakAreasList.slice(0, 3).map((w, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-1.5 p-3 rounded-lg bg-[rgba(244,63,94,0.03)] border border-[rgba(244,63,94,0.15)] text-xs transition-colors hover:border-[rgba(244,63,94,0.3)]"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
                  <span>{w.area}</span>
                  <span className="text-[var(--text-muted)]">•</span>
                  <span className="text-[var(--accent)] font-mono">{w.pattern}</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[rgba(244,63,94,0.1)] text-[#F43F5E] border border-[rgba(244,63,94,0.2)] shrink-0">
                  {w.accuracyPercent}% accuracy
                </span>
              </div>

              <p className="text-[11px] text-[var(--text-secondary)] m-0 leading-relaxed">
                {w.reason}
              </p>

              <div className="flex items-center justify-between gap-2 pt-1 mt-0.5 border-t border-[rgba(244,63,94,0.1)] text-[11px]">
                <span className="text-[var(--text-muted)] font-mono">
                  {w.failedAttemptsCount} failed attempt{w.failedAttemptsCount !== 1 ? 's' : ''}
                </span>
                <Link
                  href={w.practiceUrl}
                  className="font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] no-underline flex items-center gap-1"
                >
                  <span>Solve Recommended</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
