'use client';

import React, { useState, useMemo } from 'react';
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
  Building2,
  Shuffle,
  ChevronRight,
  Sliders,
  Check,
  TrendingUp,
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
  InterviewSimulatorMode,
  InterviewReadinessData,
} from '../types/interview.types';
import { InterviewArenaService } from '../services/interview-arena.service';
import { CurriculumRepository } from '@/src/curriculum/repository';

interface InterviewSetupViewProps {
  isLight: boolean;
  isAuthenticated: boolean;
  userId?: string;
  history: InterviewHistoryRecord[];
  onStartInterview: (config: InterviewConfig) => void;
  onViewReport: (report: InterviewArenaReport) => void;
  sampleReport: InterviewArenaReport;
  initialMode?: InterviewSimulatorMode;
  initialArea?: string;
  initialSubtopic?: string;
  initialPattern?: string;
  initialCompany?: string;
}

const MODES: Array<{
  id: InterviewSimulatorMode;
  label: string;
  duration: InterviewDurationMinutes;
  count: InterviewProblemCount;
  desc: string;
  badge?: string;
  icon: any;
}> = [
  {
    id: 'quick',
    label: 'Quick Screen',
    duration: 20,
    count: 1,
    desc: '1 problem • 20 mins. Fast warmup or single algorithmic deep-dive.',
    badge: '15-20 min',
    icon: Zap,
  },
  {
    id: '30m',
    label: '30m Technical',
    duration: 30,
    count: 2,
    desc: '2 problems • 30 mins. Classic standard technical interview screen.',
    badge: 'Standard',
    icon: Clock,
  },
  {
    id: '45m',
    label: '45m Onsite Round',
    duration: 45,
    count: 3,
    desc: '3 problems • 45 mins. Escalating difficulty (Easy → Medium → Hard).',
    badge: 'Realistic',
    icon: Target,
  },
  {
    id: '60m',
    label: '60m Comprehensive',
    duration: 60,
    count: 4,
    desc: '4 problems • 60 mins. High-intensity session testing endurance.',
    badge: 'Intense',
    icon: Flame,
  },
  {
    id: 'company',
    label: 'Company Style',
    duration: 45,
    count: 3,
    desc: 'Curated sets strictly from documented company interview archives.',
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

const COMPANIES = [
  'Google',
  'Amazon',
  'Meta',
  'Microsoft',
  'Apple',
  'Uber',
  'Netflix',
  'Bloomberg',
];

const DIFFICULTIES: Array<{ id: InterviewArenaDifficulty; label: string; color: string }> = [
  { id: 'Easy', label: 'Easy', color: '#10B981' },
  { id: 'Medium', label: 'Medium', color: '#F59E0B' },
  { id: 'Hard', label: 'Hard', color: '#EF4444' },
  { id: 'Mixed', label: 'Mixed (Escalating)', color: '#06B6D4' },
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
  { id: 'typescript', label: 'TypeScript' },
];

export function InterviewSetupView({
  isLight,
  isAuthenticated,
  userId = 'default_user',
  history,
  onStartInterview,
  onViewReport,
  sampleReport,
  initialMode,
  initialArea,
  initialSubtopic,
  initialPattern,
  initialCompany,
}: InterviewSetupViewProps) {
  // Mode selection
  const [selectedMode, setSelectedMode] = useState<InterviewSimulatorMode>(initialMode || '45m');

  // Custom configuration parameters
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewArenaDifficulty>('Mixed');
  const [selectedDuration, setSelectedDuration] = useState<InterviewDurationMinutes>(45);
  const [selectedCount, setSelectedCount] = useState<InterviewProblemCount>(3);
  const [selectedLanguage, setSelectedLanguage] = useState<InterviewLanguage>('javascript');
  const [useWeakness, setUseWeakness] = useState<boolean>(true);
  const [showSampleReport, setShowSampleReport] = useState<boolean>(false);

  // Company and Topic filters
  const [targetCompany, setTargetCompany] = useState<string>(initialCompany || 'Google');
  const [targetArea, setTargetArea] = useState<string>(initialArea || 'all');
  const [targetSubtopic, setTargetSubtopic] = useState<string>(initialSubtopic || 'all');
  const [targetPattern, setTargetPattern] = useState<string>(initialPattern || 'all');

  // Load curriculum areas for topic filtering
  const learningAreas = useMemo(() => CurriculumRepository.getLearningAreas(), []);

  // Compute Evidence-based Interview Readiness
  const readiness: InterviewReadinessData = useMemo(() => {
    return InterviewArenaService.getInterviewReadiness(userId);
  }, [userId, history]);

  // Handle Mode Change and preset updates
  const handleSelectMode = (mode: InterviewSimulatorMode) => {
    setSelectedMode(mode);
    const preset = MODES.find((m) => m.id === mode);
    if (preset) {
      if (mode !== 'custom') {
        setSelectedDuration(preset.duration);
        setSelectedCount(preset.count);
      }
      if (mode === 'quick') {
        setSelectedDifficulty('Medium');
      } else if (mode === '30m' || mode === '45m' || mode === '60m' || mode === 'mixed') {
        setSelectedDifficulty('Mixed');
      }
    }
  };

  // Launch interview with active configuration
  const handleStart = () => {
    const config: InterviewConfig = {
      mode: selectedMode,
      difficulty: selectedDifficulty,
      durationMinutes: selectedDuration,
      problemCount: selectedCount,
      language: selectedLanguage,
      useWeakness,
      targetCompany: selectedMode === 'company' ? targetCompany : undefined,
      targetArea: selectedMode === 'topic' && targetArea !== 'all' ? targetArea : undefined,
      targetSubtopic: selectedMode === 'topic' && targetSubtopic !== 'all' ? targetSubtopic : undefined,
      targetPattern: selectedMode === 'topic' && targetPattern !== 'all' ? targetPattern : undefined,
      type:
        selectedMode === 'company'
          ? 'Company Style'
          : selectedMode === 'topic'
          ? 'Topic Focused'
          : 'Mixed Patterns',
    };
    onStartInterview(config);
  };

  // Launch recommended session directly
  const handleStartRecommended = () => {
    const rec = readiness.recommendedSession;
    const config: InterviewConfig = {
      mode: rec.mode,
      difficulty: rec.difficulty,
      durationMinutes: rec.durationMinutes,
      problemCount: rec.problemCount,
      language: selectedLanguage,
      useWeakness: true,
      targetArea: rec.targetArea,
      type: rec.targetArea ? 'Topic Focused' : 'Mixed Patterns',
    };
    onStartInterview(config);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16" data-testid="interview-setup-view">
      {/* 1. HERO HEADER CARD */}
      <div
        className={`p-6 sm:p-8 md:p-10 rounded-3xl border transition-all relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-br from-white via-slate-50 to-slate-100 border-slate-200 shadow-sm'
            : 'bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border-slate-800'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
              <Timer className="w-3.5 h-3.5" />
              AUTHENTIC CODING INTERVIEW SIMULATOR
            </div>
            <h1 className={`text-3xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interview Arena
            </h1>
            <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Simulate realistic technical rounds under clock pressure. Features authentic pattern concealment, thinking/approach notes, simulated interviewer guidance checkpoints, and factual post-interview diagnostics.
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
              data-testid="start-interview-btn"
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Start Interview ({selectedDuration}m • {selectedCount}P)</span>
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
                  Factual Post-Interview Performance Diagnostic
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Problems Solved</div>
                <div className="text-base sm:text-lg font-black text-cyan-500 dark:text-cyan-400">
                  {sampleReport.problemsSolved} / {sampleReport.problemsAttempted}
                </div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Accuracy</div>
                <div className="text-base sm:text-lg font-black text-emerald-500 dark:text-emerald-400">{sampleReport.accuracyPercent}%</div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Avg Time/Problem</div>
                <div className="text-base sm:text-lg font-black text-amber-500 dark:text-amber-400">{sampleReport.averageTimePerProblemMinutes}m</div>
              </div>
              <div className={`p-3 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Readiness State</div>
                <div className="text-base sm:text-lg font-black text-indigo-500 dark:text-indigo-400">{sampleReport.readinessState}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. EVIDENCE-BASED READINESS HUD & RECOMMENDED SESSION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="interview-readiness-hud">
        {/* Readiness Level & Telemetry */}
        <div
          className={`lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between gap-5 ${
            isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Evidence-Based Interview Readiness
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h2 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {readiness.level}
                </h2>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    readiness.level === 'Strong Evidence'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                      : readiness.level === 'Developing'
                      ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30'
                      : readiness.level === 'Needs Practice'
                      ? 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                      : 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                  }`}
                >
                  {readiness.totalCompletedSessions} Rounds Completed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Confidence Metric:</span>
              <div className="text-sm font-black text-cyan-500 dark:text-cyan-400">{readiness.confidenceScore}%</div>
            </div>
          </div>

          {/* 4 Telemetry Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Historical Accuracy</div>
              <div className="text-base font-black text-emerald-500 dark:text-emerald-400 mt-0.5">
                {readiness.historicalAccuracyPercent}%
              </div>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Speed Pacing</div>
              <div className="text-base font-black text-cyan-500 dark:text-cyan-400 mt-0.5">
                {readiness.speedPacingScore > 0 ? `${readiness.speedPacingScore}m / prob` : 'No data'}
              </div>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Pattern Coverage</div>
              <div className="text-base font-black text-purple-500 dark:text-purple-400 mt-0.5">
                {readiness.patternCoverageCount} / 113
              </div>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'}`}>
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Recommended Focus</div>
              <div className="text-xs font-bold text-amber-500 dark:text-amber-400 mt-1 truncate" title={readiness.recommendedFocus}>
                {readiness.recommendedFocus}
              </div>
            </div>
          </div>

          {/* Weak Areas & Strong Areas Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
            <span className="font-bold text-slate-500 dark:text-slate-400">Weak Spots:</span>
            {readiness.weakestAreas.length > 0 ? (
              readiness.weakestAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg font-semibold bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20"
                >
                  {area}
                </span>
              ))
            ) : (
              <span className="text-slate-400">None detected yet</span>
            )}

            <span className="text-slate-400 mx-1">•</span>
            <span className="font-bold text-slate-500 dark:text-slate-400">Solid:</span>
            {readiness.strongestAreas.length > 0 ? (
              readiness.strongestAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-lg font-semibold bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20"
                >
                  {area}
                </span>
              ))
            ) : (
              <span className="text-slate-400">Building baseline</span>
            )}
          </div>
        </div>

        {/* Recommended Interview Session Card */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between gap-4 relative overflow-hidden ${
            isLight
              ? 'bg-gradient-to-br from-cyan-50/60 to-white border-cyan-200 shadow-sm'
              : 'bg-gradient-to-br from-cyan-950/30 to-slate-900 border-cyan-900/40'
          }`}
          data-testid="recommended-interview-card"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                RECOMMENDED SESSION
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {readiness.recommendedSession.durationMinutes} min
              </span>
            </div>

            <h3 className={`text-base sm:text-lg font-black leading-snug ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {readiness.recommendedSession.title}
            </h3>

            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
              {readiness.recommendedSession.reason}
            </p>
          </div>

          <button
            onClick={handleStartRecommended}
            data-testid="start-recommended-interview-btn"
            className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 shadow-md shadow-cyan-500/20"
          >
            <span>Start Recommended Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. INTERVIEW SIMULATOR MODES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            1. Select Interview Simulator Mode
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Active: <strong className="text-cyan-500 dark:text-cyan-400">{MODES.find((m) => m.id === selectedMode)?.label}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {MODES.map((m) => {
            const isSelected = selectedMode === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => handleSelectMode(m.id)}
                data-testid={`mode-btn-${m.id}`}
                className={`p-4 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? isLight
                      ? 'bg-cyan-50/90 border-cyan-500 shadow-sm ring-2 ring-cyan-500/40'
                      : 'bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/40'
                    : isLight
                    ? 'bg-white border-slate-200 hover:border-slate-300'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-500 dark:text-cyan-400'
                          : isLight
                          ? 'bg-slate-100 text-slate-600'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {m.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {m.badge}
                      </span>
                    )}
                  </div>
                  <h4 className={`font-bold text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.label}</h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-500 dark:text-slate-400">
                    {m.duration}m • {m.count} {m.count === 1 ? 'prob' : 'probs'}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MODE SPECIFIC CONFIGURATION CONTROLS */}
      <div
        className={`p-6 rounded-3xl border space-y-6 ${
          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/60 border-slate-800'
        }`}
      >
        {/* A. COMPANY STYLE SELECTION (IF COMPANY MODE SELECTED) */}
        {selectedMode === 'company' && (
          <div className="space-y-3" data-testid="company-style-selector">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Target Company Interview Archive (Strict Real Metadata)
              </label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {COMPANIES.map((comp) => {
                const isSelected = targetCompany.toLowerCase() === comp.toLowerCase();
                return (
                  <button
                    key={comp}
                    onClick={() => setTargetCompany(comp)}
                    data-testid={`company-btn-${comp.toLowerCase()}`}
                    className={`p-3 rounded-xl text-center font-bold text-xs sm:text-sm border transition-all ${
                      isSelected
                        ? isLight
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                          : 'bg-cyan-500 text-slate-950 border-cyan-500 font-extrabold shadow-lg shadow-cyan-500/20'
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

        {/* B. TOPIC FOCUSED SELECTION (IF TOPIC MODE SELECTED) */}
        {selectedMode === 'topic' && (
          <div className="space-y-3" data-testid="topic-focused-selector">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <label className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                Focus Learning Area & Pattern
              </label>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Learning Area
                </label>
                <select
                  value={targetArea}
                  onChange={(e) => setTargetArea(e.target.value)}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <option value="all">All Learning Areas</option>
                  {learningAreas.map((area) => (
                    <option key={area.id} value={area.id}>
                      {area.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-1">
                  Pattern Filter (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. two-pointers, sliding-window"
                  value={targetPattern === 'all' ? '' : targetPattern}
                  onChange={(e) => setTargetPattern(e.target.value || 'all')}
                  className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none ${
                    isLight ? 'bg-slate-50 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {/* C. CUSTOM & GENERAL PARAMETERS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Difficulty */}
          <div>
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value as InterviewArenaDifficulty)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
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
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              Total Time
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(Number(e.target.value) as InterviewDurationMinutes)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
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
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              Problem Count
            </label>
            <select
              value={selectedCount}
              onChange={(e) => setSelectedCount(Number(e.target.value) as InterviewProblemCount)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
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

          {/* Primary Language */}
          <div>
            <label className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
              Primary Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as InterviewLanguage)}
              className={`w-full p-2.5 rounded-xl text-xs font-semibold border outline-none cursor-pointer ${
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

        {/* D. WEAKNESS TARGETING TOGGLE */}
        <div
          onClick={() => setUseWeakness(!useWeakness)}
          className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
            useWeakness
              ? isLight
                ? 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                : 'bg-emerald-950/20 border-emerald-800/40'
              : isLight
              ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
              : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl shrink-0 ${
                useWeakness
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className={`font-bold text-xs sm:text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Adaptive Weakness Prioritization
              </div>
              <div className={`text-[11px] sm:text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Surface problems matching your mistake history & unmastered patterns to accelerate real exam readiness
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

      {/* 5. PAST INTERVIEWS HISTORY */}
      <div className="space-y-4 pt-4" data-testid="interview-history-section">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            <h2 className={`text-lg sm:text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Interview History & Diagnostics
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {history.length} {history.length === 1 ? 'round recorded' : 'rounds recorded'}
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
                data-testid={`history-card-${item.id}`}
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
                    {item.report?.accuracyPercent ?? item.score}% Acc
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
                  <span>{item.problemsCompleted}/{item.totalProblems} Solved</span>
                  <span>{item.timeUsedMinutes} / {item.durationMinutes}m</span>
                  <span className="font-semibold text-amber-500 dark:text-amber-400">{item.difficulty}</span>
                </div>

                <button
                  onClick={() => onViewReport(item.report)}
                  data-testid={`view-report-btn-${item.id}`}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>View Factual Scorecard</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
