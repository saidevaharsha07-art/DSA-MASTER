"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ACCENTS, AccentConfig } from "@/src/design/tokens";

interface AccentCardProps {
  accent: AccentConfig;
  isSelected: boolean;
  onSelect: (hex: string) => void;
}

export function AccentCard({ accent, isSelected, onSelect }: AccentCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`Select ${accent.name} accent color`}
      onClick={() => onSelect(accent.hex)}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "relative",
        padding: "14px 16px",
        borderRadius: "14px",
        background: "rgba(18, 22, 38, 0.72)",
        backdropFilter: "blur(12px)",
        border: isSelected
          ? `2px solid ${accent.hex}`
          : "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: isSelected
          ? `0 0 20px ${accent.glow}`
          : "0 4px 12px rgba(0,0,0,0.3)",
        cursor: "pointer",
        outline: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Circle Preview */}
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: accent.hex,
            boxShadow: `0 0 10px ${accent.glow}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFFFFF",
          }}
        >
          {isSelected && <Check size={14} strokeWidth={3} />}
        </div>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF" }}>
          {accent.name}
        </span>
      </div>

      {/* Selection Outer Circle Indicator */}
      <div
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "50%",
          border: isSelected ? `2px solid ${accent.hex}` : "1px solid rgba(255,255,255,0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isSelected && (
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: accent.hex,
            }}
          />
        )}
      </div>

      {/* Accent Indicator Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "14px",
          right: "14px",
          height: "3px",
          borderRadius: "3px 3px 0 0",
          background: accent.hex,
          opacity: isSelected ? 1 : 0.4,
        }}
      />
    </motion.button>
  );
}

interface AccentSelectorProps {
  currentAccent: string;
  onAccentChange: (hex: string) => void;
}

export function AccentSelector({ currentAccent, onAccentChange }: AccentSelectorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
          Accent Color
        </h4>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#9AA4B2" }}>
          Set the primary color across Journey
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Accent color selection"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "12px",
        }}
      >
        {Object.values(ACCENTS).map((acc) => (
          <AccentCard
            key={acc.id}
            accent={acc}
            isSelected={currentAccent.toLowerCase() === acc.hex.toLowerCase()}
            onSelect={onAccentChange}
          />
        ))}
      </div>
    </div>
  );
}
