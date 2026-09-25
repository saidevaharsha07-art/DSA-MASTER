'use client';

import React from 'react';
import { useSettings } from '@/src/context/SettingsContext';

export function InterfaceCard() {
  const { settings, updateSetting } = useSettings();
  const app = settings.appearance;
  const isLight = app.theme === 'light';

  const segmentedGroupSt: React.CSSProperties = {
    display: 'flex',
    gap: '4px',
    padding: '3px',
    borderRadius: '10px',
    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.04)',
    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
  };

  const segmentedBtnSt = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '7px 10px',
    borderRadius: '8px',
    background: isActive
      ? 'var(--primary)'
      : 'transparent',
    border: 'none',
    color: isActive
      ? '#FFF'
      : isLight
      ? 'var(--text-secondary)'
      : '#94A3B8',
    fontSize: '12px',
    fontWeight: isActive ? 800 : 600,
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    outline: 'none',
    boxShadow: isActive && isLight ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {/* 1. Radius & Animation Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            Corner Radius
          </label>
          <div style={segmentedGroupSt}>
            {(['small', 'medium', 'large'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => updateSetting('appearance', 'radius', r)}
                style={segmentedBtnSt(app.radius === r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            Animation
          </label>
          <div style={segmentedGroupSt}>
            {(['minimal', 'balanced', 'rich'] as const).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => updateSetting('appearance', 'animations', a)}
                style={segmentedBtnSt(app.animations === a)}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. UI Density & Sidebar Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            UI Density
          </label>
          <div style={segmentedGroupSt}>
            {(['compact', 'balanced', 'comfortable'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => updateSetting('appearance', 'uiDensity', d)}
                style={segmentedBtnSt(app.uiDensity === d)}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
            Sidebar
          </label>
          <div style={segmentedGroupSt}>
            {(['compact', 'expanded'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => updateSetting('appearance', 'sidebarStyle', s)}
                style={segmentedBtnSt(app.sidebarStyle === s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Reduce Motion Toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 14px',
          borderRadius: '10px',
          background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
          border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div>
          <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>Reduce Motion</strong>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Minimize pulse animations and interface transitions</span>
        </div>
        <input
          type="checkbox"
          checked={app.reduceMotion}
          onChange={(e) => updateSetting('appearance', 'reduceMotion', e.target.checked)}
          style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}
