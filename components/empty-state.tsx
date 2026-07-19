import React from "react";
import { HelpCircle, LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  border?: boolean;
}

export function EmptyState({
  icon: Icon = HelpCircle,
  title,
  description,
  action,
  border = true,
}: EmptyStateProps) {
  return (
    <div
      style={{
        padding: "32px 24px",
        textAlign: "center",
        border: border ? "1px dashed var(--border)" : "none",
        borderRadius: 12,
        background: "rgba(255, 255, 255, 0.005)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 180,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--muted-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 12,
          color: "var(--muted)",
        }}
      >
        <Icon size={20} />
      </div>
      <h4 style={{ margin: "0 0 6px 0", fontSize: 14, fontWeight: 600 }}>{title}</h4>
      <p
        className="muted"
        style={{
          margin: 0,
          fontSize: 12,
          lineHeight: 1.5,
          maxWidth: 320,
          marginBottom: action ? 16 : 0,
        }}
      >
        {description}
      </p>
      {action}
    </div>
  );
}
