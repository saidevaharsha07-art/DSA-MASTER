'use client';

import React from 'react';
import {
  Play,
  CheckCircle2,
  FastForward,
  BookOpen,
  Code2,
  RotateCcw,
  Timer,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Compass,
} from 'lucide-react';
import { StudyPlanItem, StudyPlanActivityType } from '../types/study-plan.types';

interface StudyPlanPrimaryMissionProps {
  mission: StudyPlanItem;
  hasStarted: boolean;
  onStart: (item: StudyPlanItem) => void;
  onComplete: (itemId: string) => void;
  onSkip: (itemId: string) => void;
}

export function getActivityVisualConfig(type: StudyPlanActivityType) {
  switch (type) {
    case 'LEARN':
      return {
        label: 'LEARN',
        sublabel: 'Pattern Acquisition',
        colorClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
        badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        icon: <BookOpen className="w-3.5 h-3.5" />,
      };
    case 'PRACTICE':
      return {
        label: 'PRACTICE',
        sublabel: 'Algorithmic Problem Solving',
        colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        icon: <Code2 className="w-3.5 h-3.5" />,
      };
    case 'REVISE':
      return {
        label: 'REVISE',
        sublabel: 'Spaced Repetition Review',
        colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
        icon: <RotateCcw className="w-3.5 h-3.5" />,
      };
    case 'INTERVIEW':
      return {
        label: 'INTERVIEW',
        sublabel: 'Simulated Timed Evaluation',
        colorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
        icon: <Timer className="w-3.5 h-3.5" />,
      };
    case 'REVIEW':
      return {
        label: 'REVIEW',
        sublabel: 'Mistake Diagnostics',
        colorClass: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
        badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
        icon: <AlertCircle className="w-3.5 h-3.5" />,
      };
    default:
      return {
        label: 'STUDY',
        sublabel: 'Curriculum Study',
        colorClass: 'text-[var(--text-secondary)] bg-[var(--surface)] border-[var(--border)]',
        badgeBg: 'bg-[var(--surface-elevated)] text-[var(--text-primary)] border-[var(--border)]',
        icon: <Sparkles className="w-3.5 h-3.5" />,
      };
  }
}

export function StudyPlanPrimaryMission({
  mission,
  hasStarted,
  onStart,
  onComplete,
  onSkip,
}: StudyPlanPrimaryMissionProps) {
  const visual = getActivityVisualConfig(mission.type);

  return (
    <div
      data-testid="primary-mission-card"
      className="relative overflow-hidden rounded-2xl bg-[var(--surface)] border border-emerald-500/30 p-5 sm:p-6 shadow-md transition-all"
    >
      {/* Subtle emerald glow top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0" />

      {/* Top Banner Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Today&apos;s Primary Mission &bull; Active Now
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-semibold border ${visual.badgeBg}`}
          >
            {visual.icon}
            <span>{visual.label}</span>
          </span>
        </div>

        <span className="text-xs font-mono font-bold text-[var(--text-primary)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-md border border-[var(--border)]">
          ~{mission.estimatedMinutes} min
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="space-y-2">
        <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] leading-snug">
          {mission.title}
        </h2>

        <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {mission.description}
        </p>

        {/* Hierarchy Context */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--text-muted)] pt-1">
          <span className="font-semibold text-[var(--text-primary)]">
            {mission.area}
          </span>
          <span>&rsaquo;</span>
          <span>{mission.subtopic}</span>
          <span>&bull;</span>
          <span className="font-medium text-emerald-400">
            {mission.pattern}
          </span>
          {mission.platform && (
            <>
              <span>&bull;</span>
              <span className="uppercase font-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-subtle)] text-[var(--text-muted)]">
                {mission.platform}
              </span>
            </>
          )}
        </div>

        {/* Explainable Planner Reason */}
        <div className="mt-3 p-2.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] flex items-start gap-2">
          <Compass className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <span className="font-mono font-semibold text-emerald-400">
              Why this was selected:{' '}
            </span>
            <span className="text-[var(--text-secondary)]">
              {mission.reason}
            </span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="mt-5 pt-4 border-t border-[var(--border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          onClick={() => onStart(mission)}
          data-testid="primary-mission-cta"
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all active:scale-[0.98]"
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{hasStarted ? "Continue Today's Plan" : "Start Today's Plan"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onComplete(mission.id)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] font-medium text-xs flex items-center justify-center gap-1.5 border border-[var(--border)] transition-colors"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Mark Done</span>
          </button>

          <button
            onClick={() => onSkip(mission.id)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] font-medium text-xs flex items-center justify-center gap-1.5 border border-[var(--border)] transition-colors"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>Skip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
