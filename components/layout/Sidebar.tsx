"use client";

import Link from "next/link";
import { X, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { radius, animations } from "@/src/design";
import { Button } from "@/src/components/ui/Button";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  pathname: string;
  nav: readonly (readonly [string, string, any])[];
}

export function Sidebar({
  isMobileOpen,
  onMobileClose,
  isExpanded: isPinned,
  onToggleExpand,
  pathname,
  nav,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isExpanded = isMobileOpen || isPinned || isHovered;
  const collapsedWidth = 64;
  const expandedWidth = 230;
  const currentWidth = isMobileOpen ? 260 : isExpanded ? expandedWidth : collapsedWidth;

  if (!mounted) {
    return (
      <aside
        style={{
          width: collapsedWidth,
          flexShrink: 0,
          background: "var(--sidebar)",
          borderRight: "1px solid var(--border)",
        }}
        aria-label="Main Navigation"
      />
    );
  }

  return (
    <>
      {/* Outer fixed placeholder on desktop so main page layout NEVER jumps or compresses */}
      <div
        style={{
          width: isMobileOpen ? 0 : collapsedWidth,
          flexShrink: 0,
          position: "relative",
          zIndex: 45,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.aside
          animate={{
            width: currentWidth,
            x: isMobileOpen ? 0 : 0,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          style={{
            position: isMobileOpen ? "fixed" : "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid var(--border)",
            background: "var(--sidebar)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isExpanded && !isMobileOpen
              ? "0 12px 36px rgba(0, 0, 0, 0.25)"
              : "none",
            zIndex: 50,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
          aria-label="Main Navigation"
        >
          <div>
            {/* Top Brand Header */}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: isExpanded ? "space-between" : "center",
                height: "58px",
                borderBottom: "1px solid var(--border, rgba(255, 255, 255, 0.06))",
                boxSizing: "border-box",
              }}
            >
              <Link
                href="/dashboard"
                onClick={() => {
                  if (isMobileOpen) onMobileClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    minWidth: "34px",
                    height: "34px",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #38BDF8 0%, #3B82F6 50%, #6366F1 100%)",
                    padding: "1.5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 10px rgba(56, 189, 248, 0.25)",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "8.5px",
                      background: "var(--surface, #0B1120)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ width: "18px", height: "18px" }}
                    >
                      <path
                        d="M12 2L2 22H22L12 2Z"
                        stroke="#0284C7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="url(#sidebar-logo-grad)"
                        fillOpacity="0.25"
                      />
                      <path
                        d="M12 9L7 19H17L12 9Z"
                        fill="#38BDF8"
                      />
                      <defs>
                        <linearGradient id="sidebar-logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#38BDF8" />
                          <stop offset="1" stopColor="#6366F1" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                <motion.div
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? "auto" : 0,
                    x: isExpanded ? 0 : -10,
                  }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 900,
                      fontSize: "14px",
                      letterSpacing: "0.04em",
                      color: "var(--text-primary)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    DSA <span style={{ color: "var(--accent-primary, #38BDF8)" }}>MASTER</span>
                  </span>
                  <span
                    style={{
                      fontSize: "7px",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    LEARN • PRACTICE • MASTER
                  </span>
                </motion.div>
              </Link>

              {isMobileOpen && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMobileClose}
                  style={{ padding: "4px", color: "var(--text-primary)" }}
                >
                  <X size={20} />
                </Button>
              )}
            </div>

            {/* Navigation Links */}
            <nav
              style={{
                padding: "12px 8px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {nav.map(([name, href, Icon]) => {
                const active =
                  pathname === href ||
                  (href !== "/" && href !== "/dashboard" && pathname.startsWith(href + "/"));

                return (
                  <div key={href} style={{ position: "relative" }}>
                    <Link
                      href={href}
                      onClick={() => {
                        if (isMobileOpen) onMobileClose();
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: isExpanded ? "10px 14px" : "10px 0",
                        borderRadius: "12px",
                        color: active
                          ? "var(--accent-primary)"
                          : "var(--text-secondary)",
                        background: active
                          ? "var(--accent-soft)"
                          : "transparent",
                        border: active
                          ? "1px solid var(--accent-border)"
                          : "1px solid transparent",
                        textDecoration: "none",
                        transition: `all ${animations.transition.fast}`,
                        justifyContent: isExpanded ? "flex-start" : "center",
                        gap: isExpanded ? "12px" : "0",
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "var(--muted-bg)";
                          e.currentTarget.style.color = "var(--text-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon
                          size={19}
                          style={{
                            color: active ? "var(--accent-primary)" : "inherit",
                            transition: "color 0.15s ease",
                          }}
                        />
                      </div>

                      {isExpanded && (
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -6 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          style={{
                            whiteSpace: "nowrap",
                            fontSize: "13px",
                            fontWeight: active ? 800 : 600,
                            overflow: "hidden",
                            display: "inline-block",
                          }}
                        >
                          {name}
                        </motion.span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Pin/Collapse Button (Desktop) */}
          <div style={{ padding: "10px 8px" }}>
            <Button
              onClick={onToggleExpand}
              variant="ghost"
              className="desktop-only"
              style={{
                width: "100%",
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "8px 12px",
                color: "var(--text-muted, #94A3B8)",
                gap: "10px",
                borderRadius: radius.md,
                background: isPinned
                  ? "var(--muted-bg, rgba(255, 255, 255, 0.05))"
                  : "transparent",
              }}
              title={isPinned ? "Unpin sidebar" : "Pin sidebar open"}
            >
              <motion.div
                animate={{ rotate: isPinned ? 0 : 180 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronLeft size={18} />
              </motion.div>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    fontWeight: 700,
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  {isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
                </motion.span>
              )}
            </Button>
          </div>
        </motion.aside>
      </div>
    </>
  );
}
