'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Trophy,
  Zap,
  Clock,
  Target,
  Award,
  ChevronRight,
  Bot,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Flame,
  BarChart2,
  BookOpen,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';
import { RecommendationCard } from '@/src/intelligence/recommendations/components/RecommendationCard';
import {
  ContestPerformanceReport,
  LeaderboardEntry,
  PerformancePillar,
} from '../types/contest.types';

interface ContestResultsViewProps {
  report: ContestPerformanceReport;
  leaderboard: LeaderboardEntry[];
  onReturnToLobby: () => void;
}

export function ContestResultsView({
  report,
  leaderboard,
  onReturnToLobby,
}: ContestResultsViewProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [activeTab, setActiveTab] = useState<'analysis' | 'leaderboard' | 'problems'>('analysis');

  const mentorUrl = `/mentor?context=contest&contestId=${encodeURIComponent(
    report.contestId
  )}&score=${report.score}&solved=${report.solvedCount}&total=${report.totalProblems}`;

  const pillarsList: PerformancePillar[] = Object.values(report.pillars);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 pb-16">
      {/* ── 1. TOP NAV ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={onReturnToLobby}
          className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Return to Contest Lobby
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center gap-1.5">
          <ShieldCheck size={13} /> Scorecard Verified & Sealed
        </span>
      </div>

      {/* ── 2. HERO SCORECARD BANNER ───────────────────────────────── */}
      <div
        className="rounded-3xl p-6 sm:p-10 border relative overflow-hidden"
        style={{
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)'
            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 27, 75, 0.9) 60%, rgba(88, 28, 135, 0.3) 100%)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(139, 92, 246, 0.3)',
          boxShadow: isLight
            ? '0 10px 30px rgba(0, 0, 0, 0.05)'
            : '0 20px 50px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-pink-500">
              Contest Performance Summary
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-[var(--text-primary)]">
              {report.contestTitle}
            </h1>
            <p className="text-xs text-[var(--text-secondary)]">
              Completed on {new Date(report.completedAt).toLocaleString()} • Duration: {report.totalTimeMinutes}m
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
            {/* Rank Badge */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Global Rank</span>
              <span className="text-xl sm:text-2xl font-black text-amber-500">#{report.rank}</span>
              <span className="text-[10px] font-semibold text-emerald-500 block">Top {report.percentile}%</span>
            </div>

            {/* Score */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Final Score</span>
              <span className="text-xl sm:text-2xl font-black text-pink-500">{report.score} Pts</span>
              <span className="text-[10px] font-semibold text-[var(--text-secondary)] block">
                {report.solvedCount}/{report.totalProblems} Solved
              </span>
            </div>

            {/* ICPC Penalty */}
            <div className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-center">
              <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">ICPC Penalty</span>
              <span className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
                {report.penaltyMinutes}m
              </span>
              <span className="text-[10px] font-semibold text-[var(--text-muted)] block">Total Penalty</span>
            </div>
          </div>
        </div>

        {/* AI Mentor Deep Link Banner CTA */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-pink-500/10 text-pink-500">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Analyze this contest with AI Mentor
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Transfer your contest code, missed testcases, and timing telemetry directly to AI Mentor for 1-on-1 coaching.
              </p>
            </div>
          </div>

          <Link
            href={mentorUrl}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all shadow-md flex items-center gap-2 whitespace-nowrap self-end sm:self-center"
          >
            <Sparkles size={14} /> Open in AI Mentor <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── 3. SECTION TABS (Analysis, Leaderboard, Problems) ───────── */}
      <div className="flex rounded-xl bg-[var(--surface)] p-1 border border-[var(--border)] self-start">
        <button
          onClick={() => setActiveTab('analysis')}
          className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: activeTab === 'analysis' ? 'var(--card)' : 'transparent',
            color: activeTab === 'analysis' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          7-Pillar Analysis
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: activeTab === 'leaderboard' ? 'var(--card)' : 'transparent',
            color: activeTab === 'leaderboard' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          Live Leaderboard
        </button>

        <button
          onClick={() => setActiveTab('problems')}
          className="px-5 py-2 rounded-lg text-xs font-bold transition-all"
          style={{
            background: activeTab === 'problems' ? 'var(--card)' : 'transparent',
            color: activeTab === 'problems' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          Problem Breakdown
        </button>
      </div>

      {/* ── 4. TAB CONTENT ─────────────────────────────────────────── */}
      {activeTab === 'analysis' && (
        <div className="flex flex-col gap-8">
          {/* 7 Core Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pillarsList.map((pillar) => (
              <div
                key={pillar.name}
                className="p-5 rounded-2xl border bg-[var(--card)] flex flex-col justify-between gap-4"
                style={{
                  borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {pillar.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded font-black text-xs"
                      style={{
                        background:
                          pillar.grade === 'S' || pillar.grade === 'A'
                            ? 'rgba(16, 185, 129, 0.15)'
                            : pillar.grade === 'B'
                            ? 'rgba(59, 130, 246, 0.15)'
                            : 'rgba(245, 158, 11, 0.15)',
                        color:
                          pillar.grade === 'S' || pillar.grade === 'A'
                            ? '#10B981'
                            : pillar.grade === 'B'
                            ? '#3B82F6'
                            : '#F59E0B',
                      }}
                    >
                      Grade {pillar.grade} ({pillar.score}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[var(--surface)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${pillar.score}%`,
                        background:
                          pillar.score >= 80
                            ? '#10B981'
                            : pillar.score >= 60
                            ? '#3B82F6'
                            : '#F59E0B',
                      }}
                    />
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mt-3 leading-relaxed">
                    {pillar.insight}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-[var(--surface)] text-[11px] text-[var(--text-muted)] font-medium border border-[var(--border)]">
                  💡 {pillar.recommendation}
                </div>
              </div>
            ))}
          </div>

          {/* Strengths & Weaknesses Intelligence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div
              className="p-6 rounded-2xl border bg-[var(--card)] flex flex-col gap-3"
              style={{ borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)' }}
            >
              <h3 className="text-sm font-bold text-emerald-500 flex items-center gap-2">
                <CheckCircle2 size={16} /> What Went Well
              </h3>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {report.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses & Practice */}
            <div
              className="p-6 rounded-2xl border bg-[var(--card)] flex flex-col gap-3"
              style={{ borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)' }}
            >
              <h3 className="text-sm font-bold text-amber-500 flex items-center gap-2">
                <AlertTriangle size={16} /> Targeted Areas for Practice
              </h3>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
                {report.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Post-Contest Recommended Action */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
              <Zap size={16} className="text-pink-500" /> Next Best Action Following Contest
            </h3>
            <RecommendationCard
              recommendation={RecommendationEngineService.getPostContestRecommendation('active-user', {
                contestId: report.contestId,
                score: report.score,
                solvedCount: report.solvedCount,
                totalProblems: report.totalProblems,
                weakTopics: report.weaknesses,
              })}
              variant="compact"
            />
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border)] bg-[var(--surface)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-purple-500" />
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Contest Standings
              </h3>
            </div>
            <span className="text-xs text-[var(--text-muted)] font-semibold">
              Ranked by Score (Desc) & Penalty Time (Asc)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] font-bold">
                  <th className="p-3.5 w-16">Rank</th>
                  <th className="p-3.5">Participant</th>
                  <th className="p-3.5">Solved</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Penalty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {leaderboard.map((entry) => {
                  const isYou = entry.isCurrentUser;
                  return (
                    <tr
                      key={entry.userId}
                      className={
                        isYou
                          ? 'bg-pink-500/10 font-bold'
                          : 'hover:bg-[var(--surface-hover)] transition-colors'
                      }
                    >
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded font-black text-xs ${
                            entry.rank === 1
                              ? 'bg-amber-500/20 text-amber-500'
                              : entry.rank === 2
                              ? 'bg-slate-400/20 text-slate-300'
                              : entry.rank === 3
                              ? 'bg-amber-700/20 text-amber-600'
                              : 'text-[var(--text-muted)]'
                          }`}
                        >
                          #{entry.rank}
                        </span>
                      </td>
                      <td className="p-3.5 flex items-center gap-2">
                        {entry.countryCode && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-muted)] font-mono">
                            {entry.countryCode}
                          </span>
                        )}
                        <span
                          className={isYou ? 'text-pink-500 font-extrabold' : 'text-[var(--text-primary)]'}
                        >
                          {entry.displayName}
                        </span>
                      </td>
                      <td className="p-3.5 font-bold text-[var(--text-primary)]">
                        {entry.solvedCount}/{entry.totalProblems}
                      </td>
                      <td className="p-3.5 font-black text-pink-500">
                        {entry.score}
                      </td>
                      <td className="p-3.5 font-mono text-[var(--text-secondary)]">
                        {entry.penaltyMinutes}m
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'problems' && (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] font-bold">
                  <th className="p-3.5">Problem</th>
                  <th className="p-3.5">Difficulty</th>
                  <th className="p-3.5">Topic</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Attempts</th>
                  <th className="p-3.5">Solve Time</th>
                  <th className="p-3.5 text-right">Practice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {report.problemBreakdown.map((pb) => (
                  <tr key={pb.problemId} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="p-3.5 font-bold text-[var(--text-primary)]">
                      {pb.title}
                    </td>
                    <td className="p-3.5">
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{
                          background:
                            pb.difficulty === 'Easy'
                              ? '#10B98122'
                              : pb.difficulty === 'Hard'
                              ? '#EF444422'
                              : '#F59E0B22',
                          color:
                            pb.difficulty === 'Easy'
                              ? '#10B981'
                              : pb.difficulty === 'Hard'
                              ? '#EF4444'
                              : '#F59E0B',
                        }}
                      >
                        {pb.difficulty}
                      </span>
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)]">
                      {pb.topic}
                    </td>
                    <td className="p-3.5">
                      {pb.status === 'solved' ? (
                        <span className="flex items-center gap-1 font-bold text-emerald-500">
                          <CheckCircle2 size={14} /> Accepted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-bold text-red-400">
                          <XCircle size={14} /> Missed
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-[var(--text-secondary)] font-mono">
                      {pb.attempts}
                    </td>
                    <td className="p-3.5 font-mono text-[var(--text-secondary)]">
                      {pb.solvedAtMinutes ? `${pb.solvedAtMinutes}m` : '--'}
                    </td>
                    <td className="p-3.5 text-right">
                      <Link
                        href={`/practice/${pb.problemId}`}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition-colors inline-block"
                      >
                        Solve Again
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
