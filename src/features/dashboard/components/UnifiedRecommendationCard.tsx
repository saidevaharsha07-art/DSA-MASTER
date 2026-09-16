'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Compass, ArrowRight, Zap, Clock, Sparkles } from 'lucide-react';
import { PrimaryRecommendation } from '../services/dashboard-adapter.service';

interface UnifiedRecommendationCardProps {
  recommendation: PrimaryRecommendation;
  isLight: boolean;
}

export function UnifiedRecommendationCard({ recommendation, isLight }: UnifiedRecommendationCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return {
          bg: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.15)',
          border: isLight ? '#A7F3D0' : 'rgba(16, 185, 129, 0.3)',
          text: '#10B981',
        };
      case 'medium':
        return {
          bg: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.15)',
          border: isLight ? '#FDE68A' : 'rgba(245, 158, 11, 0.3)',
          text: '#F59E0B',
        };
      case 'hard':
        return {
          bg: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.15)',
          border: isLight ? '#FECACA' : 'rgba(239, 68, 68, 0.3)',
          text: '#EF4444',
        };
      default:
        return {
          bg: isLight ? '#F0F9FF' : 'rgba(56, 189, 248, 0.15)',
          border: isLight ? '#BAE6FD' : 'rgba(56, 189, 248, 0.3)',
          text: '#0284C7',
        };
    }
  };

  const diffStyle = getDifficultyColor(recommendation.difficulty);

  return (
    <div
      style={{
        padding: '24px 28px',
        borderRadius: '24px',
        background: isLight
          ? 'linear-gradient(135deg, #FFFFFF 0%, #F0F9FF 50%, #F8FAFC 100%)'
          : 'linear-gradient(135deg, rgba(14, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.85) 60%, rgba(8, 13, 24, 0.98) 100%)',
        border: isLight
          ? '1.5px solid rgba(56, 189, 248, 0.35)'
          : '1.5px solid rgba(56, 189, 248, 0.3)',
        boxShadow: isLight
          ? '0 12px 36px rgba(56, 189, 248, 0.1), 0 2px 8px rgba(0, 0, 0, 0.04)'
          : '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '-40px',
          right: '-40px',
          width: '240px',
          height: '240px',
          background: isLight
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
            }}
          >
            <Compass size={18} />
          </div>
          <div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: isLight ? '#0284C7' : '#38BDF8',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              RECOMMENDED NEXT STEP
            </span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', display: 'block' }}>
              Synthesized from Roadmap, Practice Telemetry, and Mistake Analysis
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '8px',
              background: diffStyle.bg,
              border: `1px solid ${diffStyle.border}`,
              color: diffStyle.text,
            }}
          >
            {recommendation.difficulty}
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '8px',
              background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.12)',
              border: isLight ? '1px solid #FDE68A' : '1px solid rgba(245, 158, 11, 0.3)',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Zap size={12} /> +{recommendation.xp} XP
          </span>
        </div>
      </div>

      {/* Problem Title & Rationale */}
      <div style={{ zIndex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontSize: '20px',
            fontWeight: 900,
            color: 'var(--text-primary, #FFF)',
            letterSpacing: '-0.01em',
          }}
        >
          {recommendation.title}
        </h3>
        <p
          style={{
            margin: '6px 0 0 0',
            fontSize: '13px',
            lineHeight: '1.5',
            color: isLight ? '#475569' : '#CBD5E1',
          }}
        >
          {recommendation.reason}
        </p>
      </div>

      {/* Footer Details & Action CTA */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          paddingTop: '8px',
          borderTop: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted, #94A3B8)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Sparkles size={14} style={{ color: '#0284C7' }} /> Pattern: <strong style={{ color: 'var(--text-primary, #FFF)' }}>{recommendation.topic}</strong>
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} /> Est. ~{recommendation.estimatedMinutes} min
          </span>
        </div>

        <Link href={recommendation.url} style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}
            whileTap={{ scale: 0.96 }}
            type="button"
            style={{
              padding: '10px 22px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
            }}
          >
            <span>{recommendation.actionLabel}</span>
            <ArrowRight size={15} />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
