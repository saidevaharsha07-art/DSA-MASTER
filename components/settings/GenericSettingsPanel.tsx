"use client";

import React from "react";
import { SettingsHeader } from "./SettingsHeader";
import { SidebarWidget } from "./appearance/SidebarWidget";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ShieldCheck, Cloud, Zap, Info } from "lucide-react";

interface GenericSettingsPanelProps {
  emoji: string;
  title: string;
  subtitle: string;
}

export function GenericSettingsPanel({ emoji, title, subtitle }: GenericSettingsPanelProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Settings Header */}
      <SettingsHeader emoji={emoji} title={title} subtitle={subtitle} />

      {/* Main Grid Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Main Panel */}
        <div
          style={{
            background: "rgba(18, 22, 38, 0.72)",
            backdropFilter: "blur(20px)",
            border: `1px solid ${DESIGN_TOKENS.colors.border}`,
            borderRadius: "24px",
            padding: "32px",
            boxShadow: DESIGN_TOKENS.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldCheck size={24} style={{ color: "#7C4DFF" }} />
            <div>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#FFFFFF" }}>
                {title} Active
              </h4>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#9AA4B2" }}>
                All systems configured for optimal performance and security.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.06)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "rgba(10, 14, 26, 0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontSize: "12px", color: "#9AA4B2" }}>Status</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#10B981", display: "block", marginTop: "4px" }}>
                Operational
              </span>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: "rgba(10, 14, 26, 0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span style={{ fontSize: "12px", color: "#9AA4B2" }}>Latency</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#A970FF", display: "block", marginTop: "4px" }}>
                12 ms
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SidebarWidget title="Module Overview" subtitle="System details">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "#9AA4B2" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Engine Version</span>
                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>v6.2.0</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Security Shield</span>
                <span style={{ color: "#10B981", fontWeight: 600 }}>Enabled</span>
              </div>
            </div>
          </SidebarWidget>
        </div>
      </div>
    </div>
  );
}
