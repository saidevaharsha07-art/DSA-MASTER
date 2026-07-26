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
import { getStarterCode } from '@/src/engines/judge/starterCode';
import { judgeEngine, ThinkingPrediction, SubmissionRecord } from '@/src/engines/judge';
import { runCode, submitSolution, cancelActiveExecution, LanguageId } from '@/src/services/judge';
import { useToast } from '@/src/context/ToastContext';

interface PracticeIDELayoutProps {
  problem: ProblemModel;
}

const STORAGE_WIDTH_KEY = 'dsa_ide_left_panel_width_pct';
const STORAGE_HEIGHT_KEY = 'dsa_ide_console_height_px';

export function PracticeIDELayout({ problem }: PracticeIDELayoutProps) {
  const { toast } = useToast();
  
  // Left Panel Width % (Persisted in localStorage, default 45%)
  const [leftPanelWidthPct, setLeftPanelWidthPct] = useState<number>(45);
  const [isDraggingSplitter, setIsDraggingSplitter] = useState<boolean>(false);

  // Bottom Console Height px (Persisted in localStorage, default 220px)
  const [bottomConsoleHeightPx, setBottomConsoleHeightPx] = useState<number>(220);

  // Bookmark & Like States
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Language & Starter Code State
  const [language, setLanguage] = useState<string>('typescript');
  const starterCodeMap = useRef(getStarterCode(problem.title, problem.slug));
  const [code, setCode] = useState<string>(starterCodeMap.current['typescript']);

  // Thinking Phase Prediction State
  const [isThinkingModalOpen, setIsThinkingModalOpen] = useState<boolean>(false);
  const [prediction, setPrediction] = useState<ThinkingPrediction | undefined>(undefined);

  // Submission Result Modal State
  const [submissionModal, setSubmissionModal] = useState<{
    isOpen: boolean;
    verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error';
    runtimeMs: number;
    memoryMb: number;
    xpEarned: number;
  }>({
    isOpen: false,
    verdict: 'Accepted',
    runtimeMs: 4,
    memoryMb: 41.2,
    xpEarned: 35,
  });

  // 7 Console Tabs State
  const [consoleTab, setConsoleTab] = useState<'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history'>('testcases');
  const [customInputText, setCustomInputText] = useState<string>('nums = [2,7,11,15]\ntarget = 9');
  
  const [evaluationResult, setEvaluationResult] = useState<{
    status: 'idle' | 'running' | 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
    runtimeMs?: number;
    memoryMb?: number;
    outputDetails?: string;
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

  // Load draft code for problem and language
  useEffect(() => {
    const savedDraft = judgeEngine.loadDraft(problem.id, language);
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      setCode(starterCodeMap.current[language as keyof typeof starterCodeMap.current] || starterCodeMap.current['typescript']);
    }
  }, [language, problem.id]);

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

  // Run Code via Clean Judge Service Architecture Layer
  const handleRunCode = async () => {
    setIsRunning(true);
    setEvaluationResult({ status: 'running' });
    setConsoleTab('output');

    try {
      const result = await runCode({
        problemId: problem.id,
        language: language as LanguageId,
        code,
        stdin: customInputText,
      });

      setIsRunning(false);

      if (result.status === 'accepted') {
        setEvaluationResult({
          status: 'accepted',
          runtimeMs: result.runtimeMs,
          memoryMb: result.memoryMb,
          outputDetails: result.stdout,
        });
        toast(`Executed via ${result.providerUsed} in ${result.runtimeMs}ms!`, 'success');
      } else {
        setEvaluationResult({
          status: result.status,
          outputDetails: result.stderr,
        });
        toast(result.stderr || 'Execution failed', 'error');
      }
    } catch (err: any) {
      setIsRunning(false);
      toast(err.message || 'Execution error', 'error');
    }
  };

  // Submit Solution via Clean Judge Service Architecture Layer
  const handleSubmitSolution = async () => {
    setIsRunning(true);
    setConsoleTab('output');

    try {
      const result = await submitSolution({
        problemId: problem.id,
        language: language as LanguageId,
        code,
      });

      setIsRunning(false);

      const verdict = result.verdict as SubmissionRecord['verdict'];

      judgeEngine.recordSubmission({
        problemId: problem.id,
        language,
        verdict: verdict || 'Accepted',
        runtimeMs: result.runtimeMs || 4,
        memoryMb: result.memoryMb || 41.2,
        codeSnapshot: code,
        prediction,
        testcasesPassed: result.testcasesPassed || 55,
        totalTestcases: result.totalTestcases || 55,
        xpEarned: result.xpEarned || 35,
      });

      setSubmissionModal({
        isOpen: true,
        verdict: verdict === 'Accepted' ? 'Accepted' : 'Wrong Answer',
        runtimeMs: result.runtimeMs || 4,
        memoryMb: result.memoryMb || 41.2,
        xpEarned: result.xpEarned || 35,
      });

      if (verdict === 'Accepted') {
        setEvaluationResult({
          status: 'accepted',
          runtimeMs: result.runtimeMs,
          memoryMb: result.memoryMb,
        });
      } else {
        setEvaluationResult({
          status: 'wrong_answer',
          outputDetails: result.errorLog,
        });
      }
    } catch (err: any) {
      setIsRunning(false);
      toast('Submission server error', 'error');
    }
  };

  const handleResetCode = () => {
    const defaultCode = starterCodeMap.current[language as keyof typeof starterCodeMap.current] || '';
    setCode(defaultCode);
    judgeEngine.saveDraft(problem.id, language, defaultCode);
    toast('Reset code to starter template', 'info');
  };

  const handleSaveDraft = () => {
    judgeEngine.saveDraft(problem.id, language, code);
    toast('Draft code saved automatically!', 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        width: '100vw',
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#09090B',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
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
            background: isDraggingSplitter ? '#C084FC' : 'rgba(168, 85, 247, 0.25)',
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
              onChangeLanguage={(lang) => {
                judgeEngine.saveDraft(problem.id, language, code);
                setLanguage(lang);
              }}
            />
          </div>

          {/* Bottom Resizable Console */}
          <div style={{ height: `${bottomConsoleHeightPx}px`, flexShrink: 0 }}>
            <BottomConsolePanel
              activeTab={consoleTab}
              onSelectTab={setConsoleTab}
              evaluationResult={evaluationResult}
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

    </motion.div>
  );
}
