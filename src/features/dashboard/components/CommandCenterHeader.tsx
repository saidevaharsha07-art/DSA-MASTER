'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Zap,
  Flame,
  Layers,
  Edit3,
  Settings as SettingsIcon,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';

interface CommandCenterHeaderProps {
  summary: DashboardSummary;
  profileName: string;
  profileEmail: string;
  isAuthenticated: boolean;
  onOpenEditModal: () => void;
}

export function CommandCenterHeader({
  summary,
  profileName,
  profileEmail,
  isAuthenticated,
  onOpenEditModal,
}: CommandCenterHeaderProps) {
  const { totalXp, level, currentStreak, solvedCount } = summary.playerHud;
  const isZeroState = summary.zeroState?.isZeroState;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Guest Mode Banner */}
      {!isAuthenticated && (
        <div
          data-testid="guest-banner"
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border-strong)] bg-[var(--surface-elevated)]"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[var(--accent)] shrink-0" />
            <div>
              <span className="text-xs font-bold text-[var(--text-primary)]">
                Guest Exploration Mode
              </span>
              <span className="text-xs text-[var(--text-secondary)] ml-2">
                Personal telemetry is isolated. Sign in to save progress, track spaced repetition, and synchronize external platform handles.
              </span>
            </div>
          </div>
          <Link href="/login?redirect=/dashboard" className="no-underline">
            <button
              type="button"
              data-testid="guest-signin-btn"
              className="px-3.5 py-1.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-semibold cursor-pointer transition-colors shadow-sm"
            >
              Sign In / Register
            </button>
          </Link>
        </div>
      )}

      {/* Identity & HUD Tile Bar */}
      <div className="flex flex-col gap-4 p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Identity Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-lg font-black text-[var(--accent)] shadow-inner">
              {profileName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)] m-0">
                  Welcome back, {profileName}
                </h1>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--border-subtle)]">
                  Lvl {level}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5 m-0 font-mono">
                {profileEmail} • Command Center 2.0 Single Source of Truth
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenEditModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] text-xs font-medium cursor-pointer transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Edit Profile</span>
            </button>
            <Link href="/settings" className="no-underline">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--surface-elevated)] hover:bg-[var(--bg-subtle)] text-[var(--text-primary)] text-xs font-medium cursor-pointer transition-colors"
              >
                <SettingsIcon className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                <span>Settings</span>
              </button>
            </Link>
          </div>
        </div>

        {/* HUD Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-md bg-[rgba(16,185,129,0.1)] text-[#10B981] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-mono font-bold text-[var(--text-primary)] block leading-none">
                {solvedCount}
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                Problems Solved
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-md bg-[rgba(245,158,11,0.1)] text-[#F59E0B] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-mono font-bold text-[var(--text-primary)] block leading-none">
                {totalXp} XP
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                Experience Points
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-md bg-[rgba(249,115,22,0.1)] text-[#F97316] flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-mono font-bold text-[var(--text-primary)] block leading-none">
                {currentStreak} Days
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                Current Streak
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="w-8 h-8 rounded-md bg-[rgba(56,189,248,0.1)] text-[#38BDF8] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-mono font-bold text-[var(--text-primary)] block leading-none">
                4 / 4
              </span>
              <span className="text-[11px] text-[var(--text-secondary)] font-medium">
                Active Platforms
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Zero State Baseline Banner if applicable */}
      {isZeroState && summary.zeroState && (
        <div
          data-testid="zero-state-banner"
          className="flex flex-col gap-3 p-4 rounded-xl border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.06)]"
        >
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#F59E0B] shrink-0" />
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)] m-0">
                Curriculum Baseline: 0% Progress (Not Started)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] m-0 mt-0.5">
                {summary.zeroState.explanation || 'Your baseline starts here. Begin with your first recommended problem below.'}
              </p>
            </div>
          </div>
          {summary.zeroState.firstMission && (
            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border-subtle)]">
              <span className="text-xs font-semibold text-[var(--text-primary)] block mb-1.5">
                {summary.zeroState.firstMission.title}
              </span>
              <ul className="m-0 pl-4 text-xs text-[var(--text-secondary)] space-y-1">
                {summary.zeroState.firstMission.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
