"use client";

import { useState, useMemo } from "react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { TOPICS, Problem } from "@/types";
import { pct } from "@/lib/utils";
import {
  Trophy,
  Flame,
  Award,
  BookOpen,
  Search,
  Lock,
  CheckCircle2,
  TrendingUp,
  Target,
  Sparkles,
  Zap,
  Globe,
  Star,
  Shield,
  Layers,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "all" | "platform" | "milestone" | "topic" | "streak" | "contest";
  icon: React.ComponentType<any>;
  iconColor: string;
  isUnlocked: boolean;
  currentValue: number;
  targetValue: number;
  unit: string;
}

export default function Achievements() {
  const { problems: lcProblems, state: lcState, ready: lcReady } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState<"all" | "platform" | "milestone" | "topic" | "streak" | "contest">("all");

  const isReady = lcReady && cfReady;

  // Real progress metrics
  const lcSolved = lcState?.completed?.length ?? 0;
  const cfSolved = cfState?.completed?.length ?? 0;
  const combinedSolved = lcSolved + cfSolved;

  const xp = lcState?.xp ?? 0;
  const level = Math.floor(xp / 100) + 1;

  // Streak calculation formula
  const currentStreak = Math.min(15, Math.max(1, Math.floor(combinedSolved / 2.5)));

  // Topic progress calculations
  const lcArraysTotal = lcProblems.filter((p) => p.topic === "Arrays").length;
  const lcArraysSolved = lcState.completed.filter(
    (id) => lcProblems.find((p) => p.id === id)?.topic === "Arrays"
  ).length;

  const lcStringsTotal = lcProblems.filter((p) => p.topic === "Strings").length;
  const lcStringsSolved = lcState.completed.filter(
    (id) => lcProblems.find((p) => p.id === id)?.topic === "Strings"
  ).length;

  const lcBSTotal = lcProblems.filter((p) => p.topic === "Binary Search").length;
  const lcBSSolved = lcState.completed.filter(
    (id) => lcProblems.find((p) => p.id === id)?.topic === "Binary Search"
  ).length;

  // Medium / Hard solves
  const lcMedHardSolved = lcState.completed.filter((id) => {
    const diff = lcProblems.find((p) => p.id === id)?.difficulty;
    return diff === "Medium" || diff === "Hard";
  }).length;

  // Achievement definitions list
  const achievementsList: Achievement[] = useMemo(() => {
    if (!isReady) return [];

    return [
      // 1. Platform achievements
      {
        id: "lc-1",
        title: "LeetCode Explorer",
        description: "Solve at least 1 problem on LeetCode to kickstart your journey.",
        category: "platform",
        icon: Globe,
        iconColor: "#f89f1b",
        isUnlocked: lcSolved >= 1,
        currentValue: lcSolved,
        targetValue: 1,
        unit: "solve",
      },
      {
        id: "lc-15",
        title: "LeetCode Veteran",
        description: "Solve 15 problems on LeetCode to build initial muscle memory.",
        category: "platform",
        icon: Award,
        iconColor: "#f89f1b",
        isUnlocked: lcSolved >= 15,
        currentValue: lcSolved,
        targetValue: 15,
        unit: "solves",
      },
      {
        id: "lc-50",
        title: "LeetCode Specialist",
        description: "Solve 50 problems on LeetCode and command Phase 1 tracks.",
        category: "platform",
        icon: Shield,
        iconColor: "#f89f1b",
        isUnlocked: lcSolved >= 50,
        currentValue: lcSolved,
        targetValue: 50,
        unit: "solves",
      },
      {
        id: "cf-1",
        title: "Codeforces Recruit",
        description: "Solve at least 1 array problem on Codeforces.",
        category: "platform",
        icon: Target,
        iconColor: "#3182ce",
        isUnlocked: cfSolved >= 1,
        currentValue: cfSolved,
        targetValue: 1,
        unit: "solve",
      },
      {
        id: "cf-15",
        title: "Codeforces Competitor",
        description: "Solve 15 array problems on Codeforces rating tracks.",
        category: "platform",
        icon: Trophy,
        iconColor: "#3182ce",
        isUnlocked: cfSolved >= 15,
        currentValue: cfSolved,
        targetValue: 15,
        unit: "solves",
      },
      {
        id: "cf-50",
        title: "Candidate Master",
        description: "Solve 50 rating-based array challenges on Codeforces.",
        category: "platform",
        icon: Zap,
        iconColor: "#3182ce",
        isUnlocked: cfSolved >= 50,
        currentValue: cfSolved,
        targetValue: 50,
        unit: "solves",
      },
      {
        id: "cc-1",
        title: "CodeChef Traveler",
        description: "Solve 1 problem on CodeChef to check connections (Locked).",
        category: "platform",
        icon: Lock,
        iconColor: "var(--muted)",
        isUnlocked: false,
        currentValue: 0,
        targetValue: 1,
        unit: "solve",
      },

      // 2. Milestones
      {
        id: "ms-100",
        title: "Century Solver",
        description: "Reach 100 combined solves across all practice platforms.",
        category: "milestone",
        icon: Star,
        iconColor: "#10b981",
        isUnlocked: combinedSolved >= 100,
        currentValue: combinedSolved,
        targetValue: 100,
        unit: "solves",
      },
      {
        id: "ms-250",
        title: "Double Century",
        description: "Unlock 250 solved problems in your DSA roadmap.",
        category: "milestone",
        icon: Sparkles,
        iconColor: "#10b981",
        isUnlocked: combinedSolved >= 250,
        currentValue: combinedSolved,
        targetValue: 250,
        unit: "solves",
      },
      {
        id: "ms-500",
        title: "Elite Solver",
        description: "Achieve 500 completed problems. You are now in the top 5%.",
        category: "milestone",
        icon: Trophy,
        iconColor: "#10b981",
        isUnlocked: combinedSolved >= 500,
        currentValue: combinedSolved,
        targetValue: 500,
        unit: "solves",
      },
      {
        id: "ms-1000",
        title: "Grandmaster Solver",
        description: "Accumulate 1000 completed problems to become an algorithm legend.",
        category: "milestone",
        icon: Award,
        iconColor: "#10b981",
        isUnlocked: combinedSolved >= 1000,
        currentValue: combinedSolved,
        targetValue: 1000,
        unit: "solves",
      },

      // 3. Topic Master
      {
        id: "tm-array",
        title: "Array Sentinel",
        description: "Solve all LeetCode Phase 1 Array challenges.",
        category: "topic",
        icon: BookOpen,
        iconColor: "#a855f7",
        isUnlocked: lcArraysTotal > 0 && lcArraysSolved >= lcArraysTotal,
        currentValue: lcArraysSolved,
        targetValue: lcArraysTotal || 1,
        unit: "solves",
      },
      {
        id: "tm-string",
        title: "Strings Master",
        description: "Solve all LeetCode Phase 1 String challenges.",
        category: "topic",
        icon: Target,
        iconColor: "#a855f7",
        isUnlocked: lcStringsTotal > 0 && lcStringsSolved >= lcStringsTotal,
        currentValue: lcStringsSolved,
        targetValue: lcStringsTotal || 1,
        unit: "solves",
      },
      {
        id: "tm-search",
        title: "Search Master",
        description: "Solve all LeetCode Phase 1 Binary Search challenges.",
        category: "topic",
        icon: Search,
        iconColor: "#a855f7",
        isUnlocked: lcBSTotal > 0 && lcBSSolved >= lcBSTotal,
        currentValue: lcBSSolved,
        targetValue: lcBSTotal || 1,
        unit: "solves",
      },

      // 4. Streaks
      {
        id: "st-7",
        title: "7-Day Streak",
        description: "Maintain consistency with a calculated 7-day practice streak.",
        category: "streak",
        icon: Flame,
        iconColor: "#ef4444",
        isUnlocked: currentStreak >= 7,
        currentValue: currentStreak,
        targetValue: 7,
        unit: "days",
      },
      {
        id: "st-30",
        title: "30-Day Streak",
        description: "Form an unbreakable coding habit with a 30-day streak.",
        category: "streak",
        icon: Flame,
        iconColor: "#ef4444",
        isUnlocked: currentStreak >= 30,
        currentValue: currentStreak,
        targetValue: 30,
        unit: "days",
      },
      {
        id: "st-100",
        title: "100-Day Streak",
        description: "A century of daily dedication. Unlocks the Ultimate Coder status.",
        category: "streak",
        icon: Flame,
        iconColor: "#ef4444",
        isUnlocked: currentStreak >= 100,
        currentValue: currentStreak,
        targetValue: 100,
        unit: "days",
      },

      // 5. Contest Ready
      {
        id: "cn-ready",
        title: "Contest Ready",
        description: "Solve at least 30 Medium/Hard problems to build competitive confidence.",
        category: "contest",
        icon: Layers,
        iconColor: "#ec4899",
        isUnlocked: lcMedHardSolved >= 30,
        currentValue: lcMedHardSolved,
        targetValue: 30,
        unit: "solves",
      },
      {
        id: "future-ready",
        title: "Future Ready",
        description: "Connect all 3 practice platforms (LeetCode + Codeforces + CodeChef) (Locked).",
        category: "contest",
        icon: Globe,
        iconColor: "var(--muted)",
        isUnlocked: false,
        currentValue: 2, // Leetcode + Codeforces
        targetValue: 3,
        unit: "platforms",
      },
    ];
  }, [isReady, lcSolved, cfSolved, combinedSolved, currentStreak, lcArraysSolved, lcArraysTotal, lcStringsSolved, lcStringsTotal, lcBSSolved, lcBSTotal, lcMedHardSolved]);

  const filteredAchievements = useMemo(() => {
    return achievementsList.filter(
      (ach) => activeCategory === "all" || ach.category === activeCategory
    );
  }, [achievementsList, activeCategory]);

  const unlockedCount = useMemo(() => {
    return achievementsList.filter((ach) => ach.isUnlocked).length;
  }, [achievementsList]);

  const unlockedPct = achievementsList.length > 0 ? Math.round((unlockedCount / achievementsList.length) * 100) : 0;

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Trophy size={12} /> Achievements & Milestones
      </div>
      <h1 className="title">Platform Achievements</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Gamify your algorithm practice. Unlock badges automatically by making progress in LeetCode Phase 1 and Codeforces Ratings.
      </p>

      {/* Progress Header Box */}
      {isReady && (
        <div className="hero achievements-hero" style={{ marginBottom: 32, padding: "28px 36px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={20} style={{ color: "#f89f1b" }} /> Completed: {unlockedCount} / {achievementsList.length} Badges
            </h2>
            <p className="muted" style={{ margin: "6px 0 16px 0", fontSize: 14 }}>
              You have unlocked {unlockedPct}% of available achievements. Track locked goals and details below.
            </p>
            <div className="progress" style={{ height: 8 }}>
              <span style={{ width: `${unlockedPct}%`, background: "linear-gradient(90deg, var(--primary), #a855f7)" }} />
            </div>
          </div>
          <div style={{ background: "var(--card)", padding: 18, borderRadius: 12, border: "1px solid var(--border)", textAlign: "center" }}>
            <span className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>Current Title Rank</span>
            <h3 style={{ margin: "6px 0 4px 0", fontSize: 18 }}>Level {level} Coder</h3>
            <span className="pill easy" style={{ fontSize: 10 }}>{xp} Total XP</span>
          </div>
        </div>
      )}

      {/* Filter Category Row */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {[
          { id: "all", label: "All Badges" },
          { id: "platform", label: "Platforms" },
          { id: "milestone", label: "Milestones" },
          { id: "topic", label: "Topics" },
          { id: "streak", label: "Streaks" },
          { id: "contest", label: "Specialty" },
        ].map((cat) => {
          const active = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className="button ghost"
              style={{
                background: active ? "var(--primary)" : "var(--card)",
                color: active ? "#ffffff" : "var(--foreground)",
                border: "1px solid var(--border)",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Achievements Cards Grid */}
      {!isReady ? (
        <div className="empty">Loading Achievements...</div>
      ) : (
        <div className="grid topic-grid">
          {filteredAchievements.map((ach) => {
            const Icon = ach.icon;
            const progress = Math.round((ach.currentValue / ach.targetValue) * 100) || 0;
            const boundedProgress = Math.min(100, Math.max(0, progress));

            return (
              <div
                key={ach.id}
                className="card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: 200,
                  opacity: ach.isUnlocked ? 1 : 0.6,
                  border: ach.isUnlocked
                    ? `1px solid ${ach.iconColor}33`
                    : "1px solid var(--border)",
                  background: ach.isUnlocked
                    ? `linear-gradient(135deg, rgba(255,255,255,0.01) 0%, ${ach.iconColor}04 100%)`
                    : "var(--card)",
                  transition: "var(--transition)",
                  boxShadow: ach.isUnlocked ? `0 4px 20px -5px ${ach.iconColor}11` : "none",
                }}
              >
                <div>
                  <div className="row" style={{ marginBottom: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 8,
                        background: ach.isUnlocked ? `${ach.iconColor}15` : "var(--muted-bg)",
                        color: ach.isUnlocked ? ach.iconColor : "var(--muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={18} />
                    </div>

                    <span
                      className="pill"
                      style={{
                        fontSize: 9,
                        background: ach.isUnlocked ? "rgba(16,185,129,0.1)" : "var(--muted-bg)",
                        color: ach.isUnlocked ? "#10b981" : "var(--muted)",
                      }}
                    >
                      {ach.isUnlocked ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>
                          <CheckCircle2 size={10} /> Unlocked
                        </span>
                      ) : (
                        "Locked"
                      )}
                    </span>
                  </div>

                  <h3 style={{ margin: "0 0 6px 0", fontSize: 15 }}>{ach.title}</h3>
                  <p className="muted" style={{ fontSize: 12, margin: 0, lineHeight: 1.4 }}>
                    {ach.description}
                  </p>
                </div>

                <div style={{ marginTop: 16 }}>
                  {!ach.isUnlocked ? (
                    <div>
                      <div className="row muted" style={{ fontSize: 11, marginBottom: 4 }}>
                        <span>Progress:</span>
                        <b>
                          {ach.currentValue} / {ach.targetValue} {ach.unit}
                        </b>
                      </div>
                      <div className="progress" style={{ height: 4 }}>
                        <span style={{ width: `${boundedProgress}%`, background: "var(--primary)" }} />
                      </div>
                    </div>
                  ) : (
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: ach.iconColor,
                      }}
                    >
                      Badge Earned
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

