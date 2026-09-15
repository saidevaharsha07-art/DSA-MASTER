'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, Sparkles, Flame, Coins, ArrowRight, X } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

interface SubmissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error' | 'Runtime Error';
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
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  if (!isOpen) return null;

  const isSuccess = verdict === 'Accepted';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '28px',
          borderRadius: '20px',
          background: isLight ? '#FFFFFF' : 'var(--surface, #1E293B)',
          border: isSuccess
            ? '2px solid #10B981'
            : '2px solid #EF4444',
          boxShadow: isLight
            ? '0 20px 50px rgba(0, 0, 0, 0.15)'
            : '0 20px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          color: 'var(--text-primary)',
        }}
      >
        {/* Status Icon */}
        <div style={{
          padding: '14px',
          borderRadius: '50%',
          background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: isSuccess ? '2px solid #10B981' : '2px solid #EF4444',
        }}>
          {isSuccess ? <CheckCircle2 size={40} style={{ color: '#10B981' }} /> : <XCircle size={40} style={{ color: '#EF4444' }} />}
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: isSuccess ? '#10B981' : '#EF4444' }}>
            {verdict}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            {isSuccess ? 'All testcases evaluated and passed successfully!' : 'Solution failed on one or more testcases.'}
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Runtime</span>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>{runtimeMs} ms</div>
          </div>

          <div style={{ padding: '10px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Memory</span>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--primary)' }}>{memoryMb} MB</div>
          </div>
        </div>

        {/* XP Rewards Banner */}
        {isSuccess && xpEarned > 0 && (
          <div style={{ width: '100%', padding: '12px', borderRadius: '12px', background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Sparkles size={16} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#D97706' }}>+{xpEarned} XP Earned</span>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            background: isSuccess ? 'linear-gradient(135deg, #10B981, #059669)' : (isLight ? '#F1F5F9' : 'rgba(255,255,255,0.1)'),
            border: isSuccess ? 'none' : '1px solid var(--border)',
            color: isSuccess ? '#FFFFFF' : 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          {isSuccess ? 'Continue' : 'Close'}
        </button>

      </motion.div>
    </div>
  );
}
