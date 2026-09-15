"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  BookOpen,
  Code2,
  LayoutDashboard,
  Map,
  RotateCcw,
  Settings,
  Timer,
  Trophy,
  UserRound,
  Users,
  Flame,
  Bell,
  Search,
  Menu,
  X,
  Terminal,
  Zap,
} from "lucide-react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { useSettings } from "@/src/context/SettingsContext";
import { useToast } from "@/src/context/ToastContext";
import { CommandPaletteModal } from "@/components/ui/CommandPaletteModal";

const nav = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Problems", "/problems", Code2],
  ["Roadmap", "/roadmap", Map],
  ["Practice", "/practice", BookOpen],
  ["Revision", "/revision", RotateCcw],
  ["Mock Test", "/mock-test", Timer],
  ["Interview Mode", "/interview", Users],
  ["Statistics", "/statistics", BarChart3],
  ["Achievements", "/achievements", Trophy],
  ["Settings", "/settings", Settings],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { ready: roadmapReady, error, retry } = useRoadmap();
  const { ready: codeforcesReady } = useCodeforces();
  const { settings, updateSetting } = useSettings();
  const { toast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const isReady = roadmapReady && codeforcesReady;
  const currentTheme = settings.appearance.theme;
  const developerMode = settings.advanced.developerMode;

  const handleThemeChange = (t: any) => {
    updateSetting("appearance", "theme", t);
    toast(`Theme changed to ${t}`, "info");
  };

  return (
    <div className="shell">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 45,
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Command Palette Modal */}
      <CommandPaletteModal isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div>
          <div className="brand" style={{ justifyContent: "space-between" }}>
            <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Code2 size={24} style={{ color: "var(--primary)" }} />
              <span>
                DSA <i>MASTER</i>
              </span>
            </Link>
            <button
              className="button ghost"
              style={{ padding: 4 }}
              id="close-sidebar-btn"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <nav className="nav">
            {nav.map(([name, href, Icon]) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "active" : ""}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={16} style={{ marginRight: 10 }} />
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div style={{ padding: "0 12px" }}>
          <div
            className="row muted"
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: 16,
              fontSize: 12,
            }}
          >
            <span>v1.2.0</span>
            <span>Local-first</span>
          </div>
        </div>
      </aside>

      {/* Main Content Pane */}
      <div className="main-content">
        {/* Sticky Topbar */}
        <header className="topbar" style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="button ghost"
              style={{ padding: 8 }}
              id="open-sidebar-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Global Theme Selector */}
            <div style={{ display: "flex", background: "var(--surface)", padding: 2, borderRadius: 8, border: "1px solid var(--border)" }}>
              {(["dark", "light"] as const).map((t) => {
                const active = currentTheme === t;
                return (
                  <button
                    key={t}
                    onClick={() => handleThemeChange(t as any)}
                    title={`Set theme to ${t}`}
                    style={{
                      background: active ? "var(--primary)" : "transparent",
                      border: 0,
                      cursor: "pointer",
                      padding: "4px 8px",
                      borderRadius: 6,
                      color: active ? "#FFFFFF" : "var(--text-secondary)",
                      fontSize: "11px",
                      fontWeight: 600,
                      textTransform: "capitalize",
                      transition: "var(--transition-speed)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            {/* Notifications Button */}
            {settings.notifications.notificationChannels.inApp && (
              <button
                className="button ghost"
                style={{ padding: 8, borderRadius: "50%", position: "relative" }}
                title="Notifications Active"
                onClick={() => toast("Notifications active & up to date", "info")}
              >
                <Bell size={16} />
                <span
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--primary)",
                  }}
                />
              </button>
            )}

            {/* Profile Avatar */}
            <Link
              href="/dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "2px",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                JD
              </div>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content with Smooth Transition */}
        <main className="page">
          {!isReady ? (
            <div className="empty" style={{ minHeight: "60vh" }}>
              <div
                className="skeleton"
                style={{ width: "200px", height: "30px", marginBottom: "20px" }}
              />
              <div
                className="skeleton"
                style={{ width: "100%", height: "200px", marginBottom: "20px" }}
              />
              <div className="grid cards" style={{ width: "100%" }}>
                <div className="skeleton" style={{ height: "120px" }} />
                <div className="skeleton" style={{ height: "120px" }} />
                <div className="skeleton" style={{ height: "120px" }} />
                <div className="skeleton" style={{ height: "120px" }} />
              </div>
            </div>
          ) : error ? (
            <div className="empty" role="alert">
              <p>{error}</p>
              <button className="button" onClick={retry}>
                Try again
              </button>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeInOut" }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          )}
        </main>

        {/* Developer Mode HUD Overlay */}
        {developerMode && (
          <div
            style={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 999,
              background: "rgba(10, 14, 26, 0.92)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--primary)",
              borderRadius: 12,
              padding: "8px 14px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 11,
              fontFamily: "monospace",
              color: "var(--text-primary)",
            }}
          >
            <Terminal size={14} style={{ color: "var(--primary)" }} />
            <span><Zap size={10} style={{ color: "#10B981", display: "inline-block", verticalAlign: "middle" }} /> {settings.performance.fpsLimit} FPS</span>
            <span>•</span>
            <span>Theme: <strong>{currentTheme}</strong></span>
            <span>•</span>
            <span>Route: <strong>{pathname}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
