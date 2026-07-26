'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, Sparkles, X, Target, Cpu, Clock } from 'lucide-react';
import { ThinkingPrediction } from '@/src/engines/judge';

interface ThinkingPhaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePrediction: (pred: ThinkingPrediction) => void;
  currentPrediction?: ThinkingPrediction;
}

export function ThinkingPhaseModal({
  isOpen,
  onClose,
  onSavePrediction,
  currentPrediction,
}: ThinkingPhaseModalProps) {
  const [pattern, setPattern] = useState<string>(currentPrediction?.pattern || 'Array Fundamentals / Hash Table');
  const [timeComplexity, setTimeComplexity] = useState<string>(currentPrediction?.timeComplexity || 'O(N)');
  const [spaceComplexity, setSpaceComplexity] = useState<string>(currentPrediction?.spaceComplexity || 'O(N)');
  const [confidence, setConfidence] = useState<'Low' | 'Medium' | 'High'>(currentPrediction?.confidence || 'High');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSavePrediction({
      pattern,
      timeComplexity,
      spaceComplexity,
      confidence,
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '28px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(20, 16, 38, 0.98), rgba(30, 18, 55, 0.98))',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 20px 60px rgba(168, 85, 247, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          color: '#FFF',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.25)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              <Brain size={22} style={{ color: '#C084FC' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900 }}>Thinking Phase Strategy Prediction</h3>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>Predict algorithmic bounds before coding</span>
            </div>
          </div>

          <button type="button" onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#C084FC', display: 'block', marginBottom: '6px' }}>
              Target Pattern / Approach
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. Hash Table / Two Pointers..."
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '13px', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#38BDF8', display: 'block', marginBottom: '6px' }}>
                Time Complexity
              </label>
              <select
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '13px', outline: 'none' }}
              >
                <option value="O(1)">O(1)</option>
                <option value="O(log N)">O(log N)</option>
                <option value="O(N)">O(N)</option>
                <option value="O(N log N)">O(N log N)</option>
                <option value="O(N²)">O(N²)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', display: 'block', marginBottom: '6px' }}>
                Space Complexity
              </label>
              <select
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFF', fontSize: '13px', outline: 'none' }}
              >
                <option value="O(1)">O(1)</option>
                <option value="O(log N)">O(log N)</option>
                <option value="O(N)">O(N)</option>
                <option value="O(N²)">O(N²)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#F59E0B', display: 'block', marginBottom: '6px' }}>
              Strategy Confidence Level
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['Low', 'Medium', 'High'] as const).map((conf) => (
                <button
                  key={conf}
                  type="button"
                  onClick={() => setConfidence(conf)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    background: confidence === conf ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255,255,255,0.04)',
                    border: confidence === conf ? '1px solid #C084FC' : '1px solid rgba(255,255,255,0.1)',
                    color: confidence === conf ? '#C084FC' : '#94A3B8',
                    fontSize: '12px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {conf}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{ padding: '10px 16px', borderRadius: '10px', background: 'rgba(255,255,255,0.06)', border: 'none', color: '#94A3B8', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            style={{ padding: '10px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #A855F7, #7E22CE)', border: 'none', color: '#FFF', fontSize: '12px', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
          >
            <Check size={14} /> Lock Strategy & Start Coding
          </button>
        </div>

      </motion.div>
    </div>
  );
}
