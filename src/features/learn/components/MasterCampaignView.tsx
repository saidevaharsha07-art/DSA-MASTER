'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Trophy,
  ChevronRight,
  Swords,
  CheckCircle2,
  Lock,
  Target
} from 'lucide-react';
import { CampaignAdapterService, CampaignKingdomView } from '../services/campaign-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';

export function MasterCampaignView() {
  const { userId } = useActiveUser();
  // Fetch 100% Dynamic Engine Data via CampaignAdapterService
  const campaignSummary = useMemo(() => {
    return CampaignAdapterService.getCampaignSummary(userId);
  }, [userId]);

  const { hud, kingdoms, activeQuest } = campaignSummary;

  const [selectedKingdom, setSelectedKingdom] = useState<CampaignKingdomView>(kingdoms[0] || CAMPAIGN_KINGDOMS_FALLBACK[0]);

  // Sync selected kingdom state when summary loads
  const currentSelected = useMemo(() => {
    return kingdoms.find((k) => k.id === selectedKingdom.id) || kingdoms[0];
  }, [kingdoms, selectedKingdom.id]);

  // Find index of selected kingdom to show adjacent left/right kingdoms for atmospheric perspective
  const selectedIndex = kingdoms.findIndex((k) => k.id === currentSelected.id);
  const prevKingdom = selectedIndex > 0 ? kingdoms[selectedIndex - 1] : null;
  const nextKingdom = selectedIndex < kingdoms.length - 1 ? kingdoms[selectedIndex + 1] : null;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', width: '100%', height: 'calc(100vh - 120px)', overflow: 'hidden' }}>
      
      {/* CENTER & LEFT: GIGANTIC CINEMATIC CAMPAIGN WORLD */}
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '16px', overflow: 'hidden' }}>
        
        {/* CENTER MAIN STAGE (DOMINATES THE SCREEN) */}
        <div style={{ flex: 1, position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(168, 85, 247, 0.35)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 40px rgba(168, 85, 247, 0.15)' }}>
          
          {/* CINEMATIC ATMOSPHERIC BACKGROUND */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSelected.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: currentSelected.bgGradient,
                zIndex: 1,
              }}
            >
              {/* VOLUMETRIC LIGHT & PARTICLES LAYER */}
              <div style={{ position: 'absolute', top: 0, right: 0, width: '600px', height: '600px', background: `radial-gradient(circle, ${currentSelected.color}33 0%, rgba(0,0,0,0) 70%)`, pointerEvents: 'none' }} />
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
                  CAMPAIGN REALM #{currentSelected.id} OF 25
                </span>
                <span style={{ fontSize: '11px', fontWeight: 800, color: currentSelected.color, background: 'rgba(0,0,0,0.4)', padding: '4px 10px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {currentSelected.topic}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '12px', background: currentSelected.status === 'mastered' ? 'rgba(245, 158, 11, 0.2)' : currentSelected.status === 'available' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.08)', color: currentSelected.status === 'mastered' ? '#FDE047' : currentSelected.status === 'available' ? '#34D399' : '#94A3B8', border: '1px solid rgba(255,255,255,0.1)' }}>
                  {currentSelected.status.toUpperCase()}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 900, padding: '6px 14px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', color: '#FFF' }}>
                  {currentSelected.difficulty}
                </span>
              </div>
            </div>

            {/* CENTER HERO DETAILS */}
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <span style={{ fontSize: '48px' }}>{currentSelected.icon}</span>
                <h1 style={{ margin: 0, fontSize: '38px', fontWeight: 900, color: '#FFF', letterSpacing: '0.02em', textShadow: '0 0 30px rgba(0,0,0,0.9)' }}>
                  {currentSelected.title}
                </h1>
              </div>

              <p style={{ margin: '10px 0 20px 0', fontSize: '15px', color: '#CBD5E1', lineHeight: '1.6', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {currentSelected.subtitle}
              </p>

              {/* METRICS ROW */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: 'rgba(10, 8, 24, 0.75)', backdropFilter: 'blur(16px)', padding: '16px 24px', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.1)' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, color: '#94A3B8', marginBottom: '6px' }}>
                    <span>REALM MASTERY ({currentSelected.solvedCount} / {currentSelected.problemsCount} SOLVED)</span>
                    <span style={{ color: currentSelected.color }}>{currentSelected.progressPct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                    <div style={{ width: `${currentSelected.progressPct}%`, height: '100%', background: currentSelected.color }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>PATTERNS</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFF' }}>{currentSelected.patternsCount}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>SOLVED</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#34D399' }}>{currentSelected.solvedCount}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>EST. TIME</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#FFF' }}>{currentSelected.estimatedTime}</span>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '9px', color: '#94A3B8', fontWeight: 700, display: 'block' }}>REWARD</span>
                    <span style={{ fontSize: '14px', fontWeight: 900, color: '#F59E0B' }}>+{currentSelected.xpReward} XP</span>
                  </div>
                </div>

              </div>
            </div>

            {/* BOTTOM ACTION BAR */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>Realm Guardian:</span>
                <span style={{ fontSize: '13px', fontWeight: 900, color: '#FFF' }}>🔥 {currentSelected.bossTitle}</span>
              </div>

              {currentSelected.status !== 'locked' ? (
                <Link href={currentSelected.id === 1 ? '/learn/beginnings' : `/practice?kingdom=${currentSelected.slug}`} style={{ textDecoration: 'none' }}>
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
              ) : (
                <div style={{ padding: '12px 24px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#94A3B8', fontSize: '13px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} /> Locked — Complete previous kingdom (80%+) to unlock
                </div>
              )}
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
            {kingdoms.map((k) => {
              const isSelected = k.id === currentSelected.id;
              const isMastered = k.status === 'mastered';
              const isLocked = k.status === 'locked';

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
                      : isLocked
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.12)',
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
                    color: isSelected || isMastered ? '#000' : isLocked ? '#64748B' : '#CBD5E1',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                  title={`${k.title} (${k.status})`}
                >
                  {isLocked ? <Lock size={12} /> : k.id}
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
              <span style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 800 }}>Level {hud.level} ({hud.levelTitle})</span>
            </div>
          </div>

          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94A3B8', fontWeight: 800 }}>
              <span>XP PROGRESS</span>
              <span style={{ color: '#FFF' }}>{hud.xp} Total XP</span>
            </div>
            <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${hud.levelPct}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #EAB308)' }} />
            </div>
          </div>

          <div style={{ gridTemplateColumns: '1fr 1fr', display: 'grid', gap: '10px', marginTop: '14px' }}>
            <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(249, 115, 22, 0.15)', border: '1px solid rgba(249, 115, 22, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Flame size={16} style={{ color: '#F97316' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#FFF', display: 'block' }}>{hud.streak} Days</span>
                <span style={{ fontSize: '9px', color: '#F97316', fontWeight: 700 }}>Streak</span>
              </div>
            </div>

            <div style={{ padding: '8px 12px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Trophy size={16} style={{ color: '#C084FC' }} />
              <div>
                <span style={{ fontSize: '12px', fontWeight: 900, color: '#FFF', display: 'block' }}>{hud.solvedCount}</span>
                <span style={{ fontSize: '9px', color: '#C084FC', fontWeight: 700 }}>Solved Problems</span>
              </div>
            </div>
          </div>
        </div>

        {/* TODAY'S QUESTS */}
        <div style={{ padding: '18px', borderRadius: '20px', background: 'rgba(15, 12, 28, 0.85)', border: '1px solid rgba(168, 85, 247, 0.25)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            RECOMMENDED PRACTICE QUEST
          </span>

          {activeQuest ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Target size={16} style={{ color: '#F59E0B' }} />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#FFF', display: 'block' }}>{activeQuest.problemTitle}</span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>{activeQuest.kingdomTitle} • {activeQuest.difficulty}</span>
                </div>
              </div>

              <Link href={activeQuest.url} style={{ textDecoration: 'none' }}>
                <button type="button" style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)', color: '#C084FC', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}>
                  Solve Now &gt;
                </button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)' }}>
              <CheckCircle2 size={14} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '11px', color: '#FFF' }}>Complete practice problems to unlock quests</span>
            </div>
          )}
        </div>

        {/* UPCOMING BOSS BATTLE */}
        <div style={{ padding: '18px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(40, 10, 20, 0.9) 0%, rgba(20, 5, 10, 0.9) 100%)', border: '1px solid rgba(239, 68, 68, 0.4)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Swords size={16} style={{ color: '#EF4444' }} />
            <span style={{ fontSize: '11px', fontWeight: 900, color: '#EF4444', textTransform: 'uppercase' }}>REALM GUARDIAN</span>
          </div>

          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: '#FFF' }}>{currentSelected.bossTitle}</h4>
          <p style={{ margin: 0, fontSize: '10px', color: '#CBD5E1', lineHeight: '1.4' }}>Readiness: {currentSelected.bossReadinessPct}% • Defeat the Guardian in {currentSelected.title} to claim +{currentSelected.xpReward} XP.</p>

          <Link href={currentSelected.id === 1 ? '/learn/beginnings' : `/practice?kingdom=${currentSelected.slug}`} style={{ textDecoration: 'none', marginTop: '4px' }}>
            <button type="button" style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'linear-gradient(135deg, #EF4444, #991B1B)', border: 'none', color: '#FFF', fontSize: '11px', fontWeight: 900, cursor: 'pointer' }}>
              View Guardian Challenge &gt;
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

const CAMPAIGN_KINGDOMS_FALLBACK = [
  {
    id: 1,
    slug: 'beginnings',
    title: '1. Kingdom of Beginnings',
    subtitle: 'Golden plains, ancient ruins, stone bridges, and the huge compass monument of memory arrays.',
    topic: 'Arrays & Memory Foundations',
    theme: 'Golden plains, stone ruins & ancient compass',
    status: 'available' as const,
    progressPct: 0,
    solvedCount: 0,
    problemsCount: 42,
    patternsCount: 8,
    difficulty: 'Novice' as const,
    estimatedTime: '4 hrs',
    xpReward: 1200,
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(20, 15, 35, 0.95) 70%, rgba(10, 8, 20, 0.98) 100%)',
    icon: '🧭',
    bossTitle: 'The Array Colossus',
    bossReadinessPct: 0,
    dueRevisionCount: 0,
  },
];
