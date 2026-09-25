"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRoadmap } from "@frontend/hooks/use-roadmap";
import { useCodeforces } from "@frontend/hooks/use-codeforces";
import { Sidebar, NAV_SECTIONS } from "./Sidebar";
import { Navbar } from "./Navbar";
import { CommandPalette } from "./CommandPalette";
import { OracleMentorModal } from "@frontend/components/ai/oracle/OracleMentorModal";
import { useSettings } from "@/src/context/SettingsContext";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { settings, updateSetting } = useSettings();
  const { state: roadmapState } = useRoadmap();
  const { state: codeforcesState } = useCodeforces();

  const currentTheme = settings.appearance.theme === "light" ? "light" : "dark";
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedSidebar = localStorage.getItem("sidebarExpanded");
    if (savedSidebar !== null) setSidebarExpanded(savedSidebar === "true");
  }, []);

  const toggleSidebarExpand = () => {
    const nextState = !sidebarExpanded;
    setSidebarExpanded(nextState);
    localStorage.setItem("sidebarExpanded", String(nextState));
  };

  const handleThemeChange = (nextTheme: "light" | "dark") => {
    updateSetting("appearance", "theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {}
  };

  const isProblemDetailPage =
    !!pathname &&
    pathname.startsWith("/practice/") &&
    pathname !== "/practice" &&
    pathname !== "/practice/codechef";

  if (isProblemDetailPage) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <main
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            overflow: "hidden",
            backgroundColor: "var(--background)",
          }}
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {sidebarMobileOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
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
        pathname={pathname ?? ""}
        navSections={NAV_SECTIONS}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Navbar
          onMenuClick={() => setSidebarMobileOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={currentTheme}
          onThemeChange={handleThemeChange}
        />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            backgroundColor: "var(--background)",
          }}
        >
          {children}
        </main>
      </div>

      <CommandPalette />
      <OracleMentorModal />
    </div>
  );
}
