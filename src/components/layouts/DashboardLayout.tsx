import React from 'react';
import { spacing } from '@/src/design';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: spacing['3xl'], // Page spacing
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.lg, // Section spacing
    }}>
      {children}
    </div>
  );
}
