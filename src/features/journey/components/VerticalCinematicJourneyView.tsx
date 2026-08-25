'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Compass,
  Sparkles,
  Trophy,
  Flame,
  CheckCircle2,
  Lock,
  ChevronRight,
  Shield,
  Swords,
  Scroll,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Crown,
  Zap,
  Grid,
  MapPin,
  Trees,
  Mountain,
  Snowflake,
  Sun,
  Globe
} from 'lucide-react';

import { Serpentine5x5CampaignView } from './Serpentine5x5CampaignView';
import { CampaignAdapterService } from '@/src/features/learn/services/campaign-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';

export function VerticalCinematicJourneyView() {
  const [layoutMode, setLayoutMode] = useState<'continent' | '4col' | '5x5'>('continent');
  const [zoomingPortal, setZoomingPortal] = useState<string | null>(null);

  const { userId } = useActiveUser();
  // Fetch 100% Dynamic Engine Data via CampaignAdapterService
  const campaignSummary = useMemo(() => {
    return CampaignAdapterService.getCampaignSummary(userId);
  }, [userId]);

  const { hud, regions: canonicalRegions, kingdoms: canonicalKingdoms } = campaignSummary;

  if (layoutMode === '5x5') {
    return <Serpentine5x5CampaignView onSwitchLayout={() => setLayoutMode('continent')} />;
  }

  if (layoutMode === '4col') {
    return <Grid4ColCampaignView onSwitchLayout={(mode) => setLayoutMode(mode)} />;
  }

  // Map canonical regions to visual continent card models
  const continentRegions = canonicalRegions.map((reg, rIdx) => {
    return {
      id: reg.id,
      name: reg.name,
      description: reg.description,
      color: reg.color,
      roadConnector: reg.roadConnector,
      kingdoms: reg.kingdoms.map((k) => {
        return {
          id: k.id,
          slug: k.slug,
          name: k.title,
          subtitle: k.subtitle,
          topic: k.topic,
          difficulty: k.difficulty,
          status: k.status === 'mastered' ? 'completed' : k.status === 'available' ? 'active' : 'locked',
          progress: k.progressPct,
          xpReward: k.xpReward,
          problemsCount: k.problemsCount,
          npcGuide: 'Elder Oros',
          bossName: k.bossTitle,
          bgImage: `/assets/journey/kingdoms/kingdom-${String(k.id).padStart(2, '0')}.webp`,
          fallbackGrad: k.bgGradient,
          accentColor: k.color,
          stoneBorder: `3px solid ${k.color}`,
          glowBox: `0 0 32px ${k.color}45`,
          environmentArt: k.theme,
          landscapeDetail: k.subtitle,
        };
      }),
    };
  });

  const conqueredCount = canonicalKingdoms.filter((k) => k.status === 'mastered').length;
  const overallProgressPct = hud.totalProblems > 0 ? Math.round((hud.solvedCount / hud.totalProblems) * 100) : 0;

  return (
    <div style={{ background: '#070512', minHeight: '100vh', color: '#FFF', fontFamily: 'var(--font-sans, sans-serif)', position: 'relative', overflowX: 'hidden' }}>
      
      {/* PORTAL WARP ANIMATION OVERLAY */}
      <AnimatePresence>
        {zoomingPortal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 25 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'radial-gradient(circle, #A855F7 0%, #38BDF8 40%, #070512 100%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* TOP FLOATING NAVIGATION BAR */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)', background: 'rgba(7, 5, 18, 0.85)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '16px 32px' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '8px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.4)' }}>
              <Compass size={22} style={{ color: '#C084FC' }} />
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
                THE ALGORITHMIC CONTINENT OF AGORA
              </h1>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>
                25 Handcrafted Kingdoms Across 5 Biomes • Dynamic RPG Progression
              </span>
            </div>
          </div>

          {/* VIEW LAYOUT SWITCHER TOGGLE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(15, 12, 28, 0.95)', padding: '4px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <button
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #A855F7, #7E22CE)',
                border: 'none',
                color: '#FFF',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 10px rgba(168, 85, 247, 0.4)',
              }}
            >
              <Globe size={13} /> Organic Continent Map
            </button>

            <button
              onClick={() => setLayoutMode('4col')}
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                color: '#CBD5E1',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Grid size={13} /> 4-Column Grid
            </button>

            <button
              onClick={() => setLayoutMode('5x5')}
              type="button"
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                color: '#CBD5E1',
                fontSize: '11px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Grid size={13} /> 5×5 Map
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '12px', color: '#CBD5E1', fontWeight: 800 }}>
            <span>Progress: <strong style={{ color: '#10B981' }}>{overallProgressPct}%</strong></span>
            <span>Conquered: <strong style={{ color: '#38BDF8' }}>{conqueredCount} / 25</strong></span>
            <span>Total XP: <strong style={{ color: '#FDE047' }}>{hud.xp} XP</strong></span>
          </div>
        </div>
      </div>

      {/* LIVING HANDCRAFTED CONTINENT MAP CONTAINER */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '48px 32px', display: 'flex', flexDirection: 'column', gap: '56px' }}>
        {continentRegions.map((region, idx) => (
          <React.Fragment key={region.id}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* REGION HEADER */}
              <div style={{ borderLeft: `4px solid ${region.color}`, paddingLeft: '16px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF', letterSpacing: '0.05em' }}>
                  {region.name}
                </h2>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#94A3B8', fontWeight: 700 }}>
                  {region.description}
                </p>
              </div>

              {/* REGIONAL KINGDOM CARDS - ORGANIC ISOMETRIC CONTINENT PLACEMENT */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
                {region.kingdoms.map((k) => (
                  <OrganicKingdomCard key={k.id} card={k} onPortal={(name) => setZoomingPortal(name)} />
                ))}
              </div>
            </div>

            {/* ORGANIC REALMIC ROAD CONNECTOR BETWEEN REGIONS */}
            {idx < continentRegions.length - 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px 0' }}>
                <div style={{ width: '2px', height: '36px', background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(56, 189, 248, 0.6))' }} />
                <span style={{ fontSize: '11px', color: '#CBD5E1', fontWeight: 900, padding: '6px 18px', borderRadius: '12px', background: 'rgba(15, 12, 28, 0.95)', border: '1px solid rgba(255, 255, 255, 0.12)', letterSpacing: '0.05em' }}>
                  {region.roadConnector}
                </span>
                <div style={{ width: '2px', height: '36px', background: 'linear-gradient(180deg, rgba(56, 189, 248, 0.6), rgba(168, 85, 247, 0.6))' }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

{/* REUSABLE ORGANIC KINGDOM CARD FOR WORLD MAP */}
function OrganicKingdomCard({ card, onPortal }: { card: any; onPortal: (name: string) => void }) {
  const isLocked = card.status === 'locked';
  const isCompleted = card.status === 'completed';

  return (
    <motion.div
      whileHover={{ y: isLocked ? 0 : -6, scale: isLocked ? 1 : 1.02 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: card.fallbackGrad,
        border: card.stoneBorder,
        boxShadow: card.glowBox,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '380px',
        opacity: isLocked ? 0.6 : 1,
        filter: isLocked ? 'grayscale(0.7)' : 'none',
      }}
    >
      <div style={{ padding: '24px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', padding: '4px 10px', borderRadius: '12px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: card.accentColor }}>
            REALM #{card.id} • {card.topic}
          </span>
          <span style={{ fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '12px', background: isCompleted ? 'rgba(16, 185, 129, 0.3)' : isLocked ? 'rgba(0,0,0,0.4)' : 'rgba(56, 189, 248, 0.3)', color: isCompleted ? '#34D399' : isLocked ? '#94A3B8' : '#38BDF8' }}>
            {card.status.toUpperCase()}
          </span>
        </div>

        <div>
          <h3 style={{ margin: '8px 0 4px 0', fontSize: '22px', fontWeight: 900, color: '#FFF' }}>
            {card.name}
          </h3>
          <p style={{ margin: 0, fontSize: '12px', color: '#CBD5E1', lineHeight: '1.4' }}>
            {card.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(7, 5, 18, 0.85)', backdropFilter: 'blur(12px)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 800, color: '#94A3B8' }}>
            <span>MASTERY ({card.progress}%)</span>
            <span style={{ color: card.accentColor }}>+{card.xpReward} XP</span>
          </div>

          <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
            <div style={{ width: `${card.progress}%`, height: '100%', background: card.accentColor }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Guardian: {card.bossName}</span>

            {!isLocked ? (
              <Link href={card.id === 1 ? '/learn/beginnings' : `/practice?kingdom=${card.slug}`} style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  onClick={() => onPortal(card.name)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '10px',
                    background: card.accentColor,
                    border: 'none',
                    color: '#000',
                    fontSize: '11px',
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  Enter Realm &gt;
                </motion.button>
              </Link>
            ) : (
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Lock size={12} /> Locked
              </div>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
}

{/* REUSABLE 4-COLUMN SERPENTINE CAMPAIGN GRID COMPONENT */}
function Grid4ColCampaignView({ onSwitchLayout }: { onSwitchLayout: (mode: 'continent' | '4col' | '5x5') => void }) {
  const campaignSummary = useMemo(() => {
    return CampaignAdapterService.getCampaignSummary('default_user');
  }, []);

  return (
    <div style={{ background: '#070512', minHeight: '100vh', padding: '32px', color: '#FFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900 }}>4-COLUMN CAMPAIGN GRID</h1>
        <button onClick={() => onSwitchLayout('continent')} style={{ padding: '8px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#FFF', fontWeight: 800, cursor: 'pointer' }}>
          Back to Continent Map
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {campaignSummary.kingdoms.map((k) => (
          <div key={k.id} style={{ padding: '20px', borderRadius: '16px', background: k.bgGradient, border: `1px solid ${k.color}` }}>
            <span style={{ fontSize: '10px', fontWeight: 900, color: k.color }}>REALM #{k.id}</span>
            <h3 style={{ margin: '4px 0', fontSize: '16px', fontWeight: 900 }}>{k.title}</h3>
            <p style={{ fontSize: '11px', color: '#CBD5E1' }}>{k.topic} • {k.progressPct}% Solved</p>
          </div>
        ))}
      </div>
    </div>
  );
}
