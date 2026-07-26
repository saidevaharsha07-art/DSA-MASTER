'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { colors, radius, shadows, spacing, animations } from '@/src/design';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: keyof typeof spacing | 'none';
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, padding = 'lg', interactive = false, style, ...props }, ref) => {
    
    const baseStyle: React.CSSProperties = {
      backgroundColor: colors.card,
      border: `1px solid ${colors.border}`,
      borderRadius: radius.xl,
      padding: padding === 'none' ? 0 : spacing[padding],
      transition: `all ${animations.transition.fast}`,
      boxShadow: shadows.md,
      position: 'relative',
      overflow: 'hidden',
    };

    if (interactive) {
      baseStyle.cursor = 'pointer';
      
      return (
        <motion.div
          ref={ref}
          style={{ ...baseStyle, ...style }}
          whileHover={{ translateY: -2, boxShadow: shadows.lg, borderColor: colors.primary }}
          whileTap={{ scale: 0.99 }}
          {...(props as HTMLMotionProps<"div">)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div
        ref={ref}
        style={{ ...baseStyle, ...style }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
