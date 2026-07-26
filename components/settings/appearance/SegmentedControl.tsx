"use client";

import React from "react";
import { motion } from "framer-motion";
import { DESIGN_TOKENS } from "@/src/design/tokens";

interface SegmentOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (val: string) => void;
  ariaLabel?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  ariaLabel = "Segmented control",
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      style={{
        display: "inline-flex",
        background: "rgba(10, 14, 26, 0.6)",
        padding: "4px",
        borderRadius: DESIGN_TOKENS.borderRadius.md,
        border: `1px solid ${DESIGN_TOKENS.colors.border}`,
        gap: "4px",
        width: "100%",
        boxShadow: DESIGN_TOKENS.shadows.innerHighlight,
      }}
    >
      {options.map((opt) => {
        const isSelected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              position: "relative",
              padding: "8px 12px",
              fontSize: "12px",
              fontWeight: isSelected ? 600 : 500,
              color: isSelected ? "#FFFFFF" : DESIGN_TOKENS.colors.textMuted,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: DESIGN_TOKENS.borderRadius.sm,
              transition: DESIGN_TOKENS.transitions.default,
              outline: "none",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {isSelected && (
              <motion.div
                layoutId={`segmented-active-${ariaLabel}`}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(124,77,255,0.85) 0%, rgba(169,112,255,0.85) 100%)",
                  borderRadius: DESIGN_TOKENS.borderRadius.sm,
                  boxShadow: DESIGN_TOKENS.shadows.glow,
                  zIndex: 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
