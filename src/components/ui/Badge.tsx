import React from 'react';
import { colors, typography, radius, spacing } from '@/src/design';

export type BadgeVariant =
  | 'default'
  | 'outline'
  | 'primary'
  | 'secondary'
  | 'easy'
  | 'medium'
  | 'hard'
  | 'leetcode'
  | 'codechef'
  | 'codeforces'
  | 'geeksforgeeks'
  | 'completed'
  | 'in_progress'
  | 'todo'
  | 'recommended'
  | 'master'
  | 'advanced'
  | 'proficient'
  | 'novice'
  | 'success'
  | 'warning'
  | 'danger';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'default', size = 'sm', dot = false, style, ...props }, ref) => {
    let bg = colors.mutedBg;
    let textColor = colors.foreground;
    let borderColor = colors.border;
    let dotColor = colors.accent;

    switch (variant) {
      case 'easy':
      case 'success':
      case 'completed':
        bg = 'rgba(16, 185, 129, 0.12)';
        textColor = '#10B981';
        borderColor = 'rgba(16, 185, 129, 0.25)';
        dotColor = '#10B981';
        break;

      case 'medium':
      case 'warning':
      case 'in_progress':
        bg = 'rgba(245, 158, 11, 0.12)';
        textColor = '#F59E0B';
        borderColor = 'rgba(245, 158, 11, 0.25)';
        dotColor = '#F59E0B';
        break;

      case 'hard':
      case 'danger':
        bg = 'rgba(239, 68, 68, 0.12)';
        textColor = '#EF4444';
        borderColor = 'rgba(239, 68, 68, 0.25)';
        dotColor = '#EF4444';
        break;

      case 'primary':
      case 'recommended':
        bg = 'rgba(56, 189, 248, 0.12)';
        textColor = 'var(--accent, #38BDF8)';
        borderColor = 'rgba(56, 189, 248, 0.25)';
        dotColor = 'var(--accent, #38BDF8)';
        break;

      case 'secondary':
        bg = colors.surfaceElevated;
        textColor = colors.textSecondary;
        borderColor = colors.borderStrong;
        dotColor = colors.textMuted;
        break;

      case 'outline':
        bg = 'transparent';
        textColor = colors.textSecondary;
        borderColor = colors.border;
        dotColor = colors.textMuted;
        break;

      case 'leetcode':
        bg = 'rgba(255, 161, 22, 0.12)';
        textColor = '#FFA116';
        borderColor = 'rgba(255, 161, 22, 0.25)';
        dotColor = '#FFA116';
        break;

      case 'codechef':
        bg = 'rgba(141, 110, 99, 0.12)';
        textColor = '#A1887F';
        borderColor = 'rgba(141, 110, 99, 0.25)';
        dotColor = '#A1887F';
        break;

      case 'codeforces':
        bg = 'rgba(31, 142, 241, 0.12)';
        textColor = '#3B82F6';
        borderColor = 'rgba(31, 142, 241, 0.25)';
        dotColor = '#3B82F6';
        break;

      case 'geeksforgeeks':
        bg = 'rgba(46, 139, 87, 0.12)';
        textColor = '#34D399';
        borderColor = 'rgba(46, 139, 87, 0.25)';
        dotColor = '#34D399';
        break;

      case 'master':
        bg = 'rgba(168, 85, 247, 0.14)';
        textColor = '#C084FC';
        borderColor = 'rgba(168, 85, 247, 0.3)';
        dotColor = '#C084FC';
        break;

      case 'advanced':
        bg = 'rgba(59, 130, 246, 0.14)';
        textColor = '#60A5FA';
        borderColor = 'rgba(59, 130, 246, 0.3)';
        dotColor = '#60A5FA';
        break;

      case 'proficient':
        bg = 'rgba(20, 184, 166, 0.14)';
        textColor = '#2DD4BF';
        borderColor = 'rgba(20, 184, 166, 0.3)';
        dotColor = '#2DD4BF';
        break;

      case 'novice':
      case 'todo':
        bg = 'rgba(148, 163, 184, 0.1)';
        textColor = '#94A3B8';
        borderColor = 'rgba(148, 163, 184, 0.2)';
        dotColor = '#94A3B8';
        break;

      default:
        bg = colors.mutedBg;
        textColor = colors.foreground;
        borderColor = colors.border;
        dotColor = colors.accent;
        break;
    }

    const isSmall = size === 'sm';

    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: isSmall ? '4px' : '6px',
      padding: isSmall ? `2px 8px` : `4px 10px`,
      borderRadius: radius.full,
      fontSize: isSmall ? '11px' : '12px',
      fontWeight: typography.fontWeight.medium,
      lineHeight: 1.2,
      fontFamily: typography.fontFamily.sans,
      backgroundColor: bg,
      color: textColor,
      border: `1px solid ${borderColor}`,
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
      boxSizing: 'border-box',
    };

    return (
      <span ref={ref} style={{ ...baseStyle, ...style }} {...props}>
        {dot && (
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: dotColor,
              flexShrink: 0,
            }}
          />
        )}
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';
