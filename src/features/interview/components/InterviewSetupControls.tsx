'use client';

import React from 'react';
import { Building2, BookOpen, ShieldCheck } from 'lucide-react';
import {
  InterviewSimulatorMode,
  InterviewArenaDifficulty,
  InterviewDurationMinutes,
  InterviewProblemCount,
  InterviewLanguage,
} from '../types/interview.types';

export const VERIFIED_COMPANIES = [
  'Google',
  'Amazon',
  'Meta',
  'Microsoft',
  'Apple',
  'Uber',
  'Netflix',
  'Bloomberg',
];

export const DIFFICULTIES: Array<{ id: InterviewArenaDifficulty; label: string }> = [
  { id: 'Easy', label: 'Easy' },
  { id: 'Medium', label: 'Medium' },
  { id: 'Hard', label: 'Hard' },
  { id: 'Mixed', label: 'Mixed (Escalating)' },
];

export const DURATIONS: Array<{ minutes: InterviewDurationMinutes; label: string }> = [
  { minutes: 20, label: '20 min' },
  { minutes: 30, label: '30 min' },
  { minutes: 45, label: '45 min' },
  { minutes: 60, label: '60 min' },
];

export const PROBLEM_COUNTS: InterviewProblemCount[] = [1, 2, 3, 4];

export const LANGUAGES: Array<{ id: InterviewLanguage; label: string }> = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'typescript', label: 'TypeScript' },
];

interface LearningAreaOption {
  id: string;
  title: string;
}

interface InterviewSetupControlsProps {
  isLight: boolean;
  selectedMode: InterviewSimulatorMode;
  targetCompany: string;
  onSelectCompany: (company: string) => void;
  targetArea: string;
  onSelectArea: (area: string) => void;
  targetPattern: string;
  onChangePattern: (pattern: string) => void;
  learningAreas: LearningAreaOption[];
  selectedDifficulty: InterviewArenaDifficulty;
  onSelectDifficulty: (difficulty: InterviewArenaDifficulty) => void;
  selectedDuration: InterviewDurationMinutes;
  onSelectDuration: (duration: InterviewDurationMinutes) => void;
  selectedCount: InterviewProblemCount;
  onSelectCount: (count: InterviewProblemCount) => void;
  selectedLanguage: InterviewLanguage;
  onSelectLanguage: (language: InterviewLanguage) => void;
  useWeakness: boolean;
  onToggleWeakness: () => void;
}

export function InterviewSetupControls({
  isLight,
  selectedMode,
  targetCompany,
  onSelectCompany,
  targetArea,
  onSelectArea,
  targetPattern,
  onChangePattern,
  learningAreas,
  selectedDifficulty,
  onSelectDifficulty,
  selectedDuration,
  onSelectDuration,
  selectedCount,
  onSelectCount,
  selectedLanguage,
  onSelectLanguage,
  useWeakness,
  onToggleWeakness,
}: InterviewSetupControlsProps) {
  return (
    <div
      className={`p-5 sm:p-6 rounded-2xl border space-y-5 transition-all ${
        isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-slate-900/60 border-slate-800'
      }`}
    >
      {/* 1. COMPANY STYLE SELECTION (IF COMPANY MODE SELECTED) */}
      {selectedMode === 'company' && (
        <div className="space-y-2.5" data-testid="company-style-selector">
          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Target Company Archive (Documented Metadata)
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {VERIFIED_COMPANIES.map((comp) => {
              const isSelected = targetCompany.toLowerCase() === comp.toLowerCase();
              return (
                <button
                  key={comp}
                  type="button"
                  onClick={() => onSelectCompany(comp)}
                  data-testid={`company-btn-${comp.toLowerCase()}`}
                  className={`p-2.5 rounded-xl text-center font-bold text-xs border transition-all ${
                    isSelected
                      ? isLight
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-sm'
                      : isLight
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                      : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {comp}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. TOPIC FOCUSED SELECTION (IF TOPIC MODE SELECTED) */}
      {selectedMode === 'topic' && (
        <div className="space-y-2.5" data-testid="topic-focused-selector">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
            <label className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              Focus Learning Area & Pattern
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Learning Area
              </label>
              <select
                value={targetArea}
                onChange={(e) => onSelectArea(e.target.value)}
                className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="all">All 25 Learning Areas</option>
                {learningAreas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                Pattern Filter (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. two-pointers, sliding-window"
                value={targetPattern === 'all' ? '' : targetPattern}
                onChange={(e) => onChangePattern(e.target.value || 'all')}
                className={`w-full p-2.5 rounded-xl text-xs font-mono font-semibold border outline-none ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {/* 3. COMPACT PARAMETERS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        {/* Difficulty */}
        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onSelectDifficulty(e.target.value as InterviewArenaDifficulty)}
            className={`w-full p-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            Duration
          </label>
          <select
            value={selectedDuration}
            onChange={(e) => onSelectDuration(Number(e.target.value) as InterviewDurationMinutes)}
            className={`w-full p-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {DURATIONS.map((dur) => (
              <option key={dur.minutes} value={dur.minutes}>
                {dur.label}
              </option>
            ))}
          </select>
        </div>

        {/* Problem Count */}
        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            Problem Count
          </label>
          <select
            value={selectedCount}
            onChange={(e) => onSelectCount(Number(e.target.value) as InterviewProblemCount)}
            className={`w-full p-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {PROBLEM_COUNTS.map((cnt) => (
              <option key={cnt} value={cnt}>
                {cnt} {cnt === 1 ? 'Problem' : 'Problems'}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}
        <div>
          <label className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
            Primary Language
          </label>
          <select
            value={selectedLanguage}
            onChange={(e) => onSelectLanguage(e.target.value as InterviewLanguage)}
            className={`w-full p-2 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
              isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
            }`}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 4. ADAPTIVE WEAKNESS PRIORITIZATION TOGGLE */}
      <div
        onClick={onToggleWeakness}
        className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
          useWeakness
            ? isLight
              ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
              : 'bg-emerald-950/20 border-emerald-800/40'
            : isLight
            ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
            : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg shrink-0 ${
              useWeakness
                ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Adaptive Weakness Prioritization
            </div>
            <div className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Prioritize problems matching previous mistake patterns and unmastered curriculum categories
            </div>
          </div>
        </div>

        <div
          className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors shrink-0 ${
            useWeakness ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${
              useWeakness ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
