// components/homepage/GlassPanel.tsx
import React, { ReactNode } from "react";
import styles from "../../styles/homepage.module.css";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export default function GlassPanel({ children, className }: GlassPanelProps) {
  return (
    <div className={`${styles.glassPanel} ${className || ""}`}> {children} </div>
  );
}
