"use client";

import React from "react";
import { SidebarWidget } from "./SidebarWidget";
import { Cloud, Clock, Database, Info, CheckCircle2 } from "lucide-react";

export function SystemStatusCard() {
  const rows = [
    { label: "Cloud Sync", value: "Synced", icon: Cloud, isBadge: true },
    { label: "Last Updated", value: "2 minutes ago", icon: Clock },
    { label: "Storage Used", value: "14.2 MB / 1 GB", icon: Database },
    { label: "App Version", value: "Journey 5.0.0", icon: Info },
  ];

  return (
    <SidebarWidget title="System Status">
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {rows.map((row) => {
          const IconComponent = row.icon;
          return (
            <div
              key={row.label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "12px",
                padding: "6px 0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9AA4B2" }}>
                <IconComponent size={14} />
                <span>{row.label}</span>
              </div>
              {row.isBadge ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#10B981",
                    background: "rgba(16, 185, 129, 0.12)",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                  }}
                >
                  <CheckCircle2 size={11} /> {row.value}
                </span>
              ) : (
                <span style={{ fontWeight: 500, color: "#FFFFFF" }}>{row.value}</span>
              )}
            </div>
          );
        })}
      </div>
    </SidebarWidget>
  );
}
