'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  FastForward,
  Play,
  ChevronRight,
  RefreshCw,
  Clock,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { DailyStudyPlan, StudyPlanItem } from '../types/study-plan.types';
import { getActivityVisualConfig } from './StudyPlanPrimaryMission';

interface StudyPlanTimelineProps {
  plan: DailyStudyPlan;
  isReplanning: boolean;
  onStartItem: (item: StudyPlanItem) => void;
  onCompleteItem: (e: React.MouseEvent, itemId: string) => void;
  onSkipItem: (e: React.MouseEvent, itemId: string) => void;
  onReplan: () => void;
}

export function StudyPlanTimeline({
  plan,
  isReplanning,
  onStartItem,
  onCompleteItem,
  onSkipItem,
  onReplan,
}: StudyPlanTimelineProps) {
  return (
    <div className="space-y-4">
      {/* Timeline Header & Mid-Day Replanning Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-[var(--border)]">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider font-mono">
            Daily Execution Timeline
          </h2>
          <span className="text-xs font-mono text-[var(--text-muted)]">
            ({plan.completedCount} done, {plan.remainingCount} remaining)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {plan.lastReplannedAt && (
            <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Replanned: {plan.replanReason || 'mid-day update'}</span>
            </span>
          )}

          <button
            onClick={onReplan}
            disabled={isReplanning}
            data-testid="replan-btn"
            className="px-2.5 py-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--text-primary)] text-xs font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            title="Recalculate remaining schedule based on current progress"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isReplanning ? 'animate-spin text-emerald-400' : 'text-[var(--text-muted)]'}`}
            />
            <span className="hidden sm:inline">Recalculate Plan</span>
          </button>
        </div>
      </div>

      {/* Vertical Timeline Nodes */}
      <div className="relative pl-6 sm:pl-8 space-y-4">
        {/* Continuous Connecting Vertical Line */}
        <div
          className="absolute left-2.5 sm:left-3.5 top-3 bottom-3 w-0.5 bg-[var(--border-strong)] pointer-events-none"
          aria-hidden="true"
        />

        {plan.items.map((item, index) => {
          const isCompleted = item.status === 'completed';
          const isSkipped = item.status === 'skipped';
          const isActive = item.id === plan.primaryMissionId && !isCompleted && !isSkipped;
          const visual = getActivityVisualConfig(item.type);

          return (
            <div
              key={item.id}
              data-testid={`plan-item-${index + 1}`}
              className={`relative rounded-xl border transition-all duration-200 ${
                isCompleted
                  ? 'bg-[var(--surface)]/50 border-[var(--border)]/50 opacity-75'
                  : isSkipped
                  ? 'bg-[var(--surface)]/30 border-[var(--border)]/40 opacity-60'
                  : isActive
                  ? 'bg-[var(--surface-elevated)] border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-[var(--surface)] border-[var(--border)] hover:border-[var(--border-strong)]'
              }`}
            >
              {/* Timeline Connector Dot / Marker */}
              <div
                className={`absolute -left-6 sm:-left-8 top-4 -translate-x-1/2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold transition-all z-10 ${
                  isCompleted
                    ? 'bg-emerald-500 text-slate-950 shadow-sm ring-4 ring-[var(--bg)]'
                    : isSkipped
                    ? 'bg-[var(--surface-elevated)] text-[var(--text-muted)] border border-[var(--border)] ring-4 ring-[var(--bg)]'
                    : isActive
                    ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/20 animate-pulse'
                    : 'bg-[var(--surface)] text-[var(--text-secondary)] border-2 border-[var(--border-strong)] ring-4 ring-[var(--bg)]'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : isSkipped ? (
                  <FastForward className="w-3 h-3" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Node Card Content */}
              <div className="p-3.5 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    {/* Activity metadata row */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-semibold border ${visual.badgeBg}`}
                      >
                        {visual.icon}
                        <span>{visual.label}</span>
                      </span>

                      {isActive && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active Now
                        </span>
                      )}

                      <span className="text-xs text-[var(--text-muted)] font-medium">
                        {item.area} &bull; {item.pattern}
                      </span>

                      {item.platform && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)] uppercase">
                          {item.platform}
                        </span>
                      )}

                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1 ml-auto sm:ml-0">
                        <Clock className="w-3 h-3" />
                        <span>~{item.estimatedMinutes}m</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        isCompleted
                          ? 'line-through text-[var(--text-muted)]'
                          : isSkipped
                          ? 'line-through text-[var(--text-muted)]'
                          : 'text-[var(--text-primary)]'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">
                      {item.description}
                    </p>

                    {/* Explainable Reason Tag */}
                    <div className="text-[11px] font-mono text-emerald-400 pt-0.5">
                      Reason: {item.reason}
                    </div>
                  </div>

                  {/* Activity Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0 pt-2 sm:pt-0">
                    {!isCompleted && !isSkipped && (
                      <>
                        <Link
                          href={item.actionUrl}
                          onClick={() => onStartItem(item)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                            isActive
                              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shadow-sm'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          }`}
                        >
                          <span>Start Activity</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={(e) => onCompleteItem(e, item.id)}
                          data-testid={`complete-item-btn-${index + 1}`}
                          className="p-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-emerald-400 border border-[var(--border)] transition-colors cursor-pointer"
                          title="Mark Complete"
                          aria-label={`Mark item ${index + 1} completed`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => onSkipItem(e, item.id)}
                          data-testid={`skip-item-btn-${index + 1}`}
                          className="p-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)] transition-colors cursor-pointer"
                          title="Skip Activity"
                          aria-label={`Skip item ${index + 1}`}
                        >
                          <FastForward className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {isCompleted && (
                      <span className="text-xs text-emerald-400 font-mono font-medium flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Done</span>
                        <span className="text-[11px] text-emerald-400/80">
                          ({item.actualMinutes || item.estimatedMinutes}m)
                        </span>
                      </span>
                    )}

                    {isSkipped && (
                      <span className="text-xs text-[var(--text-muted)] font-mono px-2.5 py-1 rounded-md bg-[var(--bg-subtle)] border border-[var(--border)]">
                        Skipped
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
