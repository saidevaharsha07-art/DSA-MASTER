'use client';

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { motion, HTMLMotionProps } from 'framer-motion';
import { colors, radius, typography, spacing, shadows, animations } from '@/src/design';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant = 'primary', size = 'md', style, children, ...props }, ref) => {
    
    let baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      borderRadius: radius.md,
      fontWeight: typography.fontWeight.semibold,
      cursor: 'pointer',
      border: '1px solid transparent',
      transition: `background-color ${animations.transition.fast}, color ${animations.transition.fast}, border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}`,
      fontFamily: typography.fontFamily.sans,
      outline: 'none',
    };

    if (size === 'sm') {
      baseStyle = { ...baseStyle, padding: `${spacing.xs} ${spacing.md}`, fontSize: typography.fontSize.label };
    } else if (size === 'md') {
      baseStyle = { ...baseStyle, padding: `${spacing.sm} ${spacing.lg}`, fontSize: typography.fontSize.caption };
    } else if (size === 'lg') {
      baseStyle = { ...baseStyle, padding: `12px ${spacing.xl}`, fontSize: typography.fontSize.body };
    } else if (size === 'icon') {
      baseStyle = { ...baseStyle, padding: spacing.sm, fontSize: typography.fontSize.body, borderRadius: radius.md };
    }

    let whileHover = {};
    let whileTap = { scale: 0.98 };

    if (variant === 'primary') {
      baseStyle = { 
        ...baseStyle, 
        backgroundColor: colors.primary, 
        color: '#fff',
        boxShadow: shadows.md
      };
      whileHover = { scale: 1.02, translateY: -1, boxShadow: shadows.glow };
    } else if (variant === 'ghost') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', color: colors.muted };
      whileHover = { backgroundColor: colors.mutedBg, color: colors.foreground };
    } else if (variant === 'outline') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', color: colors.foreground, border: `1px solid ${colors.border}` };
      whileHover = { backgroundColor: colors.mutedBg };
    } else if (variant === 'danger') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', color: colors.danger, border: `1px solid ${colors.dangerBg}` };
      whileHover = { backgroundColor: colors.danger, color: '#fff', boxShadow: `0 0 15px ${colors.dangerBg}` };
    }

    if (asChild) {
      // If using asChild, we skip framer-motion to avoid Slot prop conflicts
      return (
        <Slot ref={ref} style={{ ...baseStyle, ...style }} {...props}>
          {children}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        style={{ ...baseStyle, ...style }}
        whileHover={whileHover}
        whileTap={whileTap}
        {...(props as HTMLMotionProps<"button">)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
