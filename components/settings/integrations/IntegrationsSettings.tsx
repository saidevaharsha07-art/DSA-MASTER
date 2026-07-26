"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Globe, ShieldCheck } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function IntegrationsSettings() {
  const { settings, updateSetting } = useSettings();
  const { leetcode, codeforces, github, codechef, gfg } = settings.integrations;

  const connectedAccounts = [
    { id: "leetcode", name: "LeetCode", handle: leetcode.username || "harsha_01", connected: leetcode.connected },
    { id: "codeforces", name: "Codeforces", handle: codeforces.username || "harsha_01", connected: codeforces.connected },
    { id: "codechef", name: "CodeChef", handle: codechef.username || "harsha_01", connected: codechef.connected },
    { id: "github", name: "GitHub", handle: github.username || "harsha_dev", connected: github.connected },
    { id: "gfg", name: "GeeksforGeeks", handle: gfg.username || "harsha_01", connected: gfg.connected },
  ];

  const handleToggleConnection = (id: string, isConnected: boolean) => {
    const sectionKey = id as keyof typeof settings.integrations;
    if (settings.integrations[sectionKey]) {
      updateSetting("integrations", sectionKey, {
        ...settings.integrations[sectionKey],
        connected: !isConnected,
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="🔗"
        title="Integrations"
        subtitle="Connect external platforms and supercharge your JOURNEY experience."
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
        {/* Left Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Section 1: Connected Accounts Grid (3 Columns) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Connected Accounts
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {connectedAccounts.map((acc) => (
                <div
                  key={acc.id}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius)",
                    background: "var(--card)",
                    backdropFilter: "blur(var(--glass-blur))",
                    border: acc.connected ? "1px solid var(--primary-soft)" : "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "120px",
                    boxShadow: DESIGN_TOKENS.shadows.card,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-primary)" }}>
                        <Globe size={16} />
                      </div>
                      <div>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>{acc.name}</span>
                        <span style={{ fontSize: "10px", color: acc.connected ? "#10B981" : "var(--text-muted)" }}>
                          {acc.connected ? "Connected" : "Disconnected"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>{acc.handle}</span>
                    <button
                      type="button"
                      onClick={() => handleToggleConnection(acc.id, acc.connected)}
                      style={{
                        width: "100%",
                        padding: "6px",
                        borderRadius: "8px",
                        background: acc.connected ? "rgba(255, 255, 255, 0.06)" : "var(--primary-soft)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        fontSize: "11px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {acc.connected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Integration Health */}
          <SidebarWidget title="Integration Health">
            <div
              style={{
                position: "relative",
                height: "120px",
                borderRadius: "14px",
                background: "radial-gradient(circle at 50% 30%, rgba(16, 185, 129, 0.25) 0%, var(--background) 80%)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <ShieldCheck size={28} style={{ color: "#10B981" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>All systems operational</span>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>5 Platforms Bound</span>
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
              src="/assets/settings/portal_nexus.jpg"
              alt="Portal Nexus artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(10, 20, 45, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Together we are stronger. Connect, sync and conquer.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
