'use client';

import React from 'react';
import {
  UserRound,
  Palette,
  Brain,
  Target,
  Link2,
  Shield,
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';

export type SettingsTabKey =
  | 'profile'
  | 'appearance'
  | 'learning'
  | 'goals'
  | 'integrations'
  | 'security'
  // Legacy aliases supported for backwards compatibility
  | 'interface'
  | 'practice'
  | 'revision'
  | 'notifications'
  | 'privacy'
  | 'cloud';

export interface SettingsNavItem {
  key: SettingsTabKey;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>;
}

export interface SettingsNavSection {
  title: string;
  items: SettingsNavItem[];
}

export const SETTINGS_NAV_SECTIONS: SettingsNavSection[] = [
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
    title: 'PREFERENCES',
    items: [
      {
        key: 'appearance',
        title: 'Appearance',
        subtitle: 'Themes, accents & interface density',
        icon: Palette,
      },
      {
        key: 'learning',
        title: 'Learning Preferences',
        subtitle: 'Strategy, thresholds & review cadence',
        icon: Brain,
      },
      {
        key: 'goals',
        title: 'Goals & Targets',
        subtitle: 'Daily & weekly solve targets',
        icon: Target,
      },
    ],
  },
  {
    title: 'CONNECTED',
    items: [
      {
        key: 'integrations',
        title: 'Platforms & Sync',
        subtitle: 'LeetCode, Codeforces, CodeChef',
        icon: Link2,
      },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      {
        key: 'security',
        title: 'Account & Security',
        subtitle: 'Authentication, privacy & data',
        icon: Shield,
      },
    ],
  },
];

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

  // Normalize legacy active tabs to the new canonical ones
  const normalizedActiveTab =
    activeTab === 'interface'
      ? 'appearance'
      : activeTab === 'practice' || activeTab === 'revision'
      ? 'learning'
      : activeTab === 'privacy' || activeTab === 'notifications'
      ? 'security'
      : activeTab === 'cloud'
      ? 'integrations'
      : activeTab;

  return (
    <aside
      aria-label="Settings Navigation"
      className="flex flex-col gap-5 w-full box-border"
    >
      <div className="flex flex-col gap-5">
        {SETTINGS_NAV_SECTIONS.map((sec) => (
          <div key={sec.title} className="flex flex-col gap-1">
            <span
              className="text-[10px] font-semibold text-muted-foreground/70 tracking-wider uppercase px-2.5 py-1 select-none"
            >
              {sec.title}
            </span>

            <div className="flex flex-col gap-0.5">
              {sec.items.map((item) => {
                const isActive = normalizedActiveTab === item.key;
                const Icon = item.icon;

                return (
                  <button
                    key={item.key}
                    type="button"
                    data-testid={`settings-tab-${item.key}`}
                    onClick={() => onSelectTab(item.key)}
                    className="relative flex items-center gap-2.5 w-full text-left transition-colors duration-150 rounded-lg outline-none select-none h-11 min-h-[44px] md:h-10 md:min-h-[40px] px-2.5 focus-visible:ring-2 focus-visible:ring-primary/50"
                    style={{
                      background: isActive
                        ? isLight
                          ? 'rgba(2, 132, 199, 0.10)'
                          : 'rgba(56, 189, 248, 0.12)'
                        : 'transparent',
                      border: isActive
                        ? isLight
                          ? '1px solid rgba(2, 132, 199, 0.25)'
                          : '1px solid rgba(56, 189, 248, 0.25)'
                        : '1px solid transparent',
                      color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {/* Active Thin Indicator Bar on Left */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute left-1 w-[3px] h-4 rounded-full bg-primary"
                      />
                    )}

                    {/* Icon Container (18px icon) */}
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors"
                      style={{
                        background: isActive
                          ? 'var(--primary)'
                          : isLight
                          ? '#F1F5F9'
                          : 'rgba(255, 255, 255, 0.05)',
                        color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    {/* Title */}
                    <div className="min-w-0 flex-1 pl-0.5">
                      <span
                        className="text-[13px] block leading-tight truncate"
                        style={{
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontWeight: isActive ? 700 : 500,
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
