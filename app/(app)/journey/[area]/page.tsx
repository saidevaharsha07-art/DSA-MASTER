'use client';

import React, { useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Code2,
  Flame,
  Layers,
  Sparkles,
  ExternalLink,
  Target,
  Trophy,
  Compass,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { useSettings } from '@/src/context/SettingsContext';
import { useRoadmap } from '@/hooks/use-roadmap';

export default function JourneyAreaDetailPage() {
  const params = useParams();
  const rawArea = params?.area as string;
  const areaSlug = Array.isArray(rawArea) ? rawArea[0] : rawArea;

  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const { state: roadmapState } = useRoadmap();

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

  const isSolved = useCallback((p: { id: string; leetcodeNumber?: number; url?: string }) => {
    if (completedIds.has(p.id)) return true;
    if (p.leetcodeNumber && completedNumbers.has(p.leetcodeNumber)) return true;
    return false;
  }, [completedIds, completedNumbers]);

  const solvedCount = areaProblems.filter(isSolved).length;
  const totalCount = areaProblems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Exact Four-Platform Breakdown
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
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto p-4 sm:p-8">
      {/* Top Nav Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/journey"
          className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <ArrowLeft size={16} /> Back to Learning Areas
        </Link>
        <Link
          href={`/practice?area=${category.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md"
        >
          <Code2 size={14} /> Practice All in Arena
        </Link>
      </div>

      {/* Hero Header */}
      <div
        className="p-6 sm:p-8 rounded-3xl border flex flex-col gap-6 shadow-sm"
        style={{
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(99, 102, 241, 0.05) 100%)'
            : 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, var(--card) 100%)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
                Learning Area #{category.order}
              </span>
              <span className="text-xs text-[var(--text-muted)] font-medium">
                {areaSubtopics.length} Subtopics • {areaPatterns.length} Patterns
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)] tracking-tight">
              {category.title}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
              {category.description}
            </p>
          </div>

          {/* Progress gauge */}
          <div className="flex flex-col items-start sm:items-end gap-2 bg-[var(--surface)] p-4 rounded-2xl border border-[var(--border)] min-w-[200px]">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Area Mastery
            </span>
            <div className="flex items-baseline gap-2">
              <strong className="text-3xl font-black text-indigo-500">{progressPct}%</strong>
              <span className="text-xs text-[var(--text-secondary)] font-semibold">
                ({solvedCount}/{totalCount} Solved)
              </span>
            </div>
            <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Four-Platform Drilldown Cards */}
        <div className="flex flex-col gap-3 pt-5 border-t border-[var(--border)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Platform Availability &amp; Drilldowns
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              Real problem repository mappings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {platformCards.map((p) => (
              <div
                key={p.id}
                data-platform={p.id}
                className="p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all hover:shadow-md"
                style={{
                  background: 'var(--surface)',
                  borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: p.color }}
                      />
                      <strong className="text-sm font-black text-[var(--text-primary)]">
                        {p.label}
                      </strong>
                    </div>
                    {p.hasProblems ? (
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-md"
                        style={{
                          background: `${p.color}15`,
                          color: p.color,
                        }}
                      >
                        {p.progressPct}% Mastery
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-[var(--text-muted)] bg-gray-500/10 px-2 py-0.5 rounded-md">
                        Unmapped
                      </span>
                    )}
                  </div>

                  {p.hasProblems ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-[var(--text-muted)] font-medium">Mapped Problems:</span>
                        <strong className="font-bold text-[var(--text-primary)]">{p.mappedCount}</strong>
                      </div>
                      <div className="flex items-baseline justify-between text-xs">
                        <span className="text-[var(--text-muted)] font-medium">Solved:</span>
                        <span className="font-semibold text-[var(--text-secondary)]">
                          {p.solvedCount} / {p.mappedCount}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-2">
                      <p className="text-xs font-semibold text-[var(--text-muted)] italic">
                        No mapped problems yet
                      </p>
                    </div>
                  )}
                </div>

                <Link
                  href={`/practice?area=${category.slug}&platform=${p.id}`}
                  className="mt-1 w-full py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all"
                  style={{
                    background: `${p.color}18`,
                    color: p.color,
                    border: `1px solid ${p.color}40`,
                  }}
                >
                  <span>Practice {category.title} on {p.label}</span>
                  <ExternalLink size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtopic Hierarchy View: Learning Area -> Subtopic -> Pattern */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-[var(--text-primary)]">
              Subtopics &amp; Patterns ({areaSubtopics.length} Subtopics)
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              Structured progressive path from foundational subtopics to mastery
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 self-start sm:self-auto">
            Canonical 4-Tier Hierarchy
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {areaSubtopics.map((subtopic) => {
            const subtopicPatterns = areaPatterns.filter((pat) =>
              subtopic.patternIds.includes(pat.id) ||
              subtopic.patternIds.includes(`pattern.${pat.slug}`) ||
              pat.subtopicSlug === subtopic.slug ||
              pat.subtopicId === subtopic.id
            );

            return (
              <div
                key={subtopic.id}
                className="p-6 rounded-3xl border flex flex-col gap-4 shadow-sm"
                style={{
                  background: 'var(--card)',
                  borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-500">
                        Subtopic #{subtopic.order}
                      </span>
                      <h3 className="text-lg font-black text-[var(--text-primary)]">
                        {subtopic.title}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)]">
                      {subtopic.description}
                    </p>
                  </div>

                  <Link
                    href={`/practice?area=${category.slug}&subtopic=${subtopic.slug}`}
                    className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>Practice Subtopic</span>
                    <span>→</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subtopicPatterns.map((pat) => {
                    const patProblems = areaProblems.filter(
                      (p) => p.patternSlug === pat.slug || p.patternId === pat.id || p.patternTitle === pat.title
                    );
                    const patSolved = patProblems.filter(isSolved).length;

                    return (
                      <div
                        key={pat.slug}
                        className="p-4 rounded-2xl border flex flex-col justify-between gap-3 transition-all hover:shadow-md"
                        style={{
                          background: 'var(--surface)',
                          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                              {pat.difficulty}
                            </span>
                            <span className="text-xs font-bold text-[var(--text-muted)]">
                              {patSolved}/{patProblems.length} Solved
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-[var(--text-primary)]">
                            {pat.title}
                          </h4>
                          <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                            {pat.shortDescription || pat.overview}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
                          <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                            <Layers size={13} className="text-indigo-400" />
                            <span>{patProblems.length} Challenges</span>
                          </div>

                          <Link
                            href={`/practice?area=${category.slug}&subtopic=${subtopic.slug}&pattern=${pat.slug}`}
                            className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1"
                          >
                            Drill Pattern ›
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

