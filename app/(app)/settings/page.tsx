'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, RotateCcw, Save, X, Settings as SettingsIcon, Layout } from 'lucide-react';
import { SettingsSidebar, SettingsTabKey } from '@/components/settings/SettingsSidebar';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { AppearanceSettings } from '@/components/settings/appearance/AppearanceSettings';
import { InterfaceCard } from '@/components/settings/appearance/InterfaceCard';
import { DeveloperProfileSettings } from '@/components/settings/profile/DeveloperProfileSettings';
import { LearningEngineSettings } from '@/components/settings/learning/LearningEngineSettings';
import { PracticeSettings } from '@/components/settings/practice/PracticeSettings';
import { GoalsSettings } from '@/components/settings/goals/GoalsSettings';
import { RevisionSettings } from '@/components/settings/revision/RevisionSettings';
import { NotificationsSettings } from '@/components/settings/notifications/NotificationsSettings';
import { IntegrationsSettings } from '@/components/settings/integrations/IntegrationsSettings';
import { CloudSyncSettings } from '@/components/settings/cloud/CloudSyncSettings';
import { PrivacySettings } from '@/components/settings/privacy/PrivacySettings';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { AuthGuard } from '@/src/lib/auth/guards/AuthGuard';

export default function SettingsPage() {
  const { settings, resetSection, resetAllSettings, importSettings } = useSettings();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTabKey>('appearance');
  const [savedSnapshot, setSavedSnapshot] = useState<string>('');

  const VALID_TABS: SettingsTabKey[] = [
    'profile',
    'appearance',
    'interface',
    'learning',
    'practice',
    'goals',
    'revision',
    'integrations',
    'notifications',
    'privacy',
    'cloud',
  ];

  // Restore saved active tab on mount (URL query param takes priority)
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const urlTab = params.get('tab') as SettingsTabKey;
        if (urlTab && VALID_TABS.includes(urlTab)) {
          setActiveTab(urlTab);
          localStorage.setItem('journey-settings-active-tab', urlTab);
          return;
        }
      }
      const savedTab = localStorage.getItem('journey-settings-active-tab') as SettingsTabKey;
      if (savedTab && VALID_TABS.includes(savedTab)) {
        setActiveTab(savedTab);
      }
    } catch {
      // ignore
    }
  }, []);

  // Snapshot initialization
  useEffect(() => {
    if (!savedSnapshot && settings) {
      setSavedSnapshot(JSON.stringify(settings));
    }
  }, [settings, savedSnapshot]);

  const hasUnsavedChanges = Boolean(savedSnapshot && JSON.stringify(settings) !== savedSnapshot);

  const handleSelectTab = (tab: SettingsTabKey) => {
    setActiveTab(tab);
    try {
      localStorage.setItem('journey-settings-active-tab', tab);
      if (typeof window !== 'undefined' && window.history) {
        const url = new URL(window.location.href);
        url.searchParams.set('tab', tab);
        window.history.replaceState({}, '', url.toString());
      }
    } catch {
      // ignore
    }
  };

  const handleResetSection = () => {
    if (activeTab === 'appearance' || activeTab === 'interface') {
      resetSection('appearance');
    } else if (activeTab === 'learning') {
      resetSection('learningEngine');
    } else if (activeTab === 'practice') {
      resetSection('practice');
    } else if (activeTab === 'goals') {
      resetSection('goals');
    } else if (activeTab === 'revision') {
      resetSection('revision');
    } else if (activeTab === 'notifications') {
      resetSection('notifications');
    } else if (activeTab === 'privacy') {
      resetSection('privacy');
    } else if (activeTab === 'cloud') {
      resetSection('cloud');
    } else {
      resetSection('appearance');
    }
    toast('Section reset to default configuration', 'info');
  };

  const handleCancel = () => {
    if (savedSnapshot) {
      const ok = importSettings(savedSnapshot);
      if (ok) {
        toast('Changes discarded', 'info');
      } else {
        localStorage.setItem('journey-settings', savedSnapshot);
        window.location.reload();
      }
    }
  };

  const handleSaveChanges = () => {
    const currentJson = JSON.stringify(settings);
    setSavedSnapshot(currentJson);
    try {
      localStorage.setItem('journey-settings', currentJson);
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
    toast('All settings saved and applied!', 'success');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <DeveloperProfileSettings />;
      case 'interface':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            <SettingsHeader
              icon={<Layout size={18} />}
              title="Layout & Interface"
              subtitle="Control spacing, motion, and navigation behavior."
            />
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
                  Interface Geometry &amp; Motion Controls
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Corner radius, animation speed, UI density, and sidebar preferences.
                </span>
              </div>
              <InterfaceCard />
            </div>
          </div>
        );
      case 'learning':
        return <LearningEngineSettings />;
      case 'practice':
        return <PracticeSettings />;
      case 'goals':
        return <GoalsSettings />;
      case 'revision':
        return <RevisionSettings />;
      case 'integrations':
        return <IntegrationsSettings />;
      case 'notifications':
        return <NotificationsSettings />;
      case 'privacy':
        return <PrivacySettings />;
      case 'cloud':
        return <CloudSyncSettings />;
      case 'appearance':
      default:
        return <AppearanceSettings />;
    }
  };

  return (
    <AuthGuard>
      <div
        className="flex flex-col justify-between w-full min-h-[calc(100vh-64px)] bg-[var(--background)] text-[var(--text-primary)] p-4 sm:p-6 md:p-8 box-border font-sans overflow-x-hidden transition-colors"
      >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
        {/* ── TOP HEADER ─────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
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
              flexShrink: 0,
            }}
          >
            <SettingsIcon size={17} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Settings
            </h1>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Customize your workspace, learning preferences, and connected platforms.
            </span>
          </div>
        </div>

        {/* ── 2-COLUMN FULL-WIDTH SETTINGS LAYOUT ───────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-[230px_minmax(0,1fr)] gap-6 md:gap-8 items-start w-full box-border"
        >
          {/* Left Settings Sidebar (230px) */}
          <div className="w-full md:w-[230px] flex-shrink-0">
            <SettingsSidebar
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
            />
          </div>

          {/* Main Settings Content Area (Fills remaining space completely) */}
          <div className="w-full min-w-0 pb-8">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* ── FULL-WIDTH STICKY FOOTER ACTION BAR ────────────────────── */}
      <div
        style={{
          position: 'sticky',
          bottom: 0,
          zIndex: 40,
          width: 'calc(100% + 64px)',
          margin: '24px -32px 0 -32px',
          padding: '14px 32px',
          background: 'var(--card)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--border)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}
      >
        {/* Left: Reset to Defaults */}
        <button
          type="button"
          onClick={handleResetSection}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'var(--muted-bg)',
            border: '1px solid var(--border)',
            color: 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.15s ease',
          }}
        >
          <RotateCcw size={13} /> Reset to Defaults
        </button>

        {/* Right: Status & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {hasUnsavedChanges ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
              <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>
                Unsaved changes
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={14} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                All changes saved
              </span>
            </div>
          )}

          {hasUnsavedChanges && (
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: '7px 16px',
                borderRadius: '8px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveChanges}
            disabled={!hasUnsavedChanges}
            style={{
              padding: '8px 20px',
              borderRadius: '8px',
              background: hasUnsavedChanges ? 'var(--primary)' : 'var(--muted-bg)',
              border: hasUnsavedChanges ? 'none' : '1px solid var(--border)',
              color: hasUnsavedChanges ? '#FFF' : 'var(--text-muted)',
              fontSize: '12px',
              fontWeight: 800,
              cursor: hasUnsavedChanges ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: hasUnsavedChanges ? '0 0 16px var(--accent-glow)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <Save size={13} /> Save Changes
          </button>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
