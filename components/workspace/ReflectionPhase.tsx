'use client';

import React, { useState } from 'react';
import { Lightbulb, Send } from 'lucide-react';
import { thinkingEngine } from '@/src/engines/thinking';
import { curriculumEngine } from '@/src/engines/curriculum';

export function ReflectionPhase({ problemId, onComplete }: { problemId: string, onComplete: () => void }) {
  const [concept, setConcept] = useState('');
  const [reflectionText, setReflectionText] = useState('');
  
  const problem = curriculumEngine.getProblem(problemId);
  const pattern = problem && problem.patterns?.length ? curriculumEngine.getPattern(problem.patterns[0]) : null;
  
  const concepts = pattern ? [pattern.title, ...(pattern.aiMetadata?.commonMisconceptions || [])] : [];

  const handleSubmit = () => {
    if (!concept || !reflectionText.trim() || !pattern) return;
    thinkingEngine.submitReflection(problemId, pattern.id, concept, reflectionText);
    onComplete();
  };

  return (
    <div className="layout-stack" style={{ gap: '32px' }}>
      <div>
        <h2 className="title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lightbulb size={24} style={{ color: '#eab308' }} /> Reflection
        </h2>
        <p className="muted">Take a moment to cement your learning before moving on.</p>
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">1. What was the main concept or bottleneck?</label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {concepts.map(c => (
            <button
              key={c}
              onClick={() => setConcept(c)}
              className="pill"
              style={{
                cursor: 'pointer',
                background: concept === c ? 'var(--primary-bg)' : 'transparent',
                border: concept === c ? '1px solid var(--primary)' : '1px solid var(--border)',
                color: concept === c ? 'var(--primary)' : 'var(--foreground)'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="layout-stack-sm">
        <label className="eyebrow">2. What mistake will you avoid next time?</label>
        <textarea
          className="input"
          style={{ minHeight: '100px', resize: 'vertical' }}
          placeholder="E.g., I forgot to update the hash map before checking the prefix sum condition..."
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
        />
      </div>

      <button
        className="button primary"
        disabled={!concept || !reflectionText.trim()}
        onClick={handleSubmit}
        style={{ padding: '16px', fontSize: '16px' }}
      >
        Save Reflection <Send size={16} style={{ marginLeft: '8px' }} />
      </button>
    </div>
  );
}
