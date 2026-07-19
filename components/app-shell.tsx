"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  Sun,
  Moon,
  Laptop,
  Flame,
  Bell,
  Search,
  Menu,
  X,
} from "lucide-react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";

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
  ["Profile", "/profile", UserRound],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state: roadmapState, ready: roadmapReady, error, retry } = useRoadmap();
  const { state: codeforcesState, ready: codeforcesReady } = useCodeforces();

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (saved) setTheme(saved);
  }, []);

  // Update theme classes on document
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const applyTheme = () => {
      let isDark = false;
      if (theme === "dark") {
        isDark = true;
      } else if (theme === "system") {
        isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      }
      document.documentElement.classList.toggle("dark", isDark);
    };
    applyTheme();

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const listener = () => {
        document.documentElement.classList.toggle("dark", mediaQuery.matches);
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    }
  }, [theme]);

  // Calculate streak based on completed problems
  const totalSolved = (roadmapState?.completed?.length ?? 0) + (codeforcesState?.completed?.length ?? 0);
  const streak = totalSolved > 0 ? Math.min(15, Math.max(1, Math.floor(totalSolved / 2.5))) : 0;

  const isReady = roadmapReady && codeforcesReady;

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
        <header className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              className="button ghost"
              style={{ padding: 8 }}
              id="open-sidebar-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 12,
                  color: "var(--muted)",
                  pointerEvents: "none",
                }}
              />
              <input
                type="text"
                placeholder="Quick search (e.g. Arrays, Two Pointers)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: "8px 12px 8px 36px",
                  borderRadius: "99px",
                  border: "1px solid var(--border)",
                  background: "var(--background)",
                  fontSize: 13,
                  outline: "none",
                  width: "240px",
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Streak Counter */}
            {isReady && streak > 0 && (
              <div
                title="Current active practice streak"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(249, 115, 22, 0.1)",
                  color: "rgb(249, 115, 22)",
                  padding: "6px 12px",
                  borderRadius: "99px",
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                <Flame size={16} fill="currentColor" />
                <span>{streak}d Streak</span>
              </div>
            )}

            {/* Theme Toggle dropdown */}
            <div style={{ display: "flex", background: "var(--muted-bg)", padding: 3, borderRadius: 8 }}>
              {(["light", "dark", "system"] as const).map((t) => {
                const Icon = t === "light" ? Sun : t === "dark" ? Moon : Laptop;
                const active = theme === t;
                return (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    title={`Set theme to ${t}`}
                    style={{
                      background: active ? "var(--card)" : "transparent",
                      border: 0,
                      cursor: "pointer",
                      padding: "6px 8px",
                      borderRadius: 6,
                      color: active ? "var(--primary)" : "var(--muted)",
                      display: "flex",
                      alignItems: "center",
                      transition: "var(--transition)",
                    }}
                  >
                    <Icon size={14} />
                  </button>
                );
              })}
            </div>

            {/* Notifications Placeholder */}
            <button
              className="button ghost"
              style={{ padding: 8, borderRadius: "50%", position: "relative" }}
              title="Notifications"
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

            {/* Profile Placeholder */}
            <Link
              href="/profile"
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
                  background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)",
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

        {/* Dynamic Page content */}
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
            children
          )}
        </main>
      </div>
    </div>
  );
}
