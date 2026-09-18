'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Swords,
  CheckCircle2,
  Check,
  Search,
  Filter,
  Zap,
  ChevronRight,
  Shield,
  Trophy,
  Layers,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Target,
  Code2,
  BookOpen,
  Compass,
  ExternalLink,
  ChevronLeft,
  Lock,
  RotateCcw,
  Sparkle,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getPlatformMeta } from '@/src/curriculum/services';
import { ProblemModel, ProgressionLevel, FrequencyLevel } from '@/src/curriculum/types';
import { useRoadmap } from '@/hooks/use-roadmap';
import { EventBus } from '@/src/core/events/event-bus';
import { AdaptiveRecommendationService, PracticeRecommendation } from '@/src/features/adaptive/services/adaptive-recommendation.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { progressService, ActivityRecord } from '@/src/services/progress/progress.service';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';

// ── Platform definitions ────────────────────────────────────────────
const PLATFORMS = [
  {
    id: 'leetcode',
    label: 'LeetCode',
    tagline: 'Learning Express',
    type: 'kingdom' as const,
    color: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    border: '#10B981',
  },
  {
    id: 'codechef',
    label: 'CodeChef',
    tagline: 'Coding Express',
    type: 'kingdom' as const,
    color: '#F97316',
    badgeBg: 'rgba(249, 115, 22, 0.18)',
    border: '#F97316',
  },
  {
    id: 'codeforces',
    label: 'Codeforces',
    tagline: 'Contest Express',
    type: 'division' as const,
    color: '#3B82F6',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    border: '#3B82F6',
  },
  {
    id: 'geeksforgeeks',
    label: 'GeeksForGeeks',
    tagline: 'Interview Express',
    type: 'kingdom' as const,
    color: '#2F9E44',
    badgeBg: 'rgba(47, 158, 68, 0.15)',
    border: '#2F9E44',
  },
] as const;

type PlatformId = typeof PLATFORMS[number]['id'];

// ── Codeforces Division Definitions (800 - 1900+) ────────────────────
const CODEFORCES_DIVISIONS = [
  {
    id: 'div-4',
    title: 'Division 4 (800–1100)',
    ratingRange: '800–1100 Rating',
    difficulty: 'Novice / Div 4',
    description: 'Beginner-friendly starting division. Foundational problem solving, basic math, and array logic.',
    xpReward: 800,
    filter: (p: ProblemModel) => p.level === 'Learn' || (p.xp || 0) <= 15,
  },
  {
    id: 'div-3',
    title: 'Division 3 (1200–1400)',
    ratingRange: '1200–1400 Rating',
    difficulty: 'Apprentice / Div 3',
    description: 'Intermediate competitive division. Two pointers, prefix sums, binary search, and greedy strategies.',
    xpReward: 1400,
    filter: (p: ProblemModel) => p.level === 'Practice' || ((p.xp || 0) > 15 && (p.xp || 0) <= 25),
  },
  {
    id: 'div-2',
    title: 'Division 2 (1500–1800)',
    ratingRange: '1500–1800 Rating',
    difficulty: 'Master / Div 2',
    description: 'Advanced contest challenges. Dynamic programming, graph algorithms, and data structures.',
    xpReward: 2200,
    filter: (p: ProblemModel) => p.level === 'Master' || ((p.xp || 0) > 25 && (p.xp || 0) <= 40),
  },
  {
    id: 'div-1',
    title: 'Division 1 (1900+)',
    ratingRange: '1900+ Rating',
    difficulty: 'Grandmaster / Div 1',
    description: 'Elite competitive programming. Advanced tree structures, number theory, and hard contest finals.',
    xpReward: 3500,
    filter: (p: ProblemModel) => (p.xp || 0) > 40,
  },
];

const ALL_PROBLEMS = CurriculumRepository.getAllProblems();
const ALL_CATEGORIES = CurriculumRepository.getAllCategories();
const ALL_PATTERNS = CurriculumRepository.getAllPatterns();
const ALL_SUBTOPICS = CurriculumRepository.getAllSubtopics();

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

function getPlatformId(problem: ProblemModel): 'leetcode' | 'codechef' | 'codeforces' | 'geeksforgeeks' {
  if (problem.url.includes('codechef.com')) return 'codechef';
  if (problem.url.includes('codeforces.com')) return 'codeforces';
  if (problem.url.includes('geeksforgeeks.org')) return 'geeksforgeeks';
  return 'leetcode';
}

export function PracticeArenaView({ defaultPlatform }: { defaultPlatform?: PlatformId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial query parameters with legacy fallback
  const initialPlatform = (searchParams?.get('platform') as PlatformId) || defaultPlatform || 'leetcode';
  const initialAreaParam = searchParams?.get('area') || searchParams?.get('kingdom') || null;
  const initialSubtopicParam = searchParams?.get('subtopic') || 'all';
  const initialDivision = searchParams?.get('division') || null;
  const initialPattern = searchParams?.get('pattern') || 'all';
  const initialDifficulty = (searchParams?.get('difficulty') as 'all' | 'Easy' | 'Medium' | 'Hard') || 'all';
  const initialStatus = (searchParams?.get('status') as 'all' | 'unsolved' | 'solved') || 'all';
  const initialSearch = searchParams?.get('search') || '';

  // Topic parameter fallback (e.g. from adaptive recommendation deep-links or aliases)
  const topicParam = searchParams?.get('topic');
  const resolvedInitialArea = useMemo(() => {
    const raw = initialAreaParam || topicParam;
    if (!raw) return null;
    const cat = CurriculumRepository.getCategoryBySlug(raw);
    return cat ? cat.slug : raw;
  }, [initialAreaParam, topicParam]);

  const { state: roadmapState, toggle } = useRoadmap();
  const { userId } = useActiveUser();
  const { toast } = useToast();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  // ── Solved sets from canonical progress service & roadmap hook ───
  const completedNumbersSet = useMemo(() => {
    return new Set<number>(roadmapState?.completed ?? []);
  }, [roadmapState?.completed]);

  const completedIdsSet = useMemo(() => {
    return new Set<string>(roadmapState?.completedProblemIds ?? []);
  }, [roadmapState?.completedProblemIds]);

  const isProblemChecked = useMemo(() => {
    return (problem: ProblemModel): boolean => {
      if (typeof problem.leetcodeNumber === 'number' && completedNumbersSet.has(problem.leetcodeNumber)) {
        return true;
      }
      if (completedIdsSet.has(problem.id) || completedIdsSet.has(String(problem.leetcodeNumber))) {
        return true;
      }
      const platform = getPlatformId(problem);
      if (completedIdsSet.has(`${platform}:${problem.id}`) || completedIdsSet.has(`${platform}:${problem.leetcodeNumber}`)) {
        return true;
      }
      return false;
    };
  }, [completedNumbersSet, completedIdsSet]);

  // ── Platform & Progression Selection State ───────────────────────
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>(initialPlatform);
  const [selectedKingdomSlug, setSelectedKingdomSlug] = useState<string | null>(resolvedInitialArea);
  const [selectedSubtopicSlug, setSelectedSubtopicSlug] = useState<string>(initialSubtopicParam);
  const [selectedDivisionId, setSelectedDivisionId] = useState<string | null>(initialDivision);

  // ── Secondary Filters & Controls State ───────────────────────────
  const [search, setSearch] = useState(initialSearch);
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>(initialDifficulty);
  const [patternFilter, setPatternFilter] = useState(initialPattern);
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>(initialStatus);
  const [sortBy, setSortBy] = useState<'order' | 'number' | 'difficulty' | 'xp'>('order');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const chipsScrollRef = useRef<HTMLDivElement>(null);

  // Reset page when platform or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPlatform, selectedKingdomSlug, selectedSubtopicSlug, selectedDivisionId, search, difficultyFilter, patternFilter, statusFilter, sortBy]);

  // Controlled area selection with stale filter protection
  const handleSelectKingdom = useCallback((slug: string) => {
    setSelectedKingdomSlug(slug);
    if (slug && slug !== 'all') {
      const areaSubtopics = CurriculumRepository.getSubtopicsByCategory(slug);
      if (!areaSubtopics.some((s) => s.slug === selectedSubtopicSlug || s.id === selectedSubtopicSlug)) {
        setSelectedSubtopicSlug('all');
        setPatternFilter('all');
      }
    } else {
      setSelectedSubtopicSlug('all');
      setPatternFilter('all');
    }
  }, [selectedSubtopicSlug]);

  // Controlled subtopic selection with stale filter protection
  const handleSelectSubtopic = useCallback((slug: string) => {
    setSelectedSubtopicSlug(slug);
    if (slug && slug !== 'all') {
      const sub = ALL_SUBTOPICS.find((s) => s.slug === slug || s.id === slug);
      if (sub && !sub.patternIds.some((pid) => pid === patternFilter || pid === `pattern.${patternFilter}`)) {
        setPatternFilter('all');
      }
    } else {
      setPatternFilter('all');
    }
  }, [patternFilter]);

  // Listen for browser popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const plat = (params.get('platform') as PlatformId) || defaultPlatform || 'leetcode';
      const rawArea = params.get('area') || params.get('kingdom') || params.get('topic') || null;
      const area = rawArea ? (CurriculumRepository.getCategoryBySlug(rawArea)?.slug || rawArea) : null;
      const sub = params.get('subtopic') || 'all';
      const pat = params.get('pattern') || 'all';
      const diff = (params.get('difficulty') as 'all' | 'Easy' | 'Medium' | 'Hard') || 'all';
      const stat = (params.get('status') as 'all' | 'unsolved' | 'solved') || 'all';
      const q = params.get('search') || '';
      const div = params.get('division') || null;

      setSelectedPlatform(plat);
      setSelectedKingdomSlug(area);
      setSelectedSubtopicSlug(sub);
      setPatternFilter(pat);
      setDifficultyFilter(diff);
      setStatusFilter(stat);
      setSearch(q);
      setSelectedDivisionId(div);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [defaultPlatform]);

  // Sync state to URL for shareable, bookmarkable, and refresh-persistent queries
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedPlatform) {
      params.set('platform', selectedPlatform);
    }
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      params.set('area', selectedKingdomSlug);
    }
    if (selectedSubtopicSlug && selectedSubtopicSlug !== 'all') {
      params.set('subtopic', selectedSubtopicSlug);
    }
    if (selectedDivisionId && selectedDivisionId !== 'all') {
      params.set('division', selectedDivisionId);
    }
    if (patternFilter && patternFilter !== 'all') {
      params.set('pattern', patternFilter);
    }
    if (difficultyFilter && difficultyFilter !== 'all') {
      params.set('difficulty', difficultyFilter);
    }
    if (statusFilter && statusFilter !== 'all') {
      params.set('status', statusFilter);
    }
    if (search.trim()) {
      params.set('search', search.trim());
    }

    const queryString = params.toString();
    const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
    const currentUrl = `${window.location.pathname}${window.location.search}`;

    if (currentUrl !== targetUrl) {
      window.history.replaceState(null, '', targetUrl);
    }
  }, [
    selectedPlatform,
    selectedKingdomSlug,
    selectedSubtopicSlug,
    selectedDivisionId,
    patternFilter,
    difficultyFilter,
    statusFilter,
    search,
    pathname,
  ]);

  // ── 1. LEETCODE LEARNING AREAS (25 Areas) ──────────────────────────
  const leetcodeKingdoms = useMemo(() => {
    const lcProblems = ALL_PROBLEMS.filter((p) => p.platform === 'leetcode');

    return ALL_CATEGORIES.map((cat, idx) => {
      const kProblems = lcProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solvedCount = kProblems.filter((p) => isProblemChecked(p)).length;
      const totalCount = kProblems.length;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

      return {
        id: cat.slug,
        number: idx + 1,
        name: cat.title,
        topic: cat.title,
        description: cat.description,
        problems: kProblems,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: 500 + idx * 40,
      };
    });
  }, [isProblemChecked]);

  // ── 2. CODECHEF LEARNING AREAS (25 Areas) ──────────────────────────
  const codechefKingdoms = useMemo(() => {
    const ccProblems = ALL_PROBLEMS.filter((p) => p.platform === 'codechef');

    return ALL_CATEGORIES.map((cat, idx) => {
      const kProblems = ccProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solvedCount = kProblems.filter((p) => isProblemChecked(p)).length;
      const totalCount = kProblems.length;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

      return {
        id: cat.slug,
        number: idx + 1,
        name: cat.title,
        topic: cat.title,
        description: cat.description,
        problems: kProblems,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: 600 + idx * 40,
      };
    });
  }, [isProblemChecked]);

  // ── 3. CODEFORCES DIVISIONS (4 Divisions) ────────────────────────
  const codeforcesDivisions = useMemo(() => {
    const cfProblems = ALL_PROBLEMS.filter((p) => p.platform === 'codeforces');

    return CODEFORCES_DIVISIONS.map((div, idx) => {
      const dProblems = cfProblems.filter((p) => div.filter(p));
      const solvedCount = dProblems.filter((p) => isProblemChecked(p)).length;
      const totalCount = dProblems.length;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

      return {
        id: div.id,
        number: idx + 1,
        name: div.title,
        topic: div.ratingRange,
        description: div.description,
        ratingRange: div.ratingRange,
        difficulty: div.difficulty,
        problems: dProblems,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: div.xpReward,
      };
    });
  }, [isProblemChecked]);

  // ── 4. GEEKSFORGEEKS LEARNING AREAS (25 Areas) ──────────────────────
  const geeksforgeeksKingdoms = useMemo(() => {
    const gfgProblems = ALL_PROBLEMS.filter((p) => p.platform === 'geeksforgeeks');

    return ALL_CATEGORIES.map((cat, idx) => {
      const kProblems = gfgProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solvedCount = kProblems.filter((p) => isProblemChecked(p)).length;
      const totalCount = kProblems.length;
      const isCompleted = totalCount > 0 && solvedCount >= totalCount;
      const progressPct = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

      return {
        id: cat.slug,
        number: idx + 1,
        name: cat.title,
        topic: cat.title,
        description: cat.description,
        problems: kProblems,
        solvedCount,
        totalCount,
        progressPct,
        isCompleted,
        xpReward: 500 + idx * 40,
      };
    });
  }, [isProblemChecked]);

  // ── Resolve Active Progression Node ──────────────────────────────
  const activeLeetcodeKingdom = useMemo(() => {
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      const found = leetcodeKingdoms.find((k) => k.id === selectedKingdomSlug);
      if (found) return found;
    }
    const currentUnfinished = leetcodeKingdoms.find((k) => !k.isCompleted);
    return currentUnfinished || leetcodeKingdoms[0];
  }, [leetcodeKingdoms, selectedKingdomSlug]);

  const activeCodechefKingdom = useMemo(() => {
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      const found = codechefKingdoms.find((k) => k.id === selectedKingdomSlug);
      if (found) return found;
    }
    const currentUnfinished = codechefKingdoms.find((k) => !k.isCompleted);
    return currentUnfinished || codechefKingdoms[0];
  }, [codechefKingdoms, selectedKingdomSlug]);

  const activeGeeksforgeeksKingdom = useMemo(() => {
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      const found = geeksforgeeksKingdoms.find((k) => k.id === selectedKingdomSlug);
      if (found) return found;
    }
    return geeksforgeeksKingdoms[0];
  }, [geeksforgeeksKingdoms, selectedKingdomSlug]);

  const activeCodeforcesDivision = useMemo(() => {
    if (selectedDivisionId && selectedDivisionId !== 'all') {
      const found = codeforcesDivisions.find((d) => d.id === selectedDivisionId);
      if (found) return found;
    }
    const currentUnfinished = codeforcesDivisions.find((d) => !d.isCompleted);
    return currentUnfinished || codeforcesDivisions[0];
  }, [codeforcesDivisions, selectedDivisionId]);

  // ── Platform-wide Problems Source ────────────────────────────────
  const currentPlatformMeta = useMemo(() => {
    return PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  }, [selectedPlatform]);

  const platformProblems = useMemo(() => {
    if (selectedPlatform === 'codechef') {
      return ALL_PROBLEMS.filter((p) => p.platform === 'codechef');
    }
    if (selectedPlatform === 'codeforces') {
      return ALL_PROBLEMS.filter((p) => p.platform === 'codeforces');
    }
    if (selectedPlatform === 'geeksforgeeks') {
      return ALL_PROBLEMS.filter((p) => p.platform === 'geeksforgeeks');
    }
    return ALL_PROBLEMS.filter((p) => p.platform === 'leetcode');
  }, [selectedPlatform]);

  // ── Scope Problems by Selected Learning Area / Division ──────────
  const scopedProblems = useMemo(() => {
    if (selectedPlatform === 'leetcode') {
      if (selectedKingdomSlug === 'all') return platformProblems;
      return activeLeetcodeKingdom?.problems || platformProblems;
    }
    if (selectedPlatform === 'codechef') {
      if (selectedKingdomSlug === 'all') return platformProblems;
      return activeCodechefKingdom?.problems || platformProblems;
    }
    if (selectedPlatform === 'geeksforgeeks') {
      if (selectedKingdomSlug === 'all') return platformProblems;
      return activeGeeksforgeeksKingdom?.problems || platformProblems;
    }
    if (selectedPlatform === 'codeforces') {
      let cfList = platformProblems;
      if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
        cfList = cfList.filter(
          (p) => p.categorySlug === selectedKingdomSlug || p.categoryId === selectedKingdomSlug
        );
      }
      if (selectedDivisionId && selectedDivisionId !== 'all') {
        const divObj = CODEFORCES_DIVISIONS.find((d) => d.id === selectedDivisionId);
        if (divObj) {
          cfList = cfList.filter(divObj.filter);
        }
      }
      return cfList;
    }
    return platformProblems;
  }, [
    selectedPlatform,
    selectedKingdomSlug,
    selectedDivisionId,
    activeLeetcodeKingdom,
    activeCodechefKingdom,
    activeGeeksforgeeksKingdom,
    platformProblems,
  ]);

  // ── Subtopic & Pattern Hierarchy Scope for Filters ───────────────
  const availableSubtopics = useMemo(() => {
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      return CurriculumRepository.getSubtopicsByCategory(selectedKingdomSlug);
    }
    return ALL_SUBTOPICS;
  }, [selectedKingdomSlug]);

  const availablePatterns = useMemo(() => {
    let patterns = ALL_PATTERNS;
    if (selectedKingdomSlug && selectedKingdomSlug !== 'all') {
      patterns = patterns.filter(
        (pat) => pat.categorySlug === selectedKingdomSlug || pat.categoryId === selectedKingdomSlug
      );
    }
    if (selectedSubtopicSlug && selectedSubtopicSlug !== 'all') {
      const sub = ALL_SUBTOPICS.find((s) => s.slug === selectedSubtopicSlug || s.id === selectedSubtopicSlug);
      if (sub) {
        patterns = patterns.filter((pat) => sub.patternIds.includes(pat.id) || pat.subtopicSlug === sub.slug);
      }
    }
    return patterns;
  }, [selectedKingdomSlug, selectedSubtopicSlug]);

  // ── Apply Secondary Filters (Search, Difficulty, Subtopic, Pattern, Status, Sort) ──
  const filteredProblems = useMemo(() => {
    let list = [...scopedProblems];

    // Search query
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          String(p.leetcodeNumber).includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q)) ||
          (p.categoryTitle && p.categoryTitle.toLowerCase().includes(q)) ||
          (p.subtopicTitle && p.subtopicTitle.toLowerCase().includes(q)) ||
          (p.patternTitle && p.patternTitle.toLowerCase().includes(q))
      );
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      list = list.filter((p) => {
        const diff = p.difficulty || (p.level === 'Learn' ? 'Easy' : p.level === 'Master' ? 'Hard' : 'Medium');
        return diff.toLowerCase() === difficultyFilter.toLowerCase();
      });
    }

    // Subtopic filter
    if (selectedSubtopicSlug && selectedSubtopicSlug !== 'all') {
      list = list.filter(
        (p) =>
          p.subtopicSlug === selectedSubtopicSlug ||
          p.subtopicId === selectedSubtopicSlug
      );
    }

    // Pattern filter
    if (patternFilter !== 'all') {
      list = list.filter(
        (p) =>
          p.categorySlug === patternFilter ||
          p.patternSlug === patternFilter ||
          p.categoryId === patternFilter ||
          p.patternTitle === patternFilter
      );
    }

    // Solved status filter
    if (statusFilter === 'solved') {
      list = list.filter((p) => isProblemChecked(p));
    } else if (statusFilter === 'unsolved') {
      list = list.filter((p) => !isProblemChecked(p));
    }

    // Sorting
    list.sort((a, b) => {
      if (sortBy === 'number') {
        return (a.leetcodeNumber || 0) - (b.leetcodeNumber || 0);
      }
      if (sortBy === 'xp') {
        return (b.xp || 50) - (a.xp || 50);
      }
      if (sortBy === 'difficulty') {
        const diffRank = (d: string) => (d === 'Hard' ? 3 : d === 'Medium' ? 2 : 1);
        return diffRank(b.difficulty || 'Medium') - diffRank(a.difficulty || 'Medium');
      }
      return (a.order || 0) - (b.order || 0);
    });

    return list;
  }, [scopedProblems, search, difficultyFilter, patternFilter, selectedSubtopicSlug, statusFilter, sortBy, isProblemChecked]);

  // Paginated problem slice
  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;

  // ── Real-Time Activity and Progress Telemetry ─────────────────────
  const [activityLogs, setActivityLogs] = useState<ActivityRecord[]>([]);

  useEffect(() => {
    setActivityLogs(progressService.getActivityLog(userId));
    const unsubscribe = EventBus.subscribe('ProblemSolved', () => {
      setActivityLogs(progressService.getActivityLog(userId));
    });
    return () => unsubscribe();
  }, [userId]);

  const totalPlatformSolved = useMemo(() => {
    return platformProblems.filter((p) => isProblemChecked(p)).length;
  }, [platformProblems, isProblemChecked]);

  const totalSolvedOverall = useMemo(() => {
    return ALL_PROBLEMS.filter((p) => isProblemChecked(p)).length;
  }, [isProblemChecked]);

  const totalAttempted = Math.max(totalSolvedOverall, activityLogs.length);
  const accuracyPct = totalAttempted > 0 ? Math.min(100, Math.round((totalSolvedOverall / totalAttempted) * 100)) : 0;
  const currentStreak = roadmapState?.currentStreak ?? 0;

  // ── Next Unsolved Problem for Current Progression Node ───────────
  const nextProgressionProblem = useMemo<ProblemModel | null>(() => {
    const unsolvedInNode = scopedProblems.find((p) => !isProblemChecked(p));
    return unsolvedInNode || scopedProblems[0] || null;
  }, [scopedProblems, isProblemChecked]);

  // ── Handle Toggle Solved Action ───────────────────────────────────
  const handleToggleSolved = (problem: ProblemModel) => {
    const isCurrentlySolved = isProblemChecked(problem);
    const platform = getPlatformId(problem);
    const canonicalId = `${platform}:${problem.id}`;

    if (isCurrentlySolved) {
      progressService.unmarkSolved(canonicalId, userId);
      if (problem.leetcodeNumber) {
        progressService.unmarkSolved(problem.leetcodeNumber, userId);
      }
      if (toggle && problem.leetcodeNumber) {
        toggle('completed', problem.leetcodeNumber);
      }
      toast(`Marked "${problem.title}" as unsolved`, 'info');
      return;
    }

    EventBus.publish('ProblemSolved', {
      id: `attempt_${Date.now()}_${problem.id}`,
      userId,
      problemId: canonicalId,
      leetcodeNumber: problem.leetcodeNumber || 0,
      platform,
      status: 'accepted',
      timestamp: new Date().toISOString(),
      durationSeconds: 0,
      xpEarned: problem.xp || 50,
      topic: problem.topics?.[0] || problem.categoryTitle || 'General',
      pattern: problem.patternTitle || 'General',
      difficulty: problem.difficulty || 'Medium',
    });

    if (toggle && problem.leetcodeNumber) {
      toggle('completed', problem.leetcodeNumber);
    }
    toast(`Solved "${problem.title}" (+${problem.xp || 50} XP)`, 'success');
  };

  // ── Pattern Mastery Data for Active Scope ─────────────────────────
  const patternMasteryList = useMemo(() => {
    const patternsInScope = selectedPlatform === 'codeforces'
      ? ALL_PATTERNS.slice(0, 8)
      : ALL_PATTERNS.filter((pat) => {
          const activeSlug = selectedPlatform === 'codechef' ? activeCodechefKingdom?.id : activeLeetcodeKingdom?.id;
          return pat.categorySlug === activeSlug || pat.categoryId === activeSlug;
        });

    const displayPatterns = patternsInScope.length > 0 ? patternsInScope : ALL_PATTERNS.slice(0, 6);

    return displayPatterns.map((pat) => {
      const pProblems = platformProblems.filter(
        (p) => p.patternSlug === pat.slug || p.patternTitle === pat.title || p.categorySlug === pat.categorySlug
      );
      const total = pProblems.length || 6;
      const solved = pProblems.filter((p) => isProblemChecked(p)).length;
      const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
      return {
        name: pat.title,
        solved,
        total,
        percentage: pct,
      };
    });
  }, [selectedPlatform, activeLeetcodeKingdom, activeCodechefKingdom, platformProblems, isProblemChecked]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '24px 32px 60px 32px',
        boxSizing: 'border-box',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. PAGE HEADER & REAL-TIME PLATFORM TELEMETRY ─────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          padding: '24px 28px',
          borderRadius: '20px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `${currentPlatformMeta.color}1A`,
                border: `1.5px solid ${currentPlatformMeta.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: currentPlatformMeta.color,
                flexShrink: 0,
              }}
            >
              <Swords size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Practice Arena
                </h1>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 900,
                    color: currentPlatformMeta.color,
                    background: `${currentPlatformMeta.color}18`,
                    border: `1px solid ${currentPlatformMeta.color}40`,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {currentPlatformMeta.label} • {currentPlatformMeta.tagline}
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500 }}>
                {selectedPlatform === 'codeforces'
                  ? 'Master rated competitive problem solving structured by division rating bands.'
                  : 'Master algorithmic problem solving structured by canonical DSA learning areas.'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Compact Real-Time Stat Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Platform Solved</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: currentPlatformMeta.color }}>
                {totalPlatformSolved}
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {platformProblems.length}</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Total Solved Overall</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: '#10B981' }}>{totalSolvedOverall}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {ALL_PROBLEMS.length}</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Accuracy Rate</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: currentPlatformMeta.color }}>{accuracyPct}%</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>acceptance</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Active Streak</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '20px', fontWeight: 900, color: '#F59E0B' }}>{currentStreak}d</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>consecutive</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. PLATFORM TABS & PROGRESSION CAROUSEL/SELECTOR ───────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '18px 24px',
          borderRadius: '16px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
        {/* Platform Selector Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Platform:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {PLATFORMS.map((p) => {
                const isSelected = selectedPlatform === p.id;

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSelectedPlatform(p.id);
                    }}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '10px',
                      background: isSelected
                        ? isLight ? `${p.color}15` : `${p.color}25`
                        : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected
                        ? `2px solid ${p.color}`
                        : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                      color: isSelected ? (isLight ? p.color : '#FFF') : 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: isSelected ? 900 : 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.15s ease',
                      boxShadow: isSelected ? `0 2px 10px ${p.color}25` : 'none',
                    }}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                    <span>{p.label}</span>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>({p.tagline})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Dropdown Jump for Learning Areas / Divisions */}
          {selectedPlatform === 'leetcode' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Jump Learning Area:</span>
              <select
                value={selectedKingdomSlug || activeLeetcodeKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
              >
                <option value="all">📚 All 25 Learning Areas ({platformProblems.length} problems)</option>
                {leetcodeKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} ({k.solvedCount}/{k.totalCount} solved)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPlatform === 'codechef' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Jump Learning Area:</span>
              <select
                value={selectedKingdomSlug || activeCodechefKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
              >
                <option value="all">📚 All 25 Learning Areas ({platformProblems.length} problems)</option>
                {codechefKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} ({k.solvedCount}/{k.totalCount} solved)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPlatform === 'geeksforgeeks' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Jump Learning Area:</span>
              <select
                value={selectedKingdomSlug || activeGeeksforgeeksKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
              >
                <option value="all">📚 All 25 Learning Areas (0 problems)</option>
                {geeksforgeeksKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} (0/0 solved)
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedPlatform === 'codeforces' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>Jump Division:</span>
              <select
                value={selectedDivisionId || activeCodeforcesDivision.id}
                onChange={(e) => setSelectedDivisionId(e.target.value)}
                style={selectControlSt}
              >
                <option value="all">🏆 All Divisions ({platformProblems.length} problems)</option>
                {codeforcesDivisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.solvedCount}/{d.totalCount} solved)
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Horizontal Quick-Selector Carousel of Progression Nodes */}
        {selectedPlatform === 'leetcode' && (
          <div
            ref={chipsScrollRef}
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'thin',
            }}
          >
            {leetcodeKingdoms.map((k) => {
              const isSelected = (selectedKingdomSlug || activeLeetcodeKingdom.id) === k.id;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => handleSelectKingdom(k.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: isSelected
                      ? isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.2)'
                      : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '1.5px solid #10B981'
                      : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? (isLight ? '#047857' : '#10B981') : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '10px', opacity: 0.7 }}>#{k.number < 10 ? `0${k.number}` : k.number}</span>
                  <span>{k.name}</span>
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: k.isCompleted ? 'rgba(16, 185, 129, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                      color: k.isCompleted ? '#10B981' : 'var(--text-muted)',
                      fontWeight: 800,
                    }}
                  >
                    {k.isCompleted ? '✓ 100%' : `${k.solvedCount}/${k.totalCount}`}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {selectedPlatform === 'codechef' && (
          <div
            ref={chipsScrollRef}
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'thin',
            }}
          >
            {codechefKingdoms.map((k) => {
              const isSelected = (selectedKingdomSlug || activeCodechefKingdom.id) === k.id;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => handleSelectKingdom(k.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: isSelected
                      ? isLight ? '#FFF7ED' : 'rgba(249, 115, 22, 0.2)'
                      : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '1.5px solid #F97316'
                      : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? (isLight ? '#C2410C' : '#F97316') : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '10px', opacity: 0.7 }}>#{k.number < 10 ? `0${k.number}` : k.number}</span>
                  <span>{k.name}</span>
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: k.isCompleted ? 'rgba(249, 115, 22, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                      color: k.isCompleted ? '#F97316' : 'var(--text-muted)',
                      fontWeight: 800,
                    }}
                  >
                    {k.isCompleted ? '✓ 100%' : `${k.solvedCount}/${k.totalCount}`}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {selectedPlatform === 'geeksforgeeks' && (
          <div
            ref={chipsScrollRef}
            style={{
              display: 'flex',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              scrollbarWidth: 'thin',
            }}
          >
            {geeksforgeeksKingdoms.map((k) => {
              const isSelected = (selectedKingdomSlug || activeGeeksforgeeksKingdom.id) === k.id;
              return (
                <button
                  key={k.id}
                  type="button"
                  onClick={() => handleSelectKingdom(k.id)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '10px',
                    background: isSelected
                      ? isLight ? '#F0FDF4' : 'rgba(47, 158, 68, 0.2)'
                      : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '1.5px solid #2F9E44'
                      : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? (isLight ? '#2F9E44' : '#40C057') : 'var(--text-secondary)',
                    fontSize: '11px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '10px', opacity: 0.7 }}>#{k.number < 10 ? `0${k.number}` : k.number}</span>
                  <span>{k.name}</span>
                  <span
                    style={{
                      fontSize: '9px',
                      padding: '1px 5px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-muted)',
                      fontWeight: 800,
                    }}
                  >
                    0/0
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {selectedPlatform === 'codeforces' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            {codeforcesDivisions.map((d) => {
              const isSelected = (selectedDivisionId || activeCodeforcesDivision.id) === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDivisionId(d.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: isSelected
                      ? isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.2)'
                      : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected
                      ? '2px solid #3B82F6'
                      : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '12px', color: isSelected ? '#3B82F6' : 'var(--text-primary)' }}>
                      {d.name}
                    </strong>
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 800,
                        color: d.isCompleted ? '#10B981' : '#3B82F6',
                        background: d.isCompleted ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                        padding: '1px 5px',
                        borderRadius: '4px',
                      }}
                    >
                      {d.isCompleted ? '✓ COMPLETED' : `${d.solvedCount} / ${d.totalCount}`}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{d.difficulty} • +{d.xpReward} XP</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Secondary Filter Controls Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', alignItems: 'center' }}>
          {/* Search */}
          <div style={{ position: 'relative', gridColumn: 'span 2' }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search problems by title, topic, #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '8px',
                background: 'var(--input-bg, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--input-border, rgba(255, 255, 255, 0.1))',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Subtopic */}
          <select
            aria-label="Filter by subtopic"
            value={selectedSubtopicSlug}
            onChange={(e) => handleSelectSubtopic(e.target.value)}
            style={selectControlSt}
          >
            <option value="all">Subtopic: All Subtopics</option>
            {availableSubtopics.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>

          {/* Difficulty */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            style={selectControlSt}
          >
            <option value="all">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Pattern */}
          <select
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            style={selectControlSt}
          >
            <option value="all">Pattern: All Patterns</option>
            {availablePatterns.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Solved Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={selectControlSt}
          >
            <option value="all">Status: All</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={selectControlSt}
          >
            <option value="order">Sort: Curriculum Order</option>
            <option value="number">Sort: Problem #</option>
            <option value="difficulty">Sort: Difficulty</option>
            <option value="xp">Sort: Highest XP</option>
          </select>
        </div>
      </div>

      {/* ── 3. MAIN 2-COLUMN TRAINING LAYOUT (72% / 28%) ───────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 320px',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT MAIN: ACTIVE PROGRESSION HERO & PROBLEM QUEUE ───── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
          
          {/* Active Learning Area / Division Progression Hero Banner */}
          {selectedPlatform !== 'geeksforgeeks' && (
            <div
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                background: isLight
                  ? `linear-gradient(135deg, #FFFFFF 0%, ${currentPlatformMeta.color}0A 60%, #F8FAFC 100%)`
                  : `linear-gradient(135deg, ${currentPlatformMeta.color}15 0%, var(--card) 100%)`,
                border: isLight ? `1.5px solid ${currentPlatformMeta.color}40` : `1.5px solid ${currentPlatformMeta.color}55`,
                boxShadow: isLight ? `0 8px 24px ${currentPlatformMeta.color}12` : `0 10px 30px rgba(0, 0, 0, 0.35)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${currentPlatformMeta.color}20`,
                      border: `1px solid ${currentPlatformMeta.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: currentPlatformMeta.color,
                      flexShrink: 0,
                    }}
                  >
                    <Trophy size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
                        {selectedPlatform === 'codeforces'
                          ? activeCodeforcesDivision.name
                          : selectedPlatform === 'codechef'
                          ? `${activeCodechefKingdom.number}. ${activeCodechefKingdom.name}`
                          : `${activeLeetcodeKingdom.number}. ${activeLeetcodeKingdom.name}`}
                      </strong>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          color: currentPlatformMeta.color,
                          background: `${currentPlatformMeta.color}18`,
                          padding: '2px 8px',
                          borderRadius: '6px',
                        }}
                      >
                        {selectedPlatform === 'codeforces'
                          ? activeCodeforcesDivision.topic
                          : selectedPlatform === 'codechef'
                          ? activeCodechefKingdom.topic
                          : activeLeetcodeKingdom.topic}
                      </span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                      {selectedPlatform === 'codeforces'
                        ? activeCodeforcesDivision.description
                        : selectedPlatform === 'codechef'
                        ? activeCodechefKingdom.description
                        : activeLeetcodeKingdom.description}
                    </span>
                  </div>
                </div>

                {/* Continue Node Action Buttons */}
                {nextProgressionProblem && (() => {
                  const nextMeta = getPlatformMeta(nextProgressionProblem);
                  return (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <Link
                        href={`/practice/${nextProgressionProblem.slug || nextProgressionProblem.id}`}
                        style={{
                          padding: '10px 18px',
                          borderRadius: '10px',
                          background: currentPlatformMeta.color,
                          border: 'none',
                          color: '#FFF',
                          fontSize: '12px',
                          fontWeight: 900,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          textDecoration: 'none',
                          boxShadow: `0 4px 14px ${currentPlatformMeta.color}40`,
                        }}
                      >
                        <Code2 size={15} />
                        <span>
                          {selectedPlatform === 'codeforces'
                            ? 'Solve Division'
                            : 'Solve Area'}
                        </span>
                        <ArrowRight size={14} />
                      </Link>

                      <a
                        href={nextMeta.canonicalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                          border: `1.5px solid ${nextMeta.color}66`,
                          color: nextMeta.color,
                          fontSize: '12px',
                          fontWeight: 800,
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>Open {nextMeta.name}</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  );
                })()}
              </div>

              {/* Progress Track Gauge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Progression Mastery</span>
                  <strong style={{ color: currentPlatformMeta.color }}>
                    {selectedPlatform === 'codeforces'
                      ? `${activeCodeforcesDivision.solvedCount} / ${activeCodeforcesDivision.totalCount} Solved (${activeCodeforcesDivision.progressPct}%)`
                      : selectedPlatform === 'codechef'
                      ? `${activeCodechefKingdom.solvedCount} / ${activeCodechefKingdom.totalCount} Solved (${activeCodechefKingdom.progressPct}%)`
                      : `${activeLeetcodeKingdom.solvedCount} / ${activeLeetcodeKingdom.totalCount} Solved (${activeLeetcodeKingdom.progressPct}%)`}
                  </strong>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${
                        selectedPlatform === 'codeforces'
                          ? activeCodeforcesDivision.progressPct
                          : selectedPlatform === 'codechef'
                          ? activeCodechefKingdom.progressPct
                          : activeLeetcodeKingdom.progressPct
                      }%`,
                      height: '100%',
                      background: currentPlatformMeta.color,
                      borderRadius: '3px',
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Locked GeeksForGeeks Banner */}
          {selectedPlatform === 'geeksforgeeks' && (
            <div
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                border: isLight ? '1.5px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.08)',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Lock size={28} style={{ color: '#F59E0B' }} />
              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>GeeksForGeeks Integration In Progress</strong>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', maxWidth: '460px' }}>
                Curriculums, company tags, and practice arenas for GeeksForGeeks are currently being provisioned and will unlock in the upcoming release.
              </p>
            </div>
          )}

          {/* Problem Queue Section */}
          <div
            style={{
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '22px',
              boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.04)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Problem Queue
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Showing {filteredProblems.length} available problems in{' '}
                  <strong style={{ color: currentPlatformMeta.color }}>
                    {selectedPlatform === 'codeforces'
                      ? activeCodeforcesDivision.name
                      : selectedPlatform === 'codechef'
                      ? activeCodechefKingdom.name
                      : selectedPlatform === 'geeksforgeeks'
                      ? activeGeeksforgeeksKingdom.name
                      : activeLeetcodeKingdom.name}
                  </strong>
                </span>
              </div>

              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
                Page {currentPage} of {totalPages}
              </span>
            </div>

            {/* Problem Cards Table List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {paginatedProblems.map((prob) => {
                const isSolved = isProblemChecked(prob);
                const platformMeta = getPlatformMeta(prob);
                const diffColor =
                  (prob.difficulty || prob.level || 'Medium').toLowerCase() === 'easy' || prob.level === 'Learn'
                    ? '#10B981'
                    : (prob.difficulty || prob.level || '').toLowerCase() === 'hard' || prob.level === 'Master'
                    ? '#EF4444'
                    : '#F59E0B';

                return (
                  <div
                    key={prob.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isSolved
                        ? isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.05)'
                        : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                      border: isSolved
                        ? isLight ? '1px solid #BBF7D0' : '1px solid rgba(16, 185, 129, 0.25)'
                        : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                      gap: '12px',
                      flexWrap: 'wrap',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {/* Left: Checkbox + Number + Title + Platform/Pattern info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px', flex: '1 1 300px' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleSolved(prob)}
                        aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '6px',
                          background: isSolved ? '#10B981' : isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                          border: isSolved ? '1px solid #10B981' : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF',
                          cursor: 'pointer',
                          flexShrink: 0,
                          outline: 'none',
                        }}
                      >
                        {isSolved && <Check size={12} strokeWidth={3} />}
                      </button>

                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 800, width: '64px', flexShrink: 0 }}>
                        {getProblemNumber(prob)}
                      </span>

                      <div style={{ minWidth: 0, flex: 1 }}>
                        <Link
                          href={`/practice/${prob.slug || prob.id}`}
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: isSolved ? 'var(--text-secondary)' : 'var(--text-primary)',
                            textDecoration: 'none',
                            display: 'block',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {prob.title}
                        </Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                          <span style={{ color: platformMeta.color, fontWeight: 700 }}>
                            {platformMeta.name}
                          </span>
                          <span>•</span>
                          <span>{prob.categoryTitle || 'General'}</span>
                          <span>•</span>
                          <span>{prob.patternTitle || 'Algorithmic Pattern'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Difficulty + XP + Action Group */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 800,
                          color: diffColor,
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: `${diffColor}14`,
                        }}
                      >
                        {prob.difficulty || (prob.level === 'Learn' ? 'Easy' : prob.level === 'Master' ? 'Hard' : 'Medium')}
                      </span>

                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B' }}>
                        +{prob.xp || 50} XP
                      </span>

                      {/* Action Group: Solve Here (Internal IDE) + External Platform Link */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Link
                          href={`/practice/${prob.slug || prob.id}`}
                          title={`Solve ${prob.title} inside DSA MASTER`}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '8px',
                            background: isSolved
                              ? isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.12)'
                              : isLight ? 'var(--surface-secondary, #F1F5F9)' : 'rgba(255, 255, 255, 0.06)',
                            border: isSolved
                              ? '1px solid #10B981'
                              : isLight ? '1px solid var(--border)' : '1px solid rgba(255, 255, 255, 0.12)',
                            color: isSolved ? '#10B981' : 'var(--text-primary)',
                            fontSize: '11px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <Code2 size={12} />
                          <span>{isSolved ? 'View Problem' : 'Solve Here'}</span>
                        </Link>

                        <a
                          href={platformMeta.canonicalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Open original problem on ${platformMeta.name}`}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            background: isLight ? `${platformMeta.color}10` : `${platformMeta.color}18`,
                            border: `1px solid ${platformMeta.color}40`,
                            color: platformMeta.color,
                            fontSize: '11px',
                            fontWeight: 800,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          <span>{platformMeta.buttonLabel}</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}

              {paginatedProblems.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                    {selectedPlatform === 'geeksforgeeks'
                      ? `No mapped problems yet for GeeksForGeeks in ${activeGeeksforgeeksKingdom?.name || 'this Learning Area'}.`
                      : 'No problems match the current filter criteria.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch('');
                      setDifficultyFilter('all');
                      setPatternFilter('all');
                      setSelectedSubtopicSlug('all');
                      setStatusFilter('all');
                    }}
                    style={{
                      marginTop: '12px',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: 'var(--surface-secondary, rgba(255, 255, 255, 0.08))',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px', borderTop: '1px solid var(--border)', paddingTop: '14px' }}>
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  style={paginationBtnSt(currentPage === 1)}
                >
                  <ChevronLeft size={14} /> Previous
                </button>

                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  style={paginationBtnSt(currentPage === totalPages)}
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT SUPPORTING TRAINING PANEL (28%) ─────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Current Campaign Summary Card */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={16} style={{ color: currentPlatformMeta.color }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                {selectedPlatform === 'codeforces' ? 'Division Ranking' : 'Learning Area Progression'}
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {selectedPlatform === 'codeforces'
                ? `You are currently in ${activeCodeforcesDivision.name}. Master each rating tier to elevate your contest rating.`
                : selectedPlatform === 'geeksforgeeks'
                ? `You are exploring ${activeGeeksforgeeksKingdom.name}. Mapped GeeksForGeeks problems will appear here.`
                : `You are exploring ${selectedPlatform === 'codechef' ? activeCodechefKingdom.name : activeLeetcodeKingdom.name}. Master all 25 learning areas in sequential progression.`}
            </p>
          </div>

          {/* Pattern Mastery Breakdown */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Pattern Mastery</strong>
              <span style={{ fontSize: '10px', color: currentPlatformMeta.color, fontWeight: 800 }}>LIVE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {patternMasteryList.map((pm) => (
                <div key={pm.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{pm.name}</span>
                    <strong style={{ color: 'var(--text-muted)' }}>{pm.solved}/{pm.total} ({pm.percentage}%)</strong>
                  </div>
                  <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${pm.percentage}%`, height: '100%', background: currentPlatformMeta.color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak Boost & Rewards */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} style={{ color: '#F59E0B' }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Streak Boost (1.2x Active)</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Total XP Multiplier:</span>
              <strong style={{ color: '#10B981' }}>+20% bonus</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Active Streak:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{currentStreak} Days</strong>
            </div>
          </div>

          {/* Recent Solves Activity Log */}
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Recent Activity</strong>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {activityLogs.slice(0, 4).map((act) => (
                <div
                  key={act.id}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '8px',
                    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '11px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize' }}>{act.action}</strong>
                    <span style={{ color: '#10B981', fontWeight: 800 }}>+{act.xpEarned} XP</span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                    {new Date(act.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {activityLogs.length === 0 && (
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No recent activity records yet.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statTileSt = (isLight: boolean): React.CSSProperties => ({
  padding: '14px 16px',
  borderRadius: '12px',
  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const selectControlSt: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: '8px',
  background: 'var(--input-bg, rgba(255, 255, 255, 0.04))',
  border: '1px solid var(--input-border, rgba(255, 255, 255, 0.1))',
  color: 'var(--text-primary, #FFF)',
  fontSize: '12px',
  outline: 'none',
  cursor: 'pointer',
};

const paginationBtnSt = (disabled: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  borderRadius: '8px',
  background: disabled ? 'var(--muted-bg, rgba(255, 255, 255, 0.02))' : 'var(--surface-secondary, rgba(255, 255, 255, 0.06))',
  border: '1px solid var(--border, rgba(255, 255, 255, 0.1))',
  color: disabled ? 'var(--text-muted, #64748B)' : 'var(--text-primary, #FFF)',
  fontSize: '12px',
  fontWeight: 700,
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
});

