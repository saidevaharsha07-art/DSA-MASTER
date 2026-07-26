"use client";

import React from "react";
import { DESIGN_TOKENS } from "@/src/design/tokens";

interface SettingsSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
  ariaLabel?: string;
}

export function SettingsSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = "%",
  onChange,
  ariaLabel,
}: SettingsSliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "13px", fontWeight: 500, color: DESIGN_TOKENS.colors.textPrimary }}>
          {label}
        </span>
        <span style={{ fontSize: "12px", fontWeight: 600, color: DESIGN_TOKENS.colors.secondary }}>
          {value}{unit}
        </span>
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          aria-label={ariaLabel || label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            width: "100%",
            height: "8px",
            appearance: "none",
            background: `linear-gradient(to right, ${DESIGN_TOKENS.colors.primary} 0%, ${DESIGN_TOKENS.colors.secondary} ${percentage}%, rgba(255,255,255,0.08) ${percentage}%, rgba(255,255,255,0.08) 100%)`,
            borderRadius: "4px",
            outline: "none",
            cursor: "pointer",
            transition: DESIGN_TOKENS.transitions.fast,
          }}
        />
      </div>
    </div>
  );
}
