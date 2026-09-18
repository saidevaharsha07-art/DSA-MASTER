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
  AlertTriangle,
  Shuffle,
  Play,
  History,
  TrendingUp,
  Brain,
  CheckCircle,
  HelpCircle,
  X,
  FastForward,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getPlatformMeta } from '@/src/curriculum/services';
import { ProblemModel, ProgressionLevel, FrequencyLevel } from '@/src/curriculum/types';
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

// ── Practice Mode Navigation Options ────────────────────────────────
const PRACTICE_MODES: { id: PracticeMode; label: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'recommended', label: 'Recommended', icon: <Sparkles size={14} />, badge: 'AI' },
  { id: 'area', label: 'By Learning Area', icon: <BookOpen size={14} /> },
  { id: 'subtopic', label: 'By Subtopic', icon: <Layers size={14} /> },
  { id: 'pattern', label: 'By Pattern', icon: <Target size={14} /> },
  { id: 'platform', label: 'By Platform', icon: <Swords size={14} /> },
  { id: 'mistakes', label: 'Mistake Review', icon: <AlertTriangle size={14} />, badge: 'Fix' },
  { id: 'weakness', label: 'Weak Areas', icon: <Brain size={14} />, badge: 'Boost' },
  { id: 'interview', label: 'Interview Practice', icon: <Trophy size={14} />, badge: 'Mock' },
  { id: 'random', label: 'Random', icon: <Shuffle size={14} /> },
  { id: 'history', label: 'History', icon: <History size={14} /> },
];

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
  if (problem.url.includes('geeksforgeeks.org')) {
    return problem.id.replace(/^gfg-/, '').toUpperCase();
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

  // Topic parameter fallback (e.g. from adaptive recommendation deep-links)
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
  const isLight = settings.appearance.theme === 'light';

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
  const [sortBy, setSortBy] = useState<'order' | 'number' | 'difficulty' | 'xp'>('order');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  const chipsScrollRef = useRef<HTMLDivElement>(null);

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
    sortBy,
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

    if (statusFilter === 'solved') {
      list = list.filter((p) => isProblemChecked(p));
    } else if (statusFilter === 'unsolved') {
      list = list.filter((p) => !isProblemChecked(p));
    }

    list.sort((a, b) => {
      if (sortBy === 'number') return (a.leetcodeNumber || 0) - (b.leetcodeNumber || 0);
      if (sortBy === 'xp') return (b.xp || 50) - (a.xp || 50);
      if (sortBy === 'difficulty') {
        const diffRank = (d: string) => (d === 'Hard' ? 3 : d === 'Medium' ? 2 : 1);
        return diffRank(b.difficulty || 'Medium') - diffRank(a.difficulty || 'Medium');
      }
      return (a.order || 0) - (b.order || 0);
    });

    return list;
  }, [scopedProblems, search, difficultyFilter, patternFilter, selectedSubtopicSlug, statusFilter, sortBy, isProblemChecked]);

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

  // ── Session Generation Handlers ──────────────────────────────────
  const handleStartSession = (count: 5 | 10 | 20) => {
    const session = PracticeEngineService.generatePracticeSession(userId, count, {
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '100%',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '20px 24px 60px 24px',
        boxSizing: 'border-box',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease',
        overflowX: 'hidden',
      }}
    >
      {/* ── 1. PAGE HEADER & STATS ─────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '20px 24px',
          borderRadius: '16px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Practice Arena 2.0
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
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: '#10B981',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  4,000 Canonical Problems
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, display: 'block', marginTop: '2px' }}>
                Central adaptive practice engine answering: <em style={{ color: 'var(--text-primary)' }}>“What should I solve right now?”</em>
              </span>
            </div>
          </div>

          {/* Quick Session Launchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Sprint Session:
            </span>
            <button
              type="button"
              onClick={() => handleStartSession(5)}
              style={sprintBtnStyle(isLight, '#10B981')}
              aria-label="Start 5 problem session"
            >
              <Zap size={13} />
              <span>5 Problems</span>
            </button>
            <button
              type="button"
              onClick={() => handleStartSession(10)}
              style={sprintBtnStyle(isLight, '#3B82F6')}
              aria-label="Start 10 problem session"
            >
              <Play size={13} />
              <span>10 Problems</span>
            </button>
            <button
              type="button"
              onClick={() => handleStartSession(20)}
              style={sprintBtnStyle(isLight, '#8B5CF6')}
              aria-label="Start 20 problem session"
            >
              <Flame size={13} />
              <span>20 Problems</span>
            </button>
          </div>
        </div>

        {/* 4 Real-Time Stat Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Platform Solved</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '18px', fontWeight: 900, color: currentPlatformMeta.color }}>
                {totalPlatformSolved}
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {platformProblems.length}</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Total Solved Overall</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '18px', fontWeight: 900, color: '#10B981' }}>{totalSolvedOverall}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>/ {ALL_PROBLEMS.length}</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Accuracy Rate</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '18px', fontWeight: 900, color: currentPlatformMeta.color }}>{accuracyPct}%</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>acceptance</span>
            </div>
          </div>

          <div style={statTileSt(isLight)}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Active Streak</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
              <strong style={{ fontSize: '18px', fontWeight: 900, color: '#F59E0B' }}>{currentStreak}d</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>consecutive</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. ACTIVE SESSION HUD (If Session Running) ──────────────── */}
      {activeSession && (
        <div
          data-testid="active-session-hud"
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            background: isLight ? 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 100%)' : 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, var(--card) 100%)',
            border: isLight ? '1.5px solid #BFDBFE' : '1.5px solid rgba(59, 130, 246, 0.4)',
            boxShadow: '0 8px 24px rgba(59, 130, 246, 0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#3B82F6',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Play size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{activeSession.title}</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                  {activeSession.status === 'completed'
                    ? '🎉 Session Completed!'
                    : `Problem ${activeSession.currentIndex + 1} of ${activeSession.problemCount} • ${activeSession.completedProblemIds.length} solved`}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {activeSession.status !== 'completed' && activeSession.problems[activeSession.currentIndex] && (
                <>
                  <button
                    type="button"
                    onClick={() => handleToggleSolved(activeSession.problems[activeSession.currentIndex])}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: '#10B981',
                      border: 'none',
                      color: '#FFF',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <Check size={13} /> Mark Solved & Next
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAdvanceSession('skipped', activeSession.problems[activeSession.currentIndex].id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <FastForward size={13} /> Skip
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={handleEndSession}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                End Session
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#DBEAFE' : 'rgba(255, 255, 255, 0.1)', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.round((activeSession.completedProblemIds.length / activeSession.problemCount) * 100)}%`,
                height: '100%',
                background: '#3B82F6',
                borderRadius: '3px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>
      )}

      {/* ── 3. POST-SUBMISSION / NEXT PROBLEM MODAL HUD ───────────── */}
      {nextFeedback && (
        <div
          data-testid="next-problem-hud"
          style={{
            padding: '16px 20px',
            borderRadius: '14px',
            background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.12)',
            border: '1.5px solid #10B981',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: '#10B981',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <CheckCircle size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '14px', color: '#10B981' }}>
                  {nextFeedback.verdict}! (+{nextFeedback.xpEarned} XP)
                </strong>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>
                  Solved “{nextFeedback.solvedProblem.title}” • Pattern: {nextFeedback.solvedProblem.patternTitle || 'Algorithmic Pattern'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNextFeedback(null)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              aria-label="Dismiss feedback"
            >
              <X size={16} />
            </button>
          </div>

          {nextFeedback.nextProblem && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '10px',
                background: isLight ? '#FFFFFF' : 'var(--card)',
                border: '1px solid var(--border)',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>Next Recommended Problem:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                    {nextFeedback.nextProblem.title}
                  </strong>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: '#3B82F6',
                      background: 'rgba(59, 130, 246, 0.15)',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {nextFeedback.nextProblem.difficulty || 'Medium'}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>
                  Why this problem? “{nextFeedback.whyReason}”
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => {
                    handleToggleSolved(nextFeedback.nextProblem!);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#10B981',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={13} /> Solve Next Problem
                </button>
                <a
                  href={nextFeedback.nextProblem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Open Platform</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 4. PRACTICE MODES NAVIGATION BAR (9 MODES) ─────────────── */}
      <div
        data-testid="practice-modes-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          borderRadius: '14px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          boxShadow: isLight ? '0 4px 14px rgba(0, 0, 0, 0.03)' : 'none',
        }}
      >
        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', marginRight: '4px', flexShrink: 0 }}>
          Mode:
        </span>
        {PRACTICE_MODES.map((m) => {
          const isSelected = activeMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveMode(m.id)}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: isSelected
                  ? isLight ? '#3B82F615' : 'rgba(59, 130, 246, 0.25)'
                  : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                border: isSelected
                  ? '2px solid #3B82F6'
                  : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                color: isSelected ? (isLight ? '#2563EB' : '#FFF') : 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: isSelected ? 900 : 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
              data-testid={`mode-tab-${m.id}`}
            >
              {m.icon}
              <span>{m.label}</span>
              {m.badge && (
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 900,
                    padding: '1px 5px',
                    borderRadius: '4px',
                    background: isSelected ? '#3B82F6' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)',
                    color: isSelected ? '#FFF' : 'var(--text-muted)',
                  }}
                >
                  {m.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── 5. PLATFORM SELECTION TABS & QUICK PROGRESSION ─────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          padding: '16px 20px',
          borderRadius: '16px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 6px 20px rgba(0, 0, 0, 0.04)' : 'none',
        }}
      >
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
                    onClick={() => setSelectedPlatform(p.id)}
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
                    data-testid={`platform-tab-${p.id}`}
                  >
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                    <span>{p.label}</span>
                    <span style={{ fontSize: '10px', opacity: 0.8 }}>(1,000)</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Dropdown Jump for Learning Areas / Divisions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              {selectedPlatform === 'codeforces' ? 'Division:' : 'Learning Area:'}
            </span>
            {selectedPlatform === 'leetcode' && (
              <select
                value={selectedKingdomSlug || activeLeetcodeKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
                data-testid="area-select"
              >
                <option value="all">📚 All 25 Learning Areas ({platformProblems.length} problems)</option>
                {leetcodeKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} ({k.solvedCount}/{k.totalCount} solved)
                  </option>
                ))}
              </select>
            )}

            {selectedPlatform === 'codechef' && (
              <select
                value={selectedKingdomSlug || activeCodechefKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
                data-testid="area-select"
              >
                <option value="all">📚 All 25 Learning Areas ({platformProblems.length} problems)</option>
                {codechefKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} ({k.solvedCount}/{k.totalCount} solved)
                  </option>
                ))}
              </select>
            )}

            {selectedPlatform === 'geeksforgeeks' && (
              <select
                value={selectedKingdomSlug || activeGeeksforgeeksKingdom.id}
                onChange={(e) => handleSelectKingdom(e.target.value)}
                style={selectControlSt}
                data-testid="area-select"
              >
                <option value="all">📚 All 25 Learning Areas ({platformProblems.length} problems)</option>
                {geeksforgeeksKingdoms.map((k) => (
                  <option key={k.id} value={k.id}>
                    {k.number}. {k.name} ({k.solvedCount}/{k.totalCount} solved)
                  </option>
                ))}
              </select>
            )}

            {selectedPlatform === 'codeforces' && (
              <select
                value={selectedDivisionId || activeCodeforcesDivision.id}
                onChange={(e) => setSelectedDivisionId(e.target.value)}
                style={selectControlSt}
                data-testid="division-select"
              >
                <option value="all">🏆 All Divisions ({platformProblems.length} problems)</option>
                {codeforcesDivisions.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.solvedCount}/{d.totalCount} solved)
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Secondary Filter Matrix */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          {/* Search box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '6px 12px', border: '1px solid var(--border)', flex: '1 1 200px' }}>
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by title, pattern, topic, or #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', fontSize: '12px', outline: 'none', width: '100%' }}
              data-testid="search-input"
            />
          </div>

          {/* Subtopic Filter */}
          <select
            aria-label="Filter by subtopic"
            value={selectedSubtopicSlug}
            onChange={(e) => handleSelectSubtopic(e.target.value)}
            style={selectControlSt}
            data-testid="subtopic-select"
          >
            <option value="all">Subtopic: All Subtopics</option>
            {availableSubtopics.map((s) => (
              <option key={s.id} value={s.slug || s.id}>
                {s.title}
              </option>
            ))}
          </select>

          {/* Pattern Filter */}
          <select
            aria-label="Filter by pattern"
            value={patternFilter}
            onChange={(e) => setPatternFilter(e.target.value)}
            style={selectControlSt}
            data-testid="pattern-select"
          >
            <option value="all">Pattern: All Patterns</option>
            {availablePatterns.map((p) => (
              <option key={p.id} value={p.slug || p.id}>
                {p.title}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            style={selectControlSt}
            data-testid="difficulty-select"
          >
            <option value="all">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={selectControlSt}
            data-testid="status-select"
          >
            <option value="all">Status: All</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      {/* ── 6. MAIN CONTENT AREA (BY ACTIVE MODE) ───────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '20px',
          alignItems: 'start',
        }}
      >
        {/* ── LEFT MAIN PANEL: CONTENT BY MODE ──────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', minWidth: 0 }}>

          {/* ═══════════════ MODE: RECOMMENDED ═══════════════ */}
          {activeMode === 'recommended' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="recommended-mode-container">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} style={{ color: '#3B82F6' }} />
                    Recommended Problem Queue
                  </h2>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Ranked by active roadmap signals, weakness analysis, retention decay, and difficulty readiness.
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Showing top {recommendedItems.length} curated matches
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recommendedItems.map((item, idx) => {
                  const prob = item.problem;
                  const isSolved = isProblemChecked(prob);
                  const platMeta = getPlatformMeta(prob);
                  const diffColor =
                    item.targetDifficulty === 'Easy' ? '#10B981' : item.targetDifficulty === 'Hard' ? '#EF4444' : '#F59E0B';

                  return (
                    <div
                      key={item.id}
                      data-testid="recommended-problem-card"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: '16px 18px',
                        borderRadius: '14px',
                        background: isLight ? '#FFFFFF' : 'var(--card)',
                        border: idx === 0
                          ? '2px solid #3B82F6'
                          : isLight ? '1px solid #E2E8F0' : '1px solid var(--border)',
                        boxShadow: idx === 0
                          ? '0 6px 20px rgba(59, 130, 246, 0.15)'
                          : isLight ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {/* Top Row: Priority Badge + Reason Callout */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 900,
                              color: '#3B82F6',
                              background: 'rgba(59, 130, 246, 0.15)',
                              padding: '2px 8px',
                              borderRadius: '6px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.04em',
                            }}
                          >
                            {item.badge}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 800,
                              color: item.priority === 'Critical' ? '#EF4444' : item.priority === 'High' ? '#F97316' : '#64748B',
                            }}
                          >
                            {item.priority} Priority
                          </span>
                        </div>

                        {/* Explainable Why This Problem badge */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                          <HelpCircle size={13} style={{ color: '#3B82F6' }} />
                          <span data-testid="why-this-problem" style={{ fontWeight: 600 }}>
                            {item.whyThisProblem}
                          </span>
                        </div>
                      </div>

                      {/* Main Problem Details */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px', flex: '1 1 300px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleSolved(prob)}
                            aria-label={isSolved ? 'Mark as unsolved' : 'Mark as solved'}
                            style={{
                              width: '22px',
                              height: '22px',
                              borderRadius: '6px',
                              background: isSolved ? '#10B981' : isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                              border: isSolved ? '1px solid #10B981' : isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.2)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#FFF',
                              cursor: 'pointer',
                              flexShrink: 0,
                            }}
                          >
                            {isSolved && <Check size={13} strokeWidth={3} />}
                          </button>

                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 800, width: '64px', flexShrink: 0 }}>
                            {getProblemNumber(prob)}
                          </span>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>
                              {prob.title}
                            </strong>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '11px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                              <span style={{ color: platMeta.color, fontWeight: 700 }}>
                                {platMeta.name}
                              </span>
                              <span>•</span>
                              <span>{prob.categoryTitle || 'General'}</span>
                              <span>•</span>
                              <span>{prob.patternTitle || 'Algorithmic Pattern'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right: Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
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
                            {item.targetDifficulty}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#F59E0B' }}>
                            +{prob.xp || 50} XP
                          </span>

                          <button
                            type="button"
                            onClick={() => handleToggleSolved(prob)}
                            style={{
                              padding: '6px 14px',
                              borderRadius: '8px',
                              background: isSolved ? 'rgba(16, 185, 129, 0.15)' : '#3B82F6',
                              border: isSolved ? '1px solid #10B981' : 'none',
                              color: isSolved ? '#10B981' : '#FFF',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            <Code2 size={12} />
                            <span>{isSolved ? 'Solved' : 'Solve Here'}</span>
                          </button>

                          <a
                            href={prob.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              padding: '6px 10px',
                              borderRadius: '8px',
                              background: isLight ? `${platMeta.color}10` : `${platMeta.color}18`,
                              border: `1px solid ${platMeta.color}40`,
                              color: platMeta.color,
                              fontSize: '11px',
                              fontWeight: 800,
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <span>Open</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {recommendedItems.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                      All recommended problems in this scope are solved! Try another learning area or start a sprint session.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════ MODE: MISTAKE REVIEW ═══════════════ */}
          {activeMode === 'mistakes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="mistake-review-container">
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} style={{ color: '#EF4444' }} />
                  Mistake Review & Error Intelligence
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Targeted remediation for problems with non-accepted verdicts, edge case failures, and repeated struggles.
                </span>
              </div>

              {mistakeReviewItems.length === 0 ? (
                <div style={{ padding: '36px', textAlign: 'center', borderRadius: '14px', background: isLight ? '#FFFFFF' : 'var(--card)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={32} style={{ color: '#10B981', margin: '0 auto 10px auto' }} />
                  <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Zero Active Mistakes!</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                    You have no outstanding mistake signals. Continue practicing in Recommended mode to maintain mastery.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {mistakeReviewItems.map((item) => (
                    <div
                      key={item.problem.id}
                      data-testid="mistake-item-card"
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: isLight ? '#FFFFFF' : 'var(--card)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#EF4444', background: 'rgba(239, 68, 68, 0.12)', padding: '2px 8px', borderRadius: '6px' }}>
                          {item.category === 'repeated' ? `Repeated Struggle (${item.failedAttemptsCount} fails)` : 'Recent Attempt'}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          Last verdict: <strong style={{ color: '#EF4444' }}>{item.lastVerdict || 'Wrong Answer'}</strong>
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{item.problem.title}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block' }}>
                            {item.problem.categoryTitle} • Pattern: {item.problem.patternTitle || 'Algorithmic Pattern'}
                          </span>
                          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', display: 'block', marginTop: '2px' }}>
                            {item.reason}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleSolved(item.problem)}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            background: '#EF4444',
                            border: 'none',
                            color: '#FFF',
                            fontSize: '12px',
                            fontWeight: 800,
                            cursor: 'pointer',
                          }}
                        >
                          Debug & Retry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ MODE: WEAK AREAS ═══════════════ */}
          {activeMode === 'weakness' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="weak-areas-container">
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Brain size={16} style={{ color: '#F59E0B' }} />
                  Weak Areas & Skill Gaps
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Performance-backed diagnosis of topics and patterns where your accuracy or speed needs reinforcement.
                </span>
              </div>

              {weakAreasResult.isZeroState ? (
                <div style={{ padding: '36px', textAlign: 'center', borderRadius: '14px', background: isLight ? '#FFFFFF' : 'var(--card)', border: '1px solid var(--border)' }}>
                  <Sparkles size={32} style={{ color: '#3B82F6', margin: '0 auto 10px auto' }} />
                  <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>Authentic Baseline Initial State</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)', maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto' }}>
                    No critical weakness data recorded yet. Solve problems in Recommended mode or take the onboarding diagnostic assessment to reveal algorithmic gaps.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {weakAreasResult.weakAreas.map((w) => (
                    <div
                      key={w.topicId}
                      data-testid="weak-area-card"
                      style={{
                        padding: '16px',
                        borderRadius: '12px',
                        background: isLight ? '#FFFFFF' : 'var(--card)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{w.topicTitle}</strong>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#EF4444' }}>
                          Accuracy: {w.accuracyPercent}% (Weakness Score: {w.weaknessScore}/100)
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        Subtopic: {w.subtopicTitle} • Pattern: {w.patternTitle}
                      </span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {w.reason}
                      </p>

                      {w.recommendedProblem && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                            Recommended Next: <strong>{w.recommendedProblem.title}</strong> ({w.recommendedDifficulty})
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleSolved(w.recommendedProblem!)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: '#F59E0B',
                              border: 'none',
                              color: '#FFF',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer',
                            }}
                          >
                            Practice Problem
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="interview-practice-container">
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Trophy size={16} style={{ color: '#8B5CF6' }} />
                  Technical Mock Interview Session
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Standard interview set combining Array, Trees, Graphs, and DP patterns under realistic conditions.
                </span>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: isLight ? '#FAF5FF' : 'rgba(139, 92, 246, 0.1)',
                  border: isLight ? '1.5px solid #E9D5FF' : '1.5px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <Clock size={32} style={{ color: '#8B5CF6' }} />
                <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>Start 45-Minute Timed Mock Interview</strong>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', maxWidth: '420px' }}>
                  A balanced 5-problem session simulating top tier engineering interviews (1 Easy warm-up + 3 Medium core + 1 Hard bonus).
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const session = PracticeEngineService.generateInterviewSession(userId);
                    setActiveSession(session);
                    toast('Started 5-problem mock interview session!', 'success');
                  }}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: '#8B5CF6',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
                  }}
                  data-testid="start-mock-interview-btn"
                >
                  Generate & Start Interview Set
                </button>

                <Link
                  href="/interview"
                  data-testid="launch-interview-arena-btn"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: '#06B6D4',
                    color: '#020617',
                    fontSize: '13px',
                    fontWeight: 900,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)',
                  }}
                >
                  <Trophy size={14} />
                  <span>Launch Interview Arena 2.0 Simulator ›</span>
                </Link>
              </div>
            </div>
          )}

          {/* ═══════════════ MODE: RANDOM ═══════════════ */}
          {activeMode === 'random' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="random-mode-container">
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Shuffle size={16} style={{ color: '#EC4899' }} />
                  Surprise Me: Random Problem Generator
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Pick an unseen challenge across our 4,000 problem database matching your current difficulty preferences.
                </span>
              </div>

              <div
                style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: isLight ? '#FDF2F8' : 'rgba(236, 72, 153, 0.1)',
                  border: isLight ? '1.5px solid #FBCFE8' : '1.5px solid rgba(236, 72, 153, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <button
                  type="button"
                  onClick={handleRollRandom}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: '#EC4899',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                  data-testid="roll-random-btn"
                >
                  <Shuffle size={15} />
                  <span>Roll Random Problem</span>
                </button>

                {randomProblem && (
                  <div
                    data-testid="random-problem-result"
                    style={{
                      marginTop: '12px',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: isLight ? '#FFFFFF' : 'var(--card)',
                      border: '1px solid var(--border)',
                      width: '100%',
                      maxWidth: '480px',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {getProblemNumber(randomProblem)}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#EC4899' }}>
                        {randomProblem.difficulty || 'Medium'}
                      </span>
                    </div>
                    <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                      {randomProblem.title}
                    </strong>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {randomProblem.categoryTitle} • {randomProblem.patternTitle || 'Algorithmic Pattern'}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleToggleSolved(randomProblem)}
                      style={{
                        marginTop: '6px',
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#10B981',
                        border: 'none',
                        color: '#FFF',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      Solve Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════ MODE: HISTORY ═══════════════ */}
          {activeMode === 'history' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} data-testid="practice-history-container">
              <div>
                <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <History size={16} style={{ color: '#3B82F6' }} />
                  Practice History & Solved Ledger
                </h2>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  Chronological record of attempts, accepted submissions, and completed practice sprints.
                </span>
              </div>

              {practiceHistoryItems.length === 0 ? (
                <div style={{ padding: '36px', textAlign: 'center', borderRadius: '14px', background: isLight ? '#FFFFFF' : 'var(--card)', border: '1px solid var(--border)' }}>
                  <History size={32} style={{ color: 'var(--text-muted)', margin: '0 auto 10px auto' }} />
                  <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>No Practice Records Yet</strong>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>
                    Begin practicing problems to populate your chronological solve history.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {practiceHistoryItems.slice(0, 30).map((h) => (
                    <div
                      key={h.id}
                      data-testid="history-item-row"
                      style={{
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: isLight ? '#FFFFFF' : 'var(--card)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: h.status === 'accepted' ? '#10B981' : '#EF4444',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFF',
                          }}
                        >
                          {h.status === 'accepted' ? <Check size={12} /> : <X size={12} />}
                        </div>
                        <div>
                          <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{h.title}</strong>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block' }}>
                            {h.platform.toUpperCase()} • {h.topic} • {h.pattern}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981' }}>
                          +{h.xpEarned} XP
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {new Date(h.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══════════════ MODES: AREA / SUBTOPIC / PATTERN / PLATFORM ═══════════════ */}
          {(activeMode === 'area' || activeMode === 'subtopic' || activeMode === 'pattern' || activeMode === 'platform') && (
            <>
              {/* Progression Hero Banner */}
              <div
                style={{
                  padding: '18px 22px',
                  borderRadius: '14px',
                  background: isLight
                    ? `linear-gradient(135deg, #FFFFFF 0%, ${currentPlatformMeta.color}0A 60%, #F8FAFC 100%)`
                    : `linear-gradient(135deg, ${currentPlatformMeta.color}15 0%, var(--card) 100%)`,
                  border: isLight ? `1.5px solid ${currentPlatformMeta.color}40` : `1.5px solid ${currentPlatformMeta.color}55`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
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
                      <Trophy size={18} />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>
                          {selectedPlatform === 'codeforces'
                            ? activeCodeforcesDivision.name
                            : selectedPlatform === 'codechef'
                            ? `${activeCodechefKingdom.number}. ${activeCodechefKingdom.name}`
                            : selectedPlatform === 'geeksforgeeks'
                            ? `${activeGeeksforgeeksKingdom.number}. ${activeGeeksforgeeksKingdom.name}`
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
                            : selectedPlatform === 'geeksforgeeks'
                            ? activeGeeksforgeeksKingdom.topic
                            : activeLeetcodeKingdom.topic}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                        {selectedPlatform === 'codeforces'
                          ? activeCodeforcesDivision.description
                          : selectedPlatform === 'codechef'
                          ? activeCodechefKingdom.description
                          : selectedPlatform === 'geeksforgeeks'
                          ? activeGeeksforgeeksKingdom.description
                          : activeLeetcodeKingdom.description}
                      </span>
                    </div>
                  </div>

                  {nextProgressionProblem && (
                    <button
                      type="button"
                      onClick={() => handleToggleSolved(nextProgressionProblem)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        background: currentPlatformMeta.color,
                        border: 'none',
                        color: '#FFF',
                        fontSize: '12px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Code2 size={13} />
                      <span>Solve Next Unsolved</span>
                    </button>
                  )}
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
                        : selectedPlatform === 'geeksforgeeks'
                        ? `${activeGeeksforgeeksKingdom.solvedCount} / ${activeGeeksforgeeksKingdom.totalCount} Solved (${activeGeeksforgeeksKingdom.progressPct}%)`
                        : `${activeLeetcodeKingdom.solvedCount} / ${activeLeetcodeKingdom.totalCount} Solved (${activeLeetcodeKingdom.progressPct}%)`}
                    </strong>
                  </div>
                  <div style={{ width: '100%', height: '5px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${
                          selectedPlatform === 'codeforces'
                            ? activeCodeforcesDivision.progressPct
                            : selectedPlatform === 'codechef'
                            ? activeCodechefKingdom.progressPct
                            : selectedPlatform === 'geeksforgeeks'
                            ? activeGeeksforgeeksKingdom.progressPct
                            : activeLeetcodeKingdom.progressPct
                        }%`,
                        height: '100%',
                        background: currentPlatformMeta.color,
                        borderRadius: '3px',
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Standard Problem Queue Table */}
              <div
                style={{
                  background: isLight ? '#FFFFFF' : 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '18px',
                  boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.03)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>
                      Problem Queue ({filteredProblems.length})
                    </h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Available in{' '}
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
                        data-testid="problem-row"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '12px 16px',
                          borderRadius: '10px',
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
                            }}
                          >
                            {isSolved && <Check size={12} strokeWidth={3} />}
                          </button>

                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 800, width: '64px', flexShrink: 0 }}>
                            {getProblemNumber(prob)}
                          </span>

                          <div style={{ minWidth: 0, flex: 1 }}>
                            <strong style={{ fontSize: '13px', color: isSolved ? 'var(--text-secondary)' : 'var(--text-primary)', display: 'block' }}>
                              {prob.title}
                            </strong>
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

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, flexWrap: 'wrap' }}>
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

                          <button
                            type="button"
                            onClick={() => handleToggleSolved(prob)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: '8px',
                              background: isSolved ? 'rgba(16, 185, 129, 0.12)' : isLight ? 'var(--surface-secondary, #F1F5F9)' : 'rgba(255, 255, 255, 0.06)',
                              border: isSolved ? '1px solid #10B981' : isLight ? '1px solid var(--border)' : '1px solid rgba(255, 255, 255, 0.12)',
                              color: isSolved ? '#10B981' : 'var(--text-primary)',
                              fontSize: '11px',
                              fontWeight: 800,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Code2 size={12} />
                            <span>{isSolved ? 'Solved' : 'Solve Here'}</span>
                          </button>

                          <a
                            href={platformMeta.canonicalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
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
                            }}
                          >
                            <span>{platformMeta.buttonLabel}</span>
                            <ExternalLink size={11} />
                          </a>
                        </div>
                      </div>
                    );
                  })}

                  {paginatedProblems.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                      <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                        No problems match the current filter criteria.
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
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
            </>
          )}
        </div>

        {/* ── RIGHT SUPPORTING TRAINING SIDEBAR (300px) ──────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Quick Sprint Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} style={{ color: '#F59E0B' }} />
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Instant Session Sprint</strong>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Kick off a focused session with coherent difficulty progression.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => handleStartSession(5)}
                style={sprintBtnSmallSt}
              >
                5 Problems
              </button>
              <button
                type="button"
                onClick={() => handleStartSession(10)}
                style={sprintBtnSmallSt}
              >
                10 Problems
              </button>
              <button
                type="button"
                onClick={() => handleStartSession(20)}
                style={sprintBtnSmallSt}
              >
                20 Problems
              </button>
            </div>
          </div>

          {/* Pattern Mastery Breakdown */}
          <div
            style={{
              padding: '16px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Pattern Mastery</strong>
              <span style={{ fontSize: '10px', color: currentPlatformMeta.color, fontWeight: 800 }}>LIVE</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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

          {/* Recent Solves Activity Log */}
          <div
            style={{
              padding: '16px',
              borderRadius: '14px',
              background: isLight ? '#FFFFFF' : 'var(--card)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Recent Solves</strong>

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

// ── Styles ──────────────────────────────────────────────────────────
const statTileSt = (isLight: boolean): React.CSSProperties => ({
  padding: '12px 14px',
  borderRadius: '10px',
  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const selectControlSt: React.CSSProperties = {
  padding: '7px 10px',
  borderRadius: '8px',
  background: 'var(--input-bg, rgba(255, 255, 255, 0.04))',
  border: '1px solid var(--input-border, rgba(255, 255, 255, 0.1))',
  color: 'var(--text-primary, #FFF)',
  fontSize: '12px',
  outline: 'none',
  cursor: 'pointer',
};

const sprintBtnStyle = (isLight: boolean, color: string): React.CSSProperties => ({
  padding: '7px 12px',
  borderRadius: '8px',
  background: isLight ? `${color}12` : `${color}20`,
  border: `1px solid ${color}50`,
  color,
  fontSize: '11px',
  fontWeight: 800,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  transition: 'all 0.15s ease',
});

const sprintBtnSmallSt: React.CSSProperties = {
  padding: '6px 8px',
  borderRadius: '6px',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  fontSize: '11px',
  fontWeight: 700,
  cursor: 'pointer',
  textAlign: 'center',
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
