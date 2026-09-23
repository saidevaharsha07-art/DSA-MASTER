"use client";

import Link from "next/link";
import { X, ChevronLeft, Compass, Code2, Timer, CalendarCheck, RotateCcw, Trophy, BarChart3, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { radius, animations } from "@/src/design";
import { Button } from "@/src/components/ui/Button";
import { RevisionAdapterService } from "@/src/features/revision/services/revision-adapter.service";
import { useActiveUser } from "@/src/hooks/useActiveUser";
import { EventBus } from "@/src/core/events/event-bus";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  badgeKey?: "revision";
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "LEARN",
    items: [
      { name: "Journey", href: "/journey", icon: Compass },
      { name: "Practice", href: "/practice", icon: Code2 },
      { name: "Interview", href: "/interview", icon: Timer },
    ],
  },
  {
    title: "MASTERY",
    items: [
      { name: "Study Plan", href: "/study-plan", icon: CalendarCheck },
      { name: "Revision", href: "/revision", icon: RotateCcw, badgeKey: "revision" },
      { name: "Contests", href: "/contest", icon: Trophy },
      { name: "Progress", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "SYSTEM",
    items: [
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  pathname: string;
  nav?: readonly (readonly [string, string, any])[];
  navSections?: NavSection[];
}

export function Sidebar({
  isMobileOpen,
  onMobileClose,
  isExpanded: isPinned,
  onToggleExpand,
  pathname,
  navSections = NAV_SECTIONS,
}: SidebarProps) {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { userId } = useActiveUser();
  const [pendingReviews, setPendingReviews] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subscribe to live revision queue changes for authentic pending review badge
  useEffect(() => {
    if (typeof window === "undefined") return;
    const updatePending = () => {
      try {
        const summary = RevisionAdapterService.getRevisionSummary(userId);
        setPendingReviews(summary.dueTodayProblems?.length || 0);
      } catch {
        setPendingReviews(0);
      }
    };

    updatePending();
    const unsubSolve = EventBus.subscribe("ProblemSolved", updatePending);
    const unsubMemory = EventBus.subscribe("MemoryReviewed", updatePending);

    return () => {
      unsubSolve();
      unsubMemory();
    };
  }, [userId]);

  const isExpanded = isMobileOpen || isPinned || isHovered;
  const collapsedWidth = 64;
  const expandedWidth = 230;
  const currentWidth = isMobileOpen ? 260 : isExpanded ? expandedWidth : collapsedWidth;

  const isRouteActive = (href: string) => {
    if (!pathname) return false;
    if (pathname === href) return true;
    if (href === "/" || href === "/dashboard") return false;
    return pathname.startsWith(href + "/") || pathname === href;
  };

  if (!mounted) {
    return (
      <aside
        className="hidden md:block"
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
        className={isMobileOpen ? "block" : "hidden md:block"}
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
          data-testid="app-sidebar"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          animate={{
            width: currentWidth,
            x: 0,
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
          <div
            style={{ overflowY: "auto", overflowX: "hidden", flex: 1 }}
            onMouseEnter={() => setIsHovered(true)}
          >
            {/* Top Brand Header (Links directly to Dashboard / Command Center) */}
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
                aria-label="DSA Master Dashboard"
                title="Dashboard"
                onClick={() => {
                  if (isMobileOpen) onMobileClose();
                }}
                className="outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
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
                  aria-label="Close navigation drawer"
                  style={{ padding: "4px", color: "var(--text-primary)" }}
                >
                  <X size={18} />
                </Button>
              )}
            </div>

            {/* Task-Oriented Navigation Groups (LEARN, MASTERY, SYSTEM) */}
            <nav
              style={{
                padding: "8px 6px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              {navSections.map((group, groupIdx) => (
                <div
                  key={group.title}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2px",
                    marginTop: groupIdx === 0 ? "4px" : "10px",
                  }}
                >
                  {isExpanded ? (
                    <span
                      style={{
                        padding: "6px 10px 4px 10px",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        userSelect: "none",
                        opacity: 0.8,
                      }}
                    >
                      {group.title}
                    </span>
                  ) : groupIdx > 0 ? (
                    <div
                      style={{
                        height: "1px",
                        background: "var(--border-subtle, rgba(255, 255, 255, 0.06))",
                        margin: "6px 8px 6px 8px",
                      }}
                    />
                  ) : null}

                  {group.items.map((item) => {
                    const active = isRouteActive(item.href);
                    const Icon = item.icon;
                    const hasRevisionBadge = item.badgeKey === "revision" && pendingReviews > 0;

                    return (
                      <div key={item.href} style={{ position: "relative" }}>
                        <Link
                          href={item.href}
                          onClick={() => {
                            if (isMobileOpen) onMobileClose();
                          }}
                          className="h-11 min-h-[44px] md:h-10 md:min-h-[40px] box-border outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg)]"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            boxSizing: "border-box",
                            padding: isExpanded ? "0 10px" : "0",
                            borderRadius: radius.md,
                            color: active
                              ? "var(--text-primary)"
                              : "var(--text-secondary)",
                            background: active
                              ? "var(--accent-subtle)"
                              : "transparent",
                            border: active
                              ? "1px solid var(--accent-subtle)"
                              : "1px solid transparent",
                            textDecoration: "none",
                            transition: `background-color ${animations.transition.fast}, color ${animations.transition.fast}`,
                            justifyContent: isExpanded ? "flex-start" : "center",
                            gap: isExpanded ? "10px" : "0",
                            position: "relative",
                          }}
                          onMouseEnter={(e) => {
                            if (!active) {
                              e.currentTarget.style.backgroundColor = "var(--surface-elevated, rgba(255, 255, 255, 0.04))";
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
                          {/* Thin Active Indicator on the Left */}
                          {active && (
                            <div
                              style={{
                                position: "absolute",
                                left: "2px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                width: "3px",
                                height: "18px",
                                borderRadius: "2px",
                                backgroundColor: "var(--accent)",
                              }}
                            />
                          )}

                          {/* Icon Container */}
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
                              size={18}
                              style={{
                                color: active ? "var(--accent)" : "inherit",
                                transition: "color 0.15s ease",
                              }}
                            />
                          </div>

                          {/* Collapsed dot indicator for authentic pending revision */}
                          {!isExpanded && hasRevisionBadge && (
                            <span
                              style={{
                                position: "absolute",
                                top: "9px",
                                right: "12px",
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                backgroundColor: "var(--accent)",
                              }}
                            />
                          )}

                          {/* Expanded Label & Optional Badge */}
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, x: -4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -4 }}
                              transition={{ duration: 0.12, ease: "easeOut" }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                overflow: "hidden",
                              }}
                            >
                              <span
                                style={{
                                  whiteSpace: "nowrap",
                                  fontSize: "13px",
                                  fontWeight: active ? 600 : 500,
                                  overflow: "hidden",
                                  letterSpacing: "-0.01em",
                                }}
                              >
                                {item.name}
                              </span>

                              {hasRevisionBadge && (
                                <span
                                  data-testid="revision-badge"
                                  style={{
                                    padding: "1px 6px",
                                    fontSize: "10px",
                                    fontWeight: 700,
                                    fontFamily: "var(--font-mono, monospace)",
                                    borderRadius: "9999px",
                                    backgroundColor: "var(--accent-subtle)",
                                    color: "var(--accent)",
                                    border: "1px solid var(--border-strong)",
                                    marginLeft: "auto",
                                    lineHeight: "1.2",
                                  }}
                                >
                                  {pendingReviews}
                                </span>
                              )}
                            </motion.div>
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
              className="desktop-only outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              style={{
                width: "100%",
                justifyContent: isExpanded ? "flex-start" : "center",
                minHeight: "40px",
                height: "40px",
                padding: "0 10px",
                color: "var(--text-muted)",
                gap: "8px",
                borderRadius: radius.md,
                background: isPinned ? "var(--surface-elevated, rgba(255, 255, 255, 0.04))" : "transparent",
              }}
              title={isPinned ? "Collapse sidebar" : "Expand sidebar"}
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
