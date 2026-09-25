'use client';

import React from 'react';

interface SettingsHeaderProps {
  icon?: React.ReactNode;
  emoji?: string;
  title: string;
  subtitle: string;
}

export function SettingsHeader({ icon, emoji = '⚙️', title, subtitle }: SettingsHeaderProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
      <div
        style={{
          width: '34px',
          height: '34px',
          borderRadius: '10px',
          background: 'rgba(56, 189, 248, 0.15)',
          border: '1px solid var(--primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--primary)',
          fontSize: '16px',
          flexShrink: 0,
        }}
      >
        {icon || emoji}
      </div>
      <div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {title}
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {subtitle}
        </span>
      </div>
    </div>
  );
}
