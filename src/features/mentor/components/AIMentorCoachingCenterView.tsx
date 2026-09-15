'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Brain,
  Target,
  AlertTriangle,
  RotateCcw,
  Lightbulb,
  Play,
  Zap,
  Bot,
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Activity,
  Bookmark,
  ChevronRight,
  BarChart3,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  ArrowUpRight,
  Calendar,
  Compass,
  Check,
} from 'lucide-react';

import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { progressService } from '@/src/services/progress/progress.service';
import { RevisionAdapterService } from '@/src/features/revision/services/revision-adapter.service';
import { useToast } from '@/src/context/ToastContext';
import { ProblemModel } from '@/src/curriculum/types';
import { useSettings } from '@/src/context/SettingsContext';

export function AIMentorCoachingCenterView() {
  const { userId } = useActiveUser();
  const { toast } = useToast();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [refreshKey, setRefreshKey] = useState(0);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showWhyModal, setShowWhyModal] = useState<boolean>(false);

  // Subscribe to real-time events
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshKey((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleRefresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleRefresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', handleRefresh);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', handleRefresh);

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
  const activityLogs = useMemo(() => progressService.getActivityLog(userId), [userId, refreshKey]);
  const revisionSummary = useMemo(() => RevisionAdapterService.getRevisionSummary(userId), [userId, refreshKey]);

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

  // 1. PERFORMANCE & PLATFORM STATS
  const totalSolved = useMemo(() => {
    return allProblems.filter((p) => isProblemSolved(p)).length;
  }, [allProblems, canonicalSolvedSet, refreshKey]);

  const totalCanonical = allProblems.length;
  const overallCompletionPct = totalCanonical > 0 ? Math.round((totalSolved / totalCanonical) * 100) : 0;
  const currentStreak = state.currentStreak || 0;
  const dueReviewsCount = revisionSummary.dueTodayProblems.length;

  const platformStats = useMemo(() => {
    const lcAll = allProblems.filter(
      (p) => !p.url?.includes('codechef.com') && !p.url?.includes('codeforces.com') && !p.url?.includes('geeksforgeeks.org')
    );
    const ccAll = allProblems.filter((p) => p.url?.includes('codechef.com'));
    const cfAll = allProblems.filter((p) => p.url?.includes('codeforces.com'));

    const lcSolved = lcAll.filter((p) => isProblemSolved(p)).length;
    const ccSolved = ccAll.filter((p) => isProblemSolved(p)).length;
    const cfSolved = cfAll.filter((p) => isProblemSolved(p)).length;

    return {
      leetcode: {
        solved: lcSolved,
        total: lcAll.length,
        pct: lcAll.length > 0 ? Math.round((lcSolved / lcAll.length) * 100) : 0,
        status: 'Connected',
      },
      codechef: {
        solved: ccSolved,
        total: ccAll.length,
        pct: ccAll.length > 0 ? Math.round((ccSolved / ccAll.length) * 100) : 0,
        status: 'Connected',
      },
      codeforces: {
        solved: cfSolved,
        total: cfAll.length,
        pct: cfAll.length > 0 ? Math.round((cfSolved / cfAll.length) * 100) : 0,
        status: 'Connected',
      },
      geeksforgeeks: {
        solved: 0,
        total: 0,
        pct: 0,
        status: 'Coming Soon',
      },
    };
  }, [allProblems, canonicalSolvedSet, refreshKey]);

  // 2. CATEGORY MASTERY & AI DIAGNOSIS
  const categoryMastery = useMemo(() => {
    return allCategories.map((cat, idx) => {
      const catProblems = allProblems.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id || p.categoryTitle === cat.title
      );
      const solved = catProblems.filter((p) => isProblemSolved(p)).length;
      const total = catProblems.length;
      const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

      return {
        id: idx + 1,
        slug: cat.slug,
        title: cat.title,
        solvedCount: solved,
        totalCount: total,
        masteryPct: pct,
        unsolvedProblems: catProblems.filter((p) => !isProblemSolved(p)),
      };
    });
  }, [allCategories, allProblems, canonicalSolvedSet, refreshKey]);

  // Top Strengths (sorted by solved / mastery descending)
  const strengths = useMemo(() => {
    const withSolved = categoryMastery.filter((c) => c.solvedCount > 0);
    if (withSolved.length === 0) {
      return categoryMastery.slice(0, 3);
    }
    return [...withSolved].sort((a, b) => b.masteryPct - a.masteryPct || b.solvedCount - a.solvedCount).slice(0, 3);
  }, [categoryMastery]);

  // Top Weaknesses (sorted by lowest mastery or first incomplete)
  const weaknesses = useMemo(() => {
    return [...categoryMastery].sort((a, b) => a.masteryPct - b.masteryPct || a.solvedCount - b.solvedCount).slice(0, 3);
  }, [categoryMastery]);

  const strongestArea = strengths[0] || categoryMastery[0];
  const weakestArea = weaknesses[0] || categoryMastery[1] || categoryMastery[0];

  // Recent trend calculation
  const recentTrend = useMemo(() => {
    const oneWeekAgo = Date.now() - 7 * 24 * 3600 * 1000;
    const recentLogs = activityLogs.filter((l) => new Date(l.timestamp).getTime() >= oneWeekAgo);
    if (recentLogs.length >= 5) {
      return { status: 'Improving', text: 'Steady upward trend with consistent practice over the last 7 days.', color: '#10B981' };
    }
    if (recentLogs.length >= 1) {
      return { status: 'Stable', text: 'Consistent retention baseline, ready to accelerate problem volume.', color: '#38BDF8' };
    }
    return { status: 'Needs Acceleration', text: 'Solve daily problems to build retention and momentum.', color: '#F59E0B' };
  }, [activityLogs]);

  // 3. RECOMMENDATIONS
  const primaryRecommendation = useMemo(() => {
    // Look for unsolved problems in the weakest category first
    let candidate = weakestArea.unsolvedProblems[0];
    if (!candidate) {
      const firstUnsolvedCat = categoryMastery.find((c) => c.unsolvedProblems.length > 0);
      candidate = firstUnsolvedCat ? firstUnsolvedCat.unsolvedProblems[0] : allProblems[0];
    }

    const platform = candidate.url?.includes('codechef.com')
      ? 'CodeChef'
      : candidate.url?.includes('codeforces.com')
      ? 'Codeforces'
      : 'LeetCode';

    return {
      problem: candidate,
      platform,
      reason: `Targeted reinforcement in ${weakestArea.title} (${weakestArea.masteryPct}% current mastery) to eliminate algorithmic bottlenecks.`,
      estTime: candidate.difficulty === 'Easy' ? '15 min' : candidate.difficulty === 'Hard' ? '35 min' : '25 min',
    };
  }, [weakestArea, categoryMastery, allProblems]);

  const alternativeRecommendations = useMemo(() => {
    const result: Array<{ problem: ProblemModel; platform: string; reason: string; estTime: string }> = [];

    // Alternative from second weak category
    const secWeak = weaknesses[1];
    if (secWeak && secWeak.unsolvedProblems.length > 0) {
      const p = secWeak.unsolvedProblems[0];
      result.push({
        problem: p,
        platform: p.url?.includes('codechef') ? 'CodeChef' : p.url?.includes('codeforces') ? 'Codeforces' : 'LeetCode',
        reason: `Strengthen ${secWeak.title} pattern foundations before expanding to advanced topics.`,
        estTime: p.difficulty === 'Easy' ? '15 min' : '25 min',
      });
    }

    // Alternative from third weak category or due revision
    const thirdWeak = weaknesses[2];
    if (thirdWeak && thirdWeak.unsolvedProblems.length > 0) {
      const p = thirdWeak.unsolvedProblems[0];
      result.push({
        problem: p,
        platform: p.url?.includes('codechef') ? 'CodeChef' : p.url?.includes('codeforces') ? 'Codeforces' : 'LeetCode',
        reason: `Broaden pattern coverage in ${thirdWeak.title} (${thirdWeak.solvedCount} solved).`,
        estTime: p.difficulty === 'Easy' ? '15 min' : '25 min',
      });
    }

    // Fill up to 3 recommendations
    while (result.length < 3) {
      const nextCat = categoryMastery.find((c) => c.unsolvedProblems.some((p) => !result.some((r) => r.problem.id === p.id)));
      if (!nextCat) break;
      const p = nextCat.unsolvedProblems.find((item) => !result.some((r) => r.problem.id === item.id))!;
      result.push({
        problem: p,
        platform: p.url?.includes('codechef') ? 'CodeChef' : p.url?.includes('codeforces') ? 'Codeforces' : 'LeetCode',
        reason: `Expand foundational algorithmic skill in ${nextCat.title}.`,
        estTime: '20 min',
      });
    }

    return result;
  }, [weaknesses, categoryMastery]);

  // 4. LEARNING PROFILE METRICS
  const learningProfile = useMemo(() => {
    const activeCategoriesCount = categoryMastery.filter((c) => c.solvedCount > 0).length;
    const patternCoveragePct = Math.round((activeCategoriesCount / 25) * 100);
    const consistencyPct = Math.min(100, Math.max(10, currentStreak * 20));
    const retentionPct = revisionSummary.dueTodayProblems.length === 0 ? 100 : Math.max(50, 100 - revisionSummary.dueTodayProblems.length * 10);

    const easySolved = allProblems.filter((p) => isProblemSolved(p) && p.difficulty === 'Easy').length;
    const medSolved = allProblems.filter((p) => isProblemSolved(p) && p.difficulty === 'Medium').length;
    const hardSolved = allProblems.filter((p) => isProblemSolved(p) && p.difficulty === 'Hard').length;

    return {
      patternCoveragePct,
      consistencyPct,
      retentionPct,
      difficultyBreakdown: { easy: easySolved, medium: medSolved, hard: hardSolved },
    };
  }, [categoryMastery, currentStreak, revisionSummary, allProblems, canonicalSolvedSet, refreshKey]);

  // 5. CHRONOLOGICAL COACHING HISTORY
  const coachingHistory = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString().split('T')[0];

    const todayItems: string[] = [];
    const yesterdayItems: string[] = [];
    const earlierItems: string[] = [];

    activityLogs.slice(0, 15).forEach((log) => {
      const date = log.timestamp.split('T')[0];
      const prob = CurriculumRepository.getProblemById(log.problemId);
      const probTitle = prob?.title || log.pattern || log.topic || 'Problem';
      const actionName = log.action === 'solve' || log.action === 'SOLVED' || log.action === 'solved'
        ? 'Solved'
        : log.action === 'review' || log.action === 'REVIEWED' || log.action === 'reviewed'
        ? 'Reviewed'
        : 'Practiced';
      const text = `${actionName} ${probTitle} (+${log.xpEarned || 10} XP)`;

      if (date === today) {
        if (!todayItems.includes(text)) todayItems.push(text);
      } else if (date === yesterday) {
        if (!yesterdayItems.includes(text)) yesterdayItems.push(text);
      } else {
        if (!earlierItems.includes(text)) earlierItems.push(text);
      }
    });

    return {
      today: todayItems,
      yesterday: yesterdayItems,
      earlier: earlierItems,
    };
  }, [activityLogs]);

  // Actions
  const toggleBookmark = (id: string) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((b) => b !== id));
      toast('Removed from saved practice list.', 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
      toast('Problem saved to bookmarks!', 'success');
    }
  };

  const scrollToWeaknesses = () => {
    const el = document.getElementById('weakness-section');
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
      {/* ── 1. HERO — AI MENTOR COACHING CENTER ────────────────────── */}
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
          {/* Title, Badge & Subtitle */}
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
              <Bot size={24} style={{ color: 'var(--primary, #8B5CF6)' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  AI MENTOR
                </h1>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: 'var(--primary, #8B5CF6)',
                    background: 'rgba(139, 92, 246, 0.15)',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  PERSONAL DSA COACH
                </span>
              </div>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                Data-driven diagnosis and targeted algorithmic practice recommendations
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href={
                primaryRecommendation.problem.categorySlug
                  ? `/practice/${primaryRecommendation.problem.categorySlug}`
                  : '/practice'
              }
              style={{ textDecoration: 'none' }}
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                style={{
                  padding: '12px 24px',
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
                <Zap size={16} fill="#FFF" /> Start Recommended Practice
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={scrollToWeaknesses}
              style={{
                padding: '12px 20px',
                borderRadius: '14px',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <AlertTriangle size={15} style={{ color: '#F59E0B' }} /> Review My Weaknesses
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── 2. YOUR CURRENT PERFORMANCE & PLATFORM TELEMETRY ─────────── */}
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
              YOUR CURRENT PERFORMANCE
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Real-time telemetry across canonical curriculum and connected platforms
            </span>
          </div>
        </div>

        {/* 4 Compact Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          <div style={metricCardSt(isLight)}>
            <div style={metricIconSt('#10B981')}>
              <CheckCircle2 size={16} style={{ color: '#10B981' }} />
            </div>
            <div>
              <span style={metricLabelSt}>Problems Solved</span>
              <strong style={metricValueSt}>
                {totalSolved} / {totalCanonical}
              </strong>
            </div>
          </div>

          <div style={metricCardSt(isLight)}>
            <div style={metricIconSt('var(--primary, #8B5CF6)')}>
              <Zap size={16} style={{ color: 'var(--primary, #8B5CF6)' }} />
            </div>
            <div>
              <span style={metricLabelSt}>Overall Completion</span>
              <strong style={metricValueSt}>{overallCompletionPct}%</strong>
            </div>
          </div>

          <div style={metricCardSt(isLight)}>
            <div style={metricIconSt('#F97316')}>
              <Flame size={16} style={{ color: '#F97316' }} />
            </div>
            <div>
              <span style={metricLabelSt}>Current Streak</span>
              <strong style={metricValueSt}>{currentStreak} Days</strong>
            </div>
          </div>

          <div style={metricCardSt(isLight)}>
            <div style={metricIconSt(dueReviewsCount > 0 ? '#F59E0B' : '#10B981')}>
              <RotateCcw size={16} style={{ color: dueReviewsCount > 0 ? '#F59E0B' : '#10B981' }} />
            </div>
            <div>
              <span style={metricLabelSt}>Needs Review</span>
              <strong style={{ ...metricValueSt, color: dueReviewsCount > 0 ? '#F59E0B' : '#10B981' }}>
                {dueReviewsCount} Due
              </strong>
            </div>
          </div>
        </div>

        {/* Platform Breakdown */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)',
          }}
        >
          {/* LeetCode */}
          <div style={platformCardSt('#10B981', isLight)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#10B981' }}>LEETCODE</span>
              <span style={statusBadgeSt('#10B981')}>{platformStats.leetcode.status}</span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', margin: '6px 0 2px 0' }}>
              {platformStats.leetcode.solved} / {platformStats.leetcode.total} Solved
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{platformStats.leetcode.pct}% completion</span>
          </div>

          {/* CodeChef */}
          <div style={platformCardSt('#F97316', isLight)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#F97316' }}>CODECHEF</span>
              <span style={statusBadgeSt('#F97316')}>{platformStats.codechef.status}</span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', margin: '6px 0 2px 0' }}>
              {platformStats.codechef.solved} / {platformStats.codechef.total} Solved
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{platformStats.codechef.pct}% completion</span>
          </div>

          {/* Codeforces */}
          <div style={platformCardSt('#3B82F6', isLight)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: '#3B82F6' }}>CODEFORCES</span>
              <span style={statusBadgeSt('#3B82F6')}>{platformStats.codeforces.status}</span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)', display: 'block', margin: '6px 0 2px 0' }}>
              {platformStats.codeforces.solved} / {platformStats.codeforces.total} Solved
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{platformStats.codeforces.pct}% completion</span>
          </div>

          {/* GeeksForGeeks */}
          <div style={platformCardSt('#64748B', isLight)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-muted)' }}>GEEKSFORGEEKS</span>
              <span style={statusBadgeSt('#64748B')}>{platformStats.geeksforgeeks.status}</span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-muted)', display: 'block', margin: '6px 0 2px 0' }}>
              0 / 0 Solved
            </strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Integration in progress</span>
          </div>
        </div>
      </div>

      {/* ── 3. AI DIAGNOSIS ────────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(139, 92, 246, 0.06) 60%, #F8FAFC 100%)'
            : 'var(--card)',
          border: isLight ? '1.5px solid rgba(139, 92, 246, 0.35)' : '1.5px solid var(--accent-border)',
          boxShadow: isLight
            ? '0 10px 30px rgba(139, 92, 246, 0.08), 0 2px 8px rgba(0, 0, 0, 0.03)'
            : '0 14px 40px rgba(0, 0, 0, 0.35), 0 0 25px var(--accent-glow)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--primary, #8B5CF6)' }}>
            <Activity size={18} style={{ color: 'var(--primary, #8B5CF6)' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              AI DIAGNOSIS
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Automated algorithmic performance evaluation and pattern mastery analysis
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* WEAKEST AREA */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1.5px solid rgba(239, 68, 68, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase' }}>
                Weakest Area
              </span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444', background: 'rgba(239,68,68,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                {weakestArea.masteryPct}% Mastery
              </span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{weakestArea.title}</strong>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong>Why:</strong> Low solved volume ({weakestArea.solvedCount}/{weakestArea.totalCount} problems solved). Pattern recognition requires deliberate practice.
            </p>
          </div>

          {/* STRONGEST AREA */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1.5px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#10B981', textTransform: 'uppercase' }}>
                Strongest Area
              </span>
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#10B981', background: 'rgba(16,185,129,0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                {strongestArea.masteryPct}% Mastery
              </span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>{strongestArea.title}</strong>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              <strong>Performance:</strong> High solve volume ({strongestArea.solvedCount} problems) and stable pattern retention.
            </p>
          </div>

          {/* RECENT TREND */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
              border: isLight ? '1px solid #E2E8F0' : '1.5px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Recent Trend
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  color: recentTrend.color,
                  background: `${recentTrend.color}15`,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {recentTrend.status}
              </span>
            </div>
            <strong style={{ fontSize: '16px', color: 'var(--text-primary)' }}>Activity Telemetry</strong>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {recentTrend.text}
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. WHAT SHOULD I DO NEXT? (PRIMARY RECOMMENDATION) ──────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, rgba(245, 158, 11, 0.06) 60%, #F8FAFC 100%)'
            : 'var(--card)',
          border: '1.5px solid #F59E0B',
          boxShadow: isLight
            ? '0 8px 24px rgba(245, 158, 11, 0.08)'
            : '0 14px 40px rgba(0, 0, 0, 0.35), 0 0 25px rgba(245, 158, 11, 0.2)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#F59E0B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              WHAT SHOULD I DO NEXT?
            </span>
            <h2 style={{ margin: '2px 0 0 0', fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>
              {primaryRecommendation.problem.title}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: primaryRecommendation.platform === 'LeetCode' ? '#10B981' : primaryRecommendation.platform === 'CodeChef' ? '#F97316' : '#3B82F6',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                border: isLight ? '1px solid #E2E8F0' : 'none',
                padding: '4px 10px',
                borderRadius: '8px',
              }}
            >
              {primaryRecommendation.platform}
            </span>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color:
                  primaryRecommendation.problem.difficulty === 'Easy'
                    ? '#10B981'
                    : primaryRecommendation.problem.difficulty === 'Hard'
                    ? '#EF4444'
                    : '#F59E0B',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                border: isLight ? '1px solid #E2E8F0' : 'none',
                padding: '4px 10px',
                borderRadius: '8px',
              }}
            >
              {primaryRecommendation.problem.difficulty}
            </span>
          </div>
        </div>

        <div
          style={{
            padding: '14px 18px',
            borderRadius: '14px',
            background: isLight ? '#F8FAFC' : 'rgba(7, 5, 18, 0.7)',
            border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
          }}
        >
          <div style={{ flex: '1 1 300px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700 }}>WHY THIS PROBLEM:</span>
            <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {primaryRecommendation.reason}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>ESTIMATED TIME</span>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{primaryRecommendation.estTime}</strong>
            </div>

            <Link
              href={
                primaryRecommendation.problem.categorySlug
                  ? `/practice/${primaryRecommendation.problem.categorySlug}`
                  : '/practice'
              }
              style={{ textDecoration: 'none' }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                style={{
                  padding: '10px 20px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                  border: 'none',
                  color: '#000',
                  fontSize: '12px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                Start Problem <ArrowRight size={14} />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 5. RECOMMENDED PROBLEMS QUEUE ─────────────────────────── */}
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
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            RECOMMENDED PROBLEMS
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Dynamically curated practice queue responding to your live pattern metrics
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {alternativeRecommendations.map(({ problem, platform, reason, estTime }) => {
            const isBookmarked = bookmarkedIds.includes(problem.id);

            return (
              <div
                key={problem.id}
                style={{
                  padding: '18px',
                  borderRadius: '16px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        color: platform === 'LeetCode' ? '#10B981' : platform === 'CodeChef' ? '#F97316' : '#3B82F6',
                      }}
                    >
                      {platform}
                    </span>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          color:
                            problem.difficulty === 'Easy'
                              ? '#10B981'
                              : problem.difficulty === 'Hard'
                              ? '#EF4444'
                              : '#F59E0B',
                          background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                          border: isLight ? '1px solid #E2E8F0' : 'none',
                          padding: '2px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        {problem.difficulty}
                      </span>

                      <button
                        type="button"
                        onClick={() => toggleBookmark(problem.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: isBookmarked ? 'var(--primary, #8B5CF6)' : '#64748B',
                          cursor: 'pointer',
                          padding: '2px',
                        }}
                      >
                        <Bookmark size={14} fill={isBookmarked ? 'var(--primary, #8B5CF6)' : 'none'} />
                      </button>
                    </div>
                  </div>

                  <strong style={{ fontSize: '15px', color: 'var(--text-primary)', display: 'block' }}>{problem.title}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>
                    {problem.patternTitle || problem.categoryTitle}
                  </span>

                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {reason}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Est. {estTime}</span>

                  <Link
                    href={problem.categorySlug ? `/practice/${problem.categorySlug}` : '/practice'}
                    style={{ textDecoration: 'none' }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        background: 'rgba(139, 92, 246, 0.2)',
                        border: '1px solid var(--primary, #8B5CF6)',
                        color: isLight ? 'var(--primary)' : '#FFF',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      Practice →
                    </motion.button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 6 & 7: STRENGTHS & WEAKNESSES ───────────────────────────── */}
      <div id="weakness-section" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* STRENGTHS */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} style={{ color: '#10B981' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>STRENGTHS</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Top 3 highest mastery categories</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {strengths.map((s) => (
              <Link key={s.slug} href={`/practice/${s.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{s.title}</strong>
                    <span style={{ fontSize: '11px', color: '#10B981' }}>View solved problems →</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#10B981' }}>{s.masteryPct}%</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Mastery</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* NEEDS WORK (WEAKNESSES) */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} style={{ color: '#EF4444' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>NEEDS WORK</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Top 3 lowest mastery areas needing targeted practice</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {weaknesses.map((w) => (
              <Link key={w.slug} href={`/practice/${w.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: 'rgba(239, 68, 68, 0.06)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '14px', color: 'var(--text-primary)', display: 'block' }}>{w.title}</strong>
                    <span style={{ fontSize: '11px', color: '#EF4444' }}>Practice next problem →</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#EF4444' }}>{w.masteryPct}%</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Mastery</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. LEARNING PROFILE & COACHING PLAN ──────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        {/* LEARNING PROFILE */}
        <div
          style={{
            borderRadius: '24px',
            background: isLight ? '#FFFFFF' : 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>LEARNING PROFILE</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Skill indicators derived from canonical progress data</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Pattern Coverage</span>
                <strong style={{ color: 'var(--accent-primary)' }}>{learningProfile.patternCoveragePct}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)' }}>
                <div style={{ width: `${learningProfile.patternCoveragePct}%`, height: '100%', background: 'var(--accent-primary)', borderRadius: '3px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Problem Solving Consistency</span>
                <strong style={{ color: '#F97316' }}>{learningProfile.consistencyPct}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)' }}>
                <div style={{ width: `${learningProfile.consistencyPct}%`, height: '100%', background: '#F97316', borderRadius: '3px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Revision Retention</span>
                <strong style={{ color: '#10B981' }}>{learningProfile.retentionPct}%</strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255,255,255,0.08)' }}>
                <div style={{ width: `${learningProfile.retentionPct}%`, height: '100%', background: '#10B981', borderRadius: '3px' }} />
              </div>
            </div>

            <div style={{ paddingTop: '8px', borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Difficulty Solved:</span>
              <span>
                <strong style={{ color: '#10B981' }}>{learningProfile.difficultyBreakdown.easy} Easy</strong> ·{' '}
                <strong style={{ color: '#F59E0B' }}>{learningProfile.difficultyBreakdown.medium} Medium</strong> ·{' '}
                <strong style={{ color: '#EF4444' }}>{learningProfile.difficultyBreakdown.hard} Hard</strong>
              </span>
            </div>
          </div>
        </div>

        {/* PERSONAL COACHING PLAN */}
        <div
          style={{
            borderRadius: '24px',
            background: isLight ? '#FFFFFF' : 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>PERSONAL COACHING PLAN</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Targeted short-term milestones based on your weaknesses</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={planCardSt(isLight)}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: '#F59E0B', textTransform: 'uppercase' }}>TODAY</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                → Practice 1 problem in weakest pattern: <strong>{weakestArea.title}</strong>
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                → Review <strong>{dueReviewsCount} due revision concepts</strong> in the Revision Center.
              </p>
            </div>

            <div style={planCardSt(isLight)}>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--accent-primary)', textTransform: 'uppercase' }}>THIS WEEK</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                → Raise <strong>{weakestArea.title}</strong> mastery above 40%.
              </p>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
                → Increase Medium difficulty exposure across LeetCode and Codeforces.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 9. RECENT COACHING HISTORY ──────────────────────────────── */}
      <div
        style={{
          width: '100%',
          boxSizing: 'border-box',
          borderRadius: '24px',
          background: isLight ? '#FFFFFF' : 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: isLight ? '0 10px 30px rgba(0, 0, 0, 0.05)' : '0 14px 40px rgba(0, 0, 0, 0.35)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            RECENT COACHING HISTORY
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Chronological log of solved problems, reviews, and pattern milestones
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Today */}
          {coachingHistory.today.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--primary, #8B5CF6)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Today
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {coachingHistory.today.map((item, idx) => (
                  <div key={idx} style={historyItemSt(isLight)}>
                    <CheckCircle2 size={13} style={{ color: '#10B981' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary, #CBD5E1)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yesterday */}
          {coachingHistory.yesterday.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted, #94A3B8)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Yesterday
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {coachingHistory.yesterday.map((item, idx) => (
                  <div key={idx} style={historyItemSt(isLight)}>
                    <CheckCircle2 size={13} style={{ color: '#38BDF8' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary, #CBD5E1)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earlier */}
          {coachingHistory.earlier.length > 0 && (
            <div>
              <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--text-muted, #64748B)', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Earlier This Week
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {coachingHistory.earlier.map((item, idx) => (
                  <div key={idx} style={historyItemSt(isLight)}>
                    <CheckCircle2 size={13} style={{ color: 'var(--text-muted, #94A3B8)' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary, #CBD5E1)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {coachingHistory.today.length === 0 && coachingHistory.yesterday.length === 0 && coachingHistory.earlier.length === 0 && (
            <div style={{ padding: '24px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>
                No recent coaching events logged. Practice problems to populate your coaching history.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── STYLE HELPERS ──────────────────────────────────────────────────────
const metricCardSt = (isLight: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 16px',
  borderRadius: '14px',
  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
});

const metricIconSt = (color: string): React.CSSProperties => ({
  width: '34px',
  height: '34px',
  borderRadius: '10px',
  background: `${color}18`,
  border: `1px solid ${color}40`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const metricLabelSt: React.CSSProperties = {
  fontSize: '11px',
  color: 'var(--text-muted, #94A3B8)',
  fontWeight: 700,
  display: 'block',
};

const metricValueSt: React.CSSProperties = {
  fontSize: '15px',
  color: 'var(--text-primary, #FFF)',
  fontWeight: 900,
  display: 'block',
};

const platformCardSt = (color: string, isLight: boolean): React.CSSProperties => ({
  padding: '14px 16px',
  borderRadius: '14px',
  background: isLight
    ? `linear-gradient(135deg, #FFFFFF 0%, ${color}08 50%, #F8FAFC 100%)`
    : `linear-gradient(135deg, ${color}10 0%, var(--card) 80%)`,
  border: isLight ? `1.5px solid ${color}33` : `1px solid ${color}33`,
});

const statusBadgeSt = (color: string): React.CSSProperties => ({
  fontSize: '10px',
  fontWeight: 800,
  color,
  background: `${color}18`,
  padding: '2px 6px',
  borderRadius: '4px',
});

const planCardSt = (isLight: boolean): React.CSSProperties => ({
  padding: '14px 16px',
  borderRadius: '12px',
  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
});

const historyItemSt = (isLight: boolean): React.CSSProperties => ({
  padding: '10px 14px',
  borderRadius: '10px',
  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});
