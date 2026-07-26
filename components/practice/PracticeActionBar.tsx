'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Check, HelpCircle, Save, RotateCcw } from 'lucide-react';

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
  return (
    <div style={{
      height: '54px',
      padding: '0 24px',
      background: 'rgba(13, 10, 25, 0.98)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(168, 85, 247, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      bottom: 0,
      zIndex: 50,
      boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.6)',
    }}>
      {/* Left Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          type="button"
          onClick={onSaveDraft}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#CBD5E1',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Save size={14} /> Save Draft
        </button>

        <button
          type="button"
          onClick={onRevealHint}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(168, 85, 247, 0.12)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            color: '#C084FC',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <HelpCircle size={14} /> Reveal Hint
        </button>
      </div>

      {/* Right Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={onResetCode}
          style={{
            padding: '8px 14px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94A3B8',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <RotateCcw size={14} /> Reset
        </button>

        {/* Secondary Action: Run Code */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onRunCode}
          disabled={isRunning}
          style={{
            padding: '8px 18px',
            borderRadius: '10px',
            background: 'rgba(168, 85, 247, 0.25)',
            border: '1px solid #C084FC',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 16px rgba(168, 85, 247, 0.3)',
          }}
        >
          <Play size={14} fill="#FFF" /> Run Code
        </motion.button>

        {/* Primary Action: Submit Solution */}
        <motion.button
          whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(168, 85, 247, 0.7)' }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onSubmitSolution}
          disabled={isRunning}
          style={{
            padding: '9px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #A855F7 0%, #7E22CE 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 900,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
          }}
        >
          <Check size={16} /> Submit Solution
        </motion.button>
      </div>

    </div>
  );
}
