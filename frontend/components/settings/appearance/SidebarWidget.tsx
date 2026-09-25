"use client";

import React from "react";
import { DESIGN_TOKENS } from "@/src/design/tokens";

interface SidebarWidgetProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function SidebarWidget({
  title,
  subtitle,
  icon,
  children,
  style,
  className = "",
}: SidebarWidgetProps) {
  return (
    <div
      className={className}
      style={{
        background: "rgba(18, 22, 38, 0.72)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${DESIGN_TOKENS.colors.border}`,
        borderRadius: "20px",
        padding: "20px",
        boxShadow: DESIGN_TOKENS.shadows.card,
        transition: DESIGN_TOKENS.transitions.default,
        ...style,
      }}
    >
      {(title || subtitle) && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "16px" }}>
          {icon && <div style={{ color: "#7C4DFF", marginTop: "2px" }}>{icon}</div>}
          <div>
            {title && (
              <h5 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#FFFFFF" }}>
                {title}
              </h5>
            )}
            {subtitle && (
              <p style={{ margin: "2px 0 0 0", fontSize: "11px", color: "#9AA4B2" }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}
