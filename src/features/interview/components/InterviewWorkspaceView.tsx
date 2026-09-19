'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FileText,
  Brain,
  ListChecks,
  Code2,
  Terminal,
  Play,
  Send,
  RotateCcw,
  Lightbulb,
  Eye,
  EyeOff,
  Pause,
  AlertTriangle,
  Loader2,
  Check,
} from 'lucide-react';
import {
  InterviewArenaSession,
  InterviewLanguage,
  InterviewArenaProblemAttempt,
} from '../types/interview.types';
import { InterviewArenaService } from '../services/interview-arena.service';
import { TemplateService } from '@/src/problems/services/template.service';
import { InterviewWorkspaceHeader } from './InterviewWorkspaceHeader';
import { InterviewThinkingPanel } from './InterviewThinkingPanel';
import { InterviewerChecklist } from './InterviewerChecklist';

// Dynamically import Monaco Editor
const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex flex-col items-center justify-center text-xs text-slate-400 gap-2 bg-slate-950 font-mono">
      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
      <span>Loading Code Editor...</span>
    </div>
  ),
});

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

  // Format Time MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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
      {/* 1. TOP RESTRAINED INTERVIEW HEADER */}
      <InterviewWorkspaceHeader
        isLight={isLight}
        session={session}
        activeIndex={activeIndex}
        onSelectProblem={setActiveIndex}
        remainingSeconds={remainingSeconds}
        isPaused={isPaused}
        onTogglePause={handleTogglePause}
        onOpenFinishModal={() => setShowFinishConfirm(true)}
      />

      {/* MOBILE TAB CONTROLS (<1024px) */}
      <div className="flex lg:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shrink-0 text-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setMobileTab('specs')}
          className={`px-3 py-2 font-mono font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'specs'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Problem Specs
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('thinking')}
          className={`px-3 py-2 font-mono font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'thinking'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Approach & Notes
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('guidance')}
          className={`px-3 py-2 font-mono font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'guidance'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Guidance ({guidanceCompleted.length}/5)
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('editor')}
          className={`px-3 py-2 font-mono font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'editor'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Code Editor
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('console')}
          className={`px-3 py-2 font-mono font-bold border-b-2 whitespace-nowrap ${
            mobileTab === 'console'
              ? 'border-cyan-500 text-cyan-500 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500'
          }`}
        >
          Console
        </button>
      </div>

      {/* 2. TWO-PANE INTERVIEW WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* PAUSED OVERLAY IF PAUSED (PREVENTS CHEATING) */}
        {isPaused && (
          <div
            data-testid="interview-paused-overlay"
            className="absolute inset-0 z-40 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 select-none"
          >
            <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Pause className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white font-mono tracking-wide">Interview Paused</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              The clock and code editor are suspended. Resume when you are ready to continue under exam conditions.
            </p>
            <button
              type="button"
              onClick={handleTogglePause}
              data-testid="resume-overlay-btn"
              className="px-6 py-2.5 rounded-xl font-mono font-bold text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Interview</span>
            </button>
          </div>
        )}

        {/* LEFT PANE: PROBLEM STATEMENT / THINKING / GUIDANCE */}
        <div
          className={`lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r overflow-hidden ${
            mobileTab === 'specs' || mobileTab === 'thinking' || mobileTab === 'guidance'
              ? 'flex'
              : 'hidden lg:flex'
          } ${isLight ? 'bg-slate-50/60 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'}`}
        >
          {/* Sub-Header Tabs (Desktop) */}
          <div
            className={`hidden lg:flex px-4 py-2 border-b items-center justify-between shrink-0 ${
              isLight ? 'bg-white border-slate-200' : 'bg-slate-900/70 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                type="button"
                onClick={() => setLeftTab('specs')}
                data-testid="tab-specs"
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
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
                type="button"
                onClick={() => setLeftTab('thinking')}
                data-testid="tab-thinking"
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
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
                type="button"
                onClick={() => setLeftTab('guidance')}
                data-testid="tab-guidance"
                className={`px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center gap-1.5 ${
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
              <span className="text-[10px] text-emerald-400 font-bold font-mono flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved
              </span>
            )}
          </div>

          {/* LEFT CONTENT CONTAINER */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
            {/* 1. PROBLEM SPECS VIEW */}
            {(leftTab === 'specs' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'specs')) && (
              <div className="space-y-5 max-w-2xl mx-auto w-full">
                {/* Problem Header with Pattern Concealment */}
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
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
                        <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1">
                          <EyeOff className="w-3 h-3" />
                          Pattern Concealed
                        </span>
                        <button
                          type="button"
                          onClick={handleRevealPattern}
                          data-testid="reveal-pattern-btn"
                          className="text-[11px] font-bold text-amber-500 hover:underline"
                        >
                          Need a hint?
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

                {/* Problem Description */}
                <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-normal ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {currentProblem.description}
                </div>

                {/* Examples */}
                {currentProblem.examples && currentProblem.examples.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
                      Examples
                    </h4>
                    {currentProblem.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs font-mono space-y-1 ${
                          isLight ? 'bg-white border-slate-200/80 shadow-sm' : 'bg-slate-900/70 border-slate-800'
                        }`}
                      >
                        <div>
                          <span className="text-cyan-500 dark:text-cyan-400 font-bold">Input:</span> {ex.input}
                        </div>
                        <div>
                          <span className="text-emerald-500 dark:text-emerald-400 font-bold">Output:</span> {ex.output}
                        </div>
                        {ex.explanation && (
                          <div className="text-slate-500 dark:text-slate-400 font-sans text-xs pt-0.5">
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
                    <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-700' : 'text-slate-400'}`}>
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
                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => {
                        setShowHints(!showHints);
                        if (!showHints) {
                          InterviewArenaService.recordHintUsed(session.id, activeIndex, userId);
                        }
                      }}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>{showHints ? 'Hide Hints' : 'Request Interviewer Hint'}</span>
                    </button>
                    {showHints && (
                      <div
                        className={`mt-2 p-3 rounded-xl border text-xs leading-relaxed space-y-1 ${
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

            {/* 2. APPROACH & NOTES (THINKING PHASE) */}
            {(leftTab === 'thinking' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'thinking')) && (
              <InterviewThinkingPanel
                isLight={isLight}
                approachNotes={approachNotes}
                onApproachNotesChange={(val) => {
                  setApproachNotes(val);
                  handleSaveNotes(val, timeComplexity, spaceComplexity, edgeCases);
                }}
                timeComplexity={timeComplexity}
                onTimeComplexityChange={(val) => {
                  setTimeComplexity(val);
                  handleSaveNotes(approachNotes, val, spaceComplexity, edgeCases);
                }}
                spaceComplexity={spaceComplexity}
                onSpaceComplexityChange={(val) => {
                  setSpaceComplexity(val);
                  handleSaveNotes(approachNotes, timeComplexity, val, edgeCases);
                }}
                edgeCases={edgeCases}
                onEdgeCasesChange={(val) => {
                  setEdgeCases(val);
                  handleSaveNotes(approachNotes, timeComplexity, spaceComplexity, val);
                }}
                notesSavedIndicator={notesSavedIndicator}
              />
            )}

            {/* 3. INTERVIEWER GUIDANCE CHECKLIST */}
            {(leftTab === 'guidance' || (typeof window !== 'undefined' && window.innerWidth < 1024 && mobileTab === 'guidance')) && (
              <InterviewerChecklist
                isLight={isLight}
                guidanceCompleted={guidanceCompleted}
                onToggleGuidance={handleToggleGuidance}
              />
            )}
          </div>
        </div>

        {/* RIGHT PANE: CODE EDITOR & CONSOLE OUTPUT */}
        <div
          className={`lg:w-1/2 flex flex-col ${
            mobileTab === 'editor' || mobileTab === 'console' ? 'flex' : 'hidden lg:flex'
          } ${isLight ? 'bg-white' : 'bg-slate-900'}`}
        >
          {/* Editor Sub-Header Bar */}
          <div
            className={`px-4 py-2 border-b flex items-center justify-between shrink-0 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value as InterviewLanguage)}
                className={`text-xs font-mono font-bold rounded-lg px-2.5 py-1 border outline-none cursor-pointer ${
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

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              title="Reset code to clean starter template"
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors flex items-center gap-1 ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Monaco Editor */}
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

          {/* Execution Output Console (Bottom) */}
          {executionOutput && (
            <div
              data-testid="execution-console-output"
              className={`max-h-48 border-t overflow-y-auto p-3 font-mono text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-[11px]">
                    {executionOutput.isSubmit ? 'Submission Verdict' : 'Run Output'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
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

          {/* Bottom Actions Bar */}
          <footer
            className={`px-4 py-2.5 border-t flex items-center justify-between shrink-0 gap-3 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span>Elapsed: <strong>{formatTime(elapsedSeconds)}</strong></span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning || isSubmitting || isPaused}
                data-testid="run-code-btn"
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
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
                type="button"
                onClick={handleSubmitCode}
                disabled={isRunning || isSubmitting || isPaused}
                data-testid="submit-code-btn"
                className={`px-5 py-2 rounded-xl text-xs font-mono font-black transition-all flex items-center gap-1.5 ${
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
              className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl space-y-4 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-500">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Finish Interview Round?
                  </h3>
                  <p className="text-xs font-mono text-slate-500">
                    Remaining time: {formatTime(remainingSeconds)}
                  </p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Are you ready to submit your solutions and generate your performance scorecard? Completed problems and approach notes will be evaluated immediately.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowFinishConfirm(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'border-slate-300 text-slate-700' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Continue Interview
                </button>
                <button
                  type="button"
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
              className={`max-w-md w-full p-6 rounded-2xl border shadow-2xl space-y-4 ${
                isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-500">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className={`font-black text-base ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Reset Code to Template?
                  </h3>
                  <p className="text-xs font-mono text-slate-500">Problem {activeIndex + 1}</p>
                </div>
              </div>

              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Your current code for this problem will be cleared and replaced with the clean starter template.
              </p>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'border-slate-300 text-slate-700' : 'border-slate-700 text-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
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
