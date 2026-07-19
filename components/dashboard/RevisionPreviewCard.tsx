"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { RevisionData } from "@/lib/mock/dashboard";

interface RevisionPreviewCardProps {
  revisions: RevisionData[];
}

export function RevisionPreviewCard({ revisions }: RevisionPreviewCardProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <div className="row" style={{ marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <RotateCcw size={16} style={{ color: "var(--primary)" }} /> Revisions due today
        </h3>
        <span className="pill medium" style={{ fontSize: 10 }}>
          {revisions.length} due
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: "grid", gap: 10, marginBottom: 16 }}
      >
        {revisions.map((rev) => (
          <motion.div
            key={rev.id}
            variants={itemVariants}
            className="row"
            style={{
              padding: "10px 12px",
              background: "var(--muted-bg)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            <div>
              <b style={{ display: "block" }}>{rev.title}</b>
              <span className="muted" style={{ fontSize: 11 }}>Last seen {rev.lastSeen}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="pill" style={{ fontSize: 9, background: "var(--border)", marginRight: 8 }}>{rev.difficulty}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--medium-fg)" }}>{rev.score}%</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Link href="/revision" className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
        Open Revision Center ({revisions.length} due)
      </Link>
    </motion.div>
  );
}
