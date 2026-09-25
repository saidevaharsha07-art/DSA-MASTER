'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Compass,
  Trophy,
  Filter,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { useSettings } from '@/src/context/SettingsContext';
import { useRoadmap } from '@frontend/hooks/use-roadmap';

export default function JourneyAreaDetailPage() {
  const params = useParams();
  const rawArea = params?.area as string;
  const areaSlug = Array.isArray(rawArea) ? rawArea[0] : rawArea;

  const { settings } = useSettings();
  const { state: roadmapState } = useRoadmap();

  // Progressive disclosure state
  // Default: first subtopic is open, others can be toggled
  const [collapsedSubtopics, setCollapsedSubtopics] = useState<Record<string, boolean>>({});
  const [expandedPatterns, setExpandedPatterns] = useState<Record<string, boolean>>({});

  const toggleSubtopic = (slug: string) => {
    setCollapsedSubtopics((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const togglePattern = (slug: string) => {
    setExpandedPatterns((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  // Find matching category/area
  const category = useMemo(() => {
    if (!areaSlug) return undefined;
    return CurriculumRepository.getCategoryBySlug(areaSlug);
  }, [areaSlug]);

  // If not found, trigger 404
  if (!category) {
    notFound();
  }

  // Subtopics / Patterns for this area
  const areaPatterns = useMemo(() => {
    return CurriculumRepository.getAllPatterns().filter(
      (p) => p.categorySlug === category.slug || p.categoryId === category.id
    );
  }, [category]);

  // Problems for this area
  const areaProblems = useMemo(() => {
    return CurriculumRepository.getAllProblems().filter(
      (p) =>
        p.categorySlug === category.slug ||
        p.categoryId === category.id ||
        p.categoryTitle === category.title
    );
  }, [category]);

  // Subtopics for this area
  const areaSubtopics = useMemo(() => {
    return CurriculumRepository.getSubtopicsByCategory(category.slug);
  }, [category]);

  // Solved sets
  const completedIds = useMemo(() => {
    return new Set<string>(roadmapState?.completedProblemIds ?? []);
  }, [roadmapState?.completedProblemIds]);

  const completedNumbers = useMemo(() => {
    return new Set<number>(roadmapState?.completed ?? []);
  }, [roadmapState?.completed]);

  const isSolved = useCallback(
    (p: { id: string; leetcodeNumber?: number; url?: string }) => {
      if (completedIds.has(p.id)) return true;
      if (p.leetcodeNumber && completedNumbers.has(p.leetcodeNumber)) return true;
      return false;
    },
    [completedIds, completedNumbers]
  );

  const solvedCount = areaProblems.filter(isSolved).length;
  const totalCount = areaProblems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Exact Four-Platform Breakdown with equal visual weight
  const platformCards = useMemo(() => {
    const configs = [
      { id: 'leetcode', label: 'LeetCode', color: '#10B981', tag: 'Canonical DSA' },
      { id: 'codechef', label: 'CodeChef', color: '#F97316', tag: 'Competitive Ratings' },
      { id: 'codeforces', label: 'Codeforces', color: '#3B82F6', tag: 'Contest Ladders' },
      { id: 'geeksforgeeks', label: 'GeeksForGeeks', color: '#2F9E44', tag: 'Interview Curated' },
    ] as const;

    return configs.map((cfg) => {
      const pProblems = areaProblems.filter((p) => p.platform === cfg.id);
      const pSolved = pProblems.filter(isSolved).length;
      const pTotal = pProblems.length;
      const pProgress = pTotal > 0 ? Math.round((pSolved / pTotal) * 100) : 0;

      return {
        ...cfg,
        mappedCount: pTotal,
        solvedCount: pSolved,
        progressPct: pProgress,
        hasProblems: pTotal > 0,
      };
    });
  }, [areaProblems, isSolved]);

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto pt-4 px-4 sm:px-6 pb-20">
      {/* ── Top Navigation Breadcrumbs ───────────────────────────────── */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/journey"
          className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Learning Areas
        </Link>
        <Link
          href={`/practice?area=${category.slug}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--text-inverse)] hover:bg-[var(--accent-hover)] transition-all shadow-xs"
        >
          <Code2 size={14} /> Practice All in Arena
        </Link>
      </div>

      {/* ── Area Hero Header ─────────────────────────────────────────── */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8 flex flex-col gap-6 shadow-xs relative overflow-hidden">
        {/* Subtle glow effect */}
        <div
          className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold uppercase tracking-wider bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
                Learning Area #{category.order}
              </span>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                {areaSubtopics.length} Subtopics • {areaPatterns.length} Patterns • {totalCount} Problems
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              {category.title}
            </h1>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* Area Mastery Scorecard */}
          <div className="flex flex-col items-start lg:items-end gap-2 bg-[var(--bg-subtle)] p-4 sm:p-5 rounded-xl border border-[var(--border-subtle)] min-w-[220px] shrink-0">
            <span className="text-[11px] font-mono font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Area Mastery
            </span>
            <div className="flex items-baseline gap-2">
              <strong className="text-3xl font-mono font-bold text-[var(--accent)]">
                {progressPct}%
              </strong>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                ({solvedCount}/{totalCount} Solved)
              </span>
            </div>
            <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Four-Platform Drilldown Cards */}
        <div className="relative z-10 flex flex-col gap-3 pt-5 border-t border-[var(--border)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--text-muted)]">
              Platform Availability &amp; Drilldowns
            </span>
            <span className="text-[11px] font-mono text-[var(--text-muted)]">
              Real problem repository mappings across all 4 platforms
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {platformCards.map((p) => (
              <div
                key={p.id}
                data-platform={p.id}
                className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] flex flex-col justify-between gap-3 hover:border-[var(--border-strong)] transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      <strong className="text-sm font-bold text-[var(--text-primary)]">
                        {p.label}
                      </strong>
                    </div>
                    {p.hasProblems ? (
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                        }}
                      >
                        {p.progressPct}% Mastery
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-[var(--text-muted)] bg-[var(--surface)] px-2 py-0.5 rounded-md">
                        0% Mastery
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1 pt-1">
                    <div className="flex items-baseline justify-between text-xs font-mono">
                      <span className="text-[var(--text-muted)]">Mapped Problems:</span>
                      <strong className="font-bold text-[var(--text-primary)]">
                        {p.mappedCount} Problems
                      </strong>
                    </div>
                    {p.hasProblems ? (
                      <div className="flex items-baseline justify-between text-xs font-mono">
                        <span className="text-[var(--text-muted)]">Solved:</span>
                        <span className="text-[var(--text-secondary)]">
                          {p.solvedCount} / {p.mappedCount} Solved
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-between text-xs font-mono">
                        <span className="text-[var(--text-muted)]">Status:</span>
                        <span className="text-[var(--text-muted)] italic">
                          No mapped problems yet
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/practice?area=${category.slug}&platform=${p.id}`}
                  className="mt-1 w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    background: `${p.color}18`,
                    color: p.color,
                    border: `1px solid ${p.color}40`,
                  }}
                >
                  <span>Practice on {p.label} →</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4-Tier Subtopic Hierarchy Section ────────────────────────── */}
      <div className="flex flex-col gap-6">
        {/* Hierarchy Explanation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Subtopics &amp; Patterns ({areaSubtopics.length} Subtopics)
              </h2>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20 font-semibold">
                Canonical 4-Tier Hierarchy
              </span>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Follow the 4-tier progressive hierarchy: Learning Area → Subtopics → Patterns → Problems
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-medium self-start sm:self-auto flex-wrap">
            <span className="px-2.5 py-1 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]">
              Learning Area
            </span>
            <span className="text-[var(--text-muted)]">→</span>
            <span className="px-2.5 py-1 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]">
              Subtopics
            </span>
            <span className="text-[var(--text-muted)]">→</span>
            <span className="px-2.5 py-1 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]">
              Patterns
            </span>
            <span className="text-[var(--text-muted)]">→</span>
            <span className="px-2.5 py-1 rounded-md bg-[var(--surface)] text-[var(--accent)] border border-[var(--border)]">
              Problems
            </span>
          </div>
        </div>

        {/* ── Subtopic Accordions ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          {areaSubtopics.map((subtopic) => {
            const isCollapsed = collapsedSubtopics[subtopic.slug] === true;
            const subtopicPatterns = areaPatterns.filter(
              (pat) =>
                subtopic.patternIds.includes(pat.id) ||
                subtopic.patternIds.includes(`pattern.${pat.slug}`) ||
                pat.subtopicSlug === subtopic.slug ||
                pat.subtopicId === subtopic.id
            );

            const subtopicProblems = areaProblems.filter(
              (p) => p.subtopicSlug === subtopic.slug || p.subtopicId === subtopic.id
            );
            const subtopicSolved = subtopicProblems.filter(isSolved).length;

            return (
              <div
                key={subtopic.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col shadow-xs transition-all overflow-hidden"
              >
                {/* Subtopic Accordion Header (Click to toggle) */}
                <div
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none hover:bg-[var(--surface-elevated)] transition-colors"
                  onClick={() => toggleSubtopic(subtopic.slug)}
                  role="button"
                  aria-expanded={!isCollapsed}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleSubtopic(subtopic.slug);
                    }
                  }}
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider bg-[var(--bg-subtle)] text-[var(--accent)] border border-[var(--border-subtle)]">
                        Subtopic #{subtopic.order}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                        {subtopic.title}
                      </h3>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        ({subtopicPatterns.length} Patterns • {subtopicProblems.length} Problems • {subtopicSolved} Solved)
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] max-w-3xl">
                      {subtopic.description}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-2.5 self-start sm:self-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      href={`/practice?area=${category.slug}&subtopic=${subtopic.slug}`}
                      className="text-xs font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent)]/20"
                    >
                      <span>Practice Subtopic</span>
                      <ArrowRight size={12} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleSubtopic(subtopic.slug)}
                      className="p-1.5 rounded-lg bg-[var(--bg-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border)]"
                      aria-label="Toggle subtopic patterns"
                    >
                      {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                    </button>
                  </div>
                </div>

                {/* Subtopic Patterns (Progressive Disclosure) */}
                {!isCollapsed && (
                  <div className="px-5 sm:px-6 pb-6 pt-3 border-t border-[var(--border-subtle)] bg-[var(--bg-subtle)] flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {subtopicPatterns.map((pat) => {
                        const patProblems = areaProblems.filter(
                          (p) =>
                            p.patternSlug === pat.slug ||
                            p.patternId === pat.id ||
                            p.patternTitle === pat.title
                        );
                        const patSolved = patProblems.filter(isSolved).length;
                        const isPatternExpanded = expandedPatterns[pat.slug] === true;

                        return (
                          <div
                            key={pat.slug}
                            className="p-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] flex flex-col justify-between gap-3 transition-all hover:border-[var(--border-strong)]"
                          >
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-subtle)] px-2 py-0.5 rounded border border-[var(--accent)]/20">
                                  {pat.difficulty}
                                </span>
                                <span className="text-xs font-mono text-[var(--text-muted)]">
                                  {patSolved}/{patProblems.length} Solved
                                </span>
                              </div>
                              <Link
                                href={`/journey/${category.slug}/${subtopic.slug}/${pat.slug}`}
                                className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                              >
                                {pat.title}
                              </Link>
                              <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                                {pat.shortDescription || pat.overview}
                              </p>
                            </div>

                            {/* Challenges Drawer (Tier 4: Problems) */}
                            {isPatternExpanded && patProblems.length > 0 && (
                              <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--border-subtle)] max-h-48 overflow-y-auto pr-1">
                                {patProblems.slice(0, 10).map((prob) => {
                                  const solved = isSolved(prob);
                                  return (
                                    <Link
                                      key={prob.id}
                                      href={`/practice?area=${category.slug}&subtopic=${subtopic.slug}&pattern=${pat.slug}&search=${encodeURIComponent(
                                        prob.title
                                      )}`}
                                      className="flex items-center justify-between gap-2 text-xs py-1 px-2 rounded-lg hover:bg-[var(--surface-elevated)] transition-colors"
                                    >
                                      <div className="flex items-center gap-1.5 truncate">
                                        {solved ? (
                                          <CheckCircle2
                                            size={12}
                                            className="text-emerald-500 shrink-0"
                                          />
                                        ) : (
                                          <span className="w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                                        )}
                                        <span className="text-[var(--text-primary)] truncate font-medium">
                                          {prob.title}
                                        </span>
                                      </div>
                                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase shrink-0">
                                        {prob.platform}
                                      </span>
                                    </Link>
                                  );
                                })}
                                {patProblems.length > 10 && (
                                  <span className="text-[10px] font-mono text-[var(--text-muted)] italic text-center pt-1">
                                    +{patProblems.length - 10} more problems in Arena
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Pattern Card Action Footer */}
                            <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                              <button
                                type="button"
                                onClick={() => togglePattern(pat.slug)}
                                className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-mono font-medium cursor-pointer"
                              >
                                <Layers size={13} className="text-[var(--accent)]" />
                                <span>{patProblems.length} Challenges</span>
                                {isPatternExpanded ? (
                                  <ChevronUp size={12} />
                                ) : (
                                  <ChevronDown size={12} />
                                )}
                              </button>

                              <div className="flex items-center gap-2.5">
                                <Link
                                  href={`/journey/${category.slug}/${subtopic.slug}/${pat.slug}`}
                                  className="text-xs font-semibold text-[var(--accent)] hover:underline flex items-center gap-0.5"
                                >
                                  <span>Learn Pattern</span>
                                  <span>›</span>
                                </Link>
                                <Link
                                  href={`/practice?area=${category.slug}&subtopic=${subtopic.slug}&pattern=${pat.slug}`}
                                  className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-0.5"
                                >
                                  <span>Practice</span>
                                  <span>›</span>
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
