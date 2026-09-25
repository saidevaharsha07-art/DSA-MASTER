'use client';

import React, { useState, useEffect } from 'react';
import { thinkingEngine } from '@/src/engines/thinking';
import { curriculumEngine } from '@/src/engines/curriculum';
import { Brain, CheckCircle2 } from 'lucide-react';

export function ThinkingPhase({ problemId, onComplete }: { problemId: string, onComplete: () => void }) {
  const [pattern, setPattern] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<string | null>(null);
  const [strategy, setStrategy] = useState('');
  const [confidence, setConfidence] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  // Auto-initialize state
  useEffect(() => {
    thinkingEngine.startThinkingPhase(problemId);
  }, [problemId]);

  // Sync state to engine
  useEffect(() => {
    if (!submitted) {
      thinkingEngine.updateThinkingState(problemId, {
        predictedPatternId: pattern,
        predictedComplexity: complexity,
        strategy,
        confidence
      });
    }
  }, [pattern, complexity, strategy, confidence, submitted, problemId]);

  const allPatterns = curriculumEngine.getAllPatterns().filter(p => p.phase === 'phase-01');

  const handleSubmit = () => {
    if (!pattern || !complexity) return;
    thinkingEngine.submitPrediction(problemId);
    setSubmitted(true);
    setTimeout(onComplete, 500); // Short delay then move to next view
  };

  if (submitted) {
    return (
      <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
        <CheckCircle2 size={48} style={{ color: '#10b981', margin: '0 auto 16px' }} />
        <h2 className="title">Prediction Locked</h2>
        <p className="muted">Moving to code editor...</p>
      </div>
    );
  }

  return (
    <div className="layout-stack" style={{ gap: '32px' }}>
      <div>
        <h2 className="title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Brain size={24} style={{ color: 'var(--primary)' }} /> Thinking Phase
        </h2>
        <p className="muted">Before writing code, analyze the problem and predict the optimal strategy.</p>
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">1. Pattern Prediction</label>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {allPatterns.map(p => (
            <button
              key={p.id}
              onClick={() => setPattern(p.id)}
              className="card"
              style={{
                padding: '16px',
                textAlign: 'left',
                border: pattern === p.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: pattern === p.id ? 'var(--primary-bg)' : 'var(--card)'
              }}
            >
              <div style={{ fontWeight: 600 }}>{p.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">2. Expected Time Complexity</label>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['O(1)', 'O(log N)', 'O(N)', 'O(N log N)', 'O(N²)'].map(comp => (
            <button
              key={comp}
              onClick={() => setComplexity(comp)}
              className="button ghost"
              style={{
                flex: 1,
                border: complexity === comp ? '2px solid var(--primary)' : '1px solid var(--border)',
                background: complexity === comp ? 'var(--primary-bg)' : 'transparent',
              }}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">3. Strategy (One or two sentences)</label>
        <textarea
          className="input"
          style={{ minHeight: '100px', resize: 'vertical' }}
          placeholder="Describe your approach..."
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
        />
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">4. Confidence Level</label>
        <input
          type="range"
          min="1"
          max="100"
          value={confidence}
          onChange={(e) => setConfidence(parseInt(e.target.value))}
          style={{ width: '100%' }}
        />
        <div className="layout-row-between muted" style={{ fontSize: '12px' }}>
          <span>Not Sure</span>
          <span>Very Confident</span>
        </div>
      </div>

      <button
        className="button primary"
        disabled={!pattern || !complexity || !strategy.trim()}
        onClick={handleSubmit}
        style={{ padding: '16px', fontSize: '16px' }}
      >
        Lock Prediction & Start Coding
      </button>
    </div>
  );
}
