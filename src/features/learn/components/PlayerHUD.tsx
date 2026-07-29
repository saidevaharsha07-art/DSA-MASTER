'use client';

import React from 'react';
import { Flame, Coins, Gem, Settings, Sparkles, Trophy } from 'lucide-react';

export function PlayerHUD() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        background: 'linear-gradient(180deg, rgba(20, 16, 38, 0.95) 0%, rgba(13, 10, 25, 0.95) 100%)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* LEFT BRAND / PAGE TITLE */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid #C084FC' }}>
          <Trophy size={20} style={{ color: '#C084FC' }} />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em' }}>
            Learn
          </h1>
          <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>
            Master DSA one kingdom at a time.
          </span>
        </div>
      </div>

      {/* RIGHT PLAYER METRICS HUD */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* AVATAR & LEVEL */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
              border: '2px solid #C084FC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              color: '#FFF',
              fontSize: '14px',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.6)',
            }}>
              A
            </div>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 900, color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#F59E0B' }}>Lv. 24</span> Arjun
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <div style={{ width: '100px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #EAB308)' }} />
              </div>
              <span style={{ fontSize: '9px', color: '#CBD5E1', fontWeight: 700 }}>7,450 / 12,000 XP</span>
            </div>
          </div>
        </div>

        {/* STREAK */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
          <Flame size={16} style={{ color: '#F97316' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>18</span>
            <span style={{ fontSize: '10px', color: '#F97316', fontWeight: 700, marginLeft: '4px' }}>Day Streak</span>
          </div>
        </div>

        {/* COINS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <Coins size={16} style={{ color: '#F59E0B' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>1,200</span>
            <span style={{ fontSize: '10px', color: '#F59E0B', fontWeight: 700, marginLeft: '4px' }}>Coins</span>
          </div>
        </div>

        {/* GEMS */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <Gem size={16} style={{ color: '#C084FC' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>450</span>
            <span style={{ fontSize: '10px', color: '#C084FC', fontWeight: 700, marginLeft: '4px' }}>Gems</span>
          </div>
        </div>

        {/* SETTINGS BUTTON */}
        <button
          type="button"
          style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '6px' }}
        >
          <Settings size={18} />
        </button>
      </div>
    </div>
  );
}
