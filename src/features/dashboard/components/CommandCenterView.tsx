'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Flame,
  Shield,
  Zap,
  CheckCircle2,
  Lock,
  Layers,
  Edit3,
  Settings as SettingsIcon,
  X,
  Save,
  Check,
  Mail,
  User,
  Calendar,
  Compass,
  Sparkles,
} from 'lucide-react';
import { useRoadmap } from '@/hooks/use-roadmap';
import { DashboardAdapterService, DashboardSummary } from '@/src/features/dashboard/services/dashboard-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { EventBus } from '@/src/core/events/event-bus';
import { canonicalDb } from '@/src/core/storage/db/canonical-db.service';
import { TodaysMissionCoordinator } from './TodaysMissionCoordinator';
import { UnifiedRecommendationCard } from './UnifiedRecommendationCard';
import { AdaptiveRoadmapWidget } from './AdaptiveRoadmapWidget';
import { MistakeIntelligenceWidget } from './MistakeIntelligenceWidget';
import { PlatformTrainJourneys } from './PlatformTrainJourneys';
import { DashboardActionHub } from './DashboardActionHub';

export function CommandCenterView() {
  const { state: roadmapState } = useRoadmap();
  const { userId, username: activeUsername } = useActiveUser();
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();

  const isLight = settings.appearance.theme === 'light';

  const [summary, setSummary] = useState<DashboardSummary>(() =>
    DashboardAdapterService.getDashboardSummary(userId)
  );

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
      setProfileName('Developer');
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

    return () => {
      unsubProblem();
      unsubMemory();
      unsubProfile();
      unsubPlatform();
    };
  }, [roadmapState, userId, activeUsername]);

  // Extract Player HUD metrics
  const { totalXp: xp, level, currentLevelXp, nextLevelXp, levelPct, currentStreak: streak, solvedCount } = summary.playerHud;

  const getRankTitle = (lvl: number) => {
    if (lvl >= 10) return 'Competitive Master';
    if (lvl >= 6) return 'Advanced Problem Solver';
    if (lvl >= 3) return 'Algorithm Practitioner';
    return 'DSA Explorer';
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

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--background)',
        color: 'var(--text-primary)',
        padding: '24px 32px',
        overflowY: 'auto',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        transition: 'background-color 0.2s ease, color 0.2s ease',
      }}
    >
      {/* ── 1. DEVELOPER OVERVIEW (GREETING + PERSONAL HUD METRICS) ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          position: 'relative',
          padding: '28px 32px',
          borderRadius: '24px',
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
          gap: '22px',
          overflow: 'hidden',
        }}
      >
        {/* Subtle illuminated accent aura */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '320px',
            height: '320px',
            background: isLight
              ? 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, var(--accent-glow, rgba(168, 85, 247, 0.18)) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top Row: Identity, Actions & HUD Stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
            width: '100%',
            zIndex: 1,
          }}
        >
          {/* Identity & Level Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', flex: '1 1 380px' }}>
            {/* Avatar Crest */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)',
                  border: isLight ? '3px solid #FFFFFF' : '2px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: isLight
                    ? '0 6px 20px rgba(2, 132, 199, 0.35)'
                    : '0 0 28px rgba(56, 189, 248, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
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
                  padding: '2px 8px',
                  fontSize: '10px',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  border: isLight ? '2px solid #FFFFFF' : '2px solid var(--surface)',
                  boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)',
                }}
              >
                Lvl {level}
              </div>
            </div>

            {/* Name, Email, Rank & Progress */}
            <div style={{ flex: '1 1 260px', minWidth: '240px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: 900,
                    color: 'var(--text-primary, #FFF)',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Welcome back, {profileName}
                </h1>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    padding: '2px 10px',
                    borderRadius: '8px',
                    background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(255, 255, 255, 0.06)',
                    border: isLight
                      ? '1px solid rgba(2, 132, 199, 0.25)'
                      : '1px solid var(--panel-border, rgba(255, 255, 255, 0.12))',
                    color: isLight ? '#0284C7' : '#CBD5E1',
                  }}
                >
                  {getRankTitle(level)}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '4px',
                  fontSize: '12px',
                  color: 'var(--text-secondary, #94A3B8)',
                  flexWrap: 'wrap',
                }}
              >
                <span>{profileEmail}</span>
                <span>•</span>
                <span>DSA Command Center</span>
              </div>

              {/* XP Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', width: '100%', maxWidth: '440px' }}>
                <div
                  style={{
                    flex: 1,
                    height: '8px',
                    borderRadius: '4px',
                    background: isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.08)',
                    overflow: 'hidden',
                    border: isLight ? '1px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${levelPct}%`,
                      background: 'linear-gradient(90deg, #0284C7, #10B981)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.6)',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: 'var(--text-secondary, #94A3B8)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Next Lvl: <strong style={{ color: '#10B981' }}>{currentLevelXp}</strong> / {nextLevelXp} XP ({levelPct}%)
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Edit Profile & Settings */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', zIndex: 1 }}>
            <button
              type="button"
              onClick={handleOpenEditModal}
              style={{
                padding: '9px 18px',
                borderRadius: '10px',
                background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.06)',
                border: isLight ? '1.5px solid #CBD5E1' : '1px solid rgba(255, 255, 255, 0.12)',
                color: 'var(--text-primary, #FFF)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '7px',
                boxShadow: isLight ? '0 2px 6px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Edit3 size={14} style={{ color: '#0284C7' }} /> Edit Profile
            </button>

            <Link href="/settings" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                style={{
                  padding: '9px 18px',
                  borderRadius: '10px',
                  background: isLight ? 'rgba(2, 132, 199, 0.1)' : 'rgba(56, 189, 248, 0.15)',
                  border: isLight ? '1.5px solid #0284C7' : '1px solid #38BDF8',
                  color: isLight ? '#0284C7' : '#38BDF8',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  boxShadow: isLight ? '0 2px 8px rgba(2, 132, 199, 0.15)' : 'none',
                  transition: 'all 0.15s ease',
                }}
              >
                <SettingsIcon size={14} /> Settings
              </button>
            </Link>
          </div>

          {/* Quick Performance Metric Tiles with Distinct Colorful Visual Personalities */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '12px',
              width: '100%',
              zIndex: 1,
            }}
          >
            {/* 1. Problems Solved (Emerald) */}
            <div style={hudMetricSt('#10B981', isLight, '#ECFDF5')}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <CheckCircle2 size={18} style={{ color: '#10B981' }} />
              </div>
              <div>
                <strong style={{ fontSize: '17px', color: 'var(--text-primary, #FFF)', display: 'block', lineHeight: 1.1 }}>
                  {solvedCount}
                </strong>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #64748B)', fontWeight: 700 }}>
                  Problems Solved
                </span>
              </div>
            </div>

            {/* 2. Total Experience (Amber/Gold) */}
            <div style={hudMetricSt('#F59E0B', isLight, '#FFFBEB')}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Zap size={18} style={{ color: '#F59E0B' }} />
              </div>
              <div>
                <strong style={{ fontSize: '17px', color: 'var(--text-primary, #FFF)', display: 'block', lineHeight: 1.1 }}>
                  {xp} XP
                </strong>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #64748B)', fontWeight: 700 }}>
                  Total Experience
                </span>
              </div>
            </div>

            {/* 3. Current Streak (Orange/Flame) */}
            <div style={hudMetricSt('#F97316', isLight, '#FFF7ED')}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(249, 115, 22, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Flame size={18} style={{ color: '#F97316' }} />
              </div>
              <div>
                <strong style={{ fontSize: '17px', color: 'var(--text-primary, #FFF)', display: 'block', lineHeight: 1.1 }}>
                  {streak} Days
                </strong>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #64748B)', fontWeight: 700 }}>
                  Current Streak
                </span>
              </div>
            </div>

            {/* 4. Connected Platforms (Cyan/Blue) */}
            <div style={hudMetricSt('#0284C7', isLight, '#F0F9FF')}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(2, 132, 199, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Layers size={18} style={{ color: '#0284C7' }} />
              </div>
              <div>
                <strong style={{ fontSize: '17px', color: 'var(--text-primary, #FFF)', display: 'block', lineHeight: 1.1 }}>
                  3 / 4
                </strong>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #64748B)', fontWeight: 700 }}>
                  Connected Platforms
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Coverage Full-Width Ribbon */}
        <div
          style={{
            width: '100%',
            boxSizing: 'border-box',
            padding: '12px 20px',
            borderRadius: '14px',
            background: isLight ? '#FFFFFF' : 'rgba(255, 255, 255, 0.025)',
            border: isLight ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: isLight ? '0 2px 10px rgba(0, 0, 0, 0.03)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'var(--text-secondary, #94A3B8)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Platform Progress Snapshot:
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            {summary.platformSnapshot.map((p) => (
              <div key={p.platformKey} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                  }}
                />
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary, #FFF)' }}>
                  {p.name}:
                </span>
                <strong style={{ fontSize: '12px', fontWeight: 900, color: p.color }}>
                  {p.solved} / {p.total}
                </strong>
                <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)' }}>({p.percentage}%)</span>
              </div>
            ))}

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.65 }}>
              <Lock size={12} style={{ color: 'var(--text-muted, #94A3B8)' }} />
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted, #94A3B8)' }}>GeeksForGeeks:</span>
              <span style={{ fontSize: '10px', color: 'var(--text-muted, #94A3B8)', fontStyle: 'italic' }}>Locked</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. TODAY'S MISSION COORDINATOR (4 PILLARS: LEARN, PRACTICE, REVISE, MENTOR) ── */}
      <TodaysMissionCoordinator mission={summary.todaysMission} isLight={isLight} />

      {/* ── 3. UNIFIED RECOMMENDED NEXT STEP HERO ──────────────────── */}
      <UnifiedRecommendationCard recommendation={summary.primaryRecommendation} isLight={isLight} />

      {/* ── 4. ADAPTIVE ROADMAP & MISTAKE INTELLIGENCE ──────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '22px',
          width: '100%',
        }}
      >
        <AdaptiveRoadmapWidget adaptiveRoadmap={summary.adaptiveRoadmap} isLight={isLight} />
        <MistakeIntelligenceWidget mistakeIntelligence={summary.mistakeIntelligence} isLight={isLight} />
      </div>

      {/* ── 5. PLATFORM CAMPAIGN RAILWAY TRACKS ────────────────────── */}
      <PlatformTrainJourneys platformTrains={summary.platformTrains} />

      {/* ── 6. ACTIONABLE DASHBOARD MODULES & RECENT ACTIVITY ──────── */}
      <DashboardActionHub summary={summary} />

      {/* ── 7. INTEGRATED EDIT PROFILE MODAL ───────────────────────── */}
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
                background: isLight ? '#FFFFFF' : 'var(--surface)',
                border: isLight
                  ? '1.5px solid rgba(56, 189, 248, 0.35)'
                  : '1.5px solid var(--panel-border, rgba(255, 255, 255, 0.15))',
                borderRadius: '24px',
                padding: '28px 32px',
                boxShadow: isLight
                  ? '0 24px 60px rgba(0, 0, 0, 0.15)'
                  : '0 24px 60px rgba(0, 0, 0, 0.85)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                color: 'var(--text-primary, #FFF)',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(56, 189, 248, 0.15)',
                      border: '1px solid rgba(56, 189, 248, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0284C7',
                    }}
                  >
                    <User size={18} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: 'var(--text-primary)' }}>
                      Edit Developer Profile
                    </h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Manage your profile information and connected handles
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                      border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                      border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: 'var(--text-secondary)',
                      marginBottom: '6px',
                    }}
                  >
                    Connected Handles
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="LeetCode username"
                      value={editLcUser}
                      onChange={(e) => setEditLcUser(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="CodeChef username"
                      value={editCcUser}
                      onChange={(e) => setEditCcUser(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Codeforces username"
                      value={editCfUser}
                      onChange={(e) => setEditCfUser(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                    <input
                      type="text"
                      placeholder="GeeksForGeeks username"
                      value={editGfgUser}
                      onChange={(e) => setEditGfgUser(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        background: isLight ? '#F8FAFC' : 'var(--input-bg)',
                        border: isLight ? '1px solid #CBD5E1' : '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '12px',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                      padding: '8px 20px',
                      borderRadius: '8px',
                      background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                      border: 'none',
                      color: '#FFFFFF',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: isSaving ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      boxShadow: '0 2px 10px var(--accent-glow)',
                    }}
                  >
                    {isSaving ? <Save size={14} className="animate-spin" /> : <Check size={14} />}
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

// Helper styling for HUD metric chips with distinct colorful accents
function hudMetricSt(accentColor: string, isLight: boolean, lightBgTint: string): React.CSSProperties {
  return {
    padding: '12px 16px',
    borderRadius: '14px',
    background: isLight
      ? `linear-gradient(135deg, #FFFFFF 0%, ${lightBgTint} 100%)`
      : 'rgba(255, 255, 255, 0.03)',
    border: isLight
      ? `1.5px solid ${accentColor}40`
      : `1px solid ${accentColor}33`,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: isLight
      ? `0 4px 16px ${accentColor}15, 0 1px 3px rgba(0, 0, 0, 0.03)`
      : `0 4px 16px ${accentColor}10`,
  };
}
