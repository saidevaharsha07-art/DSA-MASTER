'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Flame, Star, Gift, Play } from 'lucide-react';
import { RewardItem } from '@/src/engines/revision';

interface RevisionStatCardsProps {
  dueTodayCount: number;
  streakStats: { currentStreak: number; longestStreak: number };
  xpStats: { todayXp: number; weeklyXp: number; totalXp: number; currentLevel: number; levelTitle: string; progressPercentage: number };
  nextReward: RewardItem;
  onReviewClick?: () => void;
}

export function RevisionStatCards({ dueTodayCount, streakStats, xpStats, nextReward, onReviewClick }: RevisionStatCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      
      {/* Card 1: Due Today */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px var(--accent-glow, rgba(16, 185, 129, 0.25))' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid var(--primary-border, rgba(168, 85, 247, 0.3))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)' }}>
            ✓ Due Today
          </span>
          <div style={{ padding: '10px', borderRadius: '14px', background: 'var(--primary-bg, rgba(168, 85, 247, 0.2))', border: '1px solid var(--primary-border, rgba(168, 85, 247, 0.4))' }}>
            <CheckCircle2 size={20} style={{ color: 'var(--primary)' }} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{dueTodayCount}</div>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, marginTop: '4px', display: 'block' }}>Problems pending memory review</span>
        </div>

        <button
          type="button"
          onClick={onReviewClick}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
            border: 'none',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 16px var(--accent-glow, rgba(16, 185, 129, 0.4))',
          }}
        >
          <Play size={14} fill="#FFF" /> Review Now
        </button>
      </motion.div>

      {/* Card 2: Streak */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(239, 68, 68, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FCA5A5' }}>
            🔥 Streak
          </span>
          <motion.div 
            animate={{ scale: [1, 1.12, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ padding: '10px', borderRadius: '14px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}
          >
            <Flame size={20} style={{ color: '#EF4444' }} />
          </motion.div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontSize: '42px', fontWeight: 900, color: '#FFFFFF', lineHeight: 1 }}>{streakStats.currentStreak}</span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#EF4444' }}>Days</span>
          </div>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, marginTop: '4px', display: 'block' }}>
            Longest Streak: <strong style={{ color: '#FCA5A5' }}>{streakStats.longestStreak} Days</strong>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {[1, 2, 3, 4, 5, 6, 7].map((day, i) => (
            <div key={i} style={{ flex: 1, height: '6px', borderRadius: '3px', background: i < Math.min(7, streakStats.currentStreak % 7 || 5) ? '#EF4444' : 'rgba(255,255,255,0.1)', boxShadow: i < 5 ? '0 0 8px rgba(239, 68, 68, 0.5)' : 'none' }} />
          ))}
        </div>
      </motion.div>

      {/* Card 3: XP Earned */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(245, 158, 11, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#FDE68A' }}>
            ⭐ XP Earned
          </span>
          <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.4)' }}>
            <Star size={20} style={{ color: '#F59E0B' }} />
          </div>
        </div>

        <div>
          <div style={{ fontSize: '32px', fontWeight: 900, color: '#F59E0B', lineHeight: 1 }}>+{xpStats.todayXp} XP</div>
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, marginTop: '4px', display: 'block' }}>
            Weekly XP: <strong style={{ color: '#FDE68A' }}>+{xpStats.weeklyXp} XP</strong>
          </span>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>
            <span>Lvl {xpStats.currentLevel} {xpStats.levelTitle}</span>
            <span>{xpStats.progressPercentage}% to Lvl {xpStats.currentLevel + 1}</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${xpStats.progressPercentage}%`, height: '100%', background: 'linear-gradient(to right, #F59E0B, #FBBF24)', borderRadius: '3px' }} />
          </div>
        </div>
      </motion.div>

      {/* Card 4: Next Reward */}
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(14, 165, 233, 0.25)' }}
        transition={{ duration: 0.2 }}
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'rgba(20, 16, 38, 0.7)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(14, 165, 233, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7DD3FC' }}>
            🎁 Next Reward
          </span>
          <div style={{ padding: '10px', borderRadius: '14px', background: 'rgba(14, 165, 233, 0.2)', border: '1px solid rgba(14, 165, 233, 0.4)' }}>
            <Gift size={20} style={{ color: '#0EA5E9' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 8px 20px rgba(168, 85, 247, 0.3)',
              flexShrink: 0,
            }}
          >
            <Image src={nextReward.image} alt={nextReward.title} width={56} height={56} style={{ objectFit: 'cover' }} />
          </motion.div>

          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF', display: 'block' }}>{nextReward.title}</span>
            <span style={{ fontSize: '11px', color: '#0EA5E9', fontWeight: 700 }}>{nextReward.xpReward}</span>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', fontWeight: 700, marginBottom: '4px' }}>
            <span>{nextReward.unlocked ? 'Unlocked!' : 'Unlock Progress'}</span>
            <span>{nextReward.progressPct}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${nextReward.progressPct}%`, height: '100%', background: 'linear-gradient(to right, #0EA5E9, #38BDF8)', borderRadius: '3px' }} />
          </div>
        </div>
      </motion.div>

    </div>
  );
}
