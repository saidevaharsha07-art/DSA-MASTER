"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Brain, Play } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function LearningEngineSettings() {
  const { settings, updateSetting } = useSettings();
  const { reviewMode, reviewCount, masteryThreshold } = settings.learningEngine;

  const algorithms = [
    { id: "spaced", title: "Spaced Repetition", desc: "Optimal review timing" },
    { id: "recall", title: "Active Recall", desc: "Strengthen memory" },
    { id: "difficulty", title: "Memory Difficulty", desc: "Adjust challenge level" },
    { id: "interval", title: "Review Interval", desc: "Set review frequency" },
    { id: "forgetting", title: "Forgetting Curve", desc: "Customize decay rate" },
    { id: "adaptive", title: "Adaptive Learning", desc: "AI-powered adjustments" },
  ];

  const memoryMetrics = [
    { title: "Mastery Score", value: `${masteryThreshold}`, status: "Good", color: "var(--primary)" },
    { title: "Retention Rate", value: "95%", status: "Excellent", color: "#10B981" },
    { title: "Avg Recall Time", value: "2.4s", status: "Fast", color: "#A970FF" },
    { title: "Memory Stability", value: "68%", status: "Good", color: "#F59E0B" },
    { title: "Learning Velocity", value: "1.8x", status: "High", color: "#10B981" },
    { title: "Recall Accuracy", value: "89%", status: "Excellent", color: "var(--primary)" },
  ];

  const schedulerItems = [
    { topic: "Arrays & Hashing", count: `${reviewCount} Problems`, time: "25m" },
    { topic: "Dynamic Programming", count: "8 Problems", time: "30m" },
    { topic: "Trees & Graphs", count: "7 Problems", time: "25m" },
    { topic: "Greedy Algorithms", count: "5 Problems", time: "15m" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="🔮"
        title="Learning Engine"
        subtitle="Configure the intelligence that powers your learning journey."
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
          {/* Section 1: Top 2-Column Grid (Algorithm Options & Memory Engine 6 Stat Cards) */}
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "20px" }}>
            {/* Algorithm Selector List */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "16px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <h4 style={{ margin: "0 0 8px 0", fontSize: "12px", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>
                Learning Algorithm
              </h4>
              {algorithms.map((alg) => {
                const isSelected = reviewMode === alg.id;
                return (
                  <button
                    key={alg.id}
                    type="button"
                    onClick={() => updateSetting("learningEngine", "reviewMode", alg.id)}
                    style={{
                      padding: "10px 12px",
                      borderRadius: "10px",
                      background: isSelected ? "var(--primary-soft)" : "transparent",
                      border: isSelected ? "1px solid var(--primary)" : "1px solid transparent",
                      color: isSelected ? "var(--text-primary)" : "var(--text-secondary)",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      outline: "none",
                      transition: "var(--transition-speed)",
                    }}
                  >
                    <span style={{ fontSize: "12px", fontWeight: isSelected ? 700 : 500 }}>{alg.title}</span>
                    <span style={{ fontSize: "9px", color: isSelected ? "var(--text-primary)" : "var(--text-muted)" }}>{alg.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Memory Engine 6 Metric Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <h4 style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "var(--text-primary)" }}>
                Memory Engine
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {memoryMetrics.map((m) => (
                  <div
                    key={m.title}
                    style={{
                      padding: "16px",
                      borderRadius: "var(--radius)",
                      background: "var(--card)",
                      backdropFilter: "blur(var(--glass-blur))",
                      border: "1px solid var(--border)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{m.title}</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "2px" }}>
                      <span style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-primary)" }}>{m.value}</span>
                      <span style={{ fontSize: "10px", color: m.color, fontWeight: 700 }}>{m.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Middle 2-Column Grid (Prediction Panel & Review Scheduler) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            {/* Prediction Panel */}
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
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Prediction Panel
              </h4>
              <div
                style={{
                  position: "relative",
                  height: "140px",
                  borderRadius: "14px",
                  background: "radial-gradient(circle at 50% 50%, var(--primary-soft) 0%, var(--background) 80%)",
                  border: "1px solid var(--primary-soft)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <Brain size={36} style={{ color: "var(--primary)", marginBottom: "6px" }} />
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>AI Cognitive Forecast</span>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Mode: {reviewMode} • Threshold: {masteryThreshold}%</span>
                </div>
              </div>
            </div>

            {/* Review Scheduler */}
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
                  Review Scheduler
                </h4>
                <div style={{ display: "flex", gap: "6px", fontSize: "10px" }}>
                  <span style={{ color: "var(--primary)", fontWeight: 700, background: "var(--primary-soft)", padding: "2px 8px", borderRadius: "6px" }}>Today</span>
                  <span style={{ color: "var(--text-secondary)", padding: "2px 8px" }}>Tomorrow</span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {schedulerItems.map((item) => (
                  <div key={item.topic} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: "10px", background: "var(--surface)", fontSize: "11px" }}>
                    <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>{item.topic}</span>
                    <div style={{ display: "flex", gap: "12px", color: "var(--text-secondary)" }}>
                      <span>{item.count}</span>
                      <span style={{ color: "var(--primary)", fontWeight: 700 }}>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Analytics Overview 4 Charts Row */}
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
              Analytics Overview
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              <div style={{ padding: "12px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Retention Graph</span>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "#10B981", display: "block", marginTop: "4px" }}>95% Steady</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Learning Curve</span>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary)", display: "block", marginTop: "4px" }}>+18% Speed</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Mastery Distribution</span>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--primary-hover)", display: "block", marginTop: "4px" }}>{masteryThreshold}% Avg</span>
              </div>
              <div style={{ padding: "12px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Review Calendar</span>
                <span style={{ fontSize: "16px", fontWeight: 800, color: "#F59E0B", display: "block", marginTop: "4px" }}>S M T W T F S</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Today's Learning Banner */}
          <SidebarWidget title="Today's Learning">
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-secondary)" }}>
                <span>Reviews Due: <strong style={{ color: "var(--text-primary)" }}>{reviewCount * 2}</strong></span>
                <span>Est. Time: <strong style={{ color: "var(--text-primary)" }}>45m</strong></span>
              </div>
              <button
                type="button"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  background: "var(--primary)",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <Play size={14} fill="#FFF" /> Start Review
              </button>
            </div>
          </SidebarWidget>

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
                    strokeDashoffset="24"
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "var(--text-primary)" }}>
                  74%
                </span>
              </div>
              <div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#10B981", display: "block" }}>74% Good</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Algorithm: {reviewMode}</span>
              </div>
            </div>
          </SidebarWidget>

          {/* Review Queue Summary */}
          <SidebarWidget title="Review Queue">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "11px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Due Today</span><span style={{ color: "var(--primary)", fontWeight: 700 }}>{reviewCount}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Due Soon</span><span style={{ color: "#F59E0B", fontWeight: 700 }}>5</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "var(--text-secondary)" }}>Upcoming</span><span style={{ color: "#10B981", fontWeight: 700 }}>56</span></div>
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
              src="/assets/settings/arcane_library.jpg"
              alt="Arcane Library artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(20, 10, 38, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;The mind that grasps patterns commands the algorithm.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
