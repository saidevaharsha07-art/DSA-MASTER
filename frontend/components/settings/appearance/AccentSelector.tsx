'use client';

import React from 'react';
import { Check } from 'lucide-react';

import { useSettings } from '@/src/context/SettingsContext';

interface AccentOption {
  id: string;
  name: string;
  hex: string;
}

const ACCENT_OPTIONS: AccentOption[] = [
  { id: 'emerald', name: 'Emerald', hex: '#10B981' },
  { id: 'ocean', name: 'Ocean Blue', hex: '#0284C7' },
  { id: 'purple', name: 'Royal Purple', hex: '#8B5CF6' },
  { id: 'golden', name: 'Golden', hex: '#F59E0B' },
  { id: 'rose', name: 'Rose Pink', hex: '#EC4899' },
];

interface AccentSelectorProps {
  currentAccent: string;
  onAccentChange: (accentKeyOrHex: string) => void;
}

export function AccentSelector({ currentAccent, onAccentChange }: AccentSelectorProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';
  const normCurrent = (currentAccent || 'emerald').toLowerCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <label style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Accent Color
      </label>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '10px',
        }}
      >
        {ACCENT_OPTIONS.map((acc) => {
          const isSelected =
            normCurrent === acc.id ||
            normCurrent === acc.hex.toLowerCase() ||
            (acc.id === 'purple' && (normCurrent.includes('8b5cf6') || normCurrent.includes('7c4dff') || normCurrent.includes('a855f7'))) ||
            (acc.id === 'emerald' && normCurrent.includes('10b981')) ||
            (acc.id === 'golden' && (normCurrent.includes('f59e0b') || normCurrent.includes('d97706') || normCurrent.includes('gold'))) ||
            (acc.id === 'ocean' && (normCurrent.includes('0284c7') || normCurrent.includes('38bdf8') || normCurrent.includes('3182ce') || normCurrent.includes('blue'))) ||
            (acc.id === 'rose' && (normCurrent.includes('ec4899') || normCurrent.includes('db2777') || normCurrent.includes('pink')));

          return (
            <button
              key={acc.id}
              type="button"
              onClick={() => onAccentChange(acc.id)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                background: isSelected
                  ? `${acc.hex}18`
                  : isLight
                  ? '#F8FAFC'
                  : 'rgba(255, 255, 255, 0.03)',
                border: isSelected
                  ? `2px solid ${acc.hex}`
                  : isLight
                  ? '1px solid #E2E8F0'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: isSelected ? `0 0 12px ${acc.hex}33` : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: acc.hex,
                    boxShadow: `0 0 8px ${acc.hex}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isSelected ? 800 : 600,
                    color: isSelected
                      ? isLight
                        ? acc.hex
                        : '#FFF'
                      : 'var(--text-secondary)',
                  }}
                >
                  {acc.name}
                </span>
              </div>

              {isSelected && (
                <Check size={13} style={{ color: acc.hex }} strokeWidth={3} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
