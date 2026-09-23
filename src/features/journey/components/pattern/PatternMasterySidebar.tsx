'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Flame,
  CheckCircle2,
  CalendarCheck,
  Timer,
} from 'lucide-react';
import {
  PatternLearningDetail,
  PatternMasteryState,
} from '../../services/pattern-learning-adapter.service';

interface PatternMasterySidebarProps {
  readonly detail: PatternLearningDetail;
  readonly areaSlug: string;
  readonly subtopicSlug: string;
  readonly patternSlug: string;
  readonly onLaunchSprint: () => void;
  readonly isGeneratingSprint: boolean;
  readonly addedToPlan: boolean;
  readonly onAddToDailyPlan: () => void;
}

export function PatternMasterySidebar({
  detail,
  areaSlug,
  subtopicSlug,
  patternSlug,
  onLaunchSprint,
  isGeneratingSprint,
  addedToPlan,
  onAddToDailyPlan,
}: PatternMasterySidebarProps) {
  const getMasteryBadge = (state: PatternMasteryState) => {
    switch (state) {
      case 'Strong':
        return {
          label: 'Strong Mastery',
          bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
          dot: 'bg-emerald-500',
        };
      case 'Developing':
        return {
          label: 'Developing',
          bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
          dot: 'bg-amber-500',
        };
      case 'Learning':
        return {
          label: 'Learning',
          bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
          dot: 'bg-indigo-500',
        };
      case 'Needs Revision':
        return {
          label: 'Needs Revision',
          bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25',
          dot: 'bg-rose-500',
        };
      case 'Not Started':
      default:
        return {
          label: 'Not Started',
          bg: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/25',
          dot: 'bg-slate-400',
        };
    }
  };

  const mastery = getMasteryBadge(detail.masteryState);

  return (
    <aside
      aria-label="Pattern learning metadata and mastery"
      className="flex flex-col gap-5 sticky top-16"
    >
      {/* ── MASTERY TELEMETRY PANEL ── */}
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
            Mastery Telemetry
          </span>
          <div
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${mastery.bg}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${mastery.dot}`} />
            <span>{mastery.label}</span>
          </div>
        </div>

        {/* Solved Ratio */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-[var(--text-muted)] font-medium">Curriculum Solved:</span>
            <strong className="text-xs font-bold text-[var(--text-primary)]">
              {detail.solvedCount} / {detail.totalAvailable}{' '}
              <span className="text-[var(--accent)] font-semibold">
                ({detail.solvedPercentage}%)
              </span>
            </strong>
          </div>
          <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, detail.solvedPercentage)}%` }}
            />
          </div>
        </div>

        {/* Accuracy and Attempts */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border)] text-xs">
          <div>
            <span className="text-[var(--text-muted)] text-[11px] block">Session Accuracy:</span>
            <span className="font-bold text-[var(--text-primary)] mt-0.5 block">
              {detail.accuracyPercent !== null ? `${detail.accuracyPercent}%` : 'No attempts'}
            </span>
          </div>
          <div>
            <span className="text-[var(--text-muted)] text-[11px] block">Recent Attempts:</span>
            <span className="font-bold text-[var(--text-primary)] mt-0.5 block">
              {detail.recentAttemptsCount} logged
            </span>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
          <Link
            href={detail.practiceUrl}
            className="w-full py-2.5 px-3 rounded-xl bg-[var(--accent)] hover:opacity-90 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
          >
            <span>Practice in Arena</span>
            <ArrowRight size={13} />
          </Link>

          <button
            type="button"
            onClick={onLaunchSprint}
            disabled={isGeneratingSprint}
            className="w-full py-2 px-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span>Launch 5-Problem Sprint</span>
          </button>
        </div>
      </div>

      {/* ── PATTERN PROFILE CARD ── */}
      <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3 text-xs shadow-xs">
        <span className="font-bold uppercase tracking-wider text-[var(--text-muted)] text-[11px]">
          Pattern Information
        </span>

        <div className="divide-y divide-[var(--border)]">
          <div className="py-2 flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Category:</span>
            <span className="font-bold text-[var(--text-primary)]">{detail.category.title}</span>
          </div>
          <div className="py-2 flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Subtopic:</span>
            <span className="font-bold text-[var(--text-primary)]">{detail.subtopic.title}</span>
          </div>
          <div className="py-2 flex items-center justify-between">
            <span className="text-[var(--text-muted)]">Difficulty:</span>
            <span className="font-bold text-[var(--text-primary)]">{detail.pattern.difficulty}</span>
          </div>
          {detail.pattern.estimatedHours && (
            <div className="py-2 flex items-center justify-between">
              <span className="text-[var(--text-muted)]">Est. Completion:</span>
              <span className="font-bold text-[var(--text-primary)]">{detail.pattern.estimatedHours} Hours</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
