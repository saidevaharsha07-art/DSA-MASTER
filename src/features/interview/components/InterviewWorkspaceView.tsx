'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Play,
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
  const [mobileTab, setMobileTab] = useState<'problem' | 'editor'>('editor');

  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const expires = new Date(session.expiresAt).getTime();
    const now = Date.now();
    return Math.max(0, Math.round((expires - now) / 1000));
  });

  const [currentCode, setCurrentCode] = useState<string>(
    session.problems[0]?.userCode || session.problems[0]?.starterCode || ''
  );
  const [currentLanguage, setCurrentLanguage] = useState<InterviewLanguage>(
    session.problems[0]?.language || session.config.language || 'javascript'
  );

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

  // Sync code state when switching active problem
  useEffect(() => {
    const prob = session.problems[activeIndex];
    if (prob) {
      setCurrentCode(prob.userCode);
      setCurrentLanguage(prob.language || session.config.language);
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

  // Real countdown timer with safe auto-expiration
  useEffect(() => {
    const interval = setInterval(() => {
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
  }, [onFinishInterview]);

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

  // Handle Code Change
  const handleCodeChange = (newCode: string | undefined) => {
    const val = newCode || '';
    setCurrentCode(val);
    InterviewArenaService.updateProblemCode(session.id, activeIndex, val, currentLanguage);
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

  // Handle Run Code (Sample testcases)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return;
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
    if (isRunning || isSubmitting) return;
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

  const passedCount = session.problems.filter((p) => p.status === 'passed').length;

  // Map language to Monaco language mode
  const monacoLang =
    currentLanguage === 'cpp'
      ? 'cpp'
      : currentLanguage === 'python'
      ? 'python'
      : currentLanguage === 'java'
      ? 'java'
      : 'javascript';

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)] max-w-full mx-auto overflow-hidden rounded-2xl border shadow-xl border-slate-200 dark:border-slate-800">
      {/* 1. TOP HEADER & TIMER BAR */}
      <header
        className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-3 shrink-0 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}
      >
        {/* Left: Branding & Config Metadata */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className={`font-black text-xs sm:text-sm tracking-wide ${isLight ? 'text-slate-900' : 'text-white'}`}>
              INTERVIEW ARENA
            </h2>
          </div>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            {session.config.type}
          </span>
          <span className="hidden md:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-500 dark:text-amber-400 border border-amber-500/20">
            {session.config.difficulty}
          </span>
        </div>

        {/* Middle: Problem Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full">
          {session.problems.map((p, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={p.problemId}
                onClick={() => setActiveIndex(idx)}
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

        {/* Right: Real Countdown Timer & Finish Button */}
        <div className="flex items-center gap-2.5">
          <div
            className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 font-mono font-black text-xs sm:text-sm tracking-wider transition-all ${
              timerState === 'critical'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse ring-2 ring-rose-500/30'
                : timerState === 'warning'
                ? 'bg-amber-500/20 text-amber-500 dark:text-amber-400 border-amber-500/40'
                : isLight
                ? 'bg-slate-100 text-slate-800 border-slate-200'
                : 'bg-slate-800/80 text-cyan-400 border-slate-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{formatTime(remainingSeconds)}</span>
          </div>

          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-500 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all shrink-0"
          >
            Finish
          </button>
        </div>
      </header>

      {/* MOBILE TAB CONTROLS (<1024px) */}
      <div className="flex lg:hidden border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shrink-0">
        <button
          onClick={() => setMobileTab('problem')}
          className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all ${
            mobileTab === 'problem'
              ? 'border-cyan-500 text-cyan-500 dark:text-cyan-400 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Problem Specs
          </span>
        </button>
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2 text-xs font-bold text-center border-b-2 transition-all ${
            mobileTab === 'editor'
              ? 'border-cyan-500 text-cyan-500 dark:text-cyan-400 bg-white dark:bg-slate-950'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            Editor & Console
          </span>
        </button>
      </div>

      {/* 2. MAIN SPLIT WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL: PROBLEM STATEMENT & SPECS */}
        <div
          className={`lg:w-1/2 flex flex-col border-b lg:border-b-0 lg:border-r overflow-y-auto ${
            mobileTab === 'problem' ? 'flex' : 'hidden lg:flex'
          } ${isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'}`}
        >
          <div className="p-5 sm:p-6 space-y-6 max-w-2xl mx-auto w-full">
            {/* Title & Metadata */}
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
                <span className="text-slate-500 dark:text-slate-400 font-medium">{currentProblem.pattern}</span>
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
                  onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-1.5 text-xs font-bold text-amber-500 dark:text-amber-400 hover:underline transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  {showHints ? 'Hide Hints' : 'Need a hint?'}
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
        </div>

        {/* RIGHT PANEL: CODE EDITOR & EXECUTION CONSOLE */}
        <div
          className={`lg:w-1/2 flex flex-col ${
            mobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
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

          {/* Monaco Editor Container with Textarea Fallback */}
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
              className={`max-h-48 border-t overflow-y-auto p-3.5 font-mono text-xs ${
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

          {/* Bottom Controls Bar */}
          <footer
            className={`px-4 py-3 border-t flex items-center justify-between shrink-0 gap-3 ${
              isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-slate-800'
            }`}
          >
            {/* Prev / Next navigation */}
            <div className="flex items-center gap-2">
              <button
                disabled={activeIndex === 0}
                onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                className={`p-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Previous problem"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={activeIndex === session.problems.length - 1}
                onClick={() => setActiveIndex((prev) => Math.min(session.problems.length - 1, prev + 1))}
                className={`p-2 rounded-xl text-xs font-bold border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-200'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Next problem"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Run & Submit Actions */}
            <div className="flex items-center gap-2.5">
              <button
                disabled={isRunning || isSubmitting}
                onClick={handleRunCode}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                }`}
              >
                {isRunning ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                ) : (
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                )}
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>

              <button
                disabled={isRunning || isSubmitting}
                onClick={handleSubmitCode}
                className="px-5 py-2 rounded-xl text-xs font-black bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/20 flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-950" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{isSubmitting ? 'Evaluating...' : 'Submit'}</span>
              </button>
            </div>
          </footer>
        </div>
      </div>

      {/* RESET CODE CONFIRMATION MODAL */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm p-5 rounded-2xl border shadow-2xl space-y-4 ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              <div className="space-y-1.5">
                <h3 className="text-base font-bold flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  Reset Code Template?
                </h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  This will revert the current editor code back to the default starter template for {currentProblem.title}.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border ${
                    isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetCode}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
                >
                  Reset Code
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FINISH INTERVIEW CONFIRMATION MODAL */}
      <AnimatePresence>
        {showFinishConfirm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-md p-6 rounded-2xl border shadow-2xl space-y-5 ${
                isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
              }`}
            >
              <div className="space-y-2">
                <h3 className="text-lg font-black flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  Finish Interview Session?
                </h3>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  You have completed <strong>{passedCount} of {session.problems.length}</strong> problems with{' '}
                  <strong>{formatTime(remainingSeconds)}</strong> remaining on the clock.
                  Finishing now will calculate your final evaluation scorecard and diagnostic report.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowFinishConfirm(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                    isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                >
                  Continue Interview
                </button>
                <button
                  onClick={() => {
                    setShowFinishConfirm(false);
                    onFinishInterview('completed');
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-black bg-rose-500 text-white hover:bg-rose-400 transition-all shadow-md shadow-rose-500/20"
                >
                  Yes, Finish & Generate Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

