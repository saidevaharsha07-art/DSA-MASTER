// src/design/tokens.ts
/**
 * JOURNEY 6.0 - Centralized AAA Design Tokens
 */

export interface ThemeConfig {
  id: string;
  name: string;
  artwork: string;
  bgDark: string;
  bgGradient: string;
  panelBg: string;
  border: string;
  glow: string;
}

export const THEMES: Record<string, ThemeConfig> = {
  dark: {
    id: "dark",
    name: "Dark",
    artwork: "/assets/settings/theme_dark.jpg",
    bgDark: "#0F172A",
    bgGradient: "radial-gradient(ellipse at 50% 0%, #1E293B 0%, #0F172A 70%)",
    panelBg: "rgba(30, 41, 59, 0.88)",
    border: "rgba(148, 163, 184, 0.14)",
    glow: "rgba(56, 189, 248, 0.2)",
  },
  light: {
    id: "light",
    name: "Light",
    artwork: "/assets/settings/theme_light.jpg",
    bgDark: "#F5F7FB",
    bgGradient: "radial-gradient(ellipse at 50% 0%, #EEF2F6 0%, #F5F7FB 70%)",
    panelBg: "#FFFFFF",
    border: "#E2E8F0",
    glow: "rgba(2, 132, 199, 0.2)",
  },
};

export interface AccentConfig {
  id: string;
  name: string;
  hex: string;
  glow: string;
}

export const ACCENTS: Record<string, AccentConfig> = {
  ocean: {
    id: "ocean",
    name: "Ocean Blue",
    hex: "#3182CE",
    glow: "rgba(49, 130, 206, 0.4)",
  },
  purple: {
    id: "purple",
    name: "Royal Purple",
    hex: "#7C4DFF",
    glow: "rgba(124, 77, 255, 0.4)",
  },
  emerald: {
    id: "emerald",
    name: "Emerald",
    hex: "#10B981",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  golden: {
    id: "golden",
    name: "Golden",
    hex: "#F59E0B",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  rose: {
    id: "rose",
    name: "Rose Pink",
    hex: "#EC4899",
    glow: "rgba(236, 72, 153, 0.4)",
  },
};

export const DESIGN_TOKENS = {
  colors: {
    primary: "#7C4DFF",
    secondary: "#A970FF",
    blue: "#3B82F6",
    green: "#10B981",
    orange: "#F59E0B",
    pink: "#EC4899",
    background: "#0F172A",
    panel: "rgba(30, 41, 59, 0.88)",
    panelSolid: "#1E293B",
    border: "rgba(148, 163, 184, 0.14)",
    borderBright: "rgba(255, 255, 255, 0.2)",
    textPrimary: "#FFFFFF",
    textMuted: "#9AA4B2",
    textSubtle: "#64748B",
  },
  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    full: "9999px",
  },
  shadows: {
    card: "0 25px 80px rgba(0, 0, 0, 0.45)",
    glow: "0 0 20px rgba(124, 77, 255, 0.3)",
    innerHighlight: "inset 0 1px 1px rgba(255, 255, 255, 0.1)",
  },
  transitions: {
    default: "250ms cubic-bezier(.2,.8,.2,1)",
    fast: "150ms cubic-bezier(.2,.8,.2,1)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },
} as const;
