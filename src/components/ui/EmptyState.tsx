'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/src/design';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  style,
}: EmptyStateProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${spacing.xl} ${spacing.lg}`,
        textAlign: 'center',
        borderRadius: radius.lg,
        border: `1px dashed ${colors.borderStrong}`,
        backgroundColor: colors.bgSubtle,
        color: colors.textSecondary,
        boxSizing: 'border-box',
        width: '100%',
        ...style,
      }}
    >
      {icon && (
        <div
          style={{
            marginBottom: spacing.md,
            color: colors.textMuted,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: radius.md,
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
          }}
        >
          {icon}
        </div>
      )}

      <h3
        style={{
          margin: '0 0 6px 0',
          fontSize: typography.fontSize.body,
          fontWeight: typography.fontWeight.semibold,
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.sans,
        }}
      >
        {title}
      </h3>

      {description && (
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: typography.fontSize.caption,
            color: colors.textMuted,
            maxWidth: '420px',
            lineHeight: typography.lineHeight.normal,
            fontFamily: typography.fontFamily.sans,
          }}
        >
          {description}
        </p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
}
