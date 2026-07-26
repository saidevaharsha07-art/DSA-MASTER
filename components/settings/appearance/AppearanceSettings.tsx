"use client";

import React from "react";
import { motion } from "framer-motion";
import { AppearanceHeader } from "./AppearanceHeader";
import { ThemeSelector } from "./ThemeSelector";
import { AccentSelector } from "./AccentSelector";
import { InterfaceCard } from "./InterfaceCard";
import { TypographyCard } from "./TypographyCard";
import { LivePreviewPanel } from "./LivePreviewPanel";
import { ProgressCard } from "./ProgressCard";
import { StatsGrid } from "./StatsGrid";
import { SystemStatusCard } from "./SystemStatusCard";
import { QuoteCard } from "./QuoteCard";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { RotateCcw, Check, X } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";
import { useToast } from "@/src/context/ToastContext";

interface AppearanceSettingsProps {
  theme?: string;
  onThemeChange?: (newTheme: string) => void;
  accentColor?: string;
  onAccentChange?: (color: string) => void;
  onResetDefaults?: () => void;
  onCancel?: () => void;
  onSave?: () => void;
}

export function AppearanceSettings({
  theme: propsTheme,
  onThemeChange: propsOnThemeChange,
  accentColor: propsAccentColor,
  onAccentChange: propsOnAccentChange,
  onResetDefaults: propsOnResetDefaults,
  onCancel,
  onSave,
}: AppearanceSettingsProps) {
  const { settings, updateSetting, resetSection } = useSettings();
  const { toast } = useToast();

  const currentTheme = propsTheme || settings.appearance.theme;
  const currentAccent = propsAccentColor || settings.appearance.accentColor;

  const handleThemeSelect = (newTheme: string) => {
    updateSetting("appearance", "theme", newTheme as any);
    toast(`Theme changed to ${newTheme}`, "info");
    if (propsOnThemeChange) propsOnThemeChange(newTheme);
  };

  const handleAccentSelect = (color: string) => {
    updateSetting("appearance", "accentColor", color);
    toast(`Accent color set to ${color}`, "info");
    if (propsOnAccentChange) propsOnAccentChange(color);
  };

  const handleReset = () => {
    resetSection("appearance");
    toast("Appearance reset to defaults", "warning");
    if (propsOnResetDefaults) propsOnResetDefaults();
  };

  const handleSaveInternal = () => {
    toast("Appearance settings saved successfully!", "success");
    if (onSave) onSave();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Header */}
      <AppearanceHeader />

      {/* Main Content Layout: Settings Panel (Left) & Live Preview Sidebar (Right) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Left / Center Settings Panel */}
        <div
          style={{
            background: "var(--card)",
            backdropFilter: "blur(var(--glass-blur))",
            border: `1px solid var(--border)`,
            borderRadius: "24px",
            padding: "32px",
            boxShadow: DESIGN_TOKENS.shadows.card,
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          {/* Theme Cards Selector */}
          <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeSelect} />

          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* Accent Color Cards Selector */}
          <AccentSelector currentAccent={currentAccent} onAccentChange={handleAccentSelect} />

          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* 2-Column Settings Grid: Interface & Typography/Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            <InterfaceCard />
            <TypographyCard />
          </div>

          <div style={{ height: "1px", background: "var(--border)" }} />

          {/* Action Buttons Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset settings to defaults"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 20px",
                borderRadius: "12px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "var(--transition-speed)",
                outline: "none",
              }}
            >
              <RotateCcw size={15} /> Reset to Defaults
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                type="button"
                onClick={onCancel}
                aria-label="Cancel changes"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "var(--transition-speed)",
                  outline: "none",
                }}
              >
                <X size={15} /> Cancel
              </button>

              <motion.button
                type="button"
                onClick={handleSaveInternal}
                aria-label="Save appearance changes"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 28px",
                  borderRadius: "12px",
                  background: "var(--primary)",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: DESIGN_TOKENS.shadows.glow,
                  outline: "none",
                }}
              >
                <Check size={16} strokeWidth={3} /> Save Changes
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Stacked Widgets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <LivePreviewPanel />
          <ProgressCard />
          <StatsGrid />
          <SystemStatusCard />
          <QuoteCard />
        </div>
      </div>
    </div>
  );
}
