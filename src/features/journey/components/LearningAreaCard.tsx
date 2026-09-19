'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { CategoryModel } from '@/src/curriculum/types';

export type MasteryState = 'Not Started' | 'Learning' | 'Developing' | 'Strong' | 'Needs Revision';

export interface LearningAreaCardProps {
  area: CategoryModel;
  subtopicCount: number;
  patternCount: number;
  totalProblems: number;
  solvedProblems: number;
  masteryState: MasteryState;
  hasPlatformCoverage: {
    leetcode: boolean;
    codechef: boolean;
    codeforces: boolean;
    geeksforgeeks: boolean;
  };
}

export function LearningAreaCard({
  area,
  subtopicCount,
  patternCount,
  totalProblems,
  solvedProblems,
  masteryState,
  hasPlatformCoverage,
}: LearningAreaCardProps) {
  const percentage = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  // Visual status pill configurations
  const masteryConfig: Record<
    MasteryState,
    { label: string; bg: string; text: string; border: string }
  > = {
    'Not Started': {
      label: 'Not Started',
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/20',
    },
    Learning: {
      label: 'Learning',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
    },
    Developing: {
      label: 'Developing',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    Strong: {
      label: 'Strong',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    'Needs Revision': {
      label: 'Needs Revision',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/20',
    },
  };

  const status = masteryConfig[masteryState] || masteryConfig['Not Started'];

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5 hover:border-[var(--border-strong)] hover:bg-[var(--surface-elevated)] transition-all duration-200">
      {/* ── Top Header: Order Badge, Title, and Mastery Status ── */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
              #{String(area.order).padStart(2, '0')}
            </span>
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${status.bg} ${status.text} ${status.border}`}
            >
              {status.label}
            </span>
          </div>

          {/* Solved Ratio */}
          <div className="flex items-baseline gap-1 text-xs font-mono">
            <span className="font-bold text-[var(--text-primary)]">{solvedProblems}</span>
            <span className="text-[var(--text-muted)]">/{totalProblems}</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <Link
            href={`/journey/${area.slug}`}
            className="text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors inline-block"
          >
            {area.title}
          </Link>
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
            {area.description}
          </p>
        </div>

        {/* Counts Row: Subtopics • Patterns • Problems */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--text-muted)] pt-1">
          <span className="flex items-center gap-1">
            <BookOpen size={11} /> {subtopicCount} Subtopics
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers size={11} /> {patternCount} Patterns
          </span>
        </div>
      </div>

      {/* ── Bottom Section: Progress Bar, Platform Coverage, and CTAs ── */}
      <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-[var(--border-subtle)]">
        {/* Precision Progress Bar */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
            <span>Area Progress</span>
            <span className="font-semibold text-[var(--text-primary)]">{percentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage === 100
                  ? 'bg-emerald-500'
                  : percentage > 40
                  ? 'bg-[var(--accent)]'
                  : 'bg-[var(--accent)]/70'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Platform Coverage Indicators & Action Links */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Compact Platform Indicators */}
          <div className="flex items-center gap-1.5">
            <span
              title="LeetCode problems available"
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                hasPlatformCoverage.leetcode
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-500/10 text-slate-500'
              }`}
            >
              LC
            </span>
            <span
              title="CodeChef problems available"
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                hasPlatformCoverage.codechef
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                  : 'bg-slate-500/10 text-slate-500'
              }`}
            >
              CC
            </span>
            <span
              title="Codeforces problems available"
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                hasPlatformCoverage.codeforces
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'bg-slate-500/10 text-slate-500'
              }`}
            >
              CF
            </span>
            <span
              title="GeeksForGeeks problems available"
              className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                hasPlatformCoverage.geeksforgeeks
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-slate-500/10 text-slate-500'
              }`}
            >
              GFG
            </span>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-1.5">
            <Link
              href={`/practice?area=${area.slug}`}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition-colors flex items-center gap-1"
              title="Practice in Arena"
            >
              <Code2 size={12} />
              <span className="hidden sm:inline">Arena</span>
            </Link>
            <Link
              href={`/journey/${area.slug}`}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] transition-all flex items-center gap-1"
            >
              <span>Explore</span>
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
