'use client';

import React from 'react';
import { colors, radius, animations } from '@/src/design';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  progress: number;
  height?: string | number;
  color?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, height = 8, color = colors.primary, showLabel = false, style, ...props }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: colors.foreground }}>
          <span>Progress</span>
          <span>{Math.round(safeProgress)}%</span>
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          backgroundColor: colors.mutedBg,
          borderRadius: radius.full,
          overflow: 'hidden',
          ...style
        }}
        {...props}
      >
        <div
          style={{
            width: `${safeProgress}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius: radius.full,
            transition: `width ${animations.transition.normal}`,
          }}
        />
      </div>
    </div>
  );
}
