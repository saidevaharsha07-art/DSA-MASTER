'use client';

import React from 'react';
import {
  Zap,
  Clock,
  Target,
  Flame,
  Building2,
  BookOpen,
  Shuffle,
  Sliders,
  Check,
} from 'lucide-react';
import {
  InterviewSimulatorMode,
  InterviewDurationMinutes,
  InterviewProblemCount,
} from '../types/interview.types';

export interface InterviewModeConfig {
  id: InterviewSimulatorMode;
  label: string;
  duration: InterviewDurationMinutes;
  count: InterviewProblemCount;
  desc: string;
  badge?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const INTERVIEW_MODES: InterviewModeConfig[] = [
  {
    id: 'quick',
    label: 'Quick Screen',
    duration: 20,
    count: 1,
    desc: '1 problem • 20m. Fast warmup or single algorithmic deep-dive.',
    badge: '15-20 min',
    icon: Zap,
  },
  {
    id: '30m',
    label: '30m Technical',
    duration: 30,
    count: 2,
    desc: '2 problems • 30m. Classic standard technical interview screen.',
    badge: 'Standard',
    icon: Clock,
  },
  {
    id: '45m',
    label: '45m Onsite Round',
    duration: 45,
    count: 3,
    desc: '3 problems • 45m. Escalating difficulty (Easy → Medium → Hard).',
    badge: 'Realistic',
    icon: Target,
  },
  {
    id: '60m',
    label: '60m Comprehensive',
    duration: 60,
    count: 4,
    desc: '4 problems • 60m. High-intensity session testing endurance.',
    badge: 'Intense',
    icon: Flame,
  },
  {
    id: 'company',
    label: 'Company Style',
    duration: 45,
    count: 3,
    desc: 'Curated rounds strictly from documented company interview archives.',
    badge: 'Targeted',
    icon: Building2,
  },
  {
    id: 'topic',
    label: 'Topic Focused',
    duration: 30,
    count: 2,
    desc: 'Drill down into a specific learning area, subtopic, or pattern.',
    badge: 'Focused',
    icon: BookOpen,
  },
  {
    id: 'mixed',
    label: 'Mixed DSA',
    duration: 45,
    count: 3,
    desc: 'Comprehensive multi-pattern challenge covering broad curriculum.',
    badge: 'Adaptive',
    icon: Shuffle,
  },
  {
    id: 'custom',
    label: 'Custom Session',
    duration: 45,
    count: 2,
    desc: 'Fine-tune exact duration, problem count, difficulty, and language.',
    badge: 'Custom',
    icon: Sliders,
  },
];

interface InterviewModeSelectorProps {
  isLight: boolean;
  selectedMode: InterviewSimulatorMode;
  onSelectMode: (mode: InterviewSimulatorMode) => void;
}

export function InterviewModeSelector({
  isLight,
  selectedMode,
  onSelectMode,
}: InterviewModeSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Select Interview Simulator Mode
        </label>
        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Active: <strong className="text-cyan-500 dark:text-cyan-400">{INTERVIEW_MODES.find((m) => m.id === selectedMode)?.label}</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {INTERVIEW_MODES.map((m) => {
          const isSelected = selectedMode === m.id;
          const Icon = m.icon;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMode(m.id)}
              data-testid={`mode-btn-${m.id}`}
              className={`p-3.5 rounded-xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? isLight
                    ? 'bg-cyan-50/80 border-cyan-500 shadow-sm ring-1 ring-cyan-500'
                    : 'bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500'
                  : isLight
                  ? 'bg-white border-slate-200/80 hover:border-slate-300'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`p-1.5 rounded-lg shrink-0 ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-600 dark:text-cyan-400'
                        : isLight
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    {m.badge && (
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {m.badge}
                      </span>
                    )}
                    {isSelected && <Check className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                </div>

                <h4 className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {m.label}
                </h4>
                <p className={`text-[11px] mt-1 leading-relaxed line-clamp-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {m.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>{m.duration}m duration</span>
                <span>{m.count} {m.count === 1 ? 'prob' : 'probs'}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
