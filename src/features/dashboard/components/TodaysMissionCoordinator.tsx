'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Target,
  RefreshCw,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Zap,
  Clock,
  Brain,
  ShieldAlert,
} from 'lucide-react';
import { TodaysMission } from '../services/dashboard-adapter.service';

interface TodaysMissionCoordinatorProps {
  mission: TodaysMission;
  isLight: boolean;
}

export function TodaysMissionCoordinator({ mission, isLight }: TodaysMissionCoordinatorProps) {
  const { learn, practice, revise, mentor } = mission;

  return (
    <div
      style={{
        padding: '24px 28px',
        borderRadius: '24px',
        background: isLight ? '#FFFFFF' : 'var(--card)',
        border: isLight ? '1.5px solid rgba(56, 189, 248, 0.25)' : '1px solid var(--border)',
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
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0284C7',
            }}
          >
            <Zap size={18} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '17px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
              TODAY&apos;S MISSION
            </h3>
            <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 600 }}>
              Your 4 daily operational pillars: Learn, Practice, Revise, and Consult
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
              background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.15)',
              border: isLight ? '1px solid #BBF7D0' : '1px solid rgba(16, 185, 129, 0.3)',
              color: '#10B981',
            }}
          >
            Active Roadmap Synced
          </span>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          width: '100%',
        }}
      >
        {/* 1. LEARN PILLAR */}
        <Link href={learn.url} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -2 }}
            style={pillarCardStyle(isLight, '#0284C7')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={iconBadgeStyle('#0284C7')}>
                  <BookOpen size={16} style={{ color: '#0284C7' }} />
                </div>
                <strong style={{ fontSize: '13px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
                  1. Learn
                </strong>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#0284C7' }}>
                Curriculum
              </span>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isLight ? '#0F172A' : '#FFF', marginTop: '4px' }}>
                {learn.topic}
              </div>
              <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginTop: '2px' }}>
                {learn.statusText}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284C7' }}>
                Continue Topic
              </span>
              <ArrowRight size={13} style={{ color: '#0284C7' }} />
            </div>
          </motion.div>
        </Link>

        {/* 2. PRACTICE PILLAR */}
        <Link href={practice.url} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -2 }}
            style={pillarCardStyle(isLight, '#10B981')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={iconBadgeStyle('#10B981')}>
                  <Target size={16} style={{ color: '#10B981' }} />
                </div>
                <strong style={{ fontSize: '13px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
                  2. Practice
                </strong>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  background: practice.isCompleted
                    ? (isLight ? '#DCFCE7' : 'rgba(16, 185, 129, 0.2)')
                    : (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'),
                  color: practice.isCompleted ? '#10B981' : isLight ? '#475569' : '#94A3B8',
                }}
              >
                {practice.solvedToday} / {practice.dailyGoal} Goal
              </span>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isLight ? '#0F172A' : '#FFF', marginTop: '4px' }}>
                {practice.targetTopic}
              </div>
              <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginTop: '2px' }}>
                {practice.isCompleted ? 'Daily practice goal met! Keep going.' : 'Targeted problem set ready in Arena.'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10B981' }}>
                Solve in Arena
              </span>
              <ArrowRight size={13} style={{ color: '#10B981' }} />
            </div>
          </motion.div>
        </Link>

        {/* 3. REVISE PILLAR */}
        <Link href={revise.url} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -2 }}
            style={pillarCardStyle(isLight, '#EC4899')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={iconBadgeStyle('#EC4899')}>
                  <RefreshCw size={16} style={{ color: '#EC4899' }} />
                </div>
                <strong style={{ fontSize: '13px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
                  3. Revise
                </strong>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  background: revise.hasDueItems
                    ? (isLight ? '#FCE7F3' : 'rgba(236, 72, 153, 0.2)')
                    : (isLight ? '#DCFCE7' : 'rgba(16, 185, 129, 0.2)'),
                  color: revise.hasDueItems ? '#EC4899' : '#10B981',
                }}
              >
                {revise.dueCount > 0 ? `${revise.dueCount} Due` : 'All Clear'}
              </span>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isLight ? '#0F172A' : '#FFF', marginTop: '4px' }}>
                {revise.urgentTopic || 'Memory Engine'}
              </div>
              <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', display: 'block', marginTop: '2px' }}>
                {revise.hasDueItems ? 'SRS spaced repetition cards require review.' : 'No memory decay detected today.'}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#EC4899' }}>
                Open Revision
              </span>
              <ArrowRight size={13} style={{ color: '#EC4899' }} />
            </div>
          </motion.div>
        </Link>

        {/* 4. MENTOR PILLAR */}
        <Link href={mentor.url} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div
            whileHover={{ scale: 1.02, translateY: -2 }}
            style={pillarCardStyle(isLight, '#8B5CF6')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={iconBadgeStyle('#8B5CF6')}>
                  <Brain size={16} style={{ color: '#8B5CF6' }} />
                </div>
                <strong style={{ fontSize: '13px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
                  4. AI Mentor
                </strong>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 900,
                  padding: '2px 6px',
                  borderRadius: '6px',
                  background: isLight ? '#F3E8FF' : 'rgba(139, 92, 246, 0.2)',
                  color: '#8B5CF6',
                }}
              >
                Oracle AI
              </span>
            </div>

            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: isLight ? '#0F172A' : '#FFF', marginTop: '4px' }}>
                {mentor.recommendedTopic}
              </div>
              <span
                style={{
                  fontSize: '11px',
                  color: isLight ? '#64748B' : '#94A3B8',
                  display: 'block',
                  marginTop: '2px',
                  lineHeight: '1.4',
                  maxHeight: '32px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {mentor.insight}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '8px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#8B5CF6' }}>
                Consult Mentor
              </span>
              <ArrowRight size={13} style={{ color: '#8B5CF6' }} />
            </div>
          </motion.div>
        </Link>
      </div>
    </div>
  );
}

function pillarCardStyle(isLight: boolean, accentColor: string): React.CSSProperties {
  return {
    padding: '16px 18px',
    borderRadius: '16px',
    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.025)',
    border: isLight ? `1.5px solid ${accentColor}33` : `1px solid ${accentColor}33`,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.18s ease',
    minHeight: '136px',
  };
}

function iconBadgeStyle(color: string): React.CSSProperties {
  return {
    width: '28px',
    height: '28px',
    borderRadius: '8px',
    background: `${color}18`,
    border: `1px solid ${color}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}
