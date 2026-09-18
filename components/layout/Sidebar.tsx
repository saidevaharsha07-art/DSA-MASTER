"use client";

import Link from "next/link";
import { X, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { radius, animations, colors } from "@/src/design";
import { Button } from "@/src/components/ui/Button";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  pathname: string;
  nav: readonly (readonly [string, string, any])[];
}

interface NavGroup {
  title: string;
  items: (readonly [string, string, any])[];
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

  // Categorize nav items into Core, Mastery, and System groups
  const coreHrefs = new Set(["/dashboard", "/study-plan", "/journey", "/practice", "/interview"]);
  const masteryHrefs = new Set(["/contest", "/revision", "/analytics", "/mentor"]);
  const systemHrefs = new Set(["/settings", "/profile"]);

  const groups: NavGroup[] = [
    {
      title: "Core",
      items: nav.filter(([, href]) => coreHrefs.has(href)),
    },
    {
      title: "Mastery",
      items: nav.filter(([, href]) => masteryHrefs.has(href)),
    },
    {
      title: "System",
      items: nav.filter(([, href]) => systemHrefs.has(href) || (!coreHrefs.has(href) && !masteryHrefs.has(href))),
    },
  ].filter((g) => g.items.length > 0);

  if (!mounted) {
    return (
      <aside
        style={{
          width: collapsedWidth,
          flexShrink: 0,
          background: "var(--bg)",
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
          transition={{ type: "spring", stiffness: 420, damping: 35 }}
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
            background: "var(--bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow:
              isExpanded && !isMobileOpen
                ? "var(--shadow-md)"
                : "none",
            zIndex: 50,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
          aria-label="Main Navigation"
        >
          <div style={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}>
            {/* Top Brand Header */}
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: isExpanded ? "space-between" : "center",
                height: "56px",
                borderBottom: "1px solid var(--border)",
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
                    minWidth: "32px",
                    height: "32px",
                    borderRadius: radius.md,
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--border-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path
                      d="M12 2L2 22H22L12 2Z"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="var(--accent-subtle)"
                    />
                    <path
                      d="M12 9L7 19H17L12 9Z"
                      fill="var(--accent)"
                    />
                  </svg>
                </div>

                <motion.div
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    width: isExpanded ? "auto" : 0,
                    x: isExpanded ? 0 : -8,
                  }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      letterSpacing: "-0.01em",
                      color: "var(--text-primary)",
                      fontFamily: "var(--font-sans)",
                    }}
                  >
                    DSA <span style={{ color: "var(--accent)" }}>MASTER</span>
                  </span>
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    DEVELOPER PLATFORM
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
                  <X size={18} />
                </Button>
              )}
            </div>

            {/* Categorized Navigation Groups */}
            <nav
              style={{
                padding: "12px 8px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              {groups.map((group, groupIdx) => (
                <div key={group.title} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {isExpanded ? (
                    <span
                      style={{
                        padding: "4px 10px 6px 10px",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        userSelect: "none",
                      }}
                    >
                      {group.title}
                    </span>
                  ) : groupIdx > 0 ? (
                    <div
                      style={{
                        height: "1px",
                        background: "var(--border-subtle)",
                        margin: "4px 8px 6px 8px",
                      }}
                    />
                  ) : null}

                  {group.items.map(([name, href, Icon]) => {
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
                            padding: isExpanded ? "8px 10px" : "8px 0",
                            borderRadius: radius.md,
                            color: active
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                            background: active
                              ? "var(--accent-subtle)"
                              : "transparent",
                            border: active
                              ? "1px solid var(--border-strong)"
                              : "1px solid transparent",
                            textDecoration: "none",
                            transition: `background-color ${animations.transition.fast}, color ${animations.transition.fast}`,
                            justifyContent: isExpanded ? "flex-start" : "center",
                            gap: isExpanded ? "10px" : "0",
                            position: "relative",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor = "var(--surface-elevated)";
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
                          {/* Active Pill Indicator for collapsed mode */}
                          {active && !isExpanded && (
                            <div
                              style={{
                                position: "absolute",
                                left: "2px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "3px",
                                height: "16px",
                                borderRadius: radius.full,
                                backgroundColor: "var(--accent)",
                              }}
                            />
                          )}

                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <Icon
                              size={17}
                              style={{
                                color: active ? "var(--accent)" : "inherit",
                                transition: "color 0.15s ease",
                              }}
                            />
                          </div>

                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.12, ease: "easeOut" }}
                              style={{
                                whiteSpace: "nowrap",
                                fontSize: "13px",
                                fontWeight: active ? 600 : 500,
                                overflow: "hidden",
                                display: "inline-block",
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {name}
                            </motion.span>
                          )}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom Pin/Collapse Button (Desktop) */}
          <div
            style={{
              padding: "8px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <Button
              onClick={onToggleExpand}
              variant="ghost"
              className="desktop-only"
              style={{
                width: "100%",
                justifyContent: isExpanded ? "flex-start" : "center",
                padding: "8px 10px",
                color: "var(--text-muted)",
                gap: "8px",
                borderRadius: radius.md,
                background: isPinned ? "var(--surface-elevated)" : "transparent",
              }}
              title={isPinned ? "Unpin sidebar" : "Pin sidebar open"}
            >
              <motion.div
                animate={{ rotate: isPinned ? 0 : 180 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <ChevronLeft size={16} />
              </motion.div>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  style={{
                    whiteSpace: "nowrap",
                    fontSize: "12px",
                    fontWeight: 600,
                    overflow: "hidden",
                    display: "inline-block",
                  }}
                >
                  {isPinned ? "Collapse" : "Expand Sidebar"}
                </motion.span>
              )}
            </Button>
          </div>
        </motion.aside>
      </div>
    </>
  );
}
