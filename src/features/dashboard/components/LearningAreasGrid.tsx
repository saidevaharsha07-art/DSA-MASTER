'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookMarked, Search, ArrowUpRight } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface LearningAreasGridProps {
  canonicalLearningAreas: DashboardSummary['canonicalLearningAreas'];
}

export function LearningAreasGrid({ canonicalLearningAreas }: LearningAreasGridProps) {
  const [filterQuery, setFilterQuery] = useState('');

  const filteredAreas = useMemo(() => {
    if (!filterQuery.trim()) return canonicalLearningAreas;
    const q = filterQuery.toLowerCase();
    return canonicalLearningAreas.filter(
      (a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
  }, [canonicalLearningAreas, filterQuery]);

  return (
    <div className="flex flex-col gap-3.5 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(16,185,129,0.12)] text-[#10B981] flex items-center justify-center shrink-0">
            <BookMarked className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Comprehensive Curriculum
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] m-0 leading-tight">
              All 25 Canonical Learning Areas
            </h3>
          </div>
        </div>

        {/* Compact Search Filter */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter 25 areas..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs rounded-md border border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
      </div>

      {/* Compact Grid/List Hybrid */}
      <div
        data-testid="learning-areas-grid"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5"
      >
        {filteredAreas.map((area) => (
          <div
            key={area.slug}
            data-testid={`area-card-${area.slug}`}
            className="flex flex-col justify-between gap-2 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-subtle)] hover:border-[var(--border)] transition-all duration-150"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--text-primary)] leading-tight truncate">
                  {area.number}. {area.title}
                </span>
                <span className="text-[10px] font-mono font-bold text-[var(--text-secondary)] shrink-0">
                  {area.solvedCount}/{area.totalCount}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 rounded-full bg-[var(--border)] overflow-hidden mt-1.5">
                <div
                  className="h-full bg-[#10B981] rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(0, Math.min(100, area.percentage))}%` }}
                />
              </div>
            </div>

            {/* Action Links */}
            <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-[var(--border-subtle)]">
              <Link href={area.journeyUrl} className="no-underline">
                <button
                  type="button"
                  className="px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] font-medium cursor-pointer transition-colors"
                >
                  Journey
                </button>
              </Link>
              <Link href={area.practiceUrl} className="no-underline">
                <button
                  type="button"
                  className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded bg-[rgba(16,185,129,0.1)] hover:bg-[rgba(16,185,129,0.18)] border border-[rgba(16,185,129,0.25)] text-[#10B981] text-[11px] font-semibold cursor-pointer transition-colors"
                >
                  <span>Practice</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
