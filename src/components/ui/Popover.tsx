'use client';

import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { colors, radius, shadows, zIndex, spacing } from '@/src/design';

export function Popover({ trigger, children, align = 'center' }: {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
}) {
  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {trigger}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align={align}
          sideOffset={8}
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.lg,
            border: `1px solid ${colors.border}`,
            padding: spacing.md,
            boxShadow: shadows.lg,
            zIndex: zIndex.popover,
            minWidth: '200px'
          }}
        >
          {children}
          <PopoverPrimitive.Arrow style={{ fill: colors.card, stroke: colors.border, strokeWidth: 1 }} />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
