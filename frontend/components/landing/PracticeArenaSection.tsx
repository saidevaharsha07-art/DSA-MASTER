'use client';

import React from 'react';
import Link from 'next/link';
import { Terminal, ArrowRight, CheckCircle2, Play, Flame, Filter, Sparkles } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

export function PracticeArenaSection() {
  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
        padding: '72px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left: Interactive Practice Arena UI Mockup */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '520px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: radius.lg,
              padding: '24px',
              boxShadow: 'var(--shadow-md)',
              boxSizing: 'border-box',
            }}
          >
            {/* Arena Header simulation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '14px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  PRACTICE ARENA
                </span>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <Badge variant="leetcode" size="sm">LeetCode</Badge>
                <Badge variant="codeforces" size="sm">Codeforces</Badge>
              </div>
            </div>

            {/* Smart Sprint banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: radius.md,
                marginBottom: '16px',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                  Smart Pattern Sprint (5 Problems)
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  Escalating difficulty progression: Easy → Medium
                </span>
              </div>
              <Button variant="primary" size="sm">
                <Play size={12} /> Start Sprint
              </Button>
            </div>

            {/* Recommended Problem Card with Rationale */}
            <div
              style={{
                padding: '16px',
                backgroundColor: 'var(--surface-elevated)',
                border: '1px solid var(--accent)',
                borderRadius: radius.md,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Badge variant="medium">Medium</Badge>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>#15 • 3Sum</span>
                </div>
                <Badge variant="primary" dot size="sm">Recommended</Badge>
              </div>

              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                3Sum (Triplets with Zero Sum)
              </span>

              {/* Rationale Callout */}
              <div
                style={{
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  padding: '8px 10px',
                  backgroundColor: 'var(--bg-subtle)',
                  borderRadius: radius.sm,
                  border: '1px solid var(--border)',
                  lineHeight: 1.4,
                }}
              >
                <strong style={{ color: 'var(--accent)' }}>Why this problem?</strong> You recently solved
                Two Sum II. 3Sum directly extends this pattern with an outer traversal loop.
              </div>
            </div>
          </div>
        </div>

        {/* Right: Feature Highlights & CTA */}
        <div>
          <Badge variant="primary" size="md" style={{ marginBottom: '12px' }}>
            INTENTIONAL PROBLEM DRILLING
          </Badge>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: '0 0 12px 0',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            Practice Arena with explicit purpose.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            Every problem presented includes an authentic algorithmic rationale explaining why it was
            chosen for you today. Run 5-problem sprints, review past mistakes, and practice across all 4 platforms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Adaptive sprints that balance difficulty escalation
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Mistake review queue capturing runtime bugs and edge cases
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Filter by weak areas and difficulty distribution
            </span>
          </div>

          <Link href="/practice" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">
              Enter Practice Arena <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
