"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { THEMES, ThemeConfig } from "@/src/design/tokens";

interface ThemeCardProps {
  theme: ThemeConfig;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ThemeCard({ theme, isSelected, onSelect }: ThemeCardProps) {
  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={isSelected}
      aria-label={`Select ${theme.name} theme`}
      onClick={() => onSelect(theme.id)}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      style={{
        position: "relative",
        height: "130px",
        borderRadius: "14px",
        overflow: "hidden",
        border: isSelected
          ? "2px solid #7C4DFF"
          : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isSelected
          ? "0 0 25px rgba(124, 77, 255, 0.4), inset 0 0 15px rgba(124, 77, 255, 0.2)"
          : "0 8px 20px rgba(0,0,0,0.3)",
        background: theme.bgDark,
        cursor: "pointer",
        outline: "none",
        textAlign: "left",
      }}
    >
      <Image
        src={theme.artwork}
        alt={`${theme.name} theme artwork`}
        fill
        sizes="(max-width: 768px) 100vw, 250px"
        style={{ objectFit: "cover", opacity: isSelected ? 0.9 : 0.7 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(9, 11, 20, 0.9) 0%, rgba(9, 11, 20, 0.2) 60%, transparent 100%)",
        }}
      />

      {/* Selection Check Circle */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: isSelected ? "#7C4DFF" : "rgba(0, 0, 0, 0.4)",
          border: isSelected ? "none" : "1px solid rgba(255, 255, 255, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FFFFFF",
          transition: "250ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {isSelected ? (
          <Check size={13} strokeWidth={3} />
        ) : (
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "transparent" }} />
        )}
      </div>

      {/* Theme Name Label */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "14px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#FFFFFF",
          textShadow: "0 2px 4px rgba(0,0,0,0.8)",
        }}
      >
        {theme.name}
      </div>
    </motion.button>
  );
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
          Theme
        </h4>
        <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#9AA4B2" }}>
          Choose your preferred theme
        </p>
      </div>

      <div
        role="radiogroup"
        aria-label="Theme selection"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
        }}
      >
        {Object.values(THEMES).map((t) => (
          <ThemeCard
            key={t.id}
            theme={t}
            isSelected={currentTheme === t.id}
            onSelect={onThemeChange}
          />
        ))}
      </div>
    </div>
  );
}
