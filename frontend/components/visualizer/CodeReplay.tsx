'use client';

import React from 'react';

interface CodeReplayProps {
  code: string;
  highlightedLines: number[];
  variables: Record<string, string | number>;
}

export function CodeReplay({ code, highlightedLines, variables }: CodeReplayProps) {
  const lines = code.split('\n');

  return (
    <div className="panel layout-stack" style={{ background: '#0d1117', borderColor: '#30363d', color: '#c9d1d9', padding: '16px' }}>
      <div className="layout-row-between" style={{ borderBottom: '1px solid #30363d', paddingBottom: '12px', marginBottom: '12px' }}>
        <div className="eyebrow" style={{ color: '#8b949e', margin: 0 }}>Code Execution</div>
      </div>
      
      <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.5, overflowX: 'auto' }}>
        {lines.map((line, idx) => {
          const lineNum = idx + 1;
          const isHighlighted = highlightedLines.includes(lineNum);
          return (
            <div 
              key={idx} 
              style={{ 
                display: 'flex', 
                background: isHighlighted ? 'rgba(56, 139, 253, 0.15)' : 'transparent',
                borderLeft: isHighlighted ? '2px solid #58a6ff' : '2px solid transparent',
                padding: '0 8px'
              }}
            >
              <span style={{ width: '24px', color: '#484f58', textAlign: 'right', marginRight: '16px', userSelect: 'none' }}>
                {lineNum}
              </span>
              <span style={{ whiteSpace: 'pre' }}>{line}</span>
            </div>
          );
        })}
      </div>

      {Object.keys(variables).length > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #30363d' }}>
          <div className="eyebrow" style={{ color: '#8b949e', marginBottom: '8px' }}>Variables</div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {Object.entries(variables).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', gap: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                <span style={{ color: '#ff7b72' }}>{key}</span>
                <span style={{ color: '#8b949e' }}>=</span>
                <span style={{ color: '#79c0ff' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
