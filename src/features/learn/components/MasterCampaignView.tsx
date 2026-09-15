'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  Zap,
  Search,
  LayoutGrid,
  Grid,
  MapPin,
  ArrowRight,
  Layers,
  Crown,
  Eye,
} from 'lucide-react';

import { CampaignAdapterService, CampaignKingdomView } from '../services/campaign-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { EventBus } from '@/src/core/events/event-bus';
import { useSettings } from '@/src/context/SettingsContext';

export function MasterCampaignView() {
  const { userId } = useActiveUser();
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const [searchQuery, setSearchQuery] = useState('');
  const [layoutMode, setLayoutMode] = useState<'4col' | '5x5'>('4col');
  const [refreshKey, setRefreshKey] = useState(0);

  // Subscribe to real-time events for live updates
  useEffect(() => {
    const handleRefresh = () => {
      CampaignAdapterService.clearCache();
      setRefreshKey((prev) => prev + 1);
    };

    const unsubSolve = EventBus.subscribe('ProblemSolved', handleRefresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', handleRefresh);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', handleRefresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', handleRefresh);

    return () => {
      unsubSolve();
      unsubMemory();
      unsubProfile();
      unsubPlatform();
    };
  }, []);

  const campaignSummary = useMemo(() => {
    return CampaignAdapterService.getCampaignSummary(userId);
  }, [userId, refreshKey]);

  const { hud, kingdoms, regions } = campaignSummary;

  const conqueredCount = kingdoms.filter((k) => k.status === 'mastered').length;
  const overallProgressPct = hud.totalProblems > 0 ? Math.round((hud.solvedCount / hud.totalProblems) * 100) : 0;

  // Filter kingdoms for search query
  const q = searchQuery.toLowerCase().trim();
  const filteredKingdoms = useMemo(() => {
    if (!q) return kingdoms;
    return kingdoms.filter(
      (k) =>
        k.title.toLowerCase().includes(q) ||
        k.topic.toLowerCase().includes(q) ||
        k.subtitle.toLowerCase().includes(q)
    );
  }, [kingdoms, q]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '24px 32px 64px 32px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. ADVENTURE CAMPAIGN HEADER & TELEMETRY ────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '28px 32px',
          borderRadius: '24px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)'
            : 'linear-gradient(135deg, rgba(28, 18, 56, 0.96) 0%, rgba(14, 10, 32, 0.98) 60%, rgba(7, 5, 18, 1) 100%)',
          border: isLight
            ? '1.5px solid rgba(56, 189, 248, 0.35)'
            : '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
          boxShadow: isLight
            ? '0 12px 36px rgba(56, 189, 248, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            width: '100%',
          }}
        >
          {/* Title & World Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.25) 0%, rgba(56, 189, 248, 0.25) 100%)',
                border: '1.5px solid #C084FC',
                boxShadow: '0 0 24px rgba(168, 85, 247, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Compass size={24} style={{ color: '#C084FC' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.02em' }}>
                  THE ALGORITHMIC CAMPAIGN OF AGORA
                </h1>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#FDE047',
                    background: 'rgba(245, 158, 11, 0.15)',
                    padding: '3px 10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    letterSpacing: '0.04em',
                  }}
                >
                  25 TERRITORIES
                </span>
              </div>
              <span style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600 }}>
                Explore 25 Algorithmic Realms across 5 Mystical Continents
              </span>
            </div>
          </div>

          {/* Quick HUD Metrics */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <CheckCircle2 size={20} style={{ color: '#10B981' }} />
              <div>
                <strong style={{ fontSize: '16px', color: '#FFF', display: 'block', lineHeight: 1 }}>
                  {conqueredCount} / 25
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Realms Mastered</span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Zap size={20} style={{ color: '#38BDF8' }} />
              <div>
                <strong style={{ fontSize: '16px', color: '#FFF', display: 'block', lineHeight: 1 }}>
                  {hud.solvedCount} / {hud.totalProblems}
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Total Solved ({overallProgressPct}%)</span>
              </div>
            </div>

            <div
              style={{
                padding: '10px 18px',
                borderRadius: '14px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Trophy size={20} style={{ color: '#F59E0B' }} />
              <div>
                <strong style={{ fontSize: '16px', color: '#FFF', display: 'block', lineHeight: 1 }}>
                  {hud.xp} XP
                </strong>
                <span style={{ fontSize: '10px', color: '#94A3B8', fontWeight: 700 }}>Expedition XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Layout View Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 320px', maxWidth: '500px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search realms, topics, or guardians..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#FFF',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Layout Mode Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setLayoutMode('4col')}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: layoutMode === '4col' ? 'linear-gradient(135deg, #A855F7, #7E22CE)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${layoutMode === '4col' ? '#C084FC' : 'rgba(255, 255, 255, 0.1)'}`,
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: layoutMode === '4col' ? '0 4px 14px rgba(168, 85, 247, 0.4)' : 'none',
              }}
            >
              <LayoutGrid size={14} /> 4-Column Campaign Grid
            </button>

            <button
              type="button"
              onClick={() => setLayoutMode('5x5')}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                background: layoutMode === '5x5' ? 'linear-gradient(135deg, #A855F7, #7E22CE)' : 'rgba(255, 255, 255, 0.04)',
                border: `1px solid ${layoutMode === '5x5' ? '#C084FC' : 'rgba(255, 255, 255, 0.1)'}`,
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: layoutMode === '5x5' ? '0 4px 14px rgba(168, 85, 247, 0.4)' : 'none',
              }}
            >
              <Grid size={14} /> 5×5 Serpentine Map
            </button>
          </div>
        </div>
      </motion.div>

      {/* ── 2. ADVENTURE MAP PRESENTATION (4-COLUMN OR 5x5) ─────────── */}
      {layoutMode === '4col' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '24px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          {filteredKingdoms.map((k, idx) => (
            <AdventureRealmCard key={k.id} kingdom={k} index={idx} />
          ))}
        </div>
      ) : (
        <SerpentineAdventureGrid kingdoms={filteredKingdoms} />
      )}
    </div>
  );
}

// ── SUBSTANTIAL ADVENTURE REALM CARD (NON-RAILWAY / TERRITORY MAP) ─────
function AdventureRealmCard({ kingdom, index }: { kingdom: CampaignKingdomView; index: number }) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const isMastered = kingdom.status === 'mastered';
  const isAvailable = kingdom.status === 'available';
  const isLocked = kingdom.status === 'locked';
  const isCurrent = !isMastered && isAvailable;

  const color = kingdom.color || '#A855F7';
  const cleanTitle = kingdom.title.replace(/^\d+\.\s*/, '');

  return (
    <motion.div
      whileHover={isLocked ? {} : { y: -6, scale: 1.015 }}
      transition={{ duration: 0.25 }}
      style={{
        borderRadius: '24px',
        background: isLight
          ? isLocked
            ? '#F8FAFC'
            : `linear-gradient(135deg, #FFFFFF 0%, ${color}08 50%, #F8FAFC 100%)`
          : isLocked
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, rgba(15, 12, 28, 0.96) 80%)'
          : isCurrent
          ? `linear-gradient(135deg, ${color}25 0%, rgba(20, 15, 40, 0.98) 60%, rgba(8, 6, 20, 1) 100%)`
          : `linear-gradient(135deg, ${color}12 0%, rgba(15, 12, 32, 0.96) 65%, rgba(6, 4, 16, 1) 100%)`,
        border: isLight
          ? isCurrent
            ? `2px solid ${color}`
            : isMastered
            ? `1.5px solid ${color}`
            : '1.5px solid #E2E8F0'
          : isCurrent
          ? `2px solid ${color}`
          : isMastered
          ? `1.5px solid ${color}`
          : `1px solid var(--panel-border, rgba(255, 255, 255, 0.12))`,
        boxShadow: isLight
          ? isCurrent
            ? `0 10px 30px ${color}25`
            : '0 8px 24px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)'
          : isCurrent
          ? `0 14px 40px ${color}35, inset 0 0 20px ${color}15`
          : isMastered
          ? `0 10px 30px ${color}20`
          : '0 8px 24px rgba(0, 0, 0, 0.5)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '350px',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
        opacity: isLocked ? 0.6 : 1,
      }}
    >
      {/* Subtle Glowing Constellation / Pathway Edge */}
      {isCurrent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      )}

      {/* TOP ROW: Emblem, Territory Tag & Status Badge */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>{kingdom.icon}</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: isLocked ? (isLight ? '#94A3B8' : '#94A3B8') : color,
                background: isLocked ? (isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)') : `${color}18`,
                padding: '3px 9px',
                borderRadius: '8px',
                border: isLocked ? (isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)') : `1px solid ${color}33`,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              REALM #{kingdom.id < 10 ? `0${kingdom.id}` : kingdom.id}
            </span>
          </div>

          {/* Floating Status Badge */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 900,
              color: isMastered ? '#10B981' : isCurrent ? '#FFF' : isLocked ? '#94A3B8' : '#0284C7',
              background: isMastered
                ? 'rgba(16, 185, 129, 0.18)'
                : isCurrent
                ? color
                : isLocked
                ? isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)'
                : isLight ? 'rgba(2, 132, 199, 0.12)' : 'rgba(56, 189, 248, 0.15)',
              padding: '4px 10px',
              borderRadius: '8px',
              border: isMastered
                ? '1px solid rgba(16, 185, 129, 0.4)'
                : isCurrent
                ? 'none'
                : isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: isCurrent ? `0 0 12px ${color}` : 'none',
            }}
          >
            {isMastered ? (
              <>
                <CheckCircle2 size={12} strokeWidth={3} /> MASTERED
              </>
            ) : isCurrent ? (
              <>
                <Zap size={11} fill="#FFF" /> CURRENT REALM
              </>
            ) : isLocked ? (
              <>
                <Lock size={11} /> LOCKED
              </>
            ) : (
              'AVAILABLE'
            )}
          </span>
        </div>

        {/* Realm Title & Topic */}
        <h3
          style={{
            margin: '0 0 4px 0',
            fontSize: '18px',
            fontWeight: 900,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {cleanTitle}
        </h3>
        <span style={{ fontSize: '12px', fontWeight: 800, color: isLocked ? 'var(--text-muted)' : color, display: 'block', marginBottom: '8px' }}>
          {kingdom.topic}
        </span>
        <p
          style={{
            margin: 0,
            fontSize: '12px',
            color: 'var(--text-muted)',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {kingdom.subtitle || kingdom.theme}
        </p>
      </div>

      {/* MIDDLE: Circular / Radial Mastery Indicator & Stats */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderRadius: '16px',
          background: isLight ? '#FFFFFF' : 'rgba(7, 5, 18, 0.75)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          gap: '12px',
        }}
      >
        {/* Left: Radial Mastery Gauge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <RadialMasteryGauge percentage={kingdom.progressPct} color={color} isMastered={isMastered} />
          <div>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              Mastery Progress
            </span>
            <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
              <span style={{ color }}>{kingdom.solvedCount}</span> / {kingdom.problemsCount} Solved
            </strong>
          </div>
        </div>

        {/* Right: Patterns & XP Reward */}
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>
            {kingdom.patternsCount} Patterns
          </span>
          <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 900, display: 'block' }}>
            +{kingdom.xpReward} XP
          </span>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: '#94A3B8',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '3px 8px',
            borderRadius: '6px',
          }}
        >
          {kingdom.difficulty}
        </span>

        {!isLocked ? (
          <Link
            href={kingdom.id === 1 ? '/learn/beginnings' : `/practice/${kingdom.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              type="button"
              style={{
                padding: '7px 16px',
                borderRadius: '10px',
                background: isCurrent
                  ? `linear-gradient(135deg, ${color}, #8B5CF6)`
                  : `${color}25`,
                border: isCurrent ? 'none' : `1px solid ${color}66`,
                color: '#FFF',
                fontSize: '12px',
                fontWeight: 900,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isCurrent ? `0 4px 16px ${color}66` : 'none',
              }}
            >
              Enter Realm <ArrowRight size={13} />
            </motion.button>
          </Link>
        ) : (
          <button
            disabled
            type="button"
            style={{
              padding: '7px 16px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: '#64748B',
              fontSize: '12px',
              fontWeight: 800,
              cursor: 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Lock size={12} /> Locked
          </button>
        )}
      </div>
    </motion.div>
  );
}

// ── COMPACT RADIAL MASTERY GAUGE ───────────────────────────────────────
function RadialMasteryGauge({
  percentage,
  color,
  isMastered,
}: {
  percentage: number;
  color: string;
  isMastered: boolean;
}) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track Circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="3.5"
        />
        {/* Progress Circle */}
        <circle
          cx="22"
          cy="22"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      {/* Center Label */}
      <span
        style={{
          position: 'absolute',
          fontSize: '10px',
          fontWeight: 900,
          color: isMastered ? '#10B981' : '#FFF',
        }}
      >
        {percentage}%
      </span>
    </div>
  );
}

// ── 5x5 SERPENTINE ADVENTURE MAP GRID ──────────────────────────────────
function SerpentineAdventureGrid({ kingdoms }: { kingdoms: CampaignKingdomView[] }) {
  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '32px',
        borderRadius: '24px',
        background: 'rgba(12, 10, 26, 0.95)',
        border: '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF' }}>
            5×5 SERPENTINE EXPEDITION MAP
          </h2>
          <span style={{ fontSize: '12px', color: '#94A3B8' }}>
            Linear traversal across 25 connected kingdom landmarks
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {kingdoms.map((k) => (
          <Link
            key={k.id}
            href={k.status !== 'locked' ? (k.id === 1 ? '/learn/beginnings' : `/practice/${k.slug}`) : '#'}
            style={{ textDecoration: 'none' }}
          >
            <motion.div
              whileHover={k.status !== 'locked' ? { scale: 1.03, y: -3 } : {}}
              style={{
                padding: '16px',
                borderRadius: '16px',
                background: k.status === 'mastered'
                  ? 'rgba(16, 185, 129, 0.15)'
                  : k.status === 'available'
                  ? `${k.color}18`
                  : 'rgba(255, 255, 255, 0.03)',
                border: k.status === 'mastered'
                  ? '1.5px solid #10B981'
                  : k.status === 'available'
                  ? `1.5px solid ${k.color}`
                  : '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: k.status !== 'locked' ? 'pointer' : 'not-allowed',
                opacity: k.status === 'locked' ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '20px' }}>{k.icon}</span>
                <span style={{ fontSize: '10px', fontWeight: 900, color: k.color }}>
                  #{k.id}
                </span>
              </div>
              <strong style={{ fontSize: '14px', color: '#FFF', display: 'block' }}>
                {k.title.replace(/^\d+\.\s*/, '')}
              </strong>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                <span>{k.topic}</span>
                <span style={{ color: k.color, fontWeight: 800 }}>{k.progressPct}%</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
