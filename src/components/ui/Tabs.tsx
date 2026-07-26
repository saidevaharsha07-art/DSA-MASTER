'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { colors, radius, spacing, typography, animations } from '@/src/design';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.mutedBg,
      padding: spacing.xs,
      borderRadius: radius.lg,
      ...style
    }}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      borderRadius: radius.md,
      padding: `${spacing.sm} ${spacing.lg}`,
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.caption,
      fontWeight: typography.fontWeight.medium,
      transition: `all ${animations.transition.fast}`,
      color: colors.muted,
      cursor: 'pointer',
      border: 'none',
      background: 'transparent',
      ...style
    }}
    onMouseEnter={(e) => {
      if (e.currentTarget.dataset.state !== 'active') {
        e.currentTarget.style.color = colors.foreground;
      }
    }}
    onMouseLeave={(e) => {
      if (e.currentTarget.dataset.state !== 'active') {
        e.currentTarget.style.color = colors.muted;
      }
    }}
    {...props}
    // We can't do pseudo-classes easily in inline styles without styled-components,
    // so for state=active we use a tiny bit of global CSS or just inline style hacks.
    // However, Radix adds data-state="active", which we can target globally if needed.
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, style, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    style={{
      marginTop: spacing.md,
      outline: 'none',
      ...style
    }}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
