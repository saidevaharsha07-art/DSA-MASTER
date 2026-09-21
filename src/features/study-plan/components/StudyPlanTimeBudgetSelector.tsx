'use client';

import React, { useState } from 'react';
import { Clock, SlidersHorizontal, Check } from 'lucide-react';
import { TimeBudgetPreset } from '../types/study-plan.types';

const BUDGET_PRESETS: TimeBudgetPreset[] = [20, 30, 45, 60, 90, 120];

interface StudyPlanTimeBudgetSelectorProps {
  selectedBudget: number;
  onSelectBudget: (minutes: number) => void;
}

export function StudyPlanTimeBudgetSelector({
  selectedBudget,
  onSelectBudget,
}: StudyPlanTimeBudgetSelectorProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customInput, setCustomInput] = useState<string>('');

  const isPreset = BUDGET_PRESETS.includes(selectedBudget as TimeBudgetPreset);

  const handleApplyCustom = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const parsed = parseInt(customInput, 10);
    if (!isNaN(parsed) && parsed >= 10 && parsed <= 360) {
      onSelectBudget(parsed);
      setShowCustomInput(false);
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-[var(--surface)] border border-[var(--border)] shadow-sm transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider font-semibold text-[var(--text-muted)]">
              Daily Time Budget
            </h3>
            <p className="text-sm font-bold text-[var(--text-primary)]">
              Plan based on {selectedBudget} minutes
            </p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-md border border-[var(--border)] self-start sm:self-center">
          Adaptive Allocation
        </span>
      </div>

      {/* Segmented Preset Selector */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)]">
        {BUDGET_PRESETS.map((mins) => {
          const isSelected = selectedBudget === mins && !showCustomInput;
          return (
            <button
              key={mins}
              onClick={() => {
                setShowCustomInput(false);
                onSelectBudget(mins);
              }}
              data-testid={`budget-btn-${mins}`}
              aria-pressed={isSelected}
              className={`py-2 px-1 text-center rounded-lg text-xs font-semibold font-mono transition-all ${
                isSelected
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
              }`}
            >
              {mins}m
            </button>
          );
        })}

        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          data-testid="budget-btn-custom"
          aria-pressed={showCustomInput || !isPreset}
          className={`py-2 px-1 text-center rounded-lg text-xs font-semibold font-mono flex items-center justify-center gap-1 transition-all ${
            showCustomInput || !isPreset
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-elevated)]'
          }`}
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span>Custom</span>
        </button>
      </div>

      {/* Custom Budget Popover Input */}
      {showCustomInput && (
        <form
          onSubmit={handleApplyCustom}
          className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center gap-2"
        >
          <div className="relative flex-1 min-w-[140px]">
            <input
              type="number"
              min="10"
              max="360"
              step="5"
              placeholder="e.g. 50"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              data-testid="custom-budget-input"
              autoFocus
              className="w-full pl-3 pr-8 py-1.5 text-xs font-mono rounded-lg bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-emerald-500"
            />
            <span className="absolute right-2.5 top-2 text-[11px] font-mono text-[var(--text-muted)] pointer-events-none">
              min
            </span>
          </div>

          <button
            type="submit"
            data-testid="apply-custom-budget-btn"
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Apply</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCustomInput(false)}
            className="px-2.5 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
