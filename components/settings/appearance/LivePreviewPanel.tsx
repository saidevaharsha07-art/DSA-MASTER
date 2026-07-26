"use client";

import React from "react";
import Image from "next/image";
import { Eye, Flame, Zap, ShieldCheck } from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import { useSettings } from "@/src/context/SettingsContext";

interface LivePreviewPanelProps {
  content?: React.ReactNode;
}

export function LivePreviewPanel({ content }: LivePreviewPanelProps) {
  const { settings } = useSettings();
  const { theme, accentColor, radius, glow, fontFamily, blur, transparency } = settings.appearance;

  // Compute live preview accent color
  const accentHexMap: Record<string, string> = {
    purple: "#7C4DFF",
    blue: "#3B82F6",
    emerald: "#10B981",
    gold: "#F59E0B",
    pink: "#EC4899",
  };
  const activeAccent = accentHexMap[accentColor] || accentColor || "#7C4DFF";

  const radiusMap: Record<string, string> = { small: "8px", medium: "14px", large: "22px" };
  const currentRadius = radiusMap[radius] || "14px";

  const themeBgMap: Record<string, string> = {
    dark: "#0F131C",
    midnight: "#080C19",
    oled: "#000000",
    fantasy: "#130E26",
  };
  const activeBg = themeBgMap[theme] || "#0F131C";

  return (
    <SidebarWidget
      title="Live Preview"
      subtitle="See changes in real-time"
      icon={<Eye size={18} />}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "190px",
          borderRadius: currentRadius,
          overflow: "hidden",
          border: `2px solid ${activeAccent}`,
          boxShadow: `0 0 ${glow / 4}px ${activeAccent}, 0 10px 30px rgba(0,0,0,0.5)`,
          background: activeBg,
          fontFamily: fontFamily,
          transition: "all 250ms cubic-bezier(.2,.8,.2,1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        {content ? (
          content
        ) : (
          <>
            <Image
              src="/assets/homepage/continent.jpg"
              alt="Campaign map real-time preview"
              fill
              sizes="(max-width: 768px) 100vw, 380px"
              style={{ objectFit: "cover", opacity: Math.max(0.3, transparency / 100) }}
            />
            {/* Live Interactive UI Overlay */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  background: "rgba(10, 14, 26, 0.75)",
                  backdropFilter: `blur(${blur}px)`,
                  border: "1px solid rgba(255,255,255,0.1)",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                <Flame size={14} style={{ color: activeAccent }} />
                <span>23 Streak</span>
              </div>

              <div
                style={{
                  padding: "4px 10px",
                  borderRadius: "20px",
                  background: activeAccent,
                  color: "#FFFFFF",
                  fontSize: "10px",
                  fontWeight: 800,
                  boxShadow: `0 0 12px ${activeAccent}`,
                  textTransform: "uppercase",
                }}
              >
                {theme} Mode
              </div>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 1,
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(10, 14, 26, 0.8)",
                backdropFilter: `blur(${blur}px)`,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#FFFFFF", display: "block" }}>
                Active Font: {fontFamily}
              </span>
              <span style={{ fontSize: "9px", color: "#9AA4B2" }}>
                Accent: {accentColor} • Radius: {radius}
              </span>
            </div>
          </>
        )}
      </div>
    </SidebarWidget>
  );
}
