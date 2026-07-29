'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Compass, Flame, Shield, Trophy } from 'lucide-react';

export function CampaignHeroHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '32px 40px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(18, 12, 38, 0.95) 0%, rgba(10, 8, 22, 0.98) 60%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 0 30px rgba(168, 85, 247, 0.1)',
      }}
    >
      {/* MAGICAL PARTICLES / RAYS BACKDROP EFFECT */}
      <div
        style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          {/* BADGE STRIP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '20px', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid #F59E0B', color: '#F59E0B', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Crown size={12} /> GRAND CAMPAIGN
            </span>
            <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={14} /> 25 Kingdoms Unlocked
            </span>
          </div>

          {/* MAIN TITLE */}
          <h1 style={{ margin: 0, fontSize: '36px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em', textShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}>
            THE KINGDOMS OF KNOWLEDGE
          </h1>

          {/* SUBTITLE */}
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#CBD5E1', fontStyle: 'italic', maxWidth: '680px', lineHeight: '1.6' }}>
            &quot;Every kingdom conquered brings you closer to becoming the Algorithm Emperor.&quot;
          </p>
        </div>

        {/* CAMPAIGN METRICS BADGES */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          
          <div style={{ padding: '12px 18px', borderRadius: '14px', background: 'rgba(20, 15, 38, 0.8)', border: '1px solid rgba(245, 158, 11, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.2)' }}>
              <Trophy size={20} style={{ color: '#F59E0B' }} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>REALMS CONQUERED</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#FFF' }}>3 / 25</span>
            </div>
          </div>

          <div style={{ padding: '12px 18px', borderRadius: '14px', background: 'rgba(20, 15, 38, 0.8)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)' }}>
              <Shield size={20} style={{ color: '#C084FC' }} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>TOTAL XP EARNED</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#C084FC' }}>4,300 XP</span>
            </div>
          </div>

          <div style={{ padding: '12px 18px', borderRadius: '14px', background: 'rgba(20, 15, 38, 0.8)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.2)' }}>
              <Flame size={20} style={{ color: '#10B981' }} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700, display: 'block', textTransform: 'uppercase' }}>CURRENT STREAK</span>
              <span style={{ fontSize: '16px', fontWeight: 900, color: '#10B981' }}>18 Days</span>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
