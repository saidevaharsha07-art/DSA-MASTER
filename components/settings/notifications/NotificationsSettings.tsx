'use client';

import React from 'react';
import { Bell, Mail, Smartphone, Flame, RotateCcw, Target, Award, Calendar, Sparkles } from 'lucide-react';
import { SettingsHeader } from '../SettingsHeader';
import { useSettings } from '@/src/context/SettingsContext';

export function NotificationsSettings() {
  const { settings, updateSetting } = useSettings();
  const { notificationChannels, notificationCategories } = settings.notifications;
  const isLight = settings.appearance.theme === 'light';

  const channels = [
    { id: 'inApp', title: 'In-App Notifications', desc: 'Banners and badge counters in top navbar', icon: Bell, active: notificationChannels.inApp },
    { id: 'email', title: 'Email Digests', desc: 'Weekly progress recap and milestone certificates', icon: Mail, active: notificationChannels.email },
    { id: 'push', title: 'Desktop Push Alerts', desc: 'Browser notifications when practice sessions are due', icon: Bell, active: notificationChannels.push },
    { id: 'sms', title: 'SMS Practice Ping', desc: 'Critical streak-saver reminder at 10:00 PM', icon: Smartphone, active: notificationChannels.sms },
  ];

  const preferences = [
    { id: 'dailyReminders', title: 'Daily Practice Reminders', desc: 'Daily goals, streak warnings and mission resets', enabled: notificationCategories.dailyReminders, icon: Flame, color: '#F59E0B' },
    { id: 'practiceUpdates', title: 'Problem Completion Alerts', desc: 'Solution submissions, test verdicts, and hint unlocks', enabled: notificationCategories.practiceUpdates, icon: Target, color: '#10B981' },
    { id: 'spacedRepetition', title: 'Spaced Repetition Alerts', desc: 'Revision due notifications and forgetting curve alerts', enabled: notificationCategories.spacedRepetition, icon: RotateCcw, color: 'var(--primary)' },
    { id: 'achievements', title: 'Milestones & Level-Up Badges', desc: 'XP achievements, rank promotions, and contest medals', enabled: notificationCategories.achievements, icon: Award, color: '#A855F7' },
    { id: 'contestAlerts', title: 'Contest Reminders', desc: 'Upcoming LeetCode, Codeforces, and CodeChef contest alerts', enabled: notificationCategories.contestAlerts, icon: Calendar, color: '#0284C7' },
    { id: 'systemUpdates', title: 'Product & Feature Announcements', desc: 'Release notes, algorithm additions, and changelog updates', enabled: notificationCategories.systemUpdates, icon: Sparkles, color: '#EC4899' },
  ];

  const handleToggleChannel = (chKey: keyof typeof notificationChannels) => {
    updateSetting('notifications', 'notificationChannels', {
      ...notificationChannels,
      [chKey]: !notificationChannels[chKey],
    });
  };

  const handleToggleCategory = (catId: string, val: boolean) => {
    updateSetting('notifications', 'notificationCategories', {
      ...notificationCategories,
      [catId]: val,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* ── HEADER ─────────────────────────────────────────────────── */}
      <SettingsHeader
        icon={<Bell size={18} />}
        title="Notifications"
        subtitle="Control reminders, alerts, and activity updates."
      />

      {/* ── 1. NOTIFICATION CHANNELS ───────────────────────────────── */}
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
            Notification Channels
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Select the platforms and channels where you wish to receive alerts.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div
                key={ch.id}
                onClick={() => handleToggleChannel(ch.id as any)}
                style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  background: ch.active
                    ? isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(56, 189, 248, 0.1)'
                    : isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: ch.active
                    ? isLight ? '1.5px solid #0284C7' : '1.5px solid var(--primary)'
                    : '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: ch.active ? 'var(--primary)' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: ch.active ? '#FFF' : 'var(--text-muted)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--text-primary)', display: 'block' }}>{ch.title}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{ch.desc}</span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={ch.active}
                  onChange={() => {}}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer', flexShrink: 0 }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 2. NOTIFICATION PREFERENCES ────────────────────────────── */}
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
            Notification Preferences
          </h3>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Configure individual reminders and event triggers.
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {preferences.map((pref) => {
            const Icon = pref.icon;
            return (
              <div
                key={pref.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border)',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: `${pref.color}18`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pref.color,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{pref.title}</strong>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{pref.desc}</span>
                  </div>
                </div>

                <input
                  type="checkbox"
                  checked={pref.enabled}
                  onChange={(e) => handleToggleCategory(pref.id, e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer', flexShrink: 0 }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
