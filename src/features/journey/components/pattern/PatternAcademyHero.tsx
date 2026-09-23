'use client';

import React from 'react';
import Link from 'next/link';
import {
  Layers,
  ArrowRight,
  Timer,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  PatternLearningDetail,
  PatternMasteryState,
} from '../../services/pattern-learning-adapter.service';

interface PatternAcademyHeroProps {
  readonly detail: PatternLearningDetail;
  readonly areaSlug: string;
  readonly subtopicSlug: string;
  readonly patternSlug: string;
  readonly addedToPlan: boolean;
  readonly onAddToDailyPlan: () => void;
  readonly onLaunchSprint: () => void;
  readonly isGeneratingSprint: boolean;
  readonly isLight: boolean;
}

export function PatternAcademyHero({
  detail,
  areaSlug,
  subtopicSlug,
  patternSlug,
  addedToPlan,
  onAddToDailyPlan,
  onLaunchSprint,
  isGeneratingSprint,
  isLight,
}: PatternAcademyHeroProps) {
  // Mastery badge configuration
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

  const difficultyColors = {
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    Hard: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25',
  };

  const diffStyle =
    difficultyColors[detail.pattern.difficulty as keyof typeof difficultyColors] ||
    'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25';

  return (
    <header
      className="p-5 sm:p-7 rounded-2xl border flex flex-col gap-5 transition-all shadow-xs"
      style={{
        background: isLight
          ? 'linear-gradient(180deg, #FFFFFF 0%, rgba(248, 250, 252, 0.8) 100%)'
          : 'linear-gradient(180deg, var(--card) 0%, rgba(15, 23, 42, 0.4) 100%)',
        borderColor: 'var(--border)',
      }}
    >
      {/* ── BREADCRUMBS ── */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs font-semibold text-[var(--text-muted)]"
      >
        <Link
          href="/journey"
          className="hover:text-[var(--accent)] transition-colors flex items-center gap-1"
        >
          <Layers size={13} />
          <span>Journey</span>
        </Link>
        <span className="text-[var(--text-muted)]/50">/</span>
        <Link
          href={`/journey/${detail.category.slug}`}
          className="hover:text-[var(--accent)] transition-colors truncate max-w-[160px] sm:max-w-none"
        >
          {detail.category.title}
        </Link>
        <span className="text-[var(--text-muted)]/50">/</span>
        <Link
          href={`/journey/${detail.category.slug}`}
          className="hover:text-[var(--accent)] transition-colors truncate max-w-[160px] sm:max-w-none"
        >
          {detail.subtopic.title}
        </Link>
        <span className="text-[var(--text-muted)]/50">/</span>
        <span className="text-[var(--accent)] font-bold truncate max-w-[200px] sm:max-w-none">
          {detail.pattern.title}
        </span>
      </nav>

      {/* ── MAIN HERO BODY ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex flex-col gap-2 max-w-3xl">
          {/* Metadata badges row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
              {detail.category.title}
            </span>
            <span className="text-xs text-[var(--text-muted)] font-medium">
              {detail.subtopic.title}
            </span>
            <span className="text-[var(--text-muted)]/40">•</span>
            <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${diffStyle}`}>
              {detail.pattern.difficulty} Difficulty
            </span>
            {detail.pattern.estimatedHours && (
              <>
                <span className="text-[var(--text-muted)]/40">•</span>
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Clock size={12} />
                  <span>{detail.pattern.estimatedHours}h est.</span>
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            {detail.pattern.title}
          </h1>

          {/* Tagline / One-line explanation */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 sm:line-clamp-none">
            {detail.pattern.shortDescription || detail.pattern.overview}
          </p>
        </div>

        {/* ── COMPACT TELEMETRY & CTAs PANEL ── */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 bg-[var(--surface)] p-4 rounded-xl border border-[var(--border)] min-w-[260px] lg:w-72 shrink-0">
          {/* Mastery State & Ratio */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Mastery Telemetry
            </span>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${mastery.bg}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${mastery.dot}`} />
              <span>{mastery.label}</span>
            </div>
          </div>

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
            <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, detail.solvedPercentage)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border)] text-[11px]">
            <div>
              <span className="text-[var(--text-muted)] block">Session Accuracy:</span>
              <span className="font-bold text-[var(--text-primary)]">
                {detail.accuracyPercent !== null ? `${detail.accuracyPercent}%` : 'No attempts'}
              </span>
            </div>
            <div>
              <span className="text-[var(--text-muted)] block">Recent Attempts:</span>
              <span className="font-bold text-[var(--text-primary)]">
                {detail.recentAttemptsCount} logged
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center gap-2">
              <Link
                href={detail.practiceUrl}
                className="flex-1 py-2 px-3 rounded-lg bg-[var(--accent)] hover:opacity-90 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>Practice Pattern</span>
                <ArrowRight size={13} />
              </Link>

              <button
                type="button"
                onClick={onLaunchSprint}
                disabled={isGeneratingSprint}
                className="py-2 px-3 rounded-lg bg-[var(--card)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-bold text-[var(--text-primary)] transition-all flex items-center gap-1 cursor-pointer"
                title="Quick 5-problem adaptive sprint"
              >
                <Sparkles size={13} className="text-amber-500" />
                <span>Sprint</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/interview?mode=topic&area=${encodeURIComponent(areaSlug)}&subtopic=${encodeURIComponent(subtopicSlug)}&pattern=${encodeURIComponent(patternSlug)}`}
                className="flex-1 py-1.5 px-2.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--card)] border border-[var(--border)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center gap-1.5 transition-all"
              >
                <Timer size={12} className="text-[var(--accent)]" />
                <span>Interview This Pattern</span>
              </Link>

              <button
                type="button"
                onClick={onAddToDailyPlan}
                className="py-1.5 px-2.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--card)] border border-[var(--border)] text-[11px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-all cursor-pointer"
                title="Add this pattern to your daily plan"
              >
                <CalendarCheck size={12} className="text-emerald-500" />
                <span>{addedToPlan ? 'Added ✓' : 'Plan'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
