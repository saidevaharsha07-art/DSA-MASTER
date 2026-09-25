'use client';

import React, { useState } from 'react';
import {
  Shield,
  KeyRound,
  LogOut,
  Download,
  FileJson,
  AlertTriangle,
  Globe,
  Lock,
  Activity,
  User,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { useAuth } from '@/src/lib/auth/hooks/useAuth';
import { useActiveUser } from '@/src/hooks/useActiveUser';

export function AccountSecuritySettings() {
  const { settings, updateSetting, resetAllSettings } = useSettings();
  const { user, signOut, resetPassword } = useAuth();
  const { username } = useActiveUser();
  const { toast } = useToast();
  const { profileVisibility, anonymousMode, analyticsEnabled } = settings.privacy;
  const isLight = settings.appearance.theme === 'light';

  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const userEmail = user?.email || (typeof window !== 'undefined' ? localStorage.getItem('dsa_user_email') : '') || 'developer@example.com';
  const displayName = user?.displayName || username || 'Developer';
  const providerType = user?.isGuest
    ? 'Guest Session'
    : user?.linkedAccounts?.[0]?.provider
    ? user.linkedAccounts[0].provider.toUpperCase()
    : 'Email / Password';

  const handlePasswordReset = async () => {
    if (!userEmail || userEmail === 'guest@dsamaster.internal') {
      toast('Password reset is not available for guest accounts.', 'info');
      return;
    }
    setIsResettingPassword(true);
    try {
      const res = await resetPassword(userEmail);
      if (res.success) {
        toast(`Password reset instructions sent to ${userEmail}`, 'success');
      } else {
        toast(res.error || 'Failed to send password reset email', 'error');
      }
    } catch {
      toast('Failed to initiate password reset', 'error');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast('Signed out successfully', 'info');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } catch {
      toast('Failed to sign out cleanly', 'error');
    }
  };

  const handleExportData = (type: string) => {
    try {
      const exportObject = {
        exportedAt: new Date().toISOString(),
        type,
        settings,
        progress: localStorage.getItem('dsa-canonical-progress-v1') || localStorage.getItem('dsa-state'),
        activityLog: localStorage.getItem('dsa-activity-log'),
      };
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `dsa-master-backup-${type.toLowerCase()}-${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast(`Exported ${type} backup successfully!`, 'success');
    } catch {
      toast('Failed to export backup data', 'error');
    }
  };

  const handleClearLocalData = () => {
    try {
      localStorage.removeItem('dsa-activity-log');
      localStorage.removeItem('journey-settings');
      resetAllSettings();
      setShowConfirmReset(false);
      toast('Local cache and settings cleared successfully', 'info');
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch {
      toast('Failed to clear local data', 'error');
    }
  };

  const exportBtnSt: React.CSSProperties = {
    padding: '7px 14px',
    borderRadius: '8px',
    background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flexShrink: 0,
  };

  const rowContainerSt: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    borderRadius: '10px',
    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border)',
    gap: '16px',
  };

  const iconBoxSt = (bg: string, color: string): React.CSSProperties => ({
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color,
    flexShrink: 0,
  });

  const selectSt: React.CSSProperties = {
    padding: '6px 12px',
    borderRadius: '8px',
    background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--border)',
    color: 'var(--text-primary)',
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Shield size={18} />}
        title="Account & Security"
        subtitle="Manage authentication credentials, privacy boundaries, and data portability."
      />

      {/* ── 1. ACCOUNT AUTHENTICATION & SESSION ────────────────────── */}
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '18px',
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)' }}>
            Authentication &amp; Session
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Active authentication provider, identity email, and session controls.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {/* Identity Email */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={iconBoxSt(isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.15)', 'var(--primary)')}>
              <Mail size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Primary Email</span>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userEmail}
              </strong>
            </div>
          </div>

          {/* Identity Name & Provider */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div style={iconBoxSt('rgba(16, 185, 129, 0.15)', '#10B981')}>
              <User size={16} />
            </div>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Signed-in Identity</span>
              <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                {displayName}
              </strong>
              <span style={{ fontSize: '10px', color: '#10B981', fontWeight: 700, textTransform: 'uppercase' }}>
                Provider: {providerType}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '4px' }}>
          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={isResettingPassword}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: isResettingPassword ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <KeyRound size={13} />
            <span>{isResettingPassword ? 'Sending...' : 'Send Password Reset Email'}</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#EF4444',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LogOut size={13} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* ── 2. PRIVACY & TELEMETRY ─────────────────────────────────── */}
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
            Privacy Boundaries &amp; Telemetry
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Control visibility of your developer profile and performance telemetry.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Profile Visibility */}
          <div style={rowContainerSt}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={iconBoxSt(isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.15)', 'var(--primary)')}>
                <Globe size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                  Public Developer Profile
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Allow other coders to view your solved counts and contest rating badges.
                </span>
              </div>
            </div>

            <select
              value={profileVisibility}
              onChange={(e) => updateSetting('privacy', 'profileVisibility', e.target.value as any)}
              style={selectSt}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="only_me">Only Me</option>
            </select>
          </div>

          {/* Anonymous Mode */}
          <div style={rowContainerSt}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={iconBoxSt(isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.15)', 'var(--primary)')}>
                <Lock size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                  Anonymous Mode
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Hide your real name from public leaderboards and peer interaction channels.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={anonymousMode}
              onChange={(e) => updateSetting('privacy', 'anonymousMode', e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>

          {/* Performance Analytics */}
          <div style={rowContainerSt}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={iconBoxSt('rgba(16, 185, 129, 0.15)', '#10B981')}>
                <Activity size={16} />
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                  Performance Analytics Collection
                </strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Collect anonymized solve telemetry to optimize AI recommendations and spaced repetition cadence.
                </span>
              </div>
            </div>

            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => updateSetting('privacy', 'analyticsEnabled', e.target.checked)}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* ── 3. DATA PORTABILITY & BACKUPS ──────────────────────────── */}
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
            Data Portability &amp; Backups
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Download portable JSON backups of your solved problems, streaks, and preferences.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {/* Export Progress */}
          <div
            style={{
              padding: '16px 18px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: isLight ? 'rgba(2, 132, 199, 0.15)' : 'rgba(56, 189, 248, 0.15)',
                  border: isLight ? '1px solid rgba(2, 132, 199, 0.3)' : '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0,
                }}
              >
                <FileJson size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>Export Progress</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Solved problems, XP &amp; streaks (JSON)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExportData('Progress')}
              style={exportBtnSt}
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>

          {/* Export Settings */}
          <div
            style={{
              padding: '16px 18px',
              borderRadius: '12px',
              background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                  flexShrink: 0,
                }}
              >
                <Download size={18} />
              </div>
              <div>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>Export Settings</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Themes, goals &amp; preferences</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleExportData('Settings')}
              style={exportBtnSt}
            >
              <Download size={13} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 4. DANGER ZONE ─────────────────────────────────────────── */}
      <div
        style={{
          padding: '22px 24px',
          borderRadius: '18px',
          background: isLight ? '#FFF5F5' : 'rgba(239, 68, 68, 0.03)',
          border: '1.5px solid rgba(239, 68, 68, 0.28)',
          boxShadow: 'var(--card-shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={16} style={{ color: '#EF4444' }} />
          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#EF4444' }}>
            Danger Zone
          </h3>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Irreversible actions. Please ensure you have exported a backup before clearing data.
        </span>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', paddingTop: '4px' }}>
          <div>
            <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>Reset Local Progress &amp; Cache</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              Deletes all local problem records, cached states, and resets preferences to default.
            </span>
          </div>

          {!showConfirmReset ? (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#EF4444',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              Reset Data
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={handleClearLocalData}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#EF4444',
                  border: 'none',
                  color: '#FFF',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                Confirm Reset
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
