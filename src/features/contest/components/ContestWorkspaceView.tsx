'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  Clock,
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ChevronRight,
  Code2,
  Terminal,
  Send,
  HelpCircle,
  Trophy,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import {
  ContestSession,
  ContestProblemSummary,
  ContestProblemStatus,
} from '../types/contest.types';

// Dynamic Monaco Editor to support SSR
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[var(--surface)] text-[var(--text-muted)] text-xs">
      Loading Monaco Editor...
    </div>
  ),
});

interface ContestWorkspaceViewProps {
  session: ContestSession;
  onUpdateTelemetry: (problemId: string, update: any) => void;
  onRecordSubmission: (
    problemId: string,
    language: string,
    code: string,
    verdict: string,
    passedCases: number,
    totalCases: number
  ) => void;
  onFinishContest: () => void;
}

export function ContestWorkspaceView({
  session,
  onUpdateTelemetry,
  onRecordSubmission,
  onFinishContest,
}: ContestWorkspaceViewProps) {
  const { settings } = useSettings();
  const { toast } = useToast();
  const isLight = settings.appearance.theme === 'light';

  const [currentProblemIdx, setCurrentProblemIdx] = useState(0);
  const [activeMobileTab, setActiveMobileTab] = useState<'problem' | 'editor'>('problem');
  const [language, setLanguage] = useState<string>('javascript');
  const [codeMap, setCodeMap] = useState<Record<string, Record<string, string>>>({});
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<{
    type: 'run' | 'submit' | 'idle';
    status?: string;
    passed?: number;
    total?: number;
    stdout?: string;
    error?: string;
    executionTimeMs?: number;
  }>({ type: 'idle' });
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);

  // Authoritative Timer Countdown
  const [remainingSeconds, setRemainingSeconds] = useState<number>(() => {
    const diff = Math.max(0, Math.floor((session.endsAt - Date.now()) / 1000));
    return diff;
  });

  const hasExpiredRef = useRef(false);

  // Initialize code map from problems
  useEffect(() => {
    const initial: Record<string, Record<string, string>> = {};
    session.problems.forEach((p) => {
      const tel = session.telemetry[p.id];
      initial[p.id] = tel?.lastCode || { ...p.initialCode };
    });
    setCodeMap(initial);
  }, [session]);

  const currentProblem: ContestProblemSummary | undefined = session.problems[currentProblemIdx];
  const currentCode = currentProblem ? (codeMap[currentProblem.id]?.[language] || currentProblem.initialCode[language] || '') : '';

  // Timer Interval
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.max(0, Math.floor((session.endsAt - Date.now()) / 1000));
      setRemainingSeconds(diff);

      if (diff <= 0 && !hasExpiredRef.current) {
        hasExpiredRef.current = true;
        clearInterval(interval);
        toast('Contest time has expired! Finalizing your scorecard...', 'info');
        onFinishContest();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session.endsAt, onFinishContest, toast]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isWarning = remainingSeconds < 600 && remainingSeconds >= 120; // < 10 mins
  const isCritical = remainingSeconds < 120; // < 2 mins

  const handleCodeChange = (newCode: string | undefined) => {
    if (!currentProblem || newCode === undefined) return;
    setCodeMap((prev) => ({
      ...prev,
      [currentProblem.id]: {
        ...(prev[currentProblem.id] || {}),
        [language]: newCode,
      },
    }));

    onUpdateTelemetry(currentProblem.id, {
      firstCodeChangeAt: Date.now(),
      lastCode: {
        ...(codeMap[currentProblem.id] || {}),
        [language]: newCode,
      },
      lastLanguage: language,
    });
  };

  // Run Code
  const handleRunCode = async () => {
    if (!currentProblem || running || submitting) return;
    setRunning(true);
    setConsoleOutput({ type: 'run', status: 'Executing on sandboxed judge runner...' });

    onUpdateTelemetry(currentProblem.id, {
      runCount: (session.telemetry[currentProblem.id]?.runCount || 0) + 1,
    });

    try {
      const firstTestCase = currentProblem.testCases[0] || {
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
      };

      const response = await fetch('/api/judge/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentCode,
          language,
          input: firstTestCase.input,
          expectedOutput: firstTestCase.expectedOutput,
        }),
      });

      const result = await response.json();

      setConsoleOutput({
        type: 'run',
        status: result.status || 'Execution Finished',
        passed: result.passed ? 1 : 0,
        total: 1,
        stdout: result.output || result.stdout || '(no stdout)',
        error: result.error || result.stderr,
        executionTimeMs: result.runtimeMs,
      });
    } catch (err: any) {
      setConsoleOutput({
        type: 'run',
        status: 'runtime_error',
        error: err.message || 'Execution error',
      });
    } finally {
      setRunning(false);
    }
  };

  // Submit Code
  const handleSubmitCode = async () => {
    if (!currentProblem || submitting || running) return;
    if (remainingSeconds <= 0) {
      toast('Contest has ended. Submissions are closed.', 'error');
      return;
    }

    setSubmitting(true);
    setConsoleOutput({ type: 'submit', status: 'Running all contest judge testcases...' });

    try {
      const response = await fetch('/api/judge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemId: currentProblem.id,
          code: currentCode,
          language,
          userId: session.userId,
        }),
      });

      const result = await response.json();

      const passed = result.testcasesPassed ?? result.passedTestcases ?? (result.verdict === 'Accepted' ? currentProblem.testCases.length : 0);
      const total = result.totalTestcases || currentProblem.testCases.length || 3;
      const isAccepted = result.verdict === 'Accepted' || (passed > 0 && passed === total);
      const verdict = isAccepted ? 'Accepted' : result.verdict || 'Wrong Answer';

      setConsoleOutput({
        type: 'submit',
        status: verdict,
        passed,
        total,
        stdout: result.stdout,
        error: result.errorLog || result.stderr,
        executionTimeMs: result.runtimeMs,
      });

      onRecordSubmission(currentProblem.id, language, currentCode, verdict, passed, total);

      if (isAccepted) {
        toast(`Problem "${currentProblem.title}" Accepted! (+100 Pts)`, 'success');
      } else {
        toast(`Submission received: ${verdict}. (+20m penalty on future solve)`, 'error');
      }
    } catch (err: any) {
      setConsoleOutput({
        type: 'submit',
        status: 'Submission Error',
        error: err.message || 'Failed to submit',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 pb-12">
      {/* ── 1. TOP CONTEST STATUS BAR ──────────────────────────────── */}
      <div
        className="rounded-2xl p-4 sm:px-6 border flex items-center justify-between flex-wrap gap-4"
        style={{
          background: 'var(--card)',
          borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Contest Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-pink-500/10 text-pink-500 font-bold">
            <Trophy size={18} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-[var(--text-primary)]">
              {session.config.title}
            </h2>
            <span className="text-[11px] text-[var(--text-secondary)]">
              {session.config.difficultyMix} • {session.problems.length} Problems
            </span>
          </div>
        </div>

        {/* Live Score & Metrics */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-center">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Score</span>
            <span className="text-sm sm:text-base font-black text-pink-500">{session.score} Pts</span>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Solved</span>
            <span className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
              {session.solvedCount}/{session.problems.length}
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase block">Penalty</span>
            <span className="text-sm sm:text-base font-mono text-[var(--text-secondary)]">{session.penaltyMinutes}m</span>
          </div>

          {/* Authoritative Timer */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-black text-sm sm:text-base"
            style={{
              background: isCritical
                ? 'rgba(239, 68, 68, 0.15)'
                : isWarning
                ? 'rgba(245, 158, 11, 0.15)'
                : 'var(--surface)',
              color: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : 'var(--text-primary)',
              borderColor: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : 'var(--border)',
            }}
          >
            <Clock size={16} className={isCritical ? 'animate-pulse' : ''} />
            {formatTimer(remainingSeconds)}
          </div>

          <button
            onClick={() => setShowFinishConfirm(true)}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white transition-colors cursor-pointer"
          >
            Finish Contest
          </button>
        </div>
      </div>

      {/* ── 2. MOBILE TAB SELECTOR (< 1024px) ──────────────────────── */}
      <div className="flex lg:hidden rounded-xl bg-[var(--surface)] p-1 border border-[var(--border)]">
        <button
          onClick={() => setActiveMobileTab('problem')}
          className="flex-1 py-2 rounded-lg text-xs font-bold transition-all text-center"
          style={{
            background: activeMobileTab === 'problem' ? 'var(--card)' : 'transparent',
            color: activeMobileTab === 'problem' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          Problem Specs
        </button>
        <button
          onClick={() => setActiveMobileTab('editor')}
          className="flex-1 py-2 rounded-lg text-xs font-bold transition-all text-center"
          style={{
            background: activeMobileTab === 'editor' ? 'var(--card)' : 'transparent',
            color: activeMobileTab === 'editor' ? 'var(--text-primary)' : 'var(--text-muted)',
          }}
        >
          Editor & Console
        </button>
      </div>

      {/* ── 3. WORKSPACE SPLIT CONTAINER ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* ── LEFT PANE: PROBLEM STATEMENT & TABS (5 Cols on Desktop) ─ */}
        <div
          className={`lg:col-span-5 flex flex-col gap-4 ${
            activeMobileTab === 'editor' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Problem Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {session.problems.map((p, idx) => {
              const status: ContestProblemStatus = session.problemStatuses[p.id] || 'unattempted';
              const isSelected = idx === currentProblemIdx;

              const statusColor =
                status === 'solved' ? '#10B981' : status === 'attempted' ? '#F59E0B' : 'var(--text-muted)';

              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentProblemIdx(idx)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
                  style={{
                    background: isSelected ? 'var(--surface-active, rgba(236,72,153,0.1))' : 'var(--card)',
                    borderColor: isSelected ? '#EC4899' : 'var(--border)',
                    color: isSelected ? '#EC4899' : 'var(--text-primary)',
                  }}
                >
                  <span>P{idx + 1}</span>
                  {status === 'solved' ? (
                    <CheckCircle2 size={13} className="text-emerald-500" />
                  ) : status === 'attempted' ? (
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Problem Statement Card */}
          {currentProblem && (
            <div
              className="rounded-2xl p-6 border flex flex-col gap-5 max-h-[750px] overflow-y-auto"
              style={{
                background: 'var(--card)',
                borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
              }}
            >
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">
                  {currentProblemIdx + 1}. {currentProblem.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-bold"
                    style={{
                      background:
                        currentProblem.difficulty === 'Easy'
                          ? '#10B98122'
                          : currentProblem.difficulty === 'Hard'
                          ? '#EF444422'
                          : '#F59E0B22',
                      color:
                        currentProblem.difficulty === 'Easy'
                          ? '#10B981'
                          : currentProblem.difficulty === 'Hard'
                          ? '#EF4444'
                          : '#F59E0B',
                    }}
                  >
                    {currentProblem.difficulty}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--text-secondary)] px-2 py-0.5 rounded bg-[var(--surface)]">
                    {currentProblem.topic}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                {currentProblem.description}
              </div>

              {/* Examples */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  Examples
                </span>
                {currentProblem.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-xs font-mono flex flex-col gap-1.5"
                  >
                    <div>
                      <strong className="text-[var(--text-muted)] font-sans">Input: </strong>
                      <span className="text-[var(--text-primary)]">{ex.input}</span>
                    </div>
                    <div>
                      <strong className="text-[var(--text-muted)] font-sans">Output: </strong>
                      <span className="text-pink-500 font-bold">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div className="text-[11px] text-[var(--text-secondary)] font-sans mt-1">
                        {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              {currentProblem.constraints.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                    Constraints
                  </span>
                  <ul className="list-disc list-inside text-xs text-[var(--text-secondary)] space-y-1 font-mono">
                    {currentProblem.constraints.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── RIGHT PANE: CODE EDITOR & CONSOLE (7 Cols on Desktop) ── */}
        <div
          className={`lg:col-span-7 flex flex-col gap-3 ${
            activeMobileTab === 'problem' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Editor Header */}
          <div
            className="rounded-t-2xl p-3 px-4 border border-b-0 flex items-center justify-between flex-wrap gap-2"
            style={{
              background: 'var(--card)',
              borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-pink-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[var(--surface)] text-[var(--text-primary)] text-xs font-bold px-2.5 py-1.5 rounded-lg border border-[var(--border)] focus:outline-none"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunCode}
                disabled={running || submitting}
                className="px-4 py-1.5 rounded-lg text-xs font-bold border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play size={13} className="text-emerald-500" />
                {running ? 'Running...' : 'Run'}
              </button>

              <button
                onClick={handleSubmitCode}
                disabled={submitting || running || remainingSeconds <= 0}
                className="px-5 py-1.5 rounded-lg text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shadow-md"
              >
                <Send size={13} />
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>

          {/* Monaco Editor Container */}
          <div
            className="h-[420px] sm:h-[480px] w-full border overflow-hidden"
            style={{
              borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <MonacoEditor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language === 'python' ? 'python' : 'javascript'}
              theme={isLight ? 'light' : 'vs-dark'}
              value={currentCode}
              onChange={handleCodeChange}
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: 'on',
                automaticLayout: true,
                tabSize: 2,
              }}
            />
          </div>

          {/* Execution Output Console */}
          <div
            className="rounded-b-2xl p-4 border border-t-0 flex flex-col gap-2 min-h-[140px]"
            style={{
              background: 'var(--card)',
              borderColor: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
            }}
          >
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] border-b border-[var(--border)] pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} /> Execution Console
              </span>
              {consoleOutput.executionTimeMs && (
                <span>{consoleOutput.executionTimeMs}ms</span>
              )}
            </div>

            {consoleOutput.type === 'idle' ? (
              <span className="text-xs text-[var(--text-muted)] italic py-2">
                Click Run to test locally or Submit to validate against contest testcases.
              </span>
            ) : (
              <div className="flex flex-col gap-1.5 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[var(--text-primary)]">Verdict:</span>
                  <span
                    className={`font-bold ${
                      consoleOutput.status === 'Accepted'
                        ? 'text-emerald-500'
                        : 'text-amber-500'
                    }`}
                  >
                    {consoleOutput.status}
                  </span>
                  {consoleOutput.passed !== undefined && (
                    <span className="text-[var(--text-muted)]">
                      ({consoleOutput.passed}/{consoleOutput.total} testcases passed)
                    </span>
                  )}
                </div>

                {consoleOutput.stdout && (
                  <div className="p-2 rounded bg-[var(--surface)] text-[var(--text-secondary)] whitespace-pre-wrap">
                    {consoleOutput.stdout}
                  </div>
                )}

                {consoleOutput.error && (
                  <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 whitespace-pre-wrap">
                    {consoleOutput.error}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── FINISH CONTEST CONFIRMATION MODAL ──────────────────────── */}
      {showFinishConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="w-full max-w-md rounded-2xl p-6 border flex flex-col gap-4 shadow-2xl"
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <h4 className="text-lg font-bold text-[var(--text-primary)]">
              Finish Contest Early?
            </h4>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Are you sure you want to finish now? Your current score ({session.score} Pts) and penalty ({session.penaltyMinutes}m) will be locked and finalized into your permanent record.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowFinishConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold border bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                Keep Solving
              </button>
              <button
                onClick={() => {
                  setShowFinishConfirm(false);
                  onFinishContest();
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-pink-600 hover:bg-pink-700 text-white transition-colors cursor-pointer"
              >
                Yes, Finalize Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
