'use client';

import React from 'react';
import { Calendar, CheckCircle2, Clock, Sparkles, Target } from 'lucide-react';
import { DailyStudyPlan } from '../types/study-plan.types';

interface StudyPlanHeaderProps {
  plan: DailyStudyPlan;
  activeTab: 'plan' | 'summary';
  onTabChange: (tab: 'plan' | 'summary') => void;
}

export function StudyPlanHeader({
  plan,
  activeTab,
  onTabChange,
}: StudyPlanHeaderProps) {
  const formattedDate = React.useMemo(() => {
    try {
      const parts = plan.date.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    } catch {}
    return plan.date;
  }, [plan.date]);

  const remainingMinutes = Math.max(
    0,
    plan.totalEstimatedMinutes - plan.actualTimeSpentMinutes
  );

  const currentFocus = React.useMemo(() => {
    const active = plan.items.find(
      (i) => i.status === 'pending' || i.status === 'in_progress'
    );
    if (active) {
      return `${active.area} • ${active.pattern}`;
    }
    if (plan.items.length > 0) {
      return `${plan.items[0].area} • ${plan.items[0].pattern}`;
    }
    return 'Foundation Curriculum';
  }, [plan.items]);

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Title and date hierarchy */}
          <div data-testid="study-plan-header" className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium tracking-wide uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Calendar className="w-3 h-3 text-emerald-400" />
                <span>TODAY • {formattedDate}</span>
              </span>

              {plan.isZeroState && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  Day 1 Foundation
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                Daily Study Planner 2.0
              </h1>
              <span className="hidden sm:inline-block text-xs text-[var(--text-muted)] font-medium">
                Personalized Daily Execution Workspace
              </span>
            </div>

            {/* Compact telemetry subtitle */}
            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[var(--text-secondary)] pt-0.5">
              <span className="inline-flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[var(--text-primary)] font-semibold">
                  {plan.completedCount} / {plan.items.length}
                </span>{' '}
                activities completed
              </span>
              <span className="text-[var(--border)]">&bull;</span>
              <span className="inline-flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span className="font-mono text-[var(--text-primary)] font-semibold">
                  ~{remainingMinutes}m
                </span>{' '}
                remaining
              </span>
              <span className="text-[var(--border)] hidden sm:inline">&bull;</span>
              <span className="hidden sm:inline-flex items-center gap-1 font-medium truncate max-w-xs md:max-w-sm">
                <Target className="w-3.5 h-3.5 text-cyan-400" />
                <span>Focus:</span>
                <span className="text-[var(--text-primary)] font-semibold truncate">
                  {currentFocus}
                </span>
              </span>
            </div>
          </div>

          {/* Mode Switcher Tabs: Plan vs Summary */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border)] self-start md:self-center">
            <button
              onClick={() => onTabChange('plan')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'plan'
                  ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Today&apos;s Schedule ({plan.items.length})
            </button>
            <button
              onClick={() => onTabChange('summary')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'summary'
                  ? 'bg-[var(--surface)] text-[var(--text-primary)] shadow-sm border border-[var(--border-strong)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              End-Of-Day Summary
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
