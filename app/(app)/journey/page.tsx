'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { GuestPreviewBanner } from '@/src/lib/auth/components/GuestPreviewBanner';
import { EventBus } from '@/src/core/events/event-bus';
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
import { VerticalCinematicJourneyView } from '@/src/features/journey/components/VerticalCinematicJourneyView';
import {
  Compass,
  Map,
  Sparkles,
  Layers,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';

export default function AdaptiveJourneyPage() {
  const { userId, isAuthenticated } = useActiveUser();
  const { settings } = useSettings();
  const { toast } = useToast();
  const isLight = settings.appearance.theme === 'light';

  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'graph' | 'areas'>('graph');
  const [selectedTopic, setSelectedTopic] = useState<RoadmapTopicNode | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);

  // Hydration safety & Initial load
  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen to ecosystem events for real-time roadmap recalculation
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

  // Deterministically compute roadmap state
  const roadmap: AdaptiveRoadmapState = useMemo(() => {
    return AdaptiveRoadmapService.computeRoadmap(userId || 'guest-user');
  }, [userId, refreshCount]);

  const handleSelectTopic = useCallback((topic: RoadmapTopicNode) => {
    setSelectedTopic(topic);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTopic(null);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full min-h-[400px] flex items-center justify-center text-[var(--text-muted)] text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading Adaptive DSA Roadmap 2.0...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto flex flex-col gap-8 pt-4 px-4 sm:px-6 pb-20">
      {/* ── 1. PUBLIC-FIRST GUEST BANNER ────────────────────────────── */}
      {!isAuthenticated && (
        <GuestPreviewBanner
          featureName="Adaptive DSA Roadmap 2.0"
          description="You are exploring DSA Master's Adaptive Planner in preview mode. Your graph updates dynamically as you solve problems. Sign in or create an account to sync cross-device learning momentum, contest ratings, and persistent mastery signals."
          redirectPath="/journey"
        />
      )}

      {/* ── 2. HERO HEADER & VIEW MODE SELECTOR ────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Compass size={20} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)]">
              Adaptive DSA Roadmap <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 ml-1">2.0</span>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-2xl">
            Behavior-driven learning graph continuously evaluated from practice solves, compilation/runtime errors, spaced repetition retention, and tournament performance.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[var(--surface)] p-1 rounded-xl border border-[var(--border)]">
          <button
            onClick={() => setViewMode('graph')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'graph'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Layers size={14} /> Adaptive Graph & Timeline
          </button>
          <button
            onClick={() => setViewMode('areas')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'areas'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Map size={14} /> Learning Areas
          </button>
        </div>
      </div>

      {/* ── 3. TOP INTELLIGENCE LAYER (Next Action, Momentum, Weekly) ── */}
      {viewMode === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next-Best-Action Hero */}
          <div className="lg:col-span-1">
            <NextBestActionCard action={roadmap.nextBestAction} />
          </div>

          {/* Learning Momentum & Signals */}
          <div className="lg:col-span-1">
            <LearningMomentumWidget momentum={roadmap.momentum} />
          </div>

          {/* 7-Day Adaptive Schedule */}
          <div className="lg:col-span-1">
            <WeeklyScheduleCard plan={roadmap.weeklyPlan} />
          </div>
        </div>
      )}

      {/* ── 4. MAIN BODY VIEW ────────────────────────────────────────── */}
      {viewMode === 'graph' ? (
        <div className="w-full">
          <JourneyTimelineView
            roadmap={roadmap}
            onSelectTopic={handleSelectTopic}
          />
        </div>
      ) : (
        <div className="w-full">
          <VerticalCinematicJourneyView />
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
