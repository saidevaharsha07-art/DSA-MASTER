'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Swords,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ExternalLink,
  Zap,
  ChevronDown,
  ChevronRight as ChevronRightIcon,
  Shield,
  Trophy,
  Check,
  Tag,
  XCircle,
  Layers,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel, FilterOptions, ProgressionLevel, FrequencyLevel } from '@/src/curriculum/types';
import { useRoadmap } from '@/hooks/use-roadmap';

// ── Platform definitions ────────────────────────────────────────────
const PLATFORMS = [
  { id: 'leetcode',      label: 'LeetCode',      badgeColor: 'rgba(245,158,11,0.15)', borderColor: '#F59E0B', textColor: '#F59E0B' },
  { id: 'codechef',     label: 'CodeChef',      badgeColor: 'rgba(139,92,246,0.15)', borderColor: '#8B5CF6', textColor: '#C084FC' },
  { id: 'codeforces',   label: 'Codeforces',    badgeColor: 'rgba(239,68,68,0.15)', borderColor: '#EF4444', textColor: '#F87171' },
  { id: 'geeksforgeeks',label: 'GeeksForGeeks', badgeColor: 'rgba(16,185,129,0.15)', borderColor: '#10B981', textColor: '#34D399' },
] as const;
type PlatformId = typeof PLATFORMS[number]['id'];

// ── Level mapping ──────────────────────────────────────────────────
const LEVEL_MAP: Record<string, ProgressionLevel> = {
  Beginner: 'Learn',
  Intermediate: 'Practice',
  Advanced: 'Master',
};

// ── Module-level stable data ────────────────────────────────────────
const ALL_PROBLEMS   = CurriculumRepository.getAllProblems();
const ALL_CATEGORIES = CurriculumRepository.getAllCategories();
const ALL_PATTERNS   = CurriculumRepository.getAllPatterns();

// Calculate top N common topics for a set of problems
function getCommonTopics(problems: ProblemModel[], limit = 4): string[] {
  const counts = new Map<string, number>();
  problems.forEach((p) => {
    p.topics.forEach((t) => {
      counts.set(t, (counts.get(t) || 0) + 1);
    });
  });
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([topic]) => topic);
}

// Helper to get Problem # for each platform
function getProblemNumber(problem: ProblemModel): string {
  if (problem.url.includes('codeforces.com')) {
    return problem.id.replace(/^cf-/, '').toUpperCase();
  }
  if (problem.leetcodeNumber && problem.leetcodeNumber < 90000) {
    return `#${problem.leetcodeNumber}`;
  }
  return 'N/A';
}

// Grid template for exact 9 columns:
// 1. Status (48px)  2. Category (160px)  3. Subtopic (180px)  4. Problem # (90px)  5. Problem Name (280px)
// 6. Topics (240px)  7. Est Time (100px)  8. XP (80px)  9. Open Link (90px)
const GRID_TEMPLATE = '48px 160px 180px 90px 280px 240px 100px 80px 90px';

// ════════════════════════════════════════════════════════════════════
export function PracticeArenaView() {
  const { state: roadmapState, toggle } = useRoadmap();

  // Set of solved LeetCode numbers for fast O(1) lookup
  const solvedLcNumbers = useMemo(() => {
    const nums: number[] = roadmapState?.completed ?? [];
    return new Set<number>(nums);
  }, [roadmapState?.completed]);

  // ── Filter state ─────────────────────────────────────────────────
  const [search,      setSearch]      = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all');
  const [freqFilter,  setFreqFilter]  = useState<'all' | FrequencyLevel>('all');
  const [status,      setStatus]      = useState<'all' | 'solved' | 'unsolved'>('all');
  const [category,    setCategory]    = useState('all');
  const [pattern,     setPattern]     = useState('all');

  // Platform checkboxes (all ON by default)
  const [platforms, setPlatforms] = useState<Record<PlatformId, boolean>>({
    leetcode:      true,
    codechef:      true,
    codeforces:    true,
    geeksforgeeks: true,
  });

  // Kingdom expand/collapse state
  const [collapsedKingdoms, setCollapsedKingdoms] = useState<Record<string, boolean>>({});

  // ── Derived patterns for selected category ──────────────────────
  const categoryPatterns = useMemo(() => {
    if (category === 'all') return ALL_PATTERNS;
    return ALL_PATTERNS.filter((p) => p.categorySlug === category);
  }, [category]);

  // Solved IDs mapping for filterProblems helper
  const solvedIdsForFilter: string[] = useMemo(() => {
    return ALL_PROBLEMS.filter((p) => solvedLcNumbers.has(p.leetcodeNumber)).map((p) => p.id);
  }, [solvedLcNumbers]);

  // ── Core filter ──────────────────────────────────────────────────
  const filterOptions: FilterOptions = useMemo(() => ({
    ...(category    !== 'all' ? { categorySlug: category } : {}),
    ...(pattern     !== 'all' ? { patternSlug: pattern }   : {}),
    ...(levelFilter !== 'all' ? { level: LEVEL_MAP[levelFilter] } : {}),
    ...(freqFilter  !== 'all' ? { frequency: freqFilter } : {}),
    ...(status      !== 'all' ? { solvedStatus: status as 'solved' | 'unsolved' } : {}),
    ...(search.trim() ? { searchQuery: search.trim() } : {}),
  }), [category, pattern, levelFilter, freqFilter, status, search]);

  const filtered: ProblemModel[] = useMemo(
    () => CurriculumRepository.filterProblems(filterOptions, solvedIdsForFilter),
    [filterOptions, solvedIdsForFilter]
  );

  // Platform filtering logic
  const platformFiltered: ProblemModel[] = useMemo(() => {
    return filtered.filter((p) => {
      const isCF = p.url.includes('codeforces.com');
      if (isCF) return platforms.codeforces;
      return platforms.leetcode;
    });
  }, [filtered, platforms.codeforces, platforms.leetcode]);

  // ── Group by kingdom ────────────────────────────────────────────
  const byKingdom = useMemo(() => {
    const map = new Map<string, { kingdomTitle: string; categorySlug: string; problems: ProblemModel[] }>();
    ALL_CATEGORIES.forEach((cat) => {
      map.set(cat.slug, { kingdomTitle: cat.kingdomTitle, categorySlug: cat.slug, problems: [] });
    });
    platformFiltered.forEach((p) => {
      const entry = map.get(p.categorySlug);
      if (entry) entry.problems.push(p);
    });
    return Array.from(map.values()).filter((k) => k.problems.length > 0 || !hasActiveFilter(filterOptions, platforms));
  }, [platformFiltered, filterOptions, platforms]);

  const hasFilters = hasActiveFilter(filterOptions, platforms);
  const solvedCount = solvedLcNumbers.size;
  const totalXp = roadmapState?.xp ?? (solvedCount * 50);

  const togglePlatform = (id: PlatformId) =>
    setPlatforms((prev) => ({ ...prev, [id]: !prev[id] }));

  const toggleKingdom = (slug: string) =>
    setCollapsedKingdoms((prev) => ({ ...prev, [slug]: !prev[slug] }));

  const handleToggleSolved = (lcNumber: number) => {
    if (toggle) {
      toggle('completed', lcNumber);
    }
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        background: '#070512',
        color: '#FFF',
        padding: '24px 32px',
        minHeight: '100vh',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      }}
    >

      {/* ── PREMIUM JOURNEY PRACTICE ARENA HEADER ───────────────────── */}
      <div
        style={{
          padding: '22px 28px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(24,18,48,0.95) 0%, rgba(12,9,26,0.98) 100%)',
          border: '1px solid rgba(168,85,247,0.3)',
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        {/* Title & Subtitle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '12px',
              borderRadius: '14px',
              background: 'rgba(168,85,247,0.2)',
              border: '1px solid rgba(192,132,252,0.4)',
            }}
          >
            <Swords size={26} style={{ color: '#C084FC' }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.01em' }}>
              ⚔ PRACTICE ARENA
            </h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
              Master DSA through structured kingdoms and interview quests
            </p>
          </div>
        </div>

        {/* Compact Stat Tiles Bar (4 Tiles) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            width: '100%',
          }}
        >
          {/* Tile 1: Total Problems */}
          <div style={statTileSt('rgba(168,85,247,0.1)', 'rgba(168,85,247,0.25)')}>
            <Layers size={18} style={{ color: '#C084FC' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', lineHeight: 1.1 }}>{ALL_PROBLEMS.length}</div>
              <div style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Problems Catalog</div>
            </div>
          </div>

          {/* Tile 2: Solved */}
          <div style={statTileSt('rgba(16,185,129,0.1)', 'rgba(16,185,129,0.25)')}>
            <CheckCircle2 size={18} style={{ color: '#10B981' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#10B981', lineHeight: 1.1 }}>{solvedCount}</div>
              <div style={{ fontSize: '11px', color: '#6EE7B7', fontWeight: 700 }}>Solved Problems</div>
            </div>
          </div>

          {/* Tile 3: XP Earned */}
          <div style={statTileSt('rgba(245,158,11,0.1)', 'rgba(245,158,11,0.25)')}>
            <Trophy size={18} style={{ color: '#F59E0B' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#F59E0B', lineHeight: 1.1 }}>+{totalXp} XP</div>
              <div style={{ fontSize: '11px', color: '#FDE68A', fontWeight: 700 }}>Earned XP</div>
            </div>
          </div>

          {/* Tile 4: Kingdoms */}
          <div style={statTileSt('rgba(59,130,246,0.1)', 'rgba(59,130,246,0.25)')}>
            <Shield size={18} style={{ color: '#60A5FA' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#60A5FA', lineHeight: 1.1 }}>{ALL_CATEGORIES.length}</div>
              <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: 700 }}>DSA Kingdoms</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PREMIUM DATA-TABLE TOOLBAR ABOVE PRACTICE TABLE ─────────── */}
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid rgba(168,85,247,0.25)',
          background: 'rgba(12,9,26,0.92)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* SEARCH BAR ROW */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(168,85,247,0.18)' }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#C084FC', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search problems by title, #, topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 14px 9px 40px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.5)',
                border: '1px solid rgba(168,85,247,0.3)',
                color: '#FFF',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* SECTION 1: PLATFORM ROW */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(168,85,247,0.18)', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.12em', flexShrink: 0 }}>
            PLATFORM
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {PLATFORMS.map((pl) => (
              <label
                key={pl.id}
                onClick={() => togglePlatform(pl.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 14px',
                  borderRadius: '10px',
                  background: platforms[pl.id] ? pl.badgeColor : 'rgba(0,0,0,0.3)',
                  border: `1.5px solid ${platforms[pl.id] ? pl.borderColor : 'rgba(255,255,255,0.08)'}`,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: `1.5px solid ${platforms[pl.id] ? pl.borderColor : '#4B5563'}`,
                    background: platforms[pl.id] ? pl.borderColor : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {platforms[pl.id] && <Check size={11} style={{ color: '#000', strokeWidth: 3.5 }} />}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 800, color: platforms[pl.id] ? pl.textColor : '#64748B' }}>
                  {pl.label}
                </span>
              </label>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#64748B', fontStyle: 'italic' }}>
            CodeChef · GeeksForGeeks coming soon
          </span>
        </div>

        {/* SECTION 2: FILTER ROW */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(168,85,247,0.18)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {/* Level */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Level:</span>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value as any)} style={selectSt}>
              <option value="all">All ▼</option>
              <option value="Beginner">Beginner (Learn) ▼</option>
              <option value="Intermediate">Intermediate (Practice) ▼</option>
              <option value="Advanced">Advanced (Master) ▼</option>
            </select>
          </div>

          {/* Frequency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Frequency:</span>
            <select value={freqFilter} onChange={(e) => setFreqFilter(e.target.value as any)} style={selectSt}>
              <option value="all">All ▼</option>
              <option value="High">High ▼</option>
              <option value="Medium">Medium ▼</option>
              <option value="Low">Low ▼</option>
            </select>
          </div>

          {/* Category */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Category:</span>
            <select value={category} onChange={(e) => { setCategory(e.target.value); setPattern('all'); }} style={selectSt}>
              <option value="all">All ▼</option>
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>{cat.title} ▼</option>
              ))}
            </select>
          </div>

          {/* Pattern */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Pattern:</span>
            <select value={pattern} onChange={(e) => setPattern(e.target.value)} style={selectSt}>
              <option value="all">All ▼</option>
              {categoryPatterns.map((pat) => (
                <option key={pat.slug} value={pat.slug}>{pat.title} ▼</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Status:</span>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={selectSt}>
              <option value="all">All ▼</option>
              <option value="solved">Solved ▼</option>
              <option value="unsolved">Unsolved ▼</option>
            </select>
          </div>

          {hasFilters && (
            <button
              onClick={() => { setSearch(''); setLevelFilter('all'); setFreqFilter('all'); setStatus('all'); setCategory('all'); setPattern('all'); }}
              style={{ fontSize: '11px', fontWeight: 800, color: '#EF4444', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', padding: '5px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <XCircle size={12} /> Clear Filters
            </button>
          )}
        </div>

        {/* SECTION 3: PROBLEM COUNT ROW */}
        <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>
            Showing <strong style={{ color: '#C084FC' }}>{platformFiltered.length}</strong> problems
          </span>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
            Total Database: {ALL_PROBLEMS.length} Problems
          </span>
        </div>
      </div>

      {/* ── PREMIUM DATA TABLE WITH KINGDOM SECTIONS ────────────────── */}
      {platformFiltered.length === 0 ? (
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B', fontSize: '14px', fontWeight: 700, borderRadius: '16px', border: '1px solid rgba(168,85,247,0.15)', background: 'rgba(12,9,26,0.6)' }}>
          No problems match these filters.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {byKingdom
            .filter((k) => k.problems.length > 0)
            .map((kingdom) => {
              const isCollapsed = !!collapsedKingdoms[kingdom.categorySlug];
              const kSolved = kingdom.problems.filter((p) => solvedLcNumbers.has(p.leetcodeNumber)).length;
              const kTotal = kingdom.problems.length;
              const kPct = kTotal > 0 ? Math.round((kSolved / kTotal) * 100) : 0;
              const commonTopics = getCommonTopics(kingdom.problems, 4);

              return (
                <div
                  key={kingdom.categorySlug}
                  style={{
                    borderRadius: '16px',
                    border: '1px solid rgba(168,85,247,0.25)',
                    overflow: 'hidden',
                    background: 'rgba(12,9,26,0.85)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  }}
                >
                  {/* 🏰 KINGDOM SECTION DIVIDER HEADER */}
                  <div
                    onClick={() => toggleKingdom(kingdom.categorySlug)}
                    style={{
                      padding: '20px 26px',
                      background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(59,130,246,0.06) 100%)',
                      borderBottom: isCollapsed ? 'none' : '1px solid rgba(168,85,247,0.25)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      cursor: 'pointer',
                      userSelect: 'none',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {/* TOP LINE: Kingdom Name (Left) | Completion Count (Right) */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>🏰</span>
                        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
                          {kingdom.kingdomTitle}
                        </h2>
                      </div>

                      {/* Right-aligned Completion Count & Toggle */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 900, color: '#10B981' }}>
                          {kSolved} / {kTotal} Done
                        </span>
                        <span style={{ color: '#94A3B8' }}>
                          {isCollapsed ? <ChevronRightIcon size={18} /> : <ChevronDown size={18} />}
                        </span>
                      </div>
                    </div>

                    {/* MIDDLE LINE: Common Topics Badges */}
                    {commonTopics.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Tag size={11} style={{ color: '#C084FC' }} /> Common Topics:
                        </span>
                        {commonTopics.map((topic) => (
                          <span
                            key={topic}
                            style={{
                              padding: '3px 10px',
                              borderRadius: '10px',
                              background: 'rgba(168,85,247,0.16)',
                              border: '1px solid rgba(168,85,247,0.35)',
                              color: '#E879F9',
                              fontSize: '11px',
                              fontWeight: 700,
                            }}
                          >
                            [{topic}]
                          </span>
                        ))}
                      </div>
                    )}

                    {/* BOTTOM LINE: Progress Bar + Percentage */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', paddingTop: '4px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Progress
                      </span>
                      <div style={{ flex: 1, height: '7px', borderRadius: '99px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${kPct}%`, background: 'linear-gradient(90deg, #A855F7, #10B981)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 900, color: '#10B981', minWidth: '36px', textAlign: 'right' }}>
                        {kPct}%
                      </span>
                    </div>
                  </div>

                  {/* TABLE OF PROBLEMS INSIDE KINGDOM */}
                  <AnimatePresence initial={false}>
                    {!isCollapsed && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ overflowX: 'auto', width: '100%' }}
                      >
                        <div style={{ minWidth: '1268px' }}>
                          {/* 9 Sticky Table Header Columns */}
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: GRID_TEMPLATE,
                              padding: '11px 20px',
                              background: 'rgba(10,7,22,0.96)',
                              backdropFilter: 'blur(12px)',
                              position: 'sticky',
                              top: 0,
                              zIndex: 10,
                              fontSize: '10px',
                              fontWeight: 900,
                              color: '#64748B',
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              gap: '8px',
                              borderBottom: '1px solid rgba(168,85,247,0.2)',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ textAlign: 'center' }}>Status</span>
                            <span>Category</span>
                            <span>Subtopic</span>
                            <span style={{ textAlign: 'center' }}>Problem #</span>
                            <span>Problem Name</span>
                            <span>Topics</span>
                            <span style={{ textAlign: 'center' }}>Est Time</span>
                            <span style={{ textAlign: 'center' }}>XP</span>
                            <span style={{ textAlign: 'center' }}>Open Link</span>
                          </div>

                          {/* Table Rows */}
                          {kingdom.problems.map((problem, i) => (
                            <TableRow9
                              key={`${problem.id}-${i}`}
                              problem={problem}
                              isSolved={solvedLcNumbers.has(problem.leetcodeNumber)}
                              onToggleSolved={() => handleToggleSolved(problem.leetcodeNumber)}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

// ── EXACT 9-COLUMN TABLE ROW COMPONENT ──────────────────────────────
function TableRow9({
  problem,
  isSolved,
  onToggleSolved,
}: {
  problem: ProblemModel;
  isSolved: boolean;
  onToggleSolved: () => void;
}) {
  const isCF = problem.url.includes('codeforces.com');
  const probNum = getProblemNumber(problem);

  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(168,85,247,0.06)' }}
      transition={{ duration: 0.1 }}
      style={{
        display: 'grid',
        gridTemplateColumns: GRID_TEMPLATE,
        padding: '11px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        color: '#CBD5E1',
        background: isSolved ? 'rgba(16,185,129,0.04)' : 'transparent',
      }}
    >
      {/* 1. Status (ONLY Checkbox) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="checkbox"
          checked={isSolved}
          onChange={onToggleSolved}
          style={{
            width: '17px',
            height: '17px',
            accentColor: '#10B981',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          title={isSolved ? 'Solved (click to mark unsolved)' : 'Unsolved (click to mark solved)'}
        />
      </div>

      {/* 2. Category */}
      <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={problem.categoryTitle}>
        {problem.categoryTitle}
      </span>

      {/* 3. Subtopic */}
      <span style={{ fontSize: '12px', color: '#C084FC', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={problem.patternTitle}>
        {problem.patternTitle}
      </span>

      {/* 4. Problem # */}
      <span style={{ textAlign: 'center', color: '#38BDF8', fontWeight: 700, fontSize: '11px' }}>
        {probNum}
      </span>

      {/* 5. Problem Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
        <Link
          href={isCF ? problem.url : `/practice/${problem.slug}`}
          target={isCF ? '_blank' : '_self'}
          style={{ color: isSolved ? '#10B981' : '#E2E8F0', fontWeight: 700, textDecoration: 'none', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          title={problem.title}
        >
          {problem.title}
        </Link>
      </div>

      {/* 6. Topics */}
      <span style={{ fontSize: '11px', color: '#94A3B8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={problem.topics.join(', ')}>
        {problem.topics.join(', ')}
      </span>

      {/* 7. Estimated Time */}
      <span style={{ textAlign: 'center', color: '#94A3B8', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
        <Clock size={11} />
        {problem.estimatedTimeMin}m
      </span>

      {/* 8. XP */}
      <span style={{ textAlign: 'center', fontSize: '11px', fontWeight: 800, color: '#A855F7' }}>
        +{problem.xp}
      </span>

      {/* 9. Open Link */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{ color: '#60A5FA', display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 700, textDecoration: 'none' }}
          title="Open problem link"
        >
          <span>Link</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </motion.div>
  );
}

// Helper for stat tiles
function statTileSt(bg: string, border: string): React.CSSProperties {
  return {
    padding: '12px 18px',
    borderRadius: '14px',
    background: bg,
    border: `1px solid ${border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };
}

// Helpers
function hasActiveFilter(opts: FilterOptions, platforms: Record<PlatformId, boolean>): boolean {
  return !!(
    opts.level ||
    opts.frequency ||
    opts.categorySlug ||
    opts.patternSlug ||
    opts.searchQuery ||
    opts.solvedStatus ||
    !platforms.leetcode
  );
}

const selectSt: React.CSSProperties = {
  padding: '6px 10px',
  borderRadius: '8px',
  background: 'rgba(0,0,0,0.5)',
  border: '1px solid rgba(168,85,247,0.25)',
  color: '#E2E8F0',
  fontSize: '12px',
  fontWeight: 700,
  outline: 'none',
  cursor: 'pointer',
  flexShrink: 0,
};
