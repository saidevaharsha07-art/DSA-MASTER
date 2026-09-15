"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Centralized Settings State Interface ---
export interface AppearanceSettingsState {
  theme: "dark" | "light";
  accentColor: "purple" | "ocean" | "blue" | "emerald" | "golden" | "gold" | "rose" | "pink" | string;
  radius: "small" | "medium" | "large";
  animations: "minimal" | "balanced" | "rich";
  transparency: number;
  blur: number;
  glow: number;
  fontFamily: string;
  sidebarStyle: "compact" | "expanded";
  uiDensity: "compact" | "balanced" | "comfortable";
  reduceMotion: boolean;
}

export interface LearningEngineSettingsState {
  reviewMode: string;
  reviewCount: number;
  masteryThreshold: number;
  forgettingCurve: string;
  hintFrequency: string;
}

export interface PracticeSettingsState {
  preferredPlatform: string;
  preferredDifficulty: string;
  timerEnabled: boolean;
  showEditorial: boolean;
  skipSolved: boolean;
  dailyGoal: number;
}

export interface GoalsSettingsState {
  dailyTarget: number;
  weeklyTarget: number;
  monthlyTarget: number;
  missionDifficulty: string;
}

export interface RevisionSettingsState {
  reviewOrder: string;
  reviewAlgorithm: string;
  revisionPerDay: number;
  memoryStrength: number;
}

export interface NotificationsSettingsState {
  notificationChannels: {
    inApp: boolean;
    email: boolean;
    push: boolean;
    sms: boolean;
    discord: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
    weekendOverride: boolean;
  };
  notificationCategories: {
    dailyReminders: boolean;
    spacedRepetition: boolean;
    practiceUpdates: boolean;
    achievements: boolean;
    contestAlerts: boolean;
    systemUpdates: boolean;
  };
}

export interface IntegrationsSettingsState {
  leetcode: { connected: boolean; username: string };
  codeforces: { connected: boolean; username: string };
  github: { connected: boolean; username: string };
  codechef: { connected: boolean; username: string };
  gfg: { connected: boolean; username: string };
}

export interface CloudSettingsState {
  autoSync: boolean;
  backgroundSync: boolean;
  lastSync: string;
}

export interface PrivacySettingsState {
  profileVisibility: "public" | "private" | "only_me";
  anonymousMode: boolean;
  analyticsEnabled: boolean;
  leaderboardsVisible: boolean;
}

export interface PerformanceSettingsState {
  particleEffects: boolean;
  fpsLimit: number;
  renderQuality: "low" | "medium" | "high" | "ultra";
  imageQuality: "standard" | "hd" | "ultra_hd";
}

export interface AdvancedSettingsState {
  developerMode: boolean;
  debugLogs: boolean;
  resetTutorial: boolean;
}

export interface JourneySettings {
  appearance: AppearanceSettingsState;
  learningEngine: LearningEngineSettingsState;
  practice: PracticeSettingsState;
  goals: GoalsSettingsState;
  revision: RevisionSettingsState;
  notifications: NotificationsSettingsState;
  integrations: IntegrationsSettingsState;
  cloud: CloudSettingsState;
  privacy: PrivacySettingsState;
  performance: PerformanceSettingsState;
  advanced: AdvancedSettingsState;
}

// --- Default Settings ---
export const DEFAULT_SETTINGS: JourneySettings = {
  appearance: {
    theme: "dark",
    accentColor: "#10B981",
    radius: "medium",
    animations: "balanced",
    transparency: 72,
    blur: 20,
    glow: 50,
    fontFamily: "Inter",
    sidebarStyle: "expanded",
    uiDensity: "balanced",
    reduceMotion: false,
  },
  learningEngine: {
    reviewMode: "spaced",
    reviewCount: 15,
    masteryThreshold: 85,
    forgettingCurve: "standard",
    hintFrequency: "medium",
  },
  practice: {
    preferredPlatform: "leetcode",
    preferredDifficulty: "all",
    timerEnabled: true,
    showEditorial: true,
    skipSolved: false,
    dailyGoal: 3,
  },
  goals: {
    dailyTarget: 3,
    weeklyTarget: 15,
    monthlyTarget: 50,
    missionDifficulty: "standard",
  },
  revision: {
    reviewOrder: "priority",
    reviewAlgorithm: "fibonacci",
    revisionPerDay: 10,
    memoryStrength: 90,
  },
  notifications: {
    notificationChannels: {
      inApp: true,
      email: true,
      push: true,
      sms: false,
      discord: false,
    },
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "07:00",
      weekendOverride: false,
    },
    notificationCategories: {
      dailyReminders: true,
      spacedRepetition: true,
      practiceUpdates: true,
      achievements: true,
      contestAlerts: true,
      systemUpdates: true,
    },
  },
  integrations: {
    leetcode: { connected: true, username: "harsha_01" },
    codeforces: { connected: true, username: "harsha_01" },
    github: { connected: true, username: "harsha_dev" },
    codechef: { connected: true, username: "harsha_01" },
    gfg: { connected: false, username: "" },
  },
  cloud: {
    autoSync: true,
    backgroundSync: true,
    lastSync: new Date().toISOString(),
  },
  privacy: {
    profileVisibility: "public",
    anonymousMode: false,
    analyticsEnabled: true,
    leaderboardsVisible: true,
  },
  performance: {
    particleEffects: true,
    fpsLimit: 120,
    renderQuality: "ultra",
    imageQuality: "ultra_hd",
  },
  advanced: {
    developerMode: true,
    debugLogs: false,
    resetTutorial: false,
  },
};

// --- Context Interface ---
export interface SettingsContextType {
  settings: JourneySettings;
  updateSetting: <
    S extends keyof JourneySettings,
    K extends keyof JourneySettings[S]
  >(
    section: S,
    key: K,
    value: JourneySettings[S][K]
  ) => void;
  resetSection: (section: keyof JourneySettings) => void;
  resetAllSettings: () => void;
  exportSettings: () => string;
  importSettings: (jsonString: string) => boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "journey-settings";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<JourneySettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings((prev) => ({
          ...prev,
          ...parsed,
          appearance: { ...prev.appearance, ...parsed.appearance },
          learningEngine: { ...prev.learningEngine, ...parsed.learningEngine },
          practice: { ...prev.practice, ...parsed.practice },
          goals: { ...prev.goals, ...parsed.goals },
          revision: { ...prev.revision, ...parsed.revision },
          notifications: { ...prev.notifications, ...parsed.notifications },
          integrations: { ...prev.integrations, ...parsed.integrations },
          cloud: { ...prev.cloud, ...parsed.cloud },
          privacy: { ...prev.privacy, ...parsed.privacy },
          performance: { ...prev.performance, ...parsed.performance },
          advanced: { ...prev.advanced, ...parsed.advanced },
        }));
      }
    } catch (err) {
      console.error("Failed to load journey-settings from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save automatically into localStorage when settings change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settings));
      } catch (err) {
        console.error("Failed to save journey-settings to localStorage:", err);
      }
    }
  }, [settings, isLoaded]);

  // Apply Appearance CSS Variables Dynamically to Document Root & Body
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const body = document.body;
    const app = settings.appearance;

    // 1. Theme Variables Mapping (Strictly Binary: Light ↔ Dark)
    const isLightTheme = app.theme === "light";
    const theme = isLightTheme ? "light" : "dark";
    root.setAttribute("data-theme", theme);
    if (isLightTheme) {
      root.classList.remove("dark");
      root.classList.add("light");
      body.className = "light";

      // Vibrant, Clean Light Theme (No pure black / dark panels anywhere)
      root.style.setProperty("--background", "#F5F7FB");
      root.style.setProperty("--background-secondary", "#EEF2F6");
      root.style.setProperty("--surface", "#FFFFFF");
      root.style.setProperty("--surface-secondary", "#F8FAFC");
      root.style.setProperty("--surface-hover", "#F1F5F9");
      root.style.setProperty("--card", "#FFFFFF");
      root.style.setProperty("--card-hover", "#F8FAFC");
      root.style.setProperty("--sidebar", "#FFFFFF");
      root.style.setProperty("--sidebar-hover", "#F8FAFC");
      root.style.setProperty("--header", "rgba(255, 255, 255, 0.96)");
      root.style.setProperty("--panel", "#FFFFFF");
      root.style.setProperty("--border", "#E2E8F0");
      root.style.setProperty("--border-subtle", "#F1F5F9");
      root.style.setProperty("--text-primary", "#0F172A");
      root.style.setProperty("--text-secondary", "#475569");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--foreground", "#0F172A");
      root.style.setProperty("--muted", "#475569");
      root.style.setProperty("--muted-bg", "rgba(15, 23, 42, 0.05)");
      root.style.setProperty("--hero-gradient", "linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)");
      root.style.setProperty("--modal-bg", "#FFFFFF");
      root.style.setProperty("--input-bg", "#FFFFFF");
      root.style.setProperty("--input-border", "#CBD5E1");
      root.style.setProperty("--card-shadow", "0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.03)");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
      body.className = "dark";

      // Sophisticated Dark Slate Navy Theme (No pure black / #000 / #070512)
      root.style.setProperty("--background", "#0F172A");
      root.style.setProperty("--background-secondary", "#0B1120");
      root.style.setProperty("--surface", "#1E293B");
      root.style.setProperty("--surface-secondary", "#243044");
      root.style.setProperty("--surface-hover", "#2E3D56");
      root.style.setProperty("--card", "rgba(30, 41, 59, 0.88)");
      root.style.setProperty("--card-hover", "rgba(45, 59, 85, 0.92)");
      root.style.setProperty("--sidebar", "#111827");
      root.style.setProperty("--sidebar-hover", "#1E293B");
      root.style.setProperty("--header", "rgba(15, 23, 42, 0.95)");
      root.style.setProperty("--panel", "rgba(30, 41, 59, 0.92)");
      root.style.setProperty("--border", "rgba(148, 163, 184, 0.14)");
      root.style.setProperty("--border-subtle", "rgba(148, 163, 184, 0.08)");
      root.style.setProperty("--text-primary", "#F8FAFC");
      root.style.setProperty("--text-secondary", "#94A3B8");
      root.style.setProperty("--text-muted", "#64748B");
      root.style.setProperty("--foreground", "#F8FAFC");
      root.style.setProperty("--muted", "#94A3B8");
      root.style.setProperty("--muted-bg", "rgba(148, 163, 184, 0.08)");
      root.style.setProperty("--hero-gradient", "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)");
      root.style.setProperty("--modal-bg", "#1E293B");
      root.style.setProperty("--input-bg", "rgba(15, 23, 42, 0.65)");
      root.style.setProperty("--input-border", "rgba(148, 163, 184, 0.2)");
      root.style.setProperty("--card-shadow", "0 14px 40px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.3)");
    }

    // 2. Centralized Accent Color Palette Engine
    const rawAccent = (app.accentColor || "emerald").toLowerCase();

    const parseHexToRgb = (h: string) => {
      const clean = h.replace("#", "");
      if (clean.length === 3) {
        return {
          r: parseInt(clean[0] + clean[0], 16),
          g: parseInt(clean[1] + clean[1], 16),
          b: parseInt(clean[2] + clean[2], 16),
        };
      }
      if (clean.length === 6) {
        return {
          r: parseInt(clean.substring(0, 2), 16),
          g: parseInt(clean.substring(2, 4), 16),
          b: parseInt(clean.substring(4, 6), 16),
        };
      }
      return { r: 16, g: 185, b: 129 };
    };

    interface AccentDef {
      primary: string;
      secondary: string;
      hover: string;
      soft: string;
      border: string;
      glow: string;
      text: string;
    }

    let accentDef: AccentDef;

    if (rawAccent === "emerald" || rawAccent === "#10b981") {
      accentDef = isLightTheme
        ? {
            primary: "#10B981",
            secondary: "#059669",
            hover: "#059669",
            soft: "rgba(16, 185, 129, 0.12)",
            border: "rgba(16, 185, 129, 0.35)",
            glow: "rgba(16, 185, 129, 0.35)",
            text: "#047857",
          }
        : {
            primary: "#10B981",
            secondary: "#34D399",
            hover: "#34D399",
            soft: "rgba(16, 185, 129, 0.2)",
            border: "rgba(16, 185, 129, 0.35)",
            glow: "rgba(16, 185, 129, 0.4)",
            text: "#34D399",
          };
    } else if (
      rawAccent === "ocean" ||
      rawAccent === "blue" ||
      rawAccent === "#38bdf8" ||
      rawAccent === "#0284c7" ||
      rawAccent === "#3182ce"
    ) {
      accentDef = isLightTheme
        ? {
            primary: "#0284C7",
            secondary: "#0369A1",
            hover: "#0369A1",
            soft: "rgba(2, 132, 199, 0.12)",
            border: "rgba(2, 132, 199, 0.35)",
            glow: "rgba(2, 132, 199, 0.35)",
            text: "#0284C7",
          }
        : {
            primary: "#38BDF8",
            secondary: "#60A5FA",
            hover: "#60A5FA",
            soft: "rgba(56, 189, 248, 0.2)",
            border: "rgba(56, 189, 248, 0.35)",
            glow: "rgba(56, 189, 248, 0.4)",
            text: "#38BDF8",
          };
    } else if (
      rawAccent === "purple" ||
      rawAccent === "#8b5cf6" ||
      rawAccent === "#7c4dff" ||
      rawAccent === "#a855f7"
    ) {
      accentDef = isLightTheme
        ? {
            primary: "#7C3AED",
            secondary: "#6D28D9",
            hover: "#6D28D9",
            soft: "rgba(124, 58, 237, 0.12)",
            border: "rgba(124, 58, 237, 0.35)",
            glow: "rgba(124, 58, 237, 0.35)",
            text: "#6D28D9",
          }
        : {
            primary: "#8B5CF6",
            secondary: "#A78BFA",
            hover: "#A78BFA",
            soft: "rgba(139, 92, 246, 0.2)",
            border: "rgba(139, 92, 246, 0.35)",
            glow: "rgba(139, 92, 246, 0.4)",
            text: "#A78BFA",
          };
    } else if (
      rawAccent === "golden" ||
      rawAccent === "gold" ||
      rawAccent === "#f59e0b" ||
      rawAccent === "#d97706"
    ) {
      accentDef = isLightTheme
        ? {
            primary: "#D97706",
            secondary: "#B45309",
            hover: "#B45309",
            soft: "rgba(217, 119, 6, 0.12)",
            border: "rgba(217, 119, 6, 0.35)",
            glow: "rgba(217, 119, 6, 0.35)",
            text: "#B45309",
          }
        : {
            primary: "#F59E0B",
            secondary: "#FBBF24",
            hover: "#FBBF24",
            soft: "rgba(245, 158, 11, 0.2)",
            border: "rgba(245, 158, 11, 0.35)",
            glow: "rgba(245, 158, 11, 0.4)",
            text: "#FBBF24",
          };
    } else if (
      rawAccent === "rose" ||
      rawAccent === "pink" ||
      rawAccent === "#ec4899" ||
      rawAccent === "#db2777"
    ) {
      accentDef = isLightTheme
        ? {
            primary: "#DB2777",
            secondary: "#BE185D",
            hover: "#BE185D",
            soft: "rgba(219, 39, 119, 0.12)",
            border: "rgba(219, 39, 119, 0.35)",
            glow: "rgba(219, 39, 119, 0.35)",
            text: "#BE185D",
          }
        : {
            primary: "#EC4899",
            secondary: "#F472B6",
            hover: "#F472B6",
            soft: "rgba(236, 72, 153, 0.2)",
            border: "rgba(236, 72, 153, 0.35)",
            glow: "rgba(236, 72, 153, 0.4)",
            text: "#F472B6",
          };
    } else {
      // Custom Hex Fallback
      const hex = rawAccent.startsWith("#") ? rawAccent : "#10B981";
      const rgbObj = parseHexToRgb(hex);
      accentDef = {
        primary: hex,
        secondary: hex,
        hover: isLightTheme ? hex : `rgb(${Math.min(255, rgbObj.r + 30)}, ${Math.min(255, rgbObj.g + 30)}, ${Math.min(255, rgbObj.b + 30)})`,
        soft: isLightTheme ? `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.12)` : `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.2)`,
        border: `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.35)`,
        glow: `rgba(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}, 0.38)`,
        text: isLightTheme ? hex : `rgb(${Math.min(255, rgbObj.r + 30)}, ${Math.min(255, rgbObj.g + 30)}, ${Math.min(255, rgbObj.b + 30)})`,
      };
    }

    const rgb = parseHexToRgb(accentDef.primary);

    // Apply complete suite of Accent CSS variables to :root
    root.style.setProperty("--primary", accentDef.primary);
    root.style.setProperty("--primary-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    root.style.setProperty("--primary-hover", accentDef.hover);
    root.style.setProperty("--primary-bg", accentDef.soft);
    root.style.setProperty("--primary-soft", accentDef.soft);
    root.style.setProperty("--primary-border", accentDef.border);

    root.style.setProperty("--accent", accentDef.primary);
    root.style.setProperty("--accent-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);
    root.style.setProperty("--accent-primary", accentDef.primary);
    root.style.setProperty("--accent-secondary", accentDef.secondary);
    root.style.setProperty("--accent-soft", accentDef.soft);
    root.style.setProperty("--accent-border", accentDef.border);
    root.style.setProperty("--accent-glow", accentDef.glow);
    root.style.setProperty("--accent-text", accentDef.text);

    root.style.setProperty("--border-active", accentDef.primary);
    root.style.setProperty("--panel-border", accentDef.border);
    root.style.setProperty("--panel-border-hover", accentDef.glow);

    // 3. Card Radius
    const radiusMap: Record<string, string> = { small: "8px", medium: "16px", large: "24px" };
    const rVal = radiusMap[app.radius] || "16px";
    root.style.setProperty("--radius", rVal);
    root.style.setProperty("--border-radius", rVal);

    // 4. Glass Transparency, Blur, Glow
    const opacityVal = Math.max(0.05, (app.transparency ?? 72) / 100);
    root.style.setProperty("--glass-opacity", opacityVal.toString());
    root.style.setProperty("--glass-blur", `${app.blur ?? 20}px`);
    const glowVal = (app.glow ?? 50) / 100;
    root.style.setProperty("--glow-strength", glowVal.toString());

    // 5. Font Family
    const fontMap: Record<string, string> = {
      Inter: "'Inter', system-ui, -apple-system, sans-serif",
      Outfit: "'Outfit', system-ui, sans-serif",
      Roboto: "'Roboto', system-ui, sans-serif",
      "Fira Code": "'Fira Code', monospace",
    };
    const selectedFont = fontMap[app.fontFamily] || "'Inter', system-ui, sans-serif";
    root.style.setProperty("--font-sans", selectedFont);
    body.style.fontFamily = selectedFont;

    // 6. Sidebar Style & UI Density
    root.style.setProperty("--sidebar-width", app.sidebarStyle === "compact" ? "80px" : "280px");
    const densityMap: Record<string, string> = { compact: "8px", balanced: "16px", comfortable: "24px" };
    root.style.setProperty("--ui-density", densityMap[app.uiDensity] || "16px");

    // 7. Animations & Reduce Motion
    if (app.reduceMotion) {
      root.style.setProperty("--transition-speed", "0ms");
      body.classList.add("reduce-motion");
    } else {
      body.classList.remove("reduce-motion");
      const speedMap: Record<string, string> = { minimal: "100ms", balanced: "250ms", rich: "400ms" };
      root.style.setProperty("--transition-speed", speedMap[app.animations] || "250ms");
    }
  }, [settings.appearance]);

  // Functions
  const updateSetting = <
    S extends keyof JourneySettings,
    K extends keyof JourneySettings[S]
  >(
    section: S,
    key: K,
    value: JourneySettings[S][K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const resetSection = (section: keyof JourneySettings) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...DEFAULT_SETTINGS[section] },
    }));
  };

  const resetAllSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const exportSettings = (): string => {
    return JSON.stringify(settings, null, 2);
  };

  const importSettings = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      setSettings((prev) => ({
        ...prev,
        ...parsed,
      }));
      return true;
    } catch (err) {
      console.error("Invalid JSON for importSettings:", err);
      return false;
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        resetSection,
        resetAllSettings,
        exportSettings,
        importSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// Hook
export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
