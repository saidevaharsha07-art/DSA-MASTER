"use client";

import React from "react";
import { SidebarWidget } from "./SidebarWidget";
import { Flame, Zap } from "lucide-react";

export function StatsGrid() {
  return (
    <SidebarWidget>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {/* Day Streak Card */}
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(10, 14, 26, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Flame size={18} style={{ color: "#F59E0B" }} />
            <div>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>23</span>
              <span style={{ fontSize: "11px", color: "#9AA4B2", display: "block" }}>Day Streak</span>
            </div>
          </div>
          {/* Mini Bar Chart */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "24px", marginTop: "4px" }}>
            {[40, 60, 30, 80, 50, 90, 100].map((val, idx) => (
              <div
                key={idx}
                style={{
                  flex: 1,
                  height: `${val}%`,
                  background: idx === 6 ? "#F59E0B" : "rgba(245, 158, 11, 0.3)",
                  borderRadius: "2px",
                }}
              />
            ))}
          </div>
        </div>

        {/* Total XP Card */}
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(10, 14, 26, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={18} style={{ color: "#A970FF" }} />
            <div>
              <span style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>12,450</span>
              <span style={{ fontSize: "11px", color: "#9AA4B2", display: "block" }}>Total XP</span>
            </div>
          </div>
          {/* Mini Sparkline SVG */}
          <div style={{ width: "100%", height: "24px", marginTop: "4px" }}>
            <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path
                d="M0 20 Q 20 15, 40 18 T 80 5 T 100 2"
                fill="none"
                stroke="#A970FF"
                strokeWidth="2"
              />
              <path
                d="M0 20 Q 20 15, 40 18 T 80 5 T 100 2 L 100 24 L 0 24 Z"
                fill="url(#xpGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A970FF" />
                  <stop offset="100%" stopColor="#A970FF" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </SidebarWidget>
  );
}
