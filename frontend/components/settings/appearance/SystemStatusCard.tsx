'use client';

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/src/context/SettingsContext';
import { ShieldCheck, Cloud, HardDrive, Cpu, CheckCircle2 } from 'lucide-react';

export function SystemStatusCard() {
  const { settings } = useSettings();
  const [storageUsage, setStorageUsage] = useState<string>('~148 KB');

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        let total = 0;
        for (const x in localStorage) {
          if (Object.prototype.hasOwnProperty.call(localStorage, x)) {
            total += (localStorage[x].length + x.length) * 2;
          }
        }
        setStorageUsage(`${Math.round(total / 1024)} KB`);
      }
    } catch {
      setStorageUsage('Local Storage');
    }
  }, []);

  const lastSyncStr = settings.cloud?.lastSync
    ? new Date(settings.cloud.lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Active';

  return (
    <div
      style={{
        padding: '20px',
        borderRadius: '18px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 900, color: 'var(--text-primary)' }}>SYSTEM TELEMETRY</h3>
        <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
          ONLINE
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Cloud Sync:</span>
          <strong style={{ color: settings.cloud?.autoSync ? '#10B981' : 'var(--text-secondary)' }}>
            {settings.cloud?.autoSync ? 'Connected / Auto' : 'Manual'}
          </strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Last Synchronized:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{lastSyncStr}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Client Storage:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{storageUsage}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
          <span>Build Version:</span>
          <strong style={{ color: 'var(--accent-primary)' }}>v1.0.0 (Production)</strong>
        </div>
      </div>
    </div>
  );
}
