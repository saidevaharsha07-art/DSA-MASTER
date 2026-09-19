'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, ChevronRight } from 'lucide-react';
import { DailyStudyPlan } from '@/src/features/study-plan/types/study-plan.types';

interface StudyPlanCardProps {
  studyPlan: DailyStudyPlan | null;
}

export function StudyPlanCard({ studyPlan }: StudyPlanCardProps) {
  if (!studyPlan) return null;

  const currentMission =
    studyPlan.items.find((i) => i.id === studyPlan.primaryMissionId)?.title ||
    studyPlan.items[0]?.title ||
    'Adaptive Practice';

  const timeRemaining = Math.max(0, studyPlan.timeBudgetMinutes - studyPlan.actualTimeSpentMinutes);

  return (
    <div
      data-testid="study-plan-card"
      className="flex flex-col gap-3 p-4 rounded-xl border border-[rgba(16,185,129,0.3)] bg-[rgba(16,185,129,0.03)] shadow-sm transition-all duration-200 hover:border-[rgba(16,185,129,0.4)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(16,185,129,0.15)] text-[#10B981] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Daily Agenda
            </span>
            <h3 className="text-xs font-bold text-[var(--text-primary)] m-0 leading-tight">
              Today&apos;s Study Plan
            </h3>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10B981] border border-[rgba(16,185,129,0.25)]">
          {studyPlan.completedCount} / {studyPlan.items.length} Done ({timeRemaining}m left)
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)] text-xs">
        <span className="text-[11px] text-[var(--text-secondary)] block">
          Current Activity:
        </span>
        <span className="font-semibold text-[var(--text-primary)] truncate block mt-0.5">
          {currentMission}
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)]">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">
          {studyPlan.timeBudgetMinutes}m budget
        </span>

        <Link href="/study-plan" className="no-underline">
          <button
            type="button"
            data-testid="continue-study-plan-btn"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
          >
            <span>Continue Today&apos;s Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
