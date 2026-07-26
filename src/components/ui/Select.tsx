import React from 'react';
import { colors, radius, spacing, typography, animations } from '@/src/design';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, style, children, ...props }, ref) => {
    
    const [isFocused, setIsFocused] = React.useState(false);

    const containerStyle: React.CSSProperties = {
      position: 'relative',
      display: 'inline-block',
      width: '100%',
      ...style,
    };

    const selectStyle: React.CSSProperties = {
      appearance: 'none',
      backgroundColor: colors.card,
      border: `1px solid ${isFocused ? colors.primary : colors.border}`,
      borderRadius: radius.md,
      padding: `0 ${spacing.xl} 0 ${spacing.md}`,
      height: '40px',
      color: colors.foreground,
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.caption,
      width: '100%',
      cursor: 'pointer',
      outline: 'none',
      transition: `border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}`,
      boxShadow: isFocused ? `0 0 0 2px ${colors.primaryBg}` : 'none',
    };

    return (
      <div style={containerStyle}>
        <select
          ref={ref}
          style={selectStyle}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        >
          {children}
        </select>
        <div style={{
          position: 'absolute',
          right: spacing.md,
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          color: colors.muted,
          display: 'flex'
        }}>
          <ChevronDown size={16} />
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';
