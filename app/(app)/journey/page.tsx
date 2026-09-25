'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { GuestPreviewBanner } from '@/src/lib/auth/components/GuestPreviewBanner';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { useRoadmap } from '@frontend/hooks/use-roadmap';
import { AdaptiveRoadmapService } from '@/src/features/journey/services/adaptive-roadmap.service';
import {
  AdaptiveRoadmapState,
  RoadmapTopicNode,
} from '@/src/features/journey/types/journey.types';
import { NextBestActionCard } from '@/src/features/journey/components/NextBestActionCard';
import { LearningMomentumWidget } from '@/src/features/journey/components/LearningMomentumWidget';
import { WeeklyScheduleCard } from '@/src/features/journey/components/WeeklyScheduleCard';
import { JourneyTimelineView } from '@/src/features/journey/components/JourneyTimelineView';
import { TopicDetailModal } from '@/src/features/journey/components/TopicDetailModal';
import { JourneyHero } from '@/src/features/journey/components/JourneyHero';
import { JourneyToolbar, BandFilterOption, StatusFilterOption } from '@/src/features/journey/components/JourneyToolbar';
import { CurriculumBandSection, CurriculumBandData } from '@/src/features/journey/components/CurriculumBandSection';
import { MasteryState } from '@/src/features/journey/components/LearningAreaCard';
import { EmptyState } from '@frontend/components/ui/EmptyState';
import { Layers } from 'lucide-react';

const CURRICULUM_BANDS: CurriculumBandData[] = [
  {
    id: 'foundations',
    order: '01',
    name: 'Foundations',
    description: 'Core memory layouts, indexing arithmetic, continuous structures, and bitwise primitives.',
    slugs: ['basic-arrays', 'strings', 'matrix', 'math-number-theory', 'bit-manipulation'],
  },
  {
    id: 'pattern-building',
    order: '02',
    name: 'Pattern Building',
    description: 'High-frequency algorithmic templates that eliminate brute force via multi-pointer and search mechanics.',
    slugs: ['two-pointers', 'sliding-window', 'prefix-sum', 'binary-search', 'intervals', 'hashing', 'sorting'],
  },
  {
    id: 'data-structures',
    order: '03',
    name: 'Data Structures',
    description: 'Hierarchical, sequential, and priority-based data structures for constant-time lookups and structured storage.',
    slugs: ['stack', 'queue-deque', 'linked-list', 'binary-trees', 'binary-search-trees', 'heap'],
  },
  {
    id: 'algorithmic-thinking',
    order: '04',
    name: 'Algorithmic Thinking',
    description: 'Combinatorial exploration, optimal sub-structures, greedy choices, and complex graph topologies.',
    slugs: ['backtracking', 'greedy', 'dynamic-programming', 'graphs', 'shortest-path', 'minimum-spanning-tree'],
  },
  {
    id: 'advanced',
    order: '05',
    name: 'Advanced Algorithms',
    description: 'High-performance specialized structures including segment trees, Fenwick trees, and string automatons.',
    slugs: ['advanced-algorithms'],
  },
];

export default function AdaptiveJourneyPage() {
  const { userId, isAuthenticated } = useActiveUser();
  const { state: roadmapState } = useRoadmap();

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'curriculum' | 'adaptive'>('curriculum');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBand, setSelectedBand] = useState<BandFilterOption>('all');
  const [selectedStatus, setSelectedStatus] = useState<StatusFilterOption>('all');
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopicNode | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Hydration safety
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to ecosystem events for real-time roadmap & mastery recalculation
  useEffect(() => {
    const handleUpdate = () => {
      setRefreshCount((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleUpdate);
    const unsubFail = EventBus.subscribe('ProblemFailed', handleUpdate);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleUpdate);
    const unsubContest = EventBus.subscribe('ContestCompleted', handleUpdate);
    const unsubSession = EventBus.subscribe('SessionFinished', handleUpdate);

    return () => {
      unsubSolve();
      unsubFail();
      unsubMemory();
      unsubContest();
      unsubSession();
    };
  }, []);

  // Deterministically compute roadmap state for adaptive timeline view
  const roadmap: AdaptiveRoadmapState = useMemo(() => {
    return AdaptiveRoadmapService.computeRoadmap(userId || 'guest-user');
  }, [userId, refreshCount]);

  // Solved sets computation
  const completedIds = useMemo(() => {
    return new Set<string>(roadmapState?.completedProblemIds ?? []);
  }, [roadmapState?.completedProblemIds, refreshCount]);

  const completedNumbers = useMemo(() => {
    return new Set<number>(roadmapState?.completed ?? []);
  }, [roadmapState?.completed, refreshCount]);

  const isSolved = useCallback(
    (p: { id: string; leetcodeNumber?: number; url?: string }) => {
      if (completedIds.has(p.id)) return true;
      if (p.leetcodeNumber && completedNumbers.has(p.leetcodeNumber)) return true;
      return false;
    },
    [completedIds, completedNumbers]
  );

  // All Curriculum Data cached
  const allCategories = useMemo(() => CurriculumRepository.getAllCategories(), []);
  const allSubtopics = useMemo(() => CurriculumRepository.getAllSubtopics(), []);
  const allPatterns = useMemo(() => CurriculumRepository.getAllPatterns(), []);
  const allProblems = useMemo(() => CurriculumRepository.getAllProblems(), []);

  // Computed data for all 25 areas
  const computedAreas = useMemo(() => {
    return allCategories.map((area) => {
      const subtopics = allSubtopics.filter(
        (s) => s.categorySlug === area.slug || s.categoryId === area.id
      );
      const patterns = allPatterns.filter(
        (p) => p.categorySlug === area.slug || p.categoryId === area.id
      );
      const problems = allProblems.filter(
        (p) =>
          p.categorySlug === area.slug ||
          p.categoryId === area.id ||
          p.categoryTitle === area.title
      );

      const solvedCount = problems.filter(isSolved).length;
      const totalCount = problems.length;
      const progressRatio = totalCount > 0 ? solvedCount / totalCount : 0;

      // Platform coverage
      const hasPlatformCoverage = {
        leetcode: problems.some((p) => p.platform === 'leetcode'),
        codechef: problems.some((p) => p.platform === 'codechef'),
        codeforces: problems.some((p) => p.platform === 'codeforces'),
        geeksforgeeks: problems.some((p) => p.platform === 'geeksforgeeks'),
      };

      // Determine mastery state
      let masteryState: MasteryState = 'Not Started';
      if (solvedCount === 0) {
        masteryState = 'Not Started';
      } else if (progressRatio >= 0.8) {
        masteryState = 'Strong';
      } else if (progressRatio >= 0.3) {
        masteryState = 'Developing';
      } else {
        masteryState = 'Learning';
      }

      return {
        area,
        subtopics,
        patterns,
        subtopicCount: subtopics.length,
        patternCount: patterns.length,
        totalProblems: totalCount,
        solvedProblems: solvedCount,
        masteryState,
        hasPlatformCoverage,
      };
    });
  }, [allCategories, allSubtopics, allPatterns, allProblems, isSolved]);

  // Overall Global Telemetry Rollups
  const globalStats = useMemo(() => {
    const totalProblems = allProblems.length;
    const solvedProblems = allProblems.filter(isSolved).length;
    const totalPatterns = allPatterns.length;
    // Patterns with at least 1 solved problem
    const exploredPatterns = allPatterns.filter((pat) => {
      const patProblems = allProblems.filter(
        (p) => p.patternSlug === pat.slug || p.patternId === pat.id
      );
      return patProblems.some(isSolved);
    }).length;

    const totalAreas = computedAreas.length;
    const inProgressAreas = computedAreas.filter((a) => a.solvedProblems > 0).length;

    return {
      totalProblems,
      solvedProblems,
      totalPatterns,
      exploredPatterns,
      totalAreas,
      inProgressAreas,
    };
  }, [allProblems, allPatterns, computedAreas, isSolved]);

  // Filtered areas based on search query, band, and status
  const filteredAreas = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return computedAreas.filter((item) => {
      // 1. Band filter
      if (selectedBand !== 'all') {
        const targetBand = CURRICULUM_BANDS.find((b) => b.id === selectedBand);
        if (!targetBand || !targetBand.slugs.includes(item.area.slug)) {
          return false;
        }
      }

      // 2. Status filter
      if (selectedStatus === 'in-progress') {
        if (item.solvedProblems === 0 || item.solvedProblems >= item.totalProblems) return false;
      } else if (selectedStatus === 'mastered') {
        if (item.masteryState !== 'Strong') return false;
      } else if (selectedStatus === 'not-started') {
        if (item.solvedProblems > 0) return false;
      }

      // 3. Search query filter (Area, Subtopic, Pattern)
      if (q) {
        const areaMatch =
          item.area.title.toLowerCase().includes(q) ||
          item.area.slug.toLowerCase().includes(q) ||
          item.area.description.toLowerCase().includes(q);

        if (areaMatch) return true;

        const subtopicMatch = item.subtopics.some(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.slug.toLowerCase().includes(q) ||
            s.description?.toLowerCase().includes(q)
        );

        if (subtopicMatch) return true;

        const patternMatch = item.patterns.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.slug.toLowerCase().includes(q) ||
            p.overview?.toLowerCase().includes(q) ||
            p.shortDescription?.toLowerCase().includes(q)
        );

        if (patternMatch) return true;

        return false;
      }

      return true;
    });
  }, [computedAreas, selectedBand, selectedStatus, searchQuery]);

  const handleSelectTopic = useCallback((topic: RoadmapTopicNode) => {
    setSelectedTopic(topic);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTopic(null);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[450px] flex items-center justify-center text-[var(--text-muted)] text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs">Loading DSA Knowledge Map...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-8 pt-4 px-4 sm:px-6 pb-20">
      {/* ── 1. PUBLIC-FIRST GUEST BANNER ────────────────────────────── */}
      {!isAuthenticated && (
        <GuestPreviewBanner
          featureName="DSA Curriculum Knowledge Map"
          description="You are exploring DSA Magna's 25-area curriculum in preview mode. Your progress tracks dynamically as you practice. Sign in to synchronize cross-platform solves, contest ladders, and persistent mastery telemetry."
          redirectPath="/journey"
        />
      )}

      {/* ── 2. HERO HEADER & 4-TIER HIERARCHY STRIP ─────────────────── */}
      <JourneyHero
        totalProblems={globalStats.totalProblems}
        solvedProblems={globalStats.solvedProblems}
        totalPatterns={globalStats.totalPatterns}
        exploredPatterns={globalStats.exploredPatterns}
        totalAreas={globalStats.totalAreas}
        inProgressAreas={globalStats.inProgressAreas}
      />

      {/* ── 3. SEARCH & CURRICULUM TOOLBAR ──────────────────────────── */}
      <JourneyToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedBand={selectedBand}
        onSelectBand={setSelectedBand}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalFilteredCount={filteredAreas.length}
        totalCount={computedAreas.length}
      />

      {/* ── 4. MAIN CONTENT VIEW ────────────────────────────────────── */}
      {viewMode === 'curriculum' ? (
        <div className="flex flex-col gap-10 w-full">
          {filteredAreas.length === 0 ? (
            <div className="py-12">
              <EmptyState
                icon={Layers}
                title="No learning areas match your query"
                description="Try refining your search terms or clearing the band and status filters."
                action={
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedBand('all');
                      setSelectedStatus('all');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--accent)] text-[var(--text-inverse)] hover:bg-[var(--accent-hover)] transition-all"
                  >
                    Clear All Filters
                  </button>
                }
              />
            </div>
          ) : (
            CURRICULUM_BANDS.map((band) => {
              const bandAreas = filteredAreas.filter((item) =>
                band.slugs.includes(item.area.slug)
              );

              return (
                <CurriculumBandSection
                  key={band.id}
                  band={band}
                  areas={bandAreas}
                />
              );
            })
          )}
        </div>
      ) : (
        /* Adaptive Timeline View */
        <div className="flex flex-col gap-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <NextBestActionCard action={roadmap.nextBestAction} />
            </div>
            <div className="lg:col-span-1">
              <LearningMomentumWidget momentum={roadmap.momentum} />
            </div>
            <div className="lg:col-span-1">
              <WeeklyScheduleCard plan={roadmap.weeklyPlan} />
            </div>
          </div>

          <div className="w-full">
            <JourneyTimelineView
              roadmap={roadmap}
              onSelectTopic={handleSelectTopic}
            />
          </div>
        </div>
      )}

      {/* ── 5. TOPIC DRILLDOWN MODAL ─────────────────────────────────── */}
      <TopicDetailModal
        topic={selectedTopic}
        onClose={handleCloseModal}
      />
    </div>
  );
}
