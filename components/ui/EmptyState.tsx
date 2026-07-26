import React from 'react';
import { Compass, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { colors, spacing, typography, radius } from '@/src/design';
import { Button } from '@/src/components/ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  icon?: LucideIcon;
}

export function EmptyState({ title, description, action, icon: Icon = Compass }: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing['3xl'],
      textAlign: 'center',
      minHeight: '300px',
      backgroundColor: colors.background,
      borderRadius: radius.xl,
      border: `1px dashed ${colors.border}`,
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: radius.full,
        backgroundColor: colors.mutedBg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
        color: colors.muted,
      }}>
        <Icon size={32} />
      </div>
      <h3 style={{ margin: `0 0 ${spacing.sm} 0`, fontSize: typography.fontSize.h3, fontWeight: typography.fontWeight.bold, color: colors.foreground, fontFamily: typography.fontFamily.sans }}>
        {title || 'Nothing to see here yet'}
      </h3>
      <p style={{
        margin: `0 0 ${spacing.xl} 0`,
        fontSize: typography.fontSize.body,
        color: colors.muted,
        maxWidth: '400px',
        lineHeight: 1.5,
        fontFamily: typography.fontFamily.sans
      }}>
        {description || 'This module is scheduled for a future sprint. In the meantime, head back to your dashboard to continue your active missions.'}
      </p>
      <div>
        {action ? (
          action
        ) : (
          <Link href="/dashboard" passHref legacyBehavior>
            <Button variant="primary">
              Return to Dashboard
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
