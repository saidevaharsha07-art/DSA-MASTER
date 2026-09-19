'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Check,
  Code2,
  ExternalLink,
  HelpCircle,
  Zap,
  Flame,
  ArrowRight,
  Target,
} from 'lucide-react';
import { ProblemModel } from '@/src/curriculum/types';
import { getPlatformMeta } from '@/src/curriculum/services';
import { RecommendedProblemItem } from '../services/practice-engine.service';

interface RecommendedHeroCardProps {
  item: RecommendedProblemItem;
  isFeatured?: boolean;
  isSolved: boolean;
  onToggleSolved: (prob: ProblemModel) => void;
  onOpenWorkspace: (prob: ProblemModel) => void;
  getProblemNumber: (prob: ProblemModel) => string;
}

export function RecommendedHeroCard({
  item,
  isFeatured = false,
  isSolved,
  onToggleSolved,
  onOpenWorkspace,
  getProblemNumber,
}: RecommendedHeroCardProps) {
  const prob = item.problem;
  const platMeta = getPlatformMeta(prob);

  const diffColor =
    item.targetDifficulty === 'Easy'
      ? 'var(--success)'
      : item.targetDifficulty === 'Hard'
      ? 'var(--danger)'
      : 'var(--warning)';

  const priorityColor =
    item.priority === 'Critical'
      ? 'var(--danger)'
      : item.priority === 'High'
      ? '#F97316'
      : item.priority === 'Medium'
      ? 'var(--warning)'
      : 'var(--text-muted)';

  return (
    <div
      data-testid="recommended-problem-card"
      className={`group relative flex flex-col gap-3.5 p-4 sm:p-5 rounded-2xl transition-all ${
        isFeatured
          ? 'bg-[var(--surface-elevated)] border-2 border-[var(--accent)] shadow-md hover:shadow-lg'
          : 'bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-strong)] hover:shadow-sm'
      }`}
    >
      {/* ── Top Row: Priority, Recommendation Tag, & Explainable "Why This Problem?" ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {item.badge && (
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
              {item.badge}
            </span>
          )}
          <span
            className="text-[11px] font-semibold"
            style={{ color: priorityColor }}
          >
            {item.priority} Priority
          </span>
          {isFeatured && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/25">
              Next Best Move
            </span>
          )}
        </div>

        {/* Explainable "Why this problem?" callout */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] bg-[var(--surface-subtle)] px-2.5 py-1 rounded-lg border border-[var(--border)] max-w-full">
          <HelpCircle size={13} className="text-[var(--accent)] shrink-0" />
          <span
            data-testid="why-this-problem"
            className="font-medium text-[var(--text-primary)] truncate max-w-md"
          >
            {item.whyThisProblem}
          </span>
        </div>
      </div>

      {/* ── Middle Row: Problem Info & Checkbox ── */}
      <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
        <div className="flex items-center gap-3.5 min-w-0 flex-1">
          {/* Solved Status Checkbox */}
          <button
            type="button"
            onClick={() => onToggleSolved(prob)}
            aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              isSolved
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'border-2 border-[var(--border)] bg-[var(--surface)] hover:border-[var(--text-muted)] text-transparent'
            }`}
          >
            {isSolved ? (
              <Check size={14} strokeWidth={3} />
            ) : (
              <div className="w-1.5 h-1.5 rounded-xs bg-[var(--border)] opacity-0 group-hover:opacity-100" />
            )}
          </button>

          {/* Problem ID / Monospace Number */}
          <span className="font-mono text-xs font-semibold text-[var(--text-muted)] shrink-0 w-14 sm:w-16">
            {getProblemNumber(prob)}
          </span>

          {/* Title and Metadata */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <strong
                className={`text-sm sm:text-base font-bold truncate ${
                  isSolved
                    ? 'line-through text-[var(--text-muted)]'
                    : 'text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors'
                }`}
              >
                {prob.title}
              </strong>
            </div>

            <div className="flex items-center gap-2 mt-1 text-xs text-[var(--text-muted)] flex-wrap">
              <span
                className="font-semibold text-xs flex items-center gap-1"
                style={{ color: platMeta.color }}
              >
                {platMeta.name}
              </span>
              <span>•</span>
              <span className="truncate">{prob.categoryTitle || 'General'}</span>
              <span>•</span>
              <span className="truncate flex items-center gap-1 text-[var(--text-secondary)]">
                <Target size={11} className="shrink-0" />
                {prob.patternTitle || 'Algorithmic Pattern'}
              </span>
            </div>
          </div>
        </div>

        {/* ── Difficulty & Action Controls ── */}
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          {/* Difficulty pill */}
          <span
            className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg"
            style={{
              color: diffColor,
              backgroundColor: `${diffColor}18`,
              border: `1px solid ${diffColor}33`,
            }}
          >
            {item.targetDifficulty}
          </span>

          {/* XP Pill */}
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/25 px-2.5 py-1 rounded-lg">
            +{prob.xp || 50} XP
          </span>

          {/* Solve in Workspace Button */}
          <button
            type="button"
            onClick={() => onOpenWorkspace(prob)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[var(--accent)] text-[var(--text-inverse)] hover:brightness-110 active:scale-[0.98] transition-all shadow-xs cursor-pointer"
          >
            <Code2 size={13} />
            <span>Solve</span>
          </button>

          {/* External Platform Link */}
          {prob.url && (
            <a
              href={prob.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)] border border-transparent hover:border-[var(--border)] transition-all cursor-pointer"
              title={`View on ${platMeta.name}`}
              aria-label={`Open on ${platMeta.name}`}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
