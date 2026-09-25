'use client';

import React from 'react';
import {
  Cpu,
  Brain,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GitBranch,
  Target,
} from 'lucide-react';
import { radius, colors, typography, shadows } from '@/src/design';
import { Badge } from '@/src/components/ui/Badge';
import { Card } from '@/src/components/ui/Card';

export function AdaptiveEngineSection() {
  const signals = [
    {
      title: 'Mastery State',
      detail: 'Evaluates current proficiency level across 113 patterns to prevent redundant drills.',
    },
    {
      title: 'Mistake Intelligence',
      detail: 'Detects recurring runtime blunders, boundary errors, and edge-case oversights.',
    },
    {
      title: 'Spaced Repetition Decay',
      detail: 'Calculates memory retention curves to schedule reviews right before you forget.',
    },
    {
      title: 'Curriculum Roadmap',
      detail: 'Enforces prerequisite readiness so you never face a problem you aren’t primed for.',
    },
    {
      title: 'Recent Performance',
      detail: 'Monitors solve speed and test attempt iterations to dynamically scale difficulty.',
    },
  ];

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
        {/* Left: Intelligence Philosophy & Signals */}
        <div>
          <Badge variant="primary" dot size="md" style={{ marginBottom: '12px' }}>
            ADAPTIVE INTELLIGENCE
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
            Your practice should adapt to you.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            Solving 500 random problems does not guarantee interview readiness. DSA Magna synthesizes
            five real-time telemetry inputs to deliver the single most optimal problem for your exact skill edge.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {signals.map((sig, idx) => (
              <div
                key={sig.title}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border-strong)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    flexShrink: 0,
                    marginTop: '2px',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <strong
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-primary)',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    {sig.title}
                  </strong>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {sig.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Simulated Recommendation Pipeline Card */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: radius.lg,
              padding: '24px',
              boxShadow: 'var(--shadow-md)',
              boxSizing: 'border-box',
            }}
          >
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
                <Cpu size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  HARMONIZER ENGINE
                </span>
              </div>
              <Badge variant="success" dot size="sm">
                OPTIMAL MATCH
              </Badge>
            </div>

            {/* Target Output Card */}
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: radius.md,
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Badge variant="medium">Medium</Badge>
                <Badge variant="leetcode">LeetCode #167</Badge>
              </div>
              <h3
                style={{
                  margin: '0 0 4px 0',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                }}
              >
                Two Sum II - Input Array Is Sorted
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                Target: Opposite Direction Pointers with O(1) space guarantee.
              </p>
            </div>

            {/* Rationale breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Why this problem right now?
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: radius.sm,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Pattern Skill Gap:</span>
                <strong style={{ color: 'var(--accent)' }}>Opposite Pointers (Novice)</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: radius.sm,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Roadmap State:</span>
                <strong style={{ color: 'var(--success)' }}>Unblocked Prerequisite</strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: radius.sm,
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ color: 'var(--text-secondary)' }}>Mistake Mitigation:</span>
                <strong style={{ color: 'var(--warning)' }}>Pointer Invariance Drill</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
