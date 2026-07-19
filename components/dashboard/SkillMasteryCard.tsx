"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { SkillData } from "@/lib/mock/dashboard";

interface SkillMasteryCardProps {
  skills: SkillData[];
}

export function SkillMasteryCard({ skills }: SkillMasteryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      <h3 style={{ margin: "0 0 16px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
        <TrendingUp size={18} style={{ color: "var(--primary)" }} /> Concept Mastery
      </h3>
      <div style={{ display: "grid", gap: 16 }}>
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="row" style={{ fontSize: 12, marginBottom: 4 }}>
              <span style={{ fontWeight: 500 }}>{skill.name}</span>
              <b style={{ color: skill.color }}>{skill.pct}% ({skill.status})</b>
            </div>
            <div className="progress" style={{ height: 6 }}>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: `${skill.pct}%` }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ background: skill.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
