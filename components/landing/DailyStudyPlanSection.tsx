'use client';

import React from 'react';
import Link from 'next/link';
import { CalendarCheck, ArrowRight, Clock, CheckCircle2, RotateCcw, BookOpen, Terminal, Timer } from 'lucide-react';
import { radius, colors } from '@/src/design';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { ProgressBar } from '@/src/components/ui/ProgressBar';

export function DailyStudyPlanSection() {
  const planItems = [
    {
      time: '10 min',
      type: 'REVISION',
      title: 'Monotonic Stack Boundary Decay',
      badge: 'SRS Review',
      badgeVariant: 'warning' as const,
      icon: RotateCcw,
      accent: 'var(--warning)',
    },
    {
      time: '20 min',
      type: 'LEARN',
      title: 'Sliding Window (Dynamic Sizing Invariants)',
      badge: 'Concept Academy',
      badgeVariant: 'primary' as const,
      icon: BookOpen,
      accent: 'var(--accent)',
    },
    {
      time: '20 min',
      type: 'PRACTICE',
      title: 'Longest Substring Without Repeating Characters',
      badge: 'Medium • LeetCode #3',
      badgeVariant: 'leetcode' as const,
      icon: Terminal,
      accent: '#FFA116',
    },
    {
      time: '10 min',
      type: 'INTERVIEW',
      title: 'Quick Screen Simulation (1 Problem)',
      badge: 'Timed Sprint',
      badgeVariant: 'secondary' as const,
      icon: Timer,
      accent: 'var(--success)',
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
        {/* Left: Study Plan Card Mockup */}
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
            {/* Header simulation */}
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
                <CalendarCheck size={16} style={{ color: 'var(--accent)' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  TODAY&apos;S ADAPTIVE PLAN
                </span>
              </div>
              <Badge variant="primary" dot size="sm">
                60 MIN BUDGET
              </Badge>
            </div>

            {/* Progress bar */}
            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Daily Schedule Progress</span>
                <span style={{ fontWeight: 700, color: 'var(--accent)' }}>0 / 4 Activities</span>
              </div>
              <ProgressBar progress={0} />
            </div>

            {/* 4 concrete activities */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {planItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      borderRadius: radius.md,
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: radius.sm,
                          backgroundColor: 'var(--surface)',
                          border: '1px solid var(--border)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.accent,
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block' }}>
                          {item.title}
                        </span>
                        <Badge variant={item.badgeVariant} size="sm">
                          {item.badge}
                        </Badge>
                      </div>
                    </div>

                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Explanation & CTA */}
        <div>
          <Badge variant="primary" size="md" style={{ marginBottom: '12px' }}>
            DAILY STUDY PLANNER
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
            What should you study today? Answered in one plan.
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            Set your available time budget: 30m, 45m, 60m, or 90m. The planner constructs an exact,
            sequenced agenda balancing spaced memory retrieval, new concept mastery, problem practice, and interview preparation.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Eliminates decision fatigue before every study session
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Dynamic mid-day replanning if your schedule changes
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary)' }}>
              <CheckCircle2 size={15} style={{ color: 'var(--success)' }} /> Objective end-of-day summary tracking real minutes spent
            </span>
          </div>

          <Link href="/study-plan" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="lg">
              Build My Study Plan <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
