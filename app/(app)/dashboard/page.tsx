'use client';

import React from 'react';
import { CommandCenterView } from '@/src/features/dashboard/components/CommandCenterView';
import { AuthGuard } from '@/src/lib/auth/guards/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <CommandCenterView />
    </AuthGuard>
  );
}
