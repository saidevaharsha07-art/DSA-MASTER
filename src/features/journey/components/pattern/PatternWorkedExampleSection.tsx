'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export interface WorkedExampleStep {
  readonly stepNumber: number;
  readonly state: string;
  readonly explanation: string;
  readonly invariant: string;
}

export interface WorkedExampleData {
  readonly problemTitle: string;
  readonly prompt: string;
  readonly input: string;
  readonly output: string;
  readonly steps: WorkedExampleStep[];
}

interface PatternWorkedExampleSectionProps {
  readonly example: WorkedExampleData;
}

export function PatternWorkedExampleSection({ example }: PatternWorkedExampleSectionProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  const steps = example.steps || [];
  const currentStep = steps[currentStepIdx] || steps[0];

  const handleNext = () => {
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIdx(0);
  };

  return (
    <section id="stage-worked-example" className="flex flex-col gap-6 scroll-mt-16">
      {/* ── SECTION HEADER ── */}
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-3">
        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
          <BookOpen size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-purple-500">02 //</span>
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Stage 2: See a Small Worked Example
            </h2>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Trace invariant changes step-by-step on a canonical problem instance.
          </p>
        </div>
      </div>

      {/* ── WORKED EXAMPLE CARD ── */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col gap-5 shadow-xs">
        {/* Problem Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border)]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-500">
              Canonical Walkthrough
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mt-0.5">
              {example.problemTitle}
            </h3>
          </div>
          <span className="text-xs font-mono font-semibold text-[var(--text-muted)] bg-[var(--surface)] px-2.5 py-1 rounded-md border border-[var(--border)] self-start sm:self-auto">
            Step {currentStepIdx + 1} of {steps.length}
          </span>
        </div>

        {/* Problem Prompt */}
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
          {example.prompt}
        </p>

        {/* Input & Output Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Input:
            </span>
            <code className="font-mono text-xs font-bold text-[var(--accent)] break-all">
              {example.input}
            </code>
          </div>
          <div className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Expected Output:
            </span>
            <code className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 break-all">
              {example.output}
            </code>
          </div>
        </div>

        {/* ── INTERACTIVE STEP-BY-STEP TRACE ── */}
        <div className="flex flex-col gap-3 pt-2">
          {/* Stepper Toolbar */}
          <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Step-by-Step Execution Invariants
            </span>

            <div className="flex items-center gap-1.5">
              {steps.map((s, idx) => (
                <button
                  key={s.stepNumber}
                  type="button"
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                    currentStepIdx === idx
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-[var(--border)]'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              ))}

              <div className="h-4 w-px bg-[var(--border)] mx-1" />

              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStepIdx === 0}
                className="p-1.5 rounded-md bg-[var(--surface)] hover:bg-[var(--card)] border border-[var(--border)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Previous step"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentStepIdx === steps.length - 1}
                className="p-1.5 rounded-md bg-[var(--surface)] hover:bg-[var(--card)] border border-[var(--border)] text-[var(--text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Next step"
              >
                <ChevronRight size={14} />
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-md bg-[var(--surface)] hover:bg-[var(--card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                title="Reset to step 1"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Focal Active Step View */}
          {currentStep && (
            <div className="p-4 sm:p-5 rounded-xl bg-[var(--surface)] border border-purple-500/25 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-black shrink-0">
                    {currentStep.stepNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">
                    State: {currentStep.state}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-[var(--card)] text-emerald-600 dark:text-emerald-400 border border-[var(--border)] shrink-0 self-start sm:self-auto font-semibold">
                  {currentStep.invariant}
                </span>
              </div>

              <div className="flex items-start gap-2 pt-1 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                <Sparkles size={15} className="text-purple-500 shrink-0 mt-0.5" />
                <span>{currentStep.explanation}</span>
              </div>
            </div>
          )}

          {/* All Steps Summary List for Review */}
          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              All Traced Steps
            </span>
            <div className="grid grid-cols-1 gap-2">
              {steps.map((step, sIdx) => {
                const isSelected = currentStepIdx === sIdx;
                return (
                  <div
                    key={step.stepNumber}
                    onClick={() => setCurrentStepIdx(sIdx)}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--surface)] border-purple-500/30 ring-1 ring-purple-500/20'
                        : 'bg-[var(--card)] border-[var(--border)] hover:bg-[var(--surface)]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]'
                        }`}
                      >
                        {step.stepNumber}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold">
                          {step.state}
                        </span>
                        <span className="text-[var(--text-secondary)] mt-0.5 text-[11px]">
                          {step.explanation}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[var(--surface)] text-emerald-600 dark:text-emerald-400 border border-[var(--border)] shrink-0 self-start sm:self-auto">
                      {step.invariant}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
