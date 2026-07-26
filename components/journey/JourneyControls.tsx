'use client';

import React from 'react';
import { ZoomIn, ZoomOut, Maximize, Minimize } from 'lucide-react';
import { Button, Card } from '@/src/components/ui';
import { colors, shadows, spacing } from '@/src/design';

interface JourneyControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onFitMap: () => void;
}

export function JourneyControls({ onZoomIn, onZoomOut, onReset, onFitMap }: JourneyControlsProps) {
  return (
    <Card padding="none" style={{ 
      display: 'flex', 
      flexDirection: 'row', // Horizontal stack for bottom right placement
      gap: '2px', 
      boxShadow: shadows.lg,
      backgroundColor: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
      borderRadius: '8px',
      pointerEvents: 'auto'
    }}>
      <Button 
        variant="ghost" 
        onClick={onZoomIn} 
        style={{ padding: spacing.sm, height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} 
        aria-label="Zoom In"
      >
        <ZoomIn size={16} color={colors.foreground} />
      </Button>
      <div style={{ width: '1px', background: colors.border }} />
      <Button 
        variant="ghost" 
        onClick={onZoomOut} 
        style={{ padding: spacing.sm, height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} 
        aria-label="Zoom Out"
      >
        <ZoomOut size={16} color={colors.foreground} />
      </Button>
      <div style={{ width: '1px', background: colors.border }} />
      <Button 
        variant="ghost" 
        onClick={onReset} 
        style={{ padding: spacing.sm, height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} 
        aria-label="Reset View"
      >
        <Maximize size={16} color={colors.foreground} />
      </Button>
      <div style={{ width: '1px', background: colors.border }} />
      <Button 
        variant="ghost" 
        onClick={onFitMap} 
        style={{ padding: spacing.sm, height: '36px', width: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 }} 
        aria-label="Fit Map"
      >
        <Minimize size={16} color={colors.foreground} />
      </Button>
    </Card>
  );
}
