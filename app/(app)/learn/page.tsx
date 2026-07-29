'use client';

import React from 'react';
import { MasterCampaignView } from '@/src/features/learn/components/MasterCampaignView';

export default function LearnPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        background: '#070512',
        color: '#FFF',
        padding: '24px 32px',
        overflow: 'hidden',
      }}
    >
      <MasterCampaignView />
    </div>
  );
}
