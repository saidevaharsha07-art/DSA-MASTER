'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  Shield,
  Zap,
  Search,
  Grid,
  LayoutGrid,
  Layers,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

import { CurriculumRepository } from '@/src/curriculum/repository';
import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { useSettings } from '@/src/context/SettingsContext';

export function LearnRoadmapView() {
  const { userId } = useActiveUser();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'4col' | 'compact'>('4col');
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to real-time progress events for dynamic live updates
  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleUpdate);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleUpdate);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', handleUpdate);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', handleUpdate);

    return () => {
      unsubSolve();
      unsubMemory();
      unsubPlatform();
      unsubProfile();
    };
  }, []);

  const state = progressService.getState(userId);
  const allProblems = useMemo(() => CurriculumRepository.getAllProblems(), []);
  const allCategories = useMemo(() => CurriculumRepository.getAllCategories(), []);

  const canonicalSolvedSet = useMemo(() => {
    return new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);
  }, [state.completed, state.completedProblemIds, refreshKey]);

  const isProblemSolved = (p: any): boolean => {
    if (typeof p.leetcodeNumber === 'number' && state.completed.includes(p.leetcodeNumber)) return true;
    if (canonicalSolvedSet.has(p.id) || canonicalSolvedSet.has(String(p.leetcodeNumber))) return true;
    const platform = p.url?.includes('codechef.com')
      ? 'codechef'
      : p.url?.includes('codeforces.com')
      ? 'codeforces'
      : 'leetcode';
    return (
      canonicalSolvedSet.has(`${platform}:${p.id}`) ||
      canonicalSolvedSet.has(`${platform}:${p.leetcodeNumber}`)
    );
  };

  // 1. LEETCODE CURRICULUM DATA
  const leetcodeProblems = useMemo(() => {
    return allProblems.filter(
      (p) => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org')
    );
  }, [allProblems]);

  const leetcodeSections = useMemo(() => {
    let currentStationFound = false;

    return allCategories.map((cat, idx) => {
      const catProblems = leetcodeProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solved = catProblems.filter((p) => isProblemSolved(p)).length;
      const total = catProblems.length;
      const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
      const isCompleted = total > 0 && solved >= total;
      const isCurrent = !isCompleted && !currentStationFound;
      if (isCurrent) currentStationFound = true;

      return {
        id: idx + 1,
        number: idx + 1,
        slug: cat.slug,
        title: cat.title,
        kingdomTitle: cat.kingdomTitle || `Kingdom of ${cat.title}`,
        description: cat.description,
        patternsCount: cat.patternIds?.length || 4,
        solvedCount: solved,
        totalCount: total,
        percentage: pct,
        isCompleted,
        isCurrent,
        difficulty: idx < 6 ? 'Novice' : idx < 14 ? 'Intermediate' : idx < 21 ? 'Advanced' : 'Expert',
        url: idx === 0 ? '/learn/beginnings' : `/practice/${cat.slug}`,
      };
    });
  }, [allCategories, leetcodeProblems, canonicalSolvedSet, refreshKey]);

  const lcTotalSolved = leetcodeSections.reduce((s, c) => s + c.solvedCount, 0);
  const lcTotalProblems = leetcodeProblems.length;
  const lcPct = lcTotalProblems > 0 ? Math.round((lcTotalSolved / lcTotalProblems) * 100) : 0;

  // 2. CODECHEF CURRICULUM DATA
  const codechefProblems = useMemo(() => {
    return allProblems.filter((p) => p.url?.includes('codechef.com'));
  }, [allProblems]);

  const codechefSections = useMemo(() => {
    let currentStationFound = false;

    return allCategories.map((cat, idx) => {
      const catProblems = codechefProblems.filter(
        (p) =>
          p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categoryTitle === cat.title ||
          p.kingdomTitle === cat.kingdomTitle
      );
      const solved = catProblems.filter((p) => isProblemSolved(p)).length;
      const total = catProblems.length;
      const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
      const isCompleted = total > 0 && solved >= total;
      const isCurrent = !isCompleted && !currentStationFound;
      if (isCurrent) currentStationFound = true;

      return {
        id: idx + 1,
        number: idx + 1,
        slug: cat.slug,
        title: cat.title,
        kingdomTitle: cat.kingdomTitle || `Kingdom of ${cat.title}`,
        description: cat.description,
        patternsCount: cat.patternIds?.length || 4,
        solvedCount: solved,
        totalCount: total,
        percentage: pct,
        isCompleted,
        isCurrent,
        difficulty: idx < 6 ? '1-Star Novice' : idx < 14 ? '2-Star Practice' : idx < 21 ? '3-Star Expert' : '4-Star Master',
        url: `/practice/codechef?kingdom=${cat.slug}`,
      };
    });
  }, [allCategories, codechefProblems, canonicalSolvedSet, refreshKey]);

  const ccTotalSolved = codechefSections.reduce((s, c) => s + c.solvedCount, 0);
  const ccTotalProblems = codechefProblems.length;
  const ccPct = ccTotalProblems > 0 ? Math.round((ccTotalSolved / ccTotalProblems) * 100) : 0;

  // 3. CODEFORCES CURRICULUM DATA
  const codeforcesProblems = useMemo(() => {
    return allProblems.filter((p) => p.url?.includes('codeforces.com'));
  }, [allProblems]);

  const codeforcesDivisions = useMemo(() => {
    const div4Problems = codeforcesProblems.filter((p: any) => p.level === 'Learn' || p.xp <= 15);
    const div3Problems = codeforcesProblems.filter((p: any) => p.level === 'Practice' || (p.xp > 15 && p.xp <= 25));
    const div2Problems = codeforcesProblems.filter((p: any) => p.level === 'Master' || (p.xp > 25 && p.xp <= 40));

    const div4Solved = div4Problems.filter((p) => isProblemSolved(p)).length;
    const div3Solved = div3Problems.filter((p) => isProblemSolved(p)).length;
    const div2Solved = div2Problems.filter((p) => isProblemSolved(p)).length;

    return [
      {
        id: 'div-4',
        number: 1,
        name: 'Division 4 (800–1100)',
        subtitle: 'Beginner-Friendly Starting Division',
        description: 'Foundational problem solving, logic, math principles, and array manipulation.',
        ratingRange: '800–1100 Rating',
        patternsCount: 6,
        solvedCount: div4Solved,
        totalCount: div4Problems.length,
        percentage: div4Problems.length > 0 ? Math.round((div4Solved / div4Problems.length) * 100) : 0,
        isCompleted: div4Problems.length > 0 && div4Solved >= div4Problems.length,
        isCurrent: true,
        difficulty: 'Novice / Div 4',
        url: '/practice?platform=codeforces&division=div-4',
        isLocked: false,
      },
      {
        id: 'div-3',
        number: 2,
        name: 'Division 3 (1200–1400)',
        subtitle: 'Intermediate Competitive Division',
        description: 'Greedy algorithms, two pointers, prefix sums, sorting, and binary search.',
        ratingRange: '1200–1400 Rating',
        patternsCount: 8,
        solvedCount: div3Solved,
        totalCount: div3Problems.length,
        percentage: div3Problems.length > 0 ? Math.round((div3Solved / div3Problems.length) * 100) : 0,
        isCompleted: div3Problems.length > 0 && div3Solved >= div3Problems.length,
        isCurrent: false,
        difficulty: 'Intermediate / Div 3',
        url: '/practice?platform=codeforces&division=div-3',
        isLocked: false,
      },
      {
        id: 'div-2',
        number: 3,
        name: 'Division 2 (1500–1800)',
        subtitle: 'Advanced Problem Solving Division',
        description: 'Dynamic programming, graph algorithms, segment trees, and number theory.',
        ratingRange: '1500–1800 Rating',
        patternsCount: 10,
        solvedCount: div2Solved,
        totalCount: div2Problems.length,
        percentage: div2Problems.length > 0 ? Math.round((div2Solved / div2Problems.length) * 100) : 0,
        isCompleted: div2Problems.length > 0 && div2Solved >= div2Problems.length,
        isCurrent: false,
        difficulty: 'Master / Div 2',
        url: '/practice?platform=codeforces&division=div-2',
        isLocked: false,
      },
      {
        id: 'div-1',
        number: 4,
        name: 'Division 1 (1900+)',
        subtitle: 'Grandmaster / Elite Arena',
        description: 'Ultra-advanced competitive algorithmic challenges and contest final problems.',
        ratingRange: '1900+ Rating',
        patternsCount: 12,
        solvedCount: 0,
        totalCount: 0,
        percentage: 0,
        isCompleted: false,
        isCurrent: false,
        difficulty: 'Grandmaster',
        url: '#',
        isLocked: true,
      },
    ];
  }, [codeforcesProblems, canonicalSolvedSet, refreshKey]);

  const cfTotalSolved = codeforcesDivisions.reduce((s, d) => s + d.solvedCount, 0);
  const cfTotalProblems = codeforcesProblems.length;
  const cfPct = cfTotalProblems > 0 ? Math.round((cfTotalSolved / cfTotalProblems) * 100) : 0;

  // OVERALL METRICS
  const totalSolved = lcTotalSolved + ccTotalSolved + cfTotalSolved;
  const totalCanonical = allProblems.length;
  const overallPercentage = totalCanonical > 0 ? Math.round((totalSolved / totalCanonical) * 100) : 0;

  // Filtered lists for search
  const q = searchQuery.toLowerCase().trim();
  const filterSection = (s: any) =>
    !q ||
    s.title.toLowerCase().includes(q) ||
    s.description.toLowerCase().includes(q) ||
    (s.kingdomTitle && s.kingdomTitle.toLowerCase().includes(q));

  const filteredLc = leetcodeSections.filter(filterSection);
  const filteredCc = codechefSections.filter(filterSection);
  const filteredCf = codeforcesDivisions.filter(
    (d) => !q || d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '24px 32px 64px 32px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. TOP HEADER & OVERALL CURRICULUM PROGRESS ─────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '28px 32px',
          borderRadius: '24px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)'
            : 'linear-gradient(135deg, rgba(24, 16, 48, 0.95) 0%, rgba(12, 9, 28, 0.98) 60%, rgba(7, 5, 18, 1) 100%)',
          border: isLight
            ? '1.5px solid rgba(56, 189, 248, 0.35)'
            : '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
          boxShadow: isLight
            ? '0 12px 36px rgba(56, 189, 248, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            width: '100%',
          }}
        >
          {/* Header Title & Subtitle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.2)',
                  border: '1.5px solid var(--primary, #8B5CF6)',
                  boxShadow: '0 0 20px var(--accent-glow, rgba(139, 92, 246, 0.4))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BookOpen size={22} style={{ color: 'var(--primary, #8B5CF6)' }} />
              </div>
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.02em' }}>
                  LEARNING ROADMAP
                </h1>
                <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
                  Structured problem-solving curriculum across your coding platforms
                </span>
              </div>
            </div>
          </div>

          {/* Metric Tiles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <CheckCircle2 size={20} style={{ color: '#10B981' }} />
              <div>
                <strong style={{ fontSize: '16px', color: '#FFF', display: 'block', lineHeight: 1 }}>
                  {totalSolved} / {totalCanonical}
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Total Problems Solved</span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Zap size={20} style={{ color: 'var(--primary, #8B5CF6)' }} />
              <div>
                <strong style={{ fontSize: '16px', color: '#FFF', display: 'block', lineHeight: 1 }}>
                  {overallPercentage}%
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Curriculum Completion</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & View Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Search Input */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 320px',
              maxWidth: '500px',
            }}
          >
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search curriculum topics, patterns, or sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* View Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setViewMode('4col')}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: viewMode === '4col' ? 'var(--primary, #8B5CF6)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${viewMode === '4col' ? 'var(--primary, #8B5CF6)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <LayoutGrid size={14} /> 4-Column Grid
            </button>

            <button
              type="button"
              onClick={() => setViewMode('compact')}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: viewMode === 'compact' ? 'var(--primary, #8B5CF6)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${viewMode === 'compact' ? 'var(--primary, #8B5CF6)' : 'rgba(255, 255, 255, 0.1)'}`,
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Grid size={14} /> Compact Grid
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 2. LEETCODE — LEARNING EXPRESS ─────────────────────────── */}
      <PlatformCurriculumSection
        platformKey="leetcode"
        name="LEETCODE — LEARNING EXPRESS"
        tagline="25 Canonical Data Structure & Algorithm Stations"
        color="#10B981"
        solvedCount={lcTotalSolved}
        totalCount={lcTotalProblems}
        percentage={lcPct}
        sections={filteredLc}
        viewMode={viewMode}
      />

      {/* ── 3. CODECHEF — CODING EXPRESS ───────────────────────────── */}
      <PlatformCurriculumSection
        platformKey="codechef"
        name="CODECHEF — CODING EXPRESS"
        tagline="25 Competitive Practice & Rating Stations"
        color="#F97316"
        solvedCount={ccTotalSolved}
        totalCount={ccTotalProblems}
        percentage={ccPct}
        sections={filteredCc}
        viewMode={viewMode}
      />

      {/* ── 4. CODEFORCES — CONTEST EXPRESS ────────────────────────── */}
      <PlatformCurriculumSection
        platformKey="codeforces"
        name="CODEFORCES — CONTEST EXPRESS"
        tagline="Rating Tier Progression Across 4 Contest Divisions"
        color="#3B82F6"
        solvedCount={cfTotalSolved}
        totalCount={cfTotalProblems}
        percentage={cfPct}
        sections={filteredCf}
        viewMode={viewMode}
      />

      {/* ── 5. GEEKSFORGEEKS — PRACTICE EXPRESS (LOCKED) ───────────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '24px 28px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(100, 116, 139, 0.08) 0%, rgba(15, 23, 42, 0.96) 70%)',
          border: '1.5px solid rgba(100, 116, 139, 0.3)',
          opacity: 0.8,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: 'rgba(100, 116, 139, 0.15)',
                border: '1.5px solid #64748B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lock size={18} style={{ color: '#94A3B8' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#CBD5E1' }}>
                  GEEKSFORGEEKS — PRACTICE EXPRESS
                </h2>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    color: '#94A3B8',
                    background: 'rgba(255, 255, 255, 0.06)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  LOCKED
                </span>
              </div>
              <span style={{ fontSize: '12px', color: '#64748B' }}>
                Company-wise interview sheets & topic tracks
              </span>
            </div>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#94A3B8',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Lock size={12} /> Integration Coming Soon
          </span>
        </div>

        <div
          style={{
            padding: '24px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px dashed rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '12px', color: '#64748B' }}>
            GeeksForGeeks platform integration is currently in progress. Company archives and subject sheets will unlock here once live.
          </span>
        </div>
      </div>
    </div>
  );
}

// ── REUSABLE PLATFORM CURRICULUM SECTION WITH TRAIN + 4-COL GRID ───────
interface PlatformCurriculumSectionProps {
  platformKey: string;
  name: string;
  tagline: string;
  color: string;
  solvedCount: number;
  totalCount: number;
  percentage: number;
  sections: any[];
  viewMode: '4col' | 'compact';
}

function PlatformCurriculumSection({
  name,
  tagline,
  color,
  solvedCount,
  totalCount,
  percentage,
  sections,
  viewMode,
}: PlatformCurriculumSectionProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '24px',
        background: isLight
          ? `linear-gradient(135deg, #FFFFFF 0%, ${color}08 50%, #F8FAFC 100%)`
          : `radial-gradient(ellipse at 15% 15%, ${color}14 0%, var(--card) 75%)`,
        border: isLight ? `1.5px solid ${color}35` : `1.5px solid ${color}45`,
        boxShadow: isLight ? `0 10px 30px ${color}10, 0 2px 8px rgba(0,0,0,0.03)` : `0 14px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: color,
              boxShadow: `0 0 12px ${color}`,
            }}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em' }}>
              {name}
            </h2>
            <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600 }}>{tagline}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '12px',
              background: `${color}18`,
              border: `1px solid ${color}40`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div>
              <span style={{ fontSize: '10px', color: '#CBD5E1', fontWeight: 700, textTransform: 'uppercase' }}>
                Progress
              </span>
              <strong style={{ fontSize: '14px', color: '#FFF', display: 'block' }}>
                <span style={{ color }}>{solvedCount}</span> / {totalCount} Solved
              </strong>
            </div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 900,
                color,
                background: 'rgba(0,0,0,0.3)',
                padding: '4px 8px',
                borderRadius: '8px',
              }}
            >
              {percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* ── RAILWAY JOURNEY STRIP ────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          padding: '12px 6px 20px 6px',
        }}
      >
        {/* Steel Rail Line */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '12px',
            right: '12px',
            height: '3px',
            background: `linear-gradient(90deg, #64748B 0%, #CBD5E1 30%, ${color} 50%, #CBD5E1 70%, #64748B 100%)`,
            boxShadow: `0 0 6px ${color}66`,
            zIndex: 1,
          }}
        />

        {/* Station Sequence */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
            zIndex: 2,
            minWidth: '100%',
          }}
        >
          {sections.map((sec) => {
            const isLocked = sec.isLocked;
            const isCompleted = sec.isCompleted;
            const isCurrent = sec.isCurrent;

            return (
              <Link
                key={sec.id}
                href={isLocked ? '#' : sec.url}
                style={{ textDecoration: 'none', flexShrink: 0 }}
                title={`${sec.title} (${sec.solvedCount}/${sec.totalCount} Solved)`}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                  }}
                >
                  {/* Current Train Icon indicator */}
                  {isCurrent && (
                    <span style={{ fontSize: '12px', filter: `drop-shadow(0 0 6px ${color})` }}>
                      🚂
                    </span>
                  )}
                  {!isCurrent && <div style={{ height: '16px' }} />}

                  {/* Station Node Badge */}
                  <div
                    style={{
                      width: isCurrent ? '42px' : '36px',
                      height: isCurrent ? '42px' : '36px',
                      borderRadius: '10px',
                      background: isCompleted
                        ? color
                        : isCurrent
                        ? `${color}33`
                        : isLocked
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.06)',
                      border: isCompleted
                        ? `2px solid ${color}`
                        : isCurrent
                        ? `2px solid ${color}`
                        : '1px solid rgba(255, 255, 255, 0.12)',
                      boxShadow: isCompleted
                        ? `0 0 12px ${color}88`
                        : isCurrent
                        ? `0 0 16px ${color}88`
                        : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isCompleted ? '#000' : isCurrent ? '#FFF' : isLocked ? '#64748B' : '#94A3B8',
                      fontSize: '11px',
                      fontWeight: 900,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={16} strokeWidth={3} />
                    ) : isLocked ? (
                      <Lock size={12} />
                    ) : (
                      sec.number < 10 ? `0${sec.number}` : sec.number
                    )}
                  </div>

                  {/* Station Mini-Title */}
                  <span
                    style={{
                      fontSize: '9px',
                      color: isCurrent ? '#FFF' : '#64748B',
                      fontWeight: isCurrent ? 800 : 600,
                      maxWidth: '48px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                    }}
                  >
                    {sec.title}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── 4-COLUMN RESPONSIVE CURRICULUM GRID ───────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            viewMode === 'compact'
              ? 'repeat(auto-fill, minmax(240px, 1fr))'
              : 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '20px',
        }}
      >
        {sections.map((sec) => (
          <CurriculumRoadmapCard
            key={sec.id}
            section={sec}
            accentColor={color}
            isCompact={viewMode === 'compact'}
          />
        ))}
      </div>
    </div>
  );
}

// ── REUSABLE CLEAN CURRICULUM ROADMAP CARD ─────────────────────────────
interface CurriculumRoadmapCardProps {
  section: {
    id: number | string;
    number: number;
    title: string;
    description: string;
    patternsCount: number;
    solvedCount: number;
    totalCount: number;
    percentage: number;
    isCompleted: boolean;
    isCurrent: boolean;
    difficulty: string;
    url: string;
    isLocked?: boolean;
  };
  accentColor: string;
  isCompact: boolean;
}

function CurriculumRoadmapCard({ section, accentColor, isCompact }: CurriculumRoadmapCardProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const isLocked = section.isLocked;
  const isCompleted = section.isCompleted;
  const isCurrent = section.isCurrent;

  return (
    <motion.div
      whileHover={isLocked ? {} : { y: -4, scale: 1.015 }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '18px',
        background: isLocked
          ? isLight
            ? '#F8FAFC'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(15, 23, 42, 0.95) 75%)'
          : isLight
          ? `linear-gradient(135deg, #FFFFFF 0%, ${accentColor}08 50%, #F8FAFC 100%)`
          : `linear-gradient(135deg, ${accentColor}12 0%, rgba(15, 23, 42, 0.96) 60%, rgba(7, 5, 18, 1) 100%)`,
        border: isCompleted
          ? `1.5px solid ${accentColor}`
          : isCurrent
          ? `2px solid ${accentColor}`
          : isLight
          ? '1.5px solid #E2E8F0'
          : '1px solid var(--panel-border, rgba(255, 255, 255, 0.1))',
        boxShadow: isCompleted
          ? `0 8px 24px ${accentColor}25`
          : isCurrent
          ? `0 8px 30px ${accentColor}40`
          : isLight
          ? '0 6px 20px rgba(0, 0, 0, 0.04)'
          : '0 6px 20px rgba(0, 0, 0, 0.45)',
        padding: isCompact ? '16px 18px' : '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: isCompact ? '200px' : '250px',
        boxSizing: 'border-box',
        opacity: isLocked ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Card Header & Badge */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isLocked ? '#94A3B8' : accentColor,
              background: isLocked ? 'rgba(255, 255, 255, 0.04)' : `${accentColor}18`,
              padding: '3px 8px',
              borderRadius: '6px',
              border: isLocked ? '1px solid rgba(255, 255, 255, 0.08)' : `1px solid ${accentColor}33`,
              letterSpacing: '0.04em',
            }}
          >
            STATION {section.number < 10 ? `0${section.number}` : section.number}
          </span>

          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isCompleted ? '#10B981' : isCurrent ? '#FFF' : isLocked ? '#94A3B8' : '#94A3B8',
              background: isCompleted
                ? 'rgba(16, 185, 129, 0.15)'
                : isCurrent
                ? accentColor
                : 'rgba(255, 255, 255, 0.05)',
              padding: '3px 8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={11} /> COMPLETED
              </>
            ) : isCurrent ? (
              <>
                <Zap size={10} /> CURRENT
              </>
            ) : isLocked ? (
              <>
                <Lock size={10} /> COMING SOON
              </>
            ) : (
              `${section.percentage}%`
            )}
          </span>
        </div>

        {/* Title & Description */}
        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: isCompact ? '15px' : '17px',
            fontWeight: 900,
            color: '#FFF',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {section.title}
        </h3>

        {!isCompact && (
          <p
            style={{
              margin: 0,
              fontSize: '12px',
              color: '#94A3B8',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {section.description}
          </p>
        )}
      </div>

      {/* Progress Bar & Actions */}
      <div>
        {!isLocked && (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: 800,
                marginBottom: '5px',
              }}
            >
              <span style={{ color: '#CBD5E1' }}>
                <strong style={{ color: accentColor }}>{section.solvedCount}</strong> / {section.totalCount} Solved
              </span>
              <span style={{ color: '#94A3B8', fontSize: '10px' }}>
                {section.patternsCount} Patterns
              </span>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: '100%',
                height: '5px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(section.percentage > 0 ? 4 : 0, section.percentage)}%`,
                  background: accentColor,
                  borderRadius: '3px',
                  boxShadow: section.percentage > 0 ? `0 0 8px ${accentColor}` : 'none',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </>
        )}

        {isLocked && (
          <div style={{ height: '22px', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>
              Advanced division locked · Coming soon
            </span>
          </div>
        )}

        {/* Footer Action Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: '#94A3B8',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {section.difficulty}
          </span>

          {!isLocked ? (
            <Link href={section.url} style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                style={{
                  padding: '5px 12px',
                  borderRadius: '8px',
                  background: `${accentColor}25`,
                  border: `1px solid ${accentColor}66`,
                  color: '#FFF',
                  fontSize: '11px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Continue <ArrowRight size={12} />
              </motion.button>
            </Link>
          ) : (
            <button
              disabled
              type="button"
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#64748B',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Lock size={11} /> Locked
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
