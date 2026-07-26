"use client";

import { useState, useEffect } from "react";
import { useRoadmap } from "@/hooks/use-roadmap";
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  Flame,
  Clock,
  RotateCcw,
  Target,
  Globe,
  Github,
  Bell,
  Volume2,
  Database,
  Lock,
  Check,
} from "lucide-react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { AppearanceSettings } from "@/components/settings/appearance/AppearanceSettings";
import { LearningEngineSettings } from "@/components/settings/learning/LearningEngineSettings";
import { PracticeSettings } from "@/components/settings/practice/PracticeSettings";
import { GoalsSettings } from "@/components/settings/goals/GoalsSettings";
import { RevisionSettings } from "@/components/settings/revision/RevisionSettings";
import { NotificationsSettings } from "@/components/settings/notifications/NotificationsSettings";
import { IntegrationsSettings } from "@/components/settings/integrations/IntegrationsSettings";
import { CloudSyncSettings } from "@/components/settings/cloud/CloudSyncSettings";
import { PrivacySettings } from "@/components/settings/privacy/PrivacySettings";
import { PerformanceSettings } from "@/components/settings/performance/PerformanceSettings";
import { AdvancedSettings } from "@/components/settings/advanced/AdvancedSettings";
import { GenericSettingsPanel } from "@/components/settings/GenericSettingsPanel";

export default function SettingsPage() {
  const { state: lcState, setDailyGoal, ready: lcReady } = useRoadmap();

  // Settings Tabs: appearance | learning | practice | goals | revision | integrations
  const [activeTab, setActiveTab] = useState<string>("appearance");

  // State values synchronized with localStorage / context
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [accentColor, setAccentColor] = useState("#f89f1b");
  const [weeklyGoal, setWeeklyGoal] = useState(15);
  const [defaultPlatform, setDefaultPlatform] = useState("leetcode");
  const [autoSchedule, setAutoSchedule] = useState(true);
  const [intervalStrategy, setIntervalStrategy] = useState("fibonacci");
  const [soundAlert, setSoundAlert] = useState(true);
  const [emailSummary, setEmailSummary] = useState(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark" | "system") || "system";
    const savedAccent = localStorage.getItem("accent-color") || "#f89f1b";
    const savedWeekly = Number(localStorage.getItem("dsa-weekly-goal") || "15");
    const savedPlatform = localStorage.getItem("dsa-default-platform") || "leetcode";
    const savedAutoSchedule = localStorage.getItem("dsa-auto-schedule") !== "false";
    const savedInterval = localStorage.getItem("dsa-interval-strategy") || "fibonacci";
    const savedSound = localStorage.getItem("dsa-sound-alert") !== "false";
    const savedEmail = localStorage.getItem("dsa-email-summary") === "true";

    setTheme(savedTheme);
    setAccentColor(savedAccent);
    setWeeklyGoal(savedWeekly);
    setDefaultPlatform(savedPlatform);
    setAutoSchedule(savedAutoSchedule);
    setIntervalStrategy(savedInterval);
    setSoundAlert(savedSound);
    setEmailSummary(savedEmail);
  }, []);

  // Save setters to localStorage and dispatch changes
  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new Event("theme-change"));
  };

  const handleAccentChange = (color: string) => {
    setAccentColor(color);
    localStorage.setItem("accent-color", color);
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "learning":
        return <LearningEngineSettings />;
      case "practice":
        return <PracticeSettings />;
      case "goals":
        return <GoalsSettings />;
      case "revision":
        return <RevisionSettings />;
      case "notifications":
        return <NotificationsSettings />;
      case "integrations":
        return <IntegrationsSettings />;
      case "cloud":
      case "cloud_sync":
      case "cloud-sync":
        return <CloudSyncSettings />;
      case "privacy":
        return <PrivacySettings />;
      case "performance":
        return <PerformanceSettings />;
      case "advanced":
        return <AdvancedSettings />;
      case "appearance":
      default:
        return (
          <AppearanceSettings
            theme={theme}
            onThemeChange={(t) => handleThemeChange(t as any)}
            accentColor={accentColor}
            onAccentChange={handleAccentChange}
            onResetDefaults={() => {
              handleThemeChange("dark");
              handleAccentChange("#7C4DFF");
            }}
          />
        );
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "32px",
        padding: "16px 24px 40px 24px",
        width: "100%",
        maxWidth: "100%",
        alignItems: "start",
      }}
    >
      <SettingsSidebar activeKey={activeTab} onSelect={(key) => setActiveTab(key)} />
      {renderActiveTabContent()}
    </div>
  );
}


