'use client';

import React, { useState } from 'react';
import { BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface MasteryOverviewCardProps {
  masteryOverview: DashboardSummary['masteryOverview'];
}

export function MasteryOverviewCard({ masteryOverview }: MasteryOverviewCardProps) {
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);
  const [expandedAreaSlug, setExpandedAreaSlug] = useState<string | null>(null);
  const [expandedSubtopicSlug, setExpandedSubtopicSlug] = useState<string | null>(null);

  if (!masteryOverview) return null;

  return (
    <div
      data-testid="mastery-overview"
      className="flex flex-col gap-3.5 p-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 hover:border-[var(--border-strong)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[rgba(16,185,129,0.12)] text-[#10B981] flex items-center justify-center shrink-0">
            <BarChart3 className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-secondary)] block leading-none">
              Mastery Progress
            </span>
            <h3 className="text-sm font-bold text-[var(--text-primary)] m-0 leading-tight">
              Mastery Overview
            </h3>
          </div>
        </div>

        <button
          type="button"
          data-testid="drilldown-toggle-btn"
          onClick={() => setIsDrilldownOpen(!isDrilldownOpen)}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:border-[var(--accent)] text-[var(--text-primary)] text-xs font-semibold cursor-pointer transition-colors"
        >
          <span>{isDrilldownOpen ? 'Hide Matrix' : '3-Tier Matrix'}</span>
          {isDrilldownOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* 4 Factual Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-2.5 rounded-lg bg-[rgba(16,185,129,0.06)] border border-[rgba(16,185,129,0.2)] text-center">
          <span className="text-lg font-mono font-bold text-[#10B981] block leading-none">
            {masteryOverview.masteredCount}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-1 block">
            Mastered
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[rgba(245,158,11,0.06)] border border-[rgba(245,158,11,0.2)] text-center">
          <span className="text-lg font-mono font-bold text-[#F59E0B] block leading-none">
            {masteryOverview.learningCount}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-1 block">
            Learning
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[rgba(244,63,94,0.06)] border border-[rgba(244,63,94,0.2)] text-center">
          <span className="text-lg font-mono font-bold text-[#F43F5E] block leading-none">
            {masteryOverview.weakCount}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-1 block">
            Weak
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[rgba(139,92,246,0.06)] border border-[rgba(139,92,246,0.2)] text-center">
          <span className="text-lg font-mono font-bold text-[#8B5CF6] block leading-none">
            {masteryOverview.needsRevisionCount}
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-wider mt-1 block">
            Due Rev
          </span>
        </div>
      </div>

      <p className="text-[11px] text-[var(--text-muted)] m-0 leading-relaxed">
        Authentic evaluation across all {masteryOverview.totalTopicsTracked} canonical DSA learning areas. Zero fabricated percentages.
      </p>

      {/* 3-Tier Drilldown Matrix */}
      {isDrilldownOpen && (
        <div
          data-testid="mastery-drilldown-matrix"
          className="flex flex-col gap-2 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)] mt-1 max-h-[360px] overflow-y-auto"
        >
          <span className="text-xs font-mono font-bold uppercase text-[var(--text-secondary)] tracking-wider">
            Curriculum Mastery Hierarchy (Area → Subtopic → Pattern)
          </span>

          <div className="flex flex-col gap-1.5">
            {masteryOverview.learningAreas.map((area) => (
              <div
                key={area.slug}
                className="p-2 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] text-xs"
              >
                <div
                  onClick={() => setExpandedAreaSlug(expandedAreaSlug === area.slug ? null : area.slug)}
                  className="flex items-center justify-between cursor-pointer py-0.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--text-primary)]">{area.title}</span>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">
                      ({area.solvedCount} / {area.totalProblems})
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded uppercase"
                      style={{
                        backgroundColor:
                          area.status === 'mastered'
                            ? 'rgba(16,185,129,0.15)'
                            : area.status === 'weak'
                            ? 'rgba(244,63,94,0.15)'
                            : 'rgba(245,158,11,0.15)',
                        color:
                          area.status === 'mastered'
                            ? '#10B981'
                            : area.status === 'weak'
                            ? '#F43F5E'
                            : '#F59E0B',
                      }}
                    >
                      {area.status}
                    </span>
                    {expandedAreaSlug === area.slug ? (
                      <ChevronUp className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    )}
                  </div>
                </div>

                {/* Subtopics */}
                {expandedAreaSlug === area.slug && (
                  <div className="mt-2 pl-3 border-l-2 border-[var(--border-strong)] flex flex-col gap-1.5">
                    {area.subtopics.map((sub) => (
                      <div key={sub.slug} className="text-xs">
                        <div
                          onClick={() => setExpandedSubtopicSlug(expandedSubtopicSlug === sub.slug ? null : sub.slug)}
                          className="flex items-center justify-between cursor-pointer py-0.5"
                        >
                          <span className="font-medium text-[var(--text-secondary)]">{sub.title}</span>
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">
                            {sub.solvedCount} / {sub.totalProblems}
                          </span>
                        </div>

                        {/* Patterns */}
                        {expandedSubtopicSlug === sub.slug && (
                          <div className="pl-3 mt-1 flex flex-col gap-1">
                            {sub.patterns.map((pat) => (
                              <div
                                key={pat.slug}
                                className="flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono"
                              >
                                <span>↳ {pat.title}</span>
                                <span>{pat.solvedCount} / {pat.totalProblems}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
