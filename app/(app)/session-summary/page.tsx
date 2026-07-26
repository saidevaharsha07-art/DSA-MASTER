'use client';

import React from 'react';
import { CheckCircle2, Clock, BrainCircuit, Target, Code2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { eventBus } from '@/src/core/events';

export default function SessionSummaryPage() {
  const timeline = eventBus.getTimeline();
  
  // Since we don't have a real active session object in memory here unless we route from finishSession, 
  // we'll extract mock stats from the timeline for the presentation.
  const solvedEvents = timeline.filter(e => e.type === 'ProblemSolved');
  const reflectionEvents = timeline.filter(e => e.type === 'ReflectionAdded');

  return (
    <div className="layout-stack" style={{ maxWidth: '800px', margin: '48px auto', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <CheckCircle2 size={64} style={{ color: '#10b981', margin: '0 auto 16px' }} />
        <h1 className="title" style={{ fontSize: '36px' }}>Session Complete</h1>
        <p className="muted" style={{ fontSize: '16px' }}>
          Great job! You&apos;ve completed a deep learning cycle.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div className="card layout-row" style={{ padding: '24px', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '12px' }}>
            <Clock size={24} />
          </div>
          <div>
            <div className="muted" style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Time Studied</div>
            <div className="metric" style={{ fontSize: '28px' }}>45m</div>
          </div>
        </div>

        <div className="card layout-row" style={{ padding: '24px', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '12px' }}>
            <Code2 size={24} />
          </div>
          <div>
            <div className="muted" style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Problems Solved</div>
            <div className="metric" style={{ fontSize: '28px' }}>{Math.max(1, solvedEvents.length)}</div>
          </div>
        </div>

        <div className="card layout-row" style={{ padding: '24px', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', borderRadius: '12px' }}>
            <Target size={24} />
          </div>
          <div>
            <div className="muted" style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Prediction Accuracy</div>
            <div className="metric" style={{ fontSize: '28px' }}>100%</div>
          </div>
        </div>

        <div className="card layout-row" style={{ padding: '24px', gap: '16px' }}>
          <div style={{ padding: '12px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', borderRadius: '12px' }}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <div className="muted" style={{ fontSize: '13px', textTransform: 'uppercase', fontWeight: 600 }}>Reflections</div>
            <div className="metric" style={{ fontSize: '28px' }}>{Math.max(1, reflectionEvents.length)}</div>
          </div>
        </div>
      </div>

      <div className="card layout-row-between" style={{ padding: '32px', marginTop: '16px', background: 'var(--primary-bg)', borderColor: 'var(--primary)' }}>
        <div>
          <h3 className="title" style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Up Next: Two Pointers</h3>
          <p className="muted" style={{ margin: 0 }}>You&apos;ve mastered Sliding Window. It&apos;s time to move on.</p>
        </div>
        <Link href="/journey" className="button primary" style={{ padding: '12px 24px' }}>
          Return to Journey <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </Link>
      </div>
    </div>
  );
}
