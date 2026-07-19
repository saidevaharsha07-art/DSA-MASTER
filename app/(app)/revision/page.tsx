"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { Problem } from "@/types";
import {
  Calendar,
  AlertCircle,
  Clock,
  Check,
  RotateCcw,
  ExternalLink,
  Inbox,
  Filter,
  Lock,
  Layers,
  Star,
  Sparkles,
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

export default function Revision() {
  const {
    problems: lcProblems,
    state: lcState,
    schedule: scheduleLc,
    markRevised: markRevisedLc,
    ready: lcReady,
  } = useRoadmap();
  const { state: cfState, ready: cfReady } = useCodeforces();

  // Platform Filter: all | leetcode | codeforces | codechef
  const [platformFilter, setPlatformFilter] = useState<"all" | "leetcode" | "codeforces" | "codechef">("all");
  
  // Codeforces problem state
  const [cfProblems, setCfProblems] = useState<CodeforcesProblem[]>([]);
  const [cfLoading, setCfLoading] = useState(false);

  // Fetch Codeforces problems on mount/selection
  useEffect(() => {
    if (cfProblems.length > 0) return;
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
  }, [cfProblems.length]);

  // Grouped revisions calculation
  const groups = useMemo(() => {
    const overdue: any[] = [];
    const dueToday: any[] = [];
    const upcoming: any[] = [];
    const completed: any[] = [];

    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const showLc = platformFilter === "all" || platformFilter === "leetcode";
    const showCf = platformFilter === "all" || platformFilter === "codeforces";

    if (showLc && lcReady) {
      lcProblems.forEach((p) => {
        const isSolved = lcState.completed.includes(p.id);
        const revDateStr = lcState.revision[p.id];

        if (revDateStr) {
          const revDate = new Date(revDateStr);
          if (revDate < todayStart) {
            overdue.push({ ...p, platform: "leetcode" });
          } else if (revDate <= todayEnd) {
            dueToday.push({ ...p, platform: "leetcode" });
          } else {
            upcoming.push({ ...p, platform: "leetcode" });
          }
        } else if (isSolved) {
          completed.push({ ...p, platform: "leetcode" });
        }
      });
    }

    if (showCf && cfReady && cfProblems.length > 0) {
      cfProblems.forEach((p) => {
        const isSolved = cfState.completed.includes(p.problemId);
        if (isSolved) {
          completed.push({ ...p, platform: "codeforces" });
        }
      });
    }

    return { overdue, dueToday, upcoming, completed };
  }, [platformFilter, lcProblems, lcState, lcReady, cfState, cfReady, cfProblems]);

  const totalCount =
    groups.overdue.length +
    groups.dueToday.length +
    groups.upcoming.length +
    groups.completed.length;

  const isReady = lcReady && !cfLoading;

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Clock size={12} /> Spaced Repetition
      </div>
      <h1 className="title">Revision Queue</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Review completed algorithms periodically to retain patterns. Marking one revised clears its active schedule.
      </p>

      {/* Platform Filter Buttons */}
      <div style={{ display: "flex", gap: 10, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
        {[
          { id: "all", label: "All Platforms" },
          { id: "leetcode", label: "LeetCode" },
          { id: "codeforces", label: "Codeforces" },
          { id: "codechef", label: "CodeChef" },
        ].map((btn) => {
          const active = platformFilter === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setPlatformFilter(btn.id as any)}
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
              {btn.label}
            </button>
          );
        })}
      </div>

      {platformFilter === "codechef" ? (
        <div className="card" style={{ padding: 48, textAlign: "center" }}>
          <Lock size={32} className="muted" style={{ marginBottom: 16 }} />
          <h3>No revision tracks for CodeChef</h3>
          <p className="muted">This platform has not been integrated yet. Revisions are unavailable.</p>
        </div>
      ) : !isReady ? (
        <div className="empty">Loading Revision Queue...</div>
      ) : totalCount === 0 ? (
        <div className="card" style={{ padding: 60, textAlign: "center" }}>
          <Inbox size={48} className="muted" style={{ marginBottom: 16, strokeWidth: 1.5 }} />
          <h3>Your revision queue is empty!</h3>
          <p className="muted" style={{ maxWidth: 450, margin: "8px auto 24px auto" }}>
            Solve some LeetCode problems or add rating trackers on Codeforces, then set a revision schedule on their detail views to begin spaced repetition practice.
          </p>
          <Link href="/practice" className="button">
            Go to Practice Arena
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 32 }}>
          {/* Overdue Queue */}
          {groups.overdue.length > 0 && (
            <div>
              <div className="row" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: "var(--hard-fg)" }}>
                  <AlertCircle size={18} />
                  Overdue Revisions ({groups.overdue.length})
                </h3>
              </div>
              <RevisionList items={groups.overdue} onMarkRevised={markRevisedLc} onReschedule={scheduleLc} />
            </div>
          )}

          {/* Due Today Queue */}
          {groups.dueToday.length > 0 && (
            <div>
              <div className="row" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: "var(--medium-fg)" }}>
                  <Calendar size={18} />
                  Due Today ({groups.dueToday.length})
                </h3>
              </div>
              <RevisionList items={groups.dueToday} onMarkRevised={markRevisedLc} onReschedule={scheduleLc} />
            </div>
          )}

          {/* Upcoming Queue */}
          {groups.upcoming.length > 0 && (
            <div>
              <div className="row" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: "var(--primary)" }}>
                  <Clock size={18} />
                  Upcoming Revisions ({groups.upcoming.length})
                </h3>
              </div>
              <RevisionList items={groups.upcoming} onMarkRevised={markRevisedLc} onReschedule={scheduleLc} />
            </div>
          )}

          {/* Completed / Solved Problems Queue */}
          {groups.completed.length > 0 && (
            <div>
              <div className="row" style={{ marginBottom: 12 }}>
                <h3 style={{ margin: 0, fontSize: 16, display: "flex", alignItems: "center", gap: 8, color: "var(--easy-fg)" }}>
                  <Check size={18} />
                  Solved Problems (No Revision Set) ({groups.completed.length})
                </h3>
              </div>
              <RevisionList items={groups.completed} onMarkRevised={markRevisedLc} onReschedule={scheduleLc} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Sub-component: Revision Table List
function RevisionList({
  items,
  onMarkRevised,
  onReschedule,
}: {
  items: any[];
  onMarkRevised: (id: number) => void;
  onReschedule: (id: number, days: number) => void;
}) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Problem</th>
            <th>Concept / Tag</th>
            <th>Difficulty / Rating</th>
            <th>Schedule Status / Quick Action</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLc = item.platform === "leetcode";
            const id = isLc ? item.id : item.problemId;
            return (
              <tr key={`${item.platform}-${id}`}>
                <td>
                  <span
                    className="pill"
                    style={{
                      background: isLc ? "rgba(248, 159, 27, 0.1)" : "rgba(49, 130, 206, 0.1)",
                      color: isLc ? "#f89f1b" : "#3182ce",
                      fontSize: 10,
                      padding: "2px 8px",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.platform}
                  </span>
                </td>
                <td>
                  {isLc ? (
                    <Link href={`/problems/${item.id}`}>
                      <b>{item.title}</b>
                    </Link>
                  ) : (
                    <b>{item.title}</b>
                  )}
                </td>
                <td>{item.topic}</td>
                <td>
                  <span className={`pill ${isLc ? item.difficulty.toLowerCase() : "easy"}`} style={{ textTransform: "capitalize" }}>
                    {isLc ? item.difficulty : `${item.rating} Rating`}
                  </span>
                </td>
                <td>
                  {isLc ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button
                        className="button ghost"
                        style={{ padding: "4px 8px", fontSize: 11, background: "var(--easy-bg)", color: "var(--easy-fg)" }}
                        onClick={() => onMarkRevised(item.id)}
                        title="Remove from revision queue (Mark revised)"
                      >
                        <Check size={12} style={{ marginRight: 4 }} />
                        Mark Revised
                      </button>
                    </div>
                  ) : (
                    <span className="muted" style={{ fontSize: 12 }}>Completed</span>
                  )}
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {isLc ? (
                      <div style={{ display: "flex", gap: 4 }}>
                        {[1, 7, 30].map((days) => (
                          <button
                            key={days}
                            className="button ghost"
                            style={{ padding: "4px 6px", fontSize: 10 }}
                            onClick={() => onReschedule(item.id, days)}
                            title={`Reschedule review in ${days} days`}
                          >
                            +{days}d
                          </button>
                        ))}
                      </div>
                    ) : (
                      <a href={item.url} target="_blank" rel="noopener noreferrer" className="button ghost" style={{ padding: "6px 8px", borderRadius: 8 }}>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

