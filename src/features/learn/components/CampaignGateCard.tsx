'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Lock, ChevronRight, Swords, Sparkles, BookOpen, Clock, Award } from 'lucide-react';
import { CampaignKingdom } from '../data/campaignKingdoms';

interface CampaignGateCardProps {
  kingdom: CampaignKingdom;
}

export function CampaignGateCard({ kingdom }: CampaignGateCardProps) {
  const isMastered = kingdom.status === 'mastered';
  const isLocked = kingdom.status === 'locked';
  const isCitadel = kingdom.id === 25;

  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.01 }}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: isCitadel ? '32px 36px' : '24px 30px',
        background: isCitadel
          ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(168, 85, 247, 0.25) 50%, rgba(15, 10, 30, 0.98) 100%)'
          : kingdom.bgGradient,
        border: isMastered
          ? '2px solid #F59E0B'
          : isCitadel
          ? '2px solid #C084FC'
          : isLocked
          ? '1px solid rgba(255, 255, 255, 0.08)'
          : '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: isMastered
          ? '0 0 30px rgba(245, 158, 11, 0.35), inset 0 0 20px rgba(245, 158, 11, 0.15)'
          : isCitadel
          ? '0 0 40px rgba(168, 85, 247, 0.4), inset 0 0 20px rgba(168, 85, 247, 0.2)'
          : '0 10px 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        opacity: isLocked ? 0.65 : 1,
        transition: 'all 0.3s ease',
      }}
    >
      {/* TOP STRIP: REALM NUMBER & STATUS BADGE */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{kingdom.icon}</span>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', color: kingdom.color, letterSpacing: '0.08em' }}>
              {kingdom.topic}
            </span>
            <h2 style={{ margin: 0, fontSize: isCitadel ? '24px' : '20px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em' }}>
              {kingdom.title}
            </h2>
          </div>
        </div>

        {/* STATUS BADGE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isMastered ? (
            <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B', color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={14} /> MASTERED KINGDOM
            </span>
          ) : isCitadel ? (
            <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '20px', background: 'rgba(168, 85, 247, 0.25)', border: '1px solid #C084FC', color: '#C084FC', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CrownIcon /> FINAL BOSS REALM
            </span>
          ) : (
            <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '20px', background: 'rgba(56, 189, 248, 0.2)', border: '1px solid #38BDF8', color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} /> AVAILABLE REALM
            </span>
          )}

          <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 12px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.06)', color: '#CBD5E1' }}>
            {kingdom.difficulty}
          </span>
        </div>

      </div>

      {/* SUBTITLE / FANTASY DESCRIPTION */}
      <p style={{ margin: 0, fontSize: '13px', color: '#CBD5E1', lineHeight: '1.6', maxWidth: '900px' }}>
        {kingdom.subtitle}
      </p>

      {/* MID STRIP: MASTERY PROGRESS BAR & METRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'center', background: 'rgba(0, 0, 0, 0.3)', padding: '14px 18px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#94A3B8', marginBottom: '6px' }}>
            <span>KINGDOM MASTERY PROGRESS</span>
            <span style={{ color: kingdom.color }}>{kingdom.progressPct}%</span>
          </div>
          <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
            <div style={{ width: `${kingdom.progressPct}%`, height: '100%', background: isMastered ? 'linear-gradient(90deg, #F59E0B, #EAB308)' : kingdom.color }} />
          </div>
        </div>

        {/* METRICS STATS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#FFF' }}>
            <BookOpen size={14} style={{ color: '#94A3B8' }} />
            <span>{kingdom.patternsCount} Patterns</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#FFF' }}>
            <Swords size={14} style={{ color: '#94A3B8' }} />
            <span>{kingdom.problemsCount} Problems</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#FFF' }}>
            <Clock size={14} style={{ color: '#94A3B8' }} />
            <span>{kingdom.estimatedTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 900, color: '#F59E0B' }}>
            <Award size={14} />
            <span>+{kingdom.xpReward} XP</span>
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION STRIP: BOSS & CONTINUE BUTTON */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>
          <span>Boss Guardian:</span>
          <span style={{ color: '#FFF', fontWeight: 900 }}>🔥 {kingdom.bossTitle}</span>
        </div>

        <Link href={`/knowledge/${kingdom.slug}`} style={{ textDecoration: 'none' }}>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              background: isMastered
                ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                : isCitadel
                ? 'linear-gradient(135deg, #A855F7, #7E22CE)'
                : 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
              border: 'none',
              color: '#FFF',
              fontSize: '13px',
              fontWeight: 900,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isMastered
                ? '0 4px 18px rgba(245, 158, 11, 0.4)'
                : '0 4px 18px rgba(59, 130, 246, 0.4)',
            }}
          >
            {isMastered ? 'Revisit Realm' : 'Enter Kingdom Campaign'} <ChevronRight size={16} />
          </motion.button>
        </Link>

      </div>

    </motion.div>
  );
}

function CrownIcon() {
  return <span style={{ fontSize: '12px' }}>👑</span>;
}
