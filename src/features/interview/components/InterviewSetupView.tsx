'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Zap,
  Code2,
  Brain,
  ShieldCheck,
  Award,
  Sparkles,
  History,
  Target,
  ArrowRight,
  Flame,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  Layers,
} from 'lucide-react';
import {
  InterviewConfig,
  InterviewTopicType,
  InterviewArenaDifficulty,
  InterviewDurationMinutes,
  InterviewProblemCount,
  InterviewLanguage,
  InterviewHistoryRecord,
  InterviewArenaReport,
} from '../types/interview.types';

interface InterviewSetupViewProps {
  isLight: boolean;
  isAuthenticated: boolean;
  history: InterviewHistoryRecord[];
  onStartInterview: (config: InterviewConfig) => void;
  onViewReport: (report: InterviewArenaReport) => void;
  sampleReport: InterviewArenaReport;
}

const TOPIC_TYPES: Array<{ id: InterviewTopicType; title: string; desc: string; icon: any }> = [
  { id: 'General DSA', title: 'General DSA', desc: 'Comprehensive mix across arrays, strings, trees & graphs', icon: Target },
  { id: 'Arrays & Hashing', title: 'Arrays & Hashing', desc: 'Two pointers, sliding window, prefix sums, hash tables', icon: Zap },
  { id: 'Trees & Graphs', title: 'Trees & Graphs', desc: 'BFS, DFS, binary search trees, topological sorting', icon: BookOpen },
  { id: 'Dynamic Programming', title: 'Dynamic Programming', desc: 'Memoization, tabulation, state transitions, optimization', icon: Brain },
  { id: 'Mixed Patterns', title: 'Mixed Patterns', desc: 'Multi-topic algorithmic reasoning under real clock pressure', icon: Sparkles },
];

const DIFFICULTIES: Array<{ id: InterviewArenaDifficulty; label: string; color: string }> = [
  { id: 'Easy', label: 'Easy', color: '#10B981' },
  { id: 'Medium', label: 'Medium', color: '#F59E0B' },
  { id: 'Hard', label: 'Hard', color: '#EF4444' },
  { id: 'Mixed', label: 'Mixed', color: '#06B6D4' },
];

const DURATIONS: Array<{ minutes: InterviewDurationMinutes; label: string }> = [
  { minutes: 20, label: '20 min' },
  { minutes: 30, label: '30 min' },
  { minutes: 45, label: '45 min' },
  { minutes: 60, label: '60 min' },
];

const PROBLEM_COUNTS: InterviewProblemCount[] = [1, 2, 3, 4];

const LANGUAGES: Array<{ id: InterviewLanguage; label: string }> = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
];

export function InterviewSetupView({
  isLight,
  isAuthenticated,
  history,
  onStartInterview,
  onViewReport,
  sampleReport,
}: InterviewSetupViewProps) {
  const [selectedType, setSelectedType] = useState<InterviewTopicType>('Mixed Patterns');
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewArenaDifficulty>('Medium');
  const [selectedDuration, setSelectedDuration] = useState<InterviewDurationMinutes>(45);
  const [selectedCount, setSelectedCount] = useState<InterviewProblemCount>(2);
  const [selectedLanguage, setSelectedLanguage] = useState<InterviewLanguage>('javascript');
  const [useWeakness, setUseWeakness] = useState<boolean>(true);
  const [showSampleReport, setShowSampleReport] = useState<boolean>(false);

  const handleStart = () => {
    onStartInterview({
      type: selectedType,
      difficulty: selectedDifficulty,
      durationMinutes: selectedDuration,
      problemCount: selectedCount,
      language: selectedLanguage,
      useWeakness,
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* 1. HERO HEADER CARD */}
      <div
        className={`p-6 sm:p-8 md:p-10 rounded-3xl border transition-all ${
          isLight
            ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-200 shadow-sm'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
              <Timer className="w-3.5 h-3.5" />
              AUTHENTIC TIMED INTERVIEWS
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interview Arena
            </h1>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Simulate technical coding rounds under strict clock pressure. Receive a comprehensive, data-grounded performance diagnostic report with 5-pillar scoring and AI Mentor feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={() => setShowSampleReport(!showSampleReport)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>{showSampleReport ? 'Hide Sample Preview' : 'Preview Sample Report'}</span>
            </button>
            <button
              onClick={handleStart}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Start Round ({selectedDuration}m • {selectedCount}P)</span>
            </button>
          </div>
        </div>
      </div>

      {/* SAMPLE REPORT PREVIEW BANNER IF TOGGLED */}
      <AnimatePresence>
        {showSampleReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-5 sm:p-6 rounded-2xl border overflow-hidden ${
              isLight ? 'bg-cyan-50/80 border-cyan-200' : 'bg-cyan-950/20 border-cyan-800/40'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 border border-cyan-500/30">
                  SAMPLE SCORECARD
                </span>
                <h3 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  What Your Post-Interview Diagnostic Looks Like
                </h3>
              </div>
              <button
                onClick={() => onViewReport(sampleReport)}
                className="text-xs font-bold text-cyan-500 dark:text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View Full Interactive Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center">
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Overall Score</div>
                <div className="text-base sm:text-lg font-black text-cyan-500 dark:text-cyan-400">{sampleReport.overallScore}% ({sampleReport.grade})</div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Accuracy</div>
                <div className="text-base sm:text-lg font-black text-emerald-500 dark:text-emerald-400">{sampleReport.metrics.accuracy}%</div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Time Mgmt</div>
                <div className="text-base sm:text-lg font-black text-amber-500 dark:text-amber-400">{sampleReport.metrics.timeManagement}%</div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Pattern Rec</div>
                <div className="text-base sm:text-lg font-black text-blue-500 dark:text-blue-400">{sampleReport.metrics.patternRecognition}%</div>
              </div>
              <div className={`p-3 rounded-xl border col-span-2 sm:col-span-1 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Consistency</div>
                <div className="text-base sm:text-lg font-black text-indigo-500 dark:text-indigo-400">{sampleReport.metrics.consistency}%</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CONFIGURATION MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* LEFT 2 COLUMNS: CONFIGURATION CONTROLS */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          {/* A. TOPIC SELECTION */}
          <div className="space-y-3">
            <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              1. Choose Topic Focus
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {TOPIC_TYPES.map((t) => {
                const isSelected = selectedType === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all relative overflow-hidden ${
                      isSelected
                        ? isLight
                          ? 'bg-cyan-50/90 border-cyan-500 shadow-sm ring-1 ring-cyan-500/50'
                          : 'bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500/50'
                        : isLight
                        ? 'bg-white border-slate-200 hover:border-slate-300'
                        : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-xl shrink-0 ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-500 dark:text-cyan-400'
                            : isLight
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          {t.title}
                        </div>
                        <div className={`text-[11px] sm:text-xs mt-0.5 line-clamp-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {t.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. DIFFICULTY & DURATION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Difficulty */}
            <div className="space-y-3">
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                2. Difficulty Level
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {DIFFICULTIES.map((d) => {
                  const isSelected = selectedDifficulty === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDifficulty(d.id)}
                      className={`py-2.5 sm:py-3 px-3 rounded-xl text-center font-bold text-xs sm:text-sm border transition-all ${
                        isSelected
                          ? isLight
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-lg shadow-cyan-500/20'
                          : isLight
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {d.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                3. Total Duration
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {DURATIONS.map((dur) => {
                  const isSelected = selectedDuration === dur.minutes;
                  return (
                    <button
                      key={dur.minutes}
                      onClick={() => setSelectedDuration(dur.minutes)}
                      className={`py-2.5 sm:py-3 px-3 rounded-xl text-center font-bold text-xs sm:text-sm border transition-all ${
                        isSelected
                          ? isLight
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-lg shadow-cyan-500/20'
                          : isLight
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {dur.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* C. PROBLEM COUNT & LANGUAGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Number of Problems */}
            <div className="space-y-3">
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                4. Problem Count
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PROBLEM_COUNTS.map((cnt) => {
                  const isSelected = selectedCount === cnt;
                  return (
                    <button
                      key={cnt}
                      onClick={() => setSelectedCount(cnt)}
                      className={`py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all text-center ${
                        isSelected
                          ? isLight
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold'
                          : isLight
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cnt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Language */}
            <div className="space-y-3">
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                5. Primary Language
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LANGUAGES.map((lang) => {
                  const isSelected = selectedLanguage === lang.id;
                  return (
                    <button
                      key={lang.id}
                      onClick={() => setSelectedLanguage(lang.id)}
                      className={`py-2.5 sm:py-3 px-2 rounded-xl font-bold text-xs border transition-all text-center ${
                        isSelected
                          ? isLight
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold'
                          : isLight
                          ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                          : 'bg-slate-900/50 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* D. WEAKNESS TARGETING TOGGLE */}
          <div
            onClick={() => setUseWeakness(!useWeakness)}
            className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
              useWeakness
                ? isLight
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                  : 'bg-emerald-950/20 border-emerald-800/40'
                : isLight
                ? 'bg-white border-slate-200 hover:border-slate-300'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-xl shrink-0 ${
                  useWeakness
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Target My Weak Areas
                </div>
                <div className={`text-[11px] sm:text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Prioritize problem selection based on your personal Mistake Intelligence history
                </div>
              </div>
            </div>

            <div
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                useWeakness ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  useWeakness ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RULES & START BUTTON */}
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <h3 className={`text-sm sm:text-base font-bold mb-4 flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              Interview Arena Rules
            </h3>
            <ul className="space-y-3.5 text-xs leading-relaxed">
              <li className={`flex items-start gap-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Strict Clock:</strong> Timer runs continuously. Once time expires, code is evaluated and finalized automatically.
                </span>
              </li>
              <li className={`flex items-start gap-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Real Sandboxed Judge:</strong> Solutions are validated against extensive hidden edge case test suites.
                </span>
              </li>
              <li className={`flex items-start gap-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Telemetry Metrics:</strong> Attempt patterns, runtime pacing, and failure recovery feed into your scorecard.
                </span>
              </li>
              <li className={`flex items-start gap-2.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                <CheckCircle2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Ecosystem Sync:</strong> Identified weak patterns link to your Adaptive Roadmap and AI Mentor for targeted revision.
                </span>
              </li>
            </ul>

            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={handleStart}
                className="w-full py-3.5 rounded-2xl font-extrabold text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Start Interview Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. PAST INTERVIEWS HISTORY */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            <h2 className={`text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Past Interviews
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {history.length} {history.length === 1 ? 'round' : 'rounds'} completed
          </span>
        </div>

        {history.length === 0 ? (
          <div
            className={`p-8 sm:p-12 rounded-3xl border text-center space-y-3 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/40 border-slate-800'
            }`}
          >
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
              <Award className="w-6 h-6" />
            </div>
            <div className={`font-bold text-sm sm:text-base ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
              No interview rounds recorded yet
            </div>
            <p className={`text-xs max-w-sm mx-auto ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Configure and launch your first timed technical round above to build your performance scorecard and diagnosis.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider">
                      {item.type}
                    </span>
                    <h4 className={`font-bold text-sm sm:text-base mt-0.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {item.date}
                    </h4>
                  </div>
                  <div className="px-2.5 py-1 rounded-xl text-xs font-black bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
                    {item.score}% ({item.grade})
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span>{item.problemsCompleted}/{item.totalProblems} Solved</span>
                  <span>{item.timeUsedMinutes} / {item.durationMinutes}m</span>
                  <span className="font-semibold text-amber-500 dark:text-amber-400">{item.difficulty}</span>
                </div>

                <button
                  onClick={() => onViewReport(item.report)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>View Detailed Report</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
