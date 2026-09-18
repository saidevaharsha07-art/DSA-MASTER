'use client';

import React, { useMemo } from 'react';
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

  // Solved sets
  const completedIds = useMemo(() => {
    return new Set<string>(roadmapState?.completedProblemIds ?? []);
  }, [roadmapState?.completedProblemIds]);

  const completedNumbers = useMemo(() => {
    return new Set<number>(roadmapState?.completed ?? []);
  }, [roadmapState?.completed]);

  const isSolved = (p: { id: string; leetcodeNumber?: number; url?: string }) => {
    if (completedIds.has(p.id)) return true;
    if (p.leetcodeNumber && completedNumbers.has(p.leetcodeNumber)) return true;
    return false;
  };

  const solvedCount = areaProblems.filter(isSolved).length;
  const totalCount = areaProblems.length;
  const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Platform breakdown
  const lcProblems = areaProblems.filter(
    (p) => !p.url.includes('codechef.com') && !p.url.includes('codeforces.com')
  );
  const ccProblems = areaProblems.filter((p) => p.url.includes('codechef.com'));
  const cfProblems = areaProblems.filter((p) => p.url.includes('codeforces.com'));

  const lcSolved = lcProblems.filter(isSolved).length;
  const ccSolved = ccProblems.filter(isSolved).length;
  const cfSolved = cfProblems.filter(isSolved).length;

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
                {areaPatterns.length} Subtopic Patterns
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

        {/* Cross-Platform Coverage Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[var(--border)]">
          <Link
            href={`/practice?platform=leetcode&area=${category.slug}`}
            className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-emerald-500/50 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-emerald-500 block">LeetCode</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {lcSolved}/{lcProblems.length} solved
              </span>
            </div>
            <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-emerald-500" />
          </Link>

          <Link
            href={`/practice?platform=codechef&area=${category.slug}`}
            className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-orange-500/50 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-orange-500 block">CodeChef</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {ccSolved}/{ccProblems.length} solved
              </span>
            </div>
            <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-orange-500" />
          </Link>

          <Link
            href={`/practice?platform=codeforces&area=${category.slug}`}
            className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:border-blue-500/50 transition-all flex items-center justify-between group"
          >
            <div>
              <span className="text-[11px] font-bold text-blue-500 block">Codeforces</span>
              <span className="text-xs text-[var(--text-secondary)]">
                {cfSolved}/{cfProblems.length} solved
              </span>
            </div>
            <ExternalLink size={14} className="text-[var(--text-muted)] group-hover:text-blue-500" />
          </Link>
        </div>
      </div>

      {/* Subtopic Patterns Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-[var(--text-primary)]">
            Subtopic Patterns ({areaPatterns.length})
          </h2>
          <span className="text-xs text-[var(--text-muted)] font-medium">
            Master each canonical algorithmic pattern
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {areaPatterns.map((pat) => {
            const patProblems = areaProblems.filter(
              (p) => p.patternSlug === pat.slug || p.patternId === pat.id || p.patternTitle === pat.title
            );
            const patSolved = patProblems.filter(isSolved).length;
            const patPct = patProblems.length > 0 ? Math.round((patSolved / patProblems.length) * 100) : 0;

            return (
              <div
                key={pat.slug}
                className="p-5 rounded-2xl border flex flex-col justify-between gap-4 transition-all hover:shadow-md"
                style={{
                  background: 'var(--card)',
                  borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                      {pat.difficulty}
                    </span>
                    <span className="text-xs font-bold text-[var(--text-muted)]">
                      {patSolved}/{patProblems.length} Solved
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)]">
                    {pat.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] line-clamp-2">
                    {pat.shortDescription || pat.overview}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] font-medium">
                    <Layers size={13} className="text-indigo-400" />
                    <span>{patProblems.length} Challenges</span>
                  </div>

                  <Link
                    href={`/practice?area=${category.slug}&pattern=${pat.slug}`}
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
    </div>
  );
}
