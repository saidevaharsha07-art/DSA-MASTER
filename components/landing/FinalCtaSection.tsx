'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';

export function FinalCtaSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg-subtle)',
        padding: '84px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Badge variant="primary" dot size="md">
          BEGIN YOUR PRACTICE TODAY
        </Badge>

        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            margin: 0,
            color: 'var(--text-primary)',
            lineHeight: 1.15,
          }}
        >
          Stop guessing what to study next.
        </h2>

        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            margin: 0,
            lineHeight: 1.6,
            maxWidth: '560px',
          }}
        >
          One connected platform for concept mastery, targeted drills, spaced memory retention,
          and realistic technical interview simulations.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            marginTop: '8px',
          }}
        >
          <Link
            href={isAuthenticated ? '/dashboard' : '/signup'}
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
      </div>
    </section>
  );
}
