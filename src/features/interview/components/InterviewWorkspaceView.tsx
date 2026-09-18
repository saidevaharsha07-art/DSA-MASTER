'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Send,
  Code2,
  FileText,
  Lightbulb,
  AlertTriangle,
  Zap,
  Terminal,
  Clock,
  Loader2,
  Check,
  Maximize2,
  Minimize2,
  HelpCircle,
  Eye,
  EyeOff,
  Brain,
  ListChecks,
  CheckSquare,
  Square,
} from 'lucide-react';
import {
  InterviewArenaSession,
  InterviewLanguage,
  InterviewArenaProblemAttempt,
} from '../types/interview.types';
import { InterviewArenaService } from '../services/interview-arena.service';
import { TemplateService } from '@/src/problems/services/template.service';

// Dynamically import Monaco Editor with fallback for SSR
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-xs text-slate-400 gap-2 bg-slate-950">
      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
      <span>Initializing Code Editor...</span>
    </div>
  ),
});

const INTERVIEW_GUIDANCE_MILESTONES = [
  {
    id: 'clarify',
    title: '1. Clarify Constraints & I/O',
    desc: 'Verify input types, bounds, return shape, duplicates, and empty/null scenarios with the interviewer.',
  },
  {
    id: 'verbalize',
    title: '2. Verbalize Naive vs Optimal Approach',
    desc: 'Explain the straightforward brute force approach first, then explain the pattern intuition for optimal solution.',
  },
  {
    id: 'complexity',
    title: '3. State Big-O Bounds Upfront',
    desc: 'State target Time and Space complexity before writing code to validate algorithmic alignment.',
  },
  {
    id: 'edge_cases',
    title: '4. Brainstorm Critical Edge Cases',
    desc: 'List single-element, sorted/reverse, duplicates, negative numbers, and boundary capacity cases.',
  },
  {
    id: 'dry_run',
    title: '5. Dry-Run & Clean Code',
    desc: 'Manually trace step-by-step through a concrete example before running tests.',
  },
];

const TIME_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log N)',
  'O(N)',
  'O(N log N)',
  'O(N^2)',
  'O(2^N)',
  'O(N!)',
];

const SPACE_COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log N)',
  'O(N)',
  'O(N^2)',
];

interface InterviewWorkspaceViewProps {
  isLight: boolean;
  session: InterviewArenaSession;
  userId: string;
  onFinishInterview: (status: 'completed' | 'expired') => void;
  onSessionUpdate: (updatedSession: InterviewArenaSession) => void;
}

export function InterviewWorkspaceView({
  isLight,
  session,
  userId,
  onFinishInterview,
  onSessionUpdate,
}: InterviewWorkspaceViewProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [leftTab, setLeftTab] = useState<'specs' | 'thinking' | 'guidance'>('specs');
  const [mobileTab, setMobileTab] = useState<'specs' | 'thinking' | 'guidance' | 'editor' | 'console'>('editor');

  const [isPaused, setIsPaused] = useState<boolean>(session.isPaused || false);

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    if (session.remainingSecondsAtPause !== undefined && session.isPaused) {
      return session.remainingSecondsAtPause;
    }
    const expires = new Date(session.expiresAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.round((expires - now) / 1000));
  });

  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const [currentCode, setCurrentCode] = useState<string>(
    session.problems[0]?.userCode || session.problems[0]?.starterCode || ''
  );
  const [currentLanguage, setCurrentLanguage] = useState<InterviewLanguage>(
    session.problems[0]?.language || session.config.language || 'javascript'
  );

  // Thinking notes states
  const [approachNotes, setApproachNotes] = useState<string>(session.problems[0]?.approachNotes || '');
  const [timeComplexity, setTimeComplexity] = useState<string>(session.problems[0]?.timeComplexityEstimate || '');
  const [spaceComplexity, setSpaceComplexity] = useState<string>(session.problems[0]?.spaceComplexityEstimate || '');
  const [edgeCases, setEdgeCases] = useState<string>(session.problems[0]?.identifiedEdgeCases || '');
  const [notesSavedIndicator, setNotesSavedIndicator] = useState<boolean>(false);

  const [revealedPattern, setRevealedPattern] = useState<boolean>(false);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<{
    status?: string;
    stdout?: string;
    stderr?: string;
    runtimeMs?: number;
    memoryMb?: number;
    passedTestcases?: number;
    totalTestcases?: number;
    isSubmit?: boolean;
  } | null>(null);

  const [showHints, setShowHints] = useState<boolean>(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const hasExpiredRef = useRef<boolean>(false);

  const currentProblem: InterviewArenaProblemAttempt = session.problems[activeIndex] || session.problems[0];

  // Sync state when switching active problem
  useEffect(() => {
    const prob = session.problems[activeIndex];
    if (prob) {
      setCurrentCode(prob.userCode);
      setCurrentLanguage(prob.language || session.config.language || 'javascript');
      setApproachNotes(prob.approachNotes || '');
      setTimeComplexity(prob.timeComplexityEstimate || '');
      setSpaceComplexity(prob.spaceComplexityEstimate || '');
      setEdgeCases(prob.identifiedEdgeCases || '');
      setRevealedPattern(false);
      setExecutionOutput(
        prob.lastVerdict
          ? {
              status: prob.lastVerdict,
              stderr: prob.lastOutput,
              runtimeMs: prob.runtimeMs,
              memoryMb: prob.memoryMb,
              passedTestcases: prob.testcasesPassed,
              totalTestcases: prob.totalTestcases,
              isSubmit: true,
            }
          : null
      );
    }
  }, [activeIndex, session.problems, session.config.language]);

  // Real countdown timer with pause support & auto-expiration
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            onFinishInterview('expired');
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, onFinishInterview]);

  // Format Timer string MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Timer State classification: normal, warning, critical
  const timerState =
    remainingSeconds <= 60
      ? 'critical'
      : remainingSeconds <= 300
      ? 'warning'
      : 'normal';

  // Toggle Pause
  const handleTogglePause = () => {
    if (isPaused) {
      const resumed = InterviewArenaService.resumeSession(session.id, userId);
      if (resumed) {
        setIsPaused(false);
        onSessionUpdate(resumed);
      }
    } else {
      const paused = InterviewArenaService.pauseSession(session.id, userId);
      if (paused) {
        setIsPaused(true);
        onSessionUpdate(paused);
      }
    }
  };

  // Handle Code Change
  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || '';
    setCurrentCode(val);
    InterviewArenaService.updateProblemCode(session.id, activeIndex, val, currentLanguage);
  };

  // Handle Notes change & auto-save
  const handleSaveNotes = (
    notes: string,
    timeComp: string,
    spaceComp: string,
    cases: string
  ) => {
    InterviewArenaService.updateProblemNotes(
      session.id,
      activeIndex,
      {
        approachNotes: notes,
        timeComplexityEstimate: timeComp,
        spaceComplexityEstimate: spaceComp,
        identifiedEdgeCases: cases,
      },
      userId
    );
    setNotesSavedIndicator(true);
    setTimeout(() => setNotesSavedIndicator(false), 1500);
  };

  // Handle Guidance Check toggle
  const handleToggleGuidance = (milestoneId: string) => {
    const updated = InterviewArenaService.toggleGuidanceCheck(
      session.id,
      activeIndex,
      milestoneId,
      userId
    );
    if (updated) {
      onSessionUpdate(updated);
    }
  };

  // Handle Language Change
  const handleLanguageChange = (lang: InterviewLanguage) => {
    setCurrentLanguage(lang);
    const template =
      TemplateService.getTemplate(currentProblem.categorySlug || currentProblem.problemId, lang) ||
      `// Solution for ${currentProblem.title} in ${lang}\n`;
    setCurrentCode(template);
    InterviewArenaService.updateProblemCode(session.id, activeIndex, template, lang);
  };

  // Reset Template Code
  const handleResetCode = () => {
    const template =
      TemplateService.getTemplate(currentProblem.categorySlug || currentProblem.problemId, currentLanguage) ||
      currentProblem.starterCode;
    setCurrentCode(template);
    InterviewArenaService.updateProblemCode(session.id, activeIndex, template, currentLanguage);
    setShowResetConfirm(false);
  };

  // Handle Reveal Pattern Hint
  const handleRevealPattern = () => {
    setRevealedPattern(true);
    InterviewArenaService.recordHintUsed(session.id, activeIndex, userId);
  };

  // Handle Run Code (Sample testcases)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting || isPaused) return;
    setIsRunning(true);
    setExecutionOutput(null);
    try {
      const res = await InterviewArenaService.executeRun(
        currentProblem.problemId,
        currentCode,
        currentLanguage
      );
      setExecutionOutput({
        status: res.status,
        stdout: res.stdout,
        stderr: res.stderr,
        runtimeMs: res.runtimeMs,
        memoryMb: res.memoryMb,
        passedTestcases: res.passedTestcases,
        totalTestcases: res.totalTestcases,
        isSubmit: false,
      });
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setMobileTab('console');
      }
    } catch (err: any) {
      setExecutionOutput({
        status: 'Runtime Error',
        stderr: err.message || 'Execution error in sandboxed runner',
        isSubmit: false,
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Handle Submit Code (Full evaluation)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting || isPaused) return;
    setIsSubmitting(true);
    setExecutionOutput(null);
    try {
      const res = await InterviewArenaService.submitSolution(
        session.id,
        activeIndex,
        currentCode,
        currentLanguage,
        userId
      );
      onSessionUpdate(res.session);
      setExecutionOutput({
        status: res.verdict,
        stderr: res.outputDetails,
        runtimeMs: res.runtimeMs,
        memoryMb: res.memoryMb,
        passedTestcases: res.testcasesPassed,
        totalTestcases: res.totalTestcases,
        isSubmit: true,
      });
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setMobileTab('console');
      }
    } catch (err: any) {
      setExecutionOutput({
        status: 'Runtime Error',
        stderr: err.message || 'Evaluation error during submission',
        isSubmit: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map language to Monaco language mode
  const monacoLang =
    currentLanguage === 'cpp'
      ? 'cpp'
      : currentLanguage === 'python'
      ? 'python'
      : currentLanguage === 'java'
      ? 'java'
      : currentLanguage === 'typescript'
      ? 'typescript'
      : 'javascript';

  // Determine if pattern should be concealed
  const isRealisticMode =
    session.config.mode !== 'topic' && session.config.type !== 'Topic Focused';
  const shouldConcealPattern = isRealisticMode && !revealedPattern;

  const guidanceCompleted = currentProblem.guidanceChecksCompleted || [];

  return (
    <div
      className="flex flex-col h-[calc(100vh-4.5rem)] max-w-full mx-auto overflow-hidden rounded-2xl border shadow-xl border-slate-200 dark:border-slate-800 relative"
      data-testid="interview-workspace-view"
    >
      {/* 1. TOP HEADER & TIMER BAR */}
      <header
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Left: Branding & Config Metadata */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isPaused ? 'bg-amber-400' : 'bg-cyan-400 animate-pulse'
              }`}
            />
            <h2 className={`font-black text-xs sm:text-sm tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
              INTERVIEW ARENA
            </h2>
          </div>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {session.config.type || session.config.mode}
          </span>
          {session.config.targetCompany && (
            <span className="hidden md:inline-flex text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
              {session.config.targetCompany}
            </span>
          )}
          <span className="hidden md:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
            {session.config.difficulty}
          </span>
        </div>

        {/* Middle: Problem Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full" data-testid="problem-tabs-container">
          {session.problems.map((p, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={p.problemId}
                onClick={() => setActiveIndex(idx)}
                data-testid={`problem-tab-${idx + 1}`}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0 ${
                  isCurrent
                    ? isLight
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-cyan-500 text-slate-950 border-cyan-500 font-black'
                    : isLight
                    ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>P{idx + 1}</span>
                {p.status === 'passed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />}
                {p.status === 'failed' && <XCircle className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />}
                {p.status === 'unattempted' && <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />}
              </button>
            );
          })}
        </div>

        {/* Right: Real Countdown Timer & Controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Resume Button */}
          <button
            onClick={handleTogglePause}
            data-testid="pause-resume-btn"
            className={`p-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 ${
              isPaused
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-500 dark:text-amber-400'
                : isLight
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
            title={isPaused ? 'Resume Interview' : 'Pause Interview'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPaused ? 'Resume' : 'Pause'}</span>
          </button>

          {/* Timer Display */}
          <div
            data-testid="interview-timer"
            className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm tracking-wider transition-all ${
              timerState === 'critical'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse ring-2 ring-rose-500/30'
                : timerState === 'warning'
                ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 border-amber-500/40 animate-pulse'
                : isLight
                ? 'bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-800/80 text-cyan-400 border-slate-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{formatTime(remainingSeconds)}</span>
          </div>

          {/* Finish Button */}
          <button
            onClick={() => setShowFinishConfirm(true)}
            data-testid="finish-interview-btn"
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all shrink-0"
          >
            Finish
          </button>
        </div>
      </header>

      {/* MOBILE VIEWPORT TAB SWITCHER (<1024px) */}
      <div className="flex lg:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shrink-0 text-xs overflow-x-auto">
        <button
          onClick={() => setMobileTab('specs')}
          className={`px-3 py-2 font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'specs'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Problem Specs
        </button>
        <button
          onClick={() => setMobileTab('thinking')}
          className={`px-3 py-2 font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'thinking'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Thinking & Notes
        </button>
        <button
          onClick={() => setMobileTab('guidance')}
          className={`px-3 py-2 font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'guidance'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Guidance ({guidanceCompleted.length}/5)
        </button>
        <button
          onClick={() => setMobileTab('editor')}
          className={`px-3 py-2 font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'editor'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Code Editor
        </button>
        <button
          onClick={() => setMobileTab('console')}
          className={`px-3 py-2 font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'console'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Console
        </button>
      </div>

      {/* 2. MAIN SPLIT WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* PAUSED OVERLAY IF PAUSED (PREVENT CHEATING) */}
        {isPaused && (
          <div
            data-testid="interview-paused-overlay"
            className="absolute inset-0 z-40 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4"
          >
            <div className="p-4 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Pause className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white">Interview Paused</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              The countdown timer and editor are suspended. Resume when you are ready to continue under exam conditions.
            </p>
            <button
              onClick={handleTogglePause}
              data-testid="resume-overlay-btn"
              className="px-6 py-2.5 rounded-xl font-black text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Interview</span>
            </button>
          </div>
        )}

        {/* LEFT PANEL: PROBLEM / THINKING / GUIDANCE */}
        <div
          className={`lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r overflow-hidden ${
            mobileTab === 'specs' || mobileTab === 'thinking' || mobileTab === 'guidance'
              ? 'flex'
              : 'hidden lg:flex'
          } ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'}`}
        >
          {/* Sub-Header Tabs (Desktop) */}
          <div
            className={`hidden lg:flex px-4 py-2 border-b items-center justify-between shrink-0 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/60 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setLeftTab('specs')}
                data-testid="tab-specs"
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  leftTab === 'specs'
                    ? isLight
                      ? 'bg-slate-200 text-slate-900'
                      : 'bg-slate-800 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Problem Specs</span>
              </button>

              <button
                onClick={() => setLeftTab('thinking')}
                data-testid="tab-thinking"
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  leftTab === 'thinking'
                    ? isLight
                      ? 'bg-slate-200 text-slate-900'
                      : 'bg-slate-800 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>Approach & Notes</span>
                {(approachNotes || timeComplexity || edgeCases) && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                )}
              </button>

              <button
                onClick={() => setLeftTab('guidance')}
                data-testid="tab-guidance"
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                  leftTab === 'guidance'
                    ? isLight
                      ? 'bg-slate-200 text-slate-900'
                      : 'bg-slate-800 text-cyan-400'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Interviewer Guidance</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">
                  {guidanceCompleted.length}/5
                </span>
              </button>
            </div>

            {notesSavedIndicator && (
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
          </div>

          {/* LEFT CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. PROBLEM SPECS VIEW */}
            {(leftTab === 'specs' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'specs')) && (
              <div className="space-y-6 max-w-2xl mx-auto w-full">
                {/* Title & Pattern Concealment Banner */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-cyan-500 dark:text-cyan-400">
                      Problem {activeIndex + 1} of {session.problems.length}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                        currentProblem.difficulty === 'Easy'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : currentProblem.difficulty === 'Hard'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-slate-400">•</span>

                    {/* REALISTIC PATTERN CONCEALMENT */}
                    {shouldConcealPattern ? (
                      <div className="flex items-center gap-1.5" data-testid="pattern-concealed-badge">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Pattern Concealed (Realistic Mode)
                        </span>
                        <button
                          onClick={handleRevealPattern}
                          data-testid="reveal-pattern-btn"
                          className="text-[10px] font-bold text-amber-500 hover:underline"
                        >
                          Reveal Hint
                        </button>
                      </div>
                    ) : (
                      <span
                        className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1"
                        data-testid="revealed-pattern-tag"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        {currentProblem.pattern}
                      </span>
                    )}
                  </div>

                  <h1 className={`text-xl sm:text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {currentProblem.title}
                  </h1>
                </div>

                {/* Description */}
                <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {currentProblem.description}
                </div>

                {/* Examples */}
                {currentProblem.examples && currentProblem.examples.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      Examples
                    </h4>
                    {currentProblem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border text-xs font-mono space-y-1.5 ${
                          isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900/80 border-slate-800'
                        }`}
                      >
                        <div>
                          <span className="text-cyan-500 dark:text-cyan-400 font-bold">Input:</span> {ex.input}
                        </div>
                        <div>
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold">Output:</span> {ex.output}
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-500 dark:text-slate-400 font-sans text-xs pt-1">
                            <strong>Explanation:</strong> {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {currentProblem.constraints && currentProblem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h4 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      Constraints
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {currentProblem.constraints.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hints Section */}
                {currentProblem.hints && currentProblem.hints.length > 0 && (
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setShowHints(!showHints);
                        if (!showHints) {
                          InterviewArenaService.recordHintUsed(session.id, activeIndex, userId);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      {showHints ? 'Hide Hints' : 'Request Interviewer Hint'}
                    </button>
                    {showHints && (
                      <div
                        className={`mt-2 p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                          isLight
                            ? 'bg-amber-50/80 border-amber-200 text-amber-900'
                            : 'bg-amber-950/20 border-amber-800/40 text-amber-300'
                        }`}
                      >
                        {currentProblem.hints.map((h, i) => (
                          <p key={i}>• {h}</p>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 2. APPROACH & NOTES (THINKING PHASE) VIEW */}
            {(leftTab === 'thinking' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'thinking')) && (
              <div className="space-y-5 max-w-2xl mx-auto w-full" data-testid="thinking-phase-container">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      <Brain className="w-4 h-4 text-cyan-400" />
                      Thinking & Approach Phase
                    </h3>
                    <span className="text-[10px] text-slate-500">Auto-saved to session scorecard</span>
                  </div>
                  <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Outline your mental model, Big-O bounds, and boundary edge cases before diving into implementation.
                  </p>
                </div>

                {/* Big-O Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Estimated Time Complexity
                    </label>
                    <select
                      value={timeComplexity}
                      data-testid="time-complexity-select"
                      onChange={(e) => {
                        const val = e.target.value;
                        setTimeComplexity(val);
                        handleSaveNotes(approachNotes, val, spaceComplexity, edgeCases);
                      }}
                      className={`w-full p-2 rounded-xl text-xs font-mono font-bold border outline-none cursor-pointer ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-cyan-400'
                      }`}
                    >
                      <option value="">Select Expected Big-O Time...</option>
                      {TIME_COMPLEXITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      Estimated Space Complexity
                    </label>
                    <select
                      value={spaceComplexity}
                      data-testid="space-complexity-select"
                      onChange={(e) => {
                        const val = e.target.value;
                        setSpaceComplexity(val);
                        handleSaveNotes(approachNotes, timeComplexity, val, edgeCases);
                      }}
                      className={`w-full p-2 rounded-xl text-xs font-mono font-bold border outline-none cursor-pointer ${
                        isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-slate-700 text-cyan-400'
                      }`}
                    >
                      <option value="">Select Expected Big-O Space...</option>
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
                  <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Algorithmic Approach & Invariant Notes
                  </label>
                  <textarea
                    value={approachNotes}
                    data-testid="approach-notes-input"
                    onChange={(e) => {
                      const val = e.target.value;
                      setApproachNotes(val);
                      handleSaveNotes(val, timeComplexity, spaceComplexity, edgeCases);
                    }}
                    placeholder="e.g. Use a two-pointer window [left, right]. Expand right until duplicate found, then contract left..."
                    rows={6}
                    className={`w-full p-3 rounded-xl text-xs font-mono border outline-none leading-relaxed resize-y ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                        : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    }`}
                  />
                </div>

                {/* Edge Cases Textarea */}
                <div>
                  <label className={`text-[11px] font-bold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    Critical Edge Cases to Handle
                  </label>
                  <textarea
                    value={edgeCases}
                    data-testid="edge-cases-input"
                    onChange={(e) => {
                      const val = e.target.value;
                      setEdgeCases(val);
                      handleSaveNotes(approachNotes, timeComplexity, spaceComplexity, val);
                    }}
                    placeholder="e.g. Empty string, single character, all identical characters, alternating pattern..."
                    rows={3}
                    className={`w-full p-3 rounded-xl text-xs font-mono border outline-none leading-relaxed resize-y ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400'
                        : 'bg-slate-900 border-slate-800 text-slate-100 placeholder:text-slate-600'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* 3. INTERVIEWER GUIDANCE MILESTONES VIEW */}
            {(leftTab === 'guidance' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'guidance')) && (
              <div className="space-y-4 max-w-2xl mx-auto w-full" data-testid="interviewer-guidance-container">
                <div>
                  <h3 className={`text-sm font-black flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    <ListChecks className="w-4 h-4 text-cyan-400" />
                    Simulated Interviewer Milestones
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Check off each communication milestone as you progress through this problem to mirror top-tier onsite evaluation.
                  </p>
                </div>

                <div className="space-y-3">
                  {INTERVIEW_GUIDANCE_MILESTONES.map((m) => {
                    const isChecked = guidanceCompleted.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        onClick={() => handleToggleGuidance(m.id)}
                        data-testid={`guidance-item-${m.id}`}
                        className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                          isChecked
                            ? isLight
                              ? 'bg-emerald-50/70 border-emerald-300'
                              : 'bg-emerald-950/20 border-emerald-800/40'
                            : isLight
                            ? 'bg-white border-slate-200 hover:border-slate-300'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <button
                          type="button"
                          className={`mt-0.5 shrink-0 ${isChecked ? 'text-emerald-500' : 'text-slate-400'}`}
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
            )}
          </div>
        </div>

        {/* RIGHT PANEL: CODE EDITOR & CONSOLE */}
        <div
          className={`lg:w-1/2 flex flex-col ${
            mobileTab === 'editor' || mobileTab === 'console' ? 'flex' : 'hidden lg:flex'
          } ${isLight ? 'bg-white' : 'bg-slate-900'}`}
        >
          {/* Editor Header Bar */}
          <div
            className={`px-4 py-2 border-b flex items-center justify-between shrink-0 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as InterviewLanguage)}
                className={`text-xs font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-800'
                    : 'bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="typescript">TypeScript</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowResetConfirm(true)}
                title="Reset to starter template"
                className={`p-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div className="flex-1 relative overflow-hidden min-h-[220px]">
            <Editor
              height="100%"
              language={monacoLang}
              theme={isLight ? 'light' : 'vs-dark'}
              value={currentCode}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                fontSize: 13,
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                renderWhitespace: 'none',
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
              }}
            />
          </div>

          {/* Execution Output Console */}
          {executionOutput && (
            <div
              data-testid="execution-console-output"
              className={`max-h-52 border-t overflow-y-auto p-3.5 font-mono text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-[11px]">
                    {executionOutput.isSubmit ? 'Submission Verdict' : 'Run Output'}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  {executionOutput.runtimeMs !== undefined && (
                    <span className="text-slate-400 text-[11px]">{executionOutput.runtimeMs}ms</span>
                  )}
                  <span
                    className={`font-black px-2 py-0.5 rounded text-[11px] ${
                      executionOutput.status === 'Accepted' || executionOutput.status === 'passed'
                        ? 'bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-500 dark:text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {executionOutput.status}
                  </span>
                </div>
              </div>

              {executionOutput.totalTestcases !== undefined && executionOutput.totalTestcases > 0 && (
                <div className="text-slate-500 dark:text-slate-400 mb-1 text-[11px]">
                  Testcases: <strong>{executionOutput.passedTestcases}</strong> / <strong>{executionOutput.totalTestcases}</strong> Passed
                </div>
              )}

              {executionOutput.stdout && (
                <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono text-xs mt-1">
                  {executionOutput.stdout}
                </pre>
              )}
              {executionOutput.stderr && (
                <pre className="text-rose-500 dark:text-rose-400 whitespace-pre-wrap font-mono text-xs mt-1">
                  {executionOutput.stderr}
                </pre>
              )}
            </div>
          )}

          {/* Bottom Action Controls Bar */}
          <footer
            className={`px-4 py-3 border-t flex items-center justify-between shrink-0 gap-3 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>
                Elapsed: <strong>{formatTime(elapsedSeconds)}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={handleRunCode}
                disabled={isRunning || isSubmitting || isPaused}
                data-testid="run-code-btn"
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  isRunning
                    ? 'opacity-60 cursor-not-allowed'
                    : isLight
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
              >
                {isRunning ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Run Code</span>
              </button>

              <button
                onClick={handleSubmitCode}
                disabled={isRunning || isSubmitting || isPaused}
                data-testid="submit-code-btn"
                className={`px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                  isSubmitting
                    ? 'opacity-60 cursor-not-allowed bg-emerald-600 text-white'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                }`}
              >
                {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Submit Solution</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* CONFIRM FINISH MODAL */}
      <AnimatePresence>
        {showFinishConfirm && (
          <div
            data-testid="finish-confirm-modal"
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border shadow-2xl space-y-4 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-500">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Finish Interview Round?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Remaining time: {formatTime(remainingSeconds)}
                  </p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Are you ready to submit your code and generate your performance scorecard? All completed problems and thinking notes will be evaluated immediately.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setShowFinishConfirm(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'border-slate-300 text-slate-700' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Continue Interview
                </button>
                <button
                  onClick={() => {
                    setShowFinishConfirm(false);
                    onFinishInterview('completed');
                  }}
                  data-testid="confirm-finish-btn"
                  className="px-5 py-2 rounded-xl text-xs font-black bg-rose-500 hover:bg-rose-400 text-white shadow-md shadow-rose-500/20"
                >
                  Finish & Generate Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONFIRM RESET MODAL */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`max-w-md w-full p-6 rounded-3xl border shadow-2xl space-y-4 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-500">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Reset Code to Template?
                  </h3>
                  <p className="text-xs text-slate-500">Problem {activeIndex + 1}</p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Your current code for this problem will be cleared and replaced with the clean starter template.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'border-slate-300 text-slate-700' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetCode}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-slate-950"
                >
                  Confirm Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
