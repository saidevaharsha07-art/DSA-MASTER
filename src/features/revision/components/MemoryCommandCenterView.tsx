'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Brain,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  AlertCircle,
  Clock,
  Calendar,
  Layers,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Activity,
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronRight,
  Lock,
} from 'lucide-react';

import { RevisionAdapterService, RevisionSummaryData } from '../services/revision-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { progressService } from '@/src/services/progress/progress.service';
import { useToast } from '@/src/context/ToastContext';
import { ProblemModel, RevisionData } from '@/src/curriculum/types';
import { useSettings } from '@/src/context/SettingsContext';
import { GuestPreviewBanner } from '@/src/lib/auth/components/GuestPreviewBanner';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';
import { RecommendationCard } from '@/src/intelligence/recommendations/components/RecommendationCard';

export function MemoryCommandCenterView() {
  const { userId, isAuthenticated } = useActiveUser();
  const { toast } = useToast();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [refreshCount, setRefreshCount] = useState<number>(0);
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [reviewingProblem, setReviewingProblem] = useState<(ProblemModel & { revisionData: RevisionData }) | null>(null);

  // Subscribe to real-time events for live reactivity
  useEffect(() => {
    const handleRefresh = () => {
      RevisionAdapterService.clearCache();
      setRefreshCount((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleRefresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleRefresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', handleRefresh);

    return () => {
      unsubSolve();
      unsubMemory();
      unsubPlatform();
    };
  }, []);

  const revisionSummary = useMemo(() => {
    return RevisionAdapterService.getRevisionSummary(userId);
  }, [userId, refreshCount]);

  const { dueTodayProblems, upcomingQueue: rawQueue, kingdoms, streakStats, xpStats, timelineStages } = revisionSummary;

  const allProblems = useMemo(() => CurriculumRepository.getAllProblems(), []);
  const state = progressService.getState(userId);
  const activityLogs = progressService.getActivityLog(userId);

  const canonicalSolvedSet = useMemo(() => {
    return new Set<string>([
      ...state.completed.map((n) => `leetcode:${n}`),
      ...(state.completedProblemIds || []),
    ]);
  }, [state.completed, state.completedProblemIds, refreshCount]);

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

  // Review status computations
  const totalDueToday = dueTodayProblems.length;
  const overdueCount = rawQueue.filter((p) => {
    if (!p.revisionData.nextReview) return false;
    return new Date(p.revisionData.nextReview).getTime() < Date.now() - 24 * 3600 * 1000;
  }).length;
  const dueNowCount = rawQueue.filter((p) => {
    if (!p.revisionData.nextReview) return false;
    return new Date(p.revisionData.nextReview).getTime() <= Date.now();
  }).length;
  const upcomingCount = rawQueue.filter((p) => {
    if (!p.revisionData.nextReview) return false;
    return new Date(p.revisionData.nextReview).getTime() > Date.now();
  }).length;

  // Reviews completed metrics from logs
  const todayStr = new Date().toISOString().split('T')[0];
  const reviewsToday = activityLogs.filter(
    (l) => l.action === 'REVIEWED' && l.timestamp.startsWith(todayStr)
  ).length;
  const oneWeekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const reviewsThisWeek = activityLogs.filter(
    (l) => l.action === 'REVIEWED' && new Date(l.timestamp).getTime() >= oneWeekAgo
  ).length;
  const totalReviewsCount = activityLogs.filter((l) => l.action === 'REVIEWED').length;

  // Average Memory Retention %
  const memoryRetentionPct = useMemo(() => {
    if (rawQueue.length === 0) return 100;
    const sum = rawQueue.reduce((acc, p) => acc + (p.revisionData.mastery || 0), 0);
    return Math.round(sum / rawQueue.length);
  }, [rawQueue]);

  const memoryStatusState =
    memoryRetentionPct >= 80 ? 'Stable' : memoryRetentionPct >= 50 ? 'At Risk' : 'Critical';
  const memoryStatusColor =
    memoryRetentionPct >= 80 ? '#10B981' : memoryRetentionPct >= 50 ? '#F59E0B' : '#EF4444';

  // PLATFORM BREAKDOWN
  const platformStats = useMemo(() => {
    const lcAll = allProblems.filter(
      (p) => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org')
    );
    const ccAll = allProblems.filter((p) => p.url?.includes('codechef.com'));
    const cfAll = allProblems.filter((p) => p.url?.includes('codeforces.com'));

    const lcSolved = lcAll.filter((p) => isProblemSolved(p)).length;
    const ccSolved = ccAll.filter((p) => isProblemSolved(p)).length;
    const cfSolved = cfAll.filter((p) => isProblemSolved(p)).length;

    const lcQueue = rawQueue.filter(
      (p) => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org')
    );
    const ccQueue = rawQueue.filter((p) => p.url?.includes('codechef.com'));
    const cfQueue = rawQueue.filter((p) => p.url?.includes('codeforces.com'));

    const lcDue = lcQueue.filter((p) => p.revisionData.interval <= 1 || p.revisionData.mastery < 50).length;
    const ccDue = ccQueue.filter((p) => p.revisionData.interval <= 1 || p.revisionData.mastery < 50).length;
    const cfDue = cfQueue.filter((p) => p.revisionData.interval <= 1 || p.revisionData.mastery < 50).length;

    const calcRetention = (q: typeof rawQueue) => {
      if (q.length === 0) return 100;
      return Math.round(q.reduce((s, p) => s + (p.revisionData.mastery || 0), 0) / q.length);
    };

    return {
      leetcode: {
        total: lcAll.length,
        solved: lcSolved,
        reviewed: lcQueue.filter((p) => p.revisionData.totalReviews > 1).length,
        due: lcDue,
        retention: calcRetention(lcQueue),
      },
      codechef: {
        total: ccAll.length,
        solved: ccSolved,
        reviewed: ccQueue.filter((p) => p.revisionData.totalReviews > 1).length,
        due: ccDue,
        retention: calcRetention(ccQueue),
      },
      codeforces: {
        total: cfAll.length,
        solved: cfSolved,
        reviewed: cfQueue.filter((p) => p.revisionData.totalReviews > 1).length,
        due: cfDue,
        retention: calcRetention(cfQueue),
      },
    };
  }, [allProblems, rawQueue, canonicalSolvedSet, refreshCount]);

  // MEMORY DECAY STAGES
  const memoryDecayStages = useMemo(() => {
    const total = rawQueue.length;
    const stageNew = rawQueue.filter((p) => p.revisionData.totalReviews <= 1 && p.revisionData.mastery < 40).length;
    const stageLearning = rawQueue.filter((p) => p.revisionData.mastery >= 40 && p.revisionData.mastery < 65).length;
    const stageRemembering = rawQueue.filter((p) => p.revisionData.mastery >= 65 && p.revisionData.mastery < 80).length;
    const stageStable = rawQueue.filter((p) => p.revisionData.mastery >= 80 && p.revisionData.mastery < 95).length;
    const stageMastered = rawQueue.filter((p) => p.revisionData.mastery >= 95).length;

    return [
      { name: 'New', count: stageNew, color: '#94A3B8', pct: total > 0 ? Math.round((stageNew / total) * 100) : 0 },
      { name: 'Learning', count: stageLearning, color: '#F59E0B', pct: total > 0 ? Math.round((stageLearning / total) * 100) : 0 },
      { name: 'Remembering', count: stageRemembering, color: '#38BDF8', pct: total > 0 ? Math.round((stageRemembering / total) * 100) : 0 },
      { name: 'Stable', count: stageStable, color: '#8B5CF6', pct: total > 0 ? Math.round((stageStable / total) * 100) : 0 },
      { name: 'Mastered', count: stageMastered, color: '#10B981', pct: total > 0 ? Math.round((stageMastered / total) * 100) : 0 },
    ];
  }, [rawQueue]);

  // PATTERN MEMORY HEALTH (derived from kingdoms and problem revision data)
  const patternHealthList = useMemo(() => {
    return kingdoms.map((k) => {
      const catProblems = rawQueue.filter((p) => p.categorySlug === k.slug);
      let avgMem = k.averageMastery;
      if (catProblems.length > 0) {
        avgMem = Math.round(catProblems.reduce((acc, p) => acc + (p.revisionData.mastery || 0), 0) / catProblems.length);
      }

      const risk = avgMem >= 75 ? 'Stable' : avgMem >= 50 ? 'At Risk' : 'Critical';
      const riskColor = avgMem >= 75 ? '#10B981' : avgMem >= 50 ? '#F59E0B' : '#EF4444';

      return {
        slug: k.slug,
        title: k.title,
        kingdomTitle: k.kingdomTitle || k.title,
        memoryPct: avgMem,
        solvedCount: k.solvedCount,
        totalProblems: k.totalProblems,
        dueCount: k.dueCount,
        risk,
        riskColor,
        lastReview: catProblems[0]?.revisionData.lastReviewed
          ? new Date(catProblems[0].revisionData.lastReviewed).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : 'Recent',
        nextReview: k.dueCount > 0 ? 'Today' : 'Upcoming',
      };
    });
  }, [kingdoms, rawQueue]);

  // FILTERED DUE QUEUE
  const filteredQueue = useMemo(() => {
    let list = rawQueue;
    if (selectedDateFilter) {
      list = list.filter(
        (p) => p.revisionData.nextReview && p.revisionData.nextReview.split('T')[0] === selectedDateFilter
      );
    }
    if (selectedDifficulty !== 'all') {
      list = list.filter((p) => p.difficulty === selectedDifficulty);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.patternTitle.toLowerCase().includes(q) ||
          p.categoryTitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [rawQueue, selectedDateFilter, selectedDifficulty, searchQuery]);

  // Review submission
  const handleRecordReview = (problemId: string, rating: 'easy' | 'medium' | 'hard') => {
    const result = RevisionAdapterService.recordReview(userId, problemId, rating);
    toast(`Review Recorded! +${result.xpEarned} XP awarded!`, 'success');
    setReviewingProblem(null);
    setRefreshCount((prev) => prev + 1);
  };

  const scrollToQueue = () => {
    const el = document.getElementById('due-queue-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
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
      {!isAuthenticated && (
        <GuestPreviewBanner
          featureName="Smart Revision"
          description="You are exploring the DSA Master Spaced Repetition engine. Create a free account or log in to track your personal forgetting curves and scheduled reviews."
          redirectPath="/revision"
        />
      )}

      {/* ── 1. TOP HERO: MEMORY COMMAND CENTER ──────────────────────── */}
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
            : 'linear-gradient(135deg, rgba(28, 16, 56, 0.95) 0%, rgba(14, 9, 32, 0.98) 60%, rgba(7, 5, 18, 1) 100%)',
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
          {/* Title & Subtitle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1.5px solid var(--primary, #8B5CF6)',
                boxShadow: '0 0 24px var(--accent-glow, rgba(139, 92, 246, 0.4))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Brain size={24} style={{ color: 'var(--primary, #8B5CF6)' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Memory Command Center
              </h1>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Strengthen weak patterns before they fade.
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <div>
            {totalDueToday > 0 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={scrollToQueue}
                style={{
                  padding: '12px 26px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '13px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(139, 92, 246, 0.5)',
                }}
              >
                <Zap size={16} fill="#FFF" /> Start Due Reviews ({totalDueToday})
              </motion.button>
            ) : (
              <button
                disabled
                type="button"
                style={{
                  padding: '12px 24px',
                  borderRadius: '14px',
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-muted)',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#10B981' }} /> No Reviews Due
              </button>
            )}
          </div>
        </div>

        {/* 4 Compact Live Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            paddingTop: '16px',
            borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div style={metricChipSt}>
            <div style={chipIconSt('#F59E0B')}>
              <Clock size={16} style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <span style={chipLabelSt}>Due Today</span>
              <strong style={chipValueSt}>{totalDueToday} Problems</strong>
            </div>
          </div>

          <div style={metricChipSt}>
            <div style={chipIconSt('#F97316')}>
              <Flame size={16} style={{ color: '#F97316' }} />
            </div>
            <div>
              <span style={chipLabelSt}>Current Streak</span>
              <strong style={chipValueSt}>{streakStats.currentStreak} Days</strong>
            </div>
          </div>

          <div style={metricChipSt}>
            <div style={chipIconSt('#38BDF8')}>
              <RotateCcw size={16} style={{ color: '#38BDF8' }} />
            </div>
            <div>
              <span style={chipLabelSt}>Reviews Completed</span>
              <strong style={chipValueSt}>{totalReviewsCount} Total</strong>
            </div>
          </div>

          <div style={metricChipSt}>
            <div style={chipIconSt(memoryStatusColor)}>
              <Activity size={16} style={{ color: memoryStatusColor }} />
            </div>
            <div>
              <span style={chipLabelSt}>Memory Retention</span>
              <strong style={{ ...chipValueSt, color: memoryStatusColor }}>{memoryRetentionPct}%</strong>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. REVIEW STATUS SECTION (WIDE HORIZONTAL 3-COLUMN) ──────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
        }}
      >
        {/* COLUMN 1: REVIEW QUEUE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} style={{ color: 'var(--primary, #8B5CF6)' }} />
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>Review Queue</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Due Now</span>
              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{dueNowCount}</strong>
            </div>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Due Today</span>
              <strong style={{ fontSize: '15px', color: '#F59E0B' }}>{totalDueToday}</strong>
            </div>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Overdue</span>
              <strong style={{ fontSize: '15px', color: overdueCount > 0 ? '#EF4444' : '#10B981' }}>{overdueCount}</strong>
            </div>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Upcoming</span>
              <strong style={{ fontSize: '15px', color: '#38BDF8' }}>{upcomingCount}</strong>
            </div>
          </div>
        </div>

        {/* COLUMN 2: MEMORY HEALTH */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)', paddingLeft: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={16} style={{ color: memoryStatusColor }} />
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>Memory Health</h3>
            </div>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 900,
                color: memoryStatusColor,
                background: `${memoryStatusColor}18`,
                padding: '2px 8px',
                borderRadius: '6px',
                border: `1px solid ${memoryStatusColor}33`,
              }}
            >
              {memoryStatusState}
            </span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 800, marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Average Retention</span>
              <span style={{ color: memoryStatusColor }}>{memoryRetentionPct}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${memoryRetentionPct}%`,
                  background: memoryStatusColor,
                  borderRadius: '4px',
                  boxShadow: `0 0 10px ${memoryStatusColor}`,
                }}
              />
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '6px' }}>
              {memoryRetentionPct >= 80
                ? 'High recall stability across active pattern memories.'
                : 'Several patterns require review to prevent forgetting decay.'}
            </span>
          </div>
        </div>

        {/* COLUMN 3: REVIEW MOMENTUM */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)', paddingLeft: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} style={{ color: '#10B981' }} />
            <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>Review Momentum</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reviewed Today</span>
              <strong style={{ fontSize: '15px', color: '#10B981' }}>{reviewsToday}</strong>
            </div>
            <div style={statusPillSt}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Reviewed 7d</span>
              <strong style={{ fontSize: '15px', color: '#38BDF8' }}>{reviewsThisWeek}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MAIN SECTION: DUE FOR REVIEW (QUEUE TABLE) ───────────── */}
      <div
        id="due-queue-section"
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Header & Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
                DUE FOR REVIEW
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  color: 'var(--primary, #8B5CF6)',
                  background: 'rgba(139, 92, 246, 0.15)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {filteredQueue.length} Items
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Patterns and solved problems that need reinforcement now.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px 8px 30px',
                  borderRadius: '10px',
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                  border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  outline: 'none',
                }}
              />
            </div>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '10px',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none',
              }}
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Table or Empty State */}
        {filteredQueue.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '12px 14px' }}>Problem / Pattern</th>
                  <th style={{ padding: '12px 14px' }}>Kingdom</th>
                  <th style={{ padding: '12px 14px' }}>Platform</th>
                  <th style={{ padding: '12px 14px' }}>Difficulty</th>
                  <th style={{ padding: '12px 14px' }}>Memory %</th>
                  <th style={{ padding: '12px 14px' }}>Next Review</th>
                  <th style={{ padding: '12px 14px' }}>Priority</th>
                  <th style={{ padding: '12px 14px', textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQueue.map((p) => {
                  const platform = p.url?.includes('codechef.com')
                    ? 'CodeChef'
                    : p.url?.includes('codeforces.com')
                    ? 'Codeforces'
                    : 'LeetCode';

                  const priority =
                    p.revisionData.interval <= 0 || p.revisionData.mastery < 40
                      ? 'Critical'
                      : p.revisionData.interval <= 1
                      ? 'Due'
                      : 'Upcoming';

                  const priorityColor =
                    priority === 'Critical' ? '#EF4444' : priority === 'Due' ? '#F59E0B' : '#38BDF8';

                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: isLight ? '1px solid #F1F5F9' : '1px solid rgba(255, 255, 255, 0.04)',
                        transition: 'background 0.2s ease',
                      }}
                    >
                      <td style={{ padding: '14px' }}>
                        <strong style={{ color: 'var(--text-primary)', display: 'block', fontSize: '13px' }}>{p.title}</strong>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.patternTitle || 'Core Concept'}</span>
                      </td>
                      <td style={{ padding: '14px', color: 'var(--text-secondary)', fontSize: '12px' }}>
                        {p.kingdomTitle || p.categoryTitle}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 800,
                            color: platform === 'LeetCode' ? '#10B981' : platform === 'CodeChef' ? '#F97316' : '#3B82F6',
                          }}
                        >
                          {platform}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            background:
                              p.difficulty === 'Easy'
                                ? 'rgba(16, 185, 129, 0.15)'
                                : p.difficulty === 'Medium'
                                ? 'rgba(245, 158, 11, 0.15)'
                                : 'rgba(239, 68, 68, 0.15)',
                            color:
                              p.difficulty === 'Easy'
                                ? '#10B981'
                                : p.difficulty === 'Medium'
                                ? '#F59E0B'
                                : '#EF4444',
                          }}
                        >
                          {p.difficulty}
                        </span>
                      </td>
                      <td style={{ padding: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                            {p.revisionData.mastery}%
                          </span>
                          <div style={{ width: '50px', height: '4px', borderRadius: '2px', background: isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)' }}>
                            <div
                              style={{
                                width: `${p.revisionData.mastery}%`,
                                height: '100%',
                                background: priorityColor,
                                borderRadius: '2px',
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        {p.revisionData.nextReview
                          ? new Date(p.revisionData.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                          : 'Due Today'}
                      </td>
                      <td style={{ padding: '14px' }}>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 900,
                            color: priorityColor,
                            background: `${priorityColor}15`,
                            padding: '2px 8px',
                            borderRadius: '4px',
                            border: `1px solid ${priorityColor}33`,
                          }}
                        >
                          {priority}
                        </span>
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right' }}>
                        <button
                          type="button"
                          onClick={() => setReviewingProblem(p)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
                            border: 'none',
                            color: '#FFF',
                            fontSize: '11px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Zap size={12} fill="#FFF" /> Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              padding: '40px 20px',
              borderRadius: '16px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <CheckCircle2 size={32} style={{ color: '#10B981' }} />
            <div>
              <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block' }}>
                Your memory queue is clear.
              </strong>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                All spaced repetition reviews are up to date! Here is your next optimal learning action:
              </span>
            </div>
            
            <div style={{ width: '100%', maxWidth: '480px', marginTop: '8px' }}>
              <RecommendationCard
                recommendation={RecommendationEngineService.getPostRevisionRecommendation(userId, {
                  reviewedCount: reviewsToday,
                  decayedCount: overdueCount,
                })}
                variant="compact"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── 4. NEW SECTION: MEMORY HEALTH BY PLATFORM ───────────────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            MEMORY HEALTH BY PLATFORM
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Canonical platform retention & active revision load
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {/* LEETCODE */}
          <PlatformMemoryCard
            name="LEETCODE"
            color="#10B981"
            solved={platformStats.leetcode.solved}
            total={platformStats.leetcode.total}
            reviewed={platformStats.leetcode.reviewed}
            due={platformStats.leetcode.due}
            retention={platformStats.leetcode.retention}
            isLocked={false}
          />

          {/* CODECHEF */}
          <PlatformMemoryCard
            name="CODECHEF"
            color="#F97316"
            solved={platformStats.codechef.solved}
            total={platformStats.codechef.total}
            reviewed={platformStats.codechef.reviewed}
            due={platformStats.codechef.due}
            retention={platformStats.codechef.retention}
            isLocked={false}
          />

          {/* CODEFORCES */}
          <PlatformMemoryCard
            name="CODEFORCES"
            color="#3B82F6"
            solved={platformStats.codeforces.solved}
            total={platformStats.codeforces.total}
            reviewed={platformStats.codeforces.reviewed}
            due={platformStats.codeforces.due}
            retention={platformStats.codeforces.retention}
            isLocked={false}
          />

          {/* GEEKSFORGEEKS (LOCKED) */}
          <PlatformMemoryCard
            name="GEEKSFORGEEKS"
            color="#64748B"
            solved={0}
            total={0}
            reviewed={0}
            due={0}
            retention={0}
            isLocked={true}
          />
        </div>
      </div>

      {/* ── 5. MEMORY DECAY VISUALIZATION ──────────────────────────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              MEMORY DECAY &amp; STABILITY
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Spaced repetition retention stages across active concept memories
            </span>
          </div>
        </div>

        {/* Multi-Segment Stability Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '12px',
            borderRadius: '6px',
            background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.06)',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {memoryDecayStages.map((st) => (
            <div
              key={st.name}
              style={{
                width: `${st.pct}%`,
                height: '100%',
                background: st.color,
                transition: 'width 0.3s ease',
              }}
              title={`${st.name}: ${st.count} concepts (${st.pct}%)`}
            />
          ))}
        </div>

        {/* 5 Stages Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          {memoryDecayStages.map((st) => (
            <div
              key={st.name}
              style={{
                padding: '12px 14px',
                borderRadius: '12px',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: st.color }} />
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>{st.name}</span>
              </div>
              <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block' }}>{st.count}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{st.pct}% of memories</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6 & 7: PATTERN MEMORY HEALTH & REVISION CALENDAR ────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* PATTERN MEMORY HEALTH */}
        <div
          style={{
            borderRadius: '24px',
            background: isLight ? '#FFFFFF' : 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '480px',
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
              PATTERN MEMORY HEALTH
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Risk evaluation across 25 DSA categories
            </span>
          </div>

          <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
            {patternHealthList.map((p) => (
              <div
                key={p.slug}
                style={{
                  padding: '12px 14px',
                  borderRadius: '12px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{p.title}</strong>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <div style={{ width: '70px', height: '4px', borderRadius: '2px', background: isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)' }}>
                      <div
                        style={{
                          width: `${p.memoryPct}%`,
                          height: '100%',
                          background: p.riskColor,
                          borderRadius: '2px',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: p.riskColor }}>
                      {p.memoryPct}%
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 900,
                      color: p.riskColor,
                      background: `${p.riskColor}15`,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {p.risk}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                    Due: {p.dueCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* REVISION CALENDAR */}
        <div
          style={{
            borderRadius: '24px',
            background: isLight ? '#FFFFFF' : 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>
                REVISION CALENDAR
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Spaced repetition schedule &amp; due load
              </span>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F59E0B' }} /> Due
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} /> Done
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#EF4444' }} /> Overdue
              </span>
            </div>
          </div>

          <CalendarGrid
            rawQueue={rawQueue}
            selectedDate={selectedDateFilter}
            onSelectDate={(d) => setSelectedDateFilter(selectedDateFilter === d ? null : d)}
          />
        </div>
      </div>

      {/* ── 8. SPACED REPETITION JOURNEY (1 -> 3 -> 7 -> 14 -> 30 DAY) */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 8px 24px rgba(0, 0, 0, 0.04)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              SPACED REPETITION JOURNEY
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              5-Stage memory consolidation protocol (Ebbinghaus Forgetting Curve)
            </span>
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: '#0284C7',
              background: 'rgba(2, 132, 199, 0.12)',
              padding: '4px 10px',
              borderRadius: '8px',
            }}
          >
            Next Milestone: {totalDueToday > 0 ? 'Clear Due Queue' : '30-Day Retention Lock'}
          </span>
        </div>

        {/* 5 Stages Horizontal Rail */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {timelineStages.map((st, idx) => (
            <div
              key={st.stage}
              style={{
                padding: '16px',
                borderRadius: '16px',
                background:
                  st.status === 'completed'
                    ? 'rgba(16, 185, 129, 0.1)'
                    : st.status === 'current'
                    ? 'rgba(139, 92, 246, 0.15)'
                    : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                border:
                  st.status === 'completed'
                    ? '1.5px solid #10B981'
                    : st.status === 'current'
                    ? '1.5px solid var(--primary, #8B5CF6)'
                    : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--text-muted)' }}>
                  STAGE 0{idx + 1}
                </span>
                {st.status === 'completed' ? (
                  <CheckCircle2 size={14} style={{ color: '#10B981' }} />
                ) : st.status === 'current' ? (
                  <Zap size={14} style={{ color: 'var(--primary, #8B5CF6)' }} />
                ) : (
                  <Lock size={12} style={{ color: '#64748B' }} />
                )}
              </div>

              <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{st.label}</strong>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Interval</span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>{st.intervalDays} Days</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Concepts</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{st.problemCount} Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── REVIEW MODAL DIALOG ────────────────────────────────────── */}
      <AnimatePresence>
        {reviewingProblem && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '480px',
                borderRadius: '24px',
                background: isLight ? '#FFFFFF' : '#0F0B1E',
                border: isLight ? '1.5px solid #CBD5E1' : '1.5px solid var(--primary, #8B5CF6)',
                boxShadow: isLight ? '0 20px 60px rgba(0, 0, 0, 0.15)' : '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.3)',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              <div>
                <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary, #8B5CF6)', textTransform: 'uppercase' }}>
                  Spaced Repetition Review
                </span>
                <h3 style={{ margin: '4px 0', fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  {reviewingProblem.title}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  {reviewingProblem.patternTitle} · {reviewingProblem.categoryTitle}
                </span>
              </div>

              <div
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                How easily did you recall the core invariant and algorithmic pattern for this problem?
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handleRecordReview(reviewingProblem.id, 'hard')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#EF4444',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  Hard
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Review 1d</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRecordReview(reviewingProblem.id, 'medium')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#F59E0B',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  Good
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Review 3d</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRecordReview(reviewingProblem.id, 'easy')}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    color: '#10B981',
                    fontSize: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  Easy
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Review 7d</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setReviewingProblem(null)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-secondary)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── REUSABLE PLATFORM MEMORY CARD ──────────────────────────────────────
function PlatformMemoryCard({
  name,
  color,
  solved,
  total,
  reviewed,
  due,
  retention,
  isLocked,
}: {
  name: string;
  color: string;
  solved: number;
  total: number;
  reviewed: number;
  due: number;
  retention: number;
  isLocked: boolean;
}) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        padding: '18px',
        borderRadius: '16px',
        background: isLocked
          ? isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)'
          : isLight
          ? `linear-gradient(135deg, #FFFFFF 0%, ${color}08 60%, #F8FAFC 100%)`
          : `linear-gradient(135deg, ${color}12 0%, var(--card) 80%)`,
        border: isLight ? '1.5px solid #E2E8F0' : isLocked ? '1px solid rgba(255, 255, 255, 0.08)' : `1.5px solid ${color}40`,
        boxShadow: isLight ? '0 4px 12px rgba(0, 0, 0, 0.03)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '170px',
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <strong style={{ fontSize: '13px', color: isLocked ? 'var(--text-muted)' : color, letterSpacing: '0.04em' }}>
            {name}
          </strong>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isLocked ? 'var(--text-muted)' : color,
              background: isLocked ? (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)') : `${color}18`,
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {isLocked ? 'COMING SOON' : 'ACTIVE'}
          </span>
        </div>

        {!isLocked ? (
          <>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>
              <strong style={{ color: 'var(--text-primary)' }}>{solved}</strong> / {total} Solved
            </span>
            <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Reviewed: <strong style={{ color: 'var(--text-primary)' }}>{reviewed}</strong></span>
              <span>Due: <strong style={{ color: due > 0 ? '#F59E0B' : '#10B981' }}>{due}</strong></span>
            </div>
          </>
        ) : (
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '8px' }}>
            Platform integration in progress.
          </span>
        )}
      </div>

      {!isLocked && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Memory</span>
            <span style={{ color }}>{retention}%</span>
          </div>
          <div style={{ width: '100%', height: '5px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)' }}>
            <div style={{ width: `${retention}%`, height: '100%', background: color, borderRadius: '3px' }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── CALENDAR GRID ──────────────────────────────────────────────────────
function CalendarGrid({
  rawQueue,
  selectedDate,
  onSelectDate,
}: {
  rawQueue: any[];
  selectedDate: string | null;
  onSelectDate: (d: string) => void;
}) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  const days = useMemo(() => {
    const list = [];
    const now = new Date();
    for (let i = -7; i <= 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const itemsForDay = rawQueue.filter(
        (p) => p.revisionData.nextReview && p.revisionData.nextReview.split('T')[0] === iso
      );

      list.push({
        dateObj: d,
        iso,
        dayNumber: d.getDate(),
        dayName: d.toLocaleDateString('en-US', { weekday: 'narrow' }),
        count: itemsForDay.length,
        isToday: i === 0,
        isPast: i < 0,
      });
    }
    return list;
  }, [rawQueue]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
      }}
    >
      {days.map((d) => {
        const isSelected = selectedDate === d.iso;
        const hasDue = d.count > 0;

        return (
          <div
            key={d.iso}
            onClick={() => onSelectDate(d.iso)}
            style={{
              padding: '10px 6px',
              borderRadius: '12px',
              background: isSelected
                ? 'linear-gradient(135deg, #0284C7, #0369A1)'
                : d.isToday
                ? 'rgba(2, 132, 199, 0.15)'
                : hasDue
                ? 'rgba(245, 158, 11, 0.12)'
                : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: isSelected
                ? '1.5px solid #0284C7'
                : d.isToday
                ? '1.5px solid var(--primary, #0284C7)'
                : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
              textAlign: 'center',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{d.dayName}</span>
            <strong style={{ fontSize: '13px', color: isSelected ? '#FFF' : 'var(--text-primary)' }}>
              {d.dayNumber}
            </strong>
            {hasDue ? (
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 900,
                  color: isSelected ? '#FFF' : '#D97706',
                  background: isSelected ? 'rgba(0,0,0,0.3)' : 'rgba(245, 158, 11, 0.2)',
                  padding: '1px 4px',
                  borderRadius: '4px',
                }}
              >
                {d.count}
              </span>
            ) : (
              <div style={{ height: '14px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── STYLE HELPERS ──────────────────────────────────────────────────────
const metricChipSt: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '14px',
  background: 'var(--surface, rgba(255, 255, 255, 0.03))',
  border: '1px solid var(--border, rgba(255, 255, 255, 0.08))',
};

const chipIconSt = (color: string): React.CSSProperties => ({
  width: '34px',
  height: '34px',
  borderRadius: '10px',
  background: `${color}18`,
  border: `1px solid ${color}40`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const chipLabelSt: React.CSSProperties = {
  fontSize: '11px',
  color: 'var(--text-muted)',
  fontWeight: 700,
  display: 'block',
};

const chipValueSt: React.CSSProperties = {
  fontSize: '15px',
  color: 'var(--text-primary)',
  fontWeight: 900,
  display: 'block',
};

const statusPillSt: React.CSSProperties = {
  padding: '10px 12px',
  borderRadius: '10px',
  background: 'var(--surface, rgba(255, 255, 255, 0.03))',
  border: '1px solid var(--border, rgba(255, 255, 255, 0.06))',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
