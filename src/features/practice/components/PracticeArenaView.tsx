'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Swords,
  CheckCircle2,
  Check,
  Zap,
  ChevronRight,
  Trophy,
  Sparkles,
  Flame,
  Clock,
  Target,
  Code2,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  RotateCcw,
  AlertTriangle,
  Shuffle,
  Play,
  History,
  Brain,
  CheckCircle,
  HelpCircle,
  X,
  FastForward,
  CalendarCheck,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getPlatformMeta } from '@/src/curriculum/services';
import { ProblemModel } from '@/src/curriculum/types';
import { useRoadmap } from '@/hooks/use-roadmap';
import { EventBus } from '@/src/core/events/event-bus';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { progressService, ActivityRecord } from '@/src/services/progress/progress.service';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';
import {
  PracticeEngineService,
  PracticeMode,
  RecommendedProblemItem,
  PracticeSession,
  MistakeReviewItem,
  WeakAreaItem,
  PracticeHistoryItem,
} from '../services/practice-engine.service';

import { PracticeWorkspaceHeader } from './PracticeWorkspaceHeader';
import { PracticeModeNav } from './PracticeModeNav';
import { PracticeFilterToolbar } from './PracticeFilterToolbar';
import { RecommendedHeroCard } from './RecommendedHeroCard';
import { ProblemTableList } from './ProblemTableList';

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
  if (problem.url?.includes('codeforces.com')) {
    return problem.id.replace(/^cf-/, '').toUpperCase();
  }
  if (problem.url?.includes('codechef.com')) {
    return problem.id.replace(/^cc-/, '').toUpperCase();
  }
  if (problem.url?.includes('geeksforgeeks.org')) {
    return problem.id.replace(/^gfg-/, '').toUpperCase();
  }
  if (problem.leetcodeNumber && problem.leetcodeNumber < 90000) {
    return `#${problem.leetcodeNumber}`;
  }
  return problem.id.toUpperCase();
}

function getPlatformId(problem: ProblemModel): PlatformId {
  if (problem.url?.includes('codechef.com')) return 'codechef';
  if (problem.url?.includes('codeforces.com')) return 'codeforces';
  if (problem.url?.includes('geeksforgeeks.org')) return 'geeksforgeeks';
  return 'leetcode';
}

export function PracticeArenaView({ defaultPlatform }: { defaultPlatform?: PlatformId }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ── Read Query Parameters ─────────────────────────────────────────
  const paramMode = searchParams?.get('mode') as PracticeMode | null;
  const initialPlatform = (searchParams?.get('platform') as PlatformId) || defaultPlatform || 'leetcode';
  const initialAreaParam = searchParams?.get('area') || searchParams?.get('kingdom') || null;
  const initialSubtopicParam = searchParams?.get('subtopic') || 'all';
  const initialDivision = searchParams?.get('division') || null;
  const initialPattern = searchParams?.get('pattern') || 'all';
  const initialDifficulty = (searchParams?.get('difficulty') as 'all' | 'Easy' | 'Medium' | 'Hard') || 'all';
  const initialStatus = (searchParams?.get('status') as 'all' | 'unsolved' | 'solved') || 'all';
  const initialSearch = searchParams?.get('search') || '';

  // Topic parameter fallback
  const topicParam = searchParams?.get('topic');
  const resolvedInitialArea = useMemo(() => {
    const raw = initialAreaParam || topicParam;
    if (!raw) return null;
    const cat = CurriculumRepository.getCategoryBySlug(raw);
    return cat ? cat.slug : raw;
  }, [initialAreaParam, topicParam]);

  // Determine initial active mode
  const initialMode: PracticeMode = useMemo(() => {
    if (paramMode) return paramMode;
    if (initialAreaParam || topicParam) return 'area';
    if (initialSubtopicParam && initialSubtopicParam !== 'all') return 'subtopic';
    if (initialPattern && initialPattern !== 'all') return 'pattern';
    if (searchParams?.get('platform')) return 'platform';
    return 'recommended';
  }, [paramMode, initialAreaParam, topicParam, initialSubtopicParam, initialPattern, searchParams]);

  const { state: roadmapState, toggle } = useRoadmap();
  const { userId } = useActiveUser();
  const { toast } = useToast();
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  // ── Practice Mode State ───────────────────────────────────────────
  const [activeMode, setActiveMode] = useState<PracticeMode>(initialMode);

  // ── Solved sets from canonical progress service & roadmap hook ───
  const completedNumbersSet = useMemo(() => {
    return new Set<number>(roadmapState?.completed ?? []);
  }, [roadmapState?.completed]);

  const completedIdsSet = useMemo(() => {
    return new Set<string>(roadmapState?.completedProblemIds ?? []);
  }, [roadmapState?.completedProblemIds]);

  const isProblemChecked = useCallback((problem: ProblemModel): boolean => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // ── Active Practice Session State ────────────────────────────────
  const [activeSession, setActiveSession] = useState<PracticeSession | null>(() => {
    return PracticeEngineService.loadActiveSession(userId);
  });

  // ── Next Problem Feedback State ──────────────────────────────────
  const [nextFeedback, setNextFeedback] = useState<{
    solvedProblem: ProblemModel;
    verdict: string;
    xpEarned: number;
    nextProblem: ProblemModel | null;
    whyReason: string;
  } | null>(null);

  // ── Random Problem Generator State ───────────────────────────────
  const [randomProblem, setRandomProblem] = useState<ProblemModel | null>(null);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeMode,
    selectedPlatform,
    selectedKingdomSlug,
    selectedSubtopicSlug,
    selectedDivisionId,
    search,
    difficultyFilter,
    patternFilter,
    statusFilter,
  ]);

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
      const mode = (params.get('mode') as PracticeMode) || 'recommended';
      const plat = (params.get('platform') as PlatformId) || defaultPlatform || 'leetcode';
      const rawArea = params.get('area') || params.get('kingdom') || params.get('topic') || null;
      const area = rawArea ? (CurriculumRepository.getCategoryBySlug(rawArea)?.slug || rawArea) : null;
      const sub = params.get('subtopic') || 'all';
      const pat = params.get('pattern') || 'all';
      const diff = (params.get('difficulty') as 'all' | 'Easy' | 'Medium' | 'Hard') || 'all';
      const stat = (params.get('status') as 'all' | 'unsolved' | 'solved') || 'all';
      const q = params.get('search') || '';
      const div = params.get('division') || null;

      setActiveMode(mode);
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
    if (activeMode) {
      params.set('mode', activeMode);
    }
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
    activeMode,
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

  // ── Platform Progression Buckets (All 25 Learning Areas) ──────────
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

  // Active progression nodes
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
    const currentUnfinished = geeksforgeeksKingdoms.find((k) => !k.isCompleted);
    return currentUnfinished || geeksforgeeksKingdoms[0];
  }, [geeksforgeeksKingdoms, selectedKingdomSlug]);

  const activeCodeforcesDivision = useMemo(() => {
    if (selectedDivisionId && selectedDivisionId !== 'all') {
      const found = codeforcesDivisions.find((d) => d.id === selectedDivisionId);
      if (found) return found;
    }
    const currentUnfinished = codeforcesDivisions.find((d) => !d.isCompleted);
    return currentUnfinished || codeforcesDivisions[0];
  }, [codeforcesDivisions, selectedDivisionId]);

  // Platform meta & problem pool
  const currentPlatformMeta = useMemo(() => {
    return PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[0];
  }, [selectedPlatform]);

  const platformProblems = useMemo(() => {
    if (selectedPlatform === 'codechef') return ALL_PROBLEMS.filter((p) => p.platform === 'codechef');
    if (selectedPlatform === 'codeforces') return ALL_PROBLEMS.filter((p) => p.platform === 'codeforces');
    if (selectedPlatform === 'geeksforgeeks') return ALL_PROBLEMS.filter((p) => p.platform === 'geeksforgeeks');
    return ALL_PROBLEMS.filter((p) => p.platform === 'leetcode');
  }, [selectedPlatform]);

  // ── Scoped Problems by Active Learning Area ───────────────────────
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
        if (divObj) cfList = cfList.filter(divObj.filter);
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

  // ── Hierarchy Scope for Filters ──────────────────────────────────
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

  // ── 1. RECOMMENDED MODE QUEUE ─────────────────────────────────────
  const recommendedItems = useMemo<RecommendedProblemItem[]>(() => {
    if (activeMode !== 'recommended') return [];
    return PracticeEngineService.getRecommendedProblems(userId, {
      platform: selectedPlatform,
      targetTopic: selectedKingdomSlug || undefined,
      limit: 30,
    });
  }, [activeMode, userId, selectedPlatform, selectedKingdomSlug]);

  // ── 2. MISTAKE REVIEW MODE ────────────────────────────────────────
  const mistakeReviewItems = useMemo<MistakeReviewItem[]>(() => {
    if (activeMode !== 'mistakes') return [];
    return PracticeEngineService.getMistakeReviewProblems(userId);
  }, [activeMode, userId]);

  // ── 3. WEAK AREAS MODE ────────────────────────────────────────────
  const weakAreasResult = useMemo(() => {
    if (activeMode !== 'weakness') return { isZeroState: false, weakAreas: [] };
    return PracticeEngineService.getWeakAreas(userId);
  }, [activeMode, userId]);

  // ── 4. PRACTICE HISTORY MODE ──────────────────────────────────────
  const practiceHistoryItems = useMemo<PracticeHistoryItem[]>(() => {
    if (activeMode !== 'history') return [];
    return PracticeEngineService.getPracticeHistory(userId);
  }, [activeMode, userId]);

  // ── Filtered Standard Problems Pool ───────────────────────────────
  const filteredProblems = useMemo(() => {
    let list = [...scopedProblems];

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

    if (difficultyFilter !== 'all') {
      list = list.filter((p) => {
        const diff = p.difficulty || (p.level === 'Learn' ? 'Easy' : p.level === 'Master' ? 'Hard' : 'Medium');
        return diff.toLowerCase() === difficultyFilter.toLowerCase();
      });
    }

    if (selectedSubtopicSlug && selectedSubtopicSlug !== 'all') {
      list = list.filter(
        (p) =>
          p.subtopicSlug === selectedSubtopicSlug ||
          p.subtopicId === selectedSubtopicSlug
      );
    }

    if (patternFilter !== 'all') {
      list = list.filter(
        (p) =>
          p.categorySlug === patternFilter ||
          p.patternSlug === patternFilter ||
          p.categoryId === patternFilter ||
          p.patternTitle === patternFilter
      );
    }

    if (statusFilter !== 'all') {
      list = list.filter((p) => {
        const isSolved = isProblemChecked(p);
        return statusFilter === 'solved' ? isSolved : !isSolved;
      });
    }

    return list;
  }, [scopedProblems, search, difficultyFilter, patternFilter, selectedSubtopicSlug, statusFilter, isProblemChecked]);

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

  // ── Session Generation Handlers ──────────────────────────────────
  const handleStartSession = (count: number) => {
    const session = PracticeEngineService.generatePracticeSession(userId, count as 5 | 10 | 20, {
      mode: activeMode,
      area: selectedKingdomSlug || undefined,
      subtopic: selectedSubtopicSlug !== 'all' ? selectedSubtopicSlug : undefined,
      pattern: patternFilter !== 'all' ? patternFilter : undefined,
      platform: selectedPlatform,
      difficulty: difficultyFilter !== 'all' ? difficultyFilter : undefined,
    });
    setActiveSession(session);
    toast(`Started ${count}-problem practice session!`, 'success');
  };

  const handleEndSession = () => {
    PracticeEngineService.saveActiveSession(userId, null);
    setActiveSession(null);
    toast('Practice session ended.', 'info');
  };

  const handleAdvanceSession = (action: 'solved' | 'skipped', problemId: string) => {
    const updated = PracticeEngineService.advanceActiveSession(userId, action, problemId);
    setActiveSession(updated);
    if (updated?.status === 'completed') {
      toast('🎉 Practice Session Completed!', 'success');
    }
  };

  // ── Problem Solved Toggle & Aftermath ─────────────────────────────
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

    // Execute submission result pipeline
    const { xpEarned, nextRecommendation } = PracticeEngineService.recordProblemResult(
      userId,
      problem,
      'Accepted',
      35,
      60
    );

    if (toggle && problem.leetcodeNumber) {
      toggle('completed', problem.leetcodeNumber);
    }

    // Resolve next problem preview
    const nextProb = ALL_PROBLEMS.find((p) => p.id === nextRecommendation.targetProblemId) ||
      PracticeEngineService.getRandomProblem(userId, { platform: selectedPlatform });

    setNextFeedback({
      solvedProblem: problem,
      verdict: 'Accepted',
      xpEarned,
      nextProblem: nextProb,
      whyReason: nextRecommendation.explanation,
    });

    // Sync session state if active session is running
    if (activeSession && activeSession.status === 'active') {
      const updated = PracticeEngineService.loadActiveSession(userId);
      setActiveSession(updated);
      if (updated?.status === 'completed') {
        toast('🎉 Practice Session Completed!', 'success');
      }
    }

    toast(`Solved "${problem.title}" (+${xpEarned} XP)`, 'success');
  };

  // ── Random Problem Roll ───────────────────────────────────────────
  const handleRollRandom = () => {
    const prob = PracticeEngineService.getRandomProblem(userId, {
      platform: selectedPlatform !== 'leetcode' ? selectedPlatform : undefined,
      area: selectedKingdomSlug || undefined,
      difficulty: difficultyFilter !== 'all' ? difficultyFilter : undefined,
    });
    setRandomProblem(prob);
  };

  // ── Reset All Filters Handler ─────────────────────────────────────
  const handleResetFilters = useCallback(() => {
    setSearch('');
    setSelectedSubtopicSlug('all');
    setPatternFilter('all');
    setDifficultyFilter('all');
    setStatusFilter('all');
  }, []);

  // ── Open Workspace Handler ────────────────────────────────────────
  const handleOpenWorkspace = useCallback((prob: ProblemModel) => {
    router.push(`/practice/${prob.slug || prob.id}`);
  }, [router]);

  // ── Navigation Areas & Divisions Data ─────────────────────────────
  const areasForNav = useMemo(() => {
    const currentKingdoms =
      selectedPlatform === 'codechef'
        ? codechefKingdoms
        : selectedPlatform === 'codeforces'
        ? leetcodeKingdoms
        : selectedPlatform === 'geeksforgeeks'
        ? geeksforgeeksKingdoms
        : leetcodeKingdoms;
    return currentKingdoms.map((k) => ({
      id: k.id,
      name: k.name,
      number: k.number,
      solvedCount: k.solvedCount,
      totalCount: k.totalCount,
    }));
  }, [selectedPlatform, codechefKingdoms, geeksforgeeksKingdoms, leetcodeKingdoms]);

  const divisionsForNav = useMemo(() => {
    return codeforcesDivisions.map((d) => ({
      id: d.id,
      name: d.name,
      solvedCount: d.solvedCount,
      totalCount: d.totalCount,
    }));
  }, [codeforcesDivisions]);

  // ── Active Breadcrumb Context ─────────────────────────────────────
  const activeContext = useMemo(() => {
    const areaObj = selectedKingdomSlug && selectedKingdomSlug !== 'all'
      ? ALL_CATEGORIES.find((c) => c.slug === selectedKingdomSlug || c.id === selectedKingdomSlug)
      : null;
    const subObj = selectedSubtopicSlug && selectedSubtopicSlug !== 'all'
      ? ALL_SUBTOPICS.find((s) => s.slug === selectedSubtopicSlug || s.id === selectedSubtopicSlug)
      : null;
    const patObj = patternFilter && patternFilter !== 'all'
      ? ALL_PATTERNS.find((p) => p.slug === patternFilter || p.id === patternFilter)
      : null;
    return {
      areaTitle: areaObj?.title,
      subtopicTitle: subObj?.title,
      patternTitle: patObj?.title,
    };
  }, [selectedKingdomSlug, selectedSubtopicSlug, patternFilter]);

  // ── Pattern Mastery Data for Active Scope ─────────────────────────
  const patternMasteryList = useMemo(() => {
    const patternsInScope = selectedPlatform === 'codeforces'
      ? ALL_PATTERNS.slice(0, 8)
      : ALL_PATTERNS.filter((pat) => {
          const activeSlug =
            selectedPlatform === 'codechef'
              ? activeCodechefKingdom?.id
              : selectedPlatform === 'geeksforgeeks'
              ? activeGeeksforgeeksKingdom?.id
              : activeLeetcodeKingdom?.id;
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
  }, [selectedPlatform, activeLeetcodeKingdom, activeCodechefKingdom, activeGeeksforgeeksKingdom, platformProblems, isProblemChecked]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 box-border overflow-x-hidden transition-colors">
      {/* ── 1. WORKSPACE HEADER & TELEMETRY ──────────────────────────── */}
      <PracticeWorkspaceHeader
        totalPlatformSolved={totalPlatformSolved}
        totalPlatformProblems={platformProblems.length}
        totalSolvedOverall={totalSolvedOverall}
        totalProblemsOverall={ALL_PROBLEMS.length}
        accuracyPct={accuracyPct}
        currentStreak={currentStreak}
        currentPlatformName={currentPlatformMeta.label}
        currentPlatformColor={currentPlatformMeta.color}
        activeContext={activeContext}
        onStartSession={handleStartSession}
      />

      {/* ── 2. ACTIVE SESSION HUD (If Session Running) ──────────────── */}
      {activeSession && (
        <div
          data-testid="active-session-hud"
          className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-[var(--surface-elevated)] border-2 border-[var(--accent)] shadow-md transition-all"
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--accent)] text-[var(--text-inverse)] flex items-center justify-center shrink-0">
                <Play size={16} />
              </div>
              <div>
                <strong className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                  {activeSession.title}
                </strong>
                <span className="text-xs text-[var(--text-secondary)] block">
                  {activeSession.status === 'completed'
                    ? '🎉 Session Completed!'
                    : `Problem ${activeSession.currentIndex + 1} of ${activeSession.problemCount} • ${activeSession.completedProblemIds.length} solved`}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {activeSession.status !== 'completed' && activeSession.problems[activeSession.currentIndex] && (
                <>
                  <button
                    type="button"
                    onClick={() => handleToggleSolved(activeSession.problems[activeSession.currentIndex])}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-xs"
                  >
                    <Check size={14} />
                    <span>Mark Solved & Next</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdvanceSession('skipped', activeSession.problems[activeSession.currentIndex].id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  >
                    <FastForward size={13} />
                    <span>Skip</span>
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={handleEndSession}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-transparent border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
              >
                End Session
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300"
              style={{
                width: `${Math.round((activeSession.completedProblemIds.length / activeSession.problemCount) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* ── 3. POST-SUBMISSION / NEXT PROBLEM MODAL HUD ───────────── */}
      {nextFeedback && (
        <div
          data-testid="next-problem-hud"
          className="flex flex-col gap-3 p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 shadow-md transition-all"
        >
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle size={18} />
              </div>
              <div>
                <strong className="text-sm sm:text-base font-bold text-emerald-400">
                  {nextFeedback.verdict}! (+{nextFeedback.xpEarned} XP)
                </strong>
                <span className="text-xs text-[var(--text-secondary)] block">
                  Solved &ldquo;{nextFeedback.solvedProblem.title}&rdquo; • Pattern: {nextFeedback.solvedProblem.patternTitle || 'Algorithmic Pattern'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNextFeedback(null)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              aria-label="Dismiss feedback"
            >
              <X size={16} />
            </button>
          </div>

          {nextFeedback.nextProblem && (
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex-wrap">
              <div>
                <span className="text-[11px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                  Next Recommended Problem:
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {nextFeedback.nextProblem.title}
                  </strong>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[var(--accent-subtle)] text-[var(--accent)]">
                    {nextFeedback.nextProblem.difficulty || 'Medium'}
                  </span>
                </div>
                <span className="text-xs text-[var(--text-muted)] italic block mt-0.5">
                  Why this problem? &ldquo;{nextFeedback.whyReason}&rdquo;
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleToggleSolved(nextFeedback.nextProblem!)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-all cursor-pointer shadow-xs"
                >
                  <Check size={13} />
                  <span>Solve Next Problem</span>
                </button>
                {nextFeedback.nextProblem.url && (
                  <a
                    href={nextFeedback.nextProblem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all"
                  >
                    <span>Open Platform</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 4. PRACTICE MODES NAVIGATION BAR & PLATFORM TABS ────────── */}
      <PracticeModeNav
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        selectedPlatform={selectedPlatform}
        onSelectPlatform={setSelectedPlatform}
        areas={areasForNav}
        selectedAreaId={selectedKingdomSlug}
        onSelectArea={handleSelectKingdom}
        divisions={selectedPlatform === 'codeforces' ? divisionsForNav : undefined}
        selectedDivisionId={selectedDivisionId}
        onSelectDivision={setSelectedDivisionId}
        totalPlatformProblems={platformProblems.length}
      />

      {/* ── 5. FILTER TOOLBAR ────────────────────────────────────────── */}
      <PracticeFilterToolbar
        search={search}
        onSearchChange={setSearch}
        subtopic={selectedSubtopicSlug || 'all'}
        onSubtopicChange={handleSelectSubtopic}
        availableSubtopics={availableSubtopics}
        pattern={patternFilter || 'all'}
        onPatternChange={setPatternFilter}
        availablePatterns={availablePatterns}
        difficulty={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        status={statusFilter}
        onStatusChange={setStatusFilter}
        onResetFilters={handleResetFilters}
      />

      {/* ── 6. MAIN CONTENT AREA (BY ACTIVE MODE) ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-6 items-start">
        {/* ── LEFT MAIN PANEL: CONTENT BY MODE ──────────────────────── */}
        <div className="flex flex-col gap-5 min-w-0">

          {/* ═══════════════ MODE: RECOMMENDED ═══════════════ */}
          {activeMode === 'recommended' && (
            <div data-testid="recommended-mode-container" className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <Sparkles size={16} className="text-[var(--accent)]" />
                    Recommended Problem Queue
                  </h2>
                  <p className="text-xs text-[var(--text-muted)]">
                    Ranked by active roadmap signals, weakness analysis, retention decay, and difficulty readiness.
                  </p>
                </div>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Showing top {recommendedItems.length} curated matches
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {recommendedItems.map((item, idx) => (
                  <RecommendedHeroCard
                    key={item.id}
                    item={item}
                    isFeatured={idx === 0}
                    isSolved={isProblemChecked(item.problem)}
                    onToggleSolved={handleToggleSolved}
                    onOpenWorkspace={handleOpenWorkspace}
                    getProblemNumber={getProblemNumber}
                  />
                ))}

                {recommendedItems.length === 0 && (
                  <div className="text-center p-10 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)]">
                    <p className="text-sm font-semibold">
                      All recommended problems in this scope are solved! Try another learning area or start a sprint session.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════ MODES: AREA / PLATFORM / SUBTOPIC / PATTERN ═══════════════ */}
          {(activeMode === 'area' || activeMode === 'platform' || activeMode === 'subtopic' || activeMode === 'pattern') && (
            <div className="flex flex-col gap-4">
              <ProblemTableList
                problems={paginatedProblems}
                totalFiltered={filteredProblems.length}
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setCurrentPage}
                isProblemChecked={isProblemChecked}
                onToggleSolved={handleToggleSolved}
                onOpenWorkspace={handleOpenWorkspace}
                getProblemNumber={getProblemNumber}
                onResetFilters={handleResetFilters}
                platformColor={currentPlatformMeta.color}
                platformName={currentPlatformMeta.label}
              />
            </div>
          )}

          {/* ═══════════════ MODE: MISTAKE REVIEW ═══════════════ */}
          {activeMode === 'mistakes' && (
            <div data-testid="mistake-review-container" className="flex flex-col gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <AlertTriangle size={16} className="text-rose-500" />
                  Mistake Review & Error Intelligence
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Targeted remediation for problems with non-accepted verdicts, edge case failures, and repeated struggles.
                </p>
              </div>

              {mistakeReviewItems.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <CheckCircle2 size={32} className="text-emerald-500 mx-auto mb-2.5" />
                  <strong className="text-base font-bold text-[var(--text-primary)] block">
                    Zero Active Mistakes!
                  </strong>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    You have no outstanding mistake signals. Continue practicing in Recommended mode to maintain mastery.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {mistakeReviewItems.map((item) => (
                    <div
                      key={item.problem.id}
                      data-testid="mistake-item-card"
                      className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5"
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="text-[10px] font-mono font-bold text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded-md">
                          {item.category === 'repeated' ? `Repeated Struggle (${item.failedAttemptsCount} fails)` : 'Recent Attempt'}
                        </span>
                        <span className="text-xs text-[var(--text-muted)]">
                          Last verdict: <strong className="text-rose-400">{item.lastVerdict || 'Wrong Answer'}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div>
                          <strong className="text-sm font-bold text-[var(--text-primary)] block">
                            {item.problem.title}
                          </strong>
                          <span className="text-xs text-[var(--text-muted)] block mt-0.5">
                            {item.problem.categoryTitle} • Pattern: {item.problem.patternTitle || 'Algorithmic Pattern'}
                          </span>
                          <span className="text-xs text-[var(--text-secondary)] italic block mt-0.5">
                            {item.reason}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenWorkspace(item.problem)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--text-inverse)] text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
                          >
                            <Code2 size={13} />
                            <span>Debug in Workspace</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleSolved(item.problem)}
                            className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold hover:bg-rose-600 transition-all cursor-pointer"
                          >
                            Mark Fixed
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ MODE: WEAK AREAS ═══════════════ */}
          {activeMode === 'weakness' && (
            <div data-testid="weak-areas-container" className="flex flex-col gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Brain size={16} className="text-amber-400" />
                  Weak Areas & Skill Gaps
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Performance-backed diagnosis of topics and patterns where your accuracy or speed needs reinforcement.
                </p>
              </div>

              {weakAreasResult.isZeroState ? (
                <div className="p-10 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <Sparkles size={32} className="text-[var(--accent)] mx-auto mb-2.5" />
                  <strong className="text-base font-bold text-[var(--text-primary)] block">
                    Authentic Baseline Initial State
                  </strong>
                  <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mt-1">
                    No critical weakness data recorded yet. Solve problems in Recommended mode or take the onboarding diagnostic assessment to reveal algorithmic gaps.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {weakAreasResult.weakAreas.map((w) => (
                    <div
                      key={w.topicId}
                      data-testid="weak-area-card"
                      className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5"
                    >
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <strong className="text-sm font-bold text-[var(--text-primary)]">{w.topicTitle}</strong>
                        <span className="text-xs font-mono font-bold text-rose-400">
                          Accuracy: {w.accuracyPercent}% (Weakness Score: {w.weaknessScore}/100)
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        Subtopic: {w.subtopicTitle} • Pattern: {w.patternTitle}
                      </span>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {w.reason}
                      </p>

                      {w.recommendedProblem && (
                        <div className="flex justify-between items-center mt-1 pt-2 border-t border-[var(--border)] flex-wrap gap-2">
                          <span className="text-xs text-[var(--text-muted)]">
                            Recommended Next: <strong>{w.recommendedProblem.title}</strong> ({w.recommendedDifficulty})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenWorkspace(w.recommendedProblem!)}
                            className="px-3 py-1 rounded-lg bg-amber-500 text-slate-900 text-xs font-bold hover:bg-amber-400 transition-all cursor-pointer shadow-xs"
                          >
                            Reinforce Now
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ MODE: INTERVIEW PRACTICE ═══════════════ */}
          {activeMode === 'interview' && (
            <div data-testid="interview-practice-container" className="flex flex-col gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Trophy size={16} className="text-purple-400" />
                  Technical Mock Interview Session
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Standard interview set combining Array, Trees, Graphs, and DP patterns under realistic conditions.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400">
                  <Clock size={24} />
                </div>
                <strong className="text-base font-bold text-[var(--text-primary)]">
                  Start 45-Minute Timed Mock Interview
                </strong>
                <p className="text-xs text-[var(--text-muted)] max-w-md">
                  A balanced 5-problem session simulating top tier engineering interviews (1 Easy warm-up + 3 Medium core + 1 Hard bonus).
                </p>
                <div className="flex items-center gap-3 flex-wrap justify-center mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      const session = PracticeEngineService.generateInterviewSession(userId);
                      setActiveSession(session);
                      toast('Started 5-problem mock interview session!', 'success');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-all cursor-pointer shadow-xs"
                    data-testid="start-mock-interview-btn"
                  >
                    Generate & Start Interview Set
                  </button>

                  <Link
                    href="/interview"
                    data-testid="launch-interview-arena-btn"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all shadow-xs"
                  >
                    <Trophy size={14} />
                    <span>Launch Interview Arena 2.0 Simulator ›</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════ MODE: RANDOM ═══════════════ */}
          {activeMode === 'random' && (
            <div data-testid="random-mode-container" className="flex flex-col gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Shuffle size={16} className="text-pink-400" />
                  Surprise Me: Random Problem Generator
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Pick an unseen challenge across our 4,000 problem database matching your current difficulty preferences.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/25 flex items-center justify-center text-pink-400">
                  <Shuffle size={24} />
                </div>
                <strong className="text-base font-bold text-[var(--text-primary)]">
                  Instant Problem Lottery
                </strong>
                <p className="text-xs text-[var(--text-muted)] max-w-sm">
                  Test your spontaneous problem recognition and algorithmic intuition without knowing the category beforehand.
                </p>

                <button
                  type="button"
                  onClick={handleRollRandom}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-500 transition-all cursor-pointer shadow-xs mt-1"
                  data-testid="roll-random-btn"
                >
                  <Shuffle size={14} />
                  <span>Roll Random Problem</span>
                </button>

                {randomProblem && (
                  <div
                    data-testid="random-problem-result"
                    className="mt-3 p-4 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] w-full max-w-md text-left flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-[var(--text-muted)]">
                        {getProblemNumber(randomProblem)}
                      </span>
                      <span className="text-xs font-mono font-bold text-pink-400">
                        {randomProblem.difficulty || 'Medium'}
                      </span>
                    </div>
                    <strong className="text-sm font-bold text-[var(--text-primary)]">
                      {randomProblem.title}
                    </strong>
                    <span className="text-xs text-[var(--text-muted)]">
                      {randomProblem.categoryTitle} • {randomProblem.patternTitle || 'Algorithmic Pattern'}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenWorkspace(randomProblem)}
                        className="flex-1 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--text-inverse)] text-xs font-bold hover:brightness-110 transition-all cursor-pointer text-center"
                      >
                        Solve in Workspace
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleSolved(randomProblem)}
                        className="py-1.5 px-3 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all cursor-pointer"
                      >
                        Mark Solved
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════ MODE: HISTORY ═══════════════ */}
          {activeMode === 'history' && (
            <div data-testid="practice-history-container" className="flex flex-col gap-4">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <History size={16} className="text-sky-400" />
                  Practice History & Solved Ledger
                </h2>
                <p className="text-xs text-[var(--text-muted)]">
                  Chronological record of attempts, accepted submissions, and completed practice sprints.
                </p>
              </div>

              {practiceHistoryItems.length === 0 ? (
                <div className="p-10 text-center rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
                  <History size={32} className="text-[var(--text-muted)] mx-auto mb-2.5" />
                  <strong className="text-base font-bold text-[var(--text-primary)] block">
                    No Practice Records Yet
                  </strong>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Begin practicing problems to populate your chronological solve history.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {practiceHistoryItems.slice(0, 30).map((h) => (
                    <div
                      key={h.id}
                      data-testid="history-item-row"
                      className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between flex-wrap gap-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${
                            h.status === 'accepted' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        >
                          {h.status === 'accepted' ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />}
                        </div>
                        <div>
                          <strong className="text-xs font-semibold text-[var(--text-primary)] block">
                            {h.title}
                          </strong>
                          <span className="text-[11px] text-[var(--text-muted)]">
                            {h.platform} • {h.difficulty} • {h.durationSeconds ? `${h.durationSeconds}s` : 'Quick'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-emerald-400 font-semibold">
                          +{h.xpEarned || 0} XP
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">
                          {new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* ── RIGHT SUPPORTING TRAINING SIDEBAR (300px) ──────────────── */}
        <div className="flex flex-col gap-4">

          {/* Quick Sprint Card */}
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5 shadow-xs">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              <strong className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Instant Session Sprint
              </strong>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Kick off a focused session with coherent difficulty progression.
            </p>
            <div className="grid grid-cols-3 gap-1.5 mt-1">
              <button
                type="button"
                onClick={() => handleStartSession(5)}
                className="py-1.5 px-2 rounded-lg text-xs font-semibold bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-emerald-500 hover:text-emerald-400 transition-all cursor-pointer text-center"
              >
                5 Problems
              </button>
              <button
                type="button"
                onClick={() => handleStartSession(10)}
                className="py-1.5 px-2 rounded-lg text-xs font-semibold bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-sky-500 hover:text-sky-400 transition-all cursor-pointer text-center"
              >
                10 Problems
              </button>
              <button
                type="button"
                onClick={() => handleStartSession(20)}
                className="py-1.5 px-2 rounded-lg text-xs font-semibold bg-[var(--surface-elevated)] border border-[var(--border)] text-[var(--text-primary)] hover:border-purple-500 hover:text-purple-400 transition-all cursor-pointer text-center"
              >
                20 Problems
              </button>
            </div>
          </div>

          {/* Pattern Mastery Breakdown */}
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <strong className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Pattern Mastery
              </strong>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                LIVE
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {patternMasteryList.map((pm) => (
                <div key={pm.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[var(--text-secondary)] truncate max-w-[170px]">{pm.name}</span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      {pm.solved}/{pm.total} ({pm.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--bg-subtle)] overflow-hidden">
                    <div
                      className="h-full transition-all duration-300 rounded-full"
                      style={{
                        width: `${pm.percentage}%`,
                        backgroundColor: currentPlatformMeta.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Solves Activity Log */}
          <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5 shadow-xs">
            <strong className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
              Recent Solves
            </strong>

            <div className="flex flex-col gap-2">
              {activityLogs.slice(0, 4).map((act) => (
                <div
                  key={act.id}
                  className="p-2.5 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border)] text-xs flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <strong className="text-[var(--text-primary)] capitalize truncate max-w-[180px]">
                      {act.action}
                    </strong>
                    <span className="font-mono text-[11px] text-emerald-400 font-bold">
                      +{act.xpEarned} XP
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {new Date(act.timestamp).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              ))}

              {activityLogs.length === 0 && (
                <span className="text-xs text-[var(--text-muted)] italic">
                  No recent activity records yet.
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
