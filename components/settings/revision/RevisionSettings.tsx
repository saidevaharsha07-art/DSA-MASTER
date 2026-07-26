"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { useSettings } from "@/src/context/SettingsContext";

export function RevisionSettings() {
  const { settings } = useSettings();
  const { revisionPerDay, memoryStrength, reviewOrder } = settings.revision;

  const weakConcepts = [
    { name: "Dynamic Programming", mastery: "35%", risk: "High", color: "#EF4444", last: "3 days ago" },
    { name: "Graph Algorithms", mastery: "42%", risk: "High", color: "#EF4444", last: "5 days ago" },
    { name: "Advanced Trees", mastery: "58%", risk: "Medium", color: "#F59E0B", last: "2 days ago" },
    { name: "Segment Trees", mastery: "62%", risk: "Medium", color: "#F59E0B", last: "7 days ago" },
    { name: "Sliding Window", mastery: "68%", risk: "Medium", color: "#F59E0B", last: "1 day ago" },
  ];

  const revisionQueue = [
    { problem: "LRU Cache", topic: "Design", reviewTime: "Today, 10:00 AM", estTime: "20m", xp: "30" },
    { problem: "Coin Change", topic: "DP", reviewTime: "Today, 11:00 AM", estTime: "15m", xp: "20" },
    { problem: "Course Schedule", topic: "Graphs", reviewTime: "Today, 2:00 PM", estTime: "15m", xp: "20" },
    { problem: "Longest Increasing Subsequence", topic: "DP", reviewTime: "Tomorrow, 9:00 AM", estTime: "20m", xp: "25" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="⛩️"
        title="Revision Center"
        subtitle="Strengthen knowledge before it fades."
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
          {/* Section 1: Today's Revision Quick Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
            <div style={{ padding: "16px", borderRadius: "var(--radius)", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Due Today</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#3B82F6" }}>{revisionPerDay * 4}</span>
            </div>
            <div style={{ padding: "16px", borderRadius: "var(--radius)", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "10px", color: "#EF4444" }}>Overdue</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#EF4444" }}>5</span>
            </div>
            <div style={{ padding: "16px", borderRadius: "var(--radius)", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Upcoming</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)" }}>56</span>
            </div>
            <div style={{ padding: "16px", borderRadius: "var(--radius)", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Completed</span>
              <span style={{ fontSize: "20px", fontWeight: 800, color: "#10B981" }}>12</span>
            </div>
          </div>

          {/* Section 2: Middle 2-Column Grid (Weak Concepts & Revision Timeline) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Weak Concepts */}
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
                Weak Concepts
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {weakConcepts.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                    <div>
                      <span style={{ color: "var(--text-primary)", fontWeight: 600, display: "block" }}>{c.name}</span>
                      <span style={{ color: "var(--text-muted)", fontSize: "9px" }}>Last review: {c.last}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>{c.mastery}</span>
                      <span style={{ color: c.color, fontSize: "9px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: "rgba(255,255,255,0.06)" }}>{c.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revision Timeline */}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  Revision Timeline ({reviewOrder})
                </h4>
                <div style={{ display: "flex", gap: "6px", fontSize: "10px" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, background: "var(--primary-soft)", padding: "2px 8px", borderRadius: "6px" }}>Today</span>
                  <span style={{ color: "var(--text-secondary)", padding: "2px 8px" }}>Tomorrow</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { topic: "Arrays & Hashing", count: `${revisionPerDay} problems`, time: "20m" },
                  { topic: "Dynamic Programming", count: "8 problems", time: "30m" },
                  { topic: "Trees & Graphs", count: "7 problems", time: "25m" },
                  { topic: "String Algorithms", count: "6 problems", time: "15m" },
                  { topic: "Greedy Algorithms", count: "5 problems", time: "15m" },
                ].map((t) => (
                  <div key={t.topic} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{t.topic}</span>
                    <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
                      <span>{t.count}</span>
                      <span style={{ color: "var(--primary)", fontWeight: 700 }}>{t.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Revision Queue Table */}
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
              Revision Queue
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {revisionQueue.map((q) => (
                <div key={q.problem} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600, display: "block" }}>{q.problem}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "9px" }}>Topic: {q.topic}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ color: "#3B82F6" }}>{q.reviewTime}</span>
                    <span style={{ color: "var(--text-secondary)" }}>{q.estTime}</span>
                    <span style={{ color: "var(--primary)", fontWeight: 700 }}>+{q.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Memory Health Gauge */}
          <SidebarWidget title="Memory Health">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ position: "relative", width: "64px", height: "64px" }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" stroke="var(--border)" strokeWidth="5" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#10B981"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray="163"
                    strokeDashoffset="26"
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "var(--text-primary)" }}>
                  {memoryStrength}%
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontSize: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--text-secondary)" }}>Retention Rate:</span><strong style={{ color: "#10B981" }}>85%</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--text-secondary)" }}>Forgetting Curve:</span><strong style={{ color: "#10B981" }}>68%</strong></div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}><span style={{ color: "var(--text-secondary)" }}>Accuracy:</span><strong style={{ color: "#3B82F6" }}>88%</strong></div>
              </div>
            </div>
          </SidebarWidget>

          {/* Revision Analytics */}
          <SidebarWidget title="Revision Analytics">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "10px", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Retention Over Time</span><strong style={{ color: "#10B981" }}>+12%</strong></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Review Calendar</span><strong style={{ color: "var(--primary)" }}>Active</strong></div>
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
              src="/assets/settings/memory_temple.jpg"
              alt="Memory Temple artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(10, 25, 38, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "11px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Memory is the treasure. Revision is the key. Mastery is your destiny.&rdquo;<br />
                <span style={{ fontSize: "9px", color: "var(--text-secondary)", fontStyle: "normal" }}>- The Archivist</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
