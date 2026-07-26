'use client';

import React, { useState } from 'react';
import { visualizerEngine } from '@/src/engines/visualizer';
import { Play, Pause, SkipBack, SkipForward, ArrowRight } from 'lucide-react';
import { CodeReplay } from './CodeReplay';

export function AlgorithmVisualizer({ problemId, onComplete }: { problemId: string, onComplete: () => void }) {
  const data = visualizerEngine.getVisualization(problemId);
  const [currentStep, setCurrentStep] = useState(0);

  if (!data) {
    return (
      <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
        <p className="muted">Interactive visualizer is not available for this problem yet.</p>
        <button className="button primary" onClick={onComplete} style={{ marginTop: '16px' }}>
          Continue to Reflection <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </button>
      </div>
    );
  }

  const frame = data.frames[currentStep];

  return (
    <div className="layout-stack" style={{ gap: '24px' }}>
      <div className="layout-row-between">
        <h2 className="title">Step-by-Step Execution</h2>
        <div className="pill" style={{ fontSize: '12px' }}>
          Step {currentStep + 1} of {data.frames.length}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
        
        {/* Memory Representation */}
        <div className="panel layout-stack" style={{ minHeight: '300px' }}>
          <div className="eyebrow" style={{ color: 'var(--muted)' }}>Memory State</div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px', justifyContent: 'center' }}>
            {frame.arrays?.map(arr => (
              <div key={arr.id}>
                <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '8px', fontFamily: 'monospace' }}>{arr.label}</div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {arr.values.map((val, idx) => {
                    // Check if a pointer is pointing here
                    const pointer = frame.pointers?.find(p => p.index === idx);
                    return (
                      <div key={idx} style={{ position: 'relative' }}>
                        <div style={{
                          width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '4px',
                          fontWeight: 'bold'
                        }}>
                          {val}
                        </div>
                        {pointer && (
                          <div style={{
                            position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)',
                            color: pointer.color || 'var(--primary)', fontSize: '12px', fontWeight: 'bold'
                          }}>
                            ↓ {pointer.label}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: '16px', background: 'var(--primary-bg)', borderColor: 'var(--primary)' }}>
            <p style={{ margin: 0, color: 'var(--foreground)' }}>{frame.explanation}</p>
          </div>
        </div>

        {/* Code Replay */}
        <CodeReplay code={data.code} highlightedLines={frame.highlightedLines} variables={frame.variables} />

      </div>

      {/* Controls */}
      <div className="layout-row-between" style={{ padding: '16px', background: 'var(--card)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="button ghost" 
            disabled={currentStep === 0} 
            onClick={() => setCurrentStep(c => c - 1)}
          >
            <SkipBack size={16} />
          </button>
          
          <button className="button" style={{ background: 'var(--primary-bg)', color: 'var(--primary)' }}>
            <Play size={16} /> {/* Mock play button for UI structure */}
          </button>

          <button 
            className="button ghost" 
            disabled={currentStep === data.frames.length - 1} 
            onClick={() => setCurrentStep(c => c + 1)}
          >
            <SkipForward size={16} />
          </button>
        </div>

        {currentStep === data.frames.length - 1 && (
          <button className="button primary" onClick={onComplete}>
            Finish Visualization <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
        )}
      </div>
    </div>
  );
}
