'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, Sparkles, Flame, Coins, ArrowRight, X } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';

interface SubmissionResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  verdict: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded' | 'Compile Error' | 'Runtime Error';
  runtimeMs: number;
  memoryMb: number;
  xpEarned: number;
  problemId?: string;
  topic?: string;
  userId?: string;
}

export function SubmissionResultModal({
  isOpen,
  onClose,
  verdict,
  runtimeMs,
  memoryMb,
  xpEarned,
  problemId = 'unknown',
  topic = 'General',
  userId = 'user',
}: SubmissionResultModalProps) {
  const { settings } = useSettings();
  const isLight = settings?.appearance?.theme === 'light';

  if (!isOpen) return null;

  const isSuccess = verdict === 'Accepted';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: isLight ? 'rgba(15, 23, 42, 0.6)' : 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '28px',
          borderRadius: '20px',
          background: isLight ? '#FFFFFF' : 'var(--surface, #1E293B)',
          border: isSuccess
            ? '2px solid #10B981'
            : '2px solid #EF4444',
          boxShadow: isLight
            ? '0 20px 50px rgba(0, 0, 0, 0.15)'
            : '0 20px 60px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          color: 'var(--text-primary)',
        }}
      >
        {/* Status Icon */}
        <div style={{
          padding: '14px',
          borderRadius: '50%',
          background: isSuccess ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          border: isSuccess ? '2px solid #10B981' : '2px solid #EF4444',
        }}>
          {isSuccess ? <CheckCircle2 size={40} style={{ color: '#10B981' }} /> : <XCircle size={40} style={{ color: '#EF4444' }} />}
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: isSuccess ? '#10B981' : '#EF4444' }}>
            {verdict}
          </h2>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>
            {isSuccess ? 'All testcases evaluated and passed successfully!' : 'Solution failed on one or more testcases.'}
          </span>
        </div>

        {/* Stats Grid */}
        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ padding: '10px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Runtime</span>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--text-primary)' }}>{runtimeMs} ms</div>
          </div>

          <div style={{ padding: '10px', borderRadius: '10px', background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.04)', border: '1px solid var(--border)' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>Memory</span>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--primary)' }}>{memoryMb} MB</div>
          </div>
        </div>

        {/* XP Rewards Banner */}
        {isSuccess && xpEarned > 0 && (
          <div style={{ width: '100%', padding: '12px', borderRadius: '12px', background: isLight ? '#FFFBEB' : 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <Sparkles size={16} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#D97706' }}>+{xpEarned} XP Earned</span>
          </div>
        )}

        {/* Post-Practice Unified Recommendation Card */}
        {(() => {
          const rec = RecommendationEngineService.getPostPracticeRecommendation(userId, {
            problemId,
            topic,
            outcome: isSuccess ? 'SOLVED' : 'FAILED',
            durationSeconds: Math.round(runtimeMs / 1000) || 30,
            failCount: isSuccess ? 0 : 1,
          });

          return (
            <div style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textAlign: 'left',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  color: isSuccess ? '#10B981' : '#F59E0B',
                  letterSpacing: '0.05em',
                }}>
                  Next Recommended Action • {rec.actionType}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>~{rec.estimatedMinutes}m</span>
              </div>
              <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {rec.title}
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {rec.explanation}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', paddingTop: '6px', borderTop: '1px solid var(--border)' }}>
                <a
                  href={`/mentor?context=recommendation&topic=${encodeURIComponent(rec.topic)}&action=${rec.actionType}`}
                  style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textDecoration: 'none' }}
                >
                  Ask Mentor
                </a>
                <a
                  href={rec.destinationRoute}
                  onClick={() => RecommendationEngineService.recordStart(userId, rec.id)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: isSuccess ? '#10B981' : '#6366F1',
                    color: '#FFFFFF',
                    fontSize: '11px',
                    fontWeight: 800,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <span>Continue</span>
                  <ArrowRight size={11} />
                </a>
              </div>
            </div>
          );
        })()}

        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            padding: '10px',
            borderRadius: '10px',
            background: isLight ? '#F1F5F9' : 'rgba(255,255,255,0.1)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
          }}
        >
          Dismiss
        </button>

      </motion.div>
    </div>
  );
}
