'use client';

import React, { useState } from 'react';
import { Link2, RefreshCw, CheckCircle2, XCircle, ExternalLink, ShieldCheck, Globe, Code2 } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export function IntegrationsSettings() {
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();
  const { leetcode, codeforces, github, codechef, gfg } = settings.integrations;
  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const isLight = settings.appearance.theme === 'light';

  const connectedAccounts = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      handle: leetcode.username || 'Not connected',
      connected: leetcode.connected,
      color: '#10B981',
      lastSync: leetcode.connected ? 'Active' : 'Never',
      solvedCount: leetcode.connected ? 'Connected' : 'Not connected',
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      handle: codeforces.username || 'Not connected',
      connected: codeforces.connected,
      color: '#0284C7',
      lastSync: codeforces.connected ? 'Active' : 'Never',
      solvedCount: codeforces.connected ? 'Connected' : 'Not connected',
    },
    {
      id: 'codechef',
      name: 'CodeChef',
      handle: codechef.username || 'Not connected',
      connected: codechef.connected,
      color: '#F97316',
      lastSync: codechef.connected ? 'Active' : 'Never',
      solvedCount: codechef.connected ? 'Connected' : 'Not connected',
    },
    {
      id: 'github',
      name: 'GitHub',
      handle: github.username || 'Not connected',
      connected: github.connected,
      color: isLight ? '#0F172A' : '#CBD5E1',
      lastSync: github.connected ? 'Active' : 'Never',
      solvedCount: github.connected ? 'Connected' : 'Not connected',
    },
    {
      id: 'gfg',
      name: 'GeeksforGeeks',
      handle: gfg.username || 'Not connected',
      connected: gfg.connected,
      color: '#10B981',
      lastSync: gfg.connected ? 'Active' : 'Never',
      solvedCount: gfg.connected ? 'Connected' : 'Not connected',
    },
  ];

  const handleToggleConnection = (id: string, isConnected: boolean) => {
    const sectionKey = id as keyof typeof settings.integrations;
    if (settings.integrations[sectionKey]) {
      updateSetting('integrations', sectionKey, {
        ...settings.integrations[sectionKey],
        connected: !isConnected,
      });
      toast(`${id.toUpperCase()} ${isConnected ? 'disconnected' : 'connected'}`, 'info');
    }
  };

  const handleSyncPlatform = (name: string) => {
    toast(`Syncing ${name} solved submissions...`, 'info');
    setTimeout(() => {
      toast(`Successfully synchronized ${name}!`, 'success');
    }, 1000);
  };

  const handleSyncAll = () => {
    setIsSyncingAll(true);
    toast('Syncing all connected competitive programming platforms...', 'info');
    setTimeout(() => {
      setIsSyncingAll(false);
      toast('All platforms synchronized successfully!', 'success');
    }, 1500);
  };

  const connectedCount = connectedAccounts.filter((a) => a.connected).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Link2 size={18} />}
        title="Platforms & Sync"
        subtitle="Connect and synchronize your coding platforms."
      />

      {/* ── 1. SYNC TELEMETRY & STATUS ROW ─────────────────────────── */}
      <div
        style={{
          padding: '20px 24px',
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
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10B981',
            }}
          >
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>Sync Status: Online</strong>
              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 800, padding: '2px 6px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.12)' }}>
                {connectedCount} Connected
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Auto-syncs verified submissions every 30 minutes in the background.
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={isSyncingAll}
          onClick={handleSyncAll}
          style={{
            padding: '8px 18px',
            borderRadius: '10px',
            background: 'var(--primary)',
            border: 'none',
            color: '#FFF',
            fontSize: '12px',
            fontWeight: 800,
            cursor: isSyncingAll ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCw size={13} className={isSyncingAll ? 'animate-spin' : ''} />
          <span>{isSyncingAll ? 'Syncing...' : 'Sync All Platforms'}</span>
        </button>
      </div>

      {/* ── 2. CONNECTED ACCOUNTS GRID (3 COLS DESKTOP) ─────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Connected Coding Platforms
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Link your handles to automatically import solved problems and contest metrics.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
          {connectedAccounts.map((acc) => (
            <div
              key={acc.id}
              style={{
                padding: '20px',
                borderRadius: '16px',
                background: 'var(--card)',
                border: acc.connected
                  ? isLight ? `1.5px solid ${acc.color}` : '1.5px solid rgba(139, 92, 246, 0.35)'
                  : '1px solid var(--border)',
                boxShadow: 'var(--card-shadow)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px',
              }}
            >
              {/* Top row */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      background: `${acc.color}18`,
                      border: `1px solid ${acc.color}35`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: acc.color,
                    }}
                  >
                    <Globe size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{acc.name}</strong>
                    <span style={{ fontSize: '10px', color: acc.connected ? '#10B981' : 'var(--text-muted)', fontWeight: 700 }}>
                      {acc.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: acc.connected ? '#10B981' : '#94A3B8',
                  }}
                />
              </div>

              {/* Middle details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Handle:</span>
                  <strong style={{ color: acc.connected ? 'var(--text-primary)' : 'var(--text-muted)' }}>@{acc.handle}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Activity:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{acc.solvedCount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Last Synced:</span>
                  <span style={{ color: 'var(--text-muted)' }}>{acc.connected ? acc.lastSync : '—'}</span>
                </div>
              </div>

              {/* Bottom buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', paddingTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleToggleConnection(acc.id, acc.connected)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: acc.connected ? 'rgba(239, 68, 68, 0.1)' : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                    border: acc.connected ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border)',
                    color: acc.connected ? '#EF4444' : 'var(--text-primary)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {acc.connected ? 'Disconnect' : 'Connect'}
                </button>

                <button
                  type="button"
                  disabled={!acc.connected}
                  onClick={() => handleSyncPlatform(acc.name)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    background: acc.connected ? 'rgba(56, 189, 248, 0.15)' : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                    border: acc.connected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid var(--border)',
                    color: acc.connected ? 'var(--primary)' : 'var(--text-muted)',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: acc.connected ? 'pointer' : 'not-allowed',
                    outline: 'none',
                  }}
                >
                  Sync Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
