'use client';

import React from 'react';
import {
  TrendingUp,
  AlertTriangle,
  Sparkles,
  XCircle,
  CheckCircle2,
  ListOrdered,
  ArrowRight,
} from 'lucide-react';
import { PatternLearningDetail } from '../../services/pattern-learning-adapter.service';

interface PatternGuidedWalkthroughSectionProps {
  readonly detail: PatternLearningDetail;
}

export function PatternGuidedWalkthroughSection({
  detail,
}: PatternGuidedWalkthroughSectionProps) {
  const { pattern } = detail;

  const guidedSteps = [
    {
      stepNumber: 1,
      title: 'Analyze Constraints & Define Invariant',
      state: 'Pre-condition verification',
      change: 'Identify input monotonicity, memory bounds, and empty base cases.',
      reason: 'Ensures the pattern is mathematically guaranteed to apply without exceptions.',
    },
    {
      stepNumber: 2,
      title: 'Prime Pointers & Auxiliary State',
      state: 'Initialization',
      change: 'Initialize pointer indices (left, right, low, high) or accumulator maps.',
      reason: 'Sets up strict invariant boundaries before any iteration begins.',
    },
    {
      stepNumber: 3,
      title: 'Monotonic Progression & State Transition',
      state: 'Loop execution',
      change: 'Advance pointers or update window state based on comparison predicates.',
      reason: 'Guarantees steady convergence toward the terminal condition without redundant cycles.',
    },
    {
      stepNumber: 4,
      title: 'Boundary Termination & Optimal Return',
      state: 'Post-condition completion',
      change: 'Halt on boundary collision or target match and return validated result.',
      reason: 'Preserves optimal runtime and auxiliary memory bounds with zero off-by-one errors.',
    },
  ];

  return (
    <section id="stage-guided-walkthrough" className="flex flex-col gap-6 scroll-mt-16">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
          <TrendingUp size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-500">04 //</span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Stage 4: Guided Walkthrough, Pitfalls &amp; Interview Tips
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Step-by-step strategy, frequent traps to evade, and interviewer evaluation criteria.
          </p>
        </div>
      </div>

      {/* ── GUIDED WALKTHROUGH STEPS ── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
          <ListOrdered size={14} className="text-[var(--accent)]" />
          <span>General Problem-Solving Blueprint</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {guidedSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-2.5 transition-all hover:border-[var(--accent)]/30"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--accent)]/15 text-[var(--accent)] flex items-center justify-center font-mono text-xs font-black shrink-0">
                  {step.stepNumber}
                </span>
                <strong className="text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                  {step.title}
                </strong>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-[var(--text-secondary)] pl-7">
                <div>
                  <span className="text-[var(--text-muted)] font-mono text-[11px] block">
                    State: {step.state}
                  </span>
                  <p className="mt-0.5 leading-relaxed">{step.change}</p>
                </div>
                <div className="pt-1 text-[11px] text-[var(--accent)] flex items-center gap-1 font-medium">
                  <ArrowRight size={11} className="shrink-0" />
                  <span>{step.reason}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── COMMON MISTAKES & INTERVIEW TIPS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Common Mistakes & Edge Cases */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-rose-500/20 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <AlertTriangle size={15} />
            <span>Common Mistakes &amp; Edge Cases</span>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            Watch out for these subtle traps commonly penalized in live coding rounds:
          </p>

          <div className="flex flex-col gap-2.5 pt-1">
            {(pattern.commonMistakes && pattern.commonMistakes.length > 0
              ? pattern.commonMistakes
              : ['Off-by-one boundary conditions', 'Improper invariant reset inside inner loop']
            ).map((mistake: string, mIdx: number) => (
              <div
                key={mIdx}
                className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
              >
                <XCircle size={15} className="text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{mistake}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pro Interview Tips */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[var(--card)] border border-indigo-500/20 flex flex-col gap-3 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Sparkles size={15} />
            <span>Interview Pro Tips &amp; Verbalization</span>
          </div>

          <p className="text-xs text-[var(--text-muted)]">
            How to communicate your algorithmic decisions clearly to the interviewer:
          </p>

          <div className="flex flex-col gap-2.5 pt-1">
            {(pattern.interviewTips && pattern.interviewTips.length > 0
              ? pattern.interviewTips
              : [
                  'State the loop invariant before typing any code.',
                  'Explain why the pointer moves deterministically.',
                  'Explicitly analyze both time and auxiliary space complexities.',
                ]
            ).map((tip: string, tIdx: number) => (
              <div
                key={tIdx}
                className="p-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex items-start gap-2.5 text-xs text-[var(--text-secondary)]"
              >
                <CheckCircle2 size={15} className="text-indigo-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-medium">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
