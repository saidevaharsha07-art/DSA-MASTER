"use client";

import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { ActivityData } from "@/lib/mock/dashboard";

interface RecentActivityCardProps {
  activities: ActivityData[];
}

export function RecentActivityCard({ activities }: RecentActivityCardProps) {
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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <h3 style={{ margin: "0 0 16px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <Layers size={16} style={{ color: "var(--primary)" }} /> Recent Activity
      </h3>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: "grid", gap: 18, position: "relative", paddingLeft: 16 }}
      >
        {/* Timeline connector line */}
        <div style={{ position: "absolute", left: 4, top: 8, bottom: 8, width: 2, background: "var(--border)" }} />

        {activities.map((act) => {
          return (
            <motion.div key={act.id} variants={itemVariants} style={{ position: "relative" }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: -16,
                  top: 4,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: act.type === "completed" ? "var(--easy-fg)" : act.type === "mastered" ? "var(--primary)" : "var(--accent)",
                  border: "2px solid var(--card)",
                  boxShadow: "0 0 0 2px var(--border)",
                }}
              />
              <div style={{ fontSize: 13 }}>
                <b style={{ display: "block", color: "var(--foreground)" }}>{act.title}</b>
                <span className="muted" style={{ fontSize: 11, display: "block", marginTop: 2 }}>
                  {act.meta} · {act.time}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
