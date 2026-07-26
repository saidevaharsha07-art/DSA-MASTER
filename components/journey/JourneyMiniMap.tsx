'use client';

import React from 'react';
import { WorldInfo } from './worldData';
import { Card } from '@/src/components/ui';
import { colors, radius, shadows } from '@/src/design';

interface JourneyMiniMapProps {
  worldsList: WorldInfo[];
  currentWorldId: number;
  completedWorldIds: number[];
  onNodeClick: (worldId: number) => void;
}

export function JourneyMiniMap({
  worldsList,
  currentWorldId,
  completedWorldIds,
  onNodeClick,
}: JourneyMiniMapProps) {
  // Minimap scaled bounds (width: 140px, height: 100px)
  const minX = 100;
  const maxX = 1400;
  const minY = 50;
  const maxY = 1500;

  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * 120 + 10;
  const scaleY = (y: number) => ((y - minY) / (maxY - minY)) * 80 + 10;

  return (
    <Card padding="none" style={{ 
      width: '140px', 
      height: '100px', 
      position: 'relative', 
      overflow: 'hidden', 
      boxShadow: shadows.lg,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${colors.border}`,
      borderRadius: radius.md
    }}>
      <svg width="100%" height="100%">
        {/* Draw Connection Edges */}
        {worldsList.map((w, idx) => {
          if (idx === 0) return null;
          const prev = worldsList[idx - 1];
          const isUnlocked = completedWorldIds.includes(prev.id) || prev.id === currentWorldId;
          
          return (
            <line
              key={idx}
              x1={scaleX(prev.x)}
              y1={scaleY(prev.y)}
              x2={scaleX(w.x)}
              y2={scaleY(w.y)}
              stroke={isUnlocked ? colors.primary : 'rgba(255,255,255,0.05)'}
              strokeWidth={1.5}
            />
          );
        })}

        {/* Draw Node Dots */}
        {worldsList.map((w) => {
          const isCompleted = completedWorldIds.includes(w.id);
          const isCurrent = w.id === currentWorldId;
          const isLocked = !isCompleted && !isCurrent;

          let dotColor = 'rgba(255,255,255,0.15)';
          if (isCompleted) dotColor = colors.success;
          else if (isCurrent) dotColor = colors.primary;

          return (
            <circle
              key={w.id}
              cx={scaleX(w.x)}
              cy={scaleY(w.y)}
              r={3}
              fill={dotColor}
              style={{ cursor: isLocked ? 'not-allowed' : 'pointer' }}
              onClick={() => !isLocked && onNodeClick(w.id)}
            />
          );
        })}
      </svg>
    </Card>
  );
}
