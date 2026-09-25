'use client';

import React from 'react';
import { CategoryModel } from '@/src/curriculum/types';
import { LearningAreaCard, MasteryState } from './LearningAreaCard';

export interface CurriculumBandData {
  id: string;
  order: string;
  name: string;
  description: string;
  slugs: string[];
}

interface AreaItemComputed {
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

interface CurriculumBandSectionProps {
  band: CurriculumBandData;
  areas: AreaItemComputed[];
}

export function CurriculumBandSection({ band, areas }: CurriculumBandSectionProps) {
  if (areas.length === 0) {
    return null;
  }

  const bandPatterns = areas.reduce((sum, a) => sum + a.patternCount, 0);
  const bandProblems = areas.reduce((sum, a) => sum + a.totalProblems, 0);
  const bandSolved = areas.reduce((sum, a) => sum + a.solvedProblems, 0);
  const bandPct = bandProblems > 0 ? Math.round((bandSolved / bandProblems) * 100) : 0;

  return (
    <section className="flex flex-col gap-4 w-full" aria-labelledby={`band-heading-${band.id}`}>
      {/* ── Band Technical Section Header ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--border)] pb-3">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)] tracking-wider">
              {band.order} {'//'}
            </span>
            <h2 id={`band-heading-${band.id}`} className="text-lg font-bold tracking-tight text-[var(--text-primary)]">
              {band.name}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-xl">
            {band.description}
          </p>
        </div>

        {/* Rollup Stats */}
        <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)] shrink-0 self-start sm:self-auto">
          <span>{areas.length} Areas</span>
          <span>•</span>
          <span>{bandPatterns} Patterns</span>
          <span>•</span>
          <span>{bandProblems.toLocaleString()} Problems</span>
          {bandSolved > 0 && (
            <>
              <span>•</span>
              <span className="text-[var(--accent)] font-semibold">{bandPct}% Solved</span>
            </>
          )}
        </div>
      </div>

      {/* ── Grid of Learning Area Cards ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {areas.map((item) => (
          <LearningAreaCard
            key={item.area.slug}
            area={item.area}
            subtopicCount={item.subtopicCount}
            patternCount={item.patternCount}
            totalProblems={item.totalProblems}
            solvedProblems={item.solvedProblems}
            masteryState={item.masteryState}
            hasPlatformCoverage={item.hasPlatformCoverage}
          />
        ))}
      </div>
    </section>
  );
}
