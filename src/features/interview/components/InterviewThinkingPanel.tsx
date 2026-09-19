'use client';

import React from 'react';
import { Brain, Check } from 'lucide-react';

export const TIME_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log N)',
  'O(N)',
  'O(N log N)',
  'O(N^2)',
  'O(2^N)',
  'O(N!)',
];

export const SPACE_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log N)',
  'O(N)',
  'O(N^2)',
];

interface InterviewThinkingPanelProps {
  isLight: boolean;
  approachNotes: string;
  onApproachNotesChange: (value: string) => void;
  timeComplexity: string;
  onTimeComplexityChange: (value: string) => void;
  spaceComplexity: string;
  onSpaceComplexityChange: (value: string) => void;
  edgeCases: string;
  onEdgeCasesChange: (value: string) => void;
  notesSavedIndicator: boolean;
}

export function InterviewThinkingPanel({
  isLight,
  approachNotes,
  onApproachNotesChange,
  timeComplexity,
  onTimeComplexityChange,
  spaceComplexity,
  onSpaceComplexityChange,
  edgeCases,
  onEdgeCasesChange,
  notesSavedIndicator,
}: InterviewThinkingPanelProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto w-full" data-testid="thinking-phase-container">
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xs sm:text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            <Brain className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
            <span>Candidate Approach & Preparation Phase</span>
          </h3>
          <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Structure your mental model, algorithmic invariants, and Big-O complexity before writing code.
          </p>
        </div>

        {notesSavedIndicator && (
          <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded">
            <Check className="w-3 h-3" /> Auto-saved
          </span>
        )}
      </div>

      {/* Complexity Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Time complexity
          </label>
          <select
            value={timeComplexity}
            data-testid="time-complexity-select"
            onChange={(e) => onTimeComplexityChange(e.target.value)}
            className={`w-full p-2 rounded-xl text-xs font-mono font-bold border outline-none cursor-pointer ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-cyan-400'
            }`}
          >
            <option value="">Select expected Big-O Time...</option>
            {TIME_COMPLEXITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Space complexity
          </label>
          <select
            value={spaceComplexity}
            data-testid="space-complexity-select"
            onChange={(e) => onSpaceComplexityChange(e.target.value)}
            className={`w-full p-2 rounded-xl text-xs font-mono font-bold border outline-none cursor-pointer ${
              isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-cyan-400'
            }`}
          >
            <option value="">Select expected Big-O Space...</option>
            {SPACE_COMPLEXITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Strategy Notes Textarea */}
      <div>
        <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Explain your approach
        </label>
        <textarea
          value={approachNotes}
          data-testid="approach-notes-input"
          onChange={(e) => onApproachNotesChange(e.target.value)}
          placeholder="e.g. Use a two-pointer window [left, right]. Expand right until invariant holds, contract left when boundary violated..."
          rows={5}
          className={`w-full p-3 rounded-xl text-xs font-mono border outline-none leading-relaxed resize-y ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-cyan-500'
          }`}
        />
      </div>

      {/* Edge Cases Textarea */}
      <div>
        <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
          Edge cases you would test
        </label>
        <textarea
          value={edgeCases}
          data-testid="edge-cases-input"
          onChange={(e) => onEdgeCasesChange(e.target.value)}
          placeholder="e.g. Empty array, single element, all duplicates, strictly decreasing values, maximum capacity bounds..."
          rows={3}
          className={`w-full p-3 rounded-xl text-xs font-mono border outline-none leading-relaxed resize-y ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500'
              : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600 focus:border-cyan-500'
          }`}
        />
      </div>
    </div>
  );
}
