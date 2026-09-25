'use client';

import React from 'react';
import { radius, colors } from '@/src/design';
import { Badge } from '@/src/components/ui/Badge';

export function PlatformMixSection() {
  const platforms = [
    {
      name: 'LeetCode',
      count: '1,000 Problems',
      focus: 'Classic FAANG technical interview questions and top 100 curated collections.',
      badgeVariant: 'leetcode' as const,
      accent: '#FFA116',
    },
    {
      name: 'Codeforces',
      count: '1,000 Problems',
      focus: 'Competitive algorithmic speed drills, mathematical edge-cases, and rating tiers (800–2400).',
      badgeVariant: 'codeforces' as const,
      accent: '#3B82F6',
    },
    {
      name: 'CodeChef',
      count: '1,000 Problems',
      focus: 'Division-calibrated problem collections (Div 1 through Div 4) and syllabus progression.',
      badgeVariant: 'codechef' as const,
      accent: '#A1887F',
    },
    {
      name: 'GeeksForGeeks',
      count: '1,000 Problems',
      focus: 'Enterprise and service company interview archives with core data structure drills.',
      badgeVariant: 'geeksforgeeks' as const,
      accent: '#34D399',
    },
  ];

  return (
    <section
      style={{
        padding: '72px 20px',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Badge variant="secondary" size="md" style={{ marginBottom: '12px' }}>
          UNIFIED PROBLEM CATALOG
        </Badge>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            margin: '0 0 12px 0',
            color: 'var(--text-primary)',
          }}
        >
          4 Platforms. 1 Cohesive Curriculum.
        </h2>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          Never bounce between four different websites again. Practice 4,000 normalized problems
          unified under 113 core algorithmic patterns.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
        }}
      >
        {platforms.map((p) => (
          <div
            key={p.name}
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: radius.lg,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Badge variant={p.badgeVariant} size="md">
                {p.name}
              </Badge>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                }}
              >
                {p.count}
              </span>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
              {p.focus}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
