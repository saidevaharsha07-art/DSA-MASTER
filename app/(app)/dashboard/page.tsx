"use client";

import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { TOPICS, Problem } from "@/types";
import { pct } from "@/lib/utils";
import { TopicCard } from "@/components/topic-card";
import {
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Star,
  ArrowRight,
  TrendingUp,
  Activity,
  Code,
  Lock,
  Layers,
  Award,
} from "lucide-react";

export default function Dashboard() {
  const { problems, state, ready } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();

  const done = state.completed.length;
  const totalProblems = problems.length;
  const leetcodeProgress = pct(done, totalProblems);

  // Codeforces Metrics
  const cfDone = cfState?.completed?.length ?? 0;
  const cfTotal = 319; // Hardcoded total Codeforces problems
  const cfProgress = pct(cfDone, cfTotal);

  // Combined stats
  const totalSolved = done + cfDone;
  const totalCombined = totalProblems + cfTotal;
  const overallProgressPct = pct(totalSolved, totalCombined);
  const todayRevisionCount = Object.values(state.revision).filter(
    (d) => new Date(d) <= new Date()
  ).length;

  // Level & XP tier calculation
  const xp = state.xp;
  let levelName = "Novice Coder";
  let levelNum = 1;
  let nextLevelXp = 150;
  let prevLevelXp = 0;

  if (xp >= 1500) {
    levelName = "Grandmaster";
    levelNum = 5;
    nextLevelXp = 3000;
    prevLevelXp = 1500;
  } else if (xp >= 800) {
    levelName = "Expert";
    levelNum = 4;
    nextLevelXp = 1500;
    prevLevelXp = 800;
  } else if (xp >= 400) {
    levelName = "Specialist";
    levelNum = 3;
    nextLevelXp = 800;
    prevLevelXp = 400;
  } else if (xp >= 150) {
    levelName = "Apprentice";
    levelNum = 2;
    nextLevelXp = 400;
    prevLevelXp = 150;
  }

  const levelProgress = xp > 0 ? Math.min(100, Math.round(((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100)) : 0;

  // Continue Learning Logic
  const nextProblem = problems.find((p) => !state.completed.includes(p.id));
  const continueHref = nextProblem ? `/topic/${encodeURIComponent(nextProblem.topic)}` : "/roadmap";

  // Recent Activity details
  const recentSolved = state.completed
    .slice(-3)
    .reverse()
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is Problem => !!p);

  const recentFavorites = state.favorites
    .slice(-3)
    .reverse()
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is Problem => !!p);

  const dueRevisions = Object.keys(state.revision)
    .map(Number)
    .map((id) => problems.find((p) => p.id === id))
    .filter((p): p is Problem => !!p)
    .slice(0, 3);

  // Difficulty metrics
  const easySolved = problems.filter((p) => p.difficulty === "Easy" && state.completed.includes(p.id)).length;
  const easyTotal = problems.filter((p) => p.difficulty === "Easy").length;
  const medSolved = problems.filter((p) => p.difficulty === "Medium" && state.completed.includes(p.id)).length;
  const medTotal = problems.filter((p) => p.difficulty === "Medium").length;
  const hardSolved = problems.filter((p) => p.difficulty === "Hard" && state.completed.includes(p.id)).length;
  const hardTotal = problems.filter((p) => p.difficulty === "Hard").length;

  const hasActivity = recentSolved.length > 0 || recentFavorites.length > 0 || dueRevisions.length > 0;

  return (
    <>
      {/* Welcome Hero Command Center */}
      <div className="hero" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 24, marginBottom: 28 }}>
        <div style={{ flex: "1 1 500px" }}>
          <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Award size={14} /> Personal Learning Center
          </div>
          <h1 className="title" style={{ fontSize: 32, marginTop: 4 }}>Welcome back, Learner!</h1>
          <p className="muted" style={{ margin: "6px 0 20px 0", fontSize: 15, maxWidth: "600px" }}>
            Ready to tackle your next algorithm? Level up your problem solving skills with structured daily habits.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href={continueHref} className="button">
              <span>Continue Learning</span>
              <ArrowRight size={16} />
            </Link>
            <Link href="/roadmap" className="button ghost">
              View curriculum
            </Link>
          </div>
        </div>

        {/* Level / XP Progress Box */}
        <div
          className="card"
          style={{
            flex: "1 1 300px",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(10px)",
            padding: 24,
            border: "1px solid var(--border)",
          }}
        >
          <div className="row">
            <span style={{ fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "var(--primary)", letterSpacing: "1px" }}>
              Level {levelNum} · {levelName}
            </span>
            <span className="muted" style={{ fontSize: 12 }}>
              {xp} / {nextLevelXp} XP
            </span>
          </div>
          <div className="metric" style={{ fontSize: 24, margin: "6px 0 12px 0", display: "flex", alignItems: "baseline", gap: 4 }}>
            <span>{xp}</span>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--muted)" }}>XP Total</span>
          </div>
          <div className="progress" style={{ marginTop: 8, height: 6 }}>
            <span style={{ width: `${levelProgress}%`, background: "linear-gradient(90deg, var(--primary), #a855f7)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
            <span>Level {levelNum}</span>
            <span>Level {levelNum + 1}</span>
          </div>
        </div>
      </div>

      {/* Core Metrics Summary Grid */}
      <section className="grid cards" style={{ marginBottom: 32 }}>
        {[
          { label: "LeetCode Solved", val: done, desc: `out of ${totalProblems} problems`, icon: CheckCircle2, col: "var(--easy-fg)" },
          { label: "Codeforces Solved", val: cfDone, desc: `out of ${cfTotal} problems`, icon: Code, col: "var(--primary)" },
          { label: "Overall Progress", val: `${overallProgressPct}%`, desc: `${totalSolved} / ${totalCombined} total`, icon: TrendingUp, col: "#a855f7" },
          { label: "Revision Due", val: todayRevisionCount, desc: "revisions scheduled today", icon: Calendar, col: "var(--medium-fg)" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div className="card" key={idx} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div className="row" style={{ alignItems: "flex-start" }}>
                  <span className="muted" style={{ fontSize: 13, fontWeight: 500 }}>{item.label}</span>
                  <div style={{ color: item.col, padding: 4, borderRadius: 6, background: "rgba(255,255,255,0.03)" }}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="metric" style={{ marginTop: 12 }}>{ready ? item.val : "—"}</div>
              </div>
              <p className="muted" style={{ fontSize: 12, marginTop: 8, marginBottom: 0 }}>{item.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Platform Overview */}
      <div style={{ marginBottom: 32 }}>
        <h2 className="title" style={{ fontSize: 22, marginBottom: 16 }}>Platform Connections</h2>
        <div className="grid topic-grid">
          {/* LeetCode Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="row">
                <span style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f89f1b" }} />
                  LeetCode
                </span>
                <span className="pill easy" style={{ fontSize: 10, padding: "2px 8px" }}>
                  {ready ? "Connected" : "Loading"}
                </span>
              </div>
              <p className="muted" style={{ fontSize: 13, margin: "10px 0 16px 0" }}>
                Topic-wise algorithm mastery based on curated Phase 1 roadmap.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12, marginBottom: 16 }}>
                <div>
                  <span className="muted">Solved:</span> <b>{done} / {totalProblems}</b>
                </div>
                <div>
                  <span className="muted">Favorites:</span> <b>{state.favorites.length}</b>
                </div>
                <div>
                  <span className="muted">Revisions:</span> <b>{todayRevisionCount} due</b>
                </div>
                <div>
                  <span className="muted">Completion:</span> <b>{leetcodeProgress}%</b>
                </div>
              </div>
              <div className="progress" style={{ height: 6, marginBottom: 18 }}>
                <span style={{ width: `${leetcodeProgress}%` }} />
              </div>
            </div>
            <Link href="/problems/leetcode" className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
              Open LeetCode Hub
            </Link>
          </div>

          {/* Codeforces Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div className="row">
                <span style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3182ce" }} />
                  Codeforces
                </span>
                <span className="pill easy" style={{ fontSize: 10, padding: "2px 8px" }}>
                  {cfReady ? "Connected" : "Loading"}
                </span>
              </div>
              <p className="muted" style={{ fontSize: 13, margin: "10px 0 16px 0" }}>
                Rating-wise competitive programming practice tracker.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12, marginBottom: 16 }}>
                <div>
                  <span className="muted">Solved:</span> <b>{cfDone} / {cfTotal}</b>
                </div>
                <div>
                  <span className="muted">Favorites:</span> <b>{cfState?.favorites?.length ?? 0}</b>
                </div>
                <div>
                  <span className="muted">Revisions:</span> <b>N/A</b>
                </div>
                <div>
                  <span className="muted">Completion:</span> <b>{cfProgress}%</b>
                </div>
              </div>
              <div className="progress" style={{ height: 6, marginBottom: 18 }}>
                <span style={{ width: `${cfProgress}%`, background: "linear-gradient(90deg, #3182ce, #63b3ed)" }} />
              </div>
            </div>
            <Link href="/problems/codeforces" className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
              Open Codeforces Hub
            </Link>
          </div>

          {/* CodeChef Card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: 0.7 }}>
            <div>
              <div className="row">
                <span style={{ fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--muted)" }} />
                  CodeChef
                </span>
                <span
                  style={{
                    fontSize: 10,
                    padding: "2px 8px",
                    background: "var(--muted-bg)",
                    color: "var(--muted)",
                    borderRadius: "99px",
                    fontWeight: 700,
                  }}
                >
                  Not Connected
                </span>
              </div>
              <p className="muted" style={{ fontSize: 13, margin: "10px 0 16px 0" }}>
                Practice problems by difficulty divisions (Coming Soon).
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12, marginBottom: 16 }}>
                <div>
                  <span className="muted">Solved:</span> <b>0 / 0</b>
                </div>
                <div>
                  <span className="muted">Favorites:</span> <b>0</b>
                </div>
                <div>
                  <span className="muted">Revisions:</span> <b>0 due</b>
                </div>
                <div>
                  <span className="muted">Completion:</span> <b>0%</b>
                </div>
              </div>
              <div className="progress" style={{ height: 6, marginBottom: 18 }}>
                <span style={{ width: `0%` }} />
              </div>
            </div>
            <button className="button ghost" disabled style={{ width: "100%", justifyContent: "center", cursor: "not-allowed", opacity: 0.5 }}>
              <Lock size={14} style={{ marginRight: 6 }} /> Coming Soon
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid for Analytics and Up Next */}
      <div className="dashboard-grid">

        {/* Left Column: Analytics Preview & Recent Activity */}
        <div style={{ display: "grid", gap: 28 }}>
          {/* Analytics Preview */}
          <div className="card">
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Activity size={18} style={{ color: "var(--primary)" }} />
              Analytics Preview
            </h3>

            <div className="analytics-grid">

              {/* Difficulty breakdown */}
              <div>
                <span className="muted" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Difficulty Distribution</span>
                <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                  <div>
                    <div className="row" style={{ fontSize: 12, marginBottom: 4 }}>
                      <span>Easy</span>
                      <b>{easySolved} / {easyTotal}</b>
                    </div>
                    <div className="progress" style={{ height: 5, marginTop: 0 }}>
                      <span style={{ width: `${pct(easySolved, easyTotal)}%`, background: "var(--easy-fg)" }} />
                    </div>
                  </div>
                  <div>
                    <div className="row" style={{ fontSize: 12, marginBottom: 4 }}>
                      <span>Medium</span>
                      <b>{medSolved} / {medTotal}</b>
                    </div>
                    <div className="progress" style={{ height: 5, marginTop: 0 }}>
                      <span style={{ width: `${pct(medSolved, medTotal)}%`, background: "var(--medium-fg)" }} />
                    </div>
                  </div>
                  <div>
                    <div className="row" style={{ fontSize: 12, marginBottom: 4 }}>
                      <span>Hard</span>
                      <b>{hardSolved} / {hardTotal}</b>
                    </div>
                    <div className="progress" style={{ height: 5, marginTop: 0 }}>
                      <span style={{ width: `${pct(hardSolved, hardTotal)}%`, background: "var(--hard-fg)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic breakdown */}
              <div>
                <span className="muted" style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase" }}>Top Topics Progress</span>
                <div style={{ display: "grid", gap: 8, marginTop: 14 }}>
                  {TOPICS.slice(0, 4).map((t) => {
                    const topicProblems = problems.filter((p) => p.topic === t);
                    const topicSolved = topicProblems.filter((p) => state.completed.includes(p.id)).length;
                    const topicPct = pct(topicSolved, topicProblems.length);
                    return (
                      <div key={t} style={{ fontSize: 12 }}>
                        <div className="row" style={{ marginBottom: 2 }}>
                          <span>{t}</span>
                          <span>{topicSolved}/{topicProblems.length} ({topicPct}%)</span>
                        </div>
                        <div className="progress" style={{ height: 4, marginTop: 0 }}>
                          <span style={{ width: `${topicPct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Layers size={18} style={{ color: "var(--primary)" }} />
              Recent Activity
            </h3>

            {!hasActivity ? (
              <div className="empty" style={{ padding: "24px 0" }}>
                <span style={{ fontSize: 32 }}>🌱</span>
                <b>No recent activity found</b>
                <p className="muted" style={{ fontSize: 13, margin: 0 }}>Solve problems or add favorites to see them here.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 16 }}>
                {/* Recently Solved */}
                {recentSolved.length > 0 && (
                  <div>
                    <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Recently Solved</span>
                    <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0", display: "grid", gap: 8 }}>
                      {recentSolved.map((p) => (
                        <li key={p.id} className="row" style={{ padding: "8px 12px", background: "var(--muted-bg)", borderRadius: 8, fontSize: 13 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span className={`pill ${p.difficulty.toLowerCase()}`} style={{ fontSize: 9, padding: "2px 6px" }}>
                              {p.difficulty}
                            </span>
                            <b>#{p.id} {p.title}</b>
                          </div>
                          <Link href={`/problems/${p.id}`} className="muted" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 2 }}>
                            View details <ArrowRight size={12} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recently Favorited */}
                {recentFavorites.length > 0 && (
                  <div>
                    <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Recent Favorites</span>
                    <ul style={{ listStyle: "none", padding: 0, margin: "6px 0 0 0", display: "grid", gap: 8 }}>
                      {recentFavorites.map((p) => (
                        <li key={p.id} className="row" style={{ padding: "8px 12px", background: "var(--muted-bg)", borderRadius: 8, fontSize: 13 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <Star size={12} fill="var(--medium-fg)" color="var(--medium-fg)" />
                            <b>{p.title}</b>
                          </div>
                          <Link href={`/problems/${p.id}`} className="muted" style={{ fontSize: 12 }}>
                            View
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Continue Learning / Next Steps */}
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          <div className="card">
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, display: "flex", alignItems: "center", gap: 8 }}>
              <Flame size={18} style={{ color: "var(--primary)" }} />
              Up Next
            </h3>

            <div style={{ display: "grid", gap: 16 }}>
              {/* Next Topic */}
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Next Topic in Curriculum</span>
                {ready && (
                  <div style={{ marginTop: 8 }}>
                    {(() => {
                      const incompleteTopic = TOPICS.find((t) => {
                        const tp = problems.filter((p) => p.topic === t);
                        const ts = tp.filter((p) => state.completed.includes(p.id)).length;
                        return ts < tp.length;
                      });
                      if (incompleteTopic) {
                        const tp = problems.filter((p) => p.topic === incompleteTopic);
                        const ts = tp.filter((p) => state.completed.includes(p.id)).length;
                        return (
                          <div>
                            <div className="row" style={{ marginBottom: 4 }}>
                              <b style={{ fontSize: 14 }}>{incompleteTopic}</b>
                              <span className="muted" style={{ fontSize: 12 }}>{ts}/{tp.length} solved</span>
                            </div>
                            <div className="progress" style={{ height: 4, marginTop: 4 }}>
                              <span style={{ width: `${pct(ts, tp.length)}%` }} />
                            </div>
                            <Link href={`/topic/${encodeURIComponent(incompleteTopic)}`} className="button ghost" style={{ width: "100%", justifyContent: "center", marginTop: 12, padding: "8px 12px", fontSize: 13 }}>
                              Resume topic
                            </Link>
                          </div>
                        );
                      }
                      return <p className="muted" style={{ fontSize: 13, margin: 0 }}>🎉 All topics fully completed!</p>;
                    })()}
                  </div>
                )}
              </div>

              {/* Next Revision */}
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Next Scheduled Revision</span>
                <div style={{ marginTop: 8 }}>
                  {dueRevisions.length > 0 ? (
                    <div>
                      <div className="row" style={{ fontSize: 13 }}>
                        <b>{dueRevisions[0].title}</b>
                        <span className="pill medium" style={{ fontSize: 9, padding: "2px 6px" }}>{dueRevisions[0].difficulty}</span>
                      </div>
                      <Link href="/revision" className="button ghost" style={{ width: "100%", justifyContent: "center", marginTop: 12, padding: "8px 12px", fontSize: 13 }}>
                        Solve revision ({todayRevisionCount} due)
                      </Link>
                    </div>
                  ) : (
                    <p className="muted" style={{ fontSize: 13, margin: 0 }}>No pending revisions for today.</p>
                  )}
                </div>
              </div>

              {/* Suggested Practice */}
              <div>
                <span className="muted" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase" }}>Suggested Practice</span>
                <div style={{ marginTop: 8 }}>
                  {ready && nextProblem ? (
                    <div>
                      <div className="row" style={{ fontSize: 13 }}>
                        <b>{nextProblem.title}</b>
                        <span className={`pill ${nextProblem.difficulty.toLowerCase()}`} style={{ fontSize: 9, padding: "2px 6px" }}>{nextProblem.difficulty}</span>
                      </div>
                      <p className="muted" style={{ fontSize: 12, margin: "4px 0" }}>Topic: {nextProblem.topic} · Est: {nextProblem.estimatedTime}</p>
                      <Link href={`/problems/${nextProblem.id}`} className="button" style={{ width: "100%", justifyContent: "center", marginTop: 12, padding: "8px 12px", fontSize: 13 }}>
                        Attempt problem
                      </Link>
                    </div>
                  ) : (
                    <p className="muted" style={{ fontSize: 13, margin: 0 }}>All problems solved! Keep it up!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
