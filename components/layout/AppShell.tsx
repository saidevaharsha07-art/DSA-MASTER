"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Code2,
  Map,
  BookOpen,
  RotateCcw,
  Timer,
  Users,
  BarChart3,
  Trophy,
  Settings,
  UserRound,
  Compass,
  Sparkles,
} from "lucide-react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";
import { ContextPanel } from "./ContextPanel";
import { CommandPalette } from "./CommandPalette";
import { layout } from "@/src/design";

const nav = [
  ["Dashboard", "/dashboard", LayoutDashboard],
  ["Journey", "/journey", Compass],
  ["Learn", "/learn", BookOpen],
  ["Practice", "/practice", Code2],
  ["Revision", "/revision", RotateCcw],
  ["Knowledge", "/knowledge", Map],
  ["Analytics", "/analytics", BarChart3],
  ["AI Mentor", "/mentor", Sparkles],
  ["Settings", "/settings", Settings],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state: roadmapState, ready: roadmapReady } = useRoadmap();
  const { state: codeforcesState, ready: codeforcesReady } = useCodeforces();

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) setTheme(savedTheme);

    const savedSidebar = localStorage.getItem("sidebarExpanded");
    if (savedSidebar !== null) setSidebarExpanded(savedSidebar === "true");

    const handleThemeChange = () => {
      const current = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      if (current) setTheme(current);
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
  }, []);

  const toggleSidebarExpand = () => {
    const nextState = !sidebarExpanded;
    setSidebarExpanded(nextState);
    localStorage.setItem("sidebarExpanded", String(nextState));
  };

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

  const totalSolved = (roadmapState?.completed?.length ?? 0) + (codeforcesState?.completed?.length ?? 0);
  const streak = totalSolved > 0 ? Math.min(15, Math.max(1, Math.floor(totalSolved / 2.5))) : 0;
  const xp = roadmapState?.xp ?? 0;

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
    }}>
      {sidebarMobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 45,
          }}
          onClick={() => setSidebarMobileOpen(false)}
        />
      )}

      <Sidebar
        isMobileOpen={sidebarMobileOpen}
        onMobileClose={() => setSidebarMobileOpen(false)}
        isExpanded={sidebarExpanded}
        onToggleExpand={toggleSidebarExpand}
        pathname={pathname}
        nav={nav}
      />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Navbar
          onMenuClick={() => setSidebarMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onThemeChange={(t) => {
            setTheme(t);
            localStorage.setItem("theme", t);
            window.dispatchEvent(new Event("theme-change"));
          }}
          streak={streak}
          xp={xp}
        />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '80px', // For mobile nav padding
        }}>
          {children}
        </main>
      </div>

      {!pathname.startsWith("/settings") && <ContextPanel />}
      <CommandPalette />
      <MobileNav pathname={pathname} />
    </div>
  );
}
