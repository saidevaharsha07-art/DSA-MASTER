"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SettingsHeader } from "../SettingsHeader";
import { DESIGN_TOKENS } from "@/src/design/tokens";
import { SidebarWidget } from "../appearance/SidebarWidget";
import { Cloud, Download, Upload } from "lucide-react";
import { useSettings } from "@/src/context/SettingsContext";

export function CloudSyncSettings() {
  const { settings, updateSetting, exportSettings, importSettings } = useSettings();
  const { lastSync } = settings.cloud;
  const [syncing, setSyncing] = useState(false);

  const handleSyncNow = () => {
    setSyncing(true);
    setTimeout(() => {
      updateSetting("cloud", "lastSync", new Date().toLocaleTimeString());
      setSyncing(false);
    }, 600);
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportSettings());
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `journey-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportBackup = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            importSettings(event.target.result as string);
            alert("Backup restored successfully!");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const syncItems = [
    { title: "Progress & Stats", desc: "Problems, progress, streaks and statistics", status: "Synced" },
    { title: "Settings & Preferences", desc: "All your settings and customizations", status: "Synced" },
    { title: "Learning Data", desc: "Spaced repetition, memory and reviews", status: "Synced" },
    { title: "Bookmarks & Notes", desc: "Saved problems and personal notes", status: "Synced" },
    { title: "Achievements", desc: "Badges, milestones and rewards", status: "Synced" },
  ];

  const devices = [
    { name: "Current Device", subtitle: "Active Now", os: "Local Desktop", active: true },
    { name: "Mobile Sync", subtitle: "Active 5 mins ago", os: "Web Application", active: false },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Shared Global Header */}
      <SettingsHeader
        emoji="☁️"
        title="Cloud Sync"
        subtitle="Backup your data and sync across all your devices."
      />

      {/* Main Grid Layout */}
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
          {/* Section 1: Top 2-Column Grid (Sync Status Card & Sync Overview Grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Sync Status Card */}
            <div
              style={{
                background: "var(--card)",
                backdropFilter: "blur(var(--glass-blur))",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "var(--radius)",
                padding: "24px",
                boxShadow: DESIGN_TOKENS.shadows.card,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "12px",
              }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981", boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}>
                <Cloud size={28} />
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                  {syncing ? "Syncing Data..." : "Cloud Sync Active"}
                </h4>
                <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "var(--text-secondary)" }}>
                  Your data is safe and up to date.
                </p>
                <span style={{ fontSize: "10px", color: "var(--text-muted)", display: "block", marginTop: "2px" }}>
                  Last synced: {lastSync || "Just Now"}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSyncNow}
                style={{
                  padding: "8px 20px",
                  borderRadius: "10px",
                  background: "var(--primary)",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "4px",
                }}
              >
                {syncing ? "Syncing..." : "Sync Now"}
              </button>
            </div>

            {/* Sync Overview 2x2 Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-primary)" }}>21.4 KB</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Total Data</span>
              </div>

              <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#10B981" }}>100%</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Sync Health</span>
              </div>

              <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#3B82F6" }}>2</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Devices</span>
              </div>

              <div style={{ padding: "16px", borderRadius: "16px", background: "var(--card)", backdropFilter: "blur(var(--glass-blur))", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "20px", fontWeight: 800, color: "#F59E0B" }}>1,248</span>
                <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>Items Synced</span>
              </div>
            </div>
          </div>

          {/* Section 2: Bottom 2-Column Grid (What We Sync & Backup Management) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Left Card: What We Sync */}
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
                What We Sync
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {syncItems.map((item) => (
                  <div key={item.title} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "8px", borderBottom: "1px solid var(--border)" }}>
                    <div>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-primary)", display: "block" }}>{item.title}</span>
                      <span style={{ fontSize: "10px", color: "var(--text-secondary)" }}>{item.desc}</span>
                    </div>
                    <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 600 }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Connected Devices & Backup Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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
                  gap: "14px",
                }}
              >
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "var(--text-primary)" }}>
                  Backup Management
                </h4>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Download size={14} /> Export Backup
                  </button>
                  <button
                    type="button"
                    onClick={handleImportBackup}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-primary)",
                      fontSize: "11px",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Upload size={14} /> Restore Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar (380px) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Storage Usage Gauge */}
          <SidebarWidget title="Storage Usage">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "16px", fontWeight: 800, color: "var(--text-primary)" }}>Local Storage Bound</span>
              <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 600 }}>Sync Ready</span>
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
              src="/assets/settings/sky_archive.jpg"
              alt="Sky Archive artwork"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(9, 11, 20, 0.85) 0%, rgba(10, 20, 38, 0.8) 60%, var(--primary-soft) 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: "20px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <p style={{ margin: 0, fontSize: "12px", fontStyle: "italic", fontWeight: 500, color: "#FFFFFF", lineHeight: 1.5, textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
                &ldquo;Your journey, always with you. Anywhere, any device.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
