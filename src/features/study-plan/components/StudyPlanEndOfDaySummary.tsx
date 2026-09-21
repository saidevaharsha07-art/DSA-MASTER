'use client';

import React from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Clock,
  Code2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Layers,
  Calendar,
} from 'lucide-react';
import { EndOfDaySummary } from '../types/study-plan.types';

interface StudyPlanEndOfDaySummaryProps {
  summary: EndOfDaySummary;
  dateStr: string;
}

export function StudyPlanEndOfDaySummary({
  summary,
  dateStr,
}: StudyPlanEndOfDaySummaryProps) {
  return (
    <div
      data-testid="end-of-day-summary"
      className="p-5 sm:p-7 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-sm space-y-6 transition-colors"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Factual Performance Record &bull; {dateStr}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
            End-Of-Day Study Summary
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
            Objective review of time spent and learning accomplishments across all modules today.
          </p>
        </div>

        <div className="text-xs font-mono text-[var(--text-muted)] self-start sm:self-center bg-[var(--bg-subtle)] px-3 py-1.5 rounded-lg border border-[var(--border)]">
          Zero arbitrary grades &bull; 100% telemetry
        </div>
      </div>

      {/* 4 Factual Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>Activities Completed</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {summary.activitiesCompleted}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            {summary.activitiesSkipped} skipped
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Actual Time Spent</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 mt-1">
            {summary.actualTimeSpentMinutes}m
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Planned: {summary.totalEstimatedMinutes}m
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Problems Solved</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {summary.problemsSolvedCount}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Across active tiers
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>SRS Reviews Done</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[var(--text-primary)] mt-1">
            {summary.revisionItemsReviewed}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
            Flashcards cleared
          </div>
        </div>
      </div>

      {/* Patterns Practiced Today */}
      {summary.patternsPracticed.length > 0 && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider font-mono flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Patterns Practiced Today</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {summary.patternsPracticed.map((pat) => (
              <span
                key={pat}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-[var(--bg-subtle)] text-[var(--text-primary)] border border-[var(--border)]"
              >
                {pat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Next Actions for Tomorrow */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider font-mono">
          Recommended Next Actions for Tomorrow
        </h3>
        <div className="space-y-2">
          {summary.nextRecommendedWork.map((work, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[var(--border-strong)] transition-colors"
            >
              <div className="space-y-0.5">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {work.title}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {work.reason}
                </div>
              </div>
              <Link
                href={work.actionUrl}
                className="px-3.5 py-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] text-xs font-medium flex items-center justify-center gap-1.5 self-start sm:self-center border border-[var(--border)] transition-colors"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
