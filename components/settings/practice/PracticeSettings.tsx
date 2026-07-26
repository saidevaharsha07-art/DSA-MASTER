"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Filter, ChevronDown } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function PracticeSettings() {
  const { settings, updateSetting } = useSettings();
  const { preferredPlatform, preferredDifficulty, dailyGoal } = settings.practice;

  const problems = [
    { name: "Two Sum", difficulty: "Easy", acceptance: "53.4%", estTime: "10m", xp: "15 XP", platform: "LeetCode" },
    { name: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "40.7%", estTime: "20m", xp: "25 XP", platform: "LeetCode" },
    { name: "LRU Cache", difficulty: "Medium", acceptance: "35.2%", estTime: "30m", xp: "30 XP", platform: "LeetCode" },
    { name: "Kth Largest Element in an Array", difficulty: "Medium", acceptance: "41.9%", estTime: "20m", xp: "25 XP", platform: "LeetCode" },
    { name: "Binary Tree Level Order Traversal", difficulty: "Easy", acceptance: "65.1%", estTime: "15m", xp: "15 XP", platform: "LeetCode" },
  ];

  const patterns = [
    { name: "Arrays", percent: "72%", xp: "1,250 XP", color: "#3B82F6" },
    { name: "Strings", percent: "72%", xp: "980 XP", color: "#F59E0B" },
    { name: "Graphs", percent: "58%", xp: "850 XP", color: "#EC4899" },
    { name: "Trees", percent: "70%", xp: "1,180 XP", color: "#10B981" },
    { name: "DP", percent: "70%", xp: "1,100 XP", color: "var(--primary)" },
    { name: "Greedy", percent: "65%", xp: "1,320 XP", color: "var(--primary-hover)" },
  ];

  const recentSolves = [
    { name: "Two Sum", status: "Accepted", xp: "+15 XP", color: "#10B981" },
    { name: "LRU Cache", status: "Wrong Answer", xp: "0 XP", color: "#EF4444" },
    { name: "Longest Substring", status: "Accepted", xp: "+25 XP", color: "#10B981" },
    { name: "Max Subarray Sum", status: "Time Limit", xp: "0 XP", color: "#F59E0B" },
    { name: "Valid Parentheses", status: "Accepted", xp: "+15 XP", color: "#10B981" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="⚔️"
        title="Practice Arena"
        subtitle="Train your skills and conquer algorithmic challenges."
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
          {/* Section 1: Problem Filters Bar */}
          <div
            style={{
              padding: "16px 20px",
              borderRadius: "var(--radius)",
              background: "var(--card)",
              backdropFilter: "blur(var(--glass-blur))",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "6px" }}>
              <Filter size={14} /> Problem Filters
            </span>

            {/* Difficulty Selector */}
            <div style={{ position: "relative" }}>
              <select
                value={preferredDifficulty}
                onChange={(e) => updateSetting("practice", "preferredDifficulty", e.target.value)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                  fontSize: "11px",
                  padding: "6px 24px 6px 10px",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="all">Difficulty: All</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <ChevronDown size={12} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: "none" }} />
            </div>

            {/* Platform Selector */}
            <div style={{ position: "relative" }}>
              <select
                value={preferredPlatform}
                onChange={(e) => updateSetting("practice", "preferredPlatform", e.target.value)}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-primary)",
                  fontSize: "11px",
                  padding: "6px 24px 6px 10px",
                  appearance: "none",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <option value="leetcode">Platform: LeetCode</option>
                <option value="codeforces">Platform: Codeforces</option>
                <option value="gfg">Platform: GeeksforGeeks</option>
              </select>
              <ChevronDown size={12} style={{ position: "absolute", right: "8px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: "none" }} />
            </div>
          </div>

          {/* Section 2: Top 2-Column Grid (Daily Mission / Battle Progress & Problem Queue) */}
          <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "20px" }}>
            {/* Daily Mission & Battle Progress */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Daily Mission Card */}
              <div
                style={{
                  background: "var(--card)",
                  backdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--primary-soft)",
                  borderRadius: "var(--radius)",
                  padding: "18px",
                  boxShadow: DESIGN_TOKENS.shadows.card,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)", fontWeight: 700, textTransform: "uppercase" }}>Daily Mission</span>
                  <h4 style={{ margin: "2px 0 0 0", fontSize: "14px", fontWeight: 700, color: "var(--text-primary)" }}>
                    Solve {dailyGoal} problems today
                  </h4>
                </div>

                <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${Math.min(100, (2 / dailyGoal) * 100)}%`, height: "100%", background: "var(--primary)" }} />
                </div>

                <div style={{ display: "flex", gap: "8px", fontSize: "10px", color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--primary-hover)", fontWeight: 700 }}>+150 XP</span> • 
                  <span style={{ color: "#F59E0B", fontWeight: 700 }}>+250 Coins</span> • 
                  <span style={{ color: "#3B82F6", fontWeight: 700 }}>+1 Gem</span>
                </div>
              </div>

              {/* Battle Progress Stats */}
              <div
                style={{
                  background: "var(--card)",
                  backdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "18px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Accuracy</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "#10B981", display: "block" }}>81%</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Attempted</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", display: "block" }}>320</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Solved</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "#3B82F6", display: "block" }}>18</span>
                </div>
                <div>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Passed</span>
                  <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--primary)", display: "block" }}>22</span>
                </div>
              </div>
            </div>

            {/* Problem Queue Table */}
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
                Problem Queue
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {problems.map((p) => (
                  <div
                    key={p.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: "10px",
                      background: "var(--surface)",
                      fontSize: "11px",
                    }}
                  >
                    <span style={{ color: "var(--text-primary)", fontWeight: 600, flex: 1 }}>{p.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <span style={{ color: p.difficulty === "Easy" ? "#10B981" : "#F59E0B", fontWeight: 600 }}>{p.difficulty}</span>
                      <span style={{ color: "var(--text-secondary)" }}>{p.acceptance}</span>
                      <span style={{ color: "var(--primary)", fontWeight: 700 }}>{p.xp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Bottom 2-Column Grid (Pattern Mastery & Recent Solves) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Pattern Mastery */}
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
                Pattern Mastery
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {patterns.map((pat) => (
                  <div key={pat.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", padding: "10px", borderRadius: "10px", background: "var(--surface)" }}>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: pat.color }}>{pat.percent}</span>
                    <span style={{ fontSize: "10px", color: "var(--text-primary)", fontWeight: 600 }}>{pat.name}</span>
                    <span style={{ fontSize: "8px", color: "var(--text-secondary)" }}>{pat.xp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Solves */}
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
                Recent Solves
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {recentSolves.map((s) => (
                  <div key={s.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{s.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: s.color, fontWeight: 700 }}>{s.status}</span>
                      <span style={{ color: "var(--primary)", fontWeight: 700 }}>{s.xp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Training Grounds Banner */}
          <SidebarWidget title="Training Grounds">
            <div style={{ position: "relative", height: "120px", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--border)" }}>
              <Image src="/assets/settings/battle_arena.jpg" alt="Battle Arena artwork" fill style={{ objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(35, 15, 10, 0.8) 60%, var(--primary-soft) 100%)" }} />
              <div style={{ position: "relative", zIndex: 1, padding: "16px", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF" }}>Train your skills in the Battle Arena</span>
              </div>
            </div>
          </SidebarWidget>

          {/* Today's Rewards */}
          <SidebarWidget title="Today's Rewards">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "11px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", marginBottom: "4px" }}>
                  <span>XP Goal</span>
                  <span style={{ color: "var(--primary-hover)", fontWeight: 700 }}>150 / 500 XP</span>
                </div>
                <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}><div style={{ width: "30%", height: "100%", background: "var(--primary-hover)" }} /></div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", marginBottom: "4px" }}>
                  <span>Coins Goal</span>
                  <span style={{ color: "#F59E0B", fontWeight: 700 }}>250 / 1500 Coins</span>
                </div>
                <div style={{ width: "100%", height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}><div style={{ width: "16.6%", height: "100%", background: "#F59E0B" }} /></div>
              </div>
            </div>
          </SidebarWidget>

          {/* Streak Boost */}
          <SidebarWidget title="Streak Boost">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px", borderRadius: "12px", background: "var(--primary-soft)", border: "1px solid var(--primary-soft)" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF", fontWeight: 800 }}>2x</div>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>2x Streak Bonus Active</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Double XP on all daily solves</span>
              </div>
            </div>
          </SidebarWidget>
        </div>
      </div>
    </div>
  );
}
