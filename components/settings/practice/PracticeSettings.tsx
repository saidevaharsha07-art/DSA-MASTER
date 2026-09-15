'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Swords,
  CheckCircle2,
  Check,
  Search,
  Filter,
  Zap,
  Target,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { ProblemModel } from '@/src/curriculum/types';
import { useRoadmap } from '@/hooks/use-roadmap';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { progressService, ActivityRecord } from '@/src/services/progress/progress.service';
import { EventBus } from '@/src/core/events/event-bus';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';
import { SettingsHeader } from '../SettingsHeader';

const PLATFORMS = [
  { id: 'leetcode', label: 'LeetCode', color: '#10B981' },
  { id: 'codechef', label: 'CodeChef', color: '#F97316' },
  { id: 'codeforces', label: 'Codeforces', color: '#0284C7' },
] as const;

const ALL_PROBLEMS = CurriculumRepository.getAllProblems();
const ALL_CATEGORIES = CurriculumRepository.getAllCategories();

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

export function PracticeSettings() {
  const { state: roadmapState, toggle } = useRoadmap();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const { userId } = useActiveUser();
  const { toast } = useToast();

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

  // ── Filters & Controls State ─────────────────────────────────────
  const [selectedPlatform, setSelectedPlatform] = useState<'leetcode' | 'codechef' | 'codeforces'>('leetcode');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unsolved' | 'solved'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  const [activityLogs, setActivityLogs] = useState<ActivityRecord[]>([]);

  useEffect(() => {
    setActivityLogs(progressService.getActivityLog(userId));
    const unsubscribe = EventBus.subscribe('ProblemSolved', () => {
      setActivityLogs(progressService.getActivityLog(userId));
    });
    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPlatform, search, difficultyFilter, categoryFilter, statusFilter]);

  // ── Problem Filtering ────────────────────────────────────────────
  const platformProblems = useMemo(() => {
    if (selectedPlatform === 'codechef') {
      return ALL_PROBLEMS.filter((p) => p.url.includes('codechef.com'));
    }
    if (selectedPlatform === 'codeforces') {
      return ALL_PROBLEMS.filter((p) => p.url.includes('codeforces.com'));
    }
    return ALL_PROBLEMS.filter(
      (p) =>
        !p.url.includes('codeforces.com') &&
        !p.url.includes('codechef.com') &&
        !p.url.includes('geeksforgeeks.org')
    );
  }, [selectedPlatform]);

  const filteredProblems = useMemo(() => {
    let list = [...platformProblems];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          String(p.leetcodeNumber).includes(q) ||
          p.topics.some((t) => t.toLowerCase().includes(q)) ||
          (p.categoryTitle && p.categoryTitle.toLowerCase().includes(q)) ||
          (p.patternTitle && p.patternTitle.toLowerCase().includes(q))
      );
    }

    if (difficultyFilter !== 'all') {
      list = list.filter((p) => {
        const diff = p.difficulty || (p.level === 'Learn' ? 'Easy' : p.level === 'Master' ? 'Hard' : 'Medium');
        return diff.toLowerCase() === difficultyFilter.toLowerCase();
      });
    }

    if (categoryFilter !== 'all') {
      list = list.filter(
        (p) =>
          p.categorySlug === categoryFilter ||
          p.patternSlug === categoryFilter ||
          p.categoryId === categoryFilter
      );
    }

    if (statusFilter === 'solved') {
      list = list.filter((p) => isProblemChecked(p));
    } else if (statusFilter === 'unsolved') {
      list = list.filter((p) => !isProblemChecked(p));
    }

    return list;
  }, [platformProblems, search, difficultyFilter, categoryFilter, statusFilter, isProblemChecked]);

  const paginatedProblems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProblems.slice(start, start + pageSize);
  }, [filteredProblems, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredProblems.length / pageSize) || 1;

  // ── Solved & Stats Metrics ───────────────────────────────────────
  const totalSolvedOverall = useMemo(() => {
    return ALL_PROBLEMS.filter((p) => isProblemChecked(p)).length;
  }, [isProblemChecked]);

  const totalAttempted = Math.max(totalSolvedOverall, activityLogs.length);
  const accuracyPct = totalAttempted > 0 ? Math.min(100, Math.round((totalSolvedOverall / totalAttempted) * 100)) : 94;
  const currentStreak = roadmapState?.currentStreak || 1;

  // ── Pattern Mastery Data ─────────────────────────────────────────
  const KEY_PATTERNS = [
    { title: 'Arrays & Hashing', slug: 'basic-arrays' },
    { title: 'Two Pointers', slug: 'two-pointers' },
    { title: 'Sliding Window', slug: 'sliding-window' },
    { title: 'Binary Search', slug: 'binary-search' },
    { title: 'Trees & BST', slug: 'trees-bst' },
    { title: 'Dynamic Programming', slug: 'dp-1d' },
  ];

  const patternMasteryList = useMemo(() => {
    return KEY_PATTERNS.map((kp) => {
      const pProblems = ALL_PROBLEMS.filter(
        (p) => p.categorySlug === kp.slug || p.patternSlug?.includes(kp.slug) || p.topics.some((t) => t.toLowerCase().includes(kp.slug))
      );
      const total = pProblems.length || 15;
      const solved = pProblems.filter((p) => isProblemChecked(p)).length;
      const pct = Math.round((solved / total) * 100);
      return {
        name: kp.title,
        solved,
        total,
        percentage: pct,
      };
    });
  }, [isProblemChecked]);

  // ── Toggle Solved ────────────────────────────────────────────────
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── 1. PRACTICE HEADER ─────────────────────────────────────── */}
      <SettingsHeader
        icon={<Swords size={18} />}
        title="Practice"
        subtitle="Configure your default practice experience."
      />

      {/* ── 2. PROBLEM FILTERS BAR ─────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px 20px',
          borderRadius: '16px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        {/* Platform Selector Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Platform:
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {PLATFORMS.map((p) => {
              const isSelected = selectedPlatform === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedPlatform(p.id)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: isSelected
                      ? `${p.color}18`
                      : isLight
                      ? '#F8FAFC'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? `1.5px solid ${p.color}` : '1px solid var(--border)',
                    color: isSelected ? (isLight ? p.color : '#FFF') : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: p.color }} />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', alignItems: 'center' }}>
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
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Difficulty */}
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">Difficulty: All</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">Pattern: All ({ALL_CATEGORIES.length})</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">Status: All</option>
            <option value="unsolved">Unsolved</option>
            <option value="solved">Solved</option>
          </select>
        </div>
      </div>

      {/* ── 3. DAILY MISSION & PROBLEM QUEUE ───────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Daily Mission Banner */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: '14px',
            background: isLight
              ? 'var(--accent-soft)'
              : 'var(--card)',
            border: '1px solid var(--accent-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'var(--accent-soft)',
                border: '1px solid var(--accent-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Target size={16} />
            </div>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>Daily Practice Mission</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Complete 3 problem solves today to maintain streak (+150 XP).
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Goal Progress</span>
              <strong style={{ fontSize: '12px', color: '#10B981' }}>
                {Math.min(3, totalSolvedOverall % 4)} / 3 Solved
              </strong>
            </div>
            <Link
              href="/practice"
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                background: 'var(--primary)',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 800,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              Start Practice <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Problem Queue Card (Dominant Focus) */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '18px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>
                Problem Queue
              </h3>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Showing {filteredProblems.length} available problems matching current filters
              </span>
            </div>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Problem Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {paginatedProblems.map((prob) => {
              const isSolved = isProblemChecked(prob);
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
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: isSolved
                      ? 'rgba(16, 185, 129, 0.06)'
                      : isLight
                      ? '#F8FAFC'
                      : 'rgba(255, 255, 255, 0.02)',
                    border: isSolved ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border)',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                    <button
                      type="button"
                      onClick={() => handleToggleSolved(prob)}
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '5px',
                        background: isSolved ? '#10B981' : isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                        border: isSolved ? '1px solid #10B981' : '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSolved ? '#FFF' : 'transparent',
                        cursor: 'pointer',
                        flexShrink: 0,
                        outline: 'none',
                      }}
                    >
                      {isSolved && <Check size={11} strokeWidth={3} />}
                    </button>

                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', fontWeight: 800, width: '55px', flexShrink: 0 }}>
                      {getProblemNumber(prob)}
                    </span>

                    <div style={{ minWidth: 0 }}>
                      <Link
                        href={`/practice/${prob.slug || prob.id}`}
                        style={{
                          fontSize: '12px',
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '1px', fontSize: '10px', color: 'var(--text-muted)' }}>
                        <span>{prob.categoryTitle || 'General'}</span>
                        <span>•</span>
                        <span>{prob.patternTitle || 'Algorithmic Pattern'}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span
                      style={{
                        fontSize: '10px',
                        fontWeight: 800,
                        color: diffColor,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: `${diffColor}14`,
                      }}
                    >
                      {prob.difficulty || (prob.level === 'Learn' ? 'Easy' : prob.level === 'Master' ? 'Hard' : 'Medium')}
                    </span>

                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#F59E0B' }}>
                      +{prob.xp || 50} XP
                    </span>

                    <Link
                      href={`/practice/${prob.slug || prob.id}`}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      Solve →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  background: currentPage === 1 ? 'transparent' : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border)',
                  color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <ChevronLeft size={13} /> Previous
              </button>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  background: currentPage === totalPages ? 'transparent' : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid var(--border)',
                  color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Next <ChevronRight size={13} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 4. PATTERN MASTERY & RECENT SOLVES ──────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Pattern Mastery Grid */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Pattern Mastery
            </h4>
            <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 800 }}>LIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {patternMasteryList.map((pm) => (
              <div key={pm.name} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-primary)' }}>{pm.name}</span>
                  <strong style={{ color: 'var(--text-secondary)' }}>{pm.solved}/{pm.total} ({pm.percentage}%)</strong>
                </div>
                <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                  <div style={{ width: `${pm.percentage}%`, height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Solves Activity */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--card-shadow)',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Recent Solves &amp; Activity
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {activityLogs.slice(0, 4).map((act) => (
              <div
                key={act.id}
                style={{
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  fontSize: '11px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-primary)', textTransform: 'capitalize', display: 'block' }}>{act.action}</strong>
                  <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>
                    {new Date(act.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span style={{ color: '#10B981', fontWeight: 800 }}>+{act.xpEarned} XP</span>
              </div>
            ))}

            {activityLogs.length === 0 && (
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No recent solve records yet.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
