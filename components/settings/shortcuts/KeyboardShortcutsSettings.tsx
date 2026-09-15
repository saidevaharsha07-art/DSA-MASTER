'use client';

import React from 'react';
import { Command } from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

interface Shortcut {
  action: string;
  keys: string[];
  description: string;
}

const SHORTCUTS: Shortcut[] = [
  { action: 'Open Command Palette', keys: ['Ctrl', 'K'], description: 'Quick jump to any problem, realm, or action' },
  { action: 'Go to Dashboard', keys: ['G', 'D'], description: 'Navigate directly to your Developer Command Center' },
  { action: 'Go to Journey', keys: ['G', 'J'], description: 'Navigate to platform railway journeys' },
  { action: 'Go to Practice Arena', keys: ['G', 'P'], description: 'Open problem workspace & code editor' },
  { action: 'Go to Revision Center', keys: ['G', 'R'], description: 'Open memory review queue' },
  { action: 'Go to AI Mentor', keys: ['G', 'M'], description: 'Open AI coaching diagnosis' },
  { action: 'Run Code / Submit', keys: ['Ctrl', 'Enter'], description: 'Execute solution in editor' },
];

export function KeyboardShortcutsSettings() {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>
          Keyboard Shortcuts
        </h2>
        <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Global hotkeys for high-speed navigation and code execution.
        </span>
      </div>

      <div
        style={{
          padding: '24px',
          borderRadius: '24px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {SHORTCUTS.map((s) => (
          <div
            key={s.action}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
            }}
          >
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{s.action}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.description}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {s.keys.map((k) => (
                <kbd
                  key={k}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    fontWeight: 800,
                  }}
                >
                  {k}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
