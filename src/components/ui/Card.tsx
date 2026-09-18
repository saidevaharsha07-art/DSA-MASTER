'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { colors, radius, shadows, spacing, animations } from '@/src/design';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: keyof typeof spacing | 'none';
  interactive?: boolean;
  variant?: 'default' | 'elevated' | 'ghost' | 'subtle';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      padding = 'lg',
      interactive = false,
      variant = 'default',
      style,
      ...props
    },
    ref
  ) => {
    let bg = colors.surface;
    let borderColor = colors.border;
    let boxShadow = shadows.sm;

    if (variant === 'elevated') {
      bg = colors.surfaceElevated;
      borderColor = colors.borderStrong;
      boxShadow = shadows.md;
    } else if (variant === 'ghost') {
      bg = 'transparent';
      borderColor = 'transparent';
      boxShadow = 'none';
    } else if (variant === 'subtle') {
      bg = colors.bgSubtle;
      borderColor = colors.borderSubtle;
      boxShadow = 'none';
    }

    const baseStyle: React.CSSProperties = {
      backgroundColor: bg,
      border: `1px solid ${borderColor}`,
      borderRadius: radius.lg,
      padding: padding === 'none' ? 0 : spacing[padding],
      transition: `background-color ${animations.transition.fast}, border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}, transform ${animations.transition.fast}`,
      boxShadow: boxShadow,
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    };

    if (interactive) {
      baseStyle.cursor = 'pointer';

      return (
        <motion.div
          ref={ref}
          style={{ ...baseStyle, ...style }}
          whileHover={{
            translateY: -1,
            boxShadow: shadows.md,
            borderColor: colors.accent,
          }}
          whileTap={{ scale: 0.995 }}
          {...(props as HTMLMotionProps<'div'>)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} style={{ ...baseStyle, ...style }} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';
