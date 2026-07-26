"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- Centralized Settings State Interface ---
export interface AppearanceSettingsState {
  theme: "dark" | "midnight" | "oled" | "fantasy";
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
    accentColor: "purple",
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

    // 1. Theme Variables Mapping
    const theme = app.theme || "dark";
    root.setAttribute("data-theme", theme);
    body.className = theme;

    if (theme === "midnight") {
      // League of Legends / Valorant Deep Navy Theme
      root.style.setProperty("--background", "#060913");
      root.style.setProperty("--background-secondary", "#090E1F");
      root.style.setProperty("--surface", "#0D1326");
      root.style.setProperty("--surface-hover", "#141D38");
      root.style.setProperty("--card", "rgba(13, 19, 38, var(--glass-opacity, 0.85))");
      root.style.setProperty("--sidebar", "rgba(8, 12, 25, var(--glass-opacity, 0.88))");
      root.style.setProperty("--header", "rgba(8, 12, 25, var(--glass-opacity, 0.88))");
      root.style.setProperty("--border", "rgba(59, 130, 246, 0.22)");
      root.style.setProperty("--text-primary", "#F0F6FF");
      root.style.setProperty("--text-secondary", "#94A3B8");
      root.style.setProperty("--text-muted", "#64748B");
    } else if (theme === "oled") {
      // Pure Black AMOLED Theme
      root.style.setProperty("--background", "#000000");
      root.style.setProperty("--background-secondary", "#050505");
      root.style.setProperty("--surface", "#0A0A0A");
      root.style.setProperty("--surface-hover", "#141414");
      root.style.setProperty("--card", "rgba(10, 10, 10, var(--glass-opacity, 0.95))");
      root.style.setProperty("--sidebar", "rgba(0, 0, 0, var(--glass-opacity, 0.98))");
      root.style.setProperty("--header", "rgba(0, 0, 0, var(--glass-opacity, 0.98))");
      root.style.setProperty("--border", "rgba(255, 255, 255, 0.14)");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#A3A3A3");
      root.style.setProperty("--text-muted", "#737373");
    } else if (theme === "fantasy") {
      // Diablo IV / RPG Magical Fantasy Theme
      root.style.setProperty("--background", "#0B0914");
      root.style.setProperty("--background-secondary", "#0E091E");
      root.style.setProperty("--surface", "#130E26");
      root.style.setProperty("--surface-hover", "#1D163A");
      root.style.setProperty("--card", "rgba(19, 14, 38, var(--glass-opacity, 0.85))");
      root.style.setProperty("--sidebar", "rgba(11, 9, 20, var(--glass-opacity, 0.9))");
      root.style.setProperty("--header", "rgba(11, 9, 20, var(--glass-opacity, 0.9))");
      root.style.setProperty("--border", "rgba(124, 77, 255, 0.28)");
      root.style.setProperty("--text-primary", "#FAF5FF");
      root.style.setProperty("--text-secondary", "#C084FC");
      root.style.setProperty("--text-muted", "#7E22CE");
    } else {
      // Dark Neutral Theme
      root.style.setProperty("--background", "#0B0E14");
      root.style.setProperty("--background-secondary", "#0F131C");
      root.style.setProperty("--surface", "#121626");
      root.style.setProperty("--surface-hover", "#1A2035");
      root.style.setProperty("--card", "rgba(18, 22, 38, var(--glass-opacity, 0.72))");
      root.style.setProperty("--sidebar", "rgba(10, 14, 26, var(--glass-opacity, 0.85))");
      root.style.setProperty("--header", "rgba(10, 14, 26, var(--glass-opacity, 0.85))");
      root.style.setProperty("--border", "rgba(255, 255, 255, 0.08)");
      root.style.setProperty("--text-primary", "#FFFFFF");
      root.style.setProperty("--text-secondary", "#9AA4B2");
      root.style.setProperty("--text-muted", "#64748B");
    }

    // 2. Accent Color Variables
    const accent = app.accentColor || "purple";
    let hex = "#7C4DFF";
    let hoverHex = "#A970FF";
    if (accent === "ocean" || accent === "blue" || accent === "#3B82F6" || accent === "#3182CE") {
      hex = "#3B82F6";
      hoverHex = "#60A5FA";
    } else if (accent === "emerald" || accent === "#10B981") {
      hex = "#10B981";
      hoverHex = "#34D399";
    } else if (accent === "golden" || accent === "gold" || accent === "#F59E0B") {
      hex = "#F59E0B";
      hoverHex = "#FBBF24";
    } else if (accent === "rose" || accent === "pink" || accent === "#EC4899") {
      hex = "#EC4899";
      hoverHex = "#F472B6";
    }

    root.style.setProperty("--primary", hex);
    root.style.setProperty("--primary-hover", hoverHex);
    root.style.setProperty("--primary-bg", `${hex}26`);
    root.style.setProperty("--primary-soft", `${hex}33`);
    root.style.setProperty("--accent-primary", hex);
    root.style.setProperty("--accent-glow", `${hex}66`);

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
