'use client';

import React from 'react';
import {
  Flame,
  Activity,
  Calendar,
  Zap,
  CheckCircle2,
  Code2,
  RotateCcw,
  Timer,
  Trophy,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { LearningMomentum } from '../types/journey.types';

interface LearningMomentumWidgetProps {
  momentum: LearningMomentum;
  isZeroState?: boolean;
}

export function LearningMomentumWidget({ momentum, isZeroState }: LearningMomentumWidgetProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      className="rounded-3xl p-6 border flex flex-col gap-5"
      style={{
        background: 'var(--card)',
        borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-pink-500" />
          <h3 className="text-sm font-extrabold text-[var(--text-primary)] uppercase tracking-wider">
            Learning Momentum
          </h3>
        </div>

        <span
          className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
          style={{
            background: isZeroState ? 'rgba(100, 116, 139, 0.15)' : 'rgba(16, 185, 129, 0.15)',
            color: isZeroState ? '#64748B' : '#10B981',
          }}
        >
          {isZeroState ? 'Ready to Start' : `${momentum.velocityScore}% Velocity`}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block flex items-center gap-1">
            <Calendar size={12} className="text-blue-500" /> Active Days (14d)
          </span>
          <strong className="text-lg font-black text-[var(--text-primary)] mt-1 block">
            {momentum.activeDaysLast14d} / 14
          </strong>
        </div>

        <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block flex items-center gap-1">
            <Flame size={12} className="text-amber-500" /> Streak
          </span>
          <strong className="text-lg font-black text-amber-500 mt-1 block">
            {momentum.currentStreakDays} Days
          </strong>
        </div>

        <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block flex items-center gap-1">
            <Zap size={12} className="text-purple-500" /> Solved
          </span>
          <strong className="text-lg font-black text-[var(--text-primary)] mt-1 block">
            {momentum.recentSolvesCount} Solves
          </strong>
        </div>

        <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)]">
          <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block flex items-center gap-1">
            <Activity size={12} className="text-emerald-500" /> Velocity
          </span>
          <strong className="text-lg font-black text-emerald-500 mt-1 block">
            {momentum.velocityScore}%
          </strong>
        </div>
      </div>

      {/* Cross Mode Badges */}
      <div className="p-3.5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-between flex-wrap gap-2 text-xs">
        <span className="font-bold text-[var(--text-secondary)]">Multi-Mode Verification:</span>
        <div className="flex items-center gap-3">
          <span
            className={`flex items-center gap-1 font-semibold ${
              momentum.crossModeParticipation.practice ? 'text-emerald-500' : 'text-[var(--text-muted)]'
            }`}
          >
            <Code2 size={13} /> Practice
          </span>
          <span
            className={`flex items-center gap-1 font-semibold ${
              momentum.crossModeParticipation.revision ? 'text-blue-500' : 'text-[var(--text-muted)]'
            }`}
          >
            <RotateCcw size={13} /> Revision
          </span>
          <span
            className={`flex items-center gap-1 font-semibold ${
              momentum.crossModeParticipation.interview ? 'text-purple-500' : 'text-[var(--text-muted)]'
            }`}
          >
            <Timer size={13} /> Interview
          </span>
          <span
            className={`flex items-center gap-1 font-semibold ${
              momentum.crossModeParticipation.contest ? 'text-pink-500' : 'text-[var(--text-muted)]'
            }`}
          >
            <Trophy size={13} /> Contest
          </span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">
        &quot;{momentum.trendDescription}&quot;
      </p>
    </div>
  );
}
