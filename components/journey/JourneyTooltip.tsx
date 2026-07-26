'use client';

import React from 'react';
import { Card, Badge } from '@/src/components/ui';
import { colors, typography, spacing, radius, shadows } from '@/src/design';
import { Clock, Shield, Sparkles } from 'lucide-react';
import { WorldInfo } from './worldData';

interface JourneyTooltipProps {
  world: WorldInfo;
  status: 'completed' | 'current' | 'locked';
  x: number;
  y: number;
}

export function JourneyTooltip({ world, status, x, y }: JourneyTooltipProps) {
  const isCompleted = status === 'completed';
  const isCurrent = status === 'current';

  return (
    <div 
      style={{
        position: 'absolute',
        left: x + 60, // Align offset to the right of node
        top: y - 50,
        zIndex: 50,
        pointerEvents: 'none',
        width: '260px',
      }}
    >
      <Card padding="md" style={{
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${world.themeColor}`,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.5)`,
        display: 'flex',
        flexDirection: 'column',
        gap: spacing.sm,
      }}>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
            <span style={{ fontSize: typography.fontSize.label, color: colors.muted, fontWeight: typography.fontWeight.bold, textTransform: 'uppercase' }}>
              {world.biome}
            </span>
            <Badge variant={isCompleted ? "easy" : "primary"}>
              {isCompleted ? "Completed" : "Available"}
            </Badge>
          </div>
          <h4 style={{ margin: 0, fontSize: typography.fontSize.body, fontWeight: typography.fontWeight.bold, color: colors.foreground }}>
            {world.name}
          </h4>
        </div>

        <div style={{ height: '1px', background: colors.border, margin: '2px 0' }} />

        {/* Boss info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '10px', color: colors.muted, textTransform: 'uppercase', fontWeight: typography.fontWeight.bold }}>World Boss</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.foreground, fontSize: typography.fontSize.caption }}>
            <Shield size={14} color="#f59e0b" />
            <span style={{ fontWeight: typography.fontWeight.semibold }}>{world.boss}</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.sm }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.muted, fontSize: typography.fontSize.caption }}>
            <Clock size={14} />
            <span>{world.id * 10}h Est.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: colors.muted, fontSize: typography.fontSize.caption }}>
            <Sparkles size={14} color="#eab308" />
            <span>+{world.rewardXp} XP</span>
          </div>
        </div>

      </Card>
    </div>
  );
}
