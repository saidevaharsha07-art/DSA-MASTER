'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Trophy,
  Flame,
  Shield,
  Award,
  Crown,
  Sparkles,
  ChevronRight,
  BookOpen,
  Swords,
  Clock,
  CheckCircle2,
  Lock,
  User,
  Zap,
  Target
} from 'lucide-react';
import { CAMPAIGN_KINGDOMS, CampaignKingdom } from '../data/campaignKingdoms';

export function MasterCampaignView() {
  const [selectedKingdom, setSelectedKingdom] = useState<CampaignKingdom>(CAMPAIGN_KINGDOMS[0]);

  // Find index of selected kingdom to show adjacent left/right kingdoms for atmospheric perspective
  const selectedIndex = CAMPAIGN_KINGDOMS.findIndex((k) => k.id === selectedKingdom.id);
  const prevKingdom = selectedIndex > 0 ? CAMPAIGN_KINGDOMS[selectedIndex - 1] : null;
  const nextKingdom = selectedIndex < CAMPAIGN_KINGDOMS.length - 1 ? CAMPAIGN_KINGDOMS[selectedIndex + 1] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', width: '100%', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      
      {/* CENTER & LEFT: GIGANTIC CINEMATIC CAMPAIGN WORLD */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', overflow: 'hidden' }}>
        
        {/* CENTER MAIN STAGE (DOMINATES THE SCREEN) */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(168, 85, 247, 0.35)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(168, 85, 247, 0.15)' }}>
          
          {/* CINEMATIC ATMOSPHERIC BACKGROUND */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedKingdom.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: selectedKingdom.bgGradient,
                zIndex: 1,
              }}
            >
              {/* VOLUMETRIC LIGHT & PARTICLES LAYER */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: `radial-gradient(circle, ${selectedKingdom.color}33 0%, rgba(0,0,0,0) 70%)`, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(0deg, rgba(7, 5, 18, 0.95) 0%, rgba(7, 5, 18, 0) 100%)', pointerEvents: 'none' }} />
            </motion.div>
          </AnimatePresence>

          {/* PREVIOUS KINGDOM ATMOSPHERIC PEEK (LEFT EDGE) */}
          {prevKingdom && (
            <div
              onClick={() => setSelectedKingdom(prevKingdom)}
              style={{
                position: 'absolute',
                left: '-80px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '180px',
                height: '65%',
                borderRadius: '24px',
                background: prevKingdom.bgGradient,
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: 0.35,
                filter: 'blur(2px)',
                cursor: 'pointer',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '16px',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFF', writingMode: 'vertical-rl' }}>
                {prevKingdom.title}
              </span>
            </div>
          )}

          {/* NEXT KINGDOM ATMOSPHERIC PEEK (RIGHT EDGE) */}
          {nextKingdom && (
            <div
              onClick={() => setSelectedKingdom(nextKingdom)}
              style={{
                position: 'absolute',
                right: '-80px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '180px',
                height: '65%',
                borderRadius: '24px',
                background: nextKingdom.bgGradient,
                border: '1px solid rgba(255,255,255,0.1)',
                opacity: 0.35,
                filter: 'blur(2px)',
                cursor: 'pointer',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '16px',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFF', writingMode: 'vertical-rl' }}>
                {nextKingdom.title}
              </span>
            </div>
          )}

          {/* SELECTED KINGDOM MAIN CONTENT (CENTER STAGE) */}
          <div style={{ position: 'relative', zIndex: 10, padding: '36px 44px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            {/* TOP HEADER TAGS */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', padding: '4px 12px', borderRadius: '20px', background: 'rgba(168, 85, 247, 0.25)', border: '1px solid #C084FC', color: '#C084FC', letterSpacing: '0.08em' }}>
                  CAMPAIGN REALM #{selectedKingdom.id} OF 25
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: selectedKingdom.color, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {selectedKingdom.topic}
                </span>
              </div>

              <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#FFF' }}>
                {selectedKingdom.difficulty}
              </span>
            </div>

            {/* CENTER HERO DETAILS */}
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '48px' }}>{selectedKingdom.icon}</span>
                <h1 style={{ margin: 0, fontSize: '38px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em', textShadow: '0 0 30px rgba(0,0,0,0.9)' }}>
                  {selectedKingdom.title}
                </h1>
              </div>

              <p style={{ margin: '10px 0 20px 0', fontSize: '15px', color: '#CBD5E1', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {selectedKingdom.subtitle}
              </p>

              {/* METRICS ROW */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(10, 8, 24, 0.75)', backdropFilter: 'blur(16px)', padding: '16px 24px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#94A3B8', marginBottom: '6px' }}>
                    <span>REALM MASTERY</span>
                    <span style={{ color: selectedKingdom.color }}>{selectedKingdom.progressPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${selectedKingdom.progressPct}%`, height: '100%', background: selectedKingdom.color }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>PATTERNS</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFF' }}>{selectedKingdom.patternsCount}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>PROBLEMS</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFF' }}>{selectedKingdom.problemsCount}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>EST. TIME</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFF' }}>{selectedKingdom.estimatedTime}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>REWARD</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#F59E0B' }}>+{selectedKingdom.xpReward} XP</span>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM ACTION BAR */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>Realm Guardian:</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>🔥 {selectedKingdom.bossTitle}</span>
              </div>

              <Link href={selectedKingdom.id === 1 ? '/learn/beginnings' : `/knowledge/${selectedKingdom.slug}`} style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  style={{
                    padding: '14px 32px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '14px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 6px 24px rgba(245, 158, 11, 0.5)',
                  }}
                >
                  Enter Kingdom Campaign <ChevronRight size={18} />
                </motion.button>
              </Link>
            </div>

          </div>

        </div>

        {/* BOTTOM GIGANTIC CAMPAIGN ROADMAP */}
        <div style={{ padding: '16px 24px', borderRadius: '20px', background: 'rgba(12, 10, 26, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
              25 KINGDOMS CAMPAIGN ROAD
            </span>
            <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>
              Click any kingdom monument to inspect realm
            </span>
          </div>

          {/* CONNECTED ROAD STRIP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', paddingBottom: '6px' }}>
            {CAMPAIGN_KINGDOMS.map((k) => {
              const isSelected = k.id === selectedKingdom.id;
              const isMastered = k.status === 'mastered';

              return (
                <div
                  key={k.id}
                  onClick={() => setSelectedKingdom(k)}
                  style={{
                    minWidth: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isSelected
                      ? 'linear-gradient(135deg, #38BDF8, #0284C7)'
                      : isMastered
                      ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                      : 'rgba(255,255,255,0.06)',
                    border: isSelected
                      ? '2px solid #7DD3FC'
                      : isMastered
                      ? '2px solid #FDE047'
                      : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isSelected
                      ? '0 0 16px rgba(56, 189, 248, 0.8)'
                      : isMastered
                      ? '0 0 12px rgba(245, 158, 11, 0.6)'
                      : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 900,
                    color: isSelected || isMastered ? '#000' : '#CBD5E1',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  title={k.title}
                >
                  {k.id}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR: PLAYER PROFILE & CAMPAIGN STATUS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
        
        {/* PLAYER PROFILE CARD */}
        <div style={{ padding: '20px', borderRadius: '20px', background: 'rgba(15, 12, 28, 0.85)', border: '1px solid rgba(168, 85, 247, 0.25)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #A855F7, #7E22CE)', border: '2px solid #C084FC', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#FFF', fontSize: '18px' }}>
              A
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 900, color: '#FFF' }}>Arjun</h3>
              <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 800 }}>Level 24 Explorer</span>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', fontWeight: 800 }}>
              <span>XP PROGRESS</span>
              <span style={{ color: '#FFF' }}>7,450 / 12,000 XP</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: '62%', height: '100%', background: 'linear-gradient(90deg, #F59E0B, #EAB308)' }} />
            </div>
          </div>

          <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '10px', marginTop: '14px' }}>
            <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} style={{ color: '#F97316' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#FFF', display: 'block' }}>18 Days</span>
                <span style={{ fontSize: '9px', color: '#F97316', fontWeight: 700 }}>Streak</span>
              </div>
            </div>

            <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={16} style={{ color: '#C084FC' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#FFF', display: 'block' }}>#14</span>
                <span style={{ fontSize: '9px', color: '#C084FC', fontWeight: 700 }}>Grandmaster</span>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY'S QUESTS */}
        <div style={{ padding: '18px', borderRadius: '20px', background: 'rgba(15, 12, 28, 0.85)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            TODAY&apos;S CAMPAIGN QUESTS
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
            <CheckCircle2 size={14} style={{ color: '#10B981' }} />
            <span style={{ fontSize: '11px', color: '#FFF' }}>Solve 2 Sliding Window Problems</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
            <Target size={14} style={{ color: '#F59E0B' }} />
            <span style={{ fontSize: '11px', color: '#CBD5E1' }}>Complete Kingdom 4 Quiz</span>
          </div>
        </div>

        {/* UPCOMING BOSS BATTLE */}
        <div style={{ padding: '18px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(40, 10, 20, 0.9) 0%, rgba(20, 5, 10, 0.9) 100%)', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Swords size={16} style={{ color: '#EF4444' }} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase' }}>UPCOMING BOSS</span>
          </div>

          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#FFF' }}>The Array Colossus</h4>
          <p style={{ margin: 0, fontSize: '10px', color: '#CBD5E1', lineHeight: '1.4' }}>Defeat the Colossus in Kingdom 1 to claim +1,000 XP and the Legendary Arrays Badge.</p>

          <Link href="/learn/beginnings" style={{ textDecoration: 'none', marginTop: '4px' }}>
            <button type="button" style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'linear-gradient(135deg, #EF4444, #991B1B)', border: 'none', color: '#FFF', fontSize: '11px', fontWeight: 900, cursor: 'pointer' }}>
              View Boss Challenge &gt;
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}
