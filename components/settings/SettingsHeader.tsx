"use client";

import React from "react";
import { Search, Flame, Zap, Coins, Gem, Bell, User } from "lucide-react";
import { DESIGN_TOKENS } from "@/src/design/tokens";

interface SettingsHeaderProps {
  emoji?: string;
  title: string;
  subtitle: string;
}

export function SettingsHeader({ emoji = "⚙️", title, subtitle }: SettingsHeaderProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginBottom: "28px" }}>
      {/* Top Toolbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
        {/* Search Bar */}
        <div
          style={{
            position: "relative",
            maxWidth: "520px",
            width: "100%",
            height: "48px",
            borderRadius: "16px",
            background: "rgba(18, 22, 38, 0.72)",
            border: `1px solid ${DESIGN_TOKENS.colors.border}`,
            backdropFilter: "blur(20px)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            gap: "10px",
          }}
        >
          <Search size={18} style={{ color: "#9AA4B2" }} />
          <input
            type="text"
            placeholder="Search settings..."
            aria-label="Search settings"
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 500,
            }}
          />
          <kbd
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#9AA4B2",
              background: "rgba(255, 255, 255, 0.08)",
              padding: "3px 7px",
              borderRadius: "6px",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            ⌘ K
          </kbd>
        </div>

        {/* Stats & User Avatar Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Day Streak */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "14px",
              background: "rgba(18, 22, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            <Flame size={16} style={{ color: "#F59E0B" }} />
            <span>23</span>
            <span style={{ fontSize: "10px", color: "#9AA4B2", fontWeight: 400 }}>Day Streak</span>
          </div>

          {/* Total XP */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "14px",
              background: "rgba(18, 22, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            <Zap size={16} style={{ color: "#A970FF" }} />
            <span>12,450</span>
            <span style={{ fontSize: "10px", color: "#9AA4B2", fontWeight: 400 }}>Total XP</span>
          </div>

          {/* Coins */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "14px",
              background: "rgba(18, 22, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            <Coins size={16} style={{ color: "#F59E0B" }} />
            <span>2,150</span>
          </div>

          {/* Gems */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "14px",
              background: "rgba(18, 22, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              fontSize: "12px",
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            <Gem size={16} style={{ color: "#3B82F6" }} />
            <span>18</span>
          </div>

          {/* Notification Bell */}
          <button
            type="button"
            aria-label="Notifications"
            style={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "rgba(18, 22, 38, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            <Bell size={18} />
            <span
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#EC4899",
              }}
            />
          </button>

          {/* Profile Avatar */}
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7C4DFF 0%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "14px",
              boxShadow: "0 4px 12px rgba(124, 77, 255, 0.3)",
              cursor: "pointer",
            }}
          >
            <User size={20} />
          </div>
        </div>
      </div>

      {/* Main Page Title */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: "36px",
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          {emoji && <span>{emoji}</span>} {title}
        </h1>
        <p style={{ margin: "6px 0 0 0", fontSize: "14px", color: "#9AA4B2" }}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}
