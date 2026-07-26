'use client';

import React, { useState } from 'react';
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
  Filter
} from 'lucide-react';
import { metadataEngine } from '@/src/engines/metadata';
import { memoryEngine } from '@/src/engines/memory';
import { useSettings } from '@/src/context/SettingsContext';
import { useToast } from '@/src/context/ToastContext';

export default function AnalyticsPage() {
  const { settings } = useSettings();
  const { toast } = useToast();
  const { dailyTarget, weeklyTarget, monthlyTarget } = settings.goals;

  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [refreshing, setRefreshing] = useState(false);

  const globalStats = metadataEngine.getGlobalStats();
  const readiness = memoryEngine.getInterviewReadiness();

  const handleRefresh = () => {
    setRefreshing(true);
    toast("Synchronizing multi-platform metrics...", "info");
    setTimeout(() => {
      setRefreshing(false);
      toast("Analytics engine synchronized with all realms!", "success");
    }, 1000);
  };

  const platformCards = [
    { name: "MentorPick", rating: 1850, trend: "+45", solved: 142, contests: 12, success: "88%", rank: "#142", status: "Connected", color: "var(--primary)" },
    { name: "CodeChef", rating: 1920, trend: "+32", solved: 185, contests: 18, success: "84%", rank: "#1,240", status: "Connected", color: "#F59E0B" },
    { name: "LeetCode", rating: 1980, trend: "+68", solved: 412, contests: 24, success: "92%", rank: "#14,200", status: "Connected", color: "#10B981" },
    { name: "Codeforces", rating: 1640, trend: "+20", solved: 210, contests: 15, success: "76%", rank: "#8,450", status: "Connected", color: "#3B82F6" },
  ];

  const patternOrbs = [
    { name: "Arrays", mastery: 94, xp: "2.4k XP", conf: "Peak", status: "Mastered", color: "#10B981" },
    { name: "Strings", mastery: 88, xp: "1.8k XP", conf: "High", status: "Mastered", color: "#10B981" },
    { name: "Hashing", mastery: 90, xp: "2.1k XP", conf: "Peak", status: "Mastered", color: "#10B981" },
    { name: "Sliding Window", mastery: 78, xp: "1.5k XP", conf: "Medium", status: "Focus Needed", color: "var(--primary)" },
    { name: "Binary Search", mastery: 82, xp: "1.6k XP", conf: "High", status: "Solid", color: "#3B82F6" },
    { name: "Trees", mastery: 74, xp: "1.2k XP", conf: "Medium", status: "Reviewing", color: "#F59E0B" },
    { name: "Graphs", mastery: 68, xp: "950 XP", conf: "Developing", status: "Weak Area", color: "#EC4899" },
    { name: "DP", mastery: 58, xp: "800 XP", conf: "Low", status: "Critical Focus", color: "#EF4444" },
    { name: "Greedy", mastery: 76, xp: "1.3k XP", conf: "Medium", status: "Solid", color: "#3B82F6" },
  ];

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
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#F59E0B" }}>15 Days</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Zap size={16} style={{ color: "var(--primary)" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>TOTAL XP</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "var(--primary)" }}>12,450 XP</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Trophy size={16} style={{ color: "#10B981" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>INTERVIEW READINESS</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#10B981" }}>{readiness}%</span>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 14px", borderRadius: "10px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <Activity size={16} style={{ color: "#3B82F6" }} />
                <div>
                  <span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700, display: "block" }}>LEARNING VELOCITY</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#3B82F6" }}>+18.4% / wk</span>
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
              {platformCards.map((p) => (
                <div key={p.name} style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: `1px solid ${p.color}44`, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: p.color }}>{p.name}</span>
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.15)", padding: "2px 4px", borderRadius: "4px" }}>{p.status}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)" }}>{p.rating}</span>
                      <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 700 }}>{p.trend}</span>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", margin: "8px 0", fontSize: "10px", color: "var(--text-secondary)" }}>
                      <div>Solved: <strong style={{ color: "var(--text-primary)", display: "block" }}>{p.solved}</strong></div>
                      <div>Contests: <strong style={{ color: "var(--text-primary)", display: "block" }}>{p.contests}</strong></div>
                      <div>Success: <strong style={{ color: "#10B981", display: "block" }}>{p.success}</strong></div>
                      <div>Rank: <strong style={{ color: "var(--primary)", display: "block" }}>{p.rank}</strong></div>
                    </div>
                  </div>

                  {/* Sparkline Graphic Placeholder */}
                  <div style={{ width: "100%", height: "24px", background: `${p.color}15`, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="100%" height="18" viewBox="0 0 100 20">
                      <path d="M0,15 Q25,5 50,12 T100,2" fill="none" stroke={p.color} strokeWidth="2" />
                    </svg>
                  </div>
                </div>
              ))}
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
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Problems Solved</span><span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)", display: "block" }}>412</span></div>
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Acceptance Rate</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", display: "block" }}>84.2%</span></div>
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Avg Solve Time</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#3B82F6", display: "block" }}>14m</span></div>
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Coding Hours</span><span style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)", display: "block" }}>124h</span></div>
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Velocity</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#F59E0B", display: "block" }}>+18.4%</span></div>
              <div><span style={{ fontSize: "9px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Contest Rank</span><span style={{ fontSize: "16px", fontWeight: 800, color: "#EC4899", display: "block" }}>Top 5%</span></div>
            </div>
          </div>

          {/* SECTION 3 — Pattern Mastery (Circular Mastery Orbs) */}
          <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Brain size={18} style={{ color: "var(--primary)" }} /> Pattern Mastery Orbs
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {patternOrbs.map((orb) => (
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
                    <strong style={{ color: "var(--text-primary)" }}>180 / 200</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}><div style={{ width: "90%", height: "100%", background: "#10B981", borderRadius: "4px" }} /></div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                    <span style={{ color: "#F59E0B", fontWeight: 700 }}>Medium Problems</span>
                    <strong style={{ color: "var(--text-primary)" }}>190 / 250</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}><div style={{ width: "76%", height: "100%", background: "#F59E0B", borderRadius: "4px" }} /></div>
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: "4px" }}>
                    <span style={{ color: "#EF4444", fontWeight: 700 }}>Hard Problems</span>
                    <strong style={{ color: "var(--text-primary)" }}>42 / 100</strong>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px" }}><div style={{ width: "42%", height: "100%", background: "#EF4444", borderRadius: "4px" }} /></div>
                </div>
              </div>
            </div>

            {/* Learning Heatmap */}
            <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)" }}>Journey Heatmap</h3>
                <span style={{ fontSize: "10px", color: "var(--primary)", fontWeight: 700 }}>15 Day Active Streak 🔥</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(16, 1fr)", gap: "4px", padding: "8px", background: "var(--surface)", borderRadius: "8px" }}>
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} style={{ width: "100%", height: "12px", borderRadius: "2px", background: i % 7 === 0 ? "#10B981" : i % 3 === 0 ? "var(--primary)" : "rgba(255,255,255,0.06)" }} />
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
                <span style={{ color: "var(--text-primary)" }}>Prefix Sum & Array Window Expansion</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <strong style={{ color: "#EF4444", display: "block" }}>Primary Weakness</strong>
                <span style={{ color: "var(--text-primary)" }}>Dynamic Programming Subproblem State</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <strong style={{ color: "var(--primary)", display: "block" }}>Predicted Rating</strong>
                <span style={{ color: "var(--text-primary)" }}>2050+ by next month</span>
              </div>
            </div>
          </div>

          {/* SECTION 8 — Achievement Timeline */}
          <div style={{ padding: "20px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "14px" }}>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Award size={18} style={{ color: "#F59E0B" }} /> Achievement Timeline
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "10px", textAlign: "center" }}>
              {[
                { title: "First Problem", day: "Day 1", icon: CheckCircle2 },
                { title: "100 Solved", day: "Day 30", icon: Trophy },
                { title: "500 Solved", day: "Day 90", icon: Award },
                { title: "Contest Win", day: "Day 120", icon: Zap },
                { title: "Pattern Master", day: "Day 150", icon: Brain },
                { title: "365 Streak", day: "Day 365", icon: Flame },
              ].map((m) => {
                const IconC = m.icon;
                return (
                  <div key={m.title} style={{ padding: "10px", borderRadius: "8px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <IconC size={18} style={{ color: "var(--primary)", margin: "0 auto 4px" }} />
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
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Today&apos;s Rec:</span><strong style={{ color: "var(--text-primary)" }}>Sliding Window</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Prediction:</span><strong style={{ color: "#10B981" }}>86% Win Rate</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Revision Due:</span><strong style={{ color: "#F59E0B" }}>1 Items</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Retention:</span><strong style={{ color: "var(--primary)" }}>{settings.revision.memoryStrength}%</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Productivity:</span><strong style={{ color: "#10B981" }}>94 / 100</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>XP Forecast:</span><strong style={{ color: "#F59E0B" }}>+450 XP Today</strong></div>
            </div>
          </div>

          {/* Today's Quest Card */}
          <div style={{ padding: "16px", borderRadius: "var(--radius, 16px)", background: "var(--card)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "8px" }}>
            <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "6px" }}>
              <Gift size={14} style={{ color: "#F59E0B" }} /> Today&apos;s Quest
            </h4>
            <span style={{ fontSize: "11px", color: "var(--text-primary)" }}>Solve 3 Sliding Window problems (2/3)</span>
            <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.08)", borderRadius: "3px" }}><div style={{ width: "66%", height: "100%", background: "var(--primary)", borderRadius: "3px" }} /></div>
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
