'use client';

import React from 'react';
import { radius, spacing } from '@/src/design';

export function ProductFactsSection() {
  const metrics = [
    {
      value: '4,000+',
      label: 'Problems',
      description: 'Normalized across LeetCode, CodeChef, Codeforces, & GFG',
    },
    {
      value: '25',
      label: 'Learning Areas',
      description: 'Foundational structures to advanced graph & dynamic programming',
    },
    {
      value: '61',
      label: 'Subtopics',
      description: 'Granular conceptual branches with progressive difficulty',
    },
    {
      value: '113',
      label: 'Patterns',
      description: 'Algorithmic invariant models with multi-language templates',
    },
    {
      value: '4',
      label: 'Platforms',
      description: '1,000 problems each unified into one consistent curriculum',
    },
  ];

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
        padding: '36px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '24px',
        }}
      >
        {metrics.map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '32px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}
            >
              {item.value}
            </span>
            <span
              style={{
                fontSize: '13px',
                fontWeight: 700,
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {item.label}
            </span>
            <p
              style={{
                fontSize: '12px',
                color: 'var(--text-muted)',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
