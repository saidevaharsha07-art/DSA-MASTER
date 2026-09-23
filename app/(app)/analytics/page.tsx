'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  Activity, 
  Brain, 
  Clock, 
  Zap, 
  Flame, 
  Trophy, 
  RefreshCw, 
  Globe, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Calendar, 
  ChevronRight, 
  ChevronLeft,
  TrendingUp, 
  TrendingDown,
  ShieldAlert, 
  Bot, 
  Gift, 
  HelpCircle,
  ArrowUpRight,
  Filter,
  Info,
  ExternalLink,
  LayoutGrid
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { AnalyticsViewAdapter } from '@/src/adapters/analytics-view.adapter';
import { PlatformTelemetryService } from '@/src/features/platform/services/platform-telemetry.service';
import { PlatformTelemetryCard } from '@/src/features/platform/types/platform-telemetry.types';
import { PatternOrbMetric } from '@/src/features/analytics/services/analytics-adapter.service';
import { useActiveUser } from '@/src/hooks/useActiveUser';
import { JourneyCalendarHeatmap } from '@/components/analytics/JourneyCalendarHeatmap';
import { EventBus } from '@/src/core/events/event-bus';
import { CurriculumRepository } from '@/src/curriculum/repository';
import { GuestPreviewBanner } from '@/src/lib/auth/components/GuestPreviewBanner';
import { RecommendationEngineService } from '@/src/intelligence/recommendations/services/recommendation-engine.service';

function PlatformIcon({ platformKey, color }: { platformKey: string; color: string }) {
  if (platformKey === 'leetcode') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </svg>
    );
  }
  if (platformKey === 'codechef') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 10.58 0A4 4 0 0 1 18 13.87V21H6z" />
        <line x1="6" y1="17" x2="18" y2="17" />
      </svg>
    );
  }
  if (platformKey === 'codeforces') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="3" width="4" height="18" rx="1" />
        <rect x="10" y="8" width="4" height="13" rx="1" />
        <rect x="2" y="13" width="4" height="8" rx="1" />
      </svg>
    );
  }
  // geeksforgeeks
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function AnalyticsPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const { userId, isAuthenticated } = useActiveUser();
  const isLight = settings.appearance.theme === 'light';

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [refreshing, setRefreshing] = useState(false);
  const [eventSeq, setEventSeq] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const unsub1 = EventBus.subscribe('ProblemSolved', () => setEventSeq((c) => c + 1));
    const unsub2 = EventBus.subscribe('PlatformSynced', () => setEventSeq((c) => c + 1));
    const unsub3 = EventBus.subscribe('ProfileUpdated', () => setEventSeq((c) => c + 1));
    return () => {
      unsub1();
      unsub2();
      unsub3();
    };
  }, []);

  const analytics = useMemo(() => {
    return AnalyticsViewAdapter.getAnalyticsSummary(userId, timeframe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, timeframe, eventSeq]);

  const platformTelemetryCards = useMemo(() => {
    return PlatformTelemetryService.getTelemetryCards(userId, timeframe);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, timeframe, eventSeq]);

  const handles = useMemo(() => {
    return PlatformTelemetryService.getUserHandles(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, eventSeq]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await PlatformTelemetryService.syncAllPlatforms(userId);
      setEventSeq((c) => c + 1);
      toast('Platform telemetry successfully refreshed!', 'success');
    } catch {
      toast('Failed to refresh telemetry', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Total problems across connected platforms (excluding unreleased platforms)
  const totalProblemsCount = useMemo(() => {
    const platformSum = platformTelemetryCards
      .filter((p) => p.platformKey !== 'geeksforgeeks')
      .reduce((sum, p) => {
        const cnt = typeof p.solved === 'number' ? p.solved : 0;
        return sum + cnt;
      }, 0);
    return Math.max(platformSum, analytics.solvedCount);
  }, [platformTelemetryCards, analytics.solvedCount]);

  const connectedPlatformsCount = useMemo(() => {
    return platformTelemetryCards.filter((p) => p.platformKey !== 'geeksforgeeks' && p.status === 'Connected').length;
  }, [platformTelemetryCards]);

  const latestSyncTimeText = useMemo(() => {
    const connectedCard = platformTelemetryCards.find((p) => p.platformKey !== 'geeksforgeeks' && p.lastSyncedText && p.lastSyncedText !== 'Sync unavailable');
    return connectedCard?.lastSyncedText || 'Just now';
  }, [platformTelemetryCards]);

  // Derived Bottom Summary Strip items
  const mostActivePlatform = useMemo(() => {
    const activeCards = platformTelemetryCards.filter((p) => p.platformKey !== 'geeksforgeeks');
    let maxSolved = -1;
    let best = activeCards[0];
    for (const card of activeCards) {
      const num = typeof card.solved === 'number' ? card.solved : 0;
      if (num > maxSolved) {
        maxSolved = num;
        best = card;
      }
    }
    return {
      name: best ? best.name : 'LeetCode',
      solved: maxSolved > 0 ? maxSolved : (analytics.solvedCount || '0'),
    };
  }, [platformTelemetryCards, analytics.solvedCount]);

  const bestProgressPlatform = useMemo(() => {
    const activeCards = platformTelemetryCards.filter((p) => p.platformKey !== 'geeksforgeeks');
    const cardWithTrend = activeCards.find((c) => c.trend && c.trend !== '0' && c.trend !== 'N/A');
    if (cardWithTrend) {
      return {
        name: cardWithTrend.name,
        subtext: `↑ ${cardWithTrend.trend} vs 30d`,
      };
    }
    const topCard = activeCards[0];
    return {
      name: topCard ? topCard.name : 'LeetCode',
      subtext: 'Active practice',
    };
  }, [platformTelemetryCards]);

  const highestSuccessPlatform = useMemo(() => {
    const activeCards = platformTelemetryCards.filter((p) => p.platformKey !== 'geeksforgeeks');
    let maxRate = -1;
    let best = activeCards[0];
    for (const card of activeCards) {
      if (card.success && card.success.includes('%')) {
        const val = parseInt(card.success.replace('%', ''), 10);
        if (!isNaN(val) && val > maxRate) {
          maxRate = val;
          best = card;
        }
      }
    }
    return {
      name: best ? best.name : 'LeetCode',
      rate: best?.success && best.success !== 'N/A' ? best.success : (analytics.acceptanceRate || 'N/A'),
    };
  }, [platformTelemetryCards, analytics.acceptanceRate]);

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      {!isAuthenticated && (
        <GuestPreviewBanner
          featureName="Intelligent Analytics"
          description="You are exploring the live DSA Master Analytics dashboard. Create a free account or log in to record your solves, compute personal accuracy, and sync platform activity."
          redirectPath="/analytics"
        />
      )}
      
      {/* HERO SECTION — Command Intelligence Center */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 20px)",
          overflow: "hidden",
          border: isLight
            ? "1.5px solid rgba(2, 132, 199, 0.35)"
            : "1px solid var(--primary-soft)",
          boxShadow: isLight
            ? "0 10px 30px rgba(2, 132, 199, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)"
            : "0 20px 60px rgba(0, 0, 0, 0.4)",
          background: isLight
            ? "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)"
            : "linear-gradient(135deg, rgba(10, 14, 26, 0.95) 0%, rgba(20, 15, 45, 0.9) 60%, rgba(124, 77, 255, 0.18) 100%)",
          padding: "24px 32px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "28px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", background: "var(--primary-soft)", padding: "2px 8px", borderRadius: "99px" }}>
                Command Intelligence Center
              </span>
              <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700 }}>● Real-Time Telemetry Active</span>
            </div>
            
            <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Analytics Engine
            </h1>
            <p style={{ margin: "6px 0 16px 0", fontSize: "13px", color: "var(--text-secondary)", fontStyle: "italic" }}>
              &quot;Every solved problem tells a story. Every mistake reveals a path to mastery.&quot;
            </p>

            {/* 4 Live Hero Metrics */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Flame size={16} style={{ color: "#F59E0B" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>CURRENT STREAK</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#F59E0B" }}>{analytics.currentStreak} Days</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Zap size={16} style={{ color: "var(--primary)" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>TOTAL XP</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--primary)" }}>{analytics.totalXp.toLocaleString()} XP</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Trophy size={16} style={{ color: "#10B981" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>INTERVIEW READINESS</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#10B981" }}>{analytics.interviewReadiness}%</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Activity size={16} style={{ color: "#3B82F6" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>LEARNING VELOCITY</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#3B82F6" }}>{analytics.learningVelocityText}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Crystal Hologram Representation */}
          <div style={{ width: "100px", height: "100px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px dashed var(--primary)", opacity: 0.6 }}
            />
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: isLight ? "radial-gradient(circle, #0284C7 0%, #0369A1 85%)" : "radial-gradient(circle, var(--primary) 0%, rgba(10,14,26,1) 85%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", boxShadow: "0 0 30px var(--primary-soft)" }}>
              <BarChart3 size={48} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Workspace Stack (Full Width) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
        {/* SECTION 1 — Platform Intelligence */}
        <div style={{ padding: "26px", borderRadius: "20px", background: isLight ? "#FFFFFF" : "rgba(14, 10, 32, 0.88)", border: isLight ? "1px solid #E2E8F0" : "1px solid var(--primary-border, rgba(255, 255, 255, 0.08))", display: "flex", flexDirection: "column", gap: "22px", boxShadow: isLight ? "0 8px 24px rgba(0,0,0,0.04)" : "0 16px 48px rgba(0,0,0,0.5)", backdropFilter: "blur(20px)" }}>
          {/* Header Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>Platform Intelligence</h3>
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", padding: "2px 8px", borderRadius: "99px" }}>
                  ● Unified Telemetry Active
                </span>
              </div>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px", display: "block" }}>Normalized statistics and real-time activity across connected platforms</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--text-secondary)", background: isLight ? "#F1F5F9" : "rgba(0,0,0,0.4)", padding: "6px 12px", borderRadius: "8px", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255,255,255,0.06)" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px #10B981" }} />
                <span>Last Synced: <strong style={{ color: "var(--text-primary)" }}>{latestSyncTimeText}</strong></span>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                style={{
                  padding: "7px 16px",
                  borderRadius: "10px",
                  background: isLight ? "rgba(2, 132, 199, 0.08)" : "var(--primary-bg, rgba(255, 255, 255, 0.05))",
                  border: isLight ? "1px solid rgba(2, 132, 199, 0.3)" : "1px solid var(--primary-border, rgba(255, 255, 255, 0.1))",
                  color: isLight ? "#0284C7" : "var(--text-primary, #FFF)",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.18s ease",
                }}
              >
                <RefreshCw size={13} className={refreshing ? "spin" : ""} /> Refresh Telemetry
              </button>
            </div>
          </div>

          {/* Main 5-Column Grid Layout: [Summary Sidebar] + [4 Platform Cards] */}
          <div style={{ display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)", gap: "16px", alignItems: "stretch" }}>
            {/* Left Summary Sidebar */}
            <div
              style={{
                padding: "20px 16px",
                borderRadius: "16px",
                background: isLight ? "linear-gradient(135deg, #F8FAFC 0%, #EEF2F6 100%)" : "linear-gradient(135deg, rgba(20, 16, 44, 0.9) 0%, rgba(12, 9, 26, 0.95) 100%)",
                border: isLight ? "1px solid #E2E8F0" : "1px solid var(--primary-border, rgba(255, 255, 255, 0.08))",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "16px",
              }}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "12px", background: "var(--primary-bg, rgba(16, 185, 129, 0.15))", border: "1px solid var(--primary-border, rgba(16, 185, 129, 0.3))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <LayoutGrid size={20} style={{ color: "var(--primary)" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Total Solved</span>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "var(--text-primary)", marginTop: "2px", lineHeight: 1 }}>{analytics.solvedCount}</div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontWeight: 600, marginTop: "4px", display: "block" }}>
                    out of {CurriculumRepository.getTotalCanonicalProblems()} catalog
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Platforms</span>
                  <div style={{ fontSize: "22px", fontWeight: 900, color: "var(--text-primary)", marginTop: "2px", lineHeight: 1 }}>{connectedPlatformsCount}</div>
                  <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700, marginTop: "4px", display: "block" }}>Connected</span>
                </div>

                <div>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>Last Synced</span>
                  <div style={{ fontSize: "12px", fontWeight: 700, color: "#10B981", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span>{latestSyncTimeText}</span>
                    <CheckCircle2 size={12} style={{ color: "#10B981" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Platform Cards */}
            {platformTelemetryCards.map((p: any) => {
              const getProfileUrl = (platformKey: string): string => {
                const handle = handles[platformKey] || '';
                if (!handle) return '#';
                if (platformKey === 'leetcode') return `https://leetcode.com/${handle}`;
                if (platformKey === 'codeforces') return `https://codeforces.com/profile/${handle}`;
                if (platformKey === 'codechef') return `https://www.codechef.com/users/${handle}`;
                if (platformKey === 'geeksforgeeks') return `https://auth.geeksforgeeks.org/user/${handle}`;
                return '#';
              };

              const profileUrl = getProfileUrl(p.platformKey);
              const isTrendPositive = typeof p.trend === 'string' && p.trend.startsWith('+');
              const isTrendNegative = typeof p.trend === 'string' && p.trend.startsWith('-');

              const isLocked = p.platformKey === 'geeksforgeeks';
              const isConnected = p.status === 'Connected';

              if (isLocked) {
                return (
                  <div
                    key={p.name}
                    style={{
                      padding: "20px",
                      borderRadius: "16px",
                      background: isLight ? "#F8FAFC" : "rgba(16, 12, 32, 0.5)",
                      border: isLight ? "1px dashed #CBD5E1" : "1px dashed rgba(245, 158, 11, 0.25)",
                      boxShadow: isLight ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "0 8px 24px rgba(0, 0, 0, 0.25)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "16px",
                      position: "relative",
                      overflow: "hidden",
                      opacity: 0.88,
                    }}
                  >
                    {/* Header */}
                    <div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ padding: "6px", borderRadius: "8px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PlatformIcon platformKey={p.platformKey} color="#F59E0B" />
                          </div>
                          <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--text-secondary)" }}>{p.name}</span>
                        </div>

                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: 800,
                            color: "#F59E0B",
                            background: "rgba(245, 158, 11, 0.12)",
                            padding: "3px 8px",
                            borderRadius: "6px",
                            border: "1px solid rgba(245, 158, 11, 0.3)",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <span>🔒 Coming Soon</span>
                        </span>
                      </div>

                      {/* Main Metric */}
                      <div style={{ marginTop: "16px" }}>
                        <div style={{ fontSize: "26px", fontWeight: 900, color: "var(--text-muted)", lineHeight: 1 }}>Coming Soon</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", fontSize: "11px" }}>
                          <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>Integration planned</span>
                        </div>
                      </div>
                    </div>

                    {/* Secondary Information Grid */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.02)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: 600 }}>Problems Solved</span>
                        <strong style={{ fontSize: "15px", color: "var(--text-muted)" }}>--</strong>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                        <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.02)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.04)" }}>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Contests</span>
                          <strong style={{ fontSize: "14px", color: "var(--text-muted)", marginTop: "2px", display: "block" }}>--</strong>
                        </div>

                        <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#FFFFFF" : "rgba(255, 255, 255, 0.02)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.04)" }}>
                          <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Last Seen</span>
                          <strong style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px", display: "block" }}>Unreleased</strong>
                        </div>
                      </div>

                      <div style={{ padding: "8px 12px", borderRadius: "8px", background: "rgba(245, 158, 11, 0.08)", border: "1px solid rgba(245, 158, 11, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                        <span style={{ fontSize: "11px", color: "#D97706", fontWeight: 700 }}>GeeksForGeeks integration is coming soon.</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={p.name}
                  style={{
                    padding: "20px",
                    borderRadius: "16px",
                    background: isLight ? "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)" : "var(--card)",
                    border: isLight ? "1.5px solid #E2E8F0" : `1px solid ${p.color}44`,
                    boxShadow: isLight ? "0 4px 16px rgba(0, 0, 0, 0.04)" : "0 8px 28px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "16px",
                    transition: "all 0.2s ease",
                  }}
                >
                  {/* Header */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ padding: "6px", borderRadius: "8px", background: `${p.color}15`, border: `1px solid ${p.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <PlatformIcon platformKey={p.platformKey} color={p.color} />
                        </div>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--text-primary)" }}>{p.name}</span>
                        {profileUrl !== '#' && isConnected && (
                          <a href={profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-muted)", display: "flex", alignItems: "center" }} title="View external profile">
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: isConnected ? p.color : 'var(--text-muted)',
                          background: isConnected ? `${p.color}20` : isLight ? '#F1F5F9' : 'rgba(255, 255, 255, 0.05)',
                          padding: "3px 8px",
                          borderRadius: "6px",
                          border: `1px solid ${isConnected ? p.color + '44' : isLight ? '#E2E8F0' : 'rgba(255, 255, 255, 0.1)'}`,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        {isConnected ? '● Connected' : 'Not Connected'}
                      </span>
                    </div>

                    {/* Main Metric */}
                    <div style={{ marginTop: "16px" }}>
                      <div style={{ fontSize: "30px", fontWeight: 900, color: isConnected ? "var(--text-primary)" : "var(--text-muted)", lineHeight: 1 }}>
                        {p.rating}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px", fontSize: "11px" }}>
                        {isTrendNegative ? (
                          <span style={{ color: "#EF4444", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>
                            <TrendingDown size={12} /> {p.trend}
                          </span>
                        ) : isTrendPositive ? (
                          <span style={{ color: "#10B981", fontWeight: 700, display: "flex", alignItems: "center", gap: "2px" }}>
                            <TrendingUp size={12} /> {p.trend}
                          </span>
                        ) : null}
                        <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>
                          {isConnected
                            ? p.isEstimated
                              ? 'Est. Rating'
                              : p.trend && p.trend !== '0' && p.trend !== 'N/A'
                              ? 'vs last 30 days'
                              : p.ratingLabel || 'Platform Rating'
                            : 'Connect in Settings'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Secondary Information Grid */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.03)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: 600 }}>Problems Solved</span>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
                        <strong style={{ fontSize: "16px", color: isConnected ? "var(--text-primary)" : "var(--text-muted)" }}>
                          {p.practiceSolvedCount ?? p.solved}
                        </strong>
                        {(p.practiceProblemTotal || p.totalProblems) ? (
                          <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 600 }}>
                            / {p.practiceProblemTotal || p.totalProblems}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.03)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)" }}>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Contests</span>
                        <strong style={{ fontSize: "14px", color: isConnected ? "var(--text-primary)" : "var(--text-muted)", marginTop: "2px", display: "block" }}>{p.contests}</strong>
                      </div>

                      <div style={{ padding: "10px 12px", borderRadius: "10px", background: isLight ? "#F1F5F9" : "rgba(255, 255, 255, 0.03)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)" }}>
                        <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Last Seen</span>
                        <strong style={{ fontSize: "12px", color: p.lastSyncedText === 'Just now' ? '#10B981' : isConnected ? "var(--text-primary)" : "var(--text-muted)", marginTop: "2px", display: "block" }}>
                          {p.lastSyncedText === 'Just now' ? 'Just now' : p.lastSyncedText || '--'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginTop: "4px" }}>
            <div style={{ padding: "16px 18px", borderRadius: "14px", background: isLight ? "#F8FAFC" : "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Trophy size={18} style={{ color: "#10B981" }} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Most Active Platform</span>
                <strong style={{ fontSize: "14px", color: "#10B981", display: "block" }}>{mostActivePlatform.name}</strong>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{mostActivePlatform.solved} problems solved</span>
              </div>
            </div>

            <div style={{ padding: "16px 18px", borderRadius: "14px", background: isLight ? "#F8FAFC" : "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(249, 115, 22, 0.15)", border: "1px solid rgba(249, 115, 22, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Target size={18} style={{ color: "#F97316" }} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Best Progress</span>
                <strong style={{ fontSize: "14px", color: "#F97316", display: "block" }}>{bestProgressPlatform.name}</strong>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{bestProgressPlatform.subtext}</span>
              </div>
            </div>

            <div style={{ padding: "16px 18px", borderRadius: "14px", background: isLight ? "#F8FAFC" : "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "var(--accent-soft)", border: "1px solid var(--accent-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Award size={18} style={{ color: "var(--accent-primary)" }} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Highest Success Rate</span>
                <strong style={{ fontSize: "14px", color: "var(--accent-primary)", display: "block" }}>{highestSuccessPlatform.name}</strong>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{highestSuccessPlatform.rate} success rate</span>
              </div>
            </div>

            <div style={{ padding: "16px 18px", borderRadius: "14px", background: isLight ? "#F8FAFC" : "var(--surface)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Activity size={18} style={{ color: "#3B82F6" }} />
              </div>
              <div>
                <span style={{ fontSize: "11px", color: "var(--text-muted)", display: "block", fontWeight: 600 }}>Connected Platforms</span>
                <strong style={{ fontSize: "14px", color: "#3B82F6", display: "block" }}>{connectedPlatformsCount} Active</strong>
                <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Real-time telemetry</span>
              </div>
            </div>
          </div>

          {/* Info Note Footer */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "8px", background: isLight ? "#F8FAFC" : "rgba(255, 255, 255, 0.02)", border: isLight ? "1px solid #E2E8F0" : "1px solid rgba(255, 255, 255, 0.06)", fontSize: "11px", color: "var(--text-secondary)" }}>
            <Info size={14} style={{ color: "#3B82F6", flexShrink: 0 }} />
            <span>Ratings are estimated and may differ from official platform calculations.</span>
          </div>
        </div>

        {/* SECTION 2 — Practice Analytics */}
        <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={18} style={{ color: "var(--primary)" }} /> Practice Analytics & Velocity
            </h3>

            {/* Timeframe Toggle Buttons */}
            <div style={{ display: "flex", background: "var(--surface)", padding: "3px", borderRadius: "8px", border: "1px solid var(--border)" }}>
              {(["7d", "30d", "90d", "1y"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeframe(t)}
                  style={{
                    background: timeframe === t ? "var(--primary)" : "transparent",
                    border: 0,
                    color: timeframe === t ? "#FFF" : "var(--text-secondary)",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: 600,
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Overview Strip */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", padding: "12px", background: "var(--surface)", borderRadius: "12px" }}>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Problems Solved</span><span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)", display: "block" }}>{analytics.solvedCount}</span></div>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Acceptance Rate</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", display: "block" }}>{analytics.acceptanceRate}</span></div>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Avg Solve Time</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#3B82F6", display: "block" }}>{analytics.avgSolveTime}</span></div>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Coding Hours</span><span style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)", display: "block" }}>{analytics.codingHours}</span></div>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Velocity</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#F59E0B", display: "block" }}>{analytics.velocityPercentText}</span></div>
            <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Contest Rank</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#EC4899", display: "block" }}>{analytics.contestRankText}</span></div>
          </div>
        </div>

        {/* SECTION 3 — Pattern Mastery (Circular Mastery Orbs) */}
        <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Brain size={18} style={{ color: "var(--primary)" }} /> Pattern Mastery Orbs
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {analytics.patternOrbs.map((orb: PatternOrbMetric) => (
                <div key={orb.name} style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: `1px solid ${orb.color}33`, display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{ position: "relative", width: "54px", height: "54px", flexShrink: 0 }}>
                    <svg width="54" height="54" viewBox="0 0 54 54">
                      <circle cx="27" cy="27" r="21" stroke="var(--border)" strokeWidth="4" fill="none" />
                      <circle cx="27" cy="27" r="21" stroke={orb.color} strokeWidth="4" fill="none" strokeDasharray="132" strokeDashoffset={132 - (132 * orb.mastery) / 100} strokeLinecap="round" transform="rotate(-90 27 27)" />
                    </svg>
                    <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 800, color: "var(--text-primary)" }}>{orb.mastery}%</span>
                  </div>

                  <div>
                    <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>{orb.name}</h4>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block", marginTop: "2px" }}>{orb.xp} • Conf: {orb.conf}</span>
                    <span style={{ fontSize: "9px", fontWeight: 700, color: orb.color, background: `${orb.color}22`, padding: "2px 6px", borderRadius: "4px", marginTop: "4px", display: "inline-block" }}>{orb.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4 — Journey Heatmap */}
          <JourneyCalendarHeatmap />

          {/* SECTION 5 — Recommendation Intelligence Performance */}
          {(() => {
            const recAnalytics = RecommendationEngineService.getAnalytics(userId);
            return (
              <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Sparkles size={18} style={{ color: "var(--primary)" }} /> Recommendation Engine Telemetry
                  </h3>
                  <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", background: "rgba(99, 102, 241, 0.1)", color: "#818CF8", border: "1px solid rgba(99, 102, 241, 0.2)" }}>
                    {recAnalytics.completionRatePct}% Goal Adherence
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Total Generated</span>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", display: "block", marginTop: "2px" }}>{recAnalytics.totalGenerated}</span>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Actions Started</span>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "#3B82F6", display: "block", marginTop: "2px" }}>{recAnalytics.totalStarted}</span>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Completed</span>
                    <span style={{ fontSize: "18px", fontWeight: 800, color: "#10B981", display: "block", marginTop: "2px" }}>{recAnalytics.totalCompleted}</span>
                  </div>
                  <div style={{ padding: "12px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Top Action Mode</span>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#EC4899", display: "block", marginTop: "4px" }}>{recAnalytics.topActionType}</span>
                  </div>
                </div>
              </div>
            );
          })()}

      </div>

    </div>
  );
}
