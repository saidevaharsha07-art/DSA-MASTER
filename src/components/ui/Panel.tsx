import React from 'react';
import { colors, radius, spacing, typography, shadows } from '@/src/design';

interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  padding?: keyof typeof spacing | 'none';
  withHeader?: boolean;
  title?: React.ReactNode;
  headerAction?: React.ReactNode;
}

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ children, padding = 'lg', withHeader = false, title, headerAction, style, ...props }, ref) => {
    
    const baseStyle: React.CSSProperties = {
      backgroundColor: colors.panel,
      border: `1px solid ${colors.border}`,
      borderRadius: radius.xl,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: shadows.sm,
    };

    return (
      <div ref={ref} style={{ ...baseStyle, ...style }} {...props}>
        {withHeader && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: `${spacing.md} ${padding === 'none' ? spacing.md : spacing[padding]}`,
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.card
          }}>
            {title && (
              <div style={{ 
                fontFamily: typography.fontFamily.sans,
                fontWeight: typography.fontWeight.semibold, 
                fontSize: typography.fontSize.caption, 
                color: colors.foreground, 
                display: 'flex', 
                alignItems: 'center', 
                gap: spacing.sm 
              }}>
                {title}
              </div>
            )}
            {headerAction && <div>{headerAction}</div>}
          </div>
        )}
        <div style={{ padding: padding === 'none' ? 0 : spacing[padding], flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    );
  }
);
Panel.displayName = "Panel";
