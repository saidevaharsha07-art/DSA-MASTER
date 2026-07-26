'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, Sparkles, Flame, Coins, ArrowRight, X } from 'lucide-react';

interface SubmissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error';
  runtimeMs: number;
  memoryMb: number;
  xpEarned: number;
}

export function SubmissionResultModal({
  isOpen,
  onClose,
  verdict,
  runtimeMs,
  memoryMb,
  xpEarned,
}: SubmissionResultModalProps) {
  if (!isOpen) return null;

  const isSuccess = verdict === 'Accepted';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '32px',
          borderRadius: '24px',
          background: isSuccess
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(13, 10, 25, 0.98))'
            : 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(13, 10, 25, 0.98))',
          border: isSuccess ? '2px solid #10B981' : '2px solid #EF4444',
          boxShadow: isSuccess ? '0 20px 60px rgba(16, 185, 129, 0.35)' : '0 20px 60px rgba(239, 68, 68, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '20px',
          color: '#FFF',
        }}
      >
        {/* Status Icon */}
        <div style={{
          padding: '16px',
          borderRadius: '50%',
          background: isSuccess ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)',
          border: isSuccess ? '2px solid #10B981' : '2px solid #EF4444',
          boxShadow: isSuccess ? '0 0 30px #10B981' : '0 0 30px #EF4444',
        }}>
          {isSuccess ? <CheckCircle2 size={44} style={{ color: '#10B981' }} /> : <XCircle size={44} style={{ color: '#EF4444' }} />}
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 900, color: isSuccess ? '#10B981' : '#EF4444' }}>
            {verdict}
          </h2>
          <span style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px', display: 'block' }}>
            {isSuccess ? 'All 55 hidden testcases passed successfully!' : 'Solution failed on hidden testcase 14.'}
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800 }}>Runtime</span>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#FFF' }}>{runtimeMs} ms</div>
          </div>

          <div style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '10px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: 800 }}>Memory</span>
            <div style={{ fontSize: '16px', fontWeight: 900, color: '#C084FC' }}>{memoryMb} MB</div>
          </div>
        </div>

        {/* XP Rewards Banner */}
        {isSuccess && (
          <div style={{ width: '100%', padding: '14px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FDE68A' }}>+{xpEarned} XP</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Coins size={16} style={{ color: '#F59E0B' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FDE68A' }}>+100 Coins</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Flame size={16} style={{ color: '#EF4444' }} />
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#FCA5A5' }}>15 Day Streak</span>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          style={{ width: '100%', padding: '12px', borderRadius: '12px', background: isSuccess ? 'linear-gradient(135deg, #10B981, #059669)' : 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', fontSize: '13px', fontWeight: 900, cursor: 'pointer', boxShadow: isSuccess ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none' }}
        >
          {isSuccess ? 'Continue Journey' : 'Try Again'}
        </button>

      </motion.div>
    </div>
  );
}
