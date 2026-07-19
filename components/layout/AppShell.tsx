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
} from "lucide-react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { MobileNav } from "./MobileNav";

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
  const { state: roadmapState, ready: roadmapReady } = useRoadmap();
  const { state: codeforcesState, ready: codeforcesReady } = useCodeforces();

  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (saved) setTheme(saved);

    const handleThemeChange = () => {
      const current = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
      if (current) setTheme(current);
    };
    window.addEventListener("theme-change", handleThemeChange);
    return () => window.removeEventListener("theme-change", handleThemeChange);
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
  const xp = roadmapState?.xp ?? 0;

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

      {/* Persistent Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        pathname={pathname}
        nav={nav}
      />

      {/* Main Content Area */}
      <div className="main-content">
        {/* Sticky Header Navbar */}
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
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

        {/* Dynamic page container */}
        <main className="content" style={{ paddingBottom: 80 }}>
          {children}
        </main>
      </div>

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileNav pathname={pathname} />
    </div>
  );
}
