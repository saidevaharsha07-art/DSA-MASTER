'use client';

import React from 'react';
import Link from 'next/link';
import { radius, colors } from '@/src/design';
import { Badge } from '@/src/components/ui/Badge';

export function LandingFooter() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        backgroundColor: 'var(--bg)',
        padding: '56px 20px 36px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Top footer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Brand & Platform Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                DSA <span style={{ color: 'var(--accent)' }}>MASTER</span>
              </span>
            </Link>

            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
              The developer-grade platform for mastering Data Structures & Algorithms one pattern at a time.
            </p>

            <div style={{ marginTop: '4px' }}>
              <Badge variant="success" dot size="sm">
                Systems Operational • 4,000 Problems
              </Badge>
            </div>
          </div>

          {/* Column 1: Platform Navigation */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              Core Platform
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <Link href="/dashboard" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Command Center
                </Link>
              </li>
              <li>
                <Link href="/journey" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Curriculum Journey
                </Link>
              </li>
              <li>
                <Link href="/practice" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Practice Arena
                </Link>
              </li>
              <li>
                <Link href="/interview" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Interview Arena
                </Link>
              </li>
              <li>
                <Link href="/study-plan" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Daily Study Planner
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Supported Sources */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              Curriculum Sources
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <Link href="/practice" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  LeetCode (1,000 problems)
                </Link>
              </li>
              <li>
                <Link href="/practice" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Codeforces (1,000 problems)
                </Link>
              </li>
              <li>
                <Link href="/practice" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  CodeChef (1,000 problems)
                </Link>
              </li>
              <li>
                <Link href="/practice" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  GeeksForGeeks (1,000 problems)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer Resources */}
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                display: 'block',
                marginBottom: '14px',
              }}
            >
              Developer Resources
            </span>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <li>
                <Link href="/design-system" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Design System Catalog
                </Link>
              </li>
              <li>
                <Link href="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Developer Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div
          style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            © {new Date().getFullYear()} DSA MASTER. High-performance developer platform.
          </span>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            v2.0-RELEASE // 25 AREAS // 113 PATTERNS
          </span>
        </div>
      </div>
    </footer>
  );
}
