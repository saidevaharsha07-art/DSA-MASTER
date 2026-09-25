'use client';

import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';
import { Sparkles, CheckCircle2, ChevronRight, Code2 } from 'lucide-react';

export function LivePreviewPanel() {
  const { settings } = useSettings();
  const app = settings.appearance;
  const isLight = app.theme === 'light';

  const radiusMap = {
    small: '6px',
    medium: '12px',
    large: '18px',
  };
  const cardRadius = radiusMap[app.radius] || '12px';

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '18px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)' }}>LIVE PREVIEW</h3>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Changes appear instantly</span>
        </div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-glow)' }} />
      </div>

      {/* Realistic Mini IDE Interface Preview */}
      <div
        style={{
          width: '100%',
          height: '210px',
          borderRadius: cardRadius,
          background: isLight ? '#F5F7FB' : '#0F172A',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          display: 'flex',
          boxShadow: isLight
            ? '0 8px 24px rgba(0, 0, 0, 0.06)'
            : '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px var(--accent-glow)',
        }}
      >
        {/* Mini Sidebar */}
        <div
          style={{
            width: app.sidebarStyle === 'compact' ? '32px' : '65px',
            background: isLight ? '#FFFFFF' : '#111827',
            borderRight: '1px solid var(--border)',
            padding: '10px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            transition: 'width 0.2s ease',
          }}
        >
          <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--accent-primary)' }} />
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--muted-bg)' }} />
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--muted-bg)' }} />
          <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--muted-bg)' }} />
        </div>

        {/* Mini Main Area */}
        <div style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Mini Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ width: '60px', height: '6px', borderRadius: '3px', background: 'var(--text-primary)' }} />
            <div style={{ width: '30px', height: '6px', borderRadius: '3px', background: 'var(--accent-primary)' }} />
          </div>

          {/* Mini Card */}
          <div
            style={{
              padding: '10px',
              borderRadius: cardRadius,
              background: 'var(--card)',
              border: '1px solid var(--accent-border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'var(--accent-primary)' }} />
              <div style={{ width: '80px', height: '5px', borderRadius: '2px', background: 'var(--text-primary)' }} />
            </div>

            {/* Mini Progress */}
            <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--muted-bg)' }}>
              <div style={{ width: '68%', height: '100%', background: 'var(--accent-primary)', borderRadius: '2px' }} />
            </div>

            {/* Mini Button */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2px' }}>
              <div
                style={{
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--accent-primary)',
                  fontSize: '8px',
                  color: '#FFFFFF',
                  fontWeight: 900,
                }}
              >
                Action
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
