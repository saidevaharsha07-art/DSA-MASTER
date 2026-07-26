import React from 'react';
import { colors, typography, radius, spacing } from '@/src/design';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'easy' | 'medium' | 'hard' | 'default' | 'outline' | 'primary';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', style, ...props }, ref) => {
    
    let baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: `${spacing.xs} ${spacing.sm}`,
      borderRadius: radius.full,
      fontSize: typography.fontSize.label,
      fontWeight: typography.fontWeight.bold,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      lineHeight: 1,
      fontFamily: typography.fontFamily.sans,
    };

    if (variant === 'easy') {
      baseStyle = { ...baseStyle, backgroundColor: colors.successBg, color: colors.success, border: `1px solid rgba(16, 185, 129, 0.2)` };
    } else if (variant === 'medium') {
      baseStyle = { ...baseStyle, backgroundColor: colors.warningBg, color: colors.warning, border: `1px solid rgba(245, 158, 11, 0.2)` };
    } else if (variant === 'hard') {
      baseStyle = { ...baseStyle, backgroundColor: colors.dangerBg, color: colors.danger, border: `1px solid rgba(239, 68, 68, 0.2)` };
    } else if (variant === 'primary') {
      baseStyle = { ...baseStyle, backgroundColor: colors.primaryBg, color: colors.primary, border: `1px solid rgba(99, 102, 241, 0.2)` };
    } else if (variant === 'outline') {
      baseStyle = { ...baseStyle, backgroundColor: 'transparent', color: colors.muted, border: `1px solid ${colors.border}` };
    } else {
      baseStyle = { ...baseStyle, backgroundColor: colors.mutedBg, color: colors.foreground, border: `1px solid ${colors.border}` };
    }

    return (
      <span ref={ref} style={{ ...baseStyle, ...style }} {...props}>
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";
