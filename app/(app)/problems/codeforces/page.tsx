"use client";

import Link from "next/link";
import { useCodeforces } from "@/hooks/use-codeforces";
import { Award, ArrowRight } from "lucide-react";

const ratings = [
  [800, 159, "Beginner"],
  [900, 22, "Beginner"],
  [1000, 29, "Elementary"],
  [1100, 30, "Elementary"],
  [1200, 25, "Intermediate"],
  [1300, 30, "Intermediate"],
  [1400, 24, "Advanced"],
] as const;

export default function Codeforces() {
  const { state, ready } = useCodeforces();
  
  const totalSolved = state.completed.length;
  const totalProblems = 319;
  const progressPercent = Math.round((totalSolved / totalProblems) * 100) || 0;

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span>Problems</span> &gt; <span>Codeforces</span>
      </div>

      {/* Hero Header */}
      <div className="hero" style={{ marginBottom: 32, padding: "28px 36px" }}>
        <h1 className="title" style={{ marginTop: 0 }}>Codeforces Tracker</h1>
        <p className="muted" style={{ margin: "4px 0 16px 0", maxWidth: "700px" }}>
          Target specific difficulty tiers. Solve problems organized by Codeforces rating categories to progressively build competitive programming confidence.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ background: "var(--card)", padding: "10px 20px", borderRadius: 12, border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={18} style={{ color: "var(--primary)" }} />
            <span>Progress: <b>{totalSolved} / {totalProblems} Solved</b> ({progressPercent}%)</span>
          </div>
        </div>
      </div>

      <h2 className="title" style={{ fontSize: 22, marginBottom: 16 }}>Rating Divisions</h2>

      <div className="grid topic-grid">
        {ratings.map(([rating, count, label]) => {
          const solved = state.completed.filter((id) => id.startsWith(String(rating))).length;
          const progress = Math.round((solved / count) * 100) || 0;
          return (
            <div key={rating} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}>
              <div>
                <div className="row" style={{ marginBottom: 6 }}>
                  <b style={{ fontSize: 16 }}>Rating {rating}</b>
                  <span className="muted" style={{ fontSize: 12 }}>{solved} / {count} solved</span>
                </div>
                <p className="muted" style={{ fontSize: 12, margin: "2px 0 12px 0" }}>Difficulty: {label}</p>
                <div className="progress" style={{ height: 6, marginBottom: 18 }}>
                  <span style={{ width: `${progress}%`, background: "linear-gradient(90deg, #3182ce, #63b3ed)" }} />
                </div>
              </div>
              <Link href={`/problems/codeforces/${rating}`} className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
                <span>Open division</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
