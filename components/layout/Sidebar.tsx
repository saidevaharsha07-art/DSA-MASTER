"use client";

import Link from "next/link";
import { X, Code2, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { colors, spacing, typography, radius, animations, layout } from "@/src/design";
import { Button } from "@/src/components/ui/Button";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  pathname: string;
  nav: readonly (readonly [string, string, any])[];
}

export function Sidebar({ isMobileOpen, onMobileClose, isExpanded, onToggleExpand, pathname, nav }: SidebarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sidebarWidth = isExpanded ? parseInt(layout.sidebar.expanded) : parseInt(layout.sidebar.collapsed);

  if (!mounted) {
    return (
      <aside className={`sidebar ${isMobileOpen ? "open" : ""}`} style={{ width: 280 }} aria-label="Main Navigation">
         <div style={{ padding: spacing.lg }}>Loading Navigation...</div>
      </aside>
    );
  }

  return (
    <>
      <aside className={`sidebar ${isMobileOpen ? "open" : "desktop-only"}`} style={{ width: sidebarWidth, overflow: 'visible', zIndex: 50, flexShrink: 0 }} aria-label="Main Navigation">
        <motion.div 
          animate={{ width: sidebarWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${colors.border}`, background: colors.card }}
        >
          <div>
            <div className="brand" style={{ padding: `${spacing.lg} ${spacing.md}`, display: 'flex', alignItems: 'center', justifyContent: isExpanded ? 'space-between' : 'center', height: layout.topbar.height }}>
              <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: spacing.sm, overflow: 'hidden' }}>
                <div style={{ minWidth: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Code2 size={28} style={{ color: colors.primary }} />
                </div>
                <motion.span
                  animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ whiteSpace: 'nowrap', fontWeight: typography.fontWeight.bold, fontSize: typography.fontSize.h3, letterSpacing: '-0.5px', overflow: 'hidden', color: colors.foreground, fontFamily: typography.fontFamily.sans }}
                >
                  DSA <i style={{ color: colors.primary, fontStyle: 'normal' }}>MASTER</i>
                </motion.span>
              </Link>
              
              {isMobileOpen && (
                <Button variant="ghost" size="icon" onClick={onMobileClose} style={{ padding: spacing.xs }}>
                  <X size={20} />
                </Button>
              )}
            </div>

            <nav className="nav" style={{ padding: `0 ${spacing.sm}`, display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
              {nav.map(([name, href, Icon]) => {
                const active = pathname === href || pathname.startsWith(href + '/');
                return (
                  <div key={href} style={{ position: 'relative' }} className="group">
                    <Link
                      href={href}
                      onClick={() => { if (isMobileOpen) onMobileClose(); }}
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        padding: spacing.md,
                        borderRadius: radius.md,
                        color: active ? colors.foreground : colors.muted,
                        background: active ? colors.primaryBg : "transparent",
                        textDecoration: 'none',
                        transition: `all ${animations.transition.fast}`,
                        justifyContent: isExpanded ? 'flex-start' : 'center',
                        gap: isExpanded ? spacing.md : '0',
                        fontFamily: typography.fontFamily.sans,
                      }}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = colors.mutedBg; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <div style={{ minWidth: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={20} style={{ color: active ? colors.primary : "inherit" }} />
                      </div>
                      <motion.span
                        animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{ whiteSpace: 'nowrap', fontSize: typography.fontSize.caption, fontWeight: active ? typography.fontWeight.semibold : typography.fontWeight.medium, overflow: 'hidden' }}
                      >
                        {name}
                      </motion.span>
                    </Link>
                    
                    {!isExpanded && (
                       <div 
                         className="sidebar-tooltip"
                         style={{ 
                           position: 'absolute', 
                           left: 'calc(100% + 8px)', 
                           top: '50%', 
                           transform: 'translateY(-50%)',
                           background: colors.foreground,
                           color: colors.background,
                           padding: `${spacing.xs} ${spacing.sm}`,
                           borderRadius: radius.sm,
                           fontSize: typography.fontSize.label,
                           fontWeight: typography.fontWeight.medium,
                           pointerEvents: 'none',
                           opacity: 0,
                           whiteSpace: 'nowrap',
                           zIndex: 100,
                           transition: `opacity ${animations.transition.fast}`,
                         }}
                       >
                         {name}
                       </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          <div style={{ padding: `${spacing.md} ${spacing.sm}` }}>
            <Button 
              onClick={onToggleExpand}
              variant="ghost"
              className="desktop-only"
              style={{ width: '100%', justifyContent: isExpanded ? 'flex-start' : 'center', padding: spacing.md, color: colors.muted, gap: spacing.md }}
            >
              <motion.div animate={{ rotate: isExpanded ? 0 : 180 }} style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronLeft size={20} />
              </motion.div>
              <motion.span
                animate={{ opacity: isExpanded ? 1 : 0, width: isExpanded ? 'auto' : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ whiteSpace: 'nowrap', fontSize: typography.fontSize.caption, fontWeight: typography.fontWeight.semibold, overflow: 'hidden' }}
              >
                Collapse
              </motion.span>
            </Button>
          </div>
        </motion.div>
      </aside>
    </>
  );
}
