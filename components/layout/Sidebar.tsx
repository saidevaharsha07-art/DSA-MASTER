"use client";

import Link from "next/link";
import { X, Code2 } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
  nav: readonly (readonly [string, string, any])[];
}

export function Sidebar({ isOpen, onClose, pathname, nav }: SidebarProps) {
  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`} aria-label="Main Navigation">
      <div>
        <div className="brand" style={{ justifyContent: "space-between" }}>
          <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Code2 size={24} style={{ color: "var(--primary)" }} />
            <span>
              DSA <i>MASTER</i>
            </span>
          </Link>
          <button
            className="button ghost"
            style={{ padding: 4 }}
            id="close-sidebar-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="nav">
          {nav.map(([name, href, Icon]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={active ? "active" : ""}
                onClick={onClose}
                style={{ position: "relative" }}
              >
                <Icon size={16} style={{ marginRight: 10, color: active ? "var(--primary)" : "inherit" }} />
                {name}
                {active && (
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      background: "var(--primary)",
                      borderRadius: "0 4px 4px 0",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div style={{ padding: "0 12px" }}>
        <div
          className="row muted"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 16,
            fontSize: 12,
          }}
        >
          <span>v1.2.0</span>
          <span>Local-first</span>
        </div>
      </div>
    </aside>
  );
}
