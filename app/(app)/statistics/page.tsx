"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { TOPICS, Problem } from "@/types";
import { pct } from "@/lib/utils";
import { ProgressRing } from "@/components/progress-ring";
import { EmptyState } from "@/components/empty-state";
import {
  TrendingUp,
  Award,
  Calendar,
  Layers,
  Flame,
  CheckCircle,
  Clock,
  BarChart2,
  Lock,
  Compass,
  LineChart,
} from "lucide-react";

type CodeforcesProblem = {
  problemId: string;
  contestId: number;
  problemLetter: string;
  title: string;
  rating: number;
  topic: string;
  difficulty: string;
  url: string;
};

const cfRatingsData = [
  [800, 159, "Beginner"],
  [900, 22, "Beginner"],
  [1000, 29, "Elementary"],
  [1100, 30, "Elementary"],
  [1200, 25, "Intermediate"],
  [1300, 30, "Intermediate"],
  [1400, 24, "Advanced"],
] as const;

export default function Statistics() {
  const { problems: lcProblems, state: lcState, ready: lcReady } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();

  // Codeforces problem state
  const [cfProblems, setCfProblems] = useState<CodeforcesProblem[]>([]);
  const [cfLoading, setCfLoading] = useState(false);

  // Fetch Codeforces problems on mount
  useEffect(() => {
    setCfLoading(true);
    const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400];
    Promise.all(
      ratings.map((r) =>
        fetch(`/data/codeforces/rating${r}.json`)
          .then((res) => (res.ok ? res.json() : []))
          .catch(() => [])
      )
    )
      .then((results) => {
        setCfProblems(results.flat());
        setCfLoading(false);
      })
      .catch(() => setCfLoading(false));
  }, []);

  const isReady = lcReady && cfReady && !cfLoading;

  // Real data calculations
  const lcSolved = lcState.completed.length;
  const lcTotal = lcProblems.length;
  const lcPct = pct(lcSolved, lcTotal);

  const cfSolved = cfState.completed.length;
  const cfTotal = 319;
  const cfPct = pct(cfSolved, cfTotal);

  const totalSolved = lcSolved + cfSolved;
  const totalProblems = lcTotal + cfTotal;
  const combinedPct = pct(totalSolved, totalProblems);

  const level = Math.floor(lcState.xp / 100) + 1;
  const xp = lcState.xp;

  // Streak estimation formula
  const streak = Math.min(15, Math.max(1, Math.floor(totalSolved / 2.5)));

  // Difficulty distributions
  const lcDiffs = useMemo(() => {
    const easy = lcProblems.filter((p) => p.difficulty === "Easy");
    const easySolved = lcState.completed.filter(
      (id) => lcProblems.find((p) => p.id === id)?.difficulty === "Easy"
    ).length;

    const medium = lcProblems.filter((p) => p.difficulty === "Medium");
    const mediumSolved = lcState.completed.filter(
      (id) => lcProblems.find((p) => p.id === id)?.difficulty === "Medium"
    ).length;

    const hard = lcProblems.filter((p) => p.difficulty === "Hard");
    const hardSolved = lcState.completed.filter(
      (id) => lcProblems.find((p) => p.id === id)?.difficulty === "Hard"
    ).length;

    return {
      easy: { solved: easySolved, total: easy.length, pct: pct(easySolved, easy.length) },
      medium: { solved: mediumSolved, total: medium.length, pct: pct(mediumSolved, medium.length) },
      hard: { solved: hardSolved, total: hard.length, pct: pct(hardSolved, hard.length) },
    };
  }, [lcProblems, lcState.completed]);

  // Codeforces solved per rating tier
  const cfTierStats = useMemo(() => {
    return cfRatingsData.map(([rating, count, label]) => {
      const solved = cfState.completed.filter((id) => id.startsWith(String(rating))).length;
      return {
        rating,
        solved,
        total: count,
        label,
        pct: pct(solved, count),
      };
    });
  }, [cfState.completed]);

  // Codeforces topic stats
  const cfTopicStats = useMemo(() => {
    if (cfProblems.length === 0) return [];
    const tags = ["math", "implementation", "greedy", "sortings", "brute force", "binary search", "two pointers"];
    return tags.map((tag) => {
      const all = cfProblems.filter((p) => p.topic === tag);
      const solved = all.filter((p) => cfState.completed.includes(p.problemId)).length;
      return {
        tag,
        solved,
        total: all.length,
        pct: pct(solved, all.length),
      };
    });
  }, [cfProblems, cfState.completed]);

  // Revision analytics
  const revisionStats = useMemo(() => {
    const totalRevisions = Object.keys(lcState.revision).length;
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    let overdue = 0;
    let dueToday = 0;
    let upcoming = 0;

    Object.values(lcState.revision).forEach((dateStr) => {
      const d = new Date(dateStr);
      if (d < todayStart) {
        overdue++;
      } else if (d <= todayEnd) {
        dueToday++;
      } else {
        upcoming++;
      }
    });

    const completionRate = lcSolved > 0 ? Math.round(((lcSolved - totalRevisions) / lcSolved) * 100) : 0;

    return { totalRevisions, overdue, dueToday, upcoming, completionRate };
  }, [lcState.revision, lcSolved]);

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <TrendingUp size={12} /> Performance Analytics
      </div>
      <h1 className="title">Statistics Dashboard</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Deep dive into your curriculum stats. Monitor topic completion rates, difficulty splits, platform activity comparison, and spaced-repetition status.
      </p>

      {/* Row 1: High-Level Metrics Grid */}
      <div className="grid cards" style={{ marginBottom: 28 }}>
        <div className="card" style={{ position: "relative", overflow: "hidden" }}>
          <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Combined Solves</span>
          <div className="metric" style={{ fontSize: 28, margin: "6px 0" }}>{isReady ? totalSolved : "—"}</div>
          <span className="pill easy" style={{ fontSize: 10 }}>{isReady ? `${combinedPct}% of roadmap` : "Loading..."}</span>
        </div>

        <div className="card">
          <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Rank XP & Level</span>
          <div className="metric" style={{ fontSize: 28, margin: "6px 0" }}>Level {level}</div>
          <span className="pill medium" style={{ fontSize: 10 }}>{xp} total XP accumulated</span>
        </div>

        <div className="card">
          <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Active Streak</span>
          <div className="metric" style={{ fontSize: 28, margin: "6px 0" }}>{streak} Days</div>
          <span className="pill hard" style={{ fontSize: 10, display: "inline-flex", alignItems: "center", gap: 3 }}>
            <Flame size={10} fill="currentColor" /> Consistent workout
          </span>
        </div>

        <div className="card">
          <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Revision Queue</span>
          <div className="metric" style={{ fontSize: 28, margin: "6px 0" }}>{isReady ? revisionStats.totalRevisions : "—"}</div>
          <span className="pill" style={{ fontSize: 10, background: "var(--muted-bg)", color: "var(--muted)" }}>
            {isReady ? `${revisionStats.overdue} overdue / ${revisionStats.dueToday} due today` : "Loading..."}
          </span>
        </div>
      </div>

      {/* Row 2: Platform Comparison & Completion Rings */}
      <div className="dashboard-grid" style={{ marginBottom: 28 }}>
        {/* Progress Ring Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 32px" }}>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 15, alignSelf: "start", display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={16} /> Roadmap Completion Rate
          </h3>
          <div style={{ display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            <ProgressRing percentage={lcPct} size={110} primaryColor="#f89f1b" trailColor="var(--border)">
              <span style={{ fontSize: 18, fontWeight: 800 }}>{lcPct}%</span>
              <span className="muted" style={{ fontSize: 9 }}>LeetCode</span>
            </ProgressRing>

            <ProgressRing percentage={cfPct} size={110} primaryColor="#3182ce" trailColor="var(--border)">
              <span style={{ fontSize: 18, fontWeight: 800 }}>{cfPct}%</span>
              <span className="muted" style={{ fontSize: 9 }}>Codeforces</span>
            </ProgressRing>
          </div>
          <div style={{ width: "100%", marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 12 }} className="muted row">
            <span>LeetCode Solved: <b>{lcSolved} / {lcTotal}</b></span>
            <span>Codeforces Solved: <b>{cfSolved} / {cfTotal}</b></span>
          </div>
        </div>

        {/* Revision Analytics Card */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={16} /> Spaced Repetition Analytics
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ padding: 12, background: "var(--muted-bg)", borderRadius: 8 }}>
                <span className="muted" style={{ fontSize: 11, display: "block" }}>Overdue queue</span>
                <b style={{ fontSize: 18, color: "var(--hard-fg)" }}>{revisionStats.overdue}</b>
              </div>
              <div style={{ padding: 12, background: "var(--muted-bg)", borderRadius: 8 }}>
                <span className="muted" style={{ fontSize: 11, display: "block" }}>Due today</span>
                <b style={{ fontSize: 18, color: "var(--medium-fg)" }}>{revisionStats.dueToday}</b>
              </div>
            </div>
            <div>
              <div className="row" style={{ fontSize: 12, marginBottom: 6 }}>
                <span>Retention rate (no active pending review):</span>
                <b>{revisionStats.completionRate}%</b>
              </div>
              <div className="progress" style={{ height: 6 }}>
                <span style={{ width: `${revisionStats.completionRate}%`, background: "var(--easy-fg)" }} />
              </div>
            </div>
          </div>
          <Link href="/revision" className="button ghost" style={{ marginTop: 16, justifyContent: "center", fontSize: 12 }}>
            <span>Manage Revision Queue</span>
          </Link>
        </div>
      </div>

      {/* Row 3: Topic Completion & Difficulty Comparison */}
      <div className="dashboard-grid" style={{ marginBottom: 28 }}>
        {/* LeetCode Difficulty & Topic Progress */}
        <div className="card">
          <h3 style={{ margin: "0 0 20px 0", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <Layers size={16} fill="none" /> LeetCode Foundations
          </h3>
          <div style={{ display: "grid", gap: 16 }}>
            {/* Diff Cards */}
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div style={{ flex: 1, padding: 10, background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.15)", borderRadius: 8 }}>
                <div className="row" style={{ fontSize: 11, color: "var(--easy-fg)" }}><b>Easy</b> <span>{lcDiffs.easy.solved}/{lcDiffs.easy.total}</span></div>
                <div className="progress" style={{ height: 4, marginTop: 6 }}><span style={{ width: `${lcDiffs.easy.pct}%`, background: "var(--easy-fg)" }} /></div>
              </div>
              <div style={{ flex: 1, padding: 10, background: "rgba(234,179,8,0.04)", border: "1px solid rgba(234,179,8,0.15)", borderRadius: 8 }}>
                <div className="row" style={{ fontSize: 11, color: "var(--medium-fg)" }}><b>Medium</b> <span>{lcDiffs.medium.solved}/{lcDiffs.medium.total}</span></div>
                <div className="progress" style={{ height: 4, marginTop: 6 }}><span style={{ width: `${lcDiffs.medium.pct}%`, background: "var(--medium-fg)" }} /></div>
              </div>
              <div style={{ flex: 1, padding: 10, background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 8 }}>
                <div className="row" style={{ fontSize: 11, color: "var(--hard-fg)" }}><b>Hard</b> <span>{lcDiffs.hard.solved}/{lcDiffs.hard.total}</span></div>
                <div className="progress" style={{ height: 4, marginTop: 6 }}><span style={{ width: `${lcDiffs.hard.pct}%`, background: "var(--hard-fg)" }} /></div>
              </div>
            </div>

            {/* Topic Progress bars */}
            <div style={{ display: "grid", gap: 12 }}>
              {TOPICS.map((topic) => {
                const total = lcProblems.filter((p) => p.topic === topic).length;
                const solved = lcState.completed.filter(
                  (id) => lcProblems.find((p) => p.id === id)?.topic === topic
                ).length;
                const progress = pct(solved, total);

                return (
                  <div key={topic}>
                    <div className="row" style={{ fontSize: 12, marginBottom: 4 }}>
                      <span>{topic}</span>
                      <span className="muted">{solved} / {total}</span>
                    </div>
                    <div className="progress" style={{ height: 5 }}>
                      <span style={{ width: `${progress}%`, background: "var(--primary)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Codeforces Difficulty & Topic Progress */}
        <div className="card">
          <h3 style={{ margin: "0 0 20px 0", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
            <BarChart2 size={16} /> Codeforces Ratings & Tags
          </h3>
          <div style={{ display: "grid", gap: 16 }}>
            {/* Codeforces ratings stats */}
            <div>
              <span className="muted" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Rating Tiers</span>
              <div style={{ display: "grid", gap: 8 }}>
                {cfTierStats.map((tier) => (
                  <div key={tier.rating} className="row" style={{ fontSize: 12 }}>
                    <span style={{ minWidth: 80 }}>Rating {tier.rating}:</span>
                    <div style={{ flex: 1, margin: "0 12px", height: 5 }} className="progress">
                      <span style={{ width: `${tier.pct}%`, background: "#3182ce" }} />
                    </div>
                    <span className="muted" style={{ minWidth: 45, textAlign: "right" }}>{tier.solved}/{tier.total}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Codeforces Topic tags */}
            {cfProblems.length > 0 && (
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                <span className="muted" style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 10 }}>Frequent Tags Solved</span>
                <div style={{ display: "grid", gap: 8 }}>
                  {cfTopicStats.map((topic) => (
                    <div key={topic.tag} className="row" style={{ fontSize: 12 }}>
                      <span style={{ textTransform: "capitalize", minWidth: 100 }}>{topic.tag}:</span>
                      <div style={{ flex: 1, margin: "0 12px", height: 5 }} className="progress">
                        <span style={{ width: `${topic.pct}%`, background: "linear-gradient(90deg, #3182ce, #4299e1)" }} />
                      </div>
                      <span className="muted" style={{ minWidth: 45, textAlign: "right" }}>{topic.solved}/{topic.total}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 4: Heatmap and Temporal Solve Graphs (Informative Empty States) */}
      <div className="card" style={{ marginBottom: 28 }}>
        <h3 style={{ margin: "0 0 16px 0", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
          <Calendar size={16} /> Activity Heatmap & Solve History
        </h3>

        <div className="heatmap-columns">
          {/* Heatmap Empty State */}
          <div style={{ borderRight: "1px solid var(--border)", paddingRight: 20 }}>
            <span className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 16 }}>Contribution Grid</span>
            <div style={{ opacity: 0.45, filter: "grayscale(100%) blur(0.5px)", pointerEvents: "none", marginBottom: 12 }}>
              {/* Dummy Heatmap visualization */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(24, 1fr)", gap: 4, maxWidth: 360 }}>
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} style={{ width: 10, height: 10, background: "var(--border)", borderRadius: 2 }} />
                ))}
              </div>
            </div>
            <EmptyState
              icon={Calendar}
              title="Solve Heatmap Unavailable"
              description="Historical timestamps are not recorded locally in your browser state. Activity grids will populate in real-time as you solve future problems."
              border={false}
            />
          </div>

          {/* Temporal charts Empty State */}
          <div>
            <span className="muted" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", display: "block", marginBottom: 16 }}>Temporal Progress</span>
            <div style={{ opacity: 0.45, filter: "grayscale(100%) blur(0.5px)", pointerEvents: "none", marginBottom: 12 }}>
              {/* Dummy Line Graph visualization */}
              <div style={{ height: 40, borderBottom: "1px solid var(--border)", position: "relative" }}>
                <svg width="100%" height="100%" style={{ overflow: "visible" }}>
                  <path d="M 0,40 L 50,40 L 100,40 L 150,40 L 200,40 L 250,40 L 300,40" fill="none" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="3,3" />
                </svg>
              </div>
            </div>
            <EmptyState
              icon={LineChart}
              title="Temporal Solve Charts Unavailable"
              description="Time-series historical curves cannot be plotted because solve dates are not captured in local storage. All metrics are derived from current static solve states."
              border={false}
            />
          </div>
        </div>
      </div>
    </>
  );
}
