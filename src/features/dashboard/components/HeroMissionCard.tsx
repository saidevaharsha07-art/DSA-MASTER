'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Sparkles, Play, BookOpen, Clock } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface HeroMissionCardProps {
  heroMission: DashboardSummary['heroMission'];
}

export function HeroMissionCard({ heroMission }: HeroMissionCardProps) {
  if (!heroMission) return null;

  const getPlatformColors = (plat?: string) => {
    switch (plat?.toLowerCase()) {
      case 'leetcode':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: 'rgba(16, 185, 129, 0.25)' };
      case 'codechef':
        return { bg: 'rgba(249, 115, 22, 0.1)', text: '#F97316', border: 'rgba(249, 115, 22, 0.25)' };
      case 'codeforces':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: '#3B82F6', border: 'rgba(59, 130, 246, 0.25)' };
      case 'geeksforgeeks':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: '#22C55E', border: 'rgba(34, 197, 94, 0.25)' };
      default:
        return { bg: 'rgba(56, 189, 248, 0.1)', text: '#38BDF8', border: 'rgba(56, 189, 248, 0.25)' };
    }
  };

  const getDifficultyColors = (diff?: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: 'rgba(16, 185, 129, 0.25)' };
      case 'medium':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.25)' };
      case 'hard':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.25)' };
      default:
        return { bg: 'rgba(148, 163, 184, 0.1)', text: '#94A3B8', border: 'rgba(148, 163, 184, 0.25)' };
    }
  };

  const platCol = getPlatformColors(heroMission.platform);
  const diffCol = getDifficultyColors(heroMission.difficulty);

  const patternUrl = heroMission.learningAreaSlug && heroMission.patternSlug
    ? `/journey?area=${heroMission.learningAreaSlug}&pattern=${heroMission.patternSlug}`
    : '/journey';

  return (
    <div
      data-testid="hero-next-mission"
      className="relative flex flex-col gap-4 p-5 sm:p-6 rounded-xl border border-[var(--border-strong)] bg-[var(--surface)] shadow-md overflow-hidden transition-all duration-200 hover:border-[var(--accent)]"
    >
      {/* Subtle top accent highlight bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--accent)] via-[#10B981] to-transparent opacity-80" />

      {/* Eyebrow & Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(16,185,129,0.12)] text-[#10B981] flex items-center justify-center shrink-0">
            <Target className="w-3.5 h-3.5" />
          </div>
          <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[var(--accent)]">
            Your Next Move
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[rgba(16,185,129,0.12)] text-[#10B981] border border-[rgba(16,185,129,0.25)] uppercase">
            {heroMission.badge || 'Recommended'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            style={{ backgroundColor: platCol.bg, color: platCol.text, borderColor: platCol.border }}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase"
          >
            {heroMission.platform}
          </span>
          <span
            style={{ backgroundColor: diffCol.bg, color: diffCol.text, borderColor: diffCol.border }}
            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase"
          >
            {heroMission.difficulty}
          </span>
          <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)] font-mono ml-1">
            <Clock className="w-3 h-3" />
            <span>~15-20 min</span>
          </div>
        </div>
      </div>

      {/* Problem Title & Hierarchy */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] m-0 leading-snug">
          {heroMission.problem.title}
        </h2>
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mt-1.5 flex-wrap font-medium">
          <span className="text-[var(--text-primary)]">{heroMission.learningAreaTitle}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span>{heroMission.subtopicTitle}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-[var(--accent)] font-mono">{heroMission.patternTitle}</span>
        </div>
      </div>

      {/* Why this problem callout */}
      <div
        data-testid="hero-why-reason"
        className="flex items-start gap-2.5 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] leading-relaxed"
      >
        <Sparkles className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
        <div>
          <strong className="text-[var(--text-primary)] font-semibold">Why this mission: </strong>
          <span>{heroMission.whyThisProblem}</span>
        </div>
      </div>

      {/* Action CTA Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-mono">
          <span>Problem #{heroMission.problem.id}</span>
          <span>•</span>
          <span>Adaptive Selection</span>
        </div>

        <div className="flex items-center gap-2">
          <Link href={patternUrl} className="no-underline">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] text-xs font-semibold cursor-pointer transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>View Pattern</span>
            </button>
          </Link>

          <Link href={heroMission.practiceUrl} className="no-underline">
            <button
              type="button"
              data-testid="hero-start-btn"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start Problem</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
