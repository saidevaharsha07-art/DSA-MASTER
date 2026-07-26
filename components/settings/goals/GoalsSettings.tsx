"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Award, Flame, Zap, Trophy, Shield, Map } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function GoalsSettings() {
  const { settings } = useSettings();
  const { dailyTarget, weeklyTarget, monthlyTarget } = settings.goals;

  const currentGoals = [
    { title: "Daily Goal", current: 2, total: dailyTarget, percent: `${Math.round((2 / dailyTarget) * 100)}%`, color: "#3B82F6" },
    { title: "Weekly Goal", current: 12, total: weeklyTarget, percent: `${Math.round((12 / weeklyTarget) * 100)}%`, color: "#10B981" },
    { title: "Monthly Goal", current: 38, total: monthlyTarget, percent: `${Math.round((38 / monthlyTarget) * 100)}%`, color: "var(--primary)" },
    { title: "Yearly Goal", current: 630, total: 1000, percent: "63%", color: "#F59E0B" },
  ];

  const milestones = [
    { title: "Novice", status: "Completed", icon: Shield, color: "#10B981" },
    { title: "Apprentice", status: "Completed", icon: Shield, color: "#10B981" },
    { title: "Explorer", status: "Current", icon: Zap, color: "var(--primary)" },
    { title: "Master", status: "Locked", icon: Trophy, color: "var(--text-muted)" },
    { title: "Legend", status: "Locked", icon: Award, color: "var(--text-muted)" },
  ];

  const statistics = [
    { label: "Problems Solved", value: "620", sub: "Total Solved" },
    { label: "Acceptance Rate", value: "71.4%", sub: "Overall" },
    { label: "Current Streak", value: "23", sub: "Days" },
    { label: "Longest Streak", value: "45", sub: "Days" },
    { label: "Hours Studied", value: "188h", sub: "Total Time" },
    { label: "Contest Rating", value: "1560", sub: "Peak Rating" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="👑"
        title="Goals & Progress"
        subtitle="Track your progress and achieve mastery milestones."
      />

      {/* Main Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Left Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Section 1: Current Goals (4 Ring Cards) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            {currentGoals.map((g) => (
              <div
                key={g.title}
                style={{
                  padding: "16px",
                  borderRadius: "var(--radius)",
                  background: "var(--card)",
                  backdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--border)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontWeight: 600 }}>{g.title}</span>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>{g.current} / {g.total}</span>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: g.color }}>{g.percent}</span>
                </div>
                <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ width: g.percent, height: "100%", background: g.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Section 2: Middle 2-Column Grid (Campaign Progress & Milestone Roadmap) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}>
            {/* Campaign Progress Card */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--primary-soft)",
                borderRadius: "var(--radius)",
                padding: "20px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", fontWeight: 700 }}>Campaign Progress</span>
                <h4 style={{ margin: "2px 0 0 0", fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>
                  Level 23 Master Explorer
                </h4>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px" }}>
                  <span style={{ color: "#F59E0B", fontWeight: 700 }}>12,450 / 15,000 XP</span>
                  <span style={{ color: "var(--text-secondary)" }}>Level 24</span>
                </div>
                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: "83%", height: "100%", background: "linear-gradient(90deg, #F59E0B 0%, var(--primary) 100%)" }} />
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "8px", borderTop: "1px solid var(--border)", fontSize: "11px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Kingdoms Conquered: <strong style={{ color: "#10B981" }}>16 / 35</strong></span>
                <button type="button" style={{ padding: "4px 10px", borderRadius: "6px", background: "var(--primary-soft)", border: "1px solid var(--primary-soft)", color: "var(--text-primary)", fontSize: "10px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Map size={12} /> View World Map
                </button>
              </div>
            </div>

            {/* Milestone Roadmap */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "20px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Milestone Roadmap
              </h4>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "10px" }}>
                {milestones.map((m) => {
                  const IconComp = m.icon;
                  return (
                    <div key={m.title} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: m.status === "Current" ? "var(--primary)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: m.color }}>
                        <IconComp size={16} />
                      </div>
                      <span style={{ fontSize: "10px", fontWeight: 600, color: m.status === "Locked" ? "var(--text-muted)" : "var(--text-primary)" }}>{m.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Statistics Overview (6 Metric Cards Grid) */}
          <div
            style={{
              background: "var(--card)",
              backdropFilter: "blur(var(--glass-blur))",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "20px",
              boxShadow: DESIGN_TOKENS.shadows.card,
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Statistics Overview
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {statistics.map((s) => (
                <div key={s.label} style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>{s.label}</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", display: "block", marginTop: "2px" }}>{s.value}</span>
                  <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>{s.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Achievements */}
          <SidebarWidget title="Achievements">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { title: "Problem Slayer", desc: "Solve 100 problems", icon: Award, color: "#F59E0B" },
                { title: "Week Warrior", desc: "7 day streak", icon: Flame, color: "var(--primary)" },
                { title: "Consistency King", desc: "30 day streak", icon: Trophy, color: "#10B981" },
              ].map((a) => {
                const IconComp = a.icon;
                return (
                  <div key={a.title} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                    <IconComp size={16} style={{ color: a.color }} />
                    <div>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600, display: "block" }}>{a.title}</span>
                      <span style={{ color: "var(--text-secondary)", fontSize: "9px" }}>{a.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </SidebarWidget>

          {/* Recent Milestones */}
          <SidebarWidget title="Recent Milestones">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-primary)" }}>Solved 600 Problems</span><span style={{ color: "var(--text-secondary)" }}>2 days ago</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-primary)" }}>30 Day Streak</span><span style={{ color: "var(--text-secondary)" }}>5 days ago</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-primary)" }}>Completed Arrays Module</span><span style={{ color: "var(--text-secondary)" }}>1 week ago</span></div>
            </div>
          </SidebarWidget>

          {/* Artwork Card */}
          <div
            style={{
              position: "relative",
              height: "170px",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: DESIGN_TOKENS.shadows.card,
            }}
          >
            <Image
              src="/assets/settings/war_room.jpg"
              alt="Royal War Room artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(35, 25, 10, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;A kingdom is conquered one pattern at a time.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
