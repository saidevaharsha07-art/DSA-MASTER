'use client';

import React from 'react';
import { ListChecks, CheckSquare, Square } from 'lucide-react';

export interface GuidanceMilestone {
  id: string;
  title: string;
  desc: string;
}

export const INTERVIEWER_CHECKLIST_ITEMS: GuidanceMilestone[] = [
  {
    id: 'clarify',
    title: '1. Clarify Requirements & Constraints',
    desc: 'Verify input bounds, edge cases, return types, duplicates, and empty/null scenarios with the interviewer.',
  },
  {
    id: 'verbalize',
    title: '2. Explain Approach & Invariants',
    desc: 'Verbalize the brute force solution first, then state your intuition for the optimal algorithmic pattern.',
  },
  {
    id: 'complexity',
    title: '3. Discuss Complexity Bounds Upfront',
    desc: 'State target Time and Space complexity before writing code to confirm alignment.',
  },
  {
    id: 'edge_cases',
    title: '4. Test Edge Cases & Failure Modes',
    desc: 'Identify single element, duplicates, negative values, and boundary conditions.',
  },
  {
    id: 'dry_run',
    title: '5. Dry-Run & Optimize Clean Code',
    desc: 'Step through an example trace manually before running tests to ensure bug-free execution.',
  },
];

interface InterviewerChecklistProps {
  isLight: boolean;
  guidanceCompleted: string[];
  onToggleGuidance: (milestoneId: string) => void;
}

export function InterviewerChecklist({
  isLight,
  guidanceCompleted,
  onToggleGuidance,
}: InterviewerChecklistProps) {
  return (
    <div className="space-y-3.5 max-w-2xl mx-auto w-full" data-testid="interviewer-guidance-container">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xs sm:text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <ListChecks className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Interviewer Communication Checklist</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Mirror professional FAANG/Tier-1 onsite evaluation criteria by checking off key milestones.
          </p>
        </div>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
          {guidanceCompleted.length} / {INTERVIEWER_CHECKLIST_ITEMS.length} Checked
        </span>
      </div>

      <div className="space-y-2">
        {INTERVIEWER_CHECKLIST_ITEMS.map((m) => {
          const isChecked = guidanceCompleted.includes(m.id);

          return (
            <div
              key={m.id}
              onClick={() => onToggleGuidance(m.id)}
              data-testid={`guidance-item-${m.id}`}
              className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 select-none ${
                isChecked
                  ? isLight
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-emerald-950/20 border-emerald-800/40'
                  : isLight
                  ? 'bg-white border-slate-200/80 hover:border-slate-300'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                className={`mt-0.5 shrink-0 ${isChecked ? 'text-emerald-500' : 'text-slate-400'}`}
                aria-label={isChecked ? `Uncheck ${m.title}` : `Check ${m.title}`}
              >
                {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              </button>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-xs font-bold ${
                    isChecked
                      ? 'text-emerald-600 dark:text-emerald-400 line-through'
                      : isLight
                      ? 'text-slate-900'
                      : 'text-slate-200'
                  }`}
                >
                  {m.title}
                </div>
                <div className={`text-[11px] mt-0.5 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {m.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
