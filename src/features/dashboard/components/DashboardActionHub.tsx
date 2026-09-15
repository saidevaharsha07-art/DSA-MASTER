'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Play,
  ArrowRight,
  Target,
  BarChart3,
  PieChart,
  Lock,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle2,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  Flame,
  Zap,
} from 'lucide-react';
import { DashboardSummary } from '../services/dashboard-adapter.service';
import { useSettings } from '@/src/context/SettingsContext';

interface DashboardActionHubProps {
  summary: DashboardSummary;
}

export function DashboardActionHub({ summary }: DashboardActionHubProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  const {
    continueLearning,
    todayFocus,
    performanceInsights,
    needsRevision,
    weeklyProgress,
    platformSnapshot,
    recentActivity,
  } = summary;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', width: '100%' }}>
      {/* ── 1. HERO ACTION: CONTINUE LEARNING ───────────────────────── */}
      <div
        style={{
          padding: '24px 28px',
          borderRadius: '22px',
          background: isLight
            ? `linear-gradient(135deg, #FFFFFF 0%, ${continueLearning.platformColor}08 50%, #F8FAFC 100%)`
            : `radial-gradient(ellipse at 20% 20%, ${continueLearning.platformColor}18 0%, var(--card) 80%)`,
          border: isLight
            ? `1.5px solid ${continueLearning.platformColor}40`
            : `1.5px solid ${continueLearning.platformColor}55`,
          boxShadow: isLight
            ? `0 12px 36px ${continueLearning.platformColor}12, 0 2px 8px rgba(0, 0, 0, 0.04)`
            : `0 14px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.08)`,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  color: continueLearning.platformColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  background: `${continueLearning.platformColor}1F`,
                  padding: '3px 9px',
                  borderRadius: '6px',
                  border: `1px solid ${continueLearning.platformColor}44`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Zap size={12} /> {continueLearning.platformName} · {continueLearning.platformTagline}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>
                Active Campaign Node
              </span>
            </div>

            <h3 style={{ margin: '8px 0 2px 0', fontSize: '22px', fontWeight: 900, color: 'var(--text-primary, #FFF)' }}>
              {continueLearning.kingdomTitle}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary, #CBD5E1)', fontWeight: 600 }}>
              Next pattern: <strong style={{ color: continueLearning.platformColor }}>{continueLearning.nextPattern}</strong> · Estimated: {continueLearning.estimatedTime}
            </span>
          </div>

          <Link href={continueLearning.url} style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: `0 0 24px ${continueLearning.platformColor}77` }}
              whileTap={{ scale: 0.96 }}
              type="button"
              style={{
                padding: '14px 28px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${continueLearning.platformColor}, ${continueLearning.platformColor}DD)`,
                border: 'none',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: `0 8px 24px ${continueLearning.platformColor}44`,
              }}
            >
              Continue Learning <ArrowRight size={17} strokeWidth={2.5} />
            </motion.button>
          </Link>
        </div>

        {/* Progress Bar & Solved Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '12px' }}>
            <span style={{ color: 'var(--text-secondary, #94A3B8)', fontWeight: 700 }}>
              Realm Progress: <strong style={{ color: 'var(--text-primary, #FFF)' }}>{continueLearning.solvedCount} / {continueLearning.totalCount} problems completed</strong>
            </span>
            <strong style={{ color: continueLearning.platformColor, fontWeight: 900, fontSize: '13px' }}>
              {continueLearning.percentage}%
            </strong>
          </div>
          <div
            style={{
              width: '100%',
              height: '8px',
              borderRadius: '4px',
              background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${continueLearning.percentage}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${continueLearning.platformColor}, #38BDF8)`,
                boxShadow: `0 0 12px ${continueLearning.platformColor}`,
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── 2. ROW 1: TODAY'S FOCUS & PERFORMANCE INSIGHTS ───────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          width: '100%',
        }}
      >
        {/* CARD A: TODAY'S FOCUS */}
        <div style={moduleCardStyle(isLight, 'rgba(245, 158, 11, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#F59E0B')}>
                <Target size={18} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>TODAY&apos;S FOCUS</h4>
                <span style={moduleSubheaderStyle(isLight)}>Daily tactical practice goal</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 800 }}>
              {todayFocus.percentage}% Done
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '12px',
                background: isLight ? '#FFFBEB' : 'rgba(255, 255, 255, 0.03)',
                border: isLight ? '1px solid #FDE68A' : '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Tactical Target
              </span>
              <h5 style={{ margin: '4px 0 2px 0', fontSize: '15px', fontWeight: 900, color: 'var(--text-primary, #FFF)' }}>
                {todayFocus.targetTitle}
              </h5>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary, #CBD5E1)', display: 'block', margin: '3px 0' }}>
                {todayFocus.reason}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>
                Pattern: <strong style={{ color: '#F59E0B' }}>{todayFocus.recommendedTopic}</strong> · Est: {todayFocus.estimatedMinutes} min
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary, #CBD5E1)', fontWeight: 700 }}>
                Progress: <strong style={{ color: 'var(--text-primary, #FFF)' }}>{todayFocus.currentSolves} / {todayFocus.targetSolves}</strong>
              </span>
              <Link href={todayFocus.url} style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  style={actionBtnStyle('#F59E0B')}
                >
                  Start Practice <ChevronRight size={15} />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>

        {/* CARD B: PLATFORM PERFORMANCE ANALYTICS */}
        <div style={moduleCardStyle(isLight, 'rgba(56, 189, 248, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#0284C7')}>
                <PieChart size={18} style={{ color: '#0284C7' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>PLATFORM PERFORMANCE</h4>
                <span style={moduleSubheaderStyle(isLight)}>Canonical solved share &amp; platform coverage</span>
              </div>
            </div>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                border: isLight ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '11px',
                fontWeight: 900,
                color: isLight ? '#0284C7' : '#FFF',
              }}
            >
              {summary.playerHud.solvedCount} Total Solved
            </div>
          </div>

          {/* Donut Chart & 4-Platform Breakdown */}
          <PlatformPerformanceBreakdown
            platformSnapshot={platformSnapshot}
            totalSolved={summary.playerHud.solvedCount}
            isLight={isLight}
          />
        </div>
      </div>

      {/* ── 3. ROW 2: NEEDS REVISION & WEEKLY PROGRESS ──────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          width: '100%',
        }}
      >
        {/* CARD C: NEEDS REVISION */}
        <div style={moduleCardStyle(isLight, 'rgba(236, 72, 153, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#EC4899')}>
                <RefreshCw size={18} style={{ color: '#EC4899' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>NEEDS REVISION</h4>
                <span style={moduleSubheaderStyle(isLight)}>SRS decay &amp; spaced repetition priorities</span>
              </div>
            </div>
            <Link href="/revision" style={{ fontSize: '11px', color: '#EC4899', fontWeight: 800, textDecoration: 'none' }}>
              Open Arena →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {needsRevision.hasRevisionData && needsRevision.items.length > 0 ? (
              needsRevision.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: isLight ? '#FEF2F2' : 'rgba(255, 255, 255, 0.03)',
                    border: isLight ? '1px solid #FECACA' : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)', display: 'block' }}>{item.topic}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>{item.patternCount} patterns flagged</span>
                  </div>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: item.status === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(236, 72, 153, 0.15)',
                      color: item.status === 'Critical' ? '#EF4444' : '#EC4899',
                      border: `1px solid ${item.status === 'Critical' ? '#EF444455' : '#EC489955'}`,
                    }}
                  >
                    {item.status}
                  </span>
                </div>
              ))
            ) : (
              <div
                style={{
                  padding: '24px 16px',
                  borderRadius: '12px',
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
                <span style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)', fontWeight: 800 }}>No Revision Priorities Due</span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', maxWidth: '280px' }}>
                  Solve a few problems to generate personalized spaced repetition flashcards.
                </span>
                <Link href="/practice" style={{ textDecoration: 'none', marginTop: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#EC4899', fontWeight: 800 }}>Start Practice →</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* CARD D: WEEKLY PROGRESS */}
        <div style={moduleCardStyle(isLight, 'rgba(56, 189, 248, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#0284C7')}>
                <Calendar size={18} style={{ color: '#0284C7' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>WEEKLY PROGRESS</h4>
                <span style={moduleSubheaderStyle(isLight)}>Consistency &amp; weekly volume</span>
              </div>
            </div>
            <Link href="/journey" style={{ fontSize: '11px', color: '#0284C7', fontWeight: 800, textDecoration: 'none' }}>
              View Journey →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            {/* Weekly Target Progress */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: 'var(--text-secondary, #CBD5E1)', fontWeight: 700 }}>Weekly Solves</span>
                <strong style={{ color: '#0284C7', fontWeight: 900 }}>
                  {weeklyProgress.weeklyProblems} / {weeklyProgress.weeklyTarget} ({weeklyProgress.weeklyPercentage}%)
                </strong>
              </div>
              <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.max(4, weeklyProgress.weeklyPercentage)}%`, height: '100%', background: 'linear-gradient(90deg, #0284C7, #38BDF8)', borderRadius: '3px' }} />
              </div>
            </div>

            {/* Metrics Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px 12px', borderRadius: '10px', background: isLight ? '#FFFBEB' : 'rgba(255, 255, 255, 0.03)', border: isLight ? '1px solid #FDE68A' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)', fontWeight: 700, textTransform: 'uppercase' }}>XP Earned</span>
                <strong style={{ fontSize: '15px', color: '#D97706', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  +{weeklyProgress.weeklyXp} XP
                </strong>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '10px', background: isLight ? '#F0F9FF' : 'rgba(255, 255, 255, 0.03)', border: isLight ? '1px solid #BAE6FD' : '1px solid rgba(255, 255, 255, 0.06)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)', fontWeight: 700, textTransform: 'uppercase' }}>Active Days</span>
                <strong style={{ fontSize: '15px', color: '#0284C7', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  {weeklyProgress.practiceDays} / 7 Days
                </strong>
              </div>
            </div>

            {/* Trend Indicator */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)', border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.04)', fontSize: '11px' }}>
              <span style={{ color: 'var(--text-secondary, #94A3B8)' }}>Weekly Trend</span>
              <strong style={{ color: weeklyProgress.trendText.startsWith('↑') ? '#10B981' : '#0284C7', fontWeight: 800 }}>
                {weeklyProgress.trendText}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. ROW 3: PLATFORM SNAPSHOT & RECENT ACTIVITY ────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px',
          width: '100%',
        }}
      >
        {/* CARD E: PLATFORM SNAPSHOT */}
        <div style={moduleCardStyle(isLight, 'rgba(16, 185, 129, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#10B981')}>
                <Layers size={18} style={{ color: '#10B981' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>PLATFORM SNAPSHOT</h4>
                <span style={moduleSubheaderStyle(isLight)}>Canonical catalog coverage</span>
              </div>
            </div>
            <Link href="/analytics" style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, textDecoration: 'none' }}>
              Analytics →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {platformSnapshot.map((p) => (
              <Link
                key={p.platformKey}
                href={p.url}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)' }}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                    border: `1.5px solid ${p.color}33`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text-primary, #FFF)' }}>{p.name}</span>
                      <span style={{ fontSize: '10px', color: p.color, fontWeight: 800 }}>({p.percentage}%)</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>{p.currentCampaign}</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)', fontWeight: 900 }}>
                      {p.solved} / {p.total}
                    </strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)', display: 'block' }}>Solved</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* CARD F: RECENT ACTIVITY */}
        <div style={moduleCardStyle(isLight, 'rgba(168, 85, 247, 0.25)')}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={iconBadgeStyle('#8B5CF6')}>
                <Clock size={18} style={{ color: '#8B5CF6' }} />
              </div>
              <div>
                <h4 style={moduleHeaderStyle(isLight)}>RECENT ACTIVITY</h4>
                <span style={moduleSubheaderStyle(isLight)}>Live solve stream across platforms</span>
              </div>
            </div>
            <Link href="/analytics" style={{ fontSize: '11px', color: '#8B5CF6', fontWeight: 800, textDecoration: 'none' }}>
              Full Log →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {recentActivity && recentActivity.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto' }}>
                {recentActivity.slice(0, 4).map((act) => (
                  <Link
                    key={act.id}
                    href={act.problemUrl || '/practice'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        padding: '9px 12px',
                        borderRadius: '10px',
                        background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.025)',
                        border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary, #FFF)' }}>
                          {act.title}
                        </strong>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>
                          <span style={{ color: act.platformColor, fontWeight: 700 }}>{act.platform}</span>
                          <span>·</span>
                          <span>{act.timeAgo}</span>
                        </div>
                      </div>
                      {act.xpEarned > 0 && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 900,
                            color: '#D97706',
                            background: isLight ? '#FEF3C7' : 'rgba(253, 224, 71, 0.12)',
                            border: isLight ? '1px solid #FDE68A' : '1px solid rgba(253, 224, 71, 0.3)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          +{act.xpEarned} XP
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div
                style={{
                  padding: '28px 16px',
                  borderRadius: '12px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: isLight ? '1px dashed #CBD5E1' : '1px dashed rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '8px',
                }}
              >
                <Clock size={24} style={{ color: '#94A3B8' }} />
                <strong style={{ fontSize: '13px', color: 'var(--text-primary, #FFF)', fontWeight: 800 }}>No coding activity yet</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>
                  Solve problems across any platform to see your real-time activity stream here.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Module card styling helper
function moduleCardStyle(isLight: boolean, accentBorderColor?: string): React.CSSProperties {
  return {
    padding: '20px 24px',
    borderRadius: '18px',
    background: isLight ? '#FFFFFF' : 'var(--card)',
    border: isLight
      ? `1.5px solid ${accentBorderColor || 'var(--border)'}`
      : '1px solid var(--border)',
    boxShadow: isLight
      ? '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
      : '0 10px 30px rgba(0, 0, 0, 0.35)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  };
}

function moduleHeaderStyle(isLight: boolean): React.CSSProperties {
  return {
    margin: 0,
    fontSize: '15px',
    fontWeight: 900,
    color: isLight ? '#0F172A' : '#FFF',
    letterSpacing: '0.02em',
  };
}

function moduleSubheaderStyle(isLight: boolean): React.CSSProperties {
  return {
    fontSize: '11px',
    color: isLight ? '#64748B' : '#94A3B8',
    fontWeight: 600,
    display: 'block',
    marginTop: '2px',
  };
}

function iconBadgeStyle(color: string): React.CSSProperties {
  return {
    width: '34px',
    height: '34px',
    borderRadius: '10px',
    background: `${color}18`,
    border: `1px solid ${color}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    padding: '7px 14px',
    borderRadius: '8px',
    background: `${color}18`,
    border: `1px solid ${color}55`,
    color: color,
    fontSize: '12px',
    fontWeight: 800,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };
}

function PlatformPerformanceBreakdown({
  platformSnapshot,
  totalSolved,
  isLight,
}: {
  platformSnapshot: any[];
  totalSolved: number;
  isLight: boolean;
}) {
  const platforms = [
    {
      key: 'leetcode',
      name: 'LeetCode',
      solved: platformSnapshot.find((p) => p.platformKey === 'leetcode')?.solved || 0,
      total: platformSnapshot.find((p) => p.platformKey === 'leetcode')?.total || 150,
      percentage: platformSnapshot.find((p) => p.platformKey === 'leetcode')?.percentage || 0,
      color: '#10B981',
      url: '/practice?platform=leetcode',
      isLocked: false,
    },
    {
      key: 'codechef',
      name: 'CodeChef',
      solved: platformSnapshot.find((p) => p.platformKey === 'codechef')?.solved || 0,
      total: platformSnapshot.find((p) => p.platformKey === 'codechef')?.total || 120,
      percentage: platformSnapshot.find((p) => p.platformKey === 'codechef')?.percentage || 0,
      color: '#F97316',
      url: '/practice?platform=codechef',
      isLocked: false,
    },
    {
      key: 'codeforces',
      name: 'Codeforces',
      solved: platformSnapshot.find((p) => p.platformKey === 'codeforces')?.solved || 0,
      total: platformSnapshot.find((p) => p.platformKey === 'codeforces')?.total || 100,
      percentage: platformSnapshot.find((p) => p.platformKey === 'codeforces')?.percentage || 0,
      color: '#38BDF8',
      url: '/practice?platform=codeforces',
      isLocked: false,
    },
    {
      key: 'geeksforgeeks',
      name: 'GeeksForGeeks',
      solved: 0,
      total: 100,
      percentage: 0,
      color: '#22C55E',
      url: '#',
      isLocked: true,
    },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
      {/* 4-Platform Compact Breakdown List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
        {platforms.map((p) => {
          if (p.isLocked) {
            return (
              <div
                key={p.key}
                style={{
                  padding: '7px 12px',
                  borderRadius: '10px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: isLight ? '1px dashed #CBD5E1' : '1px dashed rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  opacity: 0.65,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={12} style={{ color: 'var(--text-muted, #94A3B8)' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted, #94A3B8)' }}>{p.name}</span>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    color: 'var(--text-muted, #94A3B8)',
                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.04)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  Coming Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={p.key}
              href={p.url}
              style={{ textDecoration: 'none', color: 'inherit' }}
              title={`${p.name}: ${p.solved} / ${p.total} Solved (${p.percentage}%)`}
            >
              <motion.div
                whileHover={{ scale: 1.02, background: `${p.color}10`, borderColor: `${p.color}55` }}
                style={{
                  padding: '7px 12px',
                  borderRadius: '10px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)',
                  border: `1.5px solid ${p.color}33`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: p.color,
                      boxShadow: `0 0 6px ${p.color}`,
                    }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary, #FFF)' }}>{p.name}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '12px', fontWeight: 900, color: 'var(--text-primary, #FFF)' }}>
                    {p.solved} / {p.total}
                  </strong>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 800,
                      color: p.color,
                      background: `${p.color}15`,
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {p.percentage}%
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
