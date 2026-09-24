'use client';

import React from 'react';
import { Palette } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { ThemeSelector } from './ThemeSelector';
import { AccentSelector } from './AccentSelector';
import { InterfaceCard } from './InterfaceCard';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export function AppearanceSettings() {
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();

  const app = settings.appearance;

  const handleThemeChange = (newTheme: 'dark' | 'light') => {
    updateSetting('appearance', 'theme', newTheme);
    toast(`Theme changed to ${newTheme === 'light' ? 'Light Theme' : 'Dark Theme'}`, 'info');
  };

  const handleAccentChange = (hex: string) => {
    updateSetting('appearance', 'accentColor', hex);
    toast('Accent color updated', 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Palette size={18} />}
        title="Appearance"
        subtitle="Customize themes, accents, and interface density."
      />

      {/* ── CARD 1: THEMES & ACCENTS ───────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Theme &amp; Accent Palette
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            High-contrast dark themes and customizable accent colors.
          </span>
        </div>

        {/* 1. Theme selection */}
        <div>
          <ThemeSelector currentTheme={app.theme} onThemeChange={handleThemeChange} />
        </div>

        {/* 2. Accent color selection */}
        <div>
          <AccentSelector currentAccent={app.accentColor} onAccentChange={handleAccentChange} />
        </div>
      </div>

      {/* ── CARD 2: INTERFACE & TYPOGRAPHY ─────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: 'var(--card-shadow)',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Interface Density &amp; Motion
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Corner radius, animation speed, UI density, and sidebar preferences.
          </span>
        </div>

        <InterfaceCard />
      </div>
    </div>
  );
}
