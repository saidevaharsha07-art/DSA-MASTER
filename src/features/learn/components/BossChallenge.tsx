'use client';

import React from 'react';
import { Skull, ChevronRight, Award, Flame, Coins } from 'lucide-react';
import { Kingdom } from '../data/kingdoms';

interface BossChallengeProps {
  boss: Kingdom['boss'];
}

export function BossChallenge({ boss }: BossChallengeProps) {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(40, 10, 20, 0.95) 0%, rgba(20, 5, 10, 0.95) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 8px 24px rgba(239, 68, 68, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {/* BOSS HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #EF4444' }}>
          <Skull size={18} style={{ color: '#EF4444' }} />
        </div>
        <div>
          <span style={{ fontSize: '9px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            KINGDOM BOSS
          </span>
          <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: '#FFF' }}>
            {boss.title}
          </h4>
        </div>
      </div>

      <p style={{ margin: 0, fontSize: '11px', color: '#CBD5E1', lineHeight: '1.4' }}>
        {boss.description}
      </p>

      {/* REWARDS */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '8px' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, color: '#F59E0B' }}>+XP {boss.xpReward}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 900, color: '#EAB308' }}>
          <Coins size={12} /> {boss.coinReward}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, color: '#EF4444' }}>
          <Award size={12} /> {boss.badgeReward}
        </div>
      </div>

      {/* BOSS BUTTON */}
      <button
        type="button"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #EF4444, #991B1B)',
          border: 'none',
          color: '#FFF',
          fontSize: '12px',
          fontWeight: 900,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
        }}
      >
        View Boss Challenge <ChevronRight size={14} />
      </button>
    </div>
  );
}
