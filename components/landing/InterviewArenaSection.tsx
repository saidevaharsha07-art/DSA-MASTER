'use client';

import React from 'react';
import Link from 'next/link';
import { Timer, ArrowRight, CheckCircle2, Shield, Play, Terminal, Check } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

export function InterviewArenaSection() {
  return (
    <section
      style={{
        padding: '72px 20px',
        maxWidth: '1280px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left: Product Information */}
        <div>
          <Badge variant="secondary" size="md" style={{ marginBottom: '12px' }}>
            SIMULATION ENGINE
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
            Realistic Technical Interview Simulations.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            Prepare under real pressure. Interview Arena runs timed technical coding rounds
            with escalating difficulty, hidden patterns, sandboxed code execution, and objective scorecards.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> 4 realistic session modes: Quick Screen, Technical, Onsite, & Comprehensive
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Concealed pattern names with progressive hints to mirror real interviews
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Factual scorecards measuring time-to-first-test, accuracy, and approach notes
            </span>
          </div>

          <Link href="/interview" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">
              Try Interview Arena <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Right: Simulated Interview Arena UI Card */}
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
            {/* Header simulation with live countdown clock */}
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
                <Timer size={16} style={{ color: 'var(--warning)' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ONSITE ROUND (45 MIN)
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  fontWeight: 700,
                  color: 'var(--warning)',
                  backgroundColor: 'var(--bg-subtle)',
                  padding: '3px 8px',
                  borderRadius: radius.sm,
                  border: '1px solid var(--border)',
                }}
              >
                28:42 REMAINING
              </div>
            </div>

            {/* Problem progression steps */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <div
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: radius.sm,
                  backgroundColor: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  fontSize: '11px',
                  color: '#10B981',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Check size={12} /> 1. Easy (Solved)
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: radius.sm,
                  backgroundColor: 'var(--accent-subtle)',
                  border: '1px solid var(--accent)',
                  fontSize: '11px',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                }}
              >
                2. Medium (Active)
              </div>
              <div
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: radius.sm,
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                }}
              >
                3. Hard (Next)
              </div>
            </div>

            {/* Interviewer Milestones Checklist Simulation */}
            <div
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                borderRadius: radius.md,
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Interviewer Guidance Milestones
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--success)' }} /> Clarified edge cases & constraint boundaries
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-primary)' }}>
                <CheckCircle2 size={13} style={{ color: 'var(--success)' }} /> Stated Big-O bounds: O(N log N) / O(1) space
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <div style={{ width: '13px', height: '13px', borderRadius: '50%', border: '1px solid var(--border-strong)' }} /> Sandboxed dry-run verification
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
