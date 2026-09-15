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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { radius, animations } from "@/src/design";
import { Button } from "@/src/components/ui/Button";
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
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true }));
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

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        height: "58px",
        backgroundColor: "var(--header, rgba(7, 5, 18, 0.95))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid var(--border, rgba(255, 255, 255, 0.1))`,
        zIndex: 40,
        boxSizing: "border-box",
        width: "100%",
        gap: "16px",
        transition: "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      {/* ── ZONE 1 (LEFT): MENU TOGGLE & MOBILE BRAND ── */}
      <div className="flex md:hidden items-center gap-3" style={{ flexShrink: 0 }}>
        <Button
          variant="ghost"
          size="icon"
          id="open-sidebar-btn"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
          style={{
            display: "flex",
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "var(--muted-bg, rgba(255, 255, 255, 0.04))",
            border: "1px solid var(--border, rgba(255, 255, 255, 0.08))",
            color: "var(--text-primary, #FFF)",
          }}
        >
          <Menu size={18} />
        </Button>

        {/* DSA CRACKER Logo Brand Link (Mobile) */}
        <Link
          href={isAuthenticated ? "/dashboard" : "/login"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
          title="DSA CRACKER"
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              boxShadow: isDark
                ? "0 0 12px rgba(56, 189, 248, 0.35)"
                : "0 2px 8px rgba(2, 132, 199, 0.25)",
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src="/images/dsa-cracker-logo.jpg"
              alt="DSA CRACKER"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 900,
                letterSpacing: "0.04em",
                color: "var(--text-primary, #FFF)",
                fontFamily: "Inter, system-ui, sans-serif",
                lineHeight: 1.1,
              }}
            >
              DSA <span style={{ color: "#38BDF8" }}>CRACKER</span>
            </span>
            <span
              style={{
                fontSize: "7px",
                fontWeight: 800,
                letterSpacing: "0.08em",
                color: "var(--text-muted, #94A3B8)",
                textTransform: "uppercase",
              }}
            >
              LEARN • PRACTICE • TRACK • CRACK
            </span>
          </div>
        </Link>
      </div>

      {/* ── ZONE 2 (CENTER): BALANCED GLOBAL SEARCH BAR ─────────────── */}
      <div
        style={{
          flex: "1 1 auto",
          maxWidth: "480px",
          minWidth: "180px",
          display: "flex",
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
            size={15}
            style={{
              position: "absolute",
              left: "12px",
              color: isFocused ? "var(--primary, #38BDF8)" : "var(--text-muted, #94A3B8)",
              pointerEvents: "none",
              transition: "color 0.2s ease",
            }}
          />
          <input
            type="text"
            placeholder="Search patterns or questions..."
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{
              width: "100%",
              height: "36px",
              padding: "0 48px 0 34px",
              borderRadius: "10px",
              border: isFocused
                ? `1.5px solid var(--accent-primary)`
                : `1px solid var(--border)`,
              background: isFocused
                ? isDark
                  ? "var(--surface)"
                  : "#FFFFFF"
                : "var(--muted-bg)",
              color: "var(--text-primary)",
              fontSize: "12px",
              outline: "none",
              boxShadow: isFocused ? "0 0 16px var(--accent-glow)" : "none",
              transition: "all 0.2s ease",
              boxSizing: "border-box",
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
              background: "var(--muted-bg)",
              border: "1px solid var(--border)",
              borderRadius: "6px",
              padding: "2px 6px",
              display: "flex",
              alignItems: "center",
              gap: "2px",
              fontSize: "10px",
              fontWeight: 800,
              color: "var(--text-muted)",
              cursor: "pointer",
            }}
          >
            <Command size={10} /> K
          </button>
        </div>
      </div>

      {/* ── ZONE 3 (RIGHT): AUTHENTICATION & DIRECT THEME ACTIONS ───── */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        {/* Direct Dark ↔ Light Mode Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            height: "36px",
            padding: "0 10px",
            borderRadius: "10px",
            background: "var(--muted-bg)",
            border: "1px solid var(--border)",
            color: isDark ? "#FACC15" : "var(--accent-text)",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 700,
            transition: `all ${animations.transition.fast}`,
          }}
        >
          {isDark ? (
            <>
              <Sun size={15} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Light</span>
            </>
          ) : (
            <>
              <Moon size={15} />
              <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Dark</span>
            </>
          )}
        </button>

        {/* Dynamic Auth Section with Hydration Protection */}
        {isLoading ? (
          /* Neutral Loading State (Prevents Hydration / Auth Flicker) */
          <div
            style={{
              width: "120px",
              height: "34px",
              borderRadius: "10px",
              background: "var(--muted-bg)",
              border: "1px solid var(--border)",
            }}
          />
        ) : isAuthenticated ? (
          /* Authenticated User Controls: Notifications + Avatar Menu */
          <>
            {/* Notifications Trigger */}
            <Link href="/settings?tab=notifications" style={{ textDecoration: "none" }}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="View notifications"
                style={{
                  position: "relative",
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "var(--muted-bg)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
              >
                <Bell size={16} />
                <span
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "7px",
                    width: "6px",
                    height: "6px",
                    background: "#10B981",
                    boxShadow: "0 0 6px #10B981",
                    borderRadius: radius.full,
                  }}
                />
              </Button>
            </Link>

            {/* Avatar & Account Dropdown */}
            <div ref={menuRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                style={{
                  height: "36px",
                  padding: "0 8px 0 4px",
                  borderRadius: "10px",
                  background: "var(--muted-bg)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                aria-label="Account menu"
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: `linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)`,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "11px",
                    boxShadow: "0 2px 8px var(--accent-glow)",
                  }}
                >
                  {initials}
                </div>
                <ChevronDown size={12} style={{ color: "var(--text-muted)" }} />
              </button>

              <AnimatePresence>
                {accountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "210px",
                      background: "var(--surface)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid var(--border)",
                      borderRadius: "14px",
                      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
                      padding: "8px",
                      zIndex: 100,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px 10px",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <strong
                        style={{
                          fontSize: "12px",
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
                        {user?.email || "Active Developer"}
                      </span>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--muted-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <User size={14} style={{ color: "var(--accent-primary)" }} /> Profile
                    </Link>

                    <Link
                      href="/dashboard"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--muted-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <User size={14} style={{ color: "var(--accent-primary)" }} /> Dashboard
                    </Link>

                    <Link
                      href="/settings"
                      onClick={() => setAccountMenuOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        color: "var(--text-secondary)",
                        fontSize: "12px",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--muted-bg)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <Settings size={14} style={{ color: "var(--accent-primary)" }} /> Settings
                    </Link>

                    <div
                      style={{
                        height: "1px",
                        background: "var(--border)",
                        margin: "2px 0",
                      }}
                    />

                    <button
                      type="button"
                      onClick={handleSignOut}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 10px",
                        borderRadius: "8px",
                        color: "#EF4444",
                        fontSize: "12px",
                        fontWeight: 600,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
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
          /* Unauthenticated User Controls: Login (Ghost) + Sign Up (Filled) */
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  padding: "7px 14px",
                  borderRadius: "9px",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-secondary)";
                }}
              >
                Login
              </button>
            </Link>

            <Link href="/signup" style={{ textDecoration: "none" }}>
              <button
                type="button"
                style={{
                  padding: "7px 16px",
                  borderRadius: "9px",
                  background: "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                  border: "none",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 2px 10px var(--accent-glow)",
                  transition: "all 0.15s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow = "0 4px 14px var(--accent-glow)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 2px 10px var(--accent-glow)";
                }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
