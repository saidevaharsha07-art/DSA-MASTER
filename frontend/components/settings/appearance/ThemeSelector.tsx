'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Moon, Sun } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

interface ThemeOption {
  id: 'dark' | 'light';
  name: string;
  description: string;
  bgPreview: string;
  textColor: string;
  icon: typeof Moon;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Dark Theme',
    description: 'Deep slate navy interface with glowing vibrant accents.',
    bgPreview: '#0F172A',
    textColor: '#F8FAFC',
    icon: Moon,
  },
  {
    id: 'light',
    name: 'Light Theme',
    description: 'Crisp, high-contrast colorful modern workspace with soft shadows.',
    bgPreview: '#F5F7FB',
    textColor: '#0F172A',
    icon: Sun,
  },
];

interface ThemeSelectorProps {
  currentTheme: 'dark' | 'light' | string;
  onThemeChange: (id: 'dark' | 'light') => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const activeTheme = currentTheme === 'light' ? 'light' : 'dark';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Workspace Theme
      </label>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '14px',
        }}
      >
        {THEME_OPTIONS.map((th) => {
          const isSelected = activeTheme === th.id;
          const IconComp = th.icon;

          return (
            <button
              key={th.id}
              type="button"
              onClick={() => onThemeChange(th.id)}
              style={{
                padding: '16px',
                borderRadius: '14px',
                background: th.bgPreview,
                border: isSelected
                  ? '2px solid var(--accent-primary)'
                  : '1px solid var(--border)',
                boxShadow: isSelected
                  ? '0 0 20px var(--accent-glow)'
                  : '0 4px 14px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '110px',
                textAlign: 'left',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: 'var(--accent-soft)',
                      color: 'var(--accent-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComp size={14} />
                  </div>
                  <strong style={{ fontSize: '14px', color: th.textColor, fontWeight: 800 }}>{th.name}</strong>
                </div>
                {isSelected ? (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFF',
                    }}
                  >
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                ) : (
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      border: '1.5px solid var(--border)',
                    }}
                  />
                )}
              </div>

              <span
                style={{
                  fontSize: '11px',
                  color: th.id === 'light' ? '#475569' : '#94A3B8',
                  lineHeight: '1.4',
                  fontWeight: 500,
                }}
              >
                {th.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
