'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Terminal, 
  Cpu, 
  FileCode, 
  Clock, 
  Copy, 
  Check, 
  History, 
  TrendingUp, 
  Bug, 
  SlidersHorizontal, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Trash2, 
  Sparkles,
  AlertTriangle,
  Play,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import { judgeEngine, SubmissionRecord } from '@/src/engines/judge';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { getProblemDetailInfo } from '@/src/problems/services/problem-detail.service';
import { TestcaseResult } from '@/src/services/judge/types';
import { useToast } from '@/src/context/ToastContext';
import { useSettings } from '@/src/context/SettingsContext';
import { useActiveUser } from '@/src/hooks/useActiveUser';

export interface EvaluationState {
  status: 'idle' | 'running' | 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
  runtimeMs?: number;
  memoryMb?: number;
  outputDetails?: string;
  compileOutput?: string;
  testcaseResults?: TestcaseResult[];
  totalTestcases?: number;
  passedTestcases?: number;
}

export interface SubmissionModalState {
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
}

interface BottomConsolePanelProps {
  activeTab: 'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history';
  onSelectTab: (tab: 'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history') => void;
  evaluationResult: EvaluationState;
  submissionState?: SubmissionModalState | null;
  customInputText: string;
  onChangeCustomInput: (val: string) => void;
  problemId: string;
}

export function BottomConsolePanel({
  activeTab,
  onSelectTab,
  evaluationResult,
  submissionState,
  customInputText,
  onChangeCustomInput,
  problemId,
}: BottomConsolePanelProps) {
  const { toast } = useToast();
  const { settings } = useSettings();
  const { userId } = useActiveUser();
  const isLight = settings?.appearance?.theme === 'light';
  
  // Sample testcase selection
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);

  // Debug Console filter
  const [debugSearch, setDebugSearch] = useState<string>('');
  const [debugLevel, setDebugLevel] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  // History list isolated by userId
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionRecord[]>([]);

  useEffect(() => {
    setSubmissionHistory(judgeEngine.getSubmissionsForProblem(problemId, userId));
  }, [problemId, userId, evaluationResult, submissionState]);

  // Derive authentic sample testcases for this problem
  const problem = CurriculumRepository.getProblemBySlug(problemId) || CurriculumRepository.getProblemById(problemId);
  const detailInfo = problem ? getProblemDetailInfo(problem) : null;
  const sampleTestcases = detailInfo
    ? detailInfo.examples.map((ex) => ({
        num: ex.num,
        input: ex.input,
        expectedOutput: ex.output,
        explanation: ex.explanation,
      }))
    : [
        {
          num: 1,
          input: 'input = [example]',
          expectedOutput: '[result]',
          explanation: 'Standard sample test evaluation.',
        },
      ];

  const currentSample = sampleTestcases[selectedSampleIdx] || sampleTestcases[0];

  const handleCopyInput = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentSample.input);
      setCopiedInput(true);
      toast('Copied sample input!', 'info');
      setTimeout(() => setCopiedInput(false), 2000);
    }
  };

  const handleCopyOutput = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(currentSample.expectedOutput);
      setCopiedOutput(true);
      toast('Copied expected output!', 'info');
      setTimeout(() => setCopiedOutput(false), 2000);
    }
  };

  const debugLogs = [
    { type: 'info', time: '12:00:01', msg: 'Judge engine runtime initialized.' },
    { type: 'info', time: '12:00:02', msg: 'Allocated execution sandbox container.' },
    { type: 'info', time: '12:00:03', msg: 'Loaded problem test suites.' },
  ];

  const filteredDebugLogs = debugLogs.filter((log) => {
    if (debugLevel !== 'all' && log.type !== debugLevel) return false;
    if (debugSearch && !log.msg.toLowerCase().includes(debugSearch.toLowerCase())) return false;
    return true;
  });

  const tabButtonStyle = (tabKey: typeof activeTab) => ({
    padding: '6px 12px',
    background: 'transparent',
    border: 'none',
    borderBottom: activeTab === tabKey ? '2px solid var(--primary)' : '2px solid transparent',
    color: activeTab === tabKey ? 'var(--primary)' : 'var(--text-muted)',
    fontSize: '11px',
    fontWeight: activeTab === tabKey ? (800 as const) : (600 as const),
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s ease',
  });

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: isLight ? '#FFFFFF' : '#0F172A',
      borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.15)',
      overflow: 'hidden',
    }}>
      
      {/* 7 TAB HEADER BAR */}
      <div style={{
        padding: '0 16px',
        background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.95)',
        borderBottom: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        height: '40px',
        flexShrink: 0,
        overflowX: 'auto',
      }}>
        {/* Tab 1: Sample Testcases */}
        <button type="button" onClick={() => onSelectTab('testcases')} style={tabButtonStyle('testcases')}>
          <FileCode size={13} /> Sample Testcases
        </button>

        {/* Tab 2: Custom Input */}
        <button type="button" onClick={() => onSelectTab('custom-input')} style={tabButtonStyle('custom-input')}>
          <Terminal size={13} /> Custom Input
        </button>

        {/* Tab 3: Run Output */}
        <button type="button" onClick={() => onSelectTab('output')} style={tabButtonStyle('output')}>
          <CheckCircle2
            size={13}
            style={{
              color:
                evaluationResult.status === 'accepted'
                  ? '#10B981'
                  : evaluationResult.status === 'wrong_answer' || evaluationResult.status === 'compile_error'
                  ? '#EF4444'
                  : 'inherit',
            }}
          />{' '}
          Run Output {evaluationResult.status !== 'idle' && evaluationResult.status !== 'running' && `(${evaluationResult.passedTestcases ?? 0}/${evaluationResult.totalTestcases ?? 0})`}
        </button>

        {/* Tab 4: Submit Results */}
        <button type="button" onClick={() => onSelectTab('test-results')} style={tabButtonStyle('test-results')}>
          <CheckCircle2
            size={13}
            style={{
              color:
                submissionState?.verdict === 'Accepted'
                  ? '#10B981'
                  : submissionState?.verdict
                  ? '#EF4444'
                  : 'inherit',
            }}
          />{' '}
          Submit Verdict {submissionState?.verdict && `(${submissionState.verdict})`}
        </button>

        {/* Tab 5: Runtime Analytics */}
        <button type="button" onClick={() => onSelectTab('analytics')} style={tabButtonStyle('analytics')}>
          <TrendingUp size={13} /> Analytics
        </button>

        {/* Tab 6: Debug Console */}
        <button type="button" onClick={() => onSelectTab('debug')} style={tabButtonStyle('debug')}>
          <Bug size={13} /> Debug Console
        </button>

        {/* Tab 7: Submission History */}
        <button type="button" onClick={() => onSelectTab('history')} style={tabButtonStyle('history')}>
          <History size={13} /> History ({submissionHistory.length})
        </button>
      </div>

      {/* TAB BODY CONTENT */}
      <div style={{ flex: 1, padding: '14px 18px', overflowY: 'auto', color: 'var(--text-primary)', fontSize: '12px' }}>
        
        {/* TAB 1: SAMPLE TESTCASES */}
        {activeTab === 'testcases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                {sampleTestcases.map((s, idx) => (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setSelectedSampleIdx(idx)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: selectedSampleIdx === idx ? (isLight ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.25)') : (isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)'),
                      border: selectedSampleIdx === idx ? '1px solid var(--primary)' : '1px solid var(--border)',
                      color: selectedSampleIdx === idx ? 'var(--primary)' : 'var(--text-muted)',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Sample {s.num}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="button" onClick={handleCopyInput} style={{ padding: '3px 8px', borderRadius: '6px', background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copiedInput ? <Check size={10} style={{ color: '#10B981' }} /> : <Copy size={10} />} Copy Input
                </button>
                <button type="button" onClick={handleCopyOutput} style={{ padding: '3px 8px', borderRadius: '6px', background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copiedOutput ? <Check size={10} style={{ color: '#10B981' }} /> : <Copy size={10} />} Copy Output
                </button>
              </div>
            </div>

            {/* Input & Output Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Input</span>
                <code style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{currentSample.input}</code>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Expected Output</span>
                <code style={{ color: '#10B981', fontFamily: 'monospace' }}>{currentSample.expectedOutput}</code>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM INPUT */}
        {activeTab === 'custom-input' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>Custom Stdin Input:</span>
              <button
                type="button"
                onClick={() => onChangeCustomInput('')}
                style={{ padding: '3px 8px', borderRadius: '6px', background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={10} /> Clear
              </button>
            </div>

            <textarea
              value={customInputText}
              onChange={(e) => onChangeCustomInput(e.target.value)}
              placeholder="nums = [2,7,11,15]&#10;target = 9"
              style={{
                width: '100%',
                height: '80px',
                padding: '8px 12px',
                borderRadius: '8px',
                background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.8)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                fontFamily: 'monospace',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        )}

        {/* TAB 3: RUN OUTPUT */}
        {activeTab === 'output' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {evaluationResult.status === 'idle' && (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                Click <strong>Run Code</strong> to execute your solution against sample testcases.
              </div>
            )}

            {evaluationResult.status === 'running' && (
              <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--primary)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
                <span>Compiling and running against test suite...</span>
              </div>
            )}

            {/* Compilation Error Display */}
            {evaluationResult.status === 'compile_error' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={16} /> Compilation / Syntax Error
                </div>
                <pre style={{ margin: 0, padding: '10px 14px', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '11px', color: '#EF4444', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {evaluationResult.compileOutput || evaluationResult.outputDetails || 'SyntaxError in code'}
                </pre>
              </div>
            )}

            {/* Execution Unavailable / Coming Soon Display (Free First Release) */}
            {evaluationResult.outputDetails && (evaluationResult.outputDetails.includes('coming soon') || evaluationResult.outputDetails.includes('Execution unavailable') || evaluationResult.outputDetails.includes('temporarily unavailable')) ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '8px', background: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3B82F6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} /> Code Execution Coming Soon
                </div>
                <div style={{ padding: '12px 16px', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Execution unavailable in the first release
                  </p>
                  <p style={{ margin: 0 }}>
                    Live code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience — problem solving, learning, interview practice, study plans, and progress tracking are fully available.
                  </p>
                </div>
              </div>
            ) : evaluationResult.status === 'runtime_error' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ padding: '10px 14px', borderRadius: '8px', background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertTriangle size={16} /> Runtime Exception / Error
                </div>
                <pre style={{ margin: 0, padding: '10px 14px', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '11px', color: '#EF4444', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                  {evaluationResult.outputDetails || 'Process exited with error'}
                </pre>
              </div>
            ) : null}

            {/* Time Limit Exceeded Display */}
            {evaluationResult.status === 'time_limit' && (
              <div style={{ padding: '12px 16px', borderRadius: '8px', background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#F59E0B', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} /> Time Limit Exceeded (Process execution took longer than 3000ms)
              </div>
            )}

            {/* Per-Testcase Run Results Display */}
            {evaluationResult.testcaseResults && evaluationResult.testcaseResults.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {/* Result header banner */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: evaluationResult.status === 'accepted' ? (isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.1)') : (isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.1)'),
                  border: evaluationResult.status === 'accepted' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                }}>
                  <span style={{ fontWeight: 800, color: evaluationResult.status === 'accepted' ? '#10B981' : '#EF4444' }}>
                    {evaluationResult.status === 'accepted' ? '✓ Sample Tests Passed' : '✕ Wrong Answer on Sample Tests'}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    Passed: {evaluationResult.passedTestcases ?? 0} / {evaluationResult.totalTestcases ?? 0}
                  </span>
                </div>

                {/* Test case tabs */}
                <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
                  {evaluationResult.testcaseResults.map((tr, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedSampleIdx(i)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: selectedSampleIdx === i ? (isLight ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.25)') : (isLight ? '#F1F5F9' : 'rgba(255,255,255,0.04)'),
                        border: selectedSampleIdx === i ? '1px solid var(--primary)' : '1px solid var(--border)',
                        color: tr.passed ? '#10B981' : '#EF4444',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      {tr.passed ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                {/* Selected Testcase Details */}
                {(() => {
                  const sel = evaluationResult.testcaseResults[selectedSampleIdx] || evaluationResult.testcaseResults[0];
                  if (!sel) return null;
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Input</span>
                        <code style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{sel.input}</code>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Expected Output</span>
                          <code style={{ color: '#10B981', fontFamily: 'monospace' }}>{sel.expectedOutput}</code>
                        </div>

                        <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Your Output</span>
                          <code style={{ color: sel.passed ? '#10B981' : '#EF4444', fontFamily: 'monospace' }}>{sel.actualOutput || 'No return output'}</code>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: SUBMIT VERDICT */}
        {activeTab === 'test-results' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {!submissionState?.verdict ? (
              evaluationResult.outputDetails && (evaluationResult.outputDetails.includes('coming soon') || evaluationResult.outputDetails.includes('Execution unavailable') || evaluationResult.outputDetails.includes('temporarily unavailable')) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ padding: '12px 16px', borderRadius: '8px', background: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#3B82F6', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} /> Code Execution Coming Soon
                  </div>
                  <div style={{ padding: '12px 16px', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Execution unavailable in the first release
                    </p>
                    <p style={{ margin: 0 }}>
                      Live code execution is coming soon. You can still explore problems, build solutions, and use the full DSA Magna learning experience — problem solving, learning, interview practice, study plans, and progress tracking are fully available.
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                  Click <strong>Submit Solution</strong> to run your solution against the full hidden test suite.
                </div>
              )
            ) : submissionState.verdict === 'Accepted' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '14px 18px', borderRadius: '10px', background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle2 size={24} style={{ color: '#10B981' }} />
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#10B981' }}>Accepted</h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>All {submissionState.totalTestcases || 55} test cases passed successfully!</span>
                    </div>
                  </div>
                  <span style={{ padding: '4px 10px', borderRadius: '6px', background: '#10B981', color: '#FFF', fontWeight: 800, fontSize: '12px' }}>
                    +{submissionState.xpEarned || 50} XP
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ padding: '10px 14px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>Runtime</span>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#10B981', marginTop: '2px' }}>{submissionState.runtimeMs} ms</div>
                  </div>
                  <div style={{ padding: '10px 14px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800 }}>Memory</span>
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary)', marginTop: '2px' }}>{submissionState.memoryMb} MB</div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '14px 18px', borderRadius: '10px', background: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <XCircle size={24} style={{ color: '#EF4444' }} />
                    <div>
                      <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: '#EF4444' }}>{submissionState.verdict}</h3>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                        Passed {submissionState.testcasesPassed ?? 0} / {submissionState.totalTestcases ?? 55} test cases
                      </span>
                    </div>
                  </div>
                </div>

                {submissionState.failedTestcase && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Failing Input</span>
                      <code style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{submissionState.failedTestcase.input}</code>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Expected Output</span>
                        <code style={{ color: '#10B981', fontFamily: 'monospace' }}>{submissionState.failedTestcase.expectedOutput}</code>
                      </div>

                      <div style={{ padding: '10px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
                        <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>Your Output</span>
                        <code style={{ color: '#EF4444', fontFamily: 'monospace' }}>{submissionState.failedTestcase.actualOutput || 'No output / Error'}</code>
                      </div>
                    </div>
                  </div>
                )}

                {submissionState.errorLog && (
                  <pre style={{ margin: 0, padding: '10px 14px', background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.85)', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '11px', color: '#EF4444', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {submissionState.errorLog}
                  </pre>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: RUNTIME ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Runtime</span>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#10B981', marginTop: '2px' }}>
                {evaluationResult.runtimeMs ? `${evaluationResult.runtimeMs} ms` : '—'}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Live Benchmark</span>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Memory</span>
              <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--primary)', marginTop: '2px' }}>
                {evaluationResult.memoryMb ? `${evaluationResult.memoryMb} MB` : '—'}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Sandbox Allocation</span>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)', border: '1px solid var(--border)' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Status</span>
              <div style={{ fontSize: '16px', fontWeight: 900, color: evaluationResult.status === 'accepted' ? '#10B981' : '#F59E0B', marginTop: '2px', textTransform: 'capitalize' }}>
                {evaluationResult.status.replace('_', ' ')}
              </div>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Real Judge Verdict</span>
            </div>
          </div>
        )}

        {/* TAB 6: DEBUG CONSOLE */}
        {activeTab === 'debug' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <input
                type="text"
                placeholder="Search debug logs..."
                value={debugSearch}
                onChange={(e) => setDebugSearch(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: '11px',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'info', 'warning', 'error'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDebugLevel(lvl)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '5px',
                      background: debugLevel === lvl ? 'var(--primary)' : isLight ? '#F1F5F9' : 'rgba(255,255,255,0.05)',
                      color: debugLevel === lvl ? '#FFF' : 'var(--text-muted)',
                      border: 'none',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                    }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ background: isLight ? '#F8FAFC' : 'rgba(15, 23, 42, 0.8)', borderRadius: '8px', border: '1px solid var(--border)', padding: '8px 12px', minHeight: '80px', fontFamily: 'monospace', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {filteredDebugLogs.map((l, i) => (
                <div key={i} style={{ color: l.type === 'error' ? '#EF4444' : l.type === 'warning' ? '#F59E0B' : 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>[{l.time}]</span> [{l.type.toUpperCase()}] {l.msg}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SUBMISSION HISTORY */}
        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {submissionHistory.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '8px 0' }}>
                No submission history for this problem yet.
              </div>
            ) : (
              submissionHistory.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: isLight ? '#F8FAFC' : 'rgba(30, 41, 59, 0.7)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {sub.verdict === 'Accepted' ? (
                      <CheckCircle2 size={16} style={{ color: '#10B981' }} />
                    ) : (
                      <XCircle size={16} style={{ color: '#EF4444' }} />
                    )}
                    <span style={{ fontWeight: 800, color: sub.verdict === 'Accepted' ? '#10B981' : '#EF4444' }}>
                      {sub.verdict}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      ({sub.language})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    <span>{sub.runtimeMs} ms</span>
                    <span>{sub.memoryMb} MB</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {new Date(sub.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
