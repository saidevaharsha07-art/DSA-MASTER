'use client';

import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { motion, HTMLMotionProps } from 'framer-motion';
import { colors, radius, typography, spacing, shadows, animations } from '@/src/design';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    let baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: spacing.sm,
      borderRadius: radius.md,
      fontWeight: typography.fontWeight.semibold,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.6 : 1,
      border: '1px solid transparent',
      transition: `background-color ${animations.transition.fast}, color ${animations.transition.fast}, border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}`,
      fontFamily: typography.fontFamily.sans,
      outline: 'none',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      boxSizing: 'border-box',
    };

    if (size === 'sm') {
      baseStyle = {
        ...baseStyle,
        height: '32px',
        padding: `0 ${spacing.sm}`,
        fontSize: typography.fontSize.label,
      };
    } else if (size === 'md') {
      baseStyle = {
        ...baseStyle,
        height: '38px',
        padding: `0 ${spacing.md}`,
        fontSize: typography.fontSize.caption,
      };
    } else if (size === 'lg') {
      baseStyle = {
        ...baseStyle,
        height: '44px',
        padding: `0 ${spacing.lg}`,
        fontSize: typography.fontSize.body,
      };
    } else if (size === 'icon') {
      baseStyle = {
        ...baseStyle,
        height: '36px',
        width: '36px',
        padding: 0,
        fontSize: typography.fontSize.caption,
        borderRadius: radius.md,
        flexShrink: 0,
      };
    }

    let whileHover = isDisabled ? {} : {};
    let whileTap = isDisabled ? {} : { scale: 0.98 };

    if (variant === 'primary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: colors.accent,
        color: '#0F172A', // High-contrast dark on bright accent
        fontWeight: typography.fontWeight.bold,
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: shadows.sm,
      };
      whileHover = isDisabled ? {} : { translateY: -1, boxShadow: shadows.md };
    } else if (variant === 'secondary') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: colors.surfaceElevated,
        color: colors.textPrimary,
        border: `1px solid ${colors.borderStrong}`,
        boxShadow: shadows.sm,
      };
      whileHover = isDisabled ? {} : { backgroundColor: colors.surface, translateY: -1 };
    } else if (variant === 'ghost') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: colors.textSecondary,
      };
      whileHover = isDisabled ? {} : { backgroundColor: colors.mutedBg, color: colors.textPrimary };
    } else if (variant === 'outline') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
      };
      whileHover = isDisabled ? {} : { backgroundColor: colors.mutedBg, borderColor: colors.borderStrong };
    } else if (variant === 'danger') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: colors.dangerBg,
        color: colors.danger,
        border: `1px solid rgba(239, 68, 68, 0.25)`,
      };
      whileHover = isDisabled ? {} : { backgroundColor: colors.danger, color: '#FFFFFF' };
    } else if (variant === 'success') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: colors.successBg,
        color: colors.success,
        border: `1px solid rgba(16, 185, 129, 0.25)`,
      };
      whileHover = isDisabled ? {} : { backgroundColor: colors.success, color: '#FFFFFF' };
    }

    const content = (
      <>
        {isLoading && <Loader2 size={size === 'sm' ? 14 : 16} className="animate-spin" />}
        {children}
      </>
    );

    if (asChild) {
      return (
        <Slot ref={ref} style={{ ...baseStyle, ...style }} {...props}>
          {content}
        </Slot>
      );
    }

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        style={{ ...baseStyle, ...style }}
        whileHover={whileHover}
        whileTap={whileTap}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {content}
      </motion.button>
    );
  }
);
Button.displayName = 'Button';
