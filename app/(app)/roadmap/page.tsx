"use client";

import { useState } from "react";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { TOPICS } from "@/types";
import { pct } from "@/lib/utils";
import { TopicCard } from "@/components/topic-card";
import { Award, ArrowRight, Lock, Code2, Globe } from "lucide-react";

const cfRatings = [
  [800, 159, "Beginner"],
  [900, 22, "Beginner"],
  [1000, 29, "Elementary"],
  [1100, 30, "Elementary"],
  [1200, 25, "Intermediate"],
  [1300, 30, "Intermediate"],
  [1400, 24, "Advanced"],
] as const;

export default function Roadmap() {
  const { problems: lcProblems, state: lcState, ready: lcReady } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();
  const [activeTab, setActiveTab] = useState<"leetcode" | "codeforces" | "codechef">("leetcode");

  // LC progress
  const lcDone = lcState.completed.length;
  const lcTotal = lcProblems.length;
  const lcPct = pct(lcDone, lcTotal);

  // CF progress
  const cfDone = cfState?.completed?.length ?? 0;
  const cfTotal = 319;
  const cfPct = pct(cfDone, cfTotal);

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Globe size={12} /> Curriculum Paths
      </div>
      <h1 className="title">DSA Roadmap</h1>
      <p className="muted" style={{ marginBottom: 24 }}>
        Structured progression paths grouped by platform. Focus on one track to build consistent muscle memory.
      </p>

      {/* Tabs Row */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--border)", marginBottom: 28, gap: 16, overflowX: "auto" }}>
        {(["leetcode", "codeforces", "codechef"] as const).map((tab) => {
          const active = activeTab === tab;
          const label = tab === "leetcode" ? "LeetCode (Phase 1)" : tab === "codeforces" ? "Codeforces Rating" : "CodeChef";
          const count = tab === "leetcode" ? `${lcDone}/${lcTotal}` : tab === "codeforces" ? `${cfDone}/${cfTotal}` : "";
          const progress = tab === "leetcode" ? lcPct : tab === "codeforces" ? cfPct : null;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "transparent",
                border: 0,
                borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                cursor: "pointer",
                padding: "12px 8px",
                color: active ? "var(--foreground)" : "var(--muted)",
                fontWeight: 600,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "var(--transition)",
                whiteSpace: "nowrap",
              }}
            >
              <span>{label}</span>
              {progress !== null && lcReady && cfReady && (
                <span
                  style={{
                    fontSize: 11,
                    background: active ? "var(--accent)" : "var(--muted-bg)",
                    color: active ? "var(--accent-foreground)" : "var(--muted)",
                    padding: "2px 8px",
                    borderRadius: "99px",
                  }}
                >
                  {count} ({progress}%)
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      {activeTab === "leetcode" && (
        <div>
          <div className="hero" style={{ marginBottom: 28, padding: "24px 32px" }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>LeetCode Phase 1: Foundations</h3>
            <p className="muted" style={{ margin: "6px 0 16px 0", fontSize: 14 }}>
              Complete these topics in order. Each topic focuses on specific sub-patterns that are heavily tested in software engineering interviews.
            </p>
            <div className="row" style={{ maxWidth: 400, fontSize: 13 }}>
              <span>Solved: <b>{lcDone} / {lcTotal}</b></span>
              <span>{lcPct}% completed</span>
            </div>
            <div className="progress" style={{ height: 6, marginTop: 8, maxWidth: 400 }}>
              <span style={{ width: `${lcPct}%` }} />
            </div>
          </div>
          <div className="grid topic-grid">
            {TOPICS.map((t) => (
              <TopicCard
                key={t}
                topic={t}
                problems={lcProblems.filter((p) => p.topic === t)}
                completed={lcState.completed}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "codeforces" && (
        <div>
          <div className="hero" style={{ marginBottom: 28, padding: "24px 32px" }}>
            <h3 style={{ margin: 0, fontSize: 18 }}>Codeforces Rating Tracker</h3>
            <p className="muted" style={{ margin: "6px 0 16px 0", fontSize: 14 }}>
              Solve array-based competitive programming problems grouped by rating. Tiers increase in problem-solving difficulty and algorithmic complexity.
            </p>
            <div className="row" style={{ maxWidth: 400, fontSize: 13 }}>
              <span>Solved: <b>{cfDone} / {cfTotal}</b></span>
              <span>{cfPct}% completed</span>
            </div>
            <div className="progress" style={{ height: 6, marginTop: 8, maxWidth: 400 }}>
              <span style={{ width: `${cfPct}%`, background: "linear-gradient(90deg, #3182ce, #63b3ed)" }} />
            </div>
          </div>
          <div className="grid topic-grid">
            {cfRatings.map(([rating, count, label]) => {
              const solved = cfState.completed.filter((id) => id.startsWith(String(rating))).length;
              const progress = Math.round((solved / count) * 100) || 0;
              return (
                <div key={rating} className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 180 }}>
                  <div>
                    <div className="row" style={{ marginBottom: 4 }}>
                      <b style={{ fontSize: 16 }}>Rating {rating}</b>
                      <span className="muted" style={{ fontSize: 12 }}>{solved} / {count} solved</span>
                    </div>
                    <span className="pill easy" style={{ fontSize: 9, padding: "2px 8px", background: "var(--muted-bg)", color: "var(--muted)", textTransform: "capitalize" }}>
                      {label}
                    </span>
                    <div className="progress" style={{ height: 6, marginTop: 16, marginBottom: 14 }}>
                      <span style={{ width: `${progress}%`, background: "linear-gradient(90deg, #3182ce, #63b3ed)" }} />
                    </div>
                  </div>
                  <Link href={`/problems/codeforces/${rating}`} className="button ghost" style={{ width: "100%", justifyContent: "center", padding: "8px 12px", fontSize: 13 }}>
                    <span>Open Rating {rating}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "codechef" && (
        <div className="card" style={{ padding: 48, textAlign: "center", maxWidth: 600, margin: "20px auto" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--muted-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px auto", color: "var(--muted)" }}>
            <Lock size={28} />
          </div>
          <h3 style={{ margin: 0, fontSize: 18 }}>CodeChef Integration</h3>
          <p className="muted" style={{ margin: "8px 0 24px 0", fontSize: 14, lineHeight: 1.5 }}>
            We are working on parsing CodeChef difficulty divisions and tracking solutions. Check back in a future update!
          </p>
          <button className="button ghost" disabled style={{ cursor: "not-allowed", opacity: 0.5 }}>
            Coming Soon
          </button>
        </div>
      )}
    </>
  );
}
