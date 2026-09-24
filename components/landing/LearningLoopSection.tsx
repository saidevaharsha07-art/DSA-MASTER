'use client';

import React from 'react';
import { BookOpen, Terminal, Timer, RotateCcw, TrendingUp, ArrowRight } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Badge } from '@/src/components/ui/Badge';

export function LearningLoopSection() {
  const steps = [
    {
      step: '01',
      title: 'LEARN',
      subtitle: 'Pattern Concept Academy',
      description: 'Master core intuition, complexity bounds, and verified multi-language templates before touching code.',
      icon: BookOpen,
      accent: 'var(--accent)',
    },
    {
      step: '02',
      title: 'PRACTICE',
      subtitle: 'Adaptive Problem Sprints',
      description: 'Solve targeted problems selected specifically for your current skill edge across 4 major platforms.',
      icon: Terminal,
      accent: 'var(--info)',
    },
    {
      step: '03',
      title: 'INTERVIEW',
      subtitle: 'Realistic Arena Simulation',
      description: 'Run timed technical rounds with escalating difficulty, sandboxed code execution, and factual scorecards.',
      icon: Timer,
      accent: 'var(--warning)',
    },
    {
      step: '04',
      title: 'REVIEW',
      subtitle: 'Spaced Memory Retrieval',
      description: 'Retain learned patterns automatically using mathematical stability curves and spaced revision queues.',
      icon: RotateCcw,
      accent: 'var(--success)',
    },
    {
      step: '05',
      title: 'IMPROVE',
      subtitle: 'Mistake Intelligence',
      description: 'Diagnose runtime blunders, off-by-one errors, and conceptual gaps into permanent strengths.',
      icon: TrendingUp,
      accent: 'var(--accent)',
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
          THE COMPLETE ENGINE
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
          One Connected System. Zero Wasted Practice.
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
          Traditional DSA prep fractures learning across random question lists. DSA Magna connects
          concepts, drills, interviews, and retention into one closed feedback loop.
        </p>
      </div>

      {/* 5-Node Connected Flow Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {steps.map((item, idx) => {
          const Icon = item.icon;

          return (
            <div
              key={item.step}
              style={{
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: radius.lg,
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                position: 'relative',
                transition: 'border-color 0.15s ease, transform 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: item.accent,
                  }}
                >
                  {item.step} //
                </span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: radius.md,
                    backgroundColor: 'var(--bg-subtle)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.accent,
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <div>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    letterSpacing: '0.02em',
                    display: 'block',
                  }}
                >
                  {item.title}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {item.subtitle}
                </span>
                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.45,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
