'use client';

import React from 'react';
import {
  Lightbulb,
  Brain,
  Clock,
  Cpu,
  CheckCircle2,
  XCircle,
  CheckSquare,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { PatternLearningDetail } from '../../services/pattern-learning-adapter.service';

interface PatternUnderstandSectionProps {
  readonly detail: PatternLearningDetail;
}

export function PatternUnderstandSection({ detail }: PatternUnderstandSectionProps) {
  const { pattern, templateBundle } = detail;

  return (
    <section id="stage-understand" className="flex flex-col gap-6 scroll-mt-16">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
        <div className="p-2 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">
          <Lightbulb size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[var(--accent)]">01 //</span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Stage 1: Understand the Concept &amp; Intuition
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Core mental model, complexity bounds, and diagnostic recognition checklist.
          </p>
        </div>
      </div>

      {/* ── CORE INTUITION & MENTAL MODEL ── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-5 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-bold text-[var(--accent)]">
          <Brain size={16} />
          <span>Core Intuition &amp; Mental Model</span>
        </div>

        {/* Primary Explanation */}
        <div className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-3xl font-normal space-y-3">
          <p className="text-[var(--text-primary)] font-medium text-base sm:text-lg leading-relaxed">
            {pattern.intuition || pattern.overview || pattern.shortDescription}
          </p>
          {pattern.overview && pattern.intuition && pattern.overview !== pattern.intuition && (
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              {pattern.overview}
            </p>
          )}
        </div>

        {/* Mental Invariant Callout */}
        <div className="p-4 rounded-xl bg-[var(--surface)] border-l-4 border-l-[var(--accent)] border border-[var(--border)] flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent)]" />
            <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
              Mental Invariant:
            </strong>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
            {pattern.mentalModel || templateBundle.coreInvariant || 'Preserve invariant state transitions monotonically across traversal.'}
          </p>
        </div>

        {/* Complexity Summary: Clean Technical Monospace Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                <Clock size={13} className="text-[var(--accent)]" />
                <span>Time Complexity</span>
              </span>
              <code className="font-mono text-xs font-bold text-[var(--accent)] px-2 py-0.5 rounded-md bg-[var(--accent)]/10">
                {templateBundle.timeComplexity}
              </code>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Guaranteed upper-bound runtime constraint.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5">
                <Cpu size={13} className="text-emerald-500" />
                <span>Space Complexity</span>
              </span>
              <code className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10">
                {templateBundle.spaceComplexity}
              </code>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-1">
              Auxiliary memory overhead limit.
            </p>
          </div>
        </div>
      </div>

      {/* ── RECOGNITION SIGNALS: WHEN YOU SHOULD THINK OF THIS PATTERN ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-3.5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-500 dark:text-amber-400">
            <CheckSquare size={16} />
            <span className="uppercase tracking-wider text-xs font-black">
              When You Should Think of This Pattern
            </span>
          </div>
          <span className="text-[11px] font-semibold text-[var(--text-muted)]">
            Recognition Checklist
          </span>
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          Identify this pattern in a problem statement when you spot these recurring signatures:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {(pattern.recognitionSignals || ['Contiguous element traversal', 'Monotonic state transitions']).map(
            (signal: string, sIdx: number) => (
              <div
                key={sIdx}
                className="p-2.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
              >
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="font-medium leading-snug">{signal}</span>
              </div>
            )
          )}
        </div>
      </div>

      {/* ── WHEN TO USE vs WHEN NOT TO USE ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* When to Use */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-emerald-500/25 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 size={15} />
            <span>When to Use</span>
          </div>
          <div className="flex flex-col gap-2">
            {(pattern.whenToUse && pattern.whenToUse.length > 0
              ? pattern.whenToUse
              : ['Standard sequential data processing', 'Structured search space bounds']
            ).map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-emerald-500 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* When NOT to Use */}
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-rose-500/25 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <XCircle size={15} />
            <span>When NOT to Use (Alternatives)</span>
          </div>
          <div className="flex flex-col gap-2">
            {(pattern.whenNotToUse && pattern.whenNotToUse.length > 0
              ? pattern.whenNotToUse
              : ['Unordered collections requiring key lookups', 'Dynamic graph networks with non-linear paths']
            ).map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                <span className="text-rose-500 font-bold">•</span>
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
          {pattern.relatedPatternIds && pattern.relatedPatternIds.length > 0 && (
            <div className="pt-2 border-t border-[var(--border)] text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
              <Compass size={12} className="text-[var(--accent)]" />
              <span>Consider alternative patterns in the Review section.</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
