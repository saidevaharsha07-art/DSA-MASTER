'use client';

import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  InterviewConfig,
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
import { InterviewLandingHeader } from './InterviewLandingHeader';
import { InterviewReadinessSection } from './InterviewReadinessSection';
import { RecommendedInterviewCard } from './RecommendedInterviewCard';
import { InterviewModeSelector, INTERVIEW_MODES } from './InterviewModeSelector';
import { InterviewSetupControls } from './InterviewSetupControls';
import { InterviewHistoryList } from './InterviewHistoryList';

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
  // Mode selection state
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
    const preset = INTERVIEW_MODES.find((m) => m.id === mode);
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
    <div className="max-w-6xl mx-auto space-y-6 pb-16" data-testid="interview-setup-view">
      {/* 1. HERO HEADER */}
      <InterviewLandingHeader
        isLight={isLight}
        selectedDuration={selectedDuration}
        selectedCount={selectedCount}
        showSampleReport={showSampleReport}
        onToggleSampleReport={() => setShowSampleReport(!showSampleReport)}
        onStart={handleStart}
      />

      {/* SAMPLE REPORT PREVIEW BANNER (IF TOGGLED) */}
      <AnimatePresence>
        {showSampleReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`p-4 sm:p-5 rounded-2xl border overflow-hidden ${
              isLight ? 'bg-cyan-50/70 border-cyan-200' : 'bg-cyan-950/20 border-cyan-800/40'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
                  SAMPLE SCORECARD PREVIEW
                </span>
                <h3 className={`text-xs sm:text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Factual Post-Interview Engineering Diagnostic
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onViewReport(sampleReport)}
                className="text-xs font-bold text-cyan-500 dark:text-cyan-400 hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View Full Interactive Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 font-medium">Problems Solved</div>
                <div className="text-base font-mono font-black text-cyan-500 dark:text-cyan-400">
                  {sampleReport.problemsSolved} / {sampleReport.problemsAttempted}
                </div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 font-medium">Accuracy</div>
                <div className="text-base font-mono font-black text-emerald-500 dark:text-emerald-400">{sampleReport.accuracyPercent}%</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 font-medium">Avg Time / Prob</div>
                <div className="text-base font-mono font-black text-amber-500 dark:text-amber-400">{sampleReport.averageTimePerProblemMinutes}m</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'}`}>
                <div className="text-[11px] text-slate-500 font-medium">Readiness State</div>
                <div className="text-base font-mono font-black text-indigo-500 dark:text-indigo-400">{sampleReport.readinessState}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. READINESS HUD & RECOMMENDED SESSION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <InterviewReadinessSection
            isLight={isLight}
            readiness={readiness}
          />
        </div>

        <div>
          <RecommendedInterviewCard
            isLight={isLight}
            recommended={readiness.recommendedSession}
            onStartRecommended={handleStartRecommended}
          />
        </div>
      </div>

      {/* 3. STRUCTURED INTERVIEW MODES */}
      <InterviewModeSelector
        isLight={isLight}
        selectedMode={selectedMode}
        onSelectMode={handleSelectMode}
      />

      {/* 4. COMPACT SETUP CONTROLS */}
      <InterviewSetupControls
        isLight={isLight}
        selectedMode={selectedMode}
        targetCompany={targetCompany}
        onSelectCompany={setTargetCompany}
        targetArea={targetArea}
        onSelectArea={setTargetArea}
        targetPattern={targetPattern}
        onChangePattern={setTargetPattern}
        learningAreas={learningAreas}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        selectedDuration={selectedDuration}
        onSelectDuration={setSelectedDuration}
        selectedCount={selectedCount}
        onSelectCount={setSelectedCount}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        useWeakness={useWeakness}
        onToggleWeakness={() => setUseWeakness(!useWeakness)}
      />

      {/* 5. INTERVIEW HISTORY TABLE / LIST */}
      <InterviewHistoryList
        isLight={isLight}
        history={history}
        onViewReport={onViewReport}
      />
    </div>
  );
}
