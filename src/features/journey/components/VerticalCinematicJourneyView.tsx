'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  Shield,
  Zap,
  ArrowUpRight,
  Radio,
  Layers,
  Code2,
  ExternalLink,
} from 'lucide-react';

import { CurriculumRepository } from '@/src/curriculum/repository';
import { progressService, ProgressService } from '@/src/services/progress/progress.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { useSettings } from '@/src/context/SettingsContext';

export function VerticalCinematicJourneyView() {
  const { userId } = useActiveUser();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to real-time progress events for dynamic live updates
  useEffect(() => {
    const handleUpdate = () => {
      setRefreshKey((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleUpdate);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleUpdate);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', handleUpdate);

    return () => {
      unsubSolve();
      unsubMemory();
      unsubPlatform();
    };
  }, []);

  // Compute canonical curriculum & progress state
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

  // 1. LEETCODE CURRICULUM (25 Learning Areas)
  const leetcodeProblems = useMemo(() => {
    return allProblems.filter(
      (p) => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org')
    );
  }, [allProblems]);

  const leetcodeAreas = useMemo(() => {
    return allCategories.map((cat, idx) => {
      const catProblems = leetcodeProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solvedCount = catProblems.filter((p) => isProblemSolved(p)).length;
      const totalCount = catProblems.length;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const subtopicsCount = CurriculumRepository.getSubtopicsByCategory(cat.slug).length;

      return {
        id: idx + 1,
        slug: cat.slug,
        /** DSA concept name (e.g. "Array") — no fantasy names */
        title: cat.title,
        topic: cat.title,
        description: cat.description,
        subtopicsCount,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: cat.totalXp || 500 + idx * 50,
        difficulty: idx < 6 ? 'Novice' : idx < 14 ? 'Apprentice' : idx < 21 ? 'Adept' : 'Master',
        url: `/practice?area=${cat.slug}`,
      };
    });
  }, [allCategories, leetcodeProblems, canonicalSolvedSet, refreshKey]);

  // Keep legacy alias for internal use only
  const leetcodeKingdoms = leetcodeAreas;

  const lcTotalSolved = leetcodeKingdoms.reduce((sum, k) => sum + k.solvedCount, 0);
  const lcTotalProblems = leetcodeProblems.length;
  const lcPct = lcTotalProblems > 0 ? Math.round((lcTotalSolved / lcTotalProblems) * 100) : 0;

  // 2. CODECHEF CURRICULUM (25 Learning Areas)
  const codechefProblems = useMemo(() => {
    return allProblems.filter((p) => p.url?.includes('codechef.com'));
  }, [allProblems]);

  const codechefAreas = useMemo(() => {
    return allCategories.map((cat, idx) => {
      const catProblems = codechefProblems.filter(
        (p) =>
          p.categorySlug === cat.slug ||
          p.categoryId === cat.id ||
          p.categoryTitle === cat.title
      );
      const solvedCount = catProblems.filter((p) => isProblemSolved(p)).length;
      const totalCount = catProblems.length;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const subtopicsCount = CurriculumRepository.getSubtopicsByCategory(cat.slug).length;

      return {
        id: idx + 1,
        slug: cat.slug,
        /** DSA concept name (e.g. "Prefix Sum") — no fantasy names */
        title: cat.title,
        topic: cat.title,
        description: cat.description,
        subtopicsCount,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: 600 + idx * 40,
        difficulty: idx < 6 ? 'Novice' : idx < 14 ? 'Apprentice' : idx < 21 ? 'Adept' : 'Master',
        url: `/practice?platform=codechef&area=${cat.slug}`,
      };
    });
  }, [allCategories, codechefProblems, canonicalSolvedSet, refreshKey]);

  // Keep legacy name for internal use only
  const codechefKingdoms = codechefAreas;

  const ccTotalSolved = codechefKingdoms.reduce((sum, k) => sum + k.solvedCount, 0);
  const ccTotalProblems = codechefProblems.length;
  const ccPct = ccTotalProblems > 0 ? Math.round((ccTotalSolved / ccTotalProblems) * 100) : 0;

  // 3. CODEFORCES CURRICULUM (Divisions 4 -> 3 -> 2 -> 1 Locked)
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
        name: 'Division 4 (800–1100)',
        subtitle: 'Beginner-Friendly Starting Division',
        description: 'Foundational problem solving, basic logic, math principles, and array manipulation.',
        ratingRange: '800–1100 Rating',
        solvedCount: div4Solved,
        totalCount: div4Problems.length,
        progressPct: div4Problems.length > 0 ? Math.round((div4Solved / div4Problems.length) * 100) : 0,
        status: 'active' as const,
        xpReward: 800,
        difficulty: 'Novice / Div 4',
        url: '/practice?platform=codeforces&division=div-4',
        isLocked: false,
      },
      {
        id: 'div-3',
        name: 'Division 3 (1200–1400)',
        subtitle: 'Intermediate Competitive Division',
        description: 'Greedy choices, two pointers, prefix calculations, sorting, and binary search.',
        ratingRange: '1200–1400 Rating',
        solvedCount: div3Solved,
        totalCount: div3Problems.length,
        progressPct: div3Problems.length > 0 ? Math.round((div3Solved / div3Problems.length) * 100) : 0,
        status: 'available' as const,
        xpReward: 1400,
        difficulty: 'Apprentice / Div 3',
        url: '/practice?platform=codeforces&division=div-3',
        isLocked: false,
      },
      {
        id: 'div-2',
        name: 'Division 2 (1500–1800)',
        subtitle: 'Advanced Problem Solving Division',
        description: 'Dynamic programming, graph algorithms, segment trees, and deep mathematical theorems.',
        ratingRange: '1500–1800 Rating',
        solvedCount: div2Solved,
        totalCount: div2Problems.length,
        progressPct: div2Problems.length > 0 ? Math.round((div2Solved / div2Problems.length) * 100) : 0,
        status: 'available' as const,
        xpReward: 2200,
        difficulty: 'Master / Div 2',
        url: '/practice?platform=codeforces&division=div-2',
        isLocked: false,
      },
      {
        id: 'div-1',
        name: 'Division 1 (1900+)',
        subtitle: 'Grandmaster / Elite Arena',
        description: 'Ultra-advanced competitive algorithmic challenges and contest final problems.',
        ratingRange: '1900+ Rating',
        solvedCount: 0,
        totalCount: 0,
        progressPct: 0,
        status: 'locked' as const,
        xpReward: 4000,
        difficulty: 'Grandmaster',
        url: '#',
        isLocked: true,
      },
    ];
  }, [codeforcesProblems, canonicalSolvedSet, refreshKey]);

  const cfTotalSolved = codeforcesDivisions.reduce((sum, d) => sum + d.solvedCount, 0);
  const cfTotalProblems = codeforcesProblems.length;
  const cfPct = cfTotalProblems > 0 ? Math.round((cfTotalSolved / cfTotalProblems) * 100) : 0;

  // Overall metrics
  const totalSolved = lcTotalSolved + ccTotalSolved + cfTotalSolved;
  const totalAvailableProblems = allProblems.length;
  const overallProgressPct =
    totalAvailableProblems > 0 ? Math.round((totalSolved / totalAvailableProblems) * 100) : 0;

  return (
    <div
      style={{
        background: 'var(--background)',
        minHeight: '100vh',
        color: 'var(--text-primary)',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. TOP STICKY CAMPAIGN CONTINENT HEADER ─────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(7, 5, 18, 0.92)',
          borderBottom: '1px solid var(--border)',
          padding: '16px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                padding: '10px',
                borderRadius: '14px',
                background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(139, 92, 246, 0.15)',
                border: isLight ? '1.5px solid #0284C7' : '1.5px solid var(--primary, #8B5CF6)',
                boxShadow: isLight ? '0 2px 8px rgba(2, 132, 199, 0.2)' : '0 0 20px var(--accent-glow, rgba(139, 92, 246, 0.4))',
              }}
            >
              <Compass size={22} style={{ color: isLight ? '#0284C7' : 'var(--primary, #8B5CF6)' }} />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: '18px',
                  fontWeight: 900,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                DSA CURRICULUM &amp; PLATFORMS
              </h1>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                Four Dedicated Platform Curriculums • 2,344 Total Canonical Problems
              </span>
            </div>
          </div>

          {/* Quick Platform Anchor Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <a
              href="#section-leetcode"
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.35)',
                color: '#10B981',
                fontSize: '11px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
              LeetCode
            </a>

            <a
              href="#section-codechef"
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(249, 115, 22, 0.12)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
                color: '#F97316',
                fontSize: '11px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F97316' }} />
              CodeChef
            </a>

            <a
              href="#section-codeforces"
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.35)',
                color: '#3B82F6',
                fontSize: '11px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3B82F6' }} />
              Codeforces
            </a>

            <a
              href="#section-geeksforgeeks"
              style={{
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(100, 116, 139, 0.12)',
                border: '1px solid rgba(100, 116, 139, 0.3)',
                color: '#94A3B8',
                fontSize: '11px',
                fontWeight: 900,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Lock size={11} /> GFG (Locked)
            </a>
          </div>

          {/* Quick HUD Metrics */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', fontWeight: 800 }}>
            <span>
              Solved: <strong style={{ color: '#10B981' }}>{totalSolved}</strong> / {totalAvailableProblems}
            </span>
            <span>
              Total XP: <strong style={{ color: '#F59E0B' }}>{state.xp || 0} XP</strong>
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. FOUR DISTINCT PLATFORM CURRICULUM SECTIONS ───────────── */}
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '36px 32px 64px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
        }}
      >
        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 1. LEETCODE — LEARNING EXPRESS                                 */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="section-leetcode" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Platform Header Container */}
          <div
            style={{
              padding: '20px 28px',
              borderRadius: '20px',
              background: isLight
                ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(16, 185, 129, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(16, 185, 129, 0.14) 0%, rgba(15, 23, 42, 0.95) 70%)',
              border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(16, 185, 129, 0.4)',
              boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  border: '2px solid #10B981',
                  boxShadow: '0 0 16px rgba(16, 185, 129, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={22} style={{ color: '#10B981' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                    LEETCODE — LEARNING EXPRESS
                  </h2>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#10B981',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                    }}
                  >
                    25 LEARNING AREAS
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Master core data structures and algorithmic patterns across 713 curated LeetCode problems.
                </p>
              </div>
            </div>

            {/* Platform Progress Chip */}
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: isLight ? '#FFFFFF' : 'rgba(7, 5, 18, 0.8)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(16, 185, 129, 0.35)',
                boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  LeetCode Progress
                </span>
                <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>
                  <span style={{ color: '#10B981' }}>{lcTotalSolved}</span> / {lcTotalProblems} Solved
                </strong>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#10B981',
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '10px',
                }}
              >
                {lcPct}%
              </div>
            </div>
          </div>

          {/* LeetCode 25 Learning Areas Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {leetcodeKingdoms.map((k) => (
              <CurriculumCard
                key={k.slug}
                id={k.id}
                slug={k.slug}
                title={k.title}
                topic={k.topic}
                description={k.description}
                subtopicsCount={k.subtopicsCount}
                solvedCount={k.solvedCount}
                totalCount={k.totalCount}
                progressPct={k.progressPct}
                isCompleted={k.isCompleted}
                difficulty={k.difficulty}
                xpReward={k.xpReward}
                accentColor="#10B981"
                actionUrl={k.url}
                actionText="Practice Area ›"
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 2. CODECHEF — CODING EXPRESS                                   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="section-codechef" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Platform Header Container */}
          <div
            style={{
              padding: '20px 28px',
              borderRadius: '20px',
              background: isLight
                ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(249, 115, 22, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(249, 115, 22, 0.14) 0%, rgba(15, 23, 42, 0.95) 70%)',
              border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(249, 115, 22, 0.4)',
              boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(249, 115, 22, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(249, 115, 22, 0.2)',
                  border: '2px solid #F97316',
                  boxShadow: '0 0 16px rgba(249, 115, 22, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Flame size={22} style={{ color: '#F97316' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                    CODECHEF — CODING EXPRESS
                  </h2>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#F97316',
                      background: 'rgba(249, 115, 22, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(249, 115, 22, 0.3)',
                    }}
                  >
                    25 LEARNING AREAS
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Practical implementation, star ratings, and competitive problem solving across 839 CodeChef challenges.
                </p>
              </div>
            </div>

            {/* Platform Progress Chip */}
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: isLight ? '#FFFFFF' : 'rgba(7, 5, 18, 0.8)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(249, 115, 22, 0.35)',
                boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  CodeChef Progress
                </span>
                <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>
                  <span style={{ color: '#F97316' }}>{ccTotalSolved}</span> / {ccTotalProblems} Solved
                </strong>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#F97316',
                  background: 'rgba(249, 115, 22, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '10px',
                }}
              >
                {ccPct}%
              </div>
            </div>
          </div>

          {/* CodeChef 25 Learning Areas Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px',
            }}
          >
            {codechefKingdoms.map((k) => (
              <CurriculumCard
                key={`cc-${k.slug}`}
                id={k.id}
                slug={k.slug}
                title={k.title}
                topic={k.topic}
                description={k.description}
                subtopicsCount={k.subtopicsCount}
                solvedCount={k.solvedCount}
                totalCount={k.totalCount}
                progressPct={k.progressPct}
                isCompleted={k.isCompleted}
                difficulty={k.difficulty}
                xpReward={k.xpReward}
                accentColor="#F97316"
                actionUrl={k.url}
                actionText="Practice Area ›"
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 3. CODEFORCES — CONTEST EXPRESS (Divisions 4 -> 3 -> 2 -> 1)   */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="section-codeforces" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Platform Header Container */}
          <div
            style={{
              padding: '20px 28px',
              borderRadius: '20px',
              background: isLight
                ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(59, 130, 246, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(59, 130, 246, 0.14) 0%, rgba(15, 23, 42, 0.95) 70%)',
              border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(59, 130, 246, 0.4)',
              boxShadow: isLight ? '0 4px 20px rgba(0, 0, 0, 0.04)' : '0 10px 30px rgba(59, 130, 246, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(59, 130, 246, 0.2)',
                  border: '2px solid #3B82F6',
                  boxShadow: '0 0 16px rgba(59, 130, 246, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Code2 size={22} style={{ color: '#3B82F6' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                    CODEFORCES — CONTEST EXPRESS
                  </h2>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: '#3B82F6',
                      background: 'rgba(59, 130, 246, 0.15)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    4 DIVISIONS
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Competitive rating milestones from Div 4 (800) all the way to Div 1 Grandmaster problems across 792 challenges.
                </p>
              </div>
            </div>

            {/* Platform Progress Chip */}
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: isLight ? '#FFFFFF' : 'rgba(7, 5, 18, 0.8)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(59, 130, 246, 0.35)',
                boxShadow: isLight ? '0 2px 8px rgba(0, 0, 0, 0.04)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Codeforces Progress
                </span>
                <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>
                  <span style={{ color: '#3B82F6' }}>{cfTotalSolved}</span> / {cfTotalProblems} Solved
                </strong>
              </div>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#3B82F6',
                  background: 'rgba(59, 130, 246, 0.15)',
                  padding: '6px 12px',
                  borderRadius: '10px',
                }}
              >
                {cfPct}%
              </div>
            </div>
          </div>

          {/* Codeforces Divisions Grid (Div 4 -> Div 3 -> Div 2 -> Div 1 Locked) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            {codeforcesDivisions.map((div) => (
              <DivisionCard key={div.id} division={div} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* 4. GEEKSFORGEEKS — LEARNING HUB (LOCKED)                       */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <section id="section-geeksforgeeks" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Platform Header Container */}
          <div
            style={{
              padding: '20px 28px',
              borderRadius: '20px',
              background: isLight
                ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(100, 116, 139, 0.08) 100%)'
                : 'linear-gradient(135deg, rgba(100, 116, 139, 0.1) 0%, rgba(15, 23, 42, 0.95) 70%)',
              border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(100, 116, 139, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              opacity: 0.88,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(100, 116, 139, 0.15)',
                  border: '2px solid #64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Lock size={20} style={{ color: '#94A3B8' }} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}>
                    GEEKSFORGEEKS — LEARNING HUB
                  </h2>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      color: 'var(--text-muted)',
                      background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    LOCKED
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>
                  Company interview archives and subject-wise DSA tracks.
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                color: 'var(--text-muted)',
                fontWeight: 800,
              }}
            >
              <Lock size={14} /> Integration Coming Soon
            </div>
          </div>

          {/* Polished Locked Platform Card */}
          <div
            style={{
              padding: '32px',
              borderRadius: '20px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: isLight ? '1.5px dashed #CBD5E1' : '1.5px dashed rgba(255, 255, 255, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lock size={20} style={{ color: 'var(--text-muted)' }} />
            </div>
            <div>
              <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block' }}>
                GeeksForGeeks Curriculum Hub
              </strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B', maxWidth: '440px' }}>
                This platform curriculum is currently in development. Once connected, company-specific tracks and interview sheets will appear here.
              </p>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#94A3B8',
                background: 'rgba(255, 255, 255, 0.05)',
                padding: '4px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                letterSpacing: '0.04em',
              }}
            >
              COMING SOON
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── REUSABLE CURRICULUM CARD COMPONENT (LEETCODE / CODECHEF) ───────────
interface CurriculumCardProps {
  id: number;
  slug?: string;
  title: string;
  topic: string;
  description: string;
  subtopicsCount: number;
  solvedCount: number;
  totalCount: number;
  progressPct: number;
  isCompleted: boolean;
  difficulty: string;
  xpReward: number;
  accentColor: string;
  actionUrl: string;
  actionText: string;
}

function CurriculumCard({
  id,
  slug,
  title,
  topic,
  description,
  subtopicsCount,
  solvedCount,
  totalCount,
  progressPct,
  isCompleted,
  difficulty,
  xpReward,
  accentColor,
  actionUrl,
  actionText,
}: CurriculumCardProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '20px',
        background: isLight
          ? `linear-gradient(135deg, #FFFFFF 0%, ${accentColor}08 50%, #F8FAFC 100%)`
          : `linear-gradient(135deg, ${accentColor}10 0%, rgba(15, 23, 42, 0.96) 60%, rgba(7, 5, 18, 1) 100%)`,
        border: isCompleted
          ? `1.5px solid ${accentColor}`
          : isLight
          ? `1.5px solid #E2E8F0`
          : `1px solid var(--panel-border, rgba(255, 255, 255, 0.1))`,
        boxShadow: isCompleted
          ? `0 8px 30px ${accentColor}25, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : isLight
          ? `0 8px 24px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)`
          : `0 8px 24px rgba(0, 0, 0, 0.5)`,
        padding: '20px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '290px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Tag & Status Row */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: accentColor,
              background: `${accentColor}18`,
              padding: '3px 8px',
              borderRadius: '6px',
              border: `1px solid ${accentColor}33`,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            AREA #{id} • {topic}
          </span>

          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isCompleted ? '#10B981' : progressPct > 0 ? accentColor : 'var(--text-muted, #94A3B8)',
              background: isCompleted ? 'rgba(16, 185, 129, 0.15)' : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
              padding: '3px 8px',
              borderRadius: '6px',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isCompleted && <CheckCircle2 size={11} />}
            {isCompleted ? 'Mastered' : progressPct > 0 ? `In Progress (${progressPct}%)` : 'Not Started'}
          </span>
        </div>

        {/* Learning Area Title & Description */}
        <h3
          style={{
            margin: '0 0 6px 0',
            fontSize: '17px',
            fontWeight: 900,
            color: 'var(--text-primary, #FFF)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {slug ? (
            <Link
              href={`/journey/${slug}`}
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
              className="hover:underline"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        <p
          style={{
            margin: '0 0 10px 0',
            fontSize: '12px',
            color: 'var(--text-secondary, #94A3B8)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {/* 4-Tier Subtopics & Problems Metadata Strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
              padding: '3px 7px',
              borderRadius: '6px',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Layers size={11} style={{ color: accentColor }} />
            {subtopicsCount} Subtopics
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-primary)',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
              padding: '3px 7px',
              borderRadius: '6px',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Code2 size={11} style={{ color: accentColor }} />
            {totalCount} Problems
          </span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: progressPct > 0 ? accentColor : 'var(--text-muted)',
              background: progressPct > 0 ? `${accentColor}12` : 'transparent',
              padding: '3px 6px',
              borderRadius: '6px',
            }}
          >
            {progressPct}% Mastery
          </span>
        </div>
      </div>

      {/* Progress & Solved Ratio */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11px',
            fontWeight: 800,
            marginBottom: '6px',
          }}
        >
          <span style={{ color: 'var(--text-secondary, #CBD5E1)' }}>
            Solved: <strong style={{ color: accentColor }}>{solvedCount}</strong> / {totalCount}
          </span>
          <span style={{ color: '#F59E0B', fontSize: '10px' }}>+{xpReward} XP</span>
        </div>

        {/* Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${Math.max(progressPct > 0 ? 4 : 0, progressPct)}%`,
              background: accentColor,
              borderRadius: '3px',
              boxShadow: progressPct > 0 ? `0 0 8px ${accentColor}` : 'none',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Bottom Actions: Explore Area (Primary) + Practice */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          {slug ? (
            <Link href={`/journey/${slug}`} style={{ textDecoration: 'none', flex: 1 }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: '8px',
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                  border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span>Explore Area</span>
                <ChevronRight size={12} />
              </motion.button>
            </Link>
          ) : (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: 'var(--text-muted, #94A3B8)',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {difficulty}
            </span>
          )}

          <Link href={actionUrl} style={{ textDecoration: 'none', flex: 1 }}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              style={{
                width: '100%',
                padding: '7px 10px',
                borderRadius: '8px',
                background: `${accentColor}25`,
                border: `1px solid ${accentColor}66`,
                color: isLight ? accentColor : '#FFF',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
              }}
            >
              <span>Practice Arena</span>
              <ArrowUpRight size={12} />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── REUSABLE DIVISION CARD COMPONENT (CODEFORCES) ──────────────────────
interface DivisionCardProps {
  division: {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    ratingRange: string;
    solvedCount: number;
    totalCount: number;
    progressPct: number;
    status: 'active' | 'available' | 'locked';
    xpReward: number;
    difficulty: string;
    url: string;
    isLocked: boolean;
  };
}

function DivisionCard({ division }: DivisionCardProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const isLocked = division.isLocked;

  return (
    <motion.div
      whileHover={isLocked ? {} : { y: -4, scale: 1.015 }}
      transition={{ duration: 0.2 }}
      style={{
        borderRadius: '20px',
        background: isLocked
          ? isLight
            ? '#F8FAFC'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(15, 23, 42, 0.95) 80%)'
          : isLight
          ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(59, 130, 246, 0.08) 50%, #F8FAFC 100%)'
          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(15, 23, 42, 0.96) 60%, rgba(7, 5, 18, 1) 100%)',
        border: isLocked
          ? isLight
            ? '1px dashed #CBD5E1'
            : '1px solid rgba(255, 255, 255, 0.08)'
          : division.id === 'div-4'
          ? '1.5px solid #3B82F6'
          : isLight
          ? '1.5px solid #E2E8F0'
          : '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: isLocked
          ? 'none'
          : isLight
          ? '0 8px 24px rgba(59, 130, 246, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)'
          : '0 8px 30px rgba(59, 130, 246, 0.18)',
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '280px',
        boxSizing: 'border-box',
        opacity: isLocked ? 0.6 : 1,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top Header & Badge */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isLocked ? '#94A3B8' : '#3B82F6',
              background: isLocked ? 'rgba(255, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.15)',
              padding: '3px 8px',
              borderRadius: '6px',
              border: isLocked ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(59, 130, 246, 0.3)',
              letterSpacing: '0.04em',
            }}
          >
            {division.ratingRange}
          </span>

          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isLocked ? '#94A3B8' : division.id === 'div-4' ? '#10B981' : '#38BDF8',
              background: isLocked ? 'rgba(255, 255, 255, 0.04)' : 'rgba(59, 130, 246, 0.15)',
              padding: '3px 8px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            {isLocked ? (
              <>
                <Lock size={10} /> COMING SOON
              </>
            ) : division.id === 'div-4' ? (
              <>
                <Zap size={10} /> ACTIVE / START
              </>
            ) : (
              'AVAILABLE'
            )}
          </span>
        </div>

        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {division.name}
        </h3>
        <span style={{ fontSize: '11px', color: isLocked ? 'var(--text-muted)' : '#0284C7', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
          {division.subtitle}
        </span>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {division.description}
        </p>
      </div>

      {/* Progress & Bottom Actions */}
      <div>
        {!isLocked ? (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontWeight: 800,
                marginBottom: '6px',
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>
                Solved: <strong style={{ color: '#0284C7' }}>{division.solvedCount}</strong> / {division.totalCount}
              </span>
              <span style={{ color: '#0284C7', fontSize: '10px' }}>{division.progressPct}%</span>
            </div>

            {/* Progress bar */}
            <div
              style={{
                width: '100%',
                height: '6px',
                borderRadius: '3px',
                background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden',
                marginBottom: '14px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${Math.max(division.progressPct > 0 ? 4 : 0, division.progressPct)}%`,
                  background: '#0284C7',
                  borderRadius: '3px',
                  boxShadow: division.progressPct > 0 ? '0 0 8px #0284C7' : 'none',
                }}
              />
            </div>
          </>
        ) : (
          <div style={{ height: '24px', marginBottom: '14px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Advanced rating tier locked · Not available in current stage
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: 'var(--text-muted)',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {division.difficulty}
          </span>

          {!isLocked ? (
            <Link href={division.url} style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                style={{
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.15)',
                  border: '1px solid rgba(2, 132, 199, 0.4)',
                  color: isLight ? '#0284C7' : '#FFF',
                  fontSize: '11px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Practice Division &gt;
              </motion.button>
            </Link>
          ) : (
            <button
              disabled
              type="button"
              style={{
                padding: '6px 14px',
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
