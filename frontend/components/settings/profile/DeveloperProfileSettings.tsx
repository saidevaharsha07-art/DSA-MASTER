'use client';

import React, { useState } from 'react';
import { UserRound, Edit3, Save, X, Globe, CheckCircle2, Shield } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { EventBus } from '@/src/core/events/event-bus';

import { useAuth } from '@/src/lib/auth/hooks/useAuth';

export function DeveloperProfileSettings() {
  const { userId, username } = useActiveUser();
  const { user } = useAuth();
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();
  const isLight = settings.appearance.theme === 'light';

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || username || 'Developer');
  const [email, setEmail] = useState(user?.email || '');
  const [lcHandle, setLcHandle] = useState(settings.integrations?.leetcode?.username || '');
  const [ccHandle, setCcHandle] = useState(settings.integrations?.codechef?.username || '');
  const [cfHandle, setCfHandle] = useState(settings.integrations?.codeforces?.username || '');

  const handleSave = () => {
    updateSetting('integrations', 'leetcode', { connected: Boolean(lcHandle), username: lcHandle });
    updateSetting('integrations', 'codechef', { connected: Boolean(ccHandle), username: ccHandle });
    updateSetting('integrations', 'codeforces', { connected: Boolean(cfHandle), username: cfHandle });

    EventBus.publish('ProfileUpdated', {
      userId,
      displayName,
      email,
      timestamp: new Date().toISOString(),
    });

    toast('Profile and platform handles updated successfully!', 'success');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDisplayName(user?.displayName || username || 'Developer');
    setEmail(user?.email || '');
    setLcHandle(settings.integrations?.leetcode?.username || '');
    setCcHandle(settings.integrations?.codechef?.username || '');
    setCfHandle(settings.integrations?.codeforces?.username || '');
    setIsEditing(false);
  };

  const inputStyle = (disabled: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    background: disabled
      ? isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.03)'
      : isLight ? '#FFFFFF' : 'rgba(0, 0, 0, 0.4)',
    border: disabled
      ? isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)'
      : isLight ? '1.5px solid #0284C7' : '1.5px solid var(--primary)',
    color: disabled ? 'var(--text-muted)' : 'var(--text-primary)',
    fontSize: '13px',
    fontWeight: 600,
    outline: 'none',
    boxSizing: 'border-box',
    cursor: disabled ? 'default' : 'text',
    boxShadow: disabled ? 'none' : isLight ? '0 1px 3px rgba(0,0,0,0.05)' : 'none',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<UserRound size={18} />}
        title="Developer Profile"
        subtitle="Manage your developer identity, username, and connected platform handles."
      />

      {/* ── CARD 1: IDENTITY ───────────────────────────────────────── */}
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
              Developer Identity
            </h3>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Personal details and authentication email.
            </span>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <Edit3 size={13} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                  border: isLight ? '1px solid #CBD5E1' : 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'var(--primary)',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                <Save size={13} />
                <span>Save</span>
              </button>
            </div>
          )}
        </div>

        {/* Identity Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={inputStyle(!isEditing)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              disabled={!isEditing}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle(!isEditing)}
            />
          </div>
        </div>
      </div>

      {/* ── CARD 2: CONNECTED HANDLES ──────────────────────────────── */}
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
            Competitive Coding Handles
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Connect platform usernames to aggregate solves and contest ratings.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#10B981', textTransform: 'uppercase', marginBottom: '6px' }}>
              LeetCode Handle
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={lcHandle}
              onChange={(e) => setLcHandle(e.target.value)}
              placeholder="e.g. neetcode"
              style={inputStyle(!isEditing)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', marginBottom: '6px' }}>
              Codeforces Handle
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={cfHandle}
              onChange={(e) => setCfHandle(e.target.value)}
              placeholder="e.g. tourist"
              style={inputStyle(!isEditing)}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#F97316', textTransform: 'uppercase', marginBottom: '6px' }}>
              CodeChef Handle
            </label>
            <input
              type="text"
              disabled={!isEditing}
              value={ccHandle}
              onChange={(e) => setCcHandle(e.target.value)}
              placeholder="e.g. chef_harsha"
              style={inputStyle(!isEditing)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
