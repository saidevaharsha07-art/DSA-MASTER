"use client";

import React from "react";
import { SidebarWidget } from "./SidebarWidget";
import { Target, Sparkles } from "lucide-react";

export function ProgressCard() {
  return (
    <SidebarWidget>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {/* Mini Card 1 - Current Topic */}
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
            {/* Progress Ring SVG */}
            <div style={{ position: "relative", width: "36px", height: "36px" }}>
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="88"
                  strokeDashoffset="22"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                75%
              </span>
            </div>

            <div>
              <span style={{ fontSize: "10px", color: "#3B82F6", fontWeight: 600, display: "block" }}>
                Data Structures
              </span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF", display: "block" }}>
                Arrays & Hashing
              </span>
            </div>
          </div>

          <div
            style={{
              width: "100%",
              height: "4px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            <div style={{ width: "75%", height: "100%", background: "#3B82F6" }} />
          </div>
        </div>

        {/* Mini Card 2 - Today's Mission */}
        <div
          style={{
            padding: "14px",
            borderRadius: "14px",
            background: "rgba(10, 14, 26, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: "rgba(124, 77, 255, 0.2)",
                color: "#A970FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Target size={16} />
            </div>
            <div>
              <span style={{ fontSize: "10px", color: "#9AA4B2", fontWeight: 500, display: "block" }}>
                Today&apos;s Mission
              </span>
              <span style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF", display: "block" }}>
                Solve 3 problems
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "8px", fontSize: "10px", color: "#A970FF", fontWeight: 600 }}>
            <Sparkles size={11} /> +150 XP
          </div>
        </div>
      </div>
    </SidebarWidget>
  );
}
