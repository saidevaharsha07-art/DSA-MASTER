"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { UserData } from "@/lib/mock/dashboard";

interface WelcomeBannerProps {
  user: UserData;
}

export function WelcomeBanner({ user }: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="hero"
      style={{
        padding: "32px 40px",
        position: "relative",
        overflow: "hidden",
        borderRadius: 16,
        background: "linear-gradient(135deg, rgba(248,159,27,0.06) 0%, rgba(139,92,246,0.02) 100%)",
        border: "1px solid var(--border)",
        width: "100%",
      }}
    >
      {/* Background radial highlight */}
      <div
        style={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(248,159,27,0.12) 0%, transparent 70%)",
          top: "-20px",
          right: "-20px",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <Sparkles size={12} style={{ color: "var(--primary)" }} /> Algorithm Command Center
        </div>
        <h1 className="title" style={{ margin: 0, fontSize: 30 }}>Good Morning, {user.name}</h1>
        <p className="muted" style={{ fontSize: 14, margin: "6px 0 16px 0", maxWidth: 640 }}>
          Active Phase: <b>{user.currentPhase}</b> · Topic: <b>{user.currentTopic}</b> · Pattern: <b>{user.currentPattern}</b>
        </p>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, marginTop: 14 }}>
          <span style={{ fontSize: 12, fontStyle: "italic", color: "var(--muted)", display: "block" }}>
            &ldquo;{user.quote}&rdquo;
          </span>
        </div>
      </div>
    </motion.div>
  );
}
