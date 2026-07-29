'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, Award, MessageSquare, Building2 } from 'lucide-react';
import { useToast } from '@/src/context/ToastContext';

export default function InterviewSimulatorPage() {
  const { toast } = useToast();

  const [step, setStep] = useState<'setup' | 'live' | 'report'>('setup');
  const [selectedCompany, setSelectedCompany] = useState<string>('Amazon');
  const [mode, setMode] = useState<'Coding' | 'System Design' | 'Behavioral'>('Coding');

  // Live Interview State
  const [secondsRemaining, setSecondsRemaining] = useState<number>(2700); // 45 mins
  const [userCode, setUserCode] = useState<string>('function shortenUrl(originalUrl: string): string {\n    // Write your interview solution here\n    return "";\n}');
  const [chatLog, setChatLog] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    { sender: 'ai', text: 'Welcome to your Amazon Technical Interview simulation! I am your AI Interviewer. Please design a high-throughput URL Shortener service function. Can you explain your chosen data structures and complexity bounds?' },
  ]);
  const [userReply, setUserReply] = useState<string>('');

  useEffect(() => {
    if (step !== 'live') return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [step]);

  const handleSendReply = () => {
    if (!userReply.trim()) return;
    setChatLog((prev) => [
      ...prev,
      { sender: 'user', text: userReply },
      { sender: 'ai', text: 'Great point. How would your design handle hash collisions under 100,000 concurrent requests per second?' },
    ]);
    setUserReply('');
  };

  const handleFinishInterview = () => {
    setStep('report');
    toast('Interview completed! Report generated.', 'success');
  };

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', color: '#FFF' }}>
      
      {/* HEADER STRIP */}
      <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF' }}>
            AI Mock Interview Simulator
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#C084FC' }}>
            Simulate real FAANG technical coding interviews under live pressure with AI feedback.
          </p>
        </div>

        {step === 'live' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444', color: '#EF4444', fontWeight: 900 }}>
            <Clock size={16} /> Time Remaining: {timeStr}
          </div>
        )}
      </div>

      {/* STEP 1: PRE-INTERVIEW SETUP */}
      {step === 'setup' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          
          <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#C084FC' }}>1. Select Target Company</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              {(['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix'] as const).map((comp) => (
                <button
                  key={comp}
                  type="button"
                  onClick={() => setSelectedCompany(comp)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    background: selectedCompany === comp ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: selectedCompany === comp ? '1px solid #C084FC' : '1px solid rgba(255,255,255,0.1)',
                    color: selectedCompany === comp ? '#FFF' : '#94A3B8',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Building2 size={20} style={{ color: selectedCompany === comp ? '#C084FC' : '#94A3B8' }} />
                  {comp}
                </button>
              ))}
            </div>

            <h3 style={{ margin: '10px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#38BDF8' }}>2. Interview Mode</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(['Coding', 'System Design', 'Behavioral'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '10px',
                    background: mode === m ? 'rgba(56, 189, 248, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: mode === m ? '1px solid #38BDF8' : '1px solid rgba(255,255,255,0.1)',
                    color: mode === m ? '#38BDF8' : '#94A3B8',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep('live')}
              style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
                border: 'none',
                color: '#FFF',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 0 24px rgba(168, 85, 247, 0.5)',
              }}
            >
              <Play size={16} fill="#FFF" /> Start {selectedCompany} Mock Interview
            </button>
          </div>

          {/* Setup Guidelines */}
          <div style={{ padding: '28px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#FFF' }}>Interview Environment Rules</h3>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '10px', lineHeight: '1.6' }}>
              <li>45-minute strict timer. Fullscreen pressure mode enabled.</li>
              <li>Hints are disabled during the live simulation.</li>
              <li>The AI Interviewer evaluates communication, problem-solving, and algorithmic optimization.</li>
              <li>Post-interview performance report generated upon completion.</li>
            </ul>
          </div>

        </div>
      )}

      {/* STEP 2: LIVE INTERVIEW MODE */}
      {step === 'live' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '640px' }}>
          
          {/* AI Interviewer QA Conversation Panel */}
          <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <MessageSquare size={18} style={{ color: '#C084FC' }} />
              <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#FFF' }}>AI FAANG Interviewer Conversation</h4>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '6px' }}>
              {chatLog.map((c, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: c.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: c.sender === 'user' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                    border: c.sender === 'user' ? '1px solid #C084FC' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: '#FFF',
                    fontSize: '12px',
                    lineHeight: '1.6',
                  }}
                >
                  {c.text}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <input
                type="text"
                placeholder="Explain your approach to the interviewer..."
                value={userReply}
                onChange={(e) => setUserReply(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                style={{ flex: 1, padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '12px', outline: 'none' }}
              />
              <button type="button" onClick={handleSendReply} style={{ padding: '10px 16px', borderRadius: '10px', background: '#A855F7', border: 'none', color: '#FFF', fontSize: '12px', fontWeight: 800, cursor: 'pointer' }}>
                Send
              </button>
            </div>
          </div>

          {/* Code Workspace & Submit Panel */}
          <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(20, 16, 38, 0.9)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#C084FC' }}>Interview Code Workspace</h4>
            
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              style={{ flex: 1, padding: '14px', borderRadius: '12px', background: '#0D0A19', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontFamily: 'monospace', fontSize: '13px', outline: 'none', resize: 'none' }}
            />

            <button
              type="button"
              onClick={handleFinishInterview}
              style={{ padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #10B981, #059669)', border: 'none', color: '#FFF', fontSize: '13px', fontWeight: 900, cursor: 'pointer' }}
            >
              Submit Final Interview Solution
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: POST-INTERVIEW REPORT */}
      {step === 'report' && (
        <div style={{ padding: '32px', borderRadius: '24px', background: 'rgba(20, 16, 38, 0.95)', border: '2px solid #10B981', boxShadow: '0 20px 60px rgba(16, 185, 129, 0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          <div style={{ padding: '16px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.25)', border: '2px solid #10B981' }}>
            <Award size={48} style={{ color: '#10B981' }} />
          </div>

          <div>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#10B981' }}>
              Interview Report: 86% Overall Readiness
            </h2>
            <span style={{ fontSize: '13px', color: '#CBD5E1', marginTop: '4px', display: 'block' }}>
              Target: {selectedCompany} SDE • Mode: {mode}
            </span>
          </div>

          <div style={{ width: '100%', maxWidth: '600px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Problem Solving</span>
              <strong style={{ fontSize: '18px', color: '#10B981' }}>90%</strong>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Communication</span>
              <strong style={{ fontSize: '18px', color: '#38BDF8' }}>82%</strong>
            </div>

            <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Optimization</span>
              <strong style={{ fontSize: '18px', color: '#C084FC' }}>85%</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep('setup')}
            style={{ padding: '12px 24px', borderRadius: '12px', background: 'linear-gradient(135deg, #A855F7, #7E22CE)', border: 'none', color: '#FFF', fontSize: '13px', fontWeight: 900, cursor: 'pointer' }}
          >
            Start Another Simulation
          </button>
        </div>
      )}

    </div>
  );
}
