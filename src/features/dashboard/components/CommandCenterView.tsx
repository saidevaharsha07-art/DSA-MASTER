'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Zap,
  CheckCircle2,
  Layers,
  Edit3,
  Settings as SettingsIcon,
  X,
  User,
  Compass,
  Sparkles,
  ArrowRight,
  Clock,
  RotateCcw,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  BarChart3,
  TrendingUp,
  Play,
  StopCircle,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { DashboardAdapterService, DashboardSummary } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { PracticeEngineService } from '@/src/features/practice/services/practice-engine.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { EventBus } from '@/src/core/events/event-bus';
import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';

export function CommandCenterView() {
  const { userId, username: activeUsername, isAuthenticated } = useActiveUser();
  const { settings } = useSettings();
  const { toast } = useToast();

  const isLight = settings.appearance.theme === 'light';

  const [summary, setSummary] = useState<DashboardSummary>(() =>
    DashboardAdapterService.getDashboardSummary(userId)
  );

  // Drilldown state for Mastery Overview
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);
  const [expandedAreaSlug, setExpandedAreaSlug] = useState<string | null>(null);
  const [expandedSubtopicSlug, setExpandedSubtopicSlug] = useState<string | null>(null);

  // Profile Information State
  const [profileName, setProfileName] = useState<string>('Developer');
  const [profileEmail, setProfileEmail] = useState<string>('developer@dsamaster.dev');
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
    const userRec = canonicalDb.getUser(userId);
    const savedName = userRec?.displayName || localStorage.getItem(`dsa-user-name_${userId}`) || localStorage.getItem('dsa-user-name');
    const savedEmail = userRec?.email || localStorage.getItem(`dsa-user-email_${userId}`) || localStorage.getItem('dsa-user-email');

    if (savedName) {
      setProfileName(savedName);
    } else if (activeUsername && activeUsername !== 'Guest') {
      setProfileName(activeUsername);
    } else {
      setProfileName(isAuthenticated ? 'Learner' : 'Guest Learner');
    }

    if (savedEmail) {
      setProfileEmail(savedEmail);
    } else {
      setProfileEmail('developer@dsamaster.dev');
    }

    const refresh = () => {
      DashboardAdapterService.clearCache();
      const fresh = DashboardAdapterService.getDashboardSummary(userId);
      setSummary(fresh);
    };

    refresh();

    const unsubProblem = EventBus.subscribe('ProblemSolved', refresh);
    const unsubMemory = EventBus.subscribe('MemoryReviewed', refresh);
    const unsubProfile = EventBus.subscribe('ProfileUpdated', refresh);
    const unsubPlatform = EventBus.subscribe('PlatformSynced', refresh);
    const unsubPracticeSession = EventBus.subscribe('PracticeSessionUpdated', refresh);

    return () => {
      unsubProblem();
      unsubMemory();
      unsubProfile();
      unsubPlatform();
      unsubPracticeSession();
    };
  }, [userId, activeUsername, isAuthenticated]);

  // Extract Player HUD metrics
  const { totalXp: xp, level, currentStreak: streak, solvedCount } = summary.playerHud;

  const handleEndActiveSession = () => {
    PracticeEngineService.saveActiveSession(userId, null);
    DashboardAdapterService.clearCache();
    const fresh = DashboardAdapterService.getDashboardSummary(userId);
    setSummary(fresh);
    EventBus.publish('PracticeSessionUpdated', { userId, status: 'ended' });
    toast('Practice sprint ended successfully.', 'info');
  };

  const handleOpenEditModal = () => {
    setEditName(profileName);
    setEditEmail(profileEmail);

    const userRec = canonicalDb.getUser(userId);
    const handles = userRec?.settings?.handles || {};

    setEditLcUser(handles.leetcode || localStorage.getItem(`dsa-handle-leetcode_${userId}`) || localStorage.getItem('dsa-handle-leetcode') || '');
    setEditCcUser(handles.codechef || localStorage.getItem(`dsa-handle-codechef_${userId}`) || localStorage.getItem('dsa-handle-codechef') || '');
    setEditCfUser(handles.codeforces || localStorage.getItem(`dsa-handle-codeforces_${userId}`) || localStorage.getItem('dsa-handle-codeforces') || '');
    setEditGfgUser(handles.geeksforgeeks || localStorage.getItem(`dsa-handle-gfg_${userId}`) || localStorage.getItem('dsa-handle-gfg') || '');

    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const trimmedName = editName.trim() || 'Developer';
    const trimmedEmail = editEmail.trim() || 'developer@dsamaster.dev';

    localStorage.setItem(`dsa-user-name_${userId}`, trimmedName);
    localStorage.setItem(`dsa-user-email_${userId}`, trimmedEmail);
    localStorage.setItem(`dsa-handle-leetcode_${userId}`, editLcUser.trim());
    localStorage.setItem(`dsa-handle-codechef_${userId}`, editCcUser.trim());
    localStorage.setItem(`dsa-handle-codeforces_${userId}`, editCfUser.trim());
    localStorage.setItem(`dsa-handle-gfg_${userId}`, editGfgUser.trim());

    canonicalDb.saveUser({
      userId,
      username: activeUsername || trimmedName,
      displayName: trimmedName,
      email: trimmedEmail,
      settings: {
        handles: {
          leetcode: editLcUser.trim(),
          codechef: editCcUser.trim(),
          codeforces: editCfUser.trim(),
          geeksforgeeks: editGfgUser.trim(),
        },
      },
      createdAt: canonicalDb.getUser(userId)?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setProfileName(trimmedName);
    setProfileEmail(trimmedEmail);

    setTimeout(() => {
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
    }, 300);
  };

  const getPlatformBadgeColor = (plat?: string) => {
    switch (plat?.toLowerCase()) {
      case 'leetcode': return '#10B981';
      case 'codechef': return '#F97316';
      case 'codeforces': return '#3B82F6';
      case 'geeksforgeeks': return '#2F9E44';
      default: return '#8B5CF6';
    }
  };

  const getDifficultyBadge = (diff?: string) => {
    switch (diff?.toLowerCase()) {
      case 'easy': return { bg: 'rgba(16, 185, 129, 0.15)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)' };
      case 'medium': return { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)' };
      case 'hard': return { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)' };
      default: return { bg: 'rgba(148, 163, 184, 0.15)', text: '#94A3B8', border: 'rgba(148, 163, 184, 0.3)' };
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background, #0B0F19)',
        color: 'var(--text-primary, #F8FAFC)',
        padding: '24px 32px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* ── GUEST PUBLIC FALLBACK BANNER (Requirement 12) ── */}
      {!isAuthenticated && (
        <div
          data-testid="guest-banner"
          style={{
            padding: '14px 20px',
            borderRadius: '12px',
            background: isLight ? '#EFF6FF' : 'rgba(30, 58, 138, 0.25)',
            border: isLight ? '1.5px solid #BFDBFE' : '1px solid rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={20} style={{ color: '#3B82F6' }} />
            <div>
              <span style={{ fontSize: '13px', fontWeight: 700, color: isLight ? '#1E3A8A' : '#93C5FD' }}>
                Guest Exploration Mode
              </span>
              <span style={{ fontSize: '12px', color: isLight ? '#3B82F6' : '#BFDBFE', marginLeft: '8px' }}>
                Personal telemetry is isolated. Sign in to save progress, track spaced repetition, and synchronize external platform handles.
              </span>
            </div>
          </div>
          <Link href="/login?redirect=/dashboard" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              data-testid="guest-signin-btn"
              style={{
                padding: '7px 16px',
                borderRadius: '8px',
                background: '#3B82F6',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Sign In / Register
            </button>
          </Link>
        </div>
      )}

      {/* ── 1. DEVELOPER HERO HUD (METRICS & IDENTITY) ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          padding: '24px 28px',
          borderRadius: '20px',
          background: isLight
            ? 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)'
            : 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(20, 28, 45, 0.98) 60%, rgba(15, 23, 42, 1) 100%)',
          border: isLight
            ? '1.5px solid rgba(56, 189, 248, 0.35)'
            : '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
          boxShadow: isLight
            ? '0 12px 36px rgba(56, 189, 248, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
            : '0 20px 50px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          {/* Identity Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: 900,
                color: '#FFF',
                border: isLight ? '3px solid #FFF' : '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
              }}
            >
              {profileName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)' }}>
                  Welcome back, {profileName}
                </h1>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: 'rgba(2, 132, 199, 0.15)',
                    color: '#38BDF8',
                    border: '1px solid rgba(56, 189, 248, 0.3)',
                  }}
                >
                  Lvl {level}
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-secondary, #94A3B8)' }}>
                {profileEmail} • Command Center 2.0 Single Source of Truth
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleOpenEditModal}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                background: isLight ? '#FFF' : 'rgba(255, 255, 255, 0.06)',
                border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Edit3 size={14} style={{ color: '#0284C7' }} /> Edit Profile
            </button>
            <Link href="/settings" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.15)',
                  border: isLight ? '1.5px solid #0284C7' : '1px solid #38BDF8',
                  color: isLight ? '#0284C7' : '#38BDF8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <SettingsIcon size={14} /> Settings
              </button>
            </Link>
          </div>
        </div>

        {/* 4 HUD Metric Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          <div style={hudMetricSt('#10B981', isLight, '#ECFDF5')}>
            <CheckCircle2 size={20} style={{ color: '#10B981' }} />
            <div>
              <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block' }}>{solvedCount}</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>Problems Solved</span>
            </div>
          </div>
          <div style={hudMetricSt('#F59E0B', isLight, '#FFFBEB')}>
            <Zap size={20} style={{ color: '#F59E0B' }} />
            <div>
              <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block' }}>{xp} XP</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>Experience Points</span>
            </div>
          </div>
          <div style={hudMetricSt('#F97316', isLight, '#FFF7ED')}>
            <Flame size={20} style={{ color: '#F97316' }} />
            <div>
              <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block' }}>{streak} Days</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>Current Streak</span>
            </div>
          </div>
          <div style={hudMetricSt('#3B82F6', isLight, '#EFF6FF')}>
            <Layers size={20} style={{ color: '#3B82F6' }} />
            <div>
              <strong style={{ fontSize: '18px', color: 'var(--text-primary)', display: 'block' }}>4 / 4</strong>
              <span style={{ fontSize: '11px', color: 'var(--text-muted, #94A3B8)', fontWeight: 600 }}>Active Platforms</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. HERO: YOUR NEXT MISSION (Requirement 1) ── */}
      {summary.heroMission && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          data-testid="hero-next-mission"
          style={{
            padding: '24px 28px',
            borderRadius: '16px',
            background: isLight
              ? 'linear-gradient(135deg, #FFFFFF 0%, #F0FDF4 100%)'
              : 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)',
            border: isLight ? '2px solid rgba(16, 185, 129, 0.35)' : '1.5px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10B981',
                }}
              >
                <Target size={16} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#10B981' }}>
                Your Next Mission
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                {summary.heroMission.badge.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Platform badge */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: `${getPlatformBadgeColor(summary.heroMission.platform)}1A`,
                  color: getPlatformBadgeColor(summary.heroMission.platform),
                  border: `1px solid ${getPlatformBadgeColor(summary.heroMission.platform)}4D`,
                  textTransform: 'uppercase',
                }}
              >
                {summary.heroMission.platform}
              </span>
              {/* Difficulty badge */}
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  background: getDifficultyBadge(summary.heroMission.difficulty).bg,
                  color: getDifficultyBadge(summary.heroMission.difficulty).text,
                  border: `1px solid ${getDifficultyBadge(summary.heroMission.difficulty).border}`,
                }}
              >
                {summary.heroMission.difficulty}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)' }}>
                {summary.heroMission.problem.title}
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary, #94A3B8)', marginBottom: '10px' }}>
                <span>{summary.heroMission.learningAreaTitle}</span>
                <span>•</span>
                <span>{summary.heroMission.subtopicTitle}</span>
                <span>•</span>
                <span style={{ color: 'var(--text-primary)' }}>{summary.heroMission.patternTitle}</span>
              </div>
              <div
                data-testid="hero-why-reason"
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.04)',
                  border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
                  fontSize: '12px',
                  color: isLight ? '#334155' : '#CBD5E1',
                  lineHeight: '1.5',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Sparkles size={14} style={{ color: '#10B981', flexShrink: 0 }} />
                <span><strong>Why this mission:</strong> {summary.heroMission.whyThisProblem}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'center' }}>
              <Link href={summary.heroMission.practiceUrl} style={{ textDecoration: 'none' }}>
                <button
                  type="button"
                  data-testid="hero-start-btn"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                  }}
                >
                  <Play size={16} fill="#FFFFFF" /> Start Problem
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── 3. ZERO-STATE / FIRST MISSION BANNER (Requirement 11) ── */}
      {summary.zeroState?.isZeroState && (
        <div
          data-testid="zero-state-banner"
          style={{
            padding: '20px 24px',
            borderRadius: '14px',
            background: isLight ? '#FEF3C7' : 'rgba(245, 158, 11, 0.08)',
            border: isLight ? '1.5px solid #FCD34D' : '1px solid rgba(245, 158, 11, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={20} style={{ color: '#F59E0B' }} />
            <div>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: isLight ? '#92400E' : '#FBBF24' }}>
                Curriculum Baseline: 0% Progress (Not Started)
              </h3>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: isLight ? '#B45309' : '#FDE68A' }}>
                {summary.zeroState.explanation}
              </p>
            </div>
          </div>
          {summary.zeroState.firstMission && (
            <div style={{ padding: '10px 14px', background: isLight ? '#FFF' : 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
              <strong style={{ fontSize: '13px', display: 'block', marginBottom: '4px' }}>
                {summary.zeroState.firstMission.title}
              </strong>
              <ul style={{ margin: '4px 0 0 16px', padding: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>
                {summary.zeroState.firstMission.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── 4. CONTINUE PRACTICE SESSION (Requirement 2) ── */}
      {summary.activeSessionSummary?.hasActiveSession && (
        <div
          data-testid="continue-session-card"
          style={{
            padding: '20px 24px',
            borderRadius: '16px',
            background: isLight ? '#F0FDF4' : 'rgba(16, 185, 129, 0.08)',
            border: isLight ? '1.5px solid #86EFAC' : '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} style={{ color: '#10B981' }} />
              <span style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: '#10B981' }}>
                Active Practice Sprint in Progress
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                ({summary.activeSessionSummary.completedCount} / {summary.activeSessionSummary.sessionSize} completed)
              </span>
            </div>
            {summary.activeSessionSummary.currentProblem && (
              <strong style={{ fontSize: '15px', color: 'var(--text-primary)' }}>
                Current Problem: {summary.activeSessionSummary.currentProblem.title} ({summary.activeSessionSummary.currentProblem.difficulty})
              </strong>
            )}
            <div style={{ width: '220px', height: '6px', background: 'rgba(0,0,0,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${summary.activeSessionSummary.progressPercent}%`,
                  height: '100%',
                  background: '#10B981',
                  borderRadius: '3px',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleEndActiveSession}
              data-testid="end-session-btn"
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                background: 'transparent',
                border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255,255,255,0.15)',
                color: 'var(--text-secondary)',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <StopCircle size={14} /> End Sprint
            </button>
            <Link href={summary.activeSessionSummary.continueUrl} style={{ textDecoration: 'none' }}>
              <button
                type="button"
                data-testid="continue-session-btn"
                style={{
                  padding: '9px 18px',
                  borderRadius: '8px',
                  background: '#10B981',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Play size={14} fill="#FFF" /> Continue Practice
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* ── 5. TWO-COLUMN GRID: ROADMAP SNAPSHOT & MASTERY OVERVIEW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
        {/* Adaptive Roadmap Snapshot (Requirement 3) */}
        <div
          data-testid="roadmap-snapshot"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} style={{ color: '#3B82F6' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Adaptive Roadmap Snapshot</h3>
            </div>
            <Link href={summary.roadmapSnapshot.roadmapUrl} style={{ textDecoration: 'none' }}>
              <button
                type="button"
                data-testid="open-roadmap-btn"
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  color: '#3B82F6',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Open Roadmap <ArrowRight size={12} />
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Current Learning Area:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{summary.roadmapSnapshot.currentLearningArea}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Focus Subtopic & Pattern:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                {summary.roadmapSnapshot.currentSubtopic} • {summary.roadmapSnapshot.currentPattern}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Area Mastery Status:</span>
              <strong style={{ color: '#10B981' }}>{summary.roadmapSnapshot.masterySignal}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Next Milestone:</span>
              <span style={{ color: '#38BDF8', fontWeight: 600 }}>{summary.roadmapSnapshot.nextMilestoneTitle}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Recommended Concept:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{summary.roadmapSnapshot.nextRecommendedConcept}</span>
            </div>
          </div>

          <div style={{ marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px' }}>
              <span>Milestone Progress</span>
              <span>{summary.roadmapSnapshot.progressToNextMilestone}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${summary.roadmapSnapshot.progressToNextMilestone}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #3B82F6, #10B981)',
                  borderRadius: '3px',
                }}
              />
            </div>
          </div>
        </div>

        {/* Mastery Overview (Requirement 4) */}
        <div
          data-testid="mastery-overview"
          style={{
            padding: '22px 24px',
            borderRadius: '16px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} style={{ color: '#10B981' }} />
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Mastery Overview</h3>
            </div>
            <button
              type="button"
              data-testid="drilldown-toggle-btn"
              onClick={() => setIsDrilldownOpen(!isDrilldownOpen)}
              style={{
                padding: '5px 12px',
                borderRadius: '6px',
                background: isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              {isDrilldownOpen ? 'Hide Drilldown' : '3-Tier Drilldown'}
              {isDrilldownOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          </div>

          {/* 4 Summary Counters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            <div style={{ textAlign: 'center', padding: '10px 6px', background: 'rgba(16, 185, 129, 0.08)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <strong style={{ fontSize: '18px', color: '#10B981', display: 'block' }}>{summary.masteryOverview.masteredCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Mastered</span>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 6px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <strong style={{ fontSize: '18px', color: '#F59E0B', display: 'block' }}>{summary.masteryOverview.learningCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Learning</span>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 6px', background: 'rgba(244, 63, 94, 0.08)', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <strong style={{ fontSize: '18px', color: '#F43F5E', display: 'block' }}>{summary.masteryOverview.weakCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Weak</span>
            </div>
            <div style={{ textAlign: 'center', padding: '10px 6px', background: 'rgba(139, 92, 246, 0.08)', borderRadius: '8px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <strong style={{ fontSize: '18px', color: '#8B5CF6', display: 'block' }}>{summary.masteryOverview.needsRevisionCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>Due Rev</span>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
            Authentic evaluation across all {summary.masteryOverview.totalTopicsTracked} canonical DSA learning areas. Zero fabricated percentages.
          </p>
        </div>
      </div>

      {/* ── 3-TIER DRILLDOWN ACCORDION (Area -> Subtopic -> Pattern) ── */}
      <AnimatePresence>
        {isDrilldownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            data-testid="mastery-drilldown-matrix"
            style={{
              padding: '20px 24px',
              borderRadius: '16px',
              background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.02)',
              border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
            <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 800 }}>
              Curriculum Mastery Hierarchy (Learning Area → Subtopics → Patterns)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '420px', overflowY: 'auto' }}>
              {summary.masteryOverview.learningAreas.map((area) => (
                <div
                  key={area.slug}
                  style={{
                    borderRadius: '8px',
                    border: isLight ? '1px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.06)',
                    padding: '10px 14px',
                    background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <div
                    onClick={() => setExpandedAreaSlug(expandedAreaSlug === area.slug ? null : area.slug)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <strong style={{ fontSize: '13px' }}>{area.title}</strong>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                        ({area.solvedCount} / {area.totalProblems} solved)
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: area.status === 'mastered' ? 'rgba(16,185,129,0.2)' : area.status === 'weak' ? 'rgba(244,63,94,0.2)' : 'rgba(245,158,11,0.2)',
                          color: area.status === 'mastered' ? '#10B981' : area.status === 'weak' ? '#F43F5E' : '#F59E0B',
                        }}
                      >
                        {area.status.toUpperCase()}
                      </span>
                      {expandedAreaSlug === area.slug ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </div>
                  </div>

                  {/* Subtopics Drilldown */}
                  {expandedAreaSlug === area.slug && (
                    <div style={{ marginTop: '10px', paddingLeft: '14px', borderLeft: '2px solid rgba(59, 130, 246, 0.3)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {area.subtopics.map((sub) => (
                        <div key={sub.slug} style={{ fontSize: '12px' }}>
                          <div
                            onClick={() => setExpandedSubtopicSlug(expandedSubtopicSlug === sub.slug ? null : sub.slug)}
                            style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer', padding: '4px 0' }}
                          >
                            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{sub.title}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{sub.solvedCount} / {sub.totalProblems}</span>
                          </div>
                          {expandedSubtopicSlug === sub.slug && (
                            <div style={{ paddingLeft: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {sub.patterns.map((pat) => (
                                <div key={pat.slug} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                                  <span>↳ {pat.title}</span>
                                  <span>{pat.solvedCount} / {pat.totalProblems}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── 6. THREE-COLUMN INTELLIGENCE SECTION: WEAK AREAS, REVISION QUEUE, MISTAKE SNAPSHOT ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Weak Areas Diagnostic (Requirement 5) */}
        <div
          data-testid="weak-areas-card"
          style={{
            padding: '20px 22px',
            borderRadius: '16px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} style={{ color: '#F43F5E' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Weak Areas Diagnostic</h3>
            </div>
            <Link href="/practice?mode=weakness" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                data-testid="practice-weakness-btn"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(244, 63, 94, 0.1)',
                  border: '1px solid rgba(244, 63, 94, 0.3)',
                  color: '#F43F5E',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Practice Weakness
              </button>
            </Link>
          </div>

          {summary.weakAreasList.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              No critical weak areas detected. Solve more problems to unlock diagnostic analysis.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {summary.weakAreasList.slice(0, 3).map((w, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: isLight ? '#FFF1F2' : 'rgba(244, 63, 94, 0.05)',
                    border: '1px solid rgba(244, 63, 94, 0.2)',
                  }}
                >
                  <strong style={{ fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>
                    {w.area} • {w.pattern}
                  </strong>
                  <p style={{ margin: '3px 0 6px 0', fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {w.reason}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                    <span style={{ color: '#F43F5E', fontWeight: 700 }}>{w.accuracyPercent}% accuracy</span>
                    <Link href={w.practiceUrl} style={{ color: '#0284C7', textDecoration: 'none', fontWeight: 700 }}>
                      Solve Recommended →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revision Queue (SRS / Memory Engine) (Requirement 6) */}
        <div
          data-testid="revision-queue-card"
          style={{
            padding: '20px 22px',
            borderRadius: '16px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={16} style={{ color: '#8B5CF6' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Revision Queue (SRS)</h3>
            </div>
            <Link href={summary.revisionQueueSnapshot.reviseUrl} style={{ textDecoration: 'none' }}>
              <button
                type="button"
                data-testid="revise-now-btn"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#8B5CF6',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Revise Now
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '8px', textAlign: 'center' }}>
            <div style={{ flex: 1, padding: '8px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '6px' }}>
              <strong style={{ fontSize: '15px', color: '#EF4444' }}>{summary.revisionQueueSnapshot.dueNowCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Due Now</span>
            </div>
            <div style={{ flex: 1, padding: '8px', background: 'rgba(245, 158, 11, 0.08)', borderRadius: '6px' }}>
              <strong style={{ fontSize: '15px', color: '#F59E0B' }}>{summary.revisionQueueSnapshot.dueTodayCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Due Today</span>
            </div>
            <div style={{ flex: 1, padding: '8px', background: 'rgba(59, 130, 246, 0.08)', borderRadius: '6px' }}>
              <strong style={{ fontSize: '15px', color: '#3B82F6' }}>{summary.revisionQueueSnapshot.upcomingCount}</strong>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Upcoming</span>
            </div>
          </div>

          {summary.revisionQueueSnapshot.items.length === 0 ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              No cards due for revision right now!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summary.revisionQueueSnapshot.items.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: isLight ? '#FAF5FF' : 'rgba(139, 92, 246, 0.05)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{item.problem.title}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.dueText}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mistake Snapshot (Requirement 7) */}
        <div
          data-testid="mistake-snapshot-card"
          style={{
            padding: '20px 22px',
            borderRadius: '16px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={16} style={{ color: '#F97316' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent Mistakes</h3>
            </div>
            <Link href={summary.mistakeSnapshot.reviewMistakesUrl} style={{ textDecoration: 'none' }}>
              <button
                type="button"
                data-testid="review-mistakes-btn"
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(249, 115, 22, 0.1)',
                  border: '1px solid rgba(249, 115, 22, 0.3)',
                  color: '#F97316',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Review Mistakes
              </button>
            </Link>
          </div>

          {!summary.mistakeSnapshot.hasMistakes ? (
            <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
              No recent mistakes logged. Clean performance!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {summary.mistakeSnapshot.recentMistakes.slice(0, 3).map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: isLight ? '#FFF7ED' : 'rgba(249, 115, 22, 0.05)',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{m.problem.title}</strong>
                    <span style={{ fontSize: '10px', color: '#EF4444', fontWeight: 700 }}>{m.failureType}</span>
                  </div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {m.platform} • {m.pattern} • {m.failedAttemptsCount} attempts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── 7. PLATFORM MIX (ALL 4 PLATFORMS: LEETCODE, CODECHEF, CODEFORCES, GEEKSFORGEEKS) (Requirement 9) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} style={{ color: '#38BDF8' }} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>Platform Coverage Mix (4,000 Total Problems)</h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            1,000 Authentic Problems Per Platform
          </span>
        </div>

        <div
          data-testid="platform-mix-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {summary.platformMix.map((p) => (
            <Link
              key={p.platformKey}
              href={p.practiceUrl}
              data-testid={`platform-card-${p.platformKey}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  padding: '16px 18px',
                  borderRadius: '12px',
                  background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
                  border: isLight ? `1.5px solid ${p.color}40` : `1px solid ${p.color}33`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  transition: 'transform 0.15s ease, border-color 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: p.color }}>{p.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{p.percentage}%</span>
                </div>
                <strong style={{ fontSize: '18px', color: 'var(--text-primary)' }}>
                  {p.solved} <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>/ {p.total}</span>
                </strong>
                <div style={{ width: '100%', height: '5px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${p.percentage}%`,
                      height: '100%',
                      background: p.color,
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── 8. CANONICAL 25 LEARNING AREAS PROGRESS (Requirement 10) ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} style={{ color: '#10B981' }} />
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800 }}>
              All 25 Canonical Learning Areas
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Canonical Computer Science Taxonomy
          </span>
        </div>

        <div
          data-testid="learning-areas-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          {summary.canonicalLearningAreas.map((area) => (
            <div
              key={area.slug}
              data-testid={`area-card-${area.slug}`}
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
                border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.07)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                  {area.number}. {area.title}
                </strong>
                <span style={{ fontSize: '11px', fontWeight: 700, color: area.percentage > 0 ? '#10B981' : 'var(--text-muted)' }}>
                  {area.solvedCount} / {area.totalCount} ({area.percentage}%)
                </span>
              </div>

              <div style={{ width: '100%', height: '4px', background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${area.percentage}%`,
                    height: '100%',
                    background: '#10B981',
                    borderRadius: '2px',
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', marginTop: '2px' }}>
                <Link href={area.journeyUrl} style={{ textDecoration: 'none' }}>
                  <button
                    type="button"
                    style={{
                      padding: '3px 8px',
                      borderRadius: '5px',
                      background: 'transparent',
                      border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'var(--text-secondary)',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Journey
                  </button>
                </Link>
                <Link href={area.practiceUrl} style={{ textDecoration: 'none' }}>
                  <button
                    type="button"
                    style={{
                      padding: '3px 8px',
                      borderRadius: '5px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#10B981',
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Practice
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 9. PROGRESS / MOMENTUM ACTIVITY LOG (Requirement 8) ── */}
      <div
        data-testid="progress-momentum-card"
        style={{
          padding: '20px 24px',
          borderRadius: '16px',
          background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
          border: isLight ? '1.5px solid #E2E8F0' : '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} style={{ color: '#10B981' }} />
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 800 }}>Recent Progress & Telemetry Momentum</h3>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            Real Telemetry Stream
          </span>
        </div>

        {summary.progressMomentum.recentActivity.length === 0 ? (
          <div style={{ padding: '12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '12px' }}>
            No recent activity recorded yet. Start solving problems to populate telemetry!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {summary.progressMomentum.recentActivity.slice(0, 4).map((act, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  background: isLight ? '#F8FAFC' : 'rgba(255, 255, 255, 0.02)',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={14} style={{ color: '#10B981' }} />
                  <span>{act.description}</span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{act.relativeTime}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── EDIT PROFILE MODAL ── */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '520px',
                background: isLight ? '#FFFFFF' : 'var(--surface, #1E293B)',
                border: isLight ? '1.5px solid rgba(56, 189, 248, 0.35)' : '1.5px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '28px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: 'var(--text-primary, #FFF)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={18} style={{ color: '#0284C7' }} />
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900 }}>Edit Developer Profile</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Manage your profile information and handles</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Display Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--border, #CBD5E1)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Email Address</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)',
                      border: '1px solid var(--border, #CBD5E1)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px' }}>Connected Handles (4 Platforms)</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="LeetCode handle"
                      value={editLcUser}
                      onChange={(e) => setEditLcUser(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)', border: '1px solid #CBD5E1', color: 'var(--text-primary)', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="CodeChef handle"
                      value={editCcUser}
                      onChange={(e) => setEditCcUser(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)', border: '1px solid #CBD5E1', color: 'var(--text-primary)', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="Codeforces handle"
                      value={editCfUser}
                      onChange={(e) => setEditCfUser(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)', border: '1px solid #CBD5E1', color: 'var(--text-primary)', fontSize: '12px' }}
                    />
                    <input
                      type="text"
                      placeholder="GeeksForGeeks handle"
                      value={editGfgUser}
                      onChange={(e) => setEditGfgUser(e.target.value)}
                      style={{ padding: '8px 12px', borderRadius: '8px', background: isLight ? '#F8FAFC' : 'rgba(0,0,0,0.2)', border: '1px solid #CBD5E1', color: 'var(--text-primary)', fontSize: '12px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    style={{ padding: '8px 14px', borderRadius: '8px', background: 'transparent', border: '1px solid #CBD5E1', color: 'var(--text-secondary)', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    style={{ padding: '8px 18px', borderRadius: '8px', background: '#0284C7', color: '#FFF', border: 'none', fontSize: '12px', fontWeight: 700, cursor: isSaving ? 'not-allowed' : 'pointer' }}
                  >
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper styling for HUD metric chips
function hudMetricSt(accentColor: string, isLight: boolean, lightBgTint: string): React.CSSProperties {
  return {
    padding: '12px 16px',
    borderRadius: '12px',
    background: isLight ? `linear-gradient(135deg, #FFFFFF 0%, ${lightBgTint} 100%)` : 'rgba(255, 255, 255, 0.03)',
    border: isLight ? `1.5px solid ${accentColor}40` : `1px solid ${accentColor}33`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  };
}
