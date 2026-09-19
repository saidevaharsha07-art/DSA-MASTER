'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Layers,
  GitBranch,
  Code2,
  CheckCircle2,
  TrendingUp,
  Terminal,
  Activity,
  ArrowDown,
} from 'lucide-react';
import { radius, colors, typography, shadows } from '@/src/design';
import { Badge } from '@/src/components/ui/Badge';

export function HeroPatternGraph() {
  const steps = [
    {
      level: 'Area',
      title: 'Arrays & Hashing',
      metric: '417 Problems',
      icon: Layers,
      accent: 'var(--text-secondary)',
    },
    {
      level: 'Subtopic',
      title: 'Two Pointers & Traversal',
      metric: '4 Core Patterns',
      icon: GitBranch,
      accent: 'var(--accent)',
    },
    {
      level: 'Pattern',
      title: 'Opposite Direction Pointers',
      metric: 'O(N) Time • O(1) Space',
      icon: Code2,
      accent: 'var(--accent)',
      highlight: true,
    },
    {
      level: 'Practice',
      title: 'Targeted Adaptive Sprint',
      metric: '5 Problems Curated',
      icon: Terminal,
      accent: 'var(--warning)',
    },
    {
      level: 'Mastery',
      title: 'Concept Retention (SRS)',
      metric: 'Proficient • Stability 94%',
      icon: TrendingUp,
      accent: 'var(--success)',
    },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '560px',
        margin: '0 auto',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: radius.lg,
        padding: '24px',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Header bar showing terminal / tool simulation */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          paddingBottom: '14px',
          marginBottom: '20px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--success)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            TAXONOMY ENGINE // ACTIVE PATH
          </span>
        </div>

        <Badge variant="outline" size="sm">
          GRCh / 113 PATTERNS
        </Badge>
      </div>

      {/* Nodes progression flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'relative' }}>
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isHighlighted = step.highlight;

          return (
            <React.Fragment key={step.level}>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.2 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: isHighlighted ? '12px 14px' : '10px 14px',
                  borderRadius: radius.md,
                  backgroundColor: isHighlighted
                    ? 'var(--accent-subtle)'
                    : 'var(--bg-subtle)',
                  border: isHighlighted
                    ? '1px solid var(--accent)'
                    : '1px solid var(--border)',
                  boxShadow: isHighlighted ? '0 0 12px var(--accent-subtle)' : 'none',
                  position: 'relative',
                  transition: 'border-color 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: radius.sm,
                      backgroundColor: 'var(--surface)',
                      border: `1px solid ${isHighlighted ? 'var(--accent)' : 'var(--border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: step.accent,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} />
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                          color: isHighlighted ? 'var(--accent)' : 'var(--text-muted)',
                        }}
                      >
                        {step.level}
                      </span>
                      {isHighlighted && (
                        <span
                          style={{
                            fontSize: '9px',
                            fontWeight: 700,
                            padding: '1px 5px',
                            borderRadius: radius.full,
                            backgroundColor: 'var(--accent)',
                            color: '#0F172A',
                          }}
                        >
                          ACTIVE FOCUS
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        display: 'block',
                      }}
                    >
                      {step.title}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: isHighlighted ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontWeight: 500,
                  }}
                >
                  {step.metric}
                </span>
              </motion.div>

              {/* Connecting indicator between nodes */}
              {idx < steps.length - 1 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '-4px 0',
                  }}
                >
                  <div
                    style={{
                      width: '1px',
                      height: '10px',
                      backgroundColor: 'var(--border-strong)',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer telemetry bar */}
      <div
        style={{
          marginTop: '18px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={12} style={{ color: 'var(--accent)' }} /> Invariant: Converging Pointers
        </span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>Next: Two Sum II #167</span>
      </div>
    </div>
  );
}
