'use client';

import React from 'react';
import { Compass, BookOpen, Layers, CheckCircle2, Award, Zap, ArrowRight, ShieldCheck, Target } from 'lucide-react';

interface JourneyHeroProps {
  totalProblems: number;
  solvedProblems: number;
  totalPatterns: number;
  exploredPatterns: number;
  totalAreas: number;
  inProgressAreas: number;
}

export function JourneyHero({
  totalProblems,
  solvedProblems,
  totalPatterns,
  exploredPatterns,
  totalAreas,
  inProgressAreas,
}: JourneyHeroProps) {
  const overallPercentage = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* ── 1. MAIN HERO BANNER ─────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
        {/* Subtle background gradient mesh */}
        <div 
          className="absolute -right-24 -top-24 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Title & Value Proposition */}
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/20">
                <Compass size={13} /> DSA Knowledge Architecture
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">v2.5</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Your DSA Journey
            </h1>

            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              25 learning areas. 113 patterns. One structured path from fundamentals to advanced problem solving.
            </p>
          </div>

          {/* Right: Real Telemetry HUD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[var(--bg-subtle)] p-3 sm:p-4 rounded-xl border border-[var(--border-subtle)] shrink-0">
            {/* Solved Problems */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Solved
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
                  {solvedProblems.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  /{totalProblems.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-1 bg-[var(--border)] rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" 
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>

            {/* Patterns Explored */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Patterns
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
                  {exploredPatterns}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  /{totalPatterns}
                </span>
              </div>
              <div className="w-full h-1 bg-[var(--border)] rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                  style={{ width: `${totalPatterns > 0 ? (exploredPatterns / totalPatterns) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Active Areas */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Areas Active
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[var(--text-primary)]">
                  {inProgressAreas}
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  /{totalAreas}
                </span>
              </div>
              <div className="w-full h-1 bg-[var(--border)] rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                  style={{ width: `${totalAreas > 0 ? (inProgressAreas / totalAreas) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Overall Mastery */}
            <div className="flex flex-col">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                Curriculum
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[var(--accent)]">
                  {overallPercentage}%
                </span>
                <span className="text-xs font-mono text-[var(--text-muted)]">
                  Mastery
                </span>
              </div>
              <div className="w-full h-1 bg-[var(--border)] rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-[var(--accent)] rounded-full transition-all duration-500" 
                  style={{ width: `${overallPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CORE HIERARCHY EXPLANATION STRIP ──────────────────────── */}
      <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--surface)] p-4 sm:p-5 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-[var(--accent)]" />
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold text-[var(--text-primary)]">
              Curriculum Navigation Hierarchy
            </h2>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            A continuous loop from conceptual mental models to execution speed
          </span>
        </div>

        {/* The 5-Step Progressive Loop Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          {/* Step 1: Learning Area */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">01. DOMAIN</span>
              <ArrowRight size={12} className="text-[var(--text-muted)] hidden sm:inline" />
            </div>
            <strong className="text-xs font-bold text-[var(--text-primary)]">Learning Area</strong>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug">
              Foundational DSA domain (e.g., Arrays, Binary Search, DP)
            </p>
          </div>

          {/* Step 2: Subtopic */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">02. CATEGORY</span>
              <ArrowRight size={12} className="text-[var(--text-muted)] hidden sm:inline" />
            </div>
            <strong className="text-xs font-bold text-[var(--text-primary)]">Subtopic</strong>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug">
              Logical category grouping related pattern families
            </p>
          </div>

          {/* Step 3: Pattern */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">03. TEMPLATE</span>
              <ArrowRight size={12} className="text-[var(--text-muted)] hidden sm:inline" />
            </div>
            <strong className="text-xs font-bold text-[var(--text-primary)]">Pattern</strong>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug">
              Canonical invariant &amp; recurring algorithmic strategy
            </p>
          </div>

          {/* Step 4: Learn */}
          <div className="flex flex-col gap-1 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-emerald-400">04. CONCEPT</span>
              <ArrowRight size={12} className="text-[var(--text-muted)] hidden sm:inline" />
            </div>
            <strong className="text-xs font-bold text-[var(--text-primary)]">Learn</strong>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug">
              Deep dive into code templates, dry runs, and failure modes
            </p>
          </div>

          {/* Step 5: Practice */}
          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1 p-2.5 rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold text-sky-400">05. ARENA</span>
              <CheckCircle2 size={12} className="text-emerald-400" />
            </div>
            <strong className="text-xs font-bold text-[var(--text-primary)]">Practice</strong>
            <p className="text-[11px] text-[var(--text-muted)] leading-snug">
              Drill 4,000 problems across LC, CodeChef, CF, and GFG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
