"use client";

import Link from "next/link";
import { LayoutDashboard, Code2, BookOpen, RotateCcw, UserRound } from "lucide-react";

interface MobileNavProps {
  pathname: string;
}

export function MobileNav({ pathname }: MobileNavProps) {
  const bottomRoutes = [
    { label: "Dash", href: "/dashboard", icon: LayoutDashboard },
    { label: "Practice", href: "/practice", icon: BookOpen },
    { label: "Revision", href: "/revision", icon: RotateCcw },
    { label: "Problems", href: "/problems", icon: Code2 },
    { label: "Profile", href: "/profile", icon: UserRound },
  ] as const;

  return (
    <nav
      className="mobile-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "var(--card)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 40,
        padding: "0 8px",
      }}
      aria-label="Mobile Bottom Navigation"
    >

      <div style={{ display: "contents" }}>
        {bottomRoutes.map((route) => {
          const Icon = route.icon;
          const active = pathname === route.href || pathname.startsWith(route.href + "/");
          return (
            <Link
              key={route.href}
              href={route.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                flex: 1,
                height: "100%",
                color: active ? "var(--primary)" : "var(--muted)",
                fontSize: 10,
                textDecoration: "none",
                fontWeight: active ? 600 : 500,
                transition: "color 0.2s",
              }}
            >
              <Icon size={18} />
              <span>{route.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
