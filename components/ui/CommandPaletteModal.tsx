"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, LayoutDashboard, Code2, Map, BookOpen, RotateCcw, BarChart3, Trophy, Settings, UserRound, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPaletteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const items = [
    { title: "Dashboard", subtitle: "Overview, streak, and daily goal", href: "/dashboard", icon: LayoutDashboard },
    { title: "Problems Arena", subtitle: "Browse and solve DSA challenges", href: "/practice", icon: BookOpen },
    { title: "Roadmap Map", subtitle: "Visual campaign progress", href: "/roadmap", icon: Map },
    { title: "Revision Center", subtitle: "Spaced repetition and weak concepts", href: "/revision", icon: RotateCcw },
    { title: "Statistics", subtitle: "Learning velocity & analytics", href: "/statistics", icon: BarChart3 },
    { title: "Achievements", subtitle: "Badges and unlockable rewards", href: "/achievements", icon: Trophy },
    { title: "Settings", subtitle: "Appearance, learning engine & privacy", href: "/settings", icon: Settings },
    { title: "Developer Profile", subtitle: "User credentials, level & platform handles", href: "/dashboard", icon: UserRound },
  ];

  const filtered = items.filter(
    (i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "15vh",
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{
            width: "100%",
            maxWidth: 600,
            background: "rgba(18, 22, 38, 0.95)",
            backdropFilter: "blur(24px)",
            border: "1px solid var(--primary-soft)",
            borderRadius: "var(--radius, 16px)",
            boxShadow: "0 25px 80px rgba(0, 0, 0, 0.6)",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Bar Input */}
          <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border)", gap: 12 }}>
            <Search size={20} style={{ color: "var(--primary)" }} />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search (e.g. Settings, Revision)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 500,
              }}
            />
            <button
              type="button"
              onClick={onClose}
              style={{ background: "transparent", border: "none", color: "var(--text-secondary)", cursor: "pointer" }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Results List */}
          <div style={{ maxHeight: 360, overflowY: "auto", padding: 8 }}>
            {filtered.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
                No commands matching &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      onClose();
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 10,
                      cursor: "pointer",
                      transition: "var(--transition-speed)",
                    }}
                    className="hover:bg-surface"
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                        <IconComp size={16} />
                      </div>
                      <div>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", display: "block" }}>{item.title}</span>
                        <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{item.subtitle}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} style={{ color: "var(--text-secondary)" }} />
                  </div>
                );
              })
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
