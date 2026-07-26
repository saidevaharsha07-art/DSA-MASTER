"use client";

import React from "react";
import { SegmentedControl } from "./SegmentedControl";
import { SettingsSlider } from "./SettingsSlider";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { useSettings } from "@/src/context/SettingsContext";

export function InterfaceCard() {
  const { settings, updateSetting } = useSettings();
  const { radius, animations, transparency, blur, glow } = settings.appearance;

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
        Interface
      </h4>

      {/* Radius */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", marginBottom: "4px" }}>
          Radius
        </div>
        <div style={{ fontSize: "11px", color: "#9AA4B2", marginBottom: "8px" }}>
          Roundness of UI elements
        </div>
        <SegmentedControl
          ariaLabel="Radius roundness"
          options={[
            { value: "small", label: "Small" },
            { value: "medium", label: "Medium" },
            { value: "large", label: "Large" },
          ]}
          value={radius}
          onChange={(val) => updateSetting("appearance", "radius", val as any)}
        />
      </div>

      {/* Animations */}
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: "#FFFFFF", marginBottom: "4px" }}>
          Animations
        </div>
        <div style={{ fontSize: "11px", color: "#9AA4B2", marginBottom: "8px" }}>
          Motion and transitions
        </div>
        <SegmentedControl
          ariaLabel="Animation intensity"
          options={[
            { value: "minimal", label: "Minimal" },
            { value: "balanced", label: "Balanced" },
            { value: "rich", label: "Rich" },
          ]}
          value={animations}
          onChange={(val) => updateSetting("appearance", "animations", val as any)}
        />
      </div>

      {/* Transparency */}
      <SettingsSlider
        label="Transparency"
        value={transparency}
        min={0}
        max={100}
        unit="%"
        onChange={(val) => updateSetting("appearance", "transparency", val)}
      />

      {/* Blur */}
      <SettingsSlider
        label="Blur"
        value={blur}
        min={0}
        max={32}
        unit="px"
        onChange={(val) => updateSetting("appearance", "blur", val)}
      />

      {/* Glow */}
      <SettingsSlider
        label="Glow"
        value={glow}
        min={0}
        max={100}
        unit="%"
        onChange={(val) => updateSetting("appearance", "glow", val)}
      />
    </div>
  );
}
