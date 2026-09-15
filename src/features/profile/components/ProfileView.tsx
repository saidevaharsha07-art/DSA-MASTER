'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  User,
  Mail,
  Edit3,
  CheckCircle2,
  Flame,
  Zap,
  Shield,
  Layers,
  Globe,
  Lock,
  ChevronRight,
  Clock,
  X,
  Save,
  Check,
  TrendingUp,
  Award,
  Settings as SettingsIcon,
  Calendar,
  Compass,
  Sparkles,
} from 'lucide-react';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { DashboardAdapterService, DashboardSummary } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { EventBus } from '@/src/core/events/event-bus';
import { PlatformTrainJourneys } from '@/src/features/dashboard/components/PlatformTrainJourneys';

export function ProfileView() {
  const { userId, username: activeUsername } = useActiveUser();
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();

  const [summary, setSummary] = useState<DashboardSummary>(() =>
    DashboardAdapterService.getDashboardSummary(userId)
  );

  // Local Profile Override for Display Name & Email (persisted in localStorage)
  const [profileName, setProfileName] = useState<string>('Developer');
  const [profileEmail, setProfileEmail] = useState<string>('developer@dsacracker.dev');
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Edit Form Fields
  const [editName, setEditName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editLcUser, setEditLcUser] = useState<string>('');
  const [editCcUser, setEditCcUser] = useState<string>('');
  const [editCfUser, setEditCfUser] = useState<string>('');
  const [editGfgUser, setEditGfgUser] = useState<string>('');

  useEffect(() => {
    const savedName = localStorage.getItem('dsa-user-name');
    const savedEmail = localStorage.getItem('dsa-user-email');
    if (savedName) {
      setProfileName(savedName);
    } else if (activeUsername && activeUsername !== 'Guest') {
      setProfileName(activeUsername);
    }

    if (savedEmail) {
      setProfileEmail(savedEmail);
    }

    const refresh = () => {
      DashboardAdapterService.clearCache();
      const fresh = DashboardAdapterService.getDashboardSummary(userId);
      setSummary(fresh);
    };

    const unsubProblem = EventBus.subscribe('ProblemSolved', refresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', refresh);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', refresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', refresh);

    return () => {
      unsubProblem();
      unsubMemory();
      unsubProfile();
      unsubPlatform();
    };
  }, [userId, activeUsername]);

  const { playerHud, platformSnapshot, recentActivity, weeklyProgress } = summary;
  const { totalXp: xp, level, currentLevelXp, nextLevelXp, levelPct, currentStreak: streak, solvedCount } = playerHud;

  const lcPlatform = platformSnapshot.find((p) => p.platformKey === 'leetcode') || { solved: 0, total: 713, percentage: 0 };
  const ccPlatform = platformSnapshot.find((p) => p.platformKey === 'codechef') || { solved: 0, total: 839, percentage: 0 };
  const cfPlatform = platformSnapshot.find((p) => p.platformKey === 'codeforces') || { solved: 0, total: 792, percentage: 0 };
  const totalCurriculumProblems = 713 + 839 + 792;
  const overallPercentage = totalCurriculumProblems > 0 ? ((solvedCount / totalCurriculumProblems) * 100).toFixed(1) : '0';

  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return 'Competitive Master';
    if (lvl >= 6) return 'Advanced Problem Solver';
    if (lvl >= 3) return 'Algorithm Practitioner';
    return 'DSA Explorer';
  };

  const handleOpenEditModal = () => {
    setEditName(profileName);
    setEditEmail(profileEmail);
    setEditLcUser(settings.integrations?.leetcode?.username || 'lc_developer');
    setEditCcUser(settings.integrations?.codechef?.username || 'cc_developer');
    setEditCfUser(settings.integrations?.codeforces?.username || 'cf_developer');
    setEditGfgUser(settings.integrations?.gfg?.username || 'gfg_developer');
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = () => {
    if (!editName.trim()) {
      toast('Name cannot be empty', 'warning');
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const trimmedName = editName.trim();
      const trimmedEmail = editEmail.trim() || 'developer@dsacracker.dev';

      setProfileName(trimmedName);
      setProfileEmail(trimmedEmail);
      localStorage.setItem('dsa-user-name', trimmedName);
      localStorage.setItem('dsa-user-email', trimmedEmail);

      // Save platform usernames to settings
      if (settings.integrations) {
        updateSetting('integrations', 'leetcode', {
          ...settings.integrations.leetcode,
          username: editLcUser.trim() || 'lc_developer',
          connected: true,
        });
        updateSetting('integrations', 'codechef', {
          ...settings.integrations.codechef,
          username: editCcUser.trim() || 'cc_developer',
          connected: true,
        });
        updateSetting('integrations', 'codeforces', {
          ...settings.integrations.codeforces,
          username: editCfUser.trim() || 'cf_developer',
          connected: true,
        });
        if (settings.integrations.gfg) {
          updateSetting('integrations', 'gfg', {
            ...settings.integrations.gfg,
            username: editGfgUser.trim() || 'gfg_developer',
            connected: false,
          });
        }
      }

      EventBus.publish('ProfileUpdated', {
        userId,
        name: trimmedName,
        email: trimmedEmail,
        timestamp: new Date().toISOString(),
      });

      EventBus.publish('PlatformSynced', {
        userId,
        platform: 'all',
        timestamp: new Date().toISOString(),
      });

      setIsSaving(false);
      setIsEditModalOpen(false);
      toast('Profile updated successfully!', 'success');
    }, 400);
  };

  const isLight = settings.appearance.theme === 'light';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '28px 36px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. PREMIUM PROFILE HEADER ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'relative',
          padding: '32px 36px',
          borderRadius: '24px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)'
            : 'linear-gradient(135deg, rgba(26, 18, 52, 0.96) 0%, rgba(13, 10, 30, 0.98) 60%, rgba(7, 5, 18, 1) 100%)',
          border: isLight
            ? '1.5px solid rgba(56, 189, 248, 0.35)'
            : '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
          boxShadow: isLight
            ? '0 12px 36px rgba(56, 189, 248, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 20px 50px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          overflow: 'hidden',
        }}
      >
        {/* Subtle illuminated accent glow aura */}
        <div
          style={{
            position: 'absolute',
            top: '-70px',
            right: '-70px',
            width: '360px',
            height: '360px',
            background: 'radial-gradient(circle, var(--accent-glow, rgba(168, 85, 247, 0.2)) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Identity & Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            zIndex: 1,
          }}
        >
          {/* LEFT: Large Avatar (96px) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary, #8B5CF6) 0%, #38BDF8 100%)',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 0 36px var(--accent-glow, rgba(139, 92, 246, 0.6))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#FFF',
                }}
              >
                {profileName.charAt(0).toUpperCase()}
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: '-4px',
                  right: '-4px',
                  background: '#10B981',
                  borderRadius: '99px',
                  padding: '3px 10px',
                  fontSize: '11px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  border: '2px solid var(--surface)',
                  boxShadow: '0 2px 10px rgba(16, 185, 129, 0.5)',
                }}
              >
                Lvl {level}
              </div>
            </div>

            {/* CENTER: User Details, Role, Email, XP Progress */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: '28px', fontWeight: 900, color: '#FFF', letterSpacing: '-0.02em' }}>
                  {profileName}
                </h1>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
                    color: '#CBD5E1',
                    letterSpacing: '0.02em',
                  }}
                >
                  {getRankTitle(level)}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '6px', color: '#94A3B8', fontSize: '13px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} style={{ color: 'var(--primary, #8B5CF6)' }} />
                  {profileEmail}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={14} style={{ color: '#38BDF8' }} />
                  Member since 2026
                </span>
              </div>

              {/* XP Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px', maxWidth: '420px' }}>
                <div
                  style={{
                    flex: 1,
                    height: '9px',
                    borderRadius: '5px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${levelPct}%`,
                      background: 'linear-gradient(90deg, var(--primary, #8B5CF6), #10B981)',
                      borderRadius: '5px',
                      transition: 'width 0.4s ease',
                      boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)',
                    }}
                  />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', whiteSpace: 'nowrap' }}>
                  <strong style={{ color: '#10B981' }}>{currentLevelXp}</strong> / {nextLevelXp} XP ({levelPct}%)
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.04, boxShadow: '0 8px 24px var(--accent-glow, rgba(139, 92, 246, 0.5))' }}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={handleOpenEditModal}
              style={{
                padding: '12px 24px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--primary, #8B5CF6) 0%, #6366F1 100%)',
                border: 'none',
                color: '#FFF',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.35)',
              }}
            >
              <Edit3 size={16} /> Edit Profile
            </motion.button>

            <Link href="/settings" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#CBD5E1',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <SettingsIcon size={16} /> Settings
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Compact Statistics Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            zIndex: 1,
          }}
        >
          <div style={statChipSt('#10B981')}>
            <CheckCircle2 size={20} style={{ color: '#10B981' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#FFF', display: 'block', lineHeight: 1 }}>{solvedCount}</strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Problems Solved</span>
            </div>
          </div>

          <div style={statChipSt('#F59E0B')}>
            <Zap size={20} style={{ color: '#F59E0B' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#FFF', display: 'block', lineHeight: 1 }}>{xp} XP</strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Total XP</span>
            </div>
          </div>

          <div style={statChipSt('#F97316')}>
            <Flame size={20} style={{ color: '#F97316' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#FFF', display: 'block', lineHeight: 1 }}>{streak} Days</strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Current Streak</span>
            </div>
          </div>

          <div style={statChipSt('var(--primary, #8B5CF6)')}>
            <Shield size={20} style={{ color: 'var(--primary, #8B5CF6)' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#FFF', display: 'block', lineHeight: 1 }}>Level {level}</strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Rank Level</span>
            </div>
          </div>

          <div style={statChipSt('#38BDF8')}>
            <Layers size={20} style={{ color: '#38BDF8' }} />
            <div>
              <strong style={{ fontSize: '18px', color: '#FFF', display: 'block', lineHeight: 1 }}>3 / 4</strong>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Connected Platforms</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. THREE INDEPENDENT PLATFORM RAILWAY JOURNEYS ────────── */}
      <PlatformTrainJourneys platformTrains={summary.platformTrains} />

      {/* ── 3. RESPONSIVE 2-COLUMN PROFILE CONTENT AREA ──────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '24px',
        }}
      >
        {/* LEFT COLUMN: Coding Statistics & Learning Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SECTION A: CODING STATISTICS */}
          <div style={profilePanelSt}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={iconBadgeSt('#10B981')}>
                  <CheckCircle2 size={18} style={{ color: '#10B981' }} />
                </div>
                <div>
                  <h3 style={panelHeaderSt}>CODING STATISTICS</h3>
                  <span style={panelSubheaderSt}>Mastered problems across canonical curriculum</span>
                </div>
              </div>
              <Link href="/analytics" style={{ fontSize: '11px', color: '#10B981', fontWeight: 800, textDecoration: 'none' }}>
                Full Analytics →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={miniStatBoxSt('#10B981')}>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Total Solved</span>
                <strong style={{ fontSize: '20px', color: '#10B981', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  {solvedCount}
                </strong>
                <span style={{ fontSize: '10px', color: '#6EE7B7' }}>Across all realms</span>
              </div>

              <div style={miniStatBoxSt('#10B981')}>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>LeetCode Solved</span>
                <strong style={{ fontSize: '20px', color: '#10B981', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  {lcPlatform.solved} / {lcPlatform.total}
                </strong>
                <span style={{ fontSize: '10px', color: '#6EE7B7' }}>{lcPlatform.percentage}% canonical</span>
              </div>

              <div style={miniStatBoxSt('#F97316')}>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>CodeChef Solved</span>
                <strong style={{ fontSize: '20px', color: '#F97316', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  {ccPlatform.solved} / {ccPlatform.total}
                </strong>
                <span style={{ fontSize: '10px', color: '#FDBA74' }}>{ccPlatform.percentage}% canonical</span>
              </div>

              <div style={miniStatBoxSt('#38BDF8')}>
                <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Codeforces Solved</span>
                <strong style={{ fontSize: '20px', color: '#38BDF8', fontWeight: 900, display: 'block', marginTop: '2px' }}>
                  {cfPlatform.solved} / {cfPlatform.total}
                </strong>
                <span style={{ fontSize: '10px', color: '#93C5FD' }}>{cfPlatform.percentage}% canonical</span>
              </div>
            </div>
          </div>

          {/* SECTION B: LEARNING PROGRESS */}
          <div style={profilePanelSt}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={iconBadgeSt('var(--primary, #8B5CF6)')}>
                  <TrendingUp size={18} style={{ color: 'var(--primary, #8B5CF6)' }} />
                </div>
                <div>
                  <h3 style={panelHeaderSt}>LEARNING PROGRESS</h3>
                  <span style={panelSubheaderSt}>Experience trajectory &amp; realm mastery</span>
                </div>
              </div>
              <span style={{ fontSize: '11px', color: '#A855F7', fontWeight: 800 }}>
                Lvl {level} Practitioner
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Next Level Progression */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1' }}>XP toward Level {level + 1}</span>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#10B981' }}>
                    {currentLevelXp} / {nextLevelXp} XP ({levelPct}%)
                  </span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${levelPct}%`, background: 'linear-gradient(90deg, #8B5CF6, #10B981)', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Overall Completion */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#CBD5E1' }}>Total Curriculum Completion</span>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#38BDF8' }}>
                    {solvedCount} / {totalCurriculumProblems} ({overallPercentage}%)
                  </span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(100, Number(overallPercentage))}%`, background: 'linear-gradient(90deg, #38BDF8, #6366F1)', borderRadius: '4px' }} />
                </div>
              </div>

              {/* Active Realm */}
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Compass size={18} style={{ color: '#F59E0B' }} />
                  <div>
                    <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 700 }}>Current Learning Realm</span>
                    <strong style={{ fontSize: '13px', color: '#FFF', display: 'block' }}>Kingdom of Beginnings (Arrays &amp; Sliding Window)</strong>
                  </div>
                </div>
                <Link href="/practice/basic-arrays" style={{ fontSize: '11px', color: '#F59E0B', fontWeight: 800, textDecoration: 'none' }}>
                  Continue →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Platform Connections & Recent History */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* SECTION C: PLATFORM CONNECTIONS */}
          <div style={profilePanelSt}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={iconBadgeSt('var(--primary, #8B5CF6)')}>
                  <Globe size={18} style={{ color: 'var(--primary, #8B5CF6)' }} />
                </div>
                <div>
                  <h3 style={panelHeaderSt}>PLATFORM CONNECTIONS</h3>
                  <span style={panelSubheaderSt}>Sync handles and canonical coverage</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleOpenEditModal}
                style={{ fontSize: '11px', color: 'var(--primary, #8B5CF6)', fontWeight: 800, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                Edit Handles →
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* LeetCode */}
              <div style={platformConnectionRowSt('#10B981')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFF', display: 'block' }}>LeetCode</strong>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>@{settings.integrations?.leetcode?.username || 'lc_developer'}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#10B981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                    Connected
                  </span>
                  <span style={{ fontSize: '11px', color: '#CBD5E1', display: 'block', marginTop: '2px' }}>
                    {lcPlatform.solved} / {lcPlatform.total}
                  </span>
                </div>
              </div>

              {/* CodeChef */}
              <div style={platformConnectionRowSt('#F97316')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F97316', boxShadow: '0 0 6px #F97316' }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFF', display: 'block' }}>CodeChef</strong>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>@{settings.integrations?.codechef?.username || 'cc_developer'}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#F97316', background: 'rgba(249, 115, 22, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                    Connected
                  </span>
                  <span style={{ fontSize: '11px', color: '#CBD5E1', display: 'block', marginTop: '2px' }}>
                    {ccPlatform.solved} / {ccPlatform.total}
                  </span>
                </div>
              </div>

              {/* Codeforces */}
              <div style={platformConnectionRowSt('#38BDF8')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38BDF8', boxShadow: '0 0 6px #38BDF8' }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#FFF', display: 'block' }}>Codeforces</strong>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>@{settings.integrations?.codeforces?.username || 'cf_developer'}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#38BDF8', background: 'rgba(56, 189, 248, 0.15)', padding: '2px 8px', borderRadius: '6px' }}>
                    Connected
                  </span>
                  <span style={{ fontSize: '11px', color: '#CBD5E1', display: 'block', marginTop: '2px' }}>
                    {cfPlatform.solved} / {cfPlatform.total}
                  </span>
                </div>
              </div>

              {/* GeeksForGeeks */}
              <div style={{ ...platformConnectionRowSt('#64748B'), opacity: 0.65 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={14} style={{ color: '#94A3B8' }} />
                  <div>
                    <strong style={{ fontSize: '13px', color: '#94A3B8', display: 'block' }}>GeeksForGeeks</strong>
                    <span style={{ fontSize: '11px', color: '#64748B' }}>Integration locked</span>
                  </div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#94A3B8', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                  Coming Soon
                </span>
              </div>
            </div>
          </div>

          {/* SECTION D: RECENT CODING ACTIVITY */}
          <div style={profilePanelSt}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={iconBadgeSt('#06B6D4')}>
                  <Clock size={18} style={{ color: '#06B6D4' }} />
                </div>
                <div>
                  <h3 style={panelHeaderSt}>RECENT CODING ACTIVITY</h3>
                  <span style={panelSubheaderSt}>Chronological stream of problems solved &amp; reviewed</span>
                </div>
              </div>
              <Link href="/journey" style={{ fontSize: '11px', color: '#06B6D4', fontWeight: 800, textDecoration: 'none' }}>
                Chronicle →
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 5).map((act) => (
                  <Link
                    key={act.id}
                    href={act.problemUrl || '/practice'}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: act.platformColor }} />
                        <div>
                          <strong style={{ fontSize: '13px', color: '#FFF', display: 'block' }}>{act.title}</strong>
                          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                            <strong style={{ color: act.platformColor }}>{act.platform}</strong> · {act.action}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {act.xpEarned > 0 && (
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#FDE047', background: 'rgba(253, 224, 71, 0.15)', padding: '2px 6px', borderRadius: '4px' }}>
                            +{act.xpEarned} XP
                          </span>
                        )}
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>{act.timeAgo}</span>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8', fontSize: '12px' }}>
                  No recent coding activity. Solve a problem in Practice Arena to build your chronicle!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. EDIT PROFILE MODAL DRAWER ────────────────────────────── */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '100%',
                maxWidth: '540px',
                borderRadius: '24px',
                background: 'rgba(16, 12, 34, 0.98)',
                border: '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.15))',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.85), 0 0 35px var(--accent-glow, rgba(139, 92, 246, 0.25))',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={iconBadgeSt('var(--primary, #8B5CF6)')}>
                    <Edit3 size={18} style={{ color: 'var(--primary, #8B5CF6)' }} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#FFF' }}>Edit Profile</h3>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>Customize your identity &amp; sync handles</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Input Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Personal Information
                </span>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                    Profile Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name"
                    style={modalInputSt}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', display: 'block', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Enter your email"
                    style={modalInputSt}
                  />
                </div>

                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />

                <span style={{ fontSize: '11px', fontWeight: 800, color: '#CBD5E1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Coding Platform Handles
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#10B981', display: 'block', marginBottom: '4px' }}>
                      LeetCode Username
                    </label>
                    <input
                      type="text"
                      value={editLcUser}
                      onChange={(e) => setEditLcUser(e.target.value)}
                      placeholder="leetcode handle"
                      style={modalInputSt}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#F97316', display: 'block', marginBottom: '4px' }}>
                      CodeChef Username
                    </label>
                    <input
                      type="text"
                      value={editCcUser}
                      onChange={(e) => setEditCcUser(e.target.value)}
                      placeholder="codechef handle"
                      style={modalInputSt}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#38BDF8', display: 'block', marginBottom: '4px' }}>
                      Codeforces Username
                    </label>
                    <input
                      type="text"
                      value={editCfUser}
                      onChange={(e) => setEditCfUser(e.target.value)}
                      placeholder="codeforces handle"
                      style={modalInputSt}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', display: 'block', marginBottom: '4px' }}>
                      GeeksForGeeks Username
                    </label>
                    <input
                      type="text"
                      value={editGfgUser}
                      onChange={(e) => setEditGfgUser(e.target.value)}
                      placeholder="gfg handle"
                      style={modalInputSt}
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#CBD5E1',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveProfile}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--primary, #8B5CF6) 0%, #10B981 100%)',
                    border: 'none',
                    color: '#FFF',
                    fontSize: '13px',
                    fontWeight: 900,
                    cursor: isSaving ? 'wait' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  {isSaving ? (
                    'Saving...'
                  ) : (
                    <>
                      <Save size={15} /> Save Changes
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── STYLES ─────────────────────────────────────────────────────────────
function statChipSt(accent: string): React.CSSProperties {
  return {
    padding: '14px 18px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${accent}33`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: `0 4px 16px ${accent}10`,
  };
}

const profilePanelSt: React.CSSProperties = {
  padding: '24px 28px',
  borderRadius: '20px',
  background: 'rgba(14, 10, 32, 0.94)',
  border: '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.1))',
  boxShadow: '0 14px 40px rgba(0, 0, 0, 0.65)',
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
};

const panelHeaderSt: React.CSSProperties = {
  margin: 0,
  fontSize: '16px',
  fontWeight: 900,
  color: '#FFF',
  letterSpacing: '0.02em',
};

const panelSubheaderSt: React.CSSProperties = {
  fontSize: '11px',
  color: '#94A3B8',
  fontWeight: 600,
  display: 'block',
  marginTop: '2px',
};

function iconBadgeSt(color: string): React.CSSProperties {
  return {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: `${color}18`,
    border: `1px solid ${color}44`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };
}

function miniStatBoxSt(color: string): React.CSSProperties {
  return {
    padding: '14px 16px',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.025)',
    border: `1px solid ${color}33`,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };
}

function platformConnectionRowSt(color: string): React.CSSProperties {
  return {
    padding: '12px 16px',
    borderRadius: '14px',
    background: 'rgba(255, 255, 255, 0.025)',
    border: `1px solid ${color}33`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
}

const modalInputSt: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  background: 'rgba(0, 0, 0, 0.6)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  color: '#FFF',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};
