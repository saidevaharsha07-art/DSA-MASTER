"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ToggleSwitch } from "../appearance/ToggleSwitch";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { ShieldCheck, ChevronDown, Shield } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function PrivacySettings() {
  const { settings, updateSetting, exportSettings, resetAllSettings } = useSettings();
  const { profileVisibility, anonymousMode, analyticsEnabled, leaderboardsVisible } = settings.privacy;

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportSettings());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `journey-data-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearLocalData = () => {
    if (confirm("Are you sure you want to reset all settings and local data?")) {
      resetAllSettings();
      alert("Local data cleared successfully!");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="🛡️"
        title="Privacy & Data"
        subtitle="You are in control. Manage your data, privacy and security."
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
          {/* Section 1: 2-Column Grid (Privacy Controls & Data & Security) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Privacy Controls */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Privacy Controls
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Profile Visibility */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>Profile Visibility</span>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Control who can see your profile</span>
                  </div>
                  <div style={{ position: "relative" }}>
                    <select
                      value={profileVisibility}
                      onChange={(e) => updateSetting("privacy", "profileVisibility", e.target.value as any)}
                      style={{
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        borderRadius: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "11px",
                        padding: "4px 20px 4px 8px",
                        appearance: "none",
                        outline: "none",
                      }}
                    >
                      <option value="only_me">Only Me</option>
                      <option value="private">Private</option>
                      <option value="public">Public</option>
                    </select>
                    <ChevronDown size={12} style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: "none" }} />
                  </div>
                </div>

                <ToggleSwitch
                  label="Anonymous Mode"
                  description="Hide username on global feeds"
                  checked={anonymousMode}
                  onChange={(val) => updateSetting("privacy", "anonymousMode", val)}
                />

                <ToggleSwitch
                  label="Analytics Enabled"
                  description="Help us improve performance"
                  checked={analyticsEnabled}
                  onChange={(val) => updateSetting("privacy", "analyticsEnabled", val)}
                />

                <ToggleSwitch
                  label="Leaderboards Visible"
                  description="Appear in global leaderboards"
                  checked={leaderboardsVisible}
                  onChange={(val) => updateSetting("privacy", "leaderboardsVisible", val)}
                />
              </div>
            </div>

            {/* Data Management */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Data Management
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>Export My Data</span>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Download a copy of all your data</span>
                  </div>
                  <button type="button" onClick={handleExport} style={{ padding: "5px 14px", borderRadius: "8px", background: "var(--primary-soft)", border: "1px solid var(--primary-soft)", color: "var(--text-primary)", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Export</button>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>Clear Local Data</span>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Reset settings and cache</span>
                  </div>
                  <button type="button" onClick={handleClearLocalData} style={{ padding: "5px 14px", borderRadius: "8px", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", color: "#EF4444", fontSize: "11px", fontWeight: 600, cursor: "pointer" }}>Reset</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Security Status */}
          <SidebarWidget title="Security Status">
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
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>Your account is secure</span>
              <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Privacy Profile: {profileVisibility}</span>
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
              src="/assets/settings/guardian_vault.jpg"
              alt="Guardian Vault artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(35, 25, 10, 0.8) 60%, rgba(16, 185, 129, 0.4) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Your data. Your rules. Your journey.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
