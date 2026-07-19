"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { UserData } from "@/lib/mock/dashboard";

interface JourneyCardProps {
  user: UserData;
  completedPatternsCount: number;
  totalPatternsCount: number;
  continueHref: string;
}

export function JourneyCard({
  user,
  completedPatternsCount,
  totalPatternsCount,
  continueHref,
}: JourneyCardProps) {
  // SVG progress variables
  const radius = 32;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius; // ~201
  const offset = circumference - (circumference * user.progressPct) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "start", gap: 16 }}>
        <div>
          <span className="eyebrow" style={{ color: "var(--primary)", display: "block", marginBottom: 6 }}>Current Learning Journey</span>
          <h3 style={{ margin: "0 0 6px 0", fontSize: 18 }}>{user.currentPhase}</h3>
          <p className="muted" style={{ fontSize: 13, margin: 0 }}>
            Focusing on cumulative array precomputation via <b>{user.currentPattern}</b>.
          </p>
        </div>
        <div style={{ position: "relative", width: 72, height: 72, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="72" height="72" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="36" cy="36" r={radius} stroke="var(--border)" strokeWidth={strokeWidth} fill="none" />
            <motion.circle
              cx="36"
              cy="36"
              r={radius}
              stroke="var(--primary)"
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ position: "absolute", fontSize: 13, fontWeight: 700 }}>
            {user.progressPct}%
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: 18, marginTop: 18 }}>
        <span className="muted" style={{ fontSize: 12 }}>Completed {completedPatternsCount} / {totalPatternsCount} patterns</span>
        <Link href={continueHref} className="button" style={{ padding: "8px 16px", fontSize: 12 }}>
          Continue Learning <ArrowRight size={14} style={{ marginLeft: 6 }} />
        </Link>
      </div>
    </motion.div>
  );
}
