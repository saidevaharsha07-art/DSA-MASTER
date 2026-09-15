'use client';

import React from 'react';
import {
  UserRound,
  Palette,
  Layout,
  Brain,
  Sword,
  Target,
  BookOpen,
  Link2,
  Bell,
  Shield,
  Cloud,
} from 'lucide-react';

export type SettingsTabKey =
  | 'profile'
  | 'appearance'
  | 'interface'
  | 'learning'
  | 'practice'
  | 'goals'
  | 'revision'
  | 'integrations'
  | 'notifications'
  | 'privacy'
  | 'cloud';

interface NavItem {
  key: SettingsTabKey;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const SETTINGS_NAV_SECTIONS: NavSection[] = [
  {
    title: 'PROFILE',
    items: [
      {
        key: 'profile',
        title: 'Developer Profile',
        subtitle: 'Identity & platform handles',
        icon: UserRound,
      },
    ],
  },
  {
    title: 'APPEARANCE',
    items: [
      {
        key: 'appearance',
        title: 'Appearance & Themes',
        subtitle: 'Themes & accent palette',
        icon: Palette,
      },
      {
        key: 'interface',
        title: 'Layout & Interface',
        subtitle: 'Density, radius & animations',
        icon: Layout,
      },
    ],
  },
  {
    title: 'LEARNING',
    items: [
      {
        key: 'learning',
        title: 'Learning Preferences',
        subtitle: 'Engine & hint settings',
        icon: Brain,
      },
      {
        key: 'practice',
        title: 'Practice',
        subtitle: 'Problem solving defaults',
        icon: Sword,
      },
      {
        key: 'goals',
        title: 'Goals & Targets',
        subtitle: 'Daily & weekly targets',
        icon: Target,
      },
      {
        key: 'revision',
        title: 'Revision Center',
        subtitle: 'SRS memory parameters',
        icon: BookOpen,
      },
    ],
  },
  {
    title: 'PLATFORMS',
    items: [
      {
        key: 'integrations',
        title: 'Platforms & Sync',
        subtitle: 'LeetCode, CodeChef, Codeforces',
        icon: Link2,
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        key: 'notifications',
        title: 'Notifications',
        subtitle: 'Alerts & practice reminders',
        icon: Bell,
      },
      {
        key: 'privacy',
        title: 'Data & Privacy',
        subtitle: 'Data export & cache controls',
        icon: Shield,
      },
      {
        key: 'cloud',
        title: 'Cloud Sync',
        subtitle: 'Background synchronization',
        icon: Cloud,
      },
    ],
  },
];

import { useSettings } from '@/src/context/SettingsContext';

interface SettingsSidebarProps {
  activeTab: SettingsTabKey;
  onSelectTab: (tab: SettingsTabKey) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

export function SettingsSidebar({
  activeTab,
  onSelectTab,
}: SettingsSidebarProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Navigation Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {SETTINGS_NAV_SECTIONS.map((sec) => (
          <div key={sec.title} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span
              style={{
                fontSize: '10px',
                fontWeight: 800,
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                paddingLeft: '10px',
                textTransform: 'uppercase',
              }}
            >
              {sec.title}
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {sec.items.map((item) => {
                const isActive = activeTab === item.key;
                const Icon = item.icon;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => onSelectTab(item.key)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '10px',
                      background: isActive
                        ? isLight
                          ? 'rgba(2, 132, 199, 0.12)'
                          : 'rgba(56, 189, 248, 0.15)'
                        : 'transparent',
                      border: isActive
                        ? isLight
                          ? '1px solid rgba(2, 132, 199, 0.3)'
                          : '1px solid rgba(56, 189, 248, 0.35)'
                        : '1px solid transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      textAlign: 'left',
                      transition: 'background 0.15s ease',
                      outline: 'none',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        background: isActive
                          ? 'var(--primary)'
                          : isLight
                          ? '#F1F5F9'
                          : 'rgba(255, 255, 255, 0.04)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isActive ? '#FFF' : 'var(--text-secondary)',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={13} />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <strong
                        style={{
                          fontSize: '12px',
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: isActive ? 800 : 600,
                          display: 'block',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </strong>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
