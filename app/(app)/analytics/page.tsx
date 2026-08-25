'use client';

import React, { useState, useMemo } from 'react';
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
  TrendingUp, 
  ShieldAlert, 
  Bot, 
  Layers, 
  Gift, 
  HelpCircle,
  ArrowUpRight,
  Filter,
  Info
} from 'lucide-react';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';
import { AnalyticsViewAdapter } from '@/src/adapters/analytics-view.adapter';
import { PlatformTelemetryService } from '@/src/features/platform/services/platform-telemetry.service';
import { PlatformTelemetryCard, PlatformDailySnapshot } from '@/src/features/platform/types/platform-telemetry.types';
import { useActiveUser } from '@/src/hooks/useActiveUser';

function PlatformPerformanceGraph({ platform }: { platform: PlatformTelemetryCard }) {
  const hexColor = platform.color === 'var(--primary)' ? '#06B6D4' : platform.color;
  const gradientId = `platform-grad-${platform.name.replace(/\s+/g, '-')}`;
  const [hoveredSnapshot, setHoveredSnapshot] = useState<PlatformDailySnapshot | null>(null);

  const snapshots = platform.historicalSnapshots || [];

  if (snapshots.length === 0) {
    return (
      <div style={{ padding: '16px 8px', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px border var(--border)' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>
          Not enough historical data
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
          Sync over multiple days to build your history.
        </span>
      </div>
    );
  }

  // Dynamic Y-axis scale calculation
  const numericRatings = snapshots
    .map((s) => s.rating)
    .filter((r): r is number => r !== null && typeof r === 'number');

  let yMin = numericRatings.length > 0 ? Math.min(...numericRatings) : 1000;
  let yMax = numericRatings.length > 0 ? Math.max(...numericRatings) : 2000;
  if (yMin === yMax) {
    yMin = Math.max(0, yMin - 200);
    yMax = yMax + 200;
  }
  const yTicks = [
    yMax,
    Math.round(yMin + (yMax - yMin) * 0.75),
    Math.round(yMin + (yMax - yMin) * 0.5),
    Math.round(yMin + (yMax - yMin) * 0.25),
    yMin,
  ];

  const width = 200;
  const height = 130;
  const paddingY = 12;
  const usableHeight = height - paddingY * 2;

  const getY = (val: number | null) => {
    if (val === null) return height - paddingY;
    const ratio = Math.max(0, Math.min(1, (val - yMin) / (yMax - yMin)));
    return height - paddingY - ratio * usableHeight;
  };

  const getX = (index: number) => {
    if (snapshots.length === 1) return width / 2;
    return 10 + (index * (width - 20)) / (snapshots.length - 1);
  };

  const points = snapshots.map((s, i) => ({
    x: getX(i),
    y: getY(s.rating),
    snapshot: s,
  }));

  let linePath = '';
  if (points.length === 1) {
    linePath = `M ${points[0].x - 15},${points[0].y} L ${points[0].x + 15},${points[0].y}`;
  } else {
    linePath = points.reduce((acc, pt, i, arr) => {
      if (i === 0) return `M ${pt.x},${pt.y}`;
      const prev = arr[i - 1];
      const cp1x = prev.x + (pt.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (pt.x - prev.x) / 2;
      const cp2y = pt.y;
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${pt.x},${pt.y}`;
    }, '');
  }

  const areaPath = points.length > 1
    ? `${linePath} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`
    : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', position: 'relative' }}>
      {/* Tooltip Overlay */}
      {hoveredSnapshot && (
        <div
          style={{
            position: 'absolute',
            top: '-65px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(18, 19, 26, 0.95)',
            border: `1px solid ${hexColor}`,
            boxShadow: `0 8px 24px rgba(0,0,0,0.6)`,
            borderRadius: '8px',
            padding: '6px 10px',
            fontSize: '10px',
            color: '#FFF',
            zIndex: 20,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontWeight: 700, color: hexColor, marginBottom: '2px' }}>{hoveredSnapshot.date}</div>
          <div>Rating: <strong>{hoveredSnapshot.rating ?? 'N/A'}</strong></div>
          <div>Solved: <strong>{hoveredSnapshot.solvedCount ?? 'N/A'}</strong> | Contests: <strong>{hoveredSnapshot.contestCount ?? 'N/A'}</strong></div>
          <div>Success: <strong>{hoveredSnapshot.successRate ?? 'N/A'}</strong> | Rank: <strong>{hoveredSnapshot.rank ?? 'Unranked'}</strong></div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '4px', alignItems: 'stretch', width: '100%' }}>
        {/* Left Rotated Y-Axis Label */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '12px' }}>
          <span style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', fontSize: '9px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', fontWeight: 600 }}>
            Rating
          </span>
        </div>

        {/* Y-Axis Ticks */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: `${height}px`, fontSize: '9px', color: 'var(--text-secondary)', paddingRight: '4px', textAlign: 'right', width: '28px', flexShrink: 0, fontWeight: 500 }}>
          {yTicks.map((tick, idx) => (
            <span key={idx}>{tick}</span>
          ))}
        </div>

        {/* Graph Canvas Box */}
        <div style={{ flex: 1, height: `${height}px`, position: 'relative', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.08)', padding: '2px' }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={hexColor} stopOpacity="0.35" />
                <stop offset="100%" stopColor={hexColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {yTicks.map((tick, idx) => {
              const y = getY(tick);
              return (
                <line
                  key={idx}
                  x1="0"
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="rgba(255,255,255,0.07)"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              );
            })}

            {/* Border Axes Lines */}
            <line x1="0" y1="0" x2="0" y2={height} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
            <line x1="0" y1={height} x2={width} y2={height} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

            {/* Area Fill */}
            {areaPath && <path d={areaPath} fill={`url(#${gradientId})`} />}

            {/* Trend Line */}
            <path d={linePath} fill="none" stroke={hexColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Nodes with Hover State */}
            {points.map((pt, i) => {
              const isLatest = i === points.length - 1;
              return (
                <circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={isLatest ? '5' : '4'}
                  fill={hexColor}
                  stroke="#12131A"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'transform 0.15s ease' }}
                  onMouseEnter={() => setHoveredSnapshot(pt.snapshot)}
                  onMouseLeave={() => setHoveredSnapshot(null)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* X-Axis Ticks & Bottom Date Label */}
      <div style={{ paddingLeft: '44px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {snapshots.map((s) => (
            <span key={s.date}>{s.date.length > 5 ? s.date.slice(5) : s.date}</span>
          ))}
        </div>
        <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Date
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const { userId } = useActiveUser();

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [refreshing, setRefreshing] = useState(false);

  const analytics = useMemo(() => {
    return AnalyticsViewAdapter.getAnalyticsSummary(userId, timeframe);
  }, [timeframe, refreshing, userId]);

  const platformTelemetryCards = useMemo(() => {
    return PlatformTelemetryService.getTelemetryCards(userId);
  }, [refreshing, userId]);

  const handleRefresh = async () => {
    setRefreshing(true);
    toast("Synchronizing multi-platform telemetry...", "info");
    try {
      await PlatformTelemetryService.syncAllPlatforms(userId);
      toast("Platform telemetry successfully synchronized!", "success");
    } catch (err) {
      toast("Platform sync completed with some warnings.", "warning");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px', paddingBottom: '40px' }}>
      
      {/* HERO SECTION — Command Intelligence Center */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          position: "relative",
          borderRadius: "var(--radius, 20px)",
          overflow: "hidden",
          border: "1px solid var(--primary-soft)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
          background: "linear-gradient(135deg, rgba(10, 14, 26, 0.95) 0%, rgba(20, 15, 45, 0.9) 60%, rgba(124, 77, 255, 0.18) 100%)",
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
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "radial-gradient(circle, var(--primary) 0%, rgba(10,14,26,1) 85%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", boxShadow: "0 0 30px var(--primary-soft)" }}>
              <BarChart3 size={48} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Workspace Grid (75% Content Area / 25% Sidebar) */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 350px", gap: "24px", alignItems: "start" }}>
        
        {/* Left Main Content Stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* SECTION 1 — Platform Intelligence */}
          <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>Platform Intelligence</h3>
                <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Unified statistics from every connected coding realm</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Last Synced: Just now</span>
                <button type="button" onClick={handleRefresh} style={{ padding: "6px 12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: "11px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                  <RefreshCw size={12} className={refreshing ? "spin" : ""} /> Refresh
                </button>
              </div>
            </div>

            {/* 4 Platform Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              {platformTelemetryCards.map((p: any) => (
                <div key={p.name} style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: `1px solid ${p.color === 'var(--primary)' ? 'rgba(6,182,212,0.3)' : p.color + '44'}`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "12px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: p.color === 'var(--primary)' ? '#06B6D4' : p.color }}>{p.name}</span>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.15)", padding: "2px 4px", borderRadius: "4px" }}>{p.status}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>{p.rating}</span>
                      <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>({p.ratingLabel})</span>
                      <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700 }}>{p.trend}</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", margin: "8px 0", fontSize: "10px", color: "var(--text-secondary)" }}>
                      <div>Solved: <strong style={{ color: "var(--text-primary)", display: "block" }}>{p.solved}</strong></div>
                      <div>Contests: <strong style={{ color: "var(--text-primary)", display: "block" }}>{p.contests}</strong></div>
                      <div>Success: <strong style={{ color: "#10B981", display: "block" }}>{p.success}</strong></div>
                      <div>Rank: <strong style={{ color: p.color === 'var(--primary)' ? '#06B6D4' : p.color, display: "block" }}>{p.rank}</strong></div>
                    </div>
                  </div>

                  {/* Progress Over Time Graph */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "10px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)" }}>Progress Over Time</span>
                    <PlatformPerformanceGraph platform={p} />
                  </div>
                </div>
              ))}
            </div>

            {/* Estimated Ratings Info Note */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "11px", color: "var(--text-secondary)" }}>
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
              {analytics.patternOrbs.map((orb) => (
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

          {/* SECTION 4 — Difficulty Distribution & SECTION 5 — Learning Heatmap */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "20px" }}>
            
            {/* Difficulty Distribution */}
            <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Difficulty Distribution</h3>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                    <span style={{ color: "#10B981", fontWeight: 700 }}>Easy Problems</span>
                    <strong style={{ color: "var(--text-primary)" }}>{analytics.difficultyDistribution.easy.solved} / {analytics.difficultyDistribution.easy.total}</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}>
                    <div style={{ width: `${analytics.difficultyDistribution.easy.percentage}%`, height: "100%", background: "#10B981", borderRadius: "4px" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                    <span style={{ color: "#F59E0B", fontWeight: 700 }}>Medium Problems</span>
                    <strong style={{ color: "var(--text-primary)" }}>{analytics.difficultyDistribution.medium.solved} / {analytics.difficultyDistribution.medium.total}</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}>
                    <div style={{ width: `${analytics.difficultyDistribution.medium.percentage}%`, height: "100%", background: "#F59E0B", borderRadius: "4px" }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                    <span style={{ color: "#EF4444", fontWeight: 700 }}>Hard Problems</span>
                    <strong style={{ color: "var(--text-primary)" }}>{analytics.difficultyDistribution.hard.solved} / {analytics.difficultyDistribution.hard.total}</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}>
                    <div style={{ width: `${analytics.difficultyDistribution.hard.percentage}%`, height: "100%", background: "#EF4444", borderRadius: "4px" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Heatmap */}
            <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Journey Heatmap</h3>
                <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 700 }}>{analytics.currentStreak} Day Active Streak 🔥</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: "4px", padding: "8px", background: "var(--surface)", borderRadius: "8px" }}>
                {analytics.heatmapCells.map((cell) => (
                  <div 
                    key={cell.dayIndex} 
                    title={`${cell.dateStr}: ${cell.level} solves`}
                    style={{ 
                      width: "100%", 
                      height: "12px", 
                      borderRadius: "2px", 
                      background: cell.level === 3 ? "#10B981" : cell.level === 2 ? "var(--primary)" : cell.level === 1 ? "rgba(124, 77, 255, 0.4)" : "rgba(255,255,255,0.06)" 
                    }} 
                  />
                ))}
              </div>
            </div>

          </div>

          {/* SECTION 6 — AI Performance Insights */}
          <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--primary-soft)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} style={{ color: "var(--primary)" }} /> AI Performance Insights & Predictions
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", fontSize: "11px" }}>
              <div style={{ padding: "12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#10B981", display: "block" }}>Top Strengths</strong>
                <span style={{ color: "var(--text-primary)" }}>{analytics.insights.topStrength}</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#EF4444", display: "block" }}>Primary Weakness</strong>
                <span style={{ color: "var(--text-primary)" }}>{analytics.insights.primaryWeakness}</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <strong style={{ color: "var(--primary)", display: "block" }}>Predicted Rating</strong>
                <span style={{ color: "var(--text-primary)" }}>{analytics.insights.predictedRating}</span>
              </div>
            </div>
          </div>

          {/* SECTION 8 — Achievement Timeline */}
          <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} style={{ color: "#F59E0B" }} /> Achievement Timeline
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", textAlign: "center" }}>
              {analytics.achievements.map((m) => {
                return (
                  <div key={m.title} style={{ padding: "10px", borderRadius: "8px", background: "var(--surface)", border: `1px solid ${m.unlocked ? "var(--primary)" : "var(--border)"}`, opacity: m.unlocked ? 1 : 0.4 }}>
                    <CheckCircle2 size={18} style={{ color: m.unlocked ? "#10B981" : "var(--text-secondary)", margin: "0 auto 4px" }} />
                    <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>{m.title}</span>
                    <span style={{ fontSize: "9px", color: "var(--text-secondary)" }}>{m.day}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Sidebar — AI Mentor Intelligence (350px Fixed Width) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          
          {/* AI Mentor Intelligence Card */}
          <div style={{ padding: "18px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--primary-soft)", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>AI Intelligence</h4>
                <span style={{ fontSize: "9px", color: "#10B981", fontWeight: 600 }}>Active Telemetry</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Today&apos;s Rec:</span><strong style={{ color: "var(--text-primary)" }}>{analytics.sidebar.todaysRec}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Prediction:</span><strong style={{ color: "#10B981" }}>{analytics.sidebar.winRatePrediction}</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Revision Due:</span><strong style={{ color: "#F59E0B" }}>{analytics.sidebar.revisionDueCount} Items</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Retention:</span><strong style={{ color: "var(--primary)" }}>{analytics.sidebar.retentionRate}%</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Productivity:</span><strong style={{ color: "#10B981" }}>{analytics.sidebar.productivityScore} / 100</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>XP Forecast:</span><strong style={{ color: "#F59E0B" }}>{analytics.sidebar.xpForecast}</strong></div>
            </div>
          </div>

          {/* Today's Quest Card */}
          <div style={{ padding: "16px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Gift size={14} style={{ color: "#F59E0B" }} /> Today&apos;s Quest
            </h4>
            <span style={{ fontSize: "11px", color: "var(--text-primary)" }}>{analytics.sidebar.questProgress.title} ({analytics.sidebar.questProgress.current}/{analytics.sidebar.questProgress.target})</span>
            <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}>
              <div style={{ width: `${analytics.sidebar.questProgress.percentage}%`, height: "100%", background: "var(--primary)", borderRadius: "3px" }} />
            </div>
          </div>

          {/* Upcoming Contest */}
          <div style={{ padding: "16px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} style={{ color: "#3B82F6" }} /> Upcoming Contest
            </h4>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-primary)" }}>LeetCode Weekly Contest 392</span>
            <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>In 2 days, 14 hours • Expected +45 Rating</span>
          </div>

        </div>

      </div>

    </div>
  );
}
