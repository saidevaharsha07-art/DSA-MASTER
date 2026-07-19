"use client";

import { CheckCircle2, CheckSquare, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MissionData } from "@/lib/mock/dashboard";

interface DailyMissionCardProps {
  missions: MissionData[];
  xpReward: number;
  onToggleMission: (id: string) => void;
}

export function DailyMissionCard({
  missions,
  xpReward,
  onToggleMission,
}: DailyMissionCardProps) {
  const completedMissions = missions.filter((m) => m.isCompleted).length;
  const missionProgress = missions.length > 0 ? Math.round((completedMissions / missions.length) * 100) : 0;

  // Stagger wrapper options
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
    hidden: { opacity: 0, y: 10 },
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
      <div className="row" style={{ marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={18} style={{ color: "var(--primary)" }} /> Daily Mission
        </h3>
        <span className="pill easy" style={{ fontSize: 10 }}>
          +{xpReward} XP Reward
        </span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ display: "grid", gap: 12 }}
      >
        {missions.map((mission) => (
          <motion.button
            key={mission.id}
            variants={itemVariants}
            onClick={() => onToggleMission(mission.id)}
            className="button ghost"
            whileTap={{ scale: 0.98 }}
            style={{
              justifyContent: "space-between",
              padding: "12px 16px",
              background: mission.isCompleted ? "rgba(16,185,129,0.03)" : "var(--muted-bg)",
              borderColor: mission.isCompleted ? "rgba(16,185,129,0.2)" : "var(--border)",
              borderRadius: 8,
              width: "100%",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ position: "relative", width: 16, height: 16 }}>
                <AnimatePresence mode="wait">
                  {mission.isCompleted ? (
                    <motion.div
                      key="checked"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <CheckSquare size={16} style={{ color: "var(--easy-fg)" }} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="unchecked"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Square size={16} className="muted" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", textDecoration: mission.isCompleted ? "line-through" : "none", opacity: mission.isCompleted ? 0.7 : 1 }}>
                  {mission.title}
                </span>
                <span className="muted" style={{ display: "block", fontSize: 11, marginTop: 2 }}>{mission.meta}</span>
              </div>
            </div>
            <span className="muted" style={{ fontSize: 11 }}>
              {mission.isCompleted ? "Completed" : "Pending"}
            </span>
          </motion.button>
        ))}
      </motion.div>

      {/* Mission Progress Bar */}
      <div style={{ marginTop: 20, borderTop: "1px solid var(--border)", paddingTop: 16 }}>
        <div className="row" style={{ fontSize: 11, marginBottom: 6 }}>
          <span className="muted">DAILY PROGRESS:</span>
          <b>{missionProgress}%</b>
        </div>
        <div className="progress" style={{ height: 5 }}>
          <motion.span
            initial={{ width: 0 }}
            animate={{ width: `${missionProgress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ background: "var(--easy-fg)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
