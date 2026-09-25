'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { HeroPatternGraph } from './HeroPatternGraph';

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section
      style={{
        position: 'relative',
        padding: '64px 20px 72px 20px',
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
        {/* Left Column: Typography & CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Eyebrow */}
          <div>
            <Badge variant="primary" dot size="md">
              DSA Magna 2.0 • DEVELOPER PLATFORM
            </Badge>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              margin: 0,
              fontFamily: 'var(--font-sans)',
            }}
          >
            MASTER <br />
            DATA STRUCTURES & <br />
            <span style={{ color: 'var(--accent)' }}>ALGORITHMS.</span> <br />
            ONE PATTERN AT A TIME.
          </h1>

          {/* Supporting Statement */}
          <p
            style={{
              fontSize: '16px',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              margin: 0,
              maxWidth: '520px',
              fontFamily: 'var(--font-sans)',
            }}
          >
            Learn algorithmic concepts with verified templates. Practice with adaptive recommendations
            across 4 platforms, and prepare for high-stakes technical interviews with realistic simulations.
          </p>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '14px',
              marginTop: '8px',
            }}
          >
            <Link
              href={isAuthenticated ? '/dashboard' : '/dashboard'}
              style={{ textDecoration: 'none' }}
            >
              <Button variant="primary" size="lg">
                {isAuthenticated ? 'Continue Learning' : 'Start Learning'} <ArrowRight size={16} />
              </Button>
            </Link>

            <Link href="/journey" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="lg">
                <Compass size={16} /> Explore Journey
              </Button>
            </Link>
          </div>

          {/* Supporting Trust Note (Factual) */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              marginTop: '12px',
              paddingTop: '16px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} style={{ color: 'var(--success)' }} /> 4,000 Verified Problems
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} style={{ color: 'var(--success)' }} /> 113 Concrete Patterns
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={13} style={{ color: 'var(--success)' }} /> Zero Guesswork Practice
            </span>
          </div>
        </div>

        {/* Right Column: Hero Visual Knowledge Graph */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HeroPatternGraph />
        </div>
      </div>
    </section>
  );
}
