"use client";

import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { pct } from "@/lib/utils";
import { Code, BookOpen, Lock } from "lucide-react";

export default function Problems() {
  const { problems, state: roadmapState, ready: roadmapReady } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();

  const completed = roadmapState.completed.length;
  const leetcodeTotal = problems.length;
  const leetcodeProgress = pct(completed, leetcodeTotal);

  const cfCompleted = cfState?.completed?.length ?? 0;
  const cfTotal = 319; // Hardcoded total Codeforces problems
  const cfProgress = pct(cfCompleted, cfTotal);

  return (
    <>
      <div className="eyebrow">Practice</div>
      <h1 className="title" style={{ marginBottom: 8 }}>Choose a platform</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Select a platform below to view curated tracks, ratings-based problem lists, and concepts.
      </p>

      <div className="grid topic-grid">
        {/* LeetCode Track */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}>
          <div>
            <div className="row" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(248, 159, 27, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f89f1b" }}>
                  <b>LC</b>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>LeetCode</h3>
                  <span className="muted" style={{ fontSize: 12 }}>Topic tracks</span>
                </div>
              </div>
              <span className="pill easy" style={{ fontSize: 10 }}>{roadmapReady ? "Connected" : "Loading"}</span>
            </div>
            <p className="muted" style={{ fontSize: 13, margin: "0 0 16px 0", lineHeight: 1.5 }}>
              Curated Phase 1 learning path covering essential data structures and algorithms.
            </p>
            <div className="row muted" style={{ fontSize: 12, marginBottom: 8 }}>
              <span>Solved: {completed} / {leetcodeTotal}</span>
              <span>{leetcodeProgress}%</span>
            </div>
            <div className="progress" style={{ height: 6, marginBottom: 20 }}>
              <span style={{ width: `${leetcodeProgress}%` }} />
            </div>
          </div>
          <Link href="/problems/leetcode" className="button" style={{ width: "100%", justifyContent: "center" }}>
            Open LeetCode Hub
          </Link>
        </div>

        {/* Codeforces Tracker */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}>
          <div>
            <div className="row" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(49, 130, 206, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#3182ce" }}>
                  <b>CF</b>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Codeforces</h3>
                  <span className="muted" style={{ fontSize: 12 }}>Rating tracks</span>
                </div>
              </div>
              <span className="pill easy" style={{ fontSize: 10 }}>{cfReady ? "Connected" : "Loading"}</span>
            </div>
            <p className="muted" style={{ fontSize: 13, margin: "0 0 16px 0", lineHeight: 1.5 }}>
              Practice array trackers grouped dynamically by Codeforces problem ratings.
            </p>
            <div className="row muted" style={{ fontSize: 12, marginBottom: 8 }}>
              <span>Solved: {cfCompleted} / {cfTotal}</span>
              <span>{cfProgress}%</span>
            </div>
            <div className="progress" style={{ height: 6, marginBottom: 20 }}>
              <span style={{ width: `${cfProgress}%`, background: "linear-gradient(90deg, #3182ce, #63b3ed)" }} />
            </div>
          </div>
          <Link href="/problems/codeforces" className="button" style={{ width: "100%", justifyContent: "center" }}>
            Open Codeforces Hub
          </Link>
        </div>

        {/* CodeChef Tracking (Coming soon) */}
        <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220, opacity: 0.7 }}>
          <div>
            <div className="row" style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(100, 116, 139, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                  <b>CC</b>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>CodeChef</h3>
                  <span className="muted" style={{ fontSize: 12 }}>Difficulty divisions</span>
                </div>
              </div>
              <span style={{ fontSize: 10, padding: "2px 8px", background: "var(--muted-bg)", color: "var(--muted)", borderRadius: "99px", fontWeight: 700 }}>Not Connected</span>
            </div>
            <p className="muted" style={{ fontSize: 13, margin: "0 0 16px 0", lineHeight: 1.5 }}>
              Track solutions and favorites directly for CodeChef practice divisions.
            </p>
            <div className="row muted" style={{ fontSize: 12, marginBottom: 8 }}>
              <span>Solved: 0 / 0</span>
              <span>0%</span>
            </div>
            <div className="progress" style={{ height: 6, marginBottom: 20 }}>
              <span style={{ width: "0%" }} />
            </div>
          </div>
          <button className="button ghost" disabled style={{ width: "100%", justifyContent: "center", cursor: "not-allowed", opacity: 0.6 }}>
            <Lock size={14} style={{ marginRight: 6 }} /> Coming Soon
          </button>
        </div>
      </div>
    </>
  );
}
