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

export default function SettingsPage() {
  const { state: lcState, setDailyGoal, ready: lcReady } = useRoadmap();

  // Settings Tabs: appearance | goals | revision | integrations
  const [activeTab, setActiveTab] = useState<"appearance" | "goals" | "revision" | "integrations">("appearance");

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

  const handleWeeklyGoalChange = (val: number) => {
    setWeeklyGoal(val);
    localStorage.setItem("dsa-weekly-goal", String(val));
  };

  const handlePlatformChange = (platform: string) => {
    setDefaultPlatform(platform);
    localStorage.setItem("dsa-default-platform", platform);
  };

  const handleAutoScheduleChange = (val: boolean) => {
    setAutoSchedule(val);
    localStorage.setItem("dsa-auto-schedule", String(val));
  };

  const handleIntervalChange = (strategy: string) => {
    setIntervalStrategy(strategy);
    localStorage.setItem("dsa-interval-strategy", strategy);
  };

  const handleSoundChange = (val: boolean) => {
    setSoundAlert(val);
    localStorage.setItem("dsa-sound-alert", String(val));
  };

  const handleEmailChange = (val: boolean) => {
    setEmailSummary(val);
    localStorage.setItem("dsa-email-summary", String(val));
  };

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Settings size={12} /> Configuration Control
      </div>
      <h1 className="title">Platform Settings</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Configure theme defaults, daily/weekly metrics, spaced repetition algorithms, and external integrations.
      </p>

      {/* Main Settings Section Layout */}
      {/* Main Settings Section Layout */}
      <div className="settings-layout">
          {/* Left Navigation Sidebar Cards */}
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { id: "appearance", label: "Appearance", icon: Sun },
              { id: "goals", label: "Goals & Platform", icon: Target },
              { id: "revision", label: "Spaced Repetition", icon: RotateCcw },
              { id: "integrations", label: "Sync Integrations", icon: Globe },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="button ghost"
                  style={{
                    justifyContent: "flex-start",
                    background: active ? "var(--muted-bg)" : "transparent",
                    color: active ? "var(--foreground)" : "var(--muted)",
                    border: active ? "1px solid var(--border)" : "1px solid transparent",
                    padding: "10px 16px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: active ? 600 : 500,
                  }}
                >
                  <Icon size={16} style={{ marginRight: 8, color: active ? "var(--primary)" : "inherit" }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Right Pane Card container */}
          <div className="card" style={{ padding: "24px 32px", minHeight: 380 }}>
            {/* 1. Appearance Tab */}
            {activeTab === "appearance" && (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 16 }}>Appearance Settings</h3>
                <p className="muted" style={{ margin: "0 0 24px 0", fontSize: 12 }}>
                  Customize the interface theme styling and color accents.
                </p>

                {/* Theme Selector Section */}
                <div style={{ marginBottom: 28 }}>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Theme Selector
                  </label>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {[
                      { id: "light", label: "Light Mode", icon: Sun },
                      { id: "dark", label: "Dark Mode", icon: Moon },
                      { id: "system", label: "System Default", icon: Laptop },
                    ].map((item) => {
                      const active = theme === item.id;
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleThemeChange(item.id as any)}
                          className="button ghost"
                          style={{
                            flex: "1 1 120px",
                            justifyContent: "center",
                            background: active ? "var(--accent)" : "var(--muted-bg)",
                            color: active ? "var(--accent-foreground)" : "var(--foreground)",
                            border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
                            padding: "12px",
                            borderRadius: 8,
                            fontSize: 12,
                          }}
                        >
                          <ItemIcon size={14} style={{ marginRight: 6 }} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Accent Color Section */}
                <div>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 10 }}>
                    Accent Highlight Color (Future-ready UI)
                  </label>
                  <div style={{ display: "flex", gap: 14 }}>
                    {[
                      { hex: "#f89f1b", name: "Amber" },
                      { hex: "#3182ce", name: "Blue" },
                      { hex: "#a855f7", name: "Purple" },
                      { hex: "#10b981", name: "Emerald" },
                      { hex: "#ec4899", name: "Rose" },
                    ].map((color) => {
                      const active = accentColor === color.hex;
                      return (
                        <button
                          key={color.hex}
                          onClick={() => handleAccentChange(color.hex)}
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: "50%",
                            background: color.hex,
                            border: active ? "2px solid var(--foreground)" : "2px solid transparent",
                            cursor: "pointer",
                            padding: 0,
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#ffffff",
                          }}
                          title={color.name}
                        >
                          {active && <Check size={12} strokeWidth={3} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Goals & Platform Tab */}
            {activeTab === "goals" && (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 16 }}>Goals & Platform Preferences</h3>
                <p className="muted" style={{ margin: "0 0 24px 0", fontSize: 12 }}>
                  Set daily and weekly solving counts, and customize platform priorities.
                </p>

                {/* Daily Goal Editor */}
                <div style={{ marginBottom: 20 }}>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Daily Goal Count (LeetCode)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <input
                      type="number"
                      min={1}
                      max={20}
                      className="input"
                      style={{ width: 100, padding: "8px 12px" }}
                      value={lcState.dailyGoal}
                      onChange={(e) => setDailyGoal(Math.max(1, Number(e.target.value)))}
                    />
                    <span className="muted" style={{ fontSize: 12 }}>problems per day</span>
                  </div>
                </div>

                {/* Weekly Goal Editor */}
                <div style={{ marginBottom: 20 }}>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Weekly Goal Count (Combined)
                  </label>
                  <select
                    className="select"
                    style={{ width: "100%", maxWidth: 220 }}
                    value={weeklyGoal}
                    onChange={(e) => handleWeeklyGoalChange(Number(e.target.value))}
                  >
                    <option value={5}>5 solves per week</option>
                    <option value={10}>10 solves per week</option>
                    <option value={15}>15 solves per week (Standard)</option>
                    <option value={25}>25 solves per week (Intense)</option>
                    <option value={50}>50 solves per week (Competitive)</option>
                  </select>
                </div>

                {/* Default platform */}
                <div>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Preferred Practice Platform
                  </label>
                  <select
                    className="select"
                    style={{ width: "100%", maxWidth: 220 }}
                    value={defaultPlatform}
                    onChange={(e) => handlePlatformChange(e.target.value)}
                  >
                    <option value="leetcode">LeetCode (Phase 1)</option>
                    <option value="codeforces">Codeforces (Ratings)</option>
                    <option value="codechef">CodeChef (Coming Soon)</option>
                  </select>
                </div>
              </div>
            )}

            {/* 3. Spaced Repetition Tab */}
            {activeTab === "revision" && (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 16 }}>Spaced Repetition Configuration</h3>
                <p className="muted" style={{ margin: "0 0 24px 0", fontSize: 12 }}>
                  Customize the spacing intervals, default repetition behaviours, and alerts.
                </p>

                {/* Auto Schedule behavior toggle */}
                <div className="row" style={{ marginBottom: 20, justifyContent: "flex-start", gap: 12 }}>
                  <input
                    type="checkbox"
                    id="auto-sched"
                    checked={autoSchedule}
                    onChange={(e) => handleAutoScheduleChange(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <label htmlFor="auto-sched" style={{ fontSize: 13, cursor: "pointer", fontWeight: 500 }}>
                    Enable automatic queue warnings for overdue problems
                  </label>
                </div>

                {/* Spaced repetition interval Strategy */}
                <div style={{ marginBottom: 24 }}>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                    Repetition Spacing Strategy
                  </label>
                  <select
                    className="select"
                    style={{ width: "100%", maxWidth: 300 }}
                    value={intervalStrategy}
                    onChange={(e) => handleIntervalChange(e.target.value)}
                  >
                    <option value="fibonacci">Standard Fibonacci (1, 3, 7, 15, 30 days)</option>
                    <option value="accelerated">Accelerated (1, 2, 4, 8, 16 days)</option>
                    <option value="custom">Custom (Configured per challenge detail)</option>
                  </select>
                </div>

                {/* Notifications & Sounds */}
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                    Preferences & Sounds (UI only)
                  </label>
                  <div style={{ display: "grid", gap: 10 }}>
                    <div className="row" style={{ justifyContent: "flex-start", gap: 10 }}>
                      <input
                        type="checkbox"
                        id="sound-alert"
                        checked={soundAlert}
                        onChange={(e) => handleSoundChange(e.target.checked)}
                      />
                      <label htmlFor="sound-alert" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                        <Volume2 size={14} className="muted" /> Play completion chime sound effect
                      </label>
                    </div>

                    <div className="row" style={{ justifyContent: "flex-start", gap: 10 }}>
                      <input
                        type="checkbox"
                        id="email-sum"
                        checked={emailSummary}
                        onChange={(e) => handleEmailChange(e.target.checked)}
                      />
                      <label htmlFor="email-sum" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                        <Bell size={14} className="muted" /> Email weekly digest reports (Beta)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Integrations Tab */}
            {activeTab === "integrations" && (
              <div>
                <h3 style={{ margin: "0 0 4px 0", fontSize: 16 }}>Sync Integrations</h3>
                <p className="muted" style={{ margin: "0 0 24px 0", fontSize: 12 }}>
                  Sync your progress with external profiles or backup code repository folders.
                </p>

                <div style={{ display: "grid", gap: 12 }}>
                  {[
                    { id: "github", label: "GitHub Profile Sync", desc: "Auto-backup your notepad markdown comments and review records.", icon: Github },
                    { id: "leetcode", label: "LeetCode API Sync", desc: "Sync solved states directly with LeetCode sub-profiles.", icon: Globe },
                    { id: "codeforces", label: "Codeforces Handle Sync", desc: "Link handles to query latest solved contest handles.", icon: Globe },
                    { id: "codechef", label: "CodeChef Division Sync", desc: "Import profile stats and rating division levels.", icon: Globe },
                  ].map((sync) => {
                    const SyncIcon = sync.icon;
                    return (
                      <div
                        key={sync.id}
                        className="row"
                        style={{
                          padding: "12px 16px",
                          background: "var(--muted-bg)",
                          border: "1px solid var(--border)",
                          borderRadius: 8,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                            <SyncIcon size={14} />
                          </div>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 600, display: "block" }}>{sync.label}</span>
                            <span className="muted" style={{ fontSize: 11 }}>{sync.desc}</span>
                          </div>
                        </div>
                        <span className="pill" style={{ fontSize: 9, display: "inline-flex", alignItems: "center", gap: 4, background: "var(--border)" }}>
                          <Lock size={8} /> Coming Soon
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
      </div>
    </>
  );
}

