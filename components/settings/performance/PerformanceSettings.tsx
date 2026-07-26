"use client";

import React from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ToggleSwitch } from "../appearance/ToggleSwitch";
import { SettingsSlider } from "../appearance/SettingsSlider";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Zap, Cpu, Activity, Gauge, Check } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function PerformanceSettings() {
  const { settings, updateSetting } = useSettings();
  const { particleEffects, fpsLimit, renderQuality } = settings.performance;

  const presets = [
    { id: "ultra", title: "Ultra (120 FPS)", desc: "Max quality, GPU accelerated", icon: Zap },
    { id: "high", title: "High (60 FPS)", desc: "Balanced performance & visuals", icon: Gauge },
    { id: "battery", title: "Power Saver", desc: "Energy optimized 30 FPS", icon: Cpu },
    { id: "custom", title: "Custom", desc: "User tuned rendering profile", icon: Activity },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="⚡"
        title="Performance & Arcane Engine"
        subtitle="Optimize rendering speed, GPU acceleration, frame rates, and visual quality."
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
          {/* Section 1: Rendering Presets (4 Cards in a Row) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Arcane Engine Presets
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              {presets.map((p) => {
                const isSelected = renderQuality === p.id;
                const IconComp = p.icon;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => updateSetting("performance", "renderQuality", p.id as any)}
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

          {/* Section 2: 2-Column Grid (Engine Controls & Performance Metrics) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Card: Hardware & Visual Settings */}
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
                Graphics & Hardware Acceleration
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <ToggleSwitch
                  label="Particle Effects"
                  description="Enable background particle simulation"
                  checked={particleEffects}
                  onChange={(val) => updateSetting("performance", "particleEffects", val)}
                />
                <SettingsSlider
                  label="FPS Limit Target"
                  value={fpsLimit}
                  min={30}
                  max={144}
                  unit=" FPS"
                  onChange={(val) => updateSetting("performance", "fpsLimit", val)}
                />
              </div>
            </div>

            {/* Right Card: Real-time Diagnostics */}
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
                Real-Time Diagnostics
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Target FPS</span>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "#10B981", display: "block", marginTop: "2px" }}>{fpsLimit} FPS</span>
                  <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>Locked</span>
                </div>
                <div style={{ padding: "14px", borderRadius: "12px", background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "10px", color: "var(--text-secondary)", display: "block" }}>Quality Profile</span>
                  <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--primary)", display: "block", marginTop: "2px", textTransform: "uppercase" }}>{renderQuality}</span>
                  <span style={{ fontSize: "9px", color: "var(--text-muted)" }}>Active Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Engine Status */}
          <SidebarWidget title="Arcane Reactor Status">
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
              <Zap size={28} style={{ color: "var(--primary)" }} />
              <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-primary)" }}>Engine Active</span>
              <span style={{ fontSize: "10px", color: "#10B981" }}>{fpsLimit} FPS Target</span>
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
              src="/assets/settings/crystal_tower.jpg"
              alt="Arcane Engine artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(10, 30, 50, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Power harnessed with precision turns computational chaos into seamless flow.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
