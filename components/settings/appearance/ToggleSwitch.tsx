"use client";

import React from "react";
import { motion } from "framer-motion";
import { DESIGN_TOKENS } from "@/src/design/tokens";

interface ToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  ariaLabel?: string;
}

export function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  ariaLabel,
}: ToggleSwitchProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
      }}
    >
      <div>
        <div style={{ fontSize: "13px", fontWeight: 500, color: DESIGN_TOKENS.colors.textPrimary }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: "11px", color: DESIGN_TOKENS.colors.textMuted, marginTop: "2px" }}>
            {description}
          </div>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        onClick={() => onChange(!checked)}
        style={{
          width: "44px",
          height: "24px",
          borderRadius: "12px",
          padding: "2px",
          background: checked
            ? "linear-gradient(135deg, #7C4DFF 0%, #A970FF 100%)"
            : "rgba(255, 255, 255, 0.12)",
          boxShadow: checked ? DESIGN_TOKENS.shadows.glow : "none",
          border: `1px solid ${checked ? "rgba(124, 77, 255, 0.6)" : "rgba(255, 255, 255, 0.08)"}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          transition: DESIGN_TOKENS.transitions.default,
          outline: "none",
        }}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#FFFFFF",
            boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        />
      </button>
    </div>
  );
}
