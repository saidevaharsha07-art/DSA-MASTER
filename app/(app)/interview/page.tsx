'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Bot,
  User,
  Send,
  Play,
  CheckCircle2,
  AlertCircle,
  Timer,
  Award,
  ChevronRight,
  Code2,
  Brain,
  History,
  Target,
  ArrowRight,
  SkipForward
} from 'lucide-react';
import { InterviewAdapterService, COMPANY_TRACKS } from '@/src/features/interview/services/interview-adapter.service';
import { InterviewSession, InterviewTurn, InterviewPerformanceReport, InterviewDifficulty, InterviewMode, InterviewType } from '@/src/features/interview/types/interview.types';

export default function MockInterviewPage() {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('amazon');
  const [selectedDifficulty, setSelectedDifficulty] = useState<InterviewDifficulty>('Medium');
  const [selectedType, setSelectedType] = useState<InterviewType>('CompanyMock');
  const [selectedMode, setSelectedMode] = useState<InterviewMode>('Coding');

  const [activeSession, setActiveSession] = useState<InterviewSession | null>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [codeSolution, setCodeSolution] = useState<string>('');
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);
  const [finalReport, setFinalReport] = useState<InterviewPerformanceReport | null>(null);

  // Load history summary
  const historySummary = useMemo(() => {
    return InterviewAdapterService.getInterviewHistory('default_user');
  }, [activeSession, finalReport]);

  const selectedCompany = COMPANY_TRACKS.find((c) => c.id === selectedCompanyId) || COMPANY_TRACKS[0];

  const handleStartInterview = () => {
    setFinalReport(null);
    const session = InterviewAdapterService.startSession(
      'default_user',
      selectedCompanyId,
      selectedMode,
      selectedDifficulty,
      selectedType
    );
    setActiveSession(session);
    setCodeSolution(session.starterCode);
  };

  const handleSendTurn = async () => {
    if (!activeSession || !userInput.trim()) return;

    const sessionCopy = { ...activeSession };
    setUserInput('');
    setIsAiThinking(true);

    try {
      const { session: updatedSession, aiTurn } = await InterviewAdapterService.sendCandidateTurn(
        sessionCopy.sessionId,
        'default_user',
        userInput,
        codeSolution
      );
      setActiveSession({ ...updatedSession });
    } catch (err) {
      console.error('[InterviewPage] Error handling candidate turn:', err);
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleSubmitQuestion = () => {
    if (!activeSession) return;
    const updated = InterviewAdapterService.submitQuestion(activeSession.sessionId, 'default_user', codeSolution);
    setActiveSession({ ...updated });
    setCodeSolution(updated.starterCode);
  };

  const handleSkipQuestion = () => {
    if (!activeSession) return;
    const updated = InterviewAdapterService.skipQuestion(activeSession.sessionId, 'default_user');
    setActiveSession({ ...updated });
    setCodeSolution(updated.starterCode);
  };

  const handleCompleteInterview = () => {
    if (!activeSession) return;
    const report = InterviewAdapterService.completeInterviewSession(
      activeSession.sessionId,
      'default_user',
      codeSolution
    );
    setFinalReport(report);
    setActiveSession(null);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: '#FFF' }}>
      
      {/* HEADER STRIP */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF' }}>
            Real Adaptive Mock Interview Simulator
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#C084FC' }}>
            Canonical multi-question FAANG technical interview rounds powered by Oracle AI, SRS memory feedback, and company track telemetry.
          </p>
        </div>

        <div style={{ padding: '10px 18px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #C084FC', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Brain size={18} style={{ color: '#C084FC' }} />
          <div>
            <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', fontWeight: 800 }}>Average Interview Score</span>
            <strong style={{ fontSize: '14px', color: '#C084FC' }}>
              {typeof historySummary.averageScore === 'number' ? `${historySummary.averageScore} / 100` : 'Unrated Baseline'}
            </strong>
          </div>
        </div>
      </div>

      {/* SETUP VIEW (WHEN NO SESSION ACTIVE & NO REPORT OPEN) */}
      {!activeSession && !finalReport && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* COMPANY TRACK SELECTOR */}
            <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800, color: '#FFF' }}>1. Select Target Company Track</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                {COMPANY_TRACKS.map((comp) => {
                  const isSel = comp.id === selectedCompanyId;
                  return (
                    <motion.div
                      key={comp.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedCompanyId(comp.id)}
                      style={{
                        padding: '16px',
                        borderRadius: '14px',
                        background: isSel ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255,255,255,0.03)',
                        border: isSel ? '2px solid #C084FC' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#FFF' }}>{comp.name}</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#94A3B8', lineHeight: '1.4' }}>{comp.description.slice(0, 55)}...</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* ADAPTIVE MODE SELECTOR */}
            <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 800, color: '#FFF' }}>2. Select Adaptive Interview Mode</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  { id: 'CompanyMock', name: 'Company Mock Round', desc: 'Target company patterns and interview frequency' },
                  { id: 'WeaknessTargeted', name: 'Weakness-Targeted', desc: 'Picks problems from candidate lowest retention topics' },
                  { id: 'SRSRecovery', name: 'SRS Recovery Round', desc: 'Overdue spaced repetition concepts as interview questions' },
                  { id: 'TimedSpeed', name: 'Timed Speed Coding', desc: 'Strict 30-minute pressure round evaluation' },
                ].map((type) => {
                  const isSel = type.id === selectedType;
                  return (
                    <div
                      key={type.id}
                      onClick={() => setSelectedType(type.id as InterviewType)}
                      style={{
                        padding: '14px',
                        borderRadius: '12px',
                        background: isSel ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.03)',
                        border: isSel ? '2px solid #38BDF8' : '1px solid rgba(255,255,255,0.08)',
                        cursor: 'pointer',
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#FFF' }}>{type.name}</h4>
                      <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#94A3B8' }}>{type.desc}</p>
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>Difficulty:</span>
                {(['Easy', 'Medium', 'Hard', 'Mixed'] as InterviewDifficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      background: selectedDifficulty === diff ? '#C084FC' : 'rgba(255,255,255,0.05)',
                      color: selectedDifficulty === diff ? '#000' : '#FFF',
                      border: 'none',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    {diff}
                  </button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={handleStartInterview}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  padding: '16px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #C084FC 0%, #9333EA 100%)',
                  color: '#FFF',
                  border: 'none',
                  fontSize: '15px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Play size={18} /> Start {selectedCompany.name} Adaptive Mock Round
              </motion.button>
            </div>

          </div>

          {/* HISTORICAL INTERVIEWS PERSISTENCE PANEL */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <History size={18} style={{ color: '#C084FC' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#FFF' }}>Interview History</h3>
            </div>

            {historySummary.recentSessions.length === 0 ? (
              <div style={{ padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                No completed interviews yet. Start your first mock round to establish your verified performance history.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {historySummary.recentSessions.map((sess) => (
                  <div key={sess.id} style={{ padding: '12px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h5 style={{ margin: 0, fontSize: '12px', fontWeight: 800, color: '#FFF' }}>{sess.company} Round</h5>
                      <span style={{ fontSize: '10px', color: '#94A3B8' }}>{sess.date} • Verdict: {sess.verdict}</span>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, padding: '4px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.2)', color: '#10B981' }}>
                      {typeof sess.score === 'number' ? `${sess.score}%` : 'Unrated'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ACTIVE INTERVIEW ARENA (MULTI-QUESTION PROGRESSION) */}
      {activeSession && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* LEFT: DIALOGUE & PROBLEM PROMPT */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', height: '650px' }}>
            <div style={{ paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#C084FC', fontWeight: 800, textTransform: 'uppercase' }}>
                  {activeSession.companyName} {activeSession.interviewType} • Question {(activeSession.currentQuestionIndex || 0) + 1} of {activeSession.questionSet?.totalQuestions || 1}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 800, color: '#FFF' }}>{activeSession.problemTitle}</h3>
              </div>
              <button
                onClick={handleCompleteInterview}
                style={{ padding: '6px 12px', borderRadius: '8px', background: '#EF4444', color: '#FFF', border: 'none', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
              >
                Finish Session
              </button>
            </div>

            {/* CHAT LOG */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeSession.turns.map((turn) => (
                <div
                  key={turn.id}
                  style={{
                    alignSelf: turn.sender === 'ai' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: '14px',
                    background: turn.sender === 'ai' ? 'rgba(168, 85, 247, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                    border: turn.sender === 'ai' ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)',
                    fontSize: '12px',
                    lineHeight: '1.5',
                  }}
                >
                  <strong style={{ color: turn.sender === 'ai' ? '#C084FC' : '#38BDF8', display: 'block', marginBottom: '4px' }}>
                    {turn.sender === 'ai' ? 'AI Interviewer' : 'Candidate'}
                  </strong>
                  <div style={{ whiteSpace: 'pre-wrap' }}>{turn.text}</div>
                </div>
              ))}

              {isAiThinking && (
                <div style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', fontSize: '11px', color: '#94A3B8', width: 'fit-content' }}>
                  AI Interviewer is analyzing your response...
                </div>
              )}
            </div>

            {/* TURN INPUT */}
            <div style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendTurn()}
                placeholder="Explain approach, complexity, or ask clarifying question..."
                style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px' }}
              />
              <button
                onClick={handleSendTurn}
                style={{ padding: '10px 16px', borderRadius: '10px', background: '#C084FC', color: '#000', border: 'none', fontWeight: 800, cursor: 'pointer' }}
              >
                <Send size={14} />
              </button>
            </div>
          </div>

          {/* RIGHT: CODE WORKSPACE & QUESTION CONTROLS */}
          <div style={{ padding: '24px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', height: '650px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code2 size={16} style={{ color: '#38BDF8' }} />
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFF' }}>Solution Code Editor</span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleSkipQuestion}
                  style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: '#FFF', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <SkipForward size={12} /> Skip
                </button>
                <button
                  onClick={handleSubmitQuestion}
                  style={{ padding: '6px 14px', borderRadius: '8px', background: '#10B981', color: '#000', border: 'none', fontSize: '11px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <CheckCircle2 size={12} /> Submit & Next
                </button>
              </div>
            </div>

            <textarea
              value={codeSolution}
              onChange={(e) => setCodeSolution(e.target.value)}
              style={{ flex: 1, padding: '16px', borderRadius: '12px', background: '#0D0B18', border: '1px solid rgba(255,255,255,0.1)', color: '#38BDF8', fontFamily: 'monospace', fontSize: '12px', resize: 'none', lineHeight: '1.5' }}
            />
          </div>

        </div>
      )}

      {/* POST-INTERVIEW EVALUATION REPORT CARD */}
      {finalReport && (
        <div style={{ padding: '32px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.95)', border: '1px solid rgba(168, 85, 247, 0.4)', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 900, textTransform: 'uppercase' }}>Verified Interview Evaluation</span>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 900, color: '#FFF' }}>Post-Interview Performance Report</h2>
            </div>
            <div style={{ padding: '12px 20px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10B981', textAlign: 'right' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8', display: 'block', fontWeight: 800 }}>Verdict</span>
              <strong style={{ fontSize: '18px', color: '#10B981' }}>{finalReport.verdict}</strong>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Overall Score</span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#C084FC' }}>
                {typeof finalReport.overallScore === 'number' ? `${finalReport.overallScore} / 100` : 'Unrated'}
              </h3>
            </div>
            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Accuracy Rate</span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#38BDF8' }}>
                {typeof finalReport.accuracyPercentage === 'number' ? `${finalReport.accuracyPercentage}%` : 'Unrated'}
              </h3>
            </div>
            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Time Efficiency</span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#10B981' }}>{finalReport.timeEfficiencyPercentage}%</h3>
            </div>
            <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '10px', color: '#94A3B8' }}>Strongest Pattern</span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#FFF' }}>{finalReport.strongestPattern}</h3>
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6' }}>
            <strong style={{ color: '#C084FC', display: 'block', marginBottom: '4px' }}>Oracle AI Feedback & Analysis:</strong>
            {finalReport.oracleReasoning}
          </div>

          <button
            onClick={() => setFinalReport(null)}
            style={{ padding: '14px', borderRadius: '12px', background: '#C084FC', color: '#000', border: 'none', fontWeight: 900, cursor: 'pointer', width: 'fit-content', alignSelf: 'flex-end' }}
          >
            Back to Interview Command Center
          </button>
        </div>
      )}

    </div>
  );
}
