"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { RecommendationData } from "@/lib/mock/dashboard";

interface AiRecommendationCardProps {
  recommendation: RecommendationData;
}

export function AiRecommendationCard({ recommendation }: AiRecommendationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="card"
      style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.06) 0%, rgba(99,102,241,0.02) 100%)",
        borderColor: "rgba(139,92,246,0.2)",
      }}
    >
      <h3 style={{ margin: "0 0 12px 0", fontSize: 16, color: "#a855f7", display: "flex", alignItems: "center", gap: 8 }}>
        <Sparkles size={16} /> AI Coach Recommendation
      </h3>
      <div style={{ fontSize: 13, lineHeight: 1.5 }}>
        <p style={{ margin: 0 }}>
          &ldquo;{recommendation.reason}&rdquo;
        </p>
        <div
          style={{
            background: "var(--muted-bg)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: 12,
            marginTop: 14,
          }}
        >
          <span className="muted" style={{ fontSize: 11 }}>UP NEXT FOR MASTERING {recommendation.pattern.toUpperCase()}:</span>
          <div className="row" style={{ marginTop: 4 }}>
            <b style={{ color: "var(--foreground)" }}>{recommendation.target}</b>
            <Link href="/problems/leetcode" className="button ghost" style={{ padding: "4px 8px", fontSize: 11 }}>
              Solve Now →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
