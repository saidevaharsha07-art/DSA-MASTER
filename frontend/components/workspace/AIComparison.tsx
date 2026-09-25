'use client';

import React from 'react';
import { Sparkles, Check, X, ArrowRight } from 'lucide-react';
import { thinkingEngine } from '@/src/engines/thinking';
import { curriculumEngine } from '@/src/engines/curriculum';

export function AIComparison({ problemId, onNext }: { problemId: string, onNext: () => void }) {
  const evaluation = thinkingEngine.evaluatePrediction(problemId);
  const state = thinkingEngine.getThinkingState(problemId);

  if (!evaluation || !state) return null;

  const userPatternObj = state.predictedPatternId ? curriculumEngine.getPattern(state.predictedPatternId) : null;
  const optimalPatternObj = curriculumEngine.getPattern(evaluation.correctPattern);

  return (
    <div className="layout-stack" style={{ gap: '24px' }}>
      <div className="layout-row-between">
        <h2 className="title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles style={{ color: '#3b82f6' }} size={24} /> AI Evaluation
        </h2>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="card" style={{ padding: '24px' }}>
          <div className="eyebrow" style={{ color: 'var(--muted)', marginBottom: '16px' }}>Your Prediction</div>
          <div className="layout-row" style={{ gap: '12px' }}>
            {evaluation.isPatternCorrect ? (
              <Check size={24} style={{ color: '#10b981' }} />
            ) : (
              <X size={24} style={{ color: '#ef4444' }} />
            )}
            <span style={{ fontSize: '18px', fontWeight: 600 }}>{userPatternObj?.title || state.predictedPatternId}</span>
          </div>
          <div className="muted" style={{ marginTop: '16px', fontStyle: 'italic' }}>
            &quot;{state.strategy}&quot;
          </div>
        </div>

        <div className="card" style={{ padding: '24px', background: 'var(--primary-bg)', borderColor: 'var(--primary)' }}>
          <div className="eyebrow" style={{ color: 'var(--primary)', marginBottom: '16px' }}>Optimal Pattern</div>
          <div className="layout-row" style={{ gap: '12px' }}>
            <Check size={24} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '18px', fontWeight: 600, color: 'var(--foreground)' }}>{optimalPatternObj?.title}</span>
          </div>
          <div style={{ marginTop: '16px', color: 'var(--foreground)' }}>
            {evaluation.explanation}
          </div>
        </div>
      </div>

      <button className="button primary" onClick={onNext} style={{ alignSelf: 'flex-end', padding: '12px 24px' }}>
        Continue <ArrowRight size={16} style={{ marginLeft: '8px' }} />
      </button>
    </div>
  );
}
