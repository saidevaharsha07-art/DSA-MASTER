'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, Sparkles, X, Target, Cpu, Clock } from 'lucide-react';
import { ThinkingPrediction } from '@/src/engines/judge';
import { useSettings } from '@/src/context/SettingsContext';

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
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  const [pattern, setPattern] = useState<string>(currentPrediction?.pattern || 'Array / Hash Table');
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.05)',
    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '26px',
          borderRadius: '20px',
          background: isLight ? '#FFFFFF' : 'var(--surface, #1E293B)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(148, 163, 184, 0.2)',
          boxShadow: isLight
            ? '0 20px 50px rgba(0, 0, 0, 0.15)'
            : '0 20px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          color: 'var(--text-primary)',
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)', border: '1px solid var(--border)' }}>
              <Brain size={20} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: 'var(--text-primary)' }}>Thinking Phase Strategy</h3>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Predict complexity bounds before implementation</span>
            </div>
          </div>

          <button type="button" onClick={onClose} aria-label="Close modal" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Form Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', display: 'block', marginBottom: '5px' }}>
              Target Pattern / Approach
            </label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. Hash Table / Two Pointers..."
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#38BDF8', display: 'block', marginBottom: '5px' }}>
                Time Complexity
              </label>
              <select
                value={timeComplexity}
                onChange={(e) => setTimeComplexity(e.target.value)}
                style={inputStyle}
              >
                <option value="O(1)">O(1)</option>
                <option value="O(log N)">O(log N)</option>
                <option value="O(N)">O(N)</option>
                <option value="O(N log N)">O(N log N)</option>
                <option value="O(N²)">O(N²)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981', display: 'block', marginBottom: '5px' }}>
                Space Complexity
              </label>
              <select
                value={spaceComplexity}
                onChange={(e) => setSpaceComplexity(e.target.value)}
                style={inputStyle}
              >
                <option value="O(1)">O(1)</option>
                <option value="O(log N)">O(log N)</option>
                <option value="O(N)">O(N)</option>
                <option value="O(N²)">O(N²)</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#F59E0B', display: 'block', marginBottom: '5px' }}>
              Confidence Level
            </label>
            <div style={{ display: 'flex', gap: '6px' }}>
              {(['Low', 'Medium', 'High'] as const).map((conf) => (
                <button
                  key={conf}
                  type="button"
                  onClick={() => setConfidence(conf)}
                  style={{
                    flex: 1,
                    padding: '7px',
                    borderRadius: '8px',
                    background: confidence === conf
                      ? isLight ? 'rgba(56, 189, 248, 0.15)' : 'rgba(56, 189, 248, 0.25)'
                      : isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)',
                    border: confidence === conf ? '1px solid var(--primary)' : '1px solid var(--border)',
                    color: confidence === conf ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '11px',
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '6px' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            style={{
              padding: '8px 18px',
              borderRadius: '8px',
              background: 'var(--primary)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Check size={14} /> Lock Strategy
          </button>
        </div>

      </motion.div>
    </div>
  );
}
