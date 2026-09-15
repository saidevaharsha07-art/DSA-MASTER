"use client";

import React from "react";
import { SettingsHeader } from "./SettingsHeader";
import { SidebarWidget } from "./appearance/SidebarWidget";
import { useSettings } from "@/src/context/SettingsContext";
import { ShieldCheck, Cloud, Zap, Info } from "lucide-react";

interface GenericSettingsPanelProps {
  emoji?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
}

export function GenericSettingsPanel({ emoji, icon, title, subtitle }: GenericSettingsPanelProps) {
  const { settings } = useSettings();
  const isLight = settings.appearance.theme === 'light';

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Settings Header */}
      <SettingsHeader emoji={emoji} icon={icon} title={title} subtitle={subtitle} />

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
            background: "var(--card)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border)",
            borderRadius: "24px",
            padding: "32px",
            boxShadow: "var(--card-shadow)",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ShieldCheck size={24} style={{ color: "var(--primary)" }} />
            <div>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>
                {title} Active
              </h4>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "var(--text-secondary)" }}>
                All systems configured for optimal performance and security.
              </p>
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border)" }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: isLight ? "#F8FAFC" : "rgba(10, 14, 26, 0.6)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Status</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#10B981", display: "block", marginTop: "4px" }}>
                Operational
              </span>
            </div>

            <div
              style={{
                padding: "20px",
                borderRadius: "14px",
                background: isLight ? "#F8FAFC" : "rgba(10, 14, 26, 0.6)",
                border: "1px solid var(--border)",
              }}
            >
              <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Latency</span>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "var(--primary)", display: "block", marginTop: "4px" }}>
                12 ms
              </span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <SidebarWidget title="Module Overview" subtitle="System details">
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Engine Version</span>
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>v6.2.0</span>
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
