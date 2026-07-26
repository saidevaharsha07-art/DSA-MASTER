"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { ToggleSwitch } from "../appearance/ToggleSwitch";
import { SidebarWidget } from "../appearance/SidebarWidget";
import {
  Bell,
  Mail,
  Smartphone,
  Flame,
  RotateCcw,
  Target,
  Award,
  Calendar,
  Sparkles,
  Check,
  ChevronDown,
} from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function NotificationsSettings() {
  const { settings, updateSetting } = useSettings();
  const { notificationChannels, quietHours, notificationCategories } = settings.notifications;

  const [selectedChannel, setSelectedChannel] = useState("in_app");

  const categories = [
    { id: "dailyReminders", title: "Daily Reminders", desc: "Daily goals, streaks and missions", schedule: "Every Day", enabled: notificationCategories.dailyReminders, icon: Flame, color: "#F59E0B" },
    { id: "spacedRepetition", title: "Spaced Repetition", desc: "Due reviews and memory alerts", schedule: "Instant", enabled: notificationCategories.spacedRepetition, icon: RotateCcw, color: "var(--primary)" },
    { id: "practiceUpdates", title: "Practice Updates", desc: "Problem hints and solutions", schedule: "Instant", enabled: notificationCategories.practiceUpdates, icon: Target, color: "#10B981" },
    { id: "achievements", title: "Achievements", desc: "Milestones and badges unlocked", schedule: "Instant", enabled: notificationCategories.achievements, icon: Award, color: "#A970FF" },
    { id: "contestAlerts", title: "Contest Alerts", desc: "Upcoming contests and results", schedule: "1 Hour Before", enabled: notificationCategories.contestAlerts, icon: Calendar, color: "#3B82F6" },
    { id: "systemUpdates", title: "System Updates", desc: "New features and announcements", schedule: "Weekly Digest", enabled: notificationCategories.systemUpdates, icon: Sparkles, color: "#EC4899" },
  ];

  const channels = [
    { id: "in_app", title: "In-App", desc: "Receive notifications inside JOURNEY", icon: Bell, active: notificationChannels.inApp },
    { id: "email", title: "Email", desc: "Receive updates via email", icon: Mail, active: notificationChannels.email },
    { id: "push", title: "Push", desc: "Push notifications on devices", icon: Bell, active: notificationChannels.push },
    { id: "sms", title: "SMS", desc: "Important alerts via SMS", icon: Smartphone, active: notificationChannels.sms },
  ];

  const handleToggleCategory = (catId: string, val: boolean) => {
    updateSetting("notifications", "notificationCategories", {
      ...notificationCategories,
      [catId]: val,
    });
  };

  const handleToggleChannel = (chId: string) => {
    setSelectedChannel(chId);
    const keyMap: Record<string, keyof typeof notificationChannels> = {
      in_app: "inApp",
      email: "email",
      push: "push",
      sms: "sms",
    };
    const targetKey = keyMap[chId];
    if (targetKey) {
      updateSetting("notifications", "notificationChannels", {
        ...notificationChannels,
        [targetKey]: !notificationChannels[targetKey],
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Settings Header */}
      <SettingsHeader
        emoji="🔔"
        title="Notifications"
        subtitle="Manage how and when JOURNEY communicates with you."
      />

      {/* Main Page Layout: Left Content & Right Sidebar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 380px",
          gap: "32px",
          alignItems: "start",
        }}
      >
        {/* Left Content Area */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Section 1: Notification Channels (4 Cards in a Row) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
              Notification Channels
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
              {channels.map((ch) => {
                const isSelected = selectedChannel === ch.id || ch.active;
                const IconComp = ch.icon;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => handleToggleChannel(ch.id)}
                    style={{
                      position: "relative",
                      padding: "16px",
                      borderRadius: "var(--radius)",
                      background: "var(--card)",
                      backdropFilter: "blur(var(--glass-blur))",
                      border: isSelected ? "2px solid var(--primary)" : "1px solid var(--border)",
                      boxShadow: isSelected ? "0 0 20px var(--primary-soft)" : "0 4px 12px rgba(0,0,0,0.3)",
                      cursor: "pointer",
                      textAlign: "left",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      height: "120px",
                      transition: "var(--transition-speed)",
                      outline: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: isSelected ? "var(--primary-soft)" : "rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "var(--primary)" : "var(--text-secondary)" }}>
                        <IconComp size={18} />
                      </div>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: isSelected ? "var(--primary)" : "rgba(255, 255, 255, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", display: "block" }}>{ch.title}</span>
                      <span style={{ fontSize: "10px", color: "var(--text-secondary)", marginTop: "2px", display: "block", lineHeight: 1.3 }}>{ch.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: 2-Column Grid (Left: Notification Categories, Right: Quiet Hours & Digest) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Card: Notification Categories */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "24px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                Notification Categories
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {categories.map((cat, idx) => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingBottom: idx === categories.length - 1 ? 0 : "12px",
                        borderBottom: idx === categories.length - 1 ? "none" : "1px solid var(--border)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(255, 255, 255, 0.06)", display: "flex", alignItems: "center", justifyContent: "center", color: cat.color }}>
                          <IconComp size={15} />
                        </div>
                        <div>
                          <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>{cat.title}</span>
                          <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{cat.desc}</span>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ position: "relative" }}>
                          <select
                            defaultValue={cat.schedule}
                            style={{
                              background: "var(--surface)",
                              border: "1px solid var(--border)",
                              borderRadius: "8px",
                              color: "var(--text-secondary)",
                              fontSize: "11px",
                              padding: "4px 20px 4px 8px",
                              appearance: "none",
                              cursor: "pointer",
                              outline: "none",
                            }}
                          >
                            <option value="Every Day">Every Day</option>
                            <option value="Instant">Instant</option>
                            <option value="1 Hour Before">1 Hour Before</option>
                            <option value="Weekly Digest">Weekly Digest</option>
                          </select>
                          <ChevronDown size={12} style={{ position: "absolute", right: "6px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", pointerEvents: "none" }} />
                        </div>

                        <ToggleSwitch
                          label=""
                          checked={cat.enabled}
                          onChange={(val) => handleToggleCategory(cat.id, val)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Stack: Quiet Hours & Digest Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Quiet Hours Card */}
              <div
                style={{
                  background: "var(--card)",
                  backdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "24px",
                  boxShadow: DESIGN_TOKENS.shadows.card,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                      Quiet Hours
                    </h4>
                    <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "var(--text-secondary)" }}>
                      Pause non-important notifications
                    </p>
                  </div>
                  <ToggleSwitch
                    label=""
                    checked={quietHours.enabled}
                    onChange={(val) => updateSetting("notifications", "quietHours", { ...quietHours, enabled: val })}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "4px" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>From</span>
                    <input
                      type="text"
                      value={quietHours.start}
                      onChange={(e) => updateSetting("notifications", "quietHours", { ...quietHours, start: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        fontSize: "12px",
                        outline: "none",
                      }}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>To</span>
                    <input
                      type="text"
                      value={quietHours.end}
                      onChange={(e) => updateSetting("notifications", "quietHours", { ...quietHours, end: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        fontSize: "12px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Digest Summary Card */}
              <div
                style={{
                  background: "var(--card)",
                  backdropFilter: "blur(var(--glass-blur))",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius)",
                  padding: "24px",
                  boxShadow: DESIGN_TOKENS.shadows.card,
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  Digest Summary
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <ToggleSwitch
                    label="Weekly Summary"
                    description="Every Sunday"
                    checked={true}
                    onChange={() => {}}
                  />
                  <ToggleSwitch
                    label="Monthly Summary"
                    description="1st of every month"
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Notification Preview */}
          <SidebarWidget title="Notification Preview">
            <div
              style={{
                position: "relative",
                height: "140px",
                borderRadius: "14px",
                background: "radial-gradient(circle at 50% 30%, var(--primary-soft) 0%, var(--background) 80%)",
                border: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--primary)", boxShadow: "0 0 20px var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF" }}>
                <Bell size={20} />
              </div>
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                {quietHours.enabled ? `Quiet Hours Active (${quietHours.start} - ${quietHours.end})` : "Notifications Active"}
              </span>
            </div>
          </SidebarWidget>

          {/* Today's Schedule */}
          <SidebarWidget title="Today's Schedule">
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { time: "10:00 AM", label: "Daily Mission Reminder" },
                { time: "01:00 PM", label: "Review Due (15)" },
                { time: "05:00 PM", label: "Practice Goal Reminder" },
                { time: "09:00 PM", label: "Daily Summary" },
              ].map((item) => (
                <div
                  key={item.time}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    borderRadius: "10px",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--primary)", background: "var(--primary-soft)", padding: "2px 6px", borderRadius: "6px" }}>{item.time}</span>
                  <span style={{ fontSize: "11px", color: "var(--text-primary)", fontWeight: 500 }}>{item.label}</span>
                </div>
              ))}
            </div>
          </SidebarWidget>

          {/* Notification Stats Gauge */}
          <SidebarWidget title="Notification Stats">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ position: "relative", width: "64px", height: "64px" }}>
                <svg width="64" height="64" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="26" stroke="var(--border)" strokeWidth="5" fill="none" />
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    stroke="#10B981"
                    strokeWidth="5"
                    fill="none"
                    strokeDasharray="163"
                    strokeDashoffset="21"
                    strokeLinecap="round"
                    transform="rotate(-90 32 32)"
                  />
                </svg>
                <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 800, color: "var(--text-primary)" }}>
                  87%
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px", fontSize: "11px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981" }} /><span style={{ color: "var(--text-secondary)" }}>Enabled: <strong style={{ color: "var(--text-primary)" }}>18</strong></span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#F59E0B" }} /><span style={{ color: "var(--text-secondary)" }}>Paused: <strong style={{ color: "var(--text-primary)" }}>3</strong></span></div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#EC4899" }} /><span style={{ color: "var(--text-secondary)" }}>Disabled: <strong style={{ color: "var(--text-primary)" }}>2</strong></span></div>
              </div>
            </div>
          </SidebarWidget>

          {/* Artwork Card */}
          <div
            style={{
              position: "relative",
              height: "170px",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: DESIGN_TOKENS.shadows.card,
            }}
          >
            <Image
              src="/assets/settings/crystal_tower.jpg"
              alt="Crystal Tower artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(20, 10, 38, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Stay informed, stay ahead. Every reminder is a step toward mastery.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
