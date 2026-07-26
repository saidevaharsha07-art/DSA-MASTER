'use client';

import React from 'react';
import { Search, Sparkles, Flame, Target, Map as MapIcon, Award, Shield, Lock } from 'lucide-react';
import { Card, Badge, ProgressBar } from '@/src/components/ui';
import { colors, typography, spacing, radius, shadows, zIndex } from '@/src/design';
import { WorldInfo } from './worldData';

interface JourneyOverlayProps {
  user: {
    name: string;
    xp: number;
    streak: number;
  };
  currentWorld: WorldInfo;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  miniMap: React.ReactNode;
}

export function JourneyOverlay({
  user,
  currentWorld,
  searchQuery,
  setSearchQuery,
  miniMap,
}: JourneyOverlayProps) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: zIndex.overlay }}>
      
      {/* ================= HEADER HUD ================= */}
      {/* 1. Top Left - Current World Card */}
      <div style={{ position: 'absolute', top: spacing.md, left: spacing.md, pointerEvents: 'auto', width: '240px' }}>
        <Card padding="md" style={{
          backgroundColor: 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${colors.border}`,
          boxShadow: shadows.lg
        }}>
          <span style={{ fontSize: '10px', color: colors.muted, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1px' }}>
            Current World
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, marginTop: spacing.xs, marginBottom: spacing.sm }}>
            <div style={{ 
              width: '28px', 
              height: '28px', 
              borderRadius: radius.full, 
              backgroundColor: currentWorld.themeColor + '15', 
              color: currentWorld.themeColor, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontSize: typography.fontSize.label, 
              fontWeight: typography.fontWeight.bold 
            }}>
              {currentWorld.id}
            </div>
            <h3 style={{ fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, margin: 0, color: colors.foreground }}>
              {currentWorld.name}
            </h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: spacing.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colors.muted }}>
              <span>World Completion</span>
              <span style={{ color: currentWorld.id === 2 ? colors.primary : colors.success, fontWeight: typography.fontWeight.semibold }}>
                {currentWorld.id === 2 ? '0%' : '100%'}
              </span>
            </div>
            <ProgressBar progress={currentWorld.id === 2 ? 0 : 100} color={currentWorld.id === 2 ? colors.primary : colors.success} height={4} />
          </div>
          <span style={{ fontSize: '11px', color: colors.muted }}>
            {currentWorld.id === 2 ? '0 / 12 Patterns' : '25 / 25 Patterns'} completed
          </span>
        </Card>
      </div>

      {/* 2. Top Center - Unified Search bar */}
      <div style={{ position: 'absolute', top: spacing.md, left: '42%', transform: 'translateX(-50%)', pointerEvents: 'auto', width: '360px' }}>
        <div style={{ 
          backgroundColor: 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${colors.border}`,
          padding: `10px ${spacing.md}`,
          borderRadius: radius.lg,
          display: 'flex',
          alignItems: 'center',
          boxShadow: shadows.lg
        }}>
          <Search size={16} color={colors.muted} />
          <input 
            type="text" 
            placeholder="Search patterns, worlds or skills... (⌘K)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: colors.foreground, 
              marginLeft: spacing.sm, 
              outline: 'none', 
              width: '100%',
              fontFamily: typography.fontFamily.sans, 
              fontSize: typography.fontSize.caption 
            }} 
          />
        </div>
      </div>

      {/* 3. Top Right - Global Game Stats */}
      <div style={{ position: 'absolute', top: spacing.md, right: '340px', pointerEvents: 'auto' }}>
        <div style={{ display: 'flex', gap: spacing.sm }}>
          {/* Streak */}
          <Card padding="none" style={{ 
            backgroundColor: 'rgba(9, 13, 22, 0.85)', 
            backdropFilter: 'blur(16px)', 
            border: `1px solid ${colors.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            gap: spacing.sm, 
            height: '36px', 
            padding: `0 ${spacing.md}` 
          }}>
            <Flame size={14} color="#f97316" />
            <span style={{ fontSize: '11px', color: colors.muted }}>Streak</span>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: colors.foreground }}>{user.streak}d</span>
          </Card>
          
          {/* XP */}
          <Card padding="none" style={{ 
            backgroundColor: 'rgba(9, 13, 22, 0.85)', 
            backdropFilter: 'blur(16px)', 
            border: `1px solid ${colors.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            gap: spacing.sm, 
            height: '36px', 
            padding: `0 ${spacing.md}` 
          }}>
            <Sparkles size={14} color="#eab308" />
            <span style={{ fontSize: '11px', color: colors.muted }}>XP</span>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: colors.foreground }}>{user.xp}</span>
          </Card>

          {/* Coins */}
          <Card padding="none" style={{ 
            backgroundColor: 'rgba(9, 13, 22, 0.85)', 
            backdropFilter: 'blur(16px)', 
            border: `1px solid ${colors.border}`, 
            display: 'flex', 
            alignItems: 'center', 
            gap: spacing.sm, 
            height: '36px', 
            padding: `0 ${spacing.md}` 
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: radius.full, backgroundColor: '#f59e0b', color: '#fff', fontSize: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</div>
            <span style={{ fontSize: '11px', color: colors.muted }}>Coins</span>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: colors.foreground }}>2,150</span>
          </Card>
        </div>
      </div>

      {/* ================= RIGHT SIDEBAR HUD ================= */}
      <div style={{ position: 'absolute', top: spacing.md, right: spacing.md, bottom: spacing.md, width: '300px', display: 'flex', flexDirection: 'column', gap: spacing.md, pointerEvents: 'auto' }}>
        
        {/* Overall Progress */}
        <Card padding="md" style={{ backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}` }}>
          <span style={{ fontSize: '10px', color: colors.muted, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1.5px' }}>Overall Progress</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.md, marginTop: spacing.sm }}>
            <div style={{ width: '60px', height: '60px', borderRadius: radius.full, border: `4px solid ${colors.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: typography.fontSize.body, fontWeight: 'bold', color: colors.foreground }}>
              10%
            </div>
            <div>
              <div style={{ fontSize: typography.fontSize.caption, fontWeight: 'bold', color: colors.foreground }}>25 / 250 Patterns</div>
              <div style={{ fontSize: '11px', color: colors.muted }}>Across 10 biomes</div>
            </div>
          </div>
        </Card>

        {/* Today's Mission */}
        <Card padding="md" style={{ backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: colors.primary, marginBottom: spacing.xs }}>
            <Target size={14} />
            <span style={{ fontSize: '10px', color: colors.primary, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1px' }}>Today&apos;s Mission</span>
          </div>
          <h4 style={{ margin: 0, fontSize: typography.fontSize.caption, fontWeight: 'bold', color: colors.foreground }}>Master 2D Prefix Sum</h4>
          <span style={{ fontSize: '11px', color: colors.muted, display: 'block', marginTop: '2px' }}>Solve 2 problems using 2D prefix sums</span>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: colors.muted, marginTop: spacing.sm, marginBottom: '4px' }}>
            <span>Progress</span>
            <span>0 / 2</span>
          </div>
          <ProgressBar progress={0} color={colors.primary} height={4} />
        </Card>

        {/* Next Unlock */}
        <Card padding="md" style={{ backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, color: '#f59e0b', marginBottom: spacing.xs }}>
            <Lock size={14} />
            <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1px' }}>Next Unlock</span>
          </div>
          <h4 style={{ margin: 0, fontSize: typography.fontSize.caption, fontWeight: 'bold', color: colors.foreground }}>Hash Forest</h4>
          <span style={{ fontSize: '11px', color: colors.muted, display: 'block', marginTop: '2px' }}>Unlocks after completing Array Valley</span>
          <div style={{ marginTop: spacing.sm }}>
            <ProgressBar progress={100} color={colors.success} height={4} />
          </div>
        </Card>

        {/* Legend */}
        <Card padding="md" style={{ backgroundColor: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(16px)', border: `1px solid ${colors.border}`, marginTop: 'auto' }}>
          <span style={{ fontSize: '10px', color: colors.muted, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase', letterSpacing: '1.5px' }}>World Legend</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm, marginTop: spacing.sm }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, fontSize: '10px', color: colors.muted }}>
              <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: colors.success }}></div>
              <span>Completed</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, fontSize: '10px', color: colors.muted }}>
              <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: colors.primary }}></div>
              <span>Current</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, fontSize: '10px', color: colors.muted }}>
              <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: '#f59e0b' }}></div>
              <span>Boss</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: spacing.xs, fontSize: '10px', color: colors.muted }}>
              <div style={{ width: '8px', height: '8px', borderRadius: radius.full, backgroundColor: '#334155' }}></div>
              <span>Locked</span>
            </div>
          </div>
        </Card>
      </div>

      {/* ================= BOTTOM LEFT HUD ================= */}
      <div style={{ position: 'absolute', bottom: spacing.md, left: spacing.md, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', gap: spacing.sm }}>
        {miniMap}
      </div>

    </div>
  );
}
