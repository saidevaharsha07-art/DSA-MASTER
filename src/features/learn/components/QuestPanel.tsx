'use client';

import React from 'react';
import { Swords, CheckCircle2, Circle, Coins, Shield } from 'lucide-react';
import { Kingdom } from '../data/kingdoms';

interface QuestPanelProps {
  quest: Kingdom['currentQuest'];
}

export function QuestPanel({ quest }: QuestPanelProps) {
  return (
    <div
      style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(30, 20, 50, 0.95) 0%, rgba(18, 12, 35, 0.95) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.3)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* QUEST TITLE STRIP */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Swords size={16} style={{ color: '#C084FC' }} />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#FFF' }}>
            {quest.title}
          </h4>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 900, padding: '2px 8px', borderRadius: '4px', background: 'rgba(168, 85, 247, 0.2)', color: '#C084FC', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
          {quest.difficulty}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '11px', color: '#94A3B8', lineHeight: '1.5' }}>
        {quest.description}
      </p>

      {/* OBJECTIVES LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <span style={{ fontSize: '10px', fontWeight: 900, color: '#CBD5E1', textTransform: 'uppercase' }}>
          OBJECTIVES
        </span>
        {quest.objectives.map((obj) => (
          <div key={obj.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {obj.completed ? (
              <CheckCircle2 size={14} style={{ color: '#10B981' }} />
            ) : (
              <Circle size={14} style={{ color: '#64748B' }} />
            )}
            <span style={{ fontSize: '11px', color: obj.completed ? '#FFF' : '#94A3B8', textDecoration: obj.completed ? 'none' : 'none' }}>
              {obj.text}
            </span>
          </div>
        ))}
      </div>

      {/* REWARDS STRIP */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <span style={{ fontSize: '9px', fontWeight: 800, color: '#94A3B8', display: 'block' }}>REWARDS</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#F59E0B' }}>+XP {quest.xpReward}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 900, color: '#EAB308' }}>
              <Coins size={12} /> {quest.coinReward}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800, color: '#C084FC' }}>
              <Shield size={12} /> {quest.badgeReward}
            </div>
          </div>
        </div>
      </div>

      {/* CONTINUE QUEST BUTTON */}
      <button
        type="button"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
          border: 'none',
          color: '#FFF',
          fontSize: '12px',
          fontWeight: 900,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(168, 85, 247, 0.4)',
        }}
      >
        Continue Quest
      </button>

    </div>
  );
}
