'use client';

import React from 'react';
import {
  Trophy,
  Zap,
  Clock,
  Flame,
  Award,
  Swords,
  ChevronRight,
  Play,
  History,
  Target,
  BarChart2,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { ContestPreset, ContestPerformanceReport } from '../types/contest.types';

interface ContestLobbyViewProps {
  presets: ContestPreset[];
  history: ContestPerformanceReport[];
  isAuthenticated: boolean;
  onSelectPreset: (preset: ContestPreset) => void;
  onOpenCustomSetup: () => void;
  onViewReport: (report: ContestPerformanceReport) => void;
}

export function ContestLobbyView({
  presets,
  history,
  isAuthenticated,
  onSelectPreset,
  onOpenCustomSetup,
  onViewReport,
}: ContestLobbyViewProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div className="w-full flex flex-col gap-10">
      {/* ── 1. HERO BANNER ─────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border transition-all"
        style={{
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #EFF6FF 100%)'
            : 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 27, 75, 0.8) 50%, rgba(88, 28, 135, 0.4) 100%)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(139, 92, 246, 0.3)',
          boxShadow: isLight
            ? '0 10px 30px rgba(0, 0, 0, 0.05)'
            : '0 20px 50px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div className="max-w-3xl flex flex-col gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5"
              style={{
                background: 'rgba(236, 72, 153, 0.15)',
                color: '#EC4899',
                border: '1px solid rgba(236, 72, 153, 0.3)',
              }}
            >
              <Swords size={14} className="text-pink-500" />
              Tournament Arena
            </span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Leaderboard & ICPC Penalty Engine Active
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
            Test what you know <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">under pressure.</span>
          </h1>

          <div
            className="p-4 rounded-xl text-sm leading-relaxed font-medium"
            style={{
              background: isLight ? 'rgba(241, 245, 249, 0.8)' : 'rgba(255, 255, 255, 0.04)',
              border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="text-[var(--text-primary)] font-bold">Practice</span> is where you learn. <br className="hidden sm:inline" />
            <span className="text-[var(--text-primary)] font-bold">Interview</span> is where you simulate. <br className="hidden sm:inline" />
            <span className="text-[var(--text-primary)] font-bold text-pink-500">Contest</span> is where you perform.
          </div>

          <div className="flex items-center gap-4 flex-wrap pt-2">
            <button
              onClick={() => onSelectPreset(presets[0])}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white flex items-center gap-2 shadow-lg hover:scale-105 transition-all cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
                boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)',
              }}
            >
              <Play size={16} /> Start Weekly Sprint (30m)
            </button>

            <button
              onClick={onOpenCustomSetup}
              className="px-6 py-3.5 rounded-xl font-bold text-sm flex items-center gap-2 border hover:bg-[var(--surface-hover)] transition-all cursor-pointer"
              style={{
                background: 'var(--card)',
                borderColor: isLight ? '#CBD5E1' : 'rgba(255, 255, 255, 0.15)',
                color: 'var(--text-primary)',
              }}
            >
              <Layers size={16} /> Configure Custom Contest
            </button>
          </div>
        </div>
      </div>

      {/* ── 2. AVAILABLE CONTESTS GRID ─────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy size={22} className="text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)]">
              Featured Contests & Challenges
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)] font-semibold">
            {presets.length} Formats Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((preset) => {
            const isSprint = preset.format === 'sprint';
            const isHardcore = preset.format === 'hardcore';
            const isTopic = preset.format === 'topic';

            const badgeColor = isSprint
              ? '#10B981'
              : isHardcore
              ? '#EF4444'
              : isTopic
              ? '#8B5CF6'
              : '#3B82F6';

            return (
              <div
                key={preset.id}
                className="group relative rounded-2xl p-6 border flex flex-col justify-between gap-6 transition-all hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: 'var(--card)',
                  borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span
                      className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-1"
                      style={{
                        background: `${badgeColor}18`,
                        color: badgeColor,
                        border: `1px solid ${badgeColor}33`,
                      }}
                    >
                      {preset.format.toUpperCase()}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-[var(--text-muted)]">
                      <Clock size={13} />
                      {preset.durationMinutes} min
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-pink-500 transition-colors">
                    {preset.title}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {preset.tagline}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap pt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                      {preset.problemCount} Problems
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-[var(--text-secondary)]">
                      {preset.difficulty}
                    </span>
                    {preset.topics.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-0.5 rounded bg-pink-500/10 text-pink-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPreset(preset)}
                  className="w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  style={{
                    background: isLight ? '#0F172A' : '#FFFFFF',
                    color: isLight ? '#FFFFFF' : '#0F172A',
                  }}
                >
                  <Play size={14} /> Enter Contest <ChevronRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. CONTEST FORMATS EXPLAINER ──────────────────────────── */}
      <div
        className="rounded-2xl p-6 sm:p-8 border"
        style={{
          background: 'var(--card)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        <h3 className="text-lg font-extrabold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <Award size={18} className="text-purple-500" /> Competitive Scoring & Format Rules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="font-bold text-xs text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Zap size={14} className="text-amber-500" /> 100 Pts / Solve
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Full points awarded upon passing 100% of all public & hidden judge testcases.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="font-bold text-xs text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Clock size={14} className="text-blue-500" /> ICPC Penalty Model
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Penalty = Elapsed solve time + 20 minutes for each wrong submission before acceptance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="font-bold text-xs text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Target size={14} className="text-emerald-500" /> 7-Pillar Analytics
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Every contest produces detailed breakdown on accuracy, speed, pattern mastery, and strategy.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]">
            <div className="font-bold text-xs text-[var(--text-primary)] mb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-pink-500" /> AI Mentor Handoff
            </div>
            <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
              Seamlessly deep-link missed contest problems into AI Mentor for grounded code walkthroughs.
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. CONTEST HISTORY ─────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History size={20} className="text-indigo-500" />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">
              Your Contest History
            </h3>
          </div>
          {isAuthenticated && history.length > 0 && (
            <span className="text-xs font-semibold text-[var(--text-muted)]">
              {history.length} Contests Completed
            </span>
          )}
        </div>

        {history.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] font-bold">
                  <th className="p-3.5">Contest</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5">Solved</th>
                  <th className="p-3.5">Penalty</th>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {history.map((h) => (
                  <tr key={h.contestId} className="hover:bg-[var(--surface-hover)] transition-colors">
                    <td className="p-3.5 font-bold text-[var(--text-primary)]">
                      {h.contestTitle}
                    </td>
                    <td className="p-3.5 font-extrabold text-pink-500">
                      {h.score} / {h.maxScore}
                    </td>
                    <td className="p-3.5 font-semibold text-[var(--text-primary)]">
                      {h.solvedCount} / {h.totalProblems}
                    </td>
                    <td className="p-3.5 font-mono text-[var(--text-secondary)]">
                      {h.penaltyMinutes}m
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded font-bold bg-amber-500/10 text-amber-500">
                        #{h.rank} / {h.totalParticipants}
                      </span>
                    </td>
                    <td className="p-3.5 text-[var(--text-muted)]">
                      {new Date(h.completedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => onViewReport(h)}
                        className="px-3 py-1.5 rounded-lg font-bold text-xs bg-[var(--surface)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--primary-soft)] transition-colors cursor-pointer"
                      >
                        View Analysis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="p-8 rounded-2xl border text-center flex flex-col items-center justify-center gap-3"
            style={{
              background: 'var(--card)',
              borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <Trophy size={36} className="text-[var(--text-muted)] opacity-50" />
            <h4 className="text-sm font-bold text-[var(--text-primary)]">
              No contest records yet
            </h4>
            <p className="text-xs text-[var(--text-secondary)] max-w-sm">
              Participate in your first timed contest above to earn your baseline competitive rating and unlocked diagnostics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
