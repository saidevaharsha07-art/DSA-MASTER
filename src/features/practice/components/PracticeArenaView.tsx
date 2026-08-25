'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  Tag,
  XCircle,
  Layers,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel, FilterOptions, ProgressionLevel, FrequencyLevel } from '@/src/curriculum/types';
import { useRoadmap } from '@/hooks/use-roadmap';
import { EventBus } from '@/src/core/events/event-bus';
import { AdaptiveRecommendationService, PracticeRecommendation } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';

// ── Platform definitions ────────────────────────────────────────────
const PLATFORMS = [
  { id: 'leetcode',      label: 'LeetCode',      badgeColor: 'rgba(245,158,11,0.15)', borderColor: '#F59E0B', textColor: '#FBBF24' },
  { id: 'codechef',     label: 'CodeChef',      badgeColor: 'rgba(168,85,247,0.18)', borderColor: '#A855F7', textColor: '#C084FC' },
  { id: 'codeforces',   label: 'Codeforces',    badgeColor: 'rgba(56,189,248,0.15)', borderColor: '#38BDF8', textColor: '#38BDF8' },
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
  if (problem.url.includes('codechef.com')) {
    return problem.id.replace(/^cc-/, '').toUpperCase();
  }
  if (problem.leetcodeNumber && problem.leetcodeNumber < 90000) {
    return `#${problem.leetcodeNumber}`;
  }
  return problem.id.toUpperCase();
}

// Grid template for exact 9 columns:
// 1. Status (48px)  2. Category (160px)  3. Subtopic (180px)  4. Problem # (90px)  5. Problem Name (280px)
// 6. Topics (240px)  7. Est Time (100px)  8. XP (80px)  9. Open Link (90px)
const GRID_TEMPLATE = '48px 160px 180px 90px 280px 240px 100px 80px 90px';

export interface GroupedSection {
  id: string;
  title: string;
  categoryLabel: string;
  subtopicLabel: string;
  problems: ProblemModel[];
}

function groupByKingdom(problems: ProblemModel[]): GroupedSection[] {
  const map = new Map<string, { title: string; problems: ProblemModel[] }>();
  ALL_CATEGORIES.forEach((cat) => {
    map.set(cat.slug, { title: cat.kingdomTitle, problems: [] });
  });
  problems.forEach((p) => {
    const entry = map.get(p.categorySlug);
    if (entry) entry.problems.push(p);
  });
  return Array.from(map.entries()).map(([slug, data]) => ({
    id: slug,
    title: data.title,
    categoryLabel: 'Category',
    subtopicLabel: 'Subtopic',
    problems: data.problems,
  }));
}

import { CODECHEF_PROBLEM_MODELS } from '@/src/curriculum/repository/codechef-rating-db';
import { CODECHEF_KINGDOMS } from '@/src/features/codechef/data/categories';

function groupByCodeChefKingdoms(problems: ProblemModel[]): GroupedSection[] {
  const map = new Map<string, { title: string; problems: ProblemModel[] }>();
  CODECHEF_KINGDOMS.forEach((k) => {
    map.set(k.name.toLowerCase(), { title: k.name, problems: [] });
  });

  problems.forEach((p) => {
    const kName = (p.kingdomTitle || p.categoryTitle || '').toLowerCase();
    const entry = map.get(kName);
    if (entry) {
      entry.problems.push(p);
    } else {
      const foundKey = Array.from(map.keys()).find((kKey) => kName.includes(kKey) || kKey.includes(kName));
      if (foundKey) {
        map.get(foundKey)!.problems.push(p);
      } else if (map.size > 0) {
        const first = map.values().next().value;
        if (first) {
          first.problems.push(p);
        }
      }
    }
  });

  return Array.from(map.entries()).map(([id, data]) => ({
    id,
    title: data.title,
    categoryLabel: 'Kingdom',
    subtopicLabel: 'Pattern',
    problems: data.problems,
  }));
}


function groupByDivision(problems: ProblemModel[]): GroupedSection[] {
  const divisions = [
    { id: 'div-4', title: '⚡ Division 4 (800–1100)', filter: (p: ProblemModel) => p.level === 'Learn' || p.xp <= 15 },
    { id: 'div-3', title: '⚡ Division 3 (1200–1400)', filter: (p: ProblemModel) => p.level === 'Practice' || (p.xp > 15 && p.xp <= 25) },
    { id: 'div-2', title: '⚡ Division 2 (1500–1800)', filter: (p: ProblemModel) => p.level === 'Master' || (p.xp > 25 && p.xp <= 40) },
    { id: 'div-1', title: '⚡ Division 1 (1900+)', filter: (p: ProblemModel) => p.xp > 40 },
  ];

  const assigned = new Set<string>();
  const result: GroupedSection[] = [];

  for (const div of divisions) {
    const list: ProblemModel[] = [];
    for (const p of problems) {
      if (!assigned.has(p.id) && div.filter(p)) {
        list.push(p);
        assigned.add(p.id);
      }
    }
    if (list.length > 0) {
      result.push({ id: div.id, title: div.title, categoryLabel: 'Division', subtopicLabel: 'Topic', problems: list });
    }
  }

  const unassigned = problems.filter((p) => !assigned.has(p.id));
  if (unassigned.length > 0) {
    result.push({ id: 'div-2-fallback', title: '⚡ Division 2 (1500–1800)', categoryLabel: 'Division', subtopicLabel: 'Topic', problems: unassigned });
  }

  return result;
}

function groupByModule(problems: ProblemModel[]): GroupedSection[] {
  const modules = [
    { id: 'gfg-basic', title: '📗 School & Basic', filter: (p: ProblemModel) => p.level === 'Learn' || p.xp <= 15 },
    { id: 'gfg-medium', title: '📘 Easy & Medium', filter: (p: ProblemModel) => p.level === 'Practice' || (p.xp > 15 && p.xp <= 30) },
    { id: 'gfg-advanced', title: '📙 Hard & Advanced', filter: (p: ProblemModel) => p.level === 'Master' || p.xp > 30 },
  ];

  const assigned = new Set<string>();
  const result: GroupedSection[] = [];

  for (const mod of modules) {
    const list: ProblemModel[] = [];
    for (const p of problems) {
      if (!assigned.has(p.id) && mod.filter(p)) {
        list.push(p);
        assigned.add(p.id);
      }
    }
    if (list.length > 0) {
      result.push({ id: mod.id, title: mod.title, categoryLabel: 'Module', subtopicLabel: 'Topic', problems: list });
    }
  }

  const unassigned = problems.filter((p) => !assigned.has(p.id));
  if (unassigned.length > 0) {
    result.push({ id: 'gfg-medium-fallback', title: '📘 Easy & Medium', categoryLabel: 'Module', subtopicLabel: 'Topic', problems: unassigned });
  }

  return result;
}

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

  // Platform filter chips (CodeChef selected by default)
  const [platforms, setPlatforms] = useState<Record<PlatformId, boolean>>({
    codechef: true,
    leetcode: false,
    codeforces: false,
    geeksforgeeks: false,
  });

  // Kingdom expand/collapse state (collapsed by default)
  const [collapsedKingdoms, setCollapsedKingdoms] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    ALL_CATEGORIES.forEach((cat) => {
      map[cat.slug] = true;
    });
    return map;
  });

  // Active platform helper
  const activePlatform = useMemo(() => {
    return (Object.keys(platforms) as PlatformId[]).find((p) => platforms[p]) || 'codechef';
  }, [platforms]);

  // Reset UI state whenever active platform changes
  useEffect(() => {
    const collapsedMap: Record<string, boolean> = {};
    ALL_CATEGORIES.forEach((cat) => {
      collapsedMap[cat.slug] = true;
    });
    setCollapsedKingdoms(collapsedMap);
    setCategory('all');
    setPattern('all');
    setSearch('');
    setLevelFilter('all');
    setFreqFilter('all');
    setStatus('all');

    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activePlatform]);

  // Adaptive Practice Recommendations
  const { userId } = useActiveUser();
  const [recommendations, setRecommendations] = useState<PracticeRecommendation[]>([]);

  useEffect(() => {
    const recs = AdaptiveRecommendationService.getRecommendedPracticeProblems(userId, activePlatform, 4);
    setRecommendations(recs);
  }, [activePlatform, solvedLcNumbers, userId]);

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
    if (activePlatform === 'codechef') {
      let list = CODECHEF_PROBLEM_MODELS;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        list = list.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.id.toLowerCase().includes(q) ||
            p.topics.some((t) => t.toLowerCase().includes(q)) ||
            (p.kingdomTitle && p.kingdomTitle.toLowerCase().includes(q)) ||
            (p.patternTitle && p.patternTitle.toLowerCase().includes(q))
        );
      }
      if (levelFilter !== 'all') {
        const targetLevel = LEVEL_MAP[levelFilter];
        list = list.filter((p) => p.level === targetLevel);
      }
      if (freqFilter !== 'all') {
        list = list.filter((p) => p.frequency === freqFilter);
      }
      return list;
    }

    return filtered.filter((p) => {
      const isCF = p.url.includes('codeforces.com');
      const isGFG = p.url.includes('geeksforgeeks.org');
      if (isCF) return platforms.codeforces;
      if (isGFG) return platforms.geeksforgeeks;
      return platforms.leetcode;
    });
  }, [filtered, platforms.codeforces, platforms.codechef, platforms.geeksforgeeks, platforms.leetcode, activePlatform, search, levelFilter, freqFilter]);

  // ── Platform-native grouping ────────────────────────────────────
  const groupedSections: GroupedSection[] = useMemo(() => {
    switch (activePlatform) {
      case 'codechef':
        return groupByCodeChefKingdoms(platformFiltered);
      case 'codeforces':
        return groupByDivision(platformFiltered);
      case 'geeksforgeeks':
        return groupByModule(platformFiltered);
      case 'leetcode':
      default:
        return groupByKingdom(platformFiltered);
    }
  }, [activePlatform, platformFiltered]);

  const byKingdom = useMemo(() => {
    return groupedSections.filter((k) => k.problems.length > 0 || !hasActiveFilter(filterOptions, platforms));
  }, [groupedSections, filterOptions, platforms]);

  // Stat Card 4 Tile per platform
  const statTile4 = useMemo(() => {
    switch (activePlatform) {
      case 'codechef':
        return { value: '25', label: 'DSA Kingdoms' };
      case 'codeforces':
        return { value: '4', label: 'Rating Divisions' };
      case 'geeksforgeeks':
        return { value: '3', label: 'Practice Modules' };
      case 'leetcode':
      default:
        return { value: `${ALL_CATEGORIES.length}`, label: 'DSA Kingdoms' };
    }
  }, [activePlatform]);

  const hasFilters = hasActiveFilter(filterOptions, platforms);
  const solvedCount = solvedLcNumbers.size;
  const totalXp = roadmapState?.xp ?? (solvedCount * 50);

  const selectPlatform = (id: PlatformId) => {
    setPlatforms({
      leetcode: id === 'leetcode',
      codechef: id === 'codechef',
      codeforces: id === 'codeforces',
      geeksforgeeks: id === 'geeksforgeeks',
    });
  };

  const toggleKingdom = (slug: string) =>
    setCollapsedKingdoms((prev) => ({ ...prev, [slug]: !prev[slug] }));

  const handleToggleSolved = (lcNumber: number, problemModel?: ProblemModel) => {
    const isCurrentlySolved = solvedLcNumbers.has(lcNumber);

    if (isCurrentlySolved) {
      // Transition: Solved -> Unsolved (Direct unsolve toggle without event)
      if (toggle) {
        toggle('completed', lcNumber);
      }
      return;
    }

    // Transition: Unsolved -> Solved (Single authoritative path via EventBus)
    const problem =
      problemModel ||
      ALL_PROBLEMS.find((p) => p.leetcodeNumber === lcNumber) ||
      CODECHEF_PROBLEM_MODELS.find((p) => p.leetcodeNumber === lcNumber);

    const isCC = activePlatform === 'codechef' || (problem?.url && problem.url.includes('codechef.com'));
    const canonicalId = problem ? (isCC ? `codechef:${problem.id}` : `leetcode:${problem.leetcodeNumber}`) : `leetcode:${lcNumber}`;

    EventBus.publish('ProblemSolved', {
      id: `attempt_${Date.now()}_${lcNumber}`,
      userId,
      problemId: canonicalId,
      platform: isCC ? 'codechef' : activePlatform,
      status: 'accepted',
      timestamp: new Date().toISOString(),
      durationSeconds: 0, // Unmeasured duration (no live timer)
      xpEarned: problem?.xp || 50,
      topic: problem?.topics?.[0] || problem?.categoryTitle || 'General',
      pattern: problem?.patternTitle || 'General',
      difficulty: problem?.difficulty || 'Medium',
    });
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
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#FFF', lineHeight: 1.1 }}>{platformFiltered.length}</div>
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

          {/* Tile 4: Dynamic Platform Roadmap Tile */}
          <div style={statTileSt('rgba(59,130,246,0.1)', 'rgba(59,130,246,0.25)')}>
            <Shield size={18} style={{ color: '#60A5FA' }} />
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#60A5FA', lineHeight: 1.1 }}>{statTile4.value}</div>
              <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: 700 }}>{statTile4.label}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── RECOMMENDED FOR YOU (ADAPTIVE INTELLIGENCE BANNER) ────────────────── */}
      {recommendations.length > 0 && (
        <div
          style={{
            padding: '20px 24px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(12,9,26,0.95) 100%)',
            border: '1px solid rgba(168,85,247,0.35)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(192,132,252,0.4)' }}>
                <Sparkles size={18} style={{ color: '#C084FC' }} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#FFF', letterSpacing: '0.02em' }}>
                  RECOMMENDED FOR YOU
                </h3>
                <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                  AI Adaptive Engine & Memory SRS recommendations tailored to your progress
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px' }}>
            {recommendations.map((rec) => {
              const diffColor =
                rec.difficulty.toLowerCase() === 'easy'
                  ? '#10B981'
                  : rec.difficulty.toLowerCase() === 'hard'
                  ? '#EF4444'
                  : '#F59E0B';

              return (
                <div
                  key={rec.id}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '14px',
                    background: 'rgba(20,16,38,0.85)',
                    border: '1px solid rgba(168,85,247,0.25)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#C084FC', background: 'rgba(168,85,247,0.2)', padding: '2px 8px', borderRadius: '6px', border: '1px solid rgba(192,132,252,0.3)' }}>
                        {rec.badge}
                      </span>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: diffColor }}>
                        {rec.difficulty}
                      </span>
                    </div>

                    <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#F8FAFC', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {rec.title}
                    </h4>

                    <div style={{ fontSize: '10px', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{rec.platform.toUpperCase()}</span>
                      <span>•</span>
                      <span>{rec.topic}</span>
                    </div>
                  </div>

                  <a
                    href={rec.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '7px 12px',
                      borderRadius: '8px',
                      background: 'rgba(168,85,247,0.25)',
                      border: '1px solid rgba(192,132,252,0.4)',
                      color: '#E9D5FF',
                      fontSize: '11px',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span>Practice Problem</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
        {/* SECTION 1: PLATFORM ROW */}
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 900, color: '#A855F7', textTransform: 'uppercase', letterSpacing: '0.12em', flexShrink: 0 }}>
            PLATFORM
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {PLATFORMS.map((pl) => {
              const isSelected = platforms[pl.id];

              return (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() => selectPlatform(pl.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '7px 16px',
                    borderRadius: '10px',
                    background: isSelected ? pl.badgeColor : 'transparent',
                    border: isSelected ? `1.5px solid ${pl.borderColor}` : '1px solid rgba(255,255,255,0.08)',
                    color: isSelected ? pl.textColor : '#7C8395',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.18s ease-in-out',
                    outline: 'none',
                    boxShadow: isSelected ? `0 0 12px ${pl.badgeColor}` : 'none',
                  }}
                >
                  {pl.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SEARCH & FILTERS FOR LEETCODE / CODEFORCES */}
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

            {/* SECTION 2: FILTER ROW */}
            <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(168,85,247,0.18)', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Level:</span>
                <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value as any)} style={selectSt}>
                  <option value="all">All ▼</option>
                  <option value="Beginner">Beginner (Learn) ▼</option>
                  <option value="Intermediate">Intermediate (Practice) ▼</option>
                  <option value="Advanced">Advanced (Master) ▼</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Frequency:</span>
                <select value={freqFilter} onChange={(e) => setFreqFilter(e.target.value as any)} style={selectSt}>
                  <option value="all">All ▼</option>
                  <option value="High">High ▼</option>
                  <option value="Medium">Medium ▼</option>
                  <option value="Low">Low ▼</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8' }}>Category:</span>
                <select value={category} onChange={(e) => { setCategory(e.target.value); setPattern('all'); }} style={selectSt}>
                  <option value="all">All ▼</option>
                  {ALL_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>{cat.title} ▼</option>
                  ))}
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

          {/* DATA TABLE FOR LEETCODE / CODEFORCES */}
          {platformFiltered.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#64748B', fontSize: '14px', fontWeight: 700, borderRadius: '16px', border: '1px solid rgba(168,85,247,0.15)', background: 'rgba(12,9,26,0.6)' }}>
              No problems match these filters.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {byKingdom
                .filter((k) => k.problems.length > 0)
                .map((kingdom) => {
                  const isCollapsed = !!collapsedKingdoms[kingdom.id];
                  const kSolved = kingdom.problems.filter((p) => solvedLcNumbers.has(p.leetcodeNumber)).length;
                  const kTotal = kingdom.problems.length;
                  const kPct = kTotal > 0 ? Math.round((kSolved / kTotal) * 100) : 0;
                  const commonTopics = getCommonTopics(kingdom.problems, 4);

                  return (
                    <div
                      key={kingdom.id}
                      style={{
                        borderRadius: '16px',
                        border: '1px solid rgba(168,85,247,0.25)',
                        overflow: 'hidden',
                        background: 'rgba(12,9,26,0.85)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* SECTION DIVIDER HEADER */}
                      <div
                        onClick={() => toggleKingdom(kingdom.id)}
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
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#F8FAFC', letterSpacing: '-0.01em' }}>
                              {kingdom.title}
                            </h2>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <span style={{ fontSize: '14px', fontWeight: 900, color: '#10B981' }}>
                              {kSolved} / {kTotal} Done
                            </span>
                            <span style={{ color: '#94A3B8' }}>
                              {isCollapsed ? <ChevronRightIcon size={18} /> : <ChevronDown size={18} />}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* TABLE OF PROBLEMS INSIDE SECTION */}
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
                                <span>{kingdom.categoryLabel}</span>
                                <span>{kingdom.subtopicLabel}</span>
                                <span style={{ textAlign: 'center' }}>Problem #</span>
                                <span>Problem Name</span>
                                <span>Topics</span>
                                <span style={{ textAlign: 'center' }}>Est Time</span>
                                <span style={{ textAlign: 'center' }}>XP</span>
                                <span style={{ textAlign: 'center' }}>Open Link</span>
                              </div>

                              {kingdom.problems.map((problem, i) => (
                                <TableRow9
                                  key={`${problem.id}-${i}`}
                                  problem={problem}
                                  activePlatform={activePlatform}
                                  isSolved={solvedLcNumbers.has(problem.leetcodeNumber)}
                                  onToggleSolved={() => handleToggleSolved(problem.leetcodeNumber, problem)}
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
    </div>
  );
}

// ── EXACT 9-COLUMN TABLE ROW COMPONENT ──────────────────────────────
function TableRow9({
  problem,
  activePlatform,
  isSolved,
  onToggleSolved,
}: {
  problem: ProblemModel;
  activePlatform: PlatformId;
  isSolved: boolean;
  onToggleSolved: () => void;
}) {
  const isCF = problem.url.includes('codeforces.com');
  const probNum = getProblemNumber(problem);

  let col2Value = problem.categoryTitle;
  let col3Value = problem.patternTitle;

  if (activePlatform === 'codechef') {
    col2Value = problem.kingdomTitle || problem.categoryTitle;
    col3Value = problem.patternTitle;
  } else if (activePlatform === 'codeforces') {
    col2Value = problem.xp > 25 ? 'Division 2' : 'Division 3';
    col3Value = problem.topics[0] || 'Implementation';
  } else if (activePlatform === 'geeksforgeeks') {
    col2Value = problem.level === 'Learn' ? 'School & Basic' : problem.level === 'Practice' ? 'Easy & Medium' : 'Hard & Advanced';
    col3Value = problem.topics[0] || 'Arrays';
  }

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

      {/* 2. Category / Division / Module */}
      <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={col2Value}>
        {col2Value}
      </span>

      {/* 3. Subtopic / Practice Path / Topic */}
      <span style={{ fontSize: '12px', color: '#C084FC', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={col3Value}>
        {col3Value}
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
