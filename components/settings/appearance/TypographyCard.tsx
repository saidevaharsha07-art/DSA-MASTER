"use client";

import React from "react";
import { SegmentedControl } from "./SegmentedControl";
import { ToggleSwitch } from "./ToggleSwitch";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ChevronDown } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function TypographyCard() {
  const { settings, updateSetting } = useSettings();
  const { fontFamily, sidebarStyle, uiDensity, reduceMotion } = settings.appearance;

  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "18px",
        background: "rgba(18, 22, 38, 0.6)",
        border: `1px solid ${DESIGN_TOKENS.colors.border}`,
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <h4 style={{ margin: 0, fontSize: "15px", fontWeight: 600, color: "#FFFFFF" }}>
        Typography & Layout
      </h4>

      {/* Font Family Dropdown */}
      <div>
        <label
          htmlFor="font-family-select"
          style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", display: "block", marginBottom: "4px" }}
        >
          Font Family
        </label>
        <div style={{ fontSize: "11px", color: "#9AA4B2", marginBottom: "8px" }}>
          Choose your preferred font
        </div>
        <div style={{ position: "relative" }}>
          <select
            id="font-family-select"
            aria-label="Choose font family"
            value={fontFamily}
            onChange={(e) => updateSetting("appearance", "fontFamily", e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              paddingRight: "36px",
              borderRadius: "10px",
              background: "rgba(10, 14, 26, 0.8)",
              border: `1px solid ${DESIGN_TOKENS.colors.border}`,
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 500,
              appearance: "none",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="Inter">Inter (System Default)</option>
            <option value="Outfit">Outfit (Modern Tech)</option>
            <option value="Roboto">Roboto (Clean Sans)</option>
            <option value="Fira Code">Fira Code (Developer Mono)</option>
          </select>
          <ChevronDown
            size={16}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9AA4B2",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Sidebar Style */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", marginBottom: "4px" }}>
          Sidebar Style
        </div>
        <div style={{ fontSize: "11px", color: "#9AA4B2", marginBottom: "8px" }}>
          Customize sidebar appearance
        </div>
        <SegmentedControl
          ariaLabel="Sidebar style layout"
          options={[
            { value: "compact", label: "Compact" },
            { value: "expanded", label: "Expanded" },
          ]}
          value={sidebarStyle}
          onChange={(val) => updateSetting("appearance", "sidebarStyle", val as any)}
        />
      </div>

      {/* UI Density */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", marginBottom: "4px" }}>
          UI Density
        </div>
        <div style={{ fontSize: "11px", color: "#9AA4B2", marginBottom: "8px" }}>
          Adjust spacing and density
        </div>
        <SegmentedControl
          ariaLabel="UI Density setting"
          options={[
            { value: "comfortable", label: "Comfortable" },
            { value: "balanced", label: "Balanced" },
            { value: "compact", label: "Compact" },
          ]}
          value={uiDensity}
          onChange={(val) => updateSetting("appearance", "uiDensity", val as any)}
        />
      </div>

      {/* Reduce Motion Toggle */}
      <div style={{ paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <ToggleSwitch
          label="Reduce Motion"
          description="Minimize animations across the app"
          checked={reduceMotion}
          onChange={(val) => updateSetting("appearance", "reduceMotion", val)}
        />
      </div>
    </div>
  );
}
