import React from 'react';
import { colors, radius, spacing, typography, animations } from '@/src/design';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, style, ...props }, ref) => {
    
    const [isFocused, setIsFocused] = React.useState(false);

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: colors.card,
      border: `1px solid ${isFocused ? colors.primary : colors.border}`,
      borderRadius: radius.md,
      padding: `0 ${spacing.md}`,
      height: '40px',
      transition: `border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}`,
      boxShadow: isFocused ? `0 0 0 2px ${colors.primaryBg}` : 'none',
      width: '100%',
      ...style,
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: colors.foreground,
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.caption,
      width: '100%',
    };

    return (
      <div style={containerStyle}>
        {leftIcon && <div style={{ marginRight: spacing.sm, color: colors.muted, display: 'flex' }}>{leftIcon}</div>}
        <input
          ref={ref}
          style={inputStyle}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        {rightIcon && <div style={{ marginLeft: spacing.sm, color: colors.muted, display: 'flex' }}>{rightIcon}</div>}
      </div>
    );
  }
);
Input.displayName = 'Input';
