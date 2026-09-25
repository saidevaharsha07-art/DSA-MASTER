import React from 'react';
import { Loader2, AlertTriangle, Lock, SearchX, WifiOff } from 'lucide-react';
import { EmptyState } from './EmptyState';
import { colors, spacing, typography, radius } from '@/src/design';
import { Button } from '@/src/components/ui/Button';

export type PageStateType = 'loading' | 'empty' | 'ready' | 'error' | 'locked' | 'offline';

interface PageStateProps {
  state: PageStateType;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const stateContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing['3xl'],
  textAlign: 'center' as const,
  minHeight: '300px',
  backgroundColor: colors.background,
  borderRadius: radius.xl,
  border: `1px solid ${colors.border}`,
};

const iconContainerStyle = {
  width: '64px',
  height: '64px',
  borderRadius: radius.full,
  backgroundColor: colors.mutedBg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing.lg,
  color: colors.muted,
};

const titleStyle = {
  margin: `0 0 ${spacing.sm} 0`,
  fontSize: typography.fontSize.h3,
  fontWeight: typography.fontWeight.bold,
  color: colors.foreground,
  fontFamily: typography.fontFamily.sans,
};

const descStyle = {
  margin: `0 0 ${spacing.xl} 0`,
  fontSize: typography.fontSize.body,
  color: colors.muted,
  maxWidth: '400px',
  lineHeight: 1.5,
  fontFamily: typography.fontFamily.sans,
};

export function PageState({ state, children, title, description, action }: PageStateProps) {
  if (state === 'ready') {
    return <>{children}</>;
  }

  if (state === 'loading') {
    return (
      <div style={stateContainerStyle}>
        <div style={{ ...iconContainerStyle, color: colors.primary, backgroundColor: colors.primaryBg }}>
          <Loader2 size={32} style={{ animation: 'spin 1s linear infinite' }} />
        </div>
        <h3 style={titleStyle}>{title || 'Loading content...'}</h3>
        <p style={descStyle}>{description || 'We are fetching the latest data from the curriculum engine.'}</p>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <EmptyState 
        title={title} 
        description={description} 
        action={action} 
      />
    );
  }

  if (state === 'error') {
    return (
      <div style={stateContainerStyle}>
        <div style={{ ...iconContainerStyle, color: colors.danger, backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
          <AlertTriangle size={32} />
        </div>
        <h3 style={titleStyle}>{title || 'Something went wrong'}</h3>
        <p style={descStyle}>{description || 'We encountered an error loading this module. Please try again.'}</p>
        {action && <div>{action}</div>}
      </div>
    );
  }

  if (state === 'locked') {
    return (
      <div style={stateContainerStyle}>
        <div style={iconContainerStyle}>
          <Lock size={32} />
        </div>
        <h3 style={titleStyle}>{title || 'Content Locked'}</h3>
        <p style={descStyle}>{description || 'Complete the prerequisite modules in your Journey to unlock this content.'}</p>
        {action && <div>{action}</div>}
      </div>
    );
  }

  if (state === 'offline') {
    return (
      <div style={stateContainerStyle}>
        <div style={iconContainerStyle}>
          <WifiOff size={32} />
        </div>
        <h3 style={titleStyle}>{title || 'You are offline'}</h3>
        <p style={descStyle}>{description || 'Please check your internet connection to continue learning.'}</p>
        {action && <div>{action}</div>}
      </div>
    );
  }

  return null;
}
