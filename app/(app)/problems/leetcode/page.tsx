"use client";

import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { TOPICS } from "@/types";
import { pct } from "@/lib/utils";
import { Award, BookOpen, ArrowRight } from "lucide-react";

export default function LeetCodeHub() {
  const { problems, state, ready } = useRoadmap();
  const completedCount = state.completed.length;
  const totalCount = problems.length;
  const overallProgress = pct(completedCount, totalCount);

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span>Problems</span> &gt; <span>LeetCode</span>
      </div>
      
      {/* Platform Header */}
      <div className="hero" style={{ marginBottom: 32, padding: "28px 36px" }}>
        <h1 className="title" style={{ marginTop: 0 }}>LeetCode Roadmap</h1>
        <p className="muted" style={{ margin: "4px 0 16px 0", maxWidth: "700px" }}>
          Master foundational interview patterns. Work through these topic tracks in sequence to build a solid problem-solving foundation.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ background: "var(--card)", padding: "10px 20px", borderRadius: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={18} style={{ color: "var(--primary)" }} />
            <span>Progress: <b>{completedCount} / {totalCount} Solved</b> ({overallProgress}%)</span>
          </div>
        </div>
      </div>

      <h2 className="title" style={{ fontSize: 22, marginBottom: 16 }}>Phase 1</h2>
      
      <div className="grid topic-grid">
        {TOPICS.map((t) => {
          const topicProblems = problems.filter((p) => p.topic === t);
          const solvedProblems = topicProblems.filter((p) => state.completed.includes(p.id));
          const done = solvedProblems.length;
          const total = topicProblems.length;
          const progress = pct(done, total);

          const easy = topicProblems.filter((p) => p.difficulty === "Easy").length;
          const medium = topicProblems.filter((p) => p.difficulty === "Medium").length;
          const hard = topicProblems.filter((p) => p.difficulty === "Hard").length;

          return (
            <div key={t} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}>
              <div>
                <div className="row" style={{ marginBottom: 6 }}>
                  <b style={{ fontSize: 16 }}>{t}</b>
                  <span className="muted" style={{ fontSize: 12 }}>{done} / {total} solved</span>
                </div>
                <div className="progress" style={{ height: 6, marginBottom: 14 }}>
                  <span style={{ width: `${progress}%` }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "14px 0 20px 0" }}>
                  <span className="pill easy" style={{ fontSize: 10, padding: "2px 8px" }}>{easy} Easy</span>
                  <span className="pill medium" style={{ fontSize: 10, padding: "2px 8px" }}>{medium} Med</span>
                  <span className="pill hard" style={{ fontSize: 10, padding: "2px 8px" }}>{hard} Hard</span>
                </div>
              </div>
              <Link href={`/topic/${encodeURIComponent(t)}`} className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
                <span>Open track</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
