'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Map, CheckCircle2, Zap, AlertTriangle, Clock, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { AdaptiveRoadmapState, RoadmapTopicStatus } from '../services/dashboard-adapter.service';

interface AdaptiveRoadmapWidgetProps {
  adaptiveRoadmap: AdaptiveRoadmapState;
  isLight: boolean;
}

export function AdaptiveRoadmapWidget({ adaptiveRoadmap, isLight }: AdaptiveRoadmapWidgetProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'learning' | 'weak' | 'mastered'>('all');

  const { masteredTopics, strongTopics, learningTopics, weakTopics, upcomingTopics, nextBestTopic } = adaptiveRoadmap;

  const totalTopics = masteredTopics.length + strongTopics.length + learningTopics.length + weakTopics.length + upcomingTopics.length;
  const masteredCount = masteredTopics.length;
  const inProgressCount = strongTopics.length + learningTopics.length;
  const weakCount = weakTopics.length;

  const displayedTopics: RoadmapTopicStatus[] = (() => {
    switch (activeTab) {
      case 'learning':
        return [...learningTopics, ...strongTopics];
      case 'weak':
        return weakTopics;
      case 'mastered':
        return masteredTopics;
      case 'all':
      default:
        return [
          ...weakTopics,
          ...learningTopics,
          ...strongTopics,
          ...masteredTopics.slice(0, 3),
          ...upcomingTopics.slice(0, 3),
        ];
    }
  })();

  const getStatusBadge = (status: RoadmapTopicStatus['status']) => {
    switch (status) {
      case 'mastered':
        return {
          label: 'Mastered',
          bg: isLight ? '#ECFDF5' : 'rgba(16, 185, 129, 0.15)',
          border: isLight ? '#A7F3D0' : 'rgba(16, 185, 129, 0.3)',
          text: '#10B981',
          icon: CheckCircle2,
        };
      case 'strong':
        return {
          label: 'Strong',
          bg: isLight ? '#F0FDF4' : 'rgba(34, 197, 94, 0.15)',
          border: isLight ? '#BBF7D0' : 'rgba(34, 197, 94, 0.3)',
          text: '#16A34A',
          icon: CheckCircle2,
        };
      case 'learning':
        return {
          label: 'Learning',
          bg: isLight ? '#EFF6FF' : 'rgba(59, 130, 246, 0.15)',
          border: isLight ? '#BFDBFE' : 'rgba(59, 130, 246, 0.3)',
          text: '#2563EB',
          icon: Zap,
        };
      case 'weak':
        return {
          label: 'Needs Attention',
          bg: isLight ? '#FEF2F2' : 'rgba(239, 68, 68, 0.15)',
          border: isLight ? '#FECACA' : 'rgba(239, 68, 68, 0.3)',
          text: '#EF4444',
          icon: AlertTriangle,
        };
      case 'upcoming':
      default:
        return {
          label: 'Upcoming',
          bg: isLight ? '#F8FAFC' : 'rgba(148, 163, 184, 0.1)',
          border: isLight ? '#E2E8F0' : 'rgba(148, 163, 184, 0.2)',
          text: '#64748B',
          icon: Clock,
        };
    }
  };

  return (
    <div
      style={{
        padding: '24px 28px',
        borderRadius: '22px',
        background: isLight ? '#FFFFFF' : 'var(--card)',
        border: isLight ? '1.5px solid rgba(56, 189, 248, 0.25)' : '1px solid var(--border)',
        boxShadow: isLight
          ? '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)'
          : '0 10px 30px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header with Next Best Topic & Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
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
            <Map size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
              ADAPTIVE ROADMAP
            </h4>
            <span style={{ fontSize: '11px', color: isLight ? '#64748B' : '#94A3B8', fontWeight: 600 }}>
              Curriculum progression &amp; dynamic mastery levels
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: `All (${totalTopics})` },
            { id: 'learning', label: `In Progress (${inProgressCount})` },
            { id: 'weak', label: `Needs Review (${weakCount})` },
            { id: 'mastered', label: `Mastered (${masteredCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                border: activeTab === tab.id
                  ? (isLight ? '1.5px solid #0284C7' : '1.5px solid #38BDF8')
                  : (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)'),
                background: activeTab === tab.id
                  ? (isLight ? '#E0F2FE' : 'rgba(56, 189, 248, 0.2)')
                  : (isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.03)'),
                color: activeTab === tab.id
                  ? (isLight ? '#0284C7' : '#38BDF8')
                  : (isLight ? '#64748B' : '#94A3B8'),
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next Best Topic Callout Banner */}
      <div
        style={{
          padding: '14px 18px',
          borderRadius: '14px',
          background: isLight ? 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)' : 'rgba(56, 189, 248, 0.08)',
          border: isLight ? '1px solid #BAE6FD' : '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={16} style={{ color: '#0284C7' }} />
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase' }}>
              Next Best Topic on Roadmap:
            </span>
            <div style={{ fontSize: '13px', fontWeight: 900, color: isLight ? '#0F172A' : '#FFF' }}>
              {nextBestTopic.title}
            </div>
            <span style={{ fontSize: '11px', color: isLight ? '#475569' : '#94A3B8' }}>
              {nextBestTopic.reason}
            </span>
          </div>
        </div>

        <Link href={nextBestTopic.url} style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              background: '#0284C7',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            Explore Topic <ArrowRight size={13} />
          </motion.button>
        </Link>
      </div>

      {/* Topics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '12px',
          maxHeight: '340px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {displayedTopics.length > 0 ? (
          displayedTopics.map((topic) => {
            const badge = getStatusBadge(topic.status);
            const Icon = badge.icon;
            return (
              <Link
                key={topic.slug}
                href={topic.url}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)' }}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.025)',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary, #FFF)' }}>
                      {topic.title}
                    </strong>
                    <span
                      style={{
                        fontSize: '9.5px',
                        fontWeight: 900,
                        padding: '2px 7px',
                        borderRadius: '6px',
                        background: badge.bg,
                        border: `1px solid ${badge.border}`,
                        color: badge.text,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '3px',
                      }}
                    >
                      <Icon size={10} /> {badge.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted, #94A3B8)' }}>
                    <span>Progress: <strong style={{ color: 'var(--text-primary, #FFF)' }}>{topic.solved} / {topic.total}</strong></span>
                    <span style={{ fontWeight: 800, color: topic.percentage >= 85 ? '#10B981' : topic.percentage >= 50 ? '#0284C7' : 'inherit' }}>
                      {topic.percentage}%
                    </span>
                  </div>

                  {/* Mini Progress bar */}
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      borderRadius: '2px',
                      background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.06)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.max(topic.percentage > 0 ? 5 : 0, topic.percentage)}%`,
                        height: '100%',
                        background: topic.status === 'weak' ? '#EF4444' : topic.status === 'mastered' ? '#10B981' : '#0284C7',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </motion.div>
              </Link>
            );
          })
        ) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '24px', color: 'var(--text-muted, #94A3B8)', fontSize: '12px' }}>
            No topics in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}
