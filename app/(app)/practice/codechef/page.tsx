'use client';

import React, { Suspense } from 'react';
import { PracticeArenaView } from '@/src/features/practice/components/PracticeArenaView';

export default function CodeChefRatingArenaPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '60px 32px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '3px solid #F97316',
              borderTopColor: 'transparent',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px auto',
            }}
          />
          <span>Loading CodeChef Practice Arena...</span>
        </div>
      }
    >
      <PracticeArenaView defaultPlatform="codechef" />
    </Suspense>
  );
}
