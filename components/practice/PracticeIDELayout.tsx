'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ProblemModel } from '@/src/curriculum/types';
import { PracticeIDENavbar } from './PracticeIDENavbar';
import { ProblemDescriptionPanel } from './ProblemDescriptionPanel';
import { CodeEditorPanel } from './CodeEditorPanel';
import { BottomConsolePanel } from './BottomConsolePanel';
import { PracticeActionBar } from './PracticeActionBar';
import { ThinkingPhaseModal } from './ThinkingPhaseModal';
import { SubmissionResultModal } from './SubmissionResultModal';
import { getStarterCode, StarterCodeMap } from '@/src/engines/judge/starterCode';
import { judgeEngine, ThinkingPrediction, SubmissionRecord } from '@/src/engines/judge';
import { runCode, submitSolution, cancelActiveExecution, LanguageId } from '@/src/services/judge';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { progressService } from '@/src/services/progress/progress.service';
import { EventBus } from '@/src/core/events/event-bus';
import { getPlatformMeta } from '@/src/curriculum/services';

interface PracticeIDELayoutProps {
  problem: ProblemModel;
}

const STORAGE_WIDTH_KEY = 'dsa_ide_left_panel_width_pct';
const STORAGE_HEIGHT_KEY = 'dsa_ide_console_height_px';

export function PracticeIDELayout({ problem }: PracticeIDELayoutProps) {
  const { toast } = useToast();
  const { settings } = useSettings();
  const { userId } = useActiveUser();

  const isLight = settings?.appearance?.theme === 'light';
  
  // Left Panel Width % (Persisted in localStorage, default 45%)
  const [leftPanelWidthPct, setLeftPanelWidthPct] = useState<number>(45);
  const [isDraggingSplitter, setIsDraggingSplitter] = useState<boolean>(false);

  // Bottom Console Height px (Persisted in localStorage, default 220px)
  const [bottomConsoleHeightPx, setBottomConsoleHeightPx] = useState<number>(220);

  // Bookmark & Like States
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Language & Starter Code State (Default to Python 3 / TypeScript)
  const [language, setLanguage] = useState<string>('python');
  const [code, setCode] = useState<string>(() => {
    const savedDraft = judgeEngine.loadDraft(problem.id, 'python', userId);
    return savedDraft || getStarterCode(problem.title, problem.slug)['python'];
  });

  // Thinking Phase Prediction State
  const [isThinkingModalOpen, setIsThinkingModalOpen] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<ThinkingPrediction | undefined>(undefined);

  // Submission Result Modal State
  const [submissionModal, setSubmissionModal] = useState<{
    isOpen: boolean;
    verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error' | 'Runtime Error';
    runtimeMs: number;
    memoryMb: number;
    xpEarned: number;
    testcasesPassed?: number;
    totalTestcases?: number;
    failedTestcase?: {
      testcaseIndex: number;
      input: string;
      expectedOutput: string;
      actualOutput: string;
      error?: string;
    };
    errorLog?: string;
  }>({
    isOpen: false,
    verdict: 'Accepted',
    runtimeMs: 0,
    memoryMb: 0,
    xpEarned: problem.xp || 50,
  });

  // 7 Console Tabs State
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history'>('testcases');
  const [customInputText, setCustomInputText] = useState<string>('nums = [1,2,3,1]');
  
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'running' | 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
    runtimeMs?: number;
    memoryMb?: number;
    outputDetails?: string;
    compileOutput?: string;
    testcaseResults?: any[];
    totalTestcases?: number;
    passedTestcases?: number;
  }>({ status: 'idle' });

  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Load saved width & height from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const savedWidth = localStorage.getItem(STORAGE_WIDTH_KEY);
      const savedHeight = localStorage.getItem(STORAGE_HEIGHT_KEY);
      if (savedWidth) setLeftPanelWidthPct(Number(savedWidth));
      if (savedHeight) setBottomConsoleHeightPx(Number(savedHeight));
    } catch (e) {
      console.error('Failed to load IDE panel dimensions', e);
    }
  }, []);

  // Update starter code and custom input when problem changes
  useEffect(() => {
    const savedDraft = judgeEngine.loadDraft(problem.id, language, userId);
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      const freshStarter = getStarterCode(problem.title, problem.slug)[language as keyof StarterCodeMap] || getStarterCode(problem.title, problem.slug)['python'];
      setCode(freshStarter);
    }
  }, [problem.id, problem.slug, language, userId]);

  // Language switch handler with draft preservation
  const handleLanguageChange = (newLang: string) => {
    judgeEngine.saveDraft(problem.id, language, code, userId);
    setLanguage(newLang);
    const savedDraft = judgeEngine.loadDraft(problem.id, newLang, userId);
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      const freshStarter = getStarterCode(problem.title, problem.slug)[newLang as keyof StarterCodeMap] || '';
      setCode(freshStarter);
    }
  };

  // Handle Dragging Splitter
  const containerRef = useRef<HTMLDivElement>(null);
  const handleMouseDownSplitter = () => {
    setIsDraggingSplitter(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPct = ((e.clientX - rect.left) / rect.width) * 100;
      if (newPct >= 25 && newPct <= 75) {
        setLeftPanelWidthPct(newPct);
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_WIDTH_KEY, String(newPct));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSplitter(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Run Code via Real Online Judge Sandbox Pipeline
  const handleRunCode = async () => {
    setIsRunning(true);
    setEvaluationResult({ status: 'running' });
    setConsoleTab('output');

    try {
      const result = await runCode({
        problemId: problem.slug || problem.id,
        language: language as LanguageId,
        code,
        customInput: customInputText,
      });

      setIsRunning(false);

      setEvaluationResult({
        status: result.status,
        runtimeMs: result.runtimeMs,
        memoryMb: result.memoryMb,
        outputDetails: result.stderr || result.stdout,
        compileOutput: result.compileOutput,
        testcaseResults: result.testcaseResults,
        totalTestcases: result.totalTestcases,
        passedTestcases: result.passedTestcases,
      });

      if (result.status === 'accepted') {
        toast(`All ${result.passedTestcases || 0} sample tests passed!`, 'success');
      } else if (result.status === 'compile_error') {
        toast('Compilation Error: See compiler output in console', 'error');
      } else if (result.status === 'runtime_error') {
        toast('Runtime Error during test execution', 'error');
      } else if (result.status === 'time_limit') {
        toast('Time Limit Exceeded (> 3000ms)', 'error');
      } else {
        toast(`Sample tests failed (${result.passedTestcases || 0}/${result.totalTestcases || 0} passed)`, 'warning');
      }
    } catch (err: any) {
      setIsRunning(false);
      setEvaluationResult({
        status: 'runtime_error',
        outputDetails: err?.message || 'Sandbox execution runtime error.',
      });
      toast('Execution failed to run in sandbox', 'error');
    }
  };

  // Submit Solution via Full Hidden Test Suite Judge
  const handleSubmitSolution = async () => {
    setIsRunning(true);
    setEvaluationResult({ status: 'running' });
    setConsoleTab('test-results');

    try {
      const result = await submitSolution({
        problemId: problem.slug || problem.id,
        language: language as LanguageId,
        code,
        userId,
      });

      setIsRunning(false);

      const isAccepted = result.verdict === 'Accepted';
      const xpToEarn = isAccepted ? (problem.xp || 50) : 0;

      // 1. Record authentic submission in JudgeEngine
      judgeEngine.recordSubmission({
        problemId: problem.id,
        language,
        verdict: result.verdict as SubmissionRecord['verdict'],
        runtimeMs: result.runtimeMs,
        memoryMb: result.memoryMb,
        codeSnapshot: code,
        prediction,
        testcasesPassed: result.testcasesPassed,
        totalTestcases: result.totalTestcases,
        xpEarned: xpToEarn,
      }, userId);

      // 2. Set submission modal state
      setSubmissionModal({
        isOpen: true,
        verdict: result.verdict as any,
        runtimeMs: result.runtimeMs,
        memoryMb: result.memoryMb,
        xpEarned: xpToEarn,
        testcasesPassed: result.testcasesPassed,
        totalTestcases: result.totalTestcases,
        failedTestcase: result.failedTestcase,
        errorLog: result.errorLog,
      });

      // 3. Update evaluation result
      setEvaluationResult({
        status: isAccepted ? 'accepted' : result.verdict === 'Compilation Error' ? 'compile_error' : result.verdict === 'Time Limit Exceeded' ? 'time_limit' : 'wrong_answer',
        runtimeMs: result.runtimeMs,
        memoryMb: result.memoryMb,
        outputDetails: result.errorLog,
        totalTestcases: result.totalTestcases,
        passedTestcases: result.testcasesPassed,
        testcaseResults: result.testcaseDetails,
      });

      // 4. ONLY ON GENUINE ACCEPTED: Publish ProblemSolved event across EventBus
      if (isAccepted) {
        const platformMeta = getPlatformMeta(problem);
        const canonicalId = `${platformMeta.id}:${problem.id}`;

        EventBus.publish('ProblemSolved', {
          id: result.submissionId || `sub_${Date.now()}_${problem.id}`,
          userId,
          problemId: canonicalId,
          leetcodeNumber: problem.leetcodeNumber || 0,
          platform: platformMeta.id,
          status: 'accepted',
          timestamp: new Date().toISOString(),
          durationSeconds: result.runtimeMs ? Math.round(result.runtimeMs / 1000) : 10,
          xpEarned: xpToEarn,
          topic: problem.topics?.[0] || problem.categoryTitle || 'General',
          pattern: problem.patternTitle || 'General',
          difficulty: problem.difficulty || 'Medium',
        });

        toast(`Accepted! +${xpToEarn} XP added to your profile`, 'success');
      } else {
        toast(`Verdict: ${result.verdict} (${result.testcasesPassed}/${result.totalTestcases} passed)`, 'error');
      }
    } catch (err: any) {
      setIsRunning(false);
      toast('Submission server error', 'error');
    }
  };

  const handleResetCode = () => {
    const defaultCode = getStarterCode(problem.title, problem.slug)[language as keyof StarterCodeMap] || '';
    setCode(defaultCode);
    judgeEngine.saveDraft(problem.id, language, defaultCode, userId);
    toast('Reset code to starter template', 'info');
  };

  const handleSaveDraft = () => {
    judgeEngine.saveDraft(problem.id, language, code, userId);
    toast('Draft code saved automatically!', 'success');
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isLight ? '#F5F7FB' : '#0F172A',
        color: 'var(--text-primary)',
        overflow: 'hidden',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      {/* 1. TOP NAVIGATION BAR */}
      <PracticeIDENavbar
        problem={problem}
        isBookmarked={isBookmarked}
        isLiked={isLiked}
        onToggleBookmark={() => {
          setIsBookmarked(!isBookmarked);
          toast(!isBookmarked ? 'Problem bookmarked!' : 'Removed bookmark', 'info');
        }}
        onToggleLike={() => {
          setIsLiked(!isLiked);
          toast(!isLiked ? 'Added to favorites!' : 'Removed from favorites', 'info');
        }}
      />

      {/* 2. SPLIT PANELS AREA (PAGE NEVER SCROLLS) */}
      <div ref={containerRef} style={{ flex: 1, minHeight: 0, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        {/* LEFT PANEL (45% Width Default): Independent Scrollable Problem Description */}
        <div style={{ width: `${leftPanelWidthPct}%`, height: '100%', overflow: 'hidden' }}>
          <ProblemDescriptionPanel problem={problem} />
        </div>

        {/* DRAGGABLE SPLITTER HANDLE */}
        <div
          onMouseDown={handleMouseDownSplitter}
          style={{
            width: '6px',
            height: '100%',
            background: isDraggingSplitter
              ? 'var(--primary)'
              : isLight
              ? '#CBD5E1'
              : 'rgba(148, 163, 184, 0.25)',
            cursor: 'col-resize',
            zIndex: 30,
            transition: 'background 0.2s ease',
          }}
        />

        {/* RIGHT PANEL (55% Width Default): Code Editor + Bottom Resizable Console */}
        <div style={{ width: `${100 - leftPanelWidthPct}%`, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Top Code Editor Panel */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <CodeEditorPanel
              code={code}
              onChangeCode={setCode}
              onResetCode={handleResetCode}
              language={language}
              onChangeLanguage={handleLanguageChange}
            />
          </div>

          {/* Bottom Resizable Console */}
          <div style={{ height: `${bottomConsoleHeightPx}px`, flexShrink: 0 }}>
            <BottomConsolePanel
              activeTab={consoleTab}
              onSelectTab={setConsoleTab}
              evaluationResult={evaluationResult}
              submissionState={submissionModal.isOpen ? submissionModal : null}
              customInputText={customInputText}
              onChangeCustomInput={setCustomInputText}
              problemId={problem.id}
            />
          </div>

        </div>

      </div>

      {/* 3. STICKY ACTION FOOTER BAR */}
      <PracticeActionBar
        onRunCode={handleRunCode}
        onSubmitSolution={handleSubmitSolution}
        onResetCode={handleResetCode}
        onSaveDraft={handleSaveDraft}
        onRevealHint={() => setIsThinkingModalOpen(true)}
        isRunning={isRunning}
      />

      {/* Thinking Phase Modal */}
      <ThinkingPhaseModal
        isOpen={isThinkingModalOpen}
        onClose={() => setIsThinkingModalOpen(false)}
        onSavePrediction={(pred) => {
          setPrediction(pred);
          toast(`Strategy locked: ${pred.pattern}`, 'success');
        }}
        currentPrediction={prediction}
      />

      {/* Submission Result Overlay Modal */}
      <SubmissionResultModal
        isOpen={submissionModal.isOpen}
        onClose={() => setSubmissionModal((prev) => ({ ...prev, isOpen: false }))}
        verdict={submissionModal.verdict}
        runtimeMs={submissionModal.runtimeMs}
        memoryMb={submissionModal.memoryMb}
        xpEarned={submissionModal.xpEarned}
      />

    </div>
  );
}
