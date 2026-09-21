'use client';

import React from 'react';
import { Clock, Timer, CheckCircle2, TrendingUp } from 'lucide-react';
import { DailyStudyPlan } from '../types/study-plan.types';

interface StudyPlanProgressHUDProps {
  plan: DailyStudyPlan;
}

export function StudyPlanProgressHUD({ plan }: StudyPlanProgressHUDProps) {
  const progressPercent =
    plan.items.length > 0
      ? Math.round(
          ((plan.completedCount + plan.skippedCount) / plan.items.length) * 100
        )
      : 0;

  return (
    <div
      data-testid="plan-progress-hud"
      className="rounded-2xl p-4 sm:p-5 bg-[var(--surface)] border border-[var(--border)] shadow-sm transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--text-muted)]">
            Factual Progress Telemetry
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-semibold">
          {progressPercent}% Complete
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1: Estimated Time */}
        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
            <span>Estimated Time</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {plan.totalEstimatedMinutes}m
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] mt-0.5">
            Budget: {plan.timeBudgetMinutes}m
          </div>
        </div>

        {/* Metric 2: Actual Time Spent */}
        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Timer className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actual Time Spent</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            {plan.actualTimeSpentMinutes}m
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {plan.actualTimeSpentMinutes > 0 ? 'Recorded active time' : 'Not started yet'}
          </div>
        </div>

        {/* Metric 3: Activity Progress */}
        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Activity Progress</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {plan.completedCount} / {plan.items.length}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {plan.remainingCount} remaining &bull; {plan.skippedCount} skipped
          </div>
        </div>

        {/* Metric 4: Plan Completion Bar */}
        <div className="p-3 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex flex-col justify-between">
          <div className="text-xs text-[var(--text-muted)]">Completion Track</div>
          <div className="w-full bg-[var(--surface-elevated)] rounded-full h-2 my-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center justify-between">
            <span>Progress</span>
            <span className="font-semibold text-[var(--text-primary)]">{progressPercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
