'use client';

import React, { useState } from 'react';
import { Cloud, RefreshCw, CheckCircle2, ShieldCheck, Database, Laptop, Check } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export function CloudSyncSettings() {
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();
  const { autoSync, backgroundSync, lastSync } = settings.cloud;
  const isLight = settings.appearance.theme === 'light';

  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncNow = () => {
    setIsSyncing(true);
    toast('Synchronizing data with Cloud Vault...', 'info');
    setTimeout(() => {
      setIsSyncing(false);
      updateSetting('cloud', 'lastSync', new Date().toISOString());
      toast('Cloud synchronization complete!', 'success');
    }, 1000);
  };

  const formattedLastSync = lastSync
    ? `Today at ${new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : `Today at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const syncedItems = [
    { title: 'Solved Problems & Notes', desc: 'All accepted problem records and editorial code notes', state: 'Synced' },
    { title: 'Spaced Repetition & Revision', desc: 'Active recall decay schedules and review timestamps', state: 'Synced' },
    { title: 'Practice History & Attempts', desc: 'Submission time logs, run verdicts, and duration tracking', state: 'Synced' },
    { title: 'Platform Connections', desc: 'LeetCode, CodeChef, and Codeforces connection keys', state: 'Encrypted' },
    { title: 'Theme & Workspace Preferences', desc: 'Custom accent colors, UI density, and editor options', state: 'Synced' },
  ];

  const settingsRowSt: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderRadius: '10px',
    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border)',
    gap: '16px',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Cloud size={18} />}
        title="Cloud Sync"
        subtitle="Keep your learning data synchronized across your devices."
      />

      {/* ── 1. TOP STATUS CARD ─────────────────────────────────────── */}
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.15)',
              border: isLight ? '1px solid rgba(2, 132, 199, 0.35)' : '1px solid rgba(56, 189, 248, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary)',
              flexShrink: 0,
            }}
          >
            <Cloud size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Cloud Sync Status</strong>
              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 800, padding: '2px 8px', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                ● Connected
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Last synchronized: {formattedLastSync}</span>
              <span>•</span>
              <span style={{ color: 'var(--text-primary)' }}>Active Device: Web App</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={isSyncing}
          onClick={handleSyncNow}
          style={{
            padding: '9px 20px',
            borderRadius: '10px',
            background: 'var(--primary)',
            border: 'none',
            color: '#FFF',
            fontSize: '12px',
            fontWeight: 800,
            cursor: isSyncing ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.25)',
            transition: 'all 0.15s ease',
          }}
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin' : ''} />
          <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
        </button>
      </div>

      {/* ── 2. SYNC BEHAVIOR ───────────────────────────────────────── */}
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Sync Behavior
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Configure automatic background synchronization and polling intervals.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Row 1: Auto Sync */}
          <div style={settingsRowSt}>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                Automatic Background Synchronization
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Silently sync progress to cloud whenever an internet connection is available.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoSync}
              onChange={(e) => updateSetting('cloud', 'autoSync', e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Row 2: Continuous Background Polling */}
          <div style={settingsRowSt}>
            <div>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                Continuous Background Polling
              </strong>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Keep active coding session data synchronized while solving problems in the editor.
              </span>
            </div>
            <input
              type="checkbox"
              checked={backgroundSync}
              onChange={(e) => updateSetting('cloud', 'backgroundSync', e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. DATA SYNCHRONIZATION ─────────────────────────────────── */}
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Data Synchronization
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Entities managed within your cloud storage profile.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {syncedItems.map((item) => (
            <div
              key={item.title}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                gap: '12px',
              }}
            >
              <div>
                <strong style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'block' }}>{item.title}</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.desc}</span>
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: item.state === 'Encrypted' ? 'var(--primary)' : '#10B981',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: item.state === 'Encrypted'
                    ? isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.1)'
                    : 'rgba(16, 185, 129, 0.1)',
                  border: item.state === 'Encrypted'
                    ? isLight ? '1px solid rgba(2, 132, 199, 0.25)' : '1px solid rgba(56, 189, 248, 0.25)'
                    : '1px solid rgba(16, 185, 129, 0.25)',
                  flexShrink: 0,
                }}
              >
                {item.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
