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
  RotateCcw
} from 'lucide-react';
import { judgeEngine, SubmissionRecord } from '@/src/engines/judge';
import { useToast } from '@/src/context/ToastContext';

interface BottomConsolePanelProps {
  activeTab: 'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history';
  onSelectTab: (tab: 'testcases' | 'custom-input' | 'output' | 'test-results' | 'analytics' | 'debug' | 'history') => void;
  evaluationResult: {
    status: 'idle' | 'running' | 'accepted' | 'wrong_answer' | 'compile_error' | 'time_limit' | 'runtime_error';
    runtimeMs?: number;
    memoryMb?: number;
    outputDetails?: string;
    expectedOutput?: string;
    actualOutput?: string;
  };
  customInputText: string;
  onChangeCustomInput: (val: string) => void;
  problemId: string;
}

export function BottomConsolePanel({
  activeTab,
  onSelectTab,
  evaluationResult,
  customInputText,
  onChangeCustomInput,
  problemId,
}: BottomConsolePanelProps) {
  const { toast } = useToast();
  
  // Sample testcase index selection
  const [selectedSampleIdx, setSelectedSampleIdx] = useState<number>(0);
  const [copiedInput, setCopiedInput] = useState<boolean>(false);
  const [copiedOutput, setCopiedOutput] = useState<boolean>(false);

  // Debug Console filter
  const [debugSearch, setDebugSearch] = useState<string>('');
  const [debugLevel, setDebugLevel] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  // History list
  const [submissionHistory, setSubmissionHistory] = useState<SubmissionRecord[]>([]);

  useEffect(() => {
    setSubmissionHistory(judgeEngine.getSubmissionsForProblem(problemId));
  }, [problemId, evaluationResult]);

  const sampleTestcases = [
    {
      num: 1,
      input: 'nums = [2,7,11,15], target = 9',
      expectedOutput: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
    },
    {
      num: 2,
      input: 'nums = [3,2,4], target = 6',
      expectedOutput: '[1,2]',
      explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
    },
    {
      num: 3,
      input: 'nums = [3,3], target = 6',
      expectedOutput: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',
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
    { type: 'info', time: '17:42:01', msg: 'Compilation started for TypeScript target ES2022.' },
    { type: 'info', time: '17:42:02', msg: 'Allocated V8 Sandbox instance (42.1 MB memory pool).' },
    { type: 'warning', time: '17:42:02', msg: 'Optional parameter target implicitly typed as number.' },
    { type: 'info', time: '17:42:02', msg: 'Executed sample testcases 1..3 in 4ms.' },
  ];

  const filteredDebugLogs = debugLogs.filter((log) => {
    if (debugLevel !== 'all' && log.type !== debugLevel) return false;
    if (debugSearch && !log.msg.toLowerCase().includes(debugSearch.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#09090B', borderTop: '1px solid rgba(168, 85, 247, 0.25)', overflow: 'hidden' }}>
      
      {/* 7 TAB HEADER BAR */}
      <div style={{
        padding: '0 16px',
        background: 'rgba(20, 16, 38, 0.95)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        height: '42px',
        flexShrink: 0,
        overflowX: 'auto',
      }}>
        {/* Tab 1: Sample Testcases */}
        <button
          type="button"
          onClick={() => onSelectTab('testcases')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'testcases' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'testcases' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <FileCode size={13} /> Sample Testcases
        </button>

        {/* Tab 2: Custom Input */}
        <button
          type="button"
          onClick={() => onSelectTab('custom-input')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'custom-input' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'custom-input' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <Terminal size={13} /> Custom Input
        </button>

        {/* Tab 3: Output & Diff Viewer */}
        <button
          type="button"
          onClick={() => onSelectTab('output')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'output' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'output' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <CheckCircle2 size={13} style={{ color: evaluationResult.status === 'accepted' ? '#10B981' : '#C084FC' }} /> Output
        </button>

        {/* Tab 4: Test Results */}
        <button
          type="button"
          onClick={() => onSelectTab('test-results')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'test-results' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'test-results' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <CheckCircle2 size={13} /> Test Results
        </button>

        {/* Tab 5: Runtime Analytics */}
        <button
          type="button"
          onClick={() => onSelectTab('analytics')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'analytics' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'analytics' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <TrendingUp size={13} /> Analytics
        </button>

        {/* Tab 6: Debug Console */}
        <button
          type="button"
          onClick={() => onSelectTab('debug')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'debug' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'debug' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <Bug size={13} /> Debug Console
        </button>

        {/* Tab 7: Submission History */}
        <button
          type="button"
          onClick={() => onSelectTab('history')}
          style={{
            padding: '6px 12px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'history' ? '2px solid #C084FC' : '2px solid transparent',
            color: activeTab === 'history' ? '#C084FC' : '#94A3B8',
            fontSize: '11px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            whiteSpace: 'nowrap',
          }}
        >
          <History size={13} /> History ({submissionHistory.length})
        </button>
      </div>

      {/* TAB BODY CONTENT */}
      <div style={{ flex: 1, padding: '16px 20px', overflowY: 'auto', color: '#CBD5E1', fontSize: '12px' }}>
        
        {/* TAB 1: SAMPLE TESTCASES */}
        {activeTab === 'testcases' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Sample Selector Strip */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {sampleTestcases.map((s, idx) => (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setSelectedSampleIdx(idx)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: selectedSampleIdx === idx ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.04)',
                      border: selectedSampleIdx === idx ? '1px solid #C084FC' : '1px solid rgba(255,255,255,0.1)',
                      color: selectedSampleIdx === idx ? '#FFFFFF' : '#94A3B8',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Sample {s.num}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={handleCopyInput} style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copiedInput ? <Check size={10} style={{ color: '#10B981' }} /> : <Copy size={10} />} Copy Input
                </button>
                <button type="button" onClick={handleCopyOutput} style={{ padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {copiedOutput ? <Check size={10} style={{ color: '#10B981' }} /> : <Copy size={10} />} Copy Output
                </button>
              </div>
            </div>

            {/* Input & Output Details */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Input</span>
                <code style={{ color: '#FFF', fontFamily: 'monospace' }}>{currentSample.input}</code>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '4px' }}>Expected Output</span>
                <code style={{ color: '#10B981', fontFamily: 'monospace' }}>{currentSample.expectedOutput}</code>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOM INPUT */}
        {activeTab === 'custom-input' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Custom Input Parameters:</span>
              <button
                type="button"
                onClick={() => onChangeCustomInput('')}
                style={{ padding: '3px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: 'none', color: '#94A3B8', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Trash2 size={10} /> Clear Input
              </button>
            </div>

            <textarea
              value={customInputText}
              onChange={(e) => onChangeCustomInput(e.target.value)}
              placeholder="nums = [2,7,11,15]\ntarget = 9"
              style={{
                width: '100%',
                height: '90px',
                padding: '10px 12px',
                borderRadius: '10px',
                background: 'rgba(20, 16, 38, 0.9)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#FFF',
                fontFamily: 'monospace',
                fontSize: '12px',
                outline: 'none',
                resize: 'none',
              }}
            />
          </div>
        )}

        {/* TAB 3: OUTPUT & DIFF VIEWER */}
        {activeTab === 'output' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {evaluationResult.status === 'idle' && (
              <div style={{ color: '#94A3B8', fontStyle: 'italic' }}>
                Run your code or click Submit Solution to view stdout results.
              </div>
            )}

            {evaluationResult.status === 'accepted' && (
              <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={24} style={{ color: '#10B981' }} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#10B981' }}>Accepted</h4>
                  <span style={{ fontSize: '11px', color: '#CBD5E1' }}>Runtime: {evaluationResult.runtimeMs || 4} ms • Memory: {evaluationResult.memoryMb || 42.1} MB</span>
                </div>
              </div>
            )}

            {/* Side-by-Side Diff Viewer for Wrong Answer */}
            {evaluationResult.status === 'wrong_answer' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#EF4444', fontWeight: 800 }}>
                  ✖ Wrong Answer (Testcase 3 Mismatch)
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', display: 'block', marginBottom: '4px' }}>Expected Output</span>
                    <code style={{ color: '#10B981', fontFamily: 'monospace' }}>[0, 1]</code>
                  </div>

                  <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#EF4444', display: 'block', marginBottom: '4px' }}>Your Output</span>
                    <code style={{ color: '#FCA5A5', fontFamily: 'monospace' }}>[1, 0]</code>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TEST RESULTS */}
        {activeTab === 'test-results' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)' }}>
              <span style={{ fontWeight: 800, color: '#10B981' }}>55 / 55 Testcases Passed</span>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Success Rate: 100%</span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', fontSize: '11px', fontWeight: 700 }}>
                ✓ Test 1 Passed (1ms)
              </div>
              <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', fontSize: '11px', fontWeight: 700 }}>
                ✓ Test 2 Passed (2ms)
              </div>
              <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#10B981', fontSize: '11px', fontWeight: 700 }}>
                ✓ Test 3 Passed (1ms)
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RUNTIME ANALYTICS */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800 }}>Runtime</span>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#10B981', marginTop: '2px' }}>4 ms</div>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Beats 94.8% of TypeScript submissions</span>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800 }}>Memory</span>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#C084FC', marginTop: '2px' }}>42.1 MB</div>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Beats 89.2% of TypeScript submissions</span>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(20, 16, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800 }}>Global Rank</span>
              <div style={{ fontSize: '18px', fontWeight: 900, color: '#F59E0B', marginTop: '2px' }}>Top 5%</div>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Archon Performance Tier</span>
            </div>
          </div>
        )}

        {/* TAB 6: DEBUG CONSOLE */}
        {activeTab === 'debug' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search debug logs..."
                value={debugSearch}
                onChange={(e) => setDebugSearch(e.target.value)}
                style={{ padding: '5px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '11px', outline: 'none' }}
              />

              <div style={{ display: 'flex', gap: '4px' }}>
                {(['all', 'info', 'warning', 'error'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setDebugLevel(lvl)}
                    style={{ padding: '3px 8px', borderRadius: '4px', background: debugLevel === lvl ? 'rgba(168,85,247,0.3)' : 'rgba(255,255,255,0.04)', border: 'none', color: debugLevel === lvl ? '#C084FC' : '#94A3B8', fontSize: '10px', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontFamily: 'monospace', fontSize: '11px', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(13, 10, 25, 0.8)', padding: '10px', borderRadius: '8px' }}>
              {filteredDebugLogs.map((l, i) => (
                <div key={i} style={{ color: l.type === 'error' ? '#EF4444' : l.type === 'warning' ? '#F59E0B' : '#94A3B8' }}>
                  <span style={{ color: '#475569' }}>[{l.time}]</span> [{l.type.toUpperCase()}] {l.msg}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SUBMISSION HISTORY */}
        {activeTab === 'history' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {submissionHistory.length === 0 ? (
              <div style={{ color: '#94A3B8', fontStyle: 'italic', padding: '10px 0' }}>
                No submissions recorded yet for this problem.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8' }}>
                    <th style={{ padding: '6px' }}>Verdict</th>
                    <th style={{ padding: '6px' }}>Language</th>
                    <th style={{ padding: '6px' }}>Runtime</th>
                    <th style={{ padding: '6px' }}>Memory</th>
                    <th style={{ padding: '6px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissionHistory.map((s) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '6px', fontWeight: 800, color: s.verdict === 'Accepted' ? '#10B981' : '#EF4444' }}>{s.verdict}</td>
                      <td style={{ padding: '6px', color: '#FFF' }}>{s.language}</td>
                      <td style={{ padding: '6px', color: '#CBD5E1' }}>{s.runtimeMs} ms</td>
                      <td style={{ padding: '6px', color: '#CBD5E1' }}>{s.memoryMb} MB</td>
                      <td style={{ padding: '6px', color: '#94A3B8' }}>{new Date(s.timestamp).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
