'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Check, HelpCircle, Save, RotateCcw } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

interface PracticeActionBarProps {
  onRunCode: () => void;
  onSubmitSolution: () => void;
  onResetCode: () => void;
  onSaveDraft: () => void;
  onRevealHint: () => void;
  isRunning: boolean;
}

export function PracticeActionBar({
  onRunCode,
  onSubmitSolution,
  onResetCode,
  onSaveDraft,
  onRevealHint,
  isRunning,
}: PracticeActionBarProps) {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  return (
    <div style={{
      height: '52px',
      padding: '0 20px',
      background: isLight ? '#FFFFFF' : 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(16px)',
      borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
      boxShadow: isLight ? '0 -2px 8px rgba(0, 0, 0, 0.04)' : '0 -8px 24px rgba(0, 0, 0, 0.5)',
      transition: 'background-color 0.2s ease, border-color 0.2s ease',
    }}>
      {/* Left Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={onSaveDraft}
          style={{
            padding: '7px 12px',
            borderRadius: '8px',
            background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-secondary)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <Save size={13} /> Save Draft
        </button>

        <button
          type="button"
          onClick={onRevealHint}
          style={{
            padding: '7px 12px',
            borderRadius: '8px',
            background: isLight ? 'rgba(56, 189, 248, 0.1)' : 'rgba(56, 189, 248, 0.15)',
            border: '1px solid var(--border)',
            color: 'var(--primary)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <HelpCircle size={13} /> Thinking Strategy
        </button>
      </div>

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          onClick={onResetCode}
          style={{
            padding: '7px 12px',
            borderRadius: '8px',
            background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.1)',
            color: 'var(--text-muted)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <RotateCcw size={13} /> Reset
        </button>

        {/* Secondary Action: Run Code */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onRunCode}
          disabled={isRunning}
          style={{
            padding: '7px 16px',
            borderRadius: '8px',
            background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.08)',
            border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.15)',
            color: 'var(--text-primary)',
            fontSize: '12px',
            fontWeight: 800,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          <Play size={13} fill="currentColor" /> Run Code
        </motion.button>

        {/* Primary Action: Submit Solution */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onSubmitSolution}
          disabled={isRunning}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: 'var(--primary)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 900,
            cursor: isRunning ? 'not-allowed' : 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
            opacity: isRunning ? 0.6 : 1,
          }}
        >
          <Check size={14} /> Submit Solution
        </motion.button>
      </div>

    </div>
  );
}
