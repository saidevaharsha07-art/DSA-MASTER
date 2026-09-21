'use client';

import React from 'react';
import {
  CheckCircle2,
  Clock,
  Code2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Award,
  Layers,
} from 'lucide-react';
import { DailyStudyPlan, EndOfDaySummary } from '../types/study-plan.types';

interface StudyPlanCompletionScreenProps {
  plan: DailyStudyPlan;
  summary: EndOfDaySummary | null;
  onReviewToday: () => void;
}

export function StudyPlanCompletionScreen({
  plan,
  summary,
  onReviewToday,
}: StudyPlanCompletionScreenProps) {
  const problemsCount = summary?.problemsSolvedCount ?? plan.completedCount;
  const srsCount = summary?.revisionItemsReviewed ?? 0;
  const patternsList = summary?.patternsPracticed ?? [];

  return (
    <div className="rounded-2xl p-6 sm:p-8 bg-[var(--surface)] border border-emerald-500/30 shadow-md space-y-6 transition-all">
      {/* Top Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>TODAY COMPLETE &bull; {plan.date}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] pt-1">
            All Planned Activities Completed
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            You successfully finished your scheduled algorithmic curriculum allocation for today.
          </p>
        </div>

        <div className="text-right sm:self-center bg-[var(--bg-subtle)] p-3 rounded-xl border border-[var(--border)]">
          <div className="text-xs font-mono text-[var(--text-muted)]">Total Time Spent</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {plan.actualTimeSpentMinutes}m / {plan.timeBudgetMinutes}m
          </div>
          <div className="text-[11px] text-[var(--text-muted)]">
            {plan.completedCount} activities completed
          </div>
        </div>
      </div>

      {/* Factual telemetry tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actual Time</span>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {plan.actualTimeSpentMinutes}m
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Allocated: {plan.timeBudgetMinutes}m
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Activities Finished</span>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {plan.completedCount}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {plan.skippedCount} skipped
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problems Practiced</span>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {problemsCount}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Active patterns
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Revision Items</span>
          </div>
          <div className="text-xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {srsCount}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            SRS flashcards
          </div>
        </div>
      </div>

      {/* Patterns Practiced Today */}
      {patternsList.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Patterns Practiced Today</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {patternsList.map((pat) => (
              <span
                key={pat}
                className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border)]"
              >
                {pat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Primary CTAs */}
      <div className="pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button
          onClick={onReviewToday}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Review Today&apos;s Performance Record</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <span className="text-xs text-[var(--text-muted)] text-center sm:text-left">
          Progress has been saved to your continuous learning profile.
        </span>
      </div>
    </div>
  );
}
