'use client';

import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { colors, radius, shadows, typography, zIndex, spacing, animations } from '@/src/design';

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <TooltipPrimitive.Provider delayDuration={300}>{children}</TooltipPrimitive.Provider>;
}

export function Tooltip({ children, content, side = 'top' }: {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={5}
          style={{
            backgroundColor: colors.foreground,
            color: colors.background,
            borderRadius: radius.md,
            padding: `${spacing.xs} ${spacing.sm}`,
            fontSize: typography.fontSize.label,
            fontWeight: typography.fontWeight.semibold,
            fontFamily: typography.fontFamily.sans,
            boxShadow: shadows.md,
            zIndex: zIndex.tooltip,
            animation: `0.15s ease-out 0s 1 normal none running fadeIn`, // Needs a keyframe in globals.css theoretically, but acceptable for now
          }}
        >
          {content}
          <TooltipPrimitive.Arrow style={{ fill: colors.foreground }} />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
