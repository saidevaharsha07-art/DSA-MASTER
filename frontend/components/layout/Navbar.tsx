"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  Bell,
  Search,
  Menu,
  Command,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Palette,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { radius, animations, colors } from "@/src/design";
import { Button } from "@/src/components/ui/Button";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";
import { useAuth } from "@/src/lib/auth/hooks/useAuth";

interface NavbarProps {
  onMenuClick: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  theme: "light" | "dark";
  onThemeChange: (val: "light" | "dark") => void;
}

export function Navbar({
  onMenuClick,
  searchQuery = "",
  onSearchChange,
  theme,
  onThemeChange,
}: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname() || "";
  const { isAuthenticated, user, signOut, isLoading } = useAuth();

  const [initials, setInitials] = useState("JD");
  const [displayName, setDisplayName] = useState("Developer");
  const [isFocused, setIsFocused] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      const savedName =
        localStorage.getItem("dsa-user-name") ||
        user?.displayName ||
        user?.username ||
        "Developer";
      setDisplayName(savedName);

      const calculatedInitials = savedName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
      if (calculatedInitials) {
        setInitials(calculatedInitials);
      }
    } catch {
      // ignore
    }
  }, [user]);

  // Click outside to close account menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  const handleSignOut = async () => {
    setAccountMenuOpen(false);
    try {
      await signOut();
      router.push("/login");
    } catch {
      router.push("/login");
    }
  };

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    onThemeChange(nextTheme);
  };

  // Known top routes that can safely be linked without 404 prefetching
  const topRoutes = new Set([
    "dashboard",
    "study-plan",
    "journey",
    "practice",
    "interview",
    "contest",
    "revision",
    "analytics",
    "mentor",
    "settings",
    "profile",
    "design-system",
  ]);

  // Generate dynamic breadcrumb segments from pathname safely
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = [
    { label: "DSA Magna", href: "/dashboard" },
    ...segments.map((seg, idx) => {
      const fullPath = "/" + segments.slice(0, idx + 1).join("/");
      const formatted = seg
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const isTopLevel = idx === 0 && topRoutes.has(seg);
      const isJourneyArea = idx === 1 && segments[0] === "journey";
      const href = isTopLevel || isJourneyArea ? fullPath : undefined;

      return { label: formatted, href };
    }),
  ];

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        height: "56px",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        zIndex: 40,
        boxSizing: "border-box",
        width: "100%",
        gap: "12px",
        transition: "background-color 0.15s ease, border-color 0.15s ease",
      }}
    >
      {/* ── ZONE 1 (LEFT): MOBILE MENU & DESKTOP BREADCRUMBS ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0, flexShrink: 0, position: "relative", zIndex: 10 }}>
        <Button
          variant="ghost"
          size="icon"
          id="open-sidebar-btn"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
          className="md:hidden"
          style={{
            display: "flex",
            width: "32px",
            height: "32px",
            borderRadius: radius.md,
            color: "var(--text-primary)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <Menu size={17} />
        </Button>

        {/* Desktop Dynamic Breadcrumbs */}
        <div className="hidden md:flex" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          <Breadcrumbs items={breadcrumbItems} aria-label="Page Location" />
        </div>
      </div>

      {/* ── ZONE 2 (CENTER): BALANCED SEARCH BAR ── */}
      <div
        className="hidden sm:flex"
        style={{
          flex: "1 1 auto",
          maxWidth: "420px",
          minWidth: "140px",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "10px",
              color: isFocused ? "var(--accent)" : "var(--text-muted)",
              pointerEvents: "none",
              transition: "color 0.15s ease",
            }}
          />
          <input
            type="text"
            placeholder="Search problems, patterns, topics..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: "100%",
              height: "34px",
              padding: "0 46px 0 32px",
              borderRadius: radius.md,
              border: `1px solid ${isFocused ? "var(--accent)" : "var(--border)"}`,
              background: isFocused ? "var(--surface)" : "var(--bg-subtle)",
              color: "var(--text-primary)",
              fontSize: "12px",
              outline: "none",
              boxShadow: isFocused ? "0 0 0 2px var(--accent-subtle)" : "none",
              transition: "all 0.15s ease",
              boxSizing: "border-box",
              fontFamily: "var(--font-sans)",
            }}
          />

          {/* Quick ⌘K Keyboard Badge */}
          <button
            type="button"
            onClick={handleOpenCommandPalette}
            title="Open Command Palette (⌘K)"
            style={{
              position: "absolute",
              right: "6px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: radius.sm,
              padding: "2px 5px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "10px",
              fontWeight: 600,
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            <Command size={10} /> K
          </button>
        </div>
      </div>

      {/* ── ZONE 3 (RIGHT): THEME TOGGLE, DESIGN SYSTEM LINK & AUTH ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        {/* Quick Design System Link */}
        <Link
          href="/design-system"
          title="Design System Catalog"
          style={{ textDecoration: "none" }}
        >
          <Button
            variant="ghost"
            size="icon"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: radius.md,
              color: "var(--text-muted)",
            }}
          >
            <Palette size={15} />
          </Button>
        </Link>

        {/* Direct Dark ↔ Light Mode Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "32px",
            height: "32px",
            borderRadius: radius.md,
            background: "transparent",
            border: "1px solid var(--border)",
            color: isDark ? "#F59E0B" : "var(--accent)",
            cursor: "pointer",
            transition: `all ${animations.transition.fast}`,
          }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Dynamic Auth Section */}
        {isLoading ? (
          <div
            style={{
              width: "80px",
              height: "32px",
              borderRadius: radius.md,
              background: "var(--bg-subtle)",
              border: "1px solid var(--border)",
            }}
          />
        ) : isAuthenticated ? (
          <>
            {/* Notifications */}
            <Link href="/settings?tab=notifications" style={{ textDecoration: "none" }}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="View notifications"
                style={{
                  position: "relative",
                  width: "32px",
                  height: "32px",
                  borderRadius: radius.md,
                  color: "var(--text-muted)",
                }}
              >
                <Bell size={15} />
                <span
                  style={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    width: "5px",
                    height: "5px",
                    background: "var(--success)",
                    borderRadius: radius.full,
                  }}
                />
              </Button>
            </Link>

            {/* Avatar & Dropdown */}
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                style={{
                  height: "32px",
                  padding: "0 6px 0 3px",
                  borderRadius: radius.md,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "border-color 0.15s ease",
                }}
                aria-label="Account menu"
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: radius.sm,
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "11px",
                  }}
                >
                  {initials}
                </div>
                <ChevronDown size={11} style={{ color: "var(--text-muted)" }} />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.12 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      right: 0,
                      width: "210px",
                      background: "var(--surface)",
                      border: "1px solid var(--border-strong)",
                      borderRadius: radius.lg,
                      boxShadow: "var(--shadow-md)",
                      padding: "6px",
                      zIndex: 100,
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px 10px",
                        borderBottom: "1px solid var(--border)",
                        marginBottom: "4px",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "var(--text-primary)",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {displayName}
                      </strong>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          display: "block",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {user?.email || "developer@dsamagna.com"}
                      </span>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 10px",
                        borderRadius: radius.md,
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--surface-elevated)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <User size={14} style={{ color: "var(--accent)" }} /> Profile
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 10px",
                        borderRadius: radius.md,
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 500,
                        textDecoration: "none",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--surface-elevated)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }}
                    >
                      <Settings size={14} style={{ color: "var(--accent)" }} /> Settings
                    </Link>

                    <div
                      style={{
                        height: "1px",
                        background: "var(--border)",
                        margin: "4px 0",
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "7px 10px",
                        borderRadius: radius.md,
                        color: "var(--danger)",
                        fontSize: "12px",
                        fontWeight: 500,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "background-color 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "var(--danger-bg, rgba(239, 68, 68, 0.1))";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <LogOut size={14} /> Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
