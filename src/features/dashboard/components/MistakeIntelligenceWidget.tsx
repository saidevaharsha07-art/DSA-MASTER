'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';
import { MistakeIntelligenceState } from '../services/dashboard-adapter.service';

interface MistakeIntelligenceWidgetProps {
  mistakeIntelligence: MistakeIntelligenceState;
  isLight: boolean;
}

export function MistakeIntelligenceWidget({ mistakeIntelligence, isLight }: MistakeIntelligenceWidgetProps) {
  const { hasData, commonPatterns, summaryNote, totalMistakesAnalyzed } = mistakeIntelligence;

  return (
    <div
      style={{
        padding: '24px 28px',
        borderRadius: '22px',
        background: isLight ? '#FFFFFF' : 'var(--card)',
        border: isLight ? '1.5px solid rgba(244, 63, 94, 0.25)' : '1px solid var(--border)',
        boxShadow: isLight
          ? '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
          : '0 10px 30px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(244, 63, 94, 0.15)',
              border: '1px solid rgba(244, 63, 94, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F43F5E',
            }}
          >
            <ShieldAlert size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
              MISTAKE INTELLIGENCE
            </h4>
            <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 600 }}>
              Grounded error patterns &amp; test failure remediation
            </span>
          </div>
        </div>

        {hasData && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '8px',
              background: isLight ? '#FFF1F2' : 'rgba(244, 63, 94, 0.15)',
              border: isLight ? '1px solid #FECDD3' : '1px solid rgba(244, 63, 94, 0.3)',
              color: '#F43F5E',
            }}
          >
            {totalMistakesAnalyzed} Struggle Events Analyzed
          </span>
        )}
      </div>

      {/* Summary Note */}
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '10px',
          background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.025)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '12px',
          color: isLight ? '#475569' : '#CBD5E1',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Sparkles size={14} style={{ color: '#F43F5E', flexShrink: 0 }} />
        <span>{summaryNote}</span>
      </div>

      {/* Mistake Pattern Cards */}
      {hasData && commonPatterns.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {commonPatterns.map((m) => (
            <div
              key={m.id}
              style={{
                padding: '14px 16px',
                borderRadius: '14px',
                background: isLight ? '#FFF1F2' : 'rgba(244, 63, 94, 0.05)',
                border: isLight ? '1px solid #FECDD3' : '1px solid rgba(244, 63, 94, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={15} style={{ color: '#F43F5E' }} />
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)' }}>
                    {m.topic}
                  </strong>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>• {m.pattern}</span>
                </div>

                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: isLight ? '#FFE4E6' : 'rgba(244, 63, 94, 0.2)',
                    color: '#E11D48',
                    border: '1px solid rgba(244, 63, 94, 0.3)',
                  }}
                >
                  {m.failureCount} Repeated {m.failureType}
                </span>
              </div>

              <p style={{ margin: 0, fontSize: '12px', color: isLight ? '#475569' : '#CBD5E1', lineHeight: '1.4' }}>
                {m.observation}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '8px',
                  paddingTop: '6px',
                  borderTop: isLight ? '1px solid #FFE4E6' : '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '11px',
                }}
              >
                <span style={{ color: isLight ? '#0F766E' : '#2DD4BF', fontWeight: 600 }}>
                  💡 <strong>Remedy:</strong> {m.remedy}
                </span>

                <Link href={m.practiceUrl} style={{ textDecoration: 'none' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#F43F5E',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                    }}
                  >
                    Targeted Practice <ArrowRight size={12} />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State for Fresh Accounts */
        <div
          style={{
            padding: '28px 20px',
            borderRadius: '14px',
            background: isLight ? '#F0FDF4' : 'rgba(255, 255, 255, 0.02)',
            border: isLight ? '1px dashed #86EFAC' : '1px dashed rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '8px',
          }}
        >
          <CheckCircle2 size={24} style={{ color: '#10B981' }} />
          <strong style={{ fontSize: '14px', color: 'var(--text-primary, #FFF)' }}>
            No Recurring Errors Detected
          </strong>
          <span style={{ fontSize: '12px', color: 'var(--text-muted, #94A3B8)', maxWidth: '340px' }}>
            As you practice in the Arena, this module will automatically detect test case pitfalls, time limits, and edge case struggles.
          </span>
          <Link href="/practice" style={{ textDecoration: 'none', marginTop: '6px' }}>
            <span style={{ fontSize: '12px', color: '#0284C7', fontWeight: 800 }}>
              Start Solving in Arena →
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}
