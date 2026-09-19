'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, GitBranch, Code2, ArrowRight, BookOpen, Terminal } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';

export function JourneyTaxonomySection() {
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
        {/* Left Explanation & Taxonomy Breakdown */}
        <div>
          <Badge variant="secondary" size="md" style={{ marginBottom: '12px' }}>
            CURRICULUM ARCHITECTURE
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
            A 5-tier taxonomy that makes 4,000 problems manageable.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '28px',
            }}
          >
            Instead of wandering through an unstructured list of questions, master algorithms through
            a disciplined hierarchical structure that builds from foundational memory layouts to complex paradigms.
          </p>

          <Link href="/journey" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">
              Explore the Journey <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        {/* Right: Interactive Taxonomy Tree Mockup */}
        <div>
          <div
            style={{
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              borderRadius: radius.lg,
              padding: '24px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Level 1: Learning Area */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: radius.md,
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={16} style={{ color: 'var(--accent)' }} />
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    1. Learning Area
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                    Arrays & Hashing
                  </span>
                </div>
              </div>
              <Badge variant="outline" size="sm">25 Areas</Badge>
            </div>

            {/* Level 2: Subtopic */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: radius.md,
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                marginLeft: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <GitBranch size={16} style={{ color: 'var(--text-secondary)' }} />
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    2. Subtopic
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                    Two Pointers & Traversal
                  </span>
                </div>
              </div>
              <Badge variant="outline" size="sm">61 Subtopics</Badge>
            </div>

            {/* Level 3: Pattern */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: radius.md,
                backgroundColor: 'var(--accent-subtle)',
                border: '1px solid var(--accent)',
                marginLeft: '32px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Code2 size={16} style={{ color: 'var(--accent)' }} />
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase' }}>
                    3. Algorithmic Pattern
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
                    Opposite Direction Pointers
                  </span>
                </div>
              </div>
              <Badge variant="primary" size="sm">113 Patterns</Badge>
            </div>

            {/* Level 4: Concept Academy & Practice */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 14px',
                borderRadius: radius.md,
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                marginLeft: '48px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={16} style={{ color: 'var(--success)' }} />
                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    4. Concept Academy & Practice
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
                    Invariants, Templates & 417 Problems
                  </span>
                </div>
              </div>
              <Badge variant="success" size="sm">Ready to Drill</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
