"use client";

import { Sun, Moon, Laptop, Flame, Bell, Search, Menu } from "lucide-react";
import Link from "next/link";
import { colors, spacing, typography, radius, animations } from "@/src/design";
import { Button } from "@/src/components/ui/Button";

interface NavbarProps {
  onMenuClick: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  theme: "light" | "dark" | "system";
  onThemeChange: (val: "light" | "dark" | "system") => void;
  streak: number;
  xp: number;
}

export function Navbar({
  onMenuClick,
  searchQuery,
  onSearchChange,
  theme,
  onThemeChange,
  streak,
  xp,
}: NavbarProps) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${spacing.xl}`,
      height: '64px',
      backgroundColor: colors.background,
      borderBottom: `1px solid ${colors.border}`,
      zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: spacing.md }}>
        <Button
          variant="ghost"
          size="icon"
          id="open-sidebar-btn"
          onClick={onMenuClick}
          aria-label="Open sidebar drawer"
          style={{ display: 'flex' }} // Depending on responsive breakpoints, might hide on desktop later
        >
          <Menu size={20} />
        </Button>

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: spacing.md,
              color: colors.muted,
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search patterns or questions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              padding: `${spacing.sm} ${spacing.md} ${spacing.sm} 36px`,
              borderRadius: radius.full,
              border: `1px solid ${colors.border}`,
              background: colors.card,
              color: colors.foreground,
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.caption,
              outline: "none",
              width: "240px",
              transition: `all ${animations.transition.fast}`,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = colors.primary; e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primaryBg}` }}
            onBlur={(e) => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.boxShadow = 'none' }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
        {/* Streak Flame */}
        {streak > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: spacing.xs,
              fontSize: typography.fontSize.caption,
              fontWeight: typography.fontWeight.bold,
              color: "#f89f1b",
              background: "rgba(248,159,27,0.1)",
              padding: `${spacing.xs} ${spacing.sm}`,
              borderRadius: radius.full,
              fontFamily: typography.fontFamily.mono,
            }}
            title="Combined solving daily streak"
          >
            <Flame size={14} fill="#f89f1b" />
            <span>{streak}d</span>
          </div>
        )}

        {/* XP Counter */}
        <div
          style={{
            fontSize: typography.fontSize.label,
            fontWeight: typography.fontWeight.bold,
            background: colors.mutedBg,
            border: `1px solid ${colors.border}`,
            padding: `${spacing.xs} ${spacing.sm}`,
            borderRadius: radius.full,
            color: colors.foreground,
          }}
        >
          <span style={{ fontWeight: typography.fontWeight.medium, color: colors.muted, marginRight: spacing.xs }}>
            XP:
          </span>
          {xp}
        </div>

        {/* Theme Switcher Toggle */}
        <div
          style={{
            display: "flex",
            background: colors.mutedBg,
            border: `1px solid ${colors.border}`,
            padding: spacing.xs,
            borderRadius: radius.md,
          }}
        >
          {[
            { id: "light", icon: Sun, label: "Light Theme" },
            { id: "dark", icon: Moon, label: "Dark Theme" },
            { id: "system", icon: Laptop, label: "System Theme" },
          ].map((item) => {
            const ItemIcon = item.icon;
            const active = theme === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onThemeChange(item.id as any)}
                style={{
                  background: active ? colors.primaryBg : "transparent",
                  color: active ? colors.primary : colors.muted,
                  border: "none",
                  borderRadius: radius.sm,
                  padding: spacing.xs,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: `all ${animations.transition.fast}`,
                }}
                title={item.label}
                aria-label={item.label}
              >
                <ItemIcon size={14} />
              </button>
            );
          })}
        </div>

        {/* Notifications & Avatar */}
        <Button
          variant="ghost"
          size="icon"
          aria-label="View notifications"
          style={{ position: 'relative' }}
        >
          <Bell size={16} />
          <span
            style={{
              position: "absolute",
              top: '4px',
              right: '4px',
              width: '6px',
              height: '6px',
              background: colors.danger,
              borderRadius: radius.full,
            }}
          />
        </Button>

        <Link
          href="/profile"
          style={{
            width: '28px',
            height: '28px',
            borderRadius: radius.full,
            background: `linear-gradient(135deg, ${colors.primary} 0%, #a855f7 100%)`,
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: typography.fontWeight.bold,
            fontSize: typography.fontSize.label,
            textDecoration: "none",
          }}
          aria-label="View user profile"
        >
          JD
        </Link>
      </div>
    </header>
  );
}
