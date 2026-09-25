"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ToggleSwitch } from "../appearance/ToggleSwitch";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Terminal, Cpu, Check, Code } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function AdvancedSettings() {
  const { settings, updateSetting, resetAllSettings } = useSettings();
  const { developerMode, debugLogs, resetTutorial } = settings.advanced;

  const handleFactoryReset = () => {
    if (confirm("Are you sure you want to perform a factory reset? All settings will be restored to defaults.")) {
      resetAllSettings();
      alert("Factory reset complete.");
    }
  };

  const presets = [
    { id: "developer", title: "Developer Mode", desc: "Active console & live logging", icon: Terminal },
    { id: "experimental", title: "Beta Flags", desc: "Experimental AI solvers", icon: Code },
    { id: "audit", title: "Memory Audit", desc: "Low level system telemetry", icon: Cpu },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="🛠️"
        title="Advanced & Architect's Sanctum"
        subtitle="Developer options, reality console, feature flags, and system diagnostics."
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
          {/* Section 1: Developer Console Presets (3 Cards in a Row) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Architect Control Presets
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {presets.map((p) => {
                const isSelected = developerMode;
                const IconComp = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => updateSetting("advanced", "developerMode", !developerMode)}
                    style={{
                      position: "relative",
                      padding: "16px",
                      borderRadius: "var(--radius)",
                      background: "var(--card)",
                      backdropFilter: "blur(var(--glass-blur))",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                      boxShadow: isSelected ? "0 0 20px var(--primary-soft)" : "0 4px 12px rgba(0,0,0,0.3)",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "120px",
                      transition: "var(--transition-speed)",
                      outline: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: isSelected ? "var(--primary-soft)" : "rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "var(--primary)" : "var(--text-secondary)" }}>
                        <IconComp size={18} />
                      </div>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>{p.title}</span>
                      <span style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px", display: "block", lineHeight: 1.3 }}>{p.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: 2-Column Grid (Feature Flags & Maintenance) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Card: Feature Flags */}
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
                gap: "20px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Developer Flags
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <ToggleSwitch
                  label="Developer Mode"
                  description="Enable developer inspect tools"
                  checked={developerMode}
                  onChange={(val) => updateSetting("advanced", "developerMode", val)}
                />
                <ToggleSwitch
                  label="Verbose Debug Logs"
                  description="Log diagnostics to browser console"
                  checked={debugLogs}
                  onChange={(val) => updateSetting("advanced", "debugLogs", val)}
                />
                <ToggleSwitch
                  label="Reset Tutorial"
                  description="Show onboarding tips again"
                  checked={resetTutorial}
                  onChange={(val) => updateSetting("advanced", "resetTutorial", val)}
                />
              </div>
            </div>

            {/* Right Card: Control Monolith Utilities */}
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
                gap: "20px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Maintenance & Reset
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>Factory Reset State</span>
                    <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Restore factory defaults</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleFactoryReset}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "8px",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#EF4444",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Factory Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Sanctum Status */}
          <SidebarWidget title="Architect Monolith">
            <div
              style={{
                position: "relative",
                height: "120px",
                borderRadius: "14px",
                background: "radial-gradient(circle at 50% 30%, var(--primary-soft) 0%, var(--background) 80%)",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <Terminal size={28} style={{ color: "var(--primary)" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>
                {developerMode ? "Developer Mode Enabled" : "Standard Mode"}
              </span>
              <span style={{ fontSize: "10px", color: "#10B981" }}>Monolith Active</span>
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
              alt="Architect Sanctum artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(25, 10, 45, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;At the core of creation, code is the blueprint of reality.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
