'use client';

import React from 'react';
import {
  Lightbulb,
  BookOpen,
  Code2,
  TrendingUp,
  Target,
  FolderTree,
} from 'lucide-react';

export interface LearningStage {
  readonly id: string;
  readonly number: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly icon: React.ReactNode;
}

export const LEARNING_STAGES: readonly LearningStage[] = [
  {
    id: 'stage-understand',
    number: '01',
    label: 'Understand',
    shortLabel: 'Understand',
    icon: <Lightbulb size={13} />,
  },
  {
    id: 'stage-worked-example',
    number: '02',
    label: 'See an Example',
    shortLabel: 'Example',
    icon: <BookOpen size={13} />,
  },
  {
    id: 'stage-template',
    number: '03',
    label: 'Learn the Template',
    shortLabel: 'Template',
    icon: <Code2 size={13} />,
  },
  {
    id: 'stage-guided-walkthrough',
    number: '04',
    label: 'Try a Guided Example',
    shortLabel: 'Guided',
    icon: <TrendingUp size={13} />,
  },
  {
    id: 'stage-practice',
    number: '05',
    label: 'Practice',
    shortLabel: 'Practice',
    icon: <Target size={13} />,
  },
  {
    id: 'stage-review',
    number: '06',
    label: 'Review',
    shortLabel: 'Review',
    icon: <FolderTree size={13} />,
  },
];

interface PatternStageNavProps {
  readonly activeStageId: string;
  readonly onSelectStage: (stageId: string) => void;
}

export function PatternStageNav({
  activeStageId,
  onSelectStage,
}: PatternStageNavProps) {
  return (
    <nav
      aria-label="Learning progress stages"
      className="sticky top-0 z-20 bg-[var(--background)]/90 backdrop-blur-md py-2.5 border-b border-[var(--border)] transition-colors"
    >
      <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {LEARNING_STAGES.map((stage, idx) => {
          const isActive = activeStageId === stage.id;
          return (
            <React.Fragment key={stage.id}>
              <button
                type="button"
                onClick={() => onSelectStage(stage.id)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                  isActive
                    ? 'bg-[var(--accent)] text-white shadow-xs font-bold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--surface)]'
                }`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span
                  className={`font-mono text-[10px] px-1 py-0.2 rounded font-bold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--surface)] text-[var(--text-muted)]'
                  }`}
                >
                  {stage.number}
                </span>
                <span className="hidden sm:inline">{stage.label}</span>
                <span className="sm:hidden">{stage.shortLabel}</span>
              </button>

              {idx < LEARNING_STAGES.length - 1 && (
                <span
                  aria-hidden="true"
                  className="text-[var(--border)] text-xs select-none shrink-0"
                >
                  →
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
