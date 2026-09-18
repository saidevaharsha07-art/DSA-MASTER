'use client';

import React from 'react';
import { colors, radius, spacing, typography, animations } from '@/src/design';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      disabled,
      style,
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const borderColor = error
      ? colors.danger
      : isFocused
      ? colors.accent
      : colors.border;

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      width: '100%',
    };

    const inputWrapperStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: disabled ? colors.bgSubtle : colors.surface,
      border: `1px solid ${borderColor}`,
      borderRadius: radius.md,
      padding: `0 ${spacing.md}`,
      height: '38px',
      transition: `border-color ${animations.transition.fast}, box-shadow ${animations.transition.fast}, background-color ${animations.transition.fast}`,
      boxShadow: isFocused
        ? error
          ? '0 0 0 2px rgba(239, 68, 68, 0.2)'
          : '0 0 0 2px var(--accent-subtle, rgba(56, 189, 248, 0.2))'
        : 'none',
      width: '100%',
      opacity: disabled ? 0.6 : 1,
      boxSizing: 'border-box',
    };

    const inputStyle: React.CSSProperties = {
      flex: 1,
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: colors.textPrimary,
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.caption,
      width: '100%',
      cursor: disabled ? 'not-allowed' : 'text',
      ...style,
    };

    return (
      <div style={containerStyle} className={className}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: error ? colors.danger : colors.textSecondary,
              fontFamily: typography.fontFamily.sans,
            }}
          >
            {label}
          </label>
        )}

        <div style={inputWrapperStyle}>
          {leftIcon && (
            <div
              style={{
                marginRight: spacing.sm,
                color: colors.textMuted,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
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

          {rightIcon && (
            <div
              style={{
                marginLeft: spacing.sm,
                color: colors.textMuted,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <span
            style={{
              fontSize: '11px',
              color: colors.danger,
              fontFamily: typography.fontFamily.sans,
            }}
          >
            {error}
          </span>
        ) : helperText ? (
          <span
            style={{
              fontSize: '11px',
              color: colors.textMuted,
              fontFamily: typography.fontFamily.sans,
            }}
          >
            {helperText}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
