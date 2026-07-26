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
    bgDark: "#090B14",
    bgGradient: "radial-gradient(ellipse at 50% 0%, #141A2D 0%, #090B14 70%)",
    panelBg: "rgba(18, 22, 38, 0.72)",
    border: "rgba(255, 255, 255, 0.08)",
    glow: "rgba(124, 77, 255, 0.15)",
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    artwork: "/assets/settings/theme_midnight.jpg",
    bgDark: "#050914",
    bgGradient: "radial-gradient(ellipse at 50% 0%, #0C1A38 0%, #050914 70%)",
    panelBg: "rgba(12, 22, 45, 0.75)",
    border: "rgba(78, 168, 255, 0.15)",
    glow: "rgba(78, 168, 255, 0.2)",
  },
  oled: {
    id: "oled",
    name: "OLED",
    artwork: "/assets/settings/theme_oled.jpg",
    bgDark: "#000000",
    bgGradient: "radial-gradient(circle at 50% 20%, #120428 0%, #000000 80%)",
    panelBg: "rgba(15, 10, 25, 0.85)",
    border: "rgba(168, 85, 247, 0.2)",
    glow: "rgba(168, 85, 247, 0.25)",
  },
  fantasy: {
    id: "fantasy",
    name: "Fantasy",
    artwork: "/assets/settings/theme_fantasy.jpg",
    bgDark: "#120B05",
    bgGradient: "radial-gradient(ellipse at 50% 0%, #2A1708 0%, #120B05 70%)",
    panelBg: "rgba(35, 22, 12, 0.78)",
    border: "rgba(245, 158, 11, 0.18)",
    glow: "rgba(245, 158, 11, 0.22)",
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
    background: "#090B14",
    panel: "rgba(18, 22, 38, 0.72)",
    panelSolid: "#0F1325",
    border: "rgba(255, 255, 255, 0.08)",
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
