"use client";

import { Sun, Moon, Laptop, Flame, Bell, Search, Menu } from "lucide-react";
import Link from "next/link";

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
    <header className="topbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          className="button ghost"
          style={{ padding: 8 }}
          id="open-sidebar-btn"
          onClick={onMenuClick}
          aria-label="Open sidebar drawer"
        >
          <Menu size={20} />
        </button>

        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: 12,
              color: "var(--muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            placeholder="Search patterns or questions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              padding: "8px 12px 8px 36px",
              borderRadius: "99px",
              border: "1px solid var(--border)",
              background: "var(--background)",
              fontSize: 13,
              outline: "none",
              width: "240px",
            }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Streak Flame */}
        {streak > 0 && (
          <div
            className="row font-mono"
            style={{
              gap: 4,
              fontSize: 13,
              fontWeight: 700,
              color: "#f89f1b",
              background: "rgba(248,159,27,0.1)",
              padding: "4px 10px",
              borderRadius: 99,
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
            fontSize: 12,
            fontWeight: 700,
            background: "var(--muted-bg)",
            border: "1px solid var(--border)",
            padding: "4px 10px",
            borderRadius: 99,
          }}
        >
          <span className="muted" style={{ fontWeight: 500, marginRight: 4 }}>
            XP:
          </span>
          {xp}
        </div>

        {/* Theme Switcher Toggle */}
        <div
          style={{
            display: "flex",
            background: "var(--muted-bg)",
            border: "1px solid var(--border)",
            padding: 2,
            borderRadius: 8,
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
                  background: active ? "var(--accent)" : "transparent",
                  color: active ? "var(--accent-foreground)" : "var(--muted)",
                  border: "none",
                  borderRadius: 6,
                  padding: 4,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
        <button
          className="button ghost"
          style={{ padding: 6, borderRadius: "50%", position: "relative" }}
          aria-label="View notifications"
        >
          <Bell size={16} />
          <span
            style={{
              position: "absolute",
              top: 2,
              right: 2,
              width: 6,
              height: 6,
              background: "#ef4444",
              borderRadius: "50%",
            }}
          />
        </button>

        <Link
          href="/profile"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 12,
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
