"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { useCodeforces } from "@/hooks/use-codeforces";
import { TOPICS, Problem } from "@/types";
import { pct } from "@/lib/utils";
import {
  Sparkles,
  Dices,
  Play,
  Check,
  ExternalLink,
  Lock,
  ArrowRight,
  Shuffle,
  Calendar,
  Layers,
  Star,
  CheckSquare,
  Square,
  Award,
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

export default function Practice() {
  const { problems: lcProblems, state: lcState, toggle: toggleLc, ready: lcReady } = useRoadmap();
  const { state: cfState, toggle: toggleCf, ready: cfReady } = useCodeforces();

  // Selected Platform: leetcode | codeforces | codechef
  const [platform, setPlatform] = useState<"leetcode" | "codeforces" | "codechef">("leetcode");
  const [difficulty, setDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All");

  // Codeforces problem state
  const [cfProblems, setCfProblems] = useState<CodeforcesProblem[]>([]);
  const [cfLoading, setCfLoading] = useState(false);

  // Practice state
  const [generatedSet, setGeneratedSet] = useState<any[]>([]);
  const [singlePick, setSinglePick] = useState<any | null>(null);
  const [setSize, setSetSize] = useState(3);

  // Fetch Codeforces problems when selecting Codeforces or mounting
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

  // Extract unique topic list based on platform
  const topicsList = useMemo(() => {
    if (platform === "leetcode") {
      return TOPICS;
    } else if (platform === "codeforces") {
      const tags = cfProblems.map((p) => p.topic).filter(Boolean);
      return [...new Set(tags)].sort();
    }
    return [];
  }, [platform, cfProblems]);

  // Reset topic filter if it is not in list after platform switch
  useEffect(() => {
    setSelectedTopic("All");
    setDifficulty("All");
    setGeneratedSet([]);
    setSinglePick(null);
  }, [platform]);

  // Filtered pool of problems
  const pool = useMemo(() => {
    if (platform === "leetcode") {
      return lcProblems.filter(
        (p) =>
          (selectedTopic === "All" || p.topic === selectedTopic) &&
          (difficulty === "All" || p.difficulty === difficulty)
      );
    } else if (platform === "codeforces") {
      return cfProblems.filter(
        (p) =>
          (selectedTopic === "All" || p.topic === selectedTopic) &&
          (difficulty === "All" ||
            p.difficulty === difficulty ||
            String(p.rating) === difficulty)
      );
    }
    return [];
  }, [platform, lcProblems, cfProblems, selectedTopic, difficulty]);

  // Check if a problem is completed
  const isCompleted = (problem: any) => {
    if (platform === "leetcode") {
      return lcState.completed.includes(problem.id);
    } else if (platform === "codeforces") {
      return cfState.completed.includes(problem.problemId);
    }
    return false;
  };

  // Toggle problem completion
  const handleToggleCompleted = (problem: any) => {
    if (platform === "leetcode") {
      toggleLc("completed", problem.id);
    } else if (platform === "codeforces") {
      toggleCf("completed", problem.problemId);
    }
  };

  // Toggle problem favorite status
  const handleToggleFavorite = (problem: any) => {
    if (platform === "leetcode") {
      toggleLc("favorites", problem.id);
    } else if (platform === "codeforces") {
      toggleCf("favorites", problem.problemId);
    }
  };

  // Check if problem is favorited
  const isFavorited = (problem: any) => {
    if (platform === "leetcode") {
      return lcState.favorites.includes(problem.id);
    } else if (platform === "codeforces") {
      return cfState.favorites.includes(problem.problemId);
    }
    return false;
  };

  // Daily Challenge logic
  const dailyProblem = useMemo(() => {
    if (!pool.length) return null;
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const index = (day * 3 + month * 7) % pool.length;
    return pool[index];
  }, [pool]);

  // Pick a single random problem (Quick Practice)
  const handlePickRandom = () => {
    const unsolved = pool.filter((p) => !isCompleted(p));
    const targetPool = unsolved.length > 0 ? unsolved : pool;
    if (!targetPool.length) return;
    const item = targetPool[Math.floor(Math.random() * targetPool.length)];
    setSinglePick(item);
    setGeneratedSet([]);
  };

  // Generate Practice Set checklist
  const handleGenerateSet = () => {
    const unsolved = pool.filter((p) => !isCompleted(p));
    const targetPool = unsolved.length > 0 ? unsolved : pool;
    if (!targetPool.length) return;
    const shuffled = [...targetPool].sort(() => 0.5 - Math.random());
    setGeneratedSet(shuffled.slice(0, setSize));
    setSinglePick(null);
  };

  const isReady = lcReady && !cfLoading;

  return (
    <>
      <div className="eyebrow" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Sparkles size={12} /> Practice Arena
      </div>
      <h1 className="title">Personalized Challenges</h1>
      <p className="muted" style={{ marginBottom: 28 }}>
        Hone your problem-solving skills. Set platform constraints, generate customized practice sets, or solve the daily challenge.
      </p>

      {/* Platform Tabs Selector */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        {[
          { id: "leetcode", label: "LeetCode", color: "#f89f1b" },
          { id: "codeforces", label: "Codeforces", color: "#3182ce" },
          { id: "codechef", label: "CodeChef", color: "var(--muted)" },
        ].map((p) => {
          const active = platform === p.id;
          return (
            <button
              key={p.id}
              onClick={() => p.id !== "codechef" && setPlatform(p.id as any)}
              className="card"
              style={{
                flex: "1 1 180px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: p.id === "codechef" ? "not-allowed" : "pointer",
                padding: "16px 20px",
                border: active ? `2px solid var(--primary)` : "1px solid var(--border)",
                background: active ? "var(--card)" : "rgba(255,255,255,0.01)",
                transition: "var(--transition)",
                opacity: p.id === "codechef" ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: p.color,
                }}
              />
              <div style={{ textAlign: "left" }}>
                <b style={{ display: "block", fontSize: 14 }}>{p.label}</b>
                <span className="muted" style={{ fontSize: 11 }}>
                  {p.id === "codechef" ? "Coming Soon" : "Interactive Practice"}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {platform === "codechef" ? (
        <div className="card" style={{ padding: 48, textAlign: "center" }}>
          <Lock size={32} className="muted" style={{ marginBottom: 16 }} />
          <h3>Practice coming soon for CodeChef</h3>
          <p className="muted">This track is currently locked. Complete LeetCode Phase 1 or Codeforces Ratings in the meantime.</p>
        </div>
      ) : (
        <div className="practice-grid">

          {/* Left Column: Filter Card */}
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            <div className="card">
              <h3 style={{ margin: "0 0 16px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <Layers size={16} /> Filters
              </h3>

              <div style={{ display: "grid", gap: 16 }}>
                {/* Topic Selector */}
                <div>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase" }}>
                    Algorithmic Concept
                  </label>
                  <select
                    className="select"
                    style={{ width: "100%" }}
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                  >
                    <option value="All">All Concepts</option>
                    {topicsList.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty Selector */}
                <div>
                  <label className="muted" style={{ fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6, textTransform: "uppercase" }}>
                    Difficulty / Rating
                  </label>
                  <select
                    className="select"
                    style={{ width: "100%" }}
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="All">All Levels</option>
                    {platform === "leetcode" ? (
                      <>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </>
                    ) : (
                      <>
                        <option value="Beginner">Beginner Tiers (800-900)</option>
                        <option value="Elementary">Elementary Tiers (1000-1100)</option>
                        <option value="Intermediate">Intermediate Tiers (1200-1300)</option>
                        <option value="Advanced">Advanced Tiers (1400)</option>
                        <option value="800">Rating 800</option>
                        <option value="900">Rating 900</option>
                        <option value="1000">Rating 1000</option>
                        <option value="1100">Rating 1100</option>
                        <option value="1200">Rating 1200</option>
                        <option value="1300">Rating 1300</option>
                        <option value="1400">Rating 1400</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 16,
                  borderTop: "1px solid var(--border)",
                  fontSize: 13,
                }}
                className="row muted"
              >
                <span>Matching problems:</span>
                <b>{isReady ? pool.length : "—"}</b>
              </div>
            </div>

            {/* Daily Challenge Card */}
            {isReady && dailyProblem && (
              <div className="card" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06) 0%, rgba(168,85,247,0.03) 100%)", borderColor: "rgba(99,102,241,0.3)" }}>
                <div className="row" style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--primary)", display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} /> Daily Challenge
                  </span>
                  {isCompleted(dailyProblem) && (
                    <span className="pill easy" style={{ fontSize: 9 }}>
                      Completed
                    </span>
                  )}
                </div>
                <h4 style={{ margin: "0 0 6px 0", fontSize: 16 }}>
                  {platform === "leetcode" ? `#${(dailyProblem as Problem).id} ` : ""}
                  {dailyProblem.title}
                </h4>
                <p className="muted" style={{ fontSize: 12, margin: "0 0 16px 0" }}>
                  Topic: {dailyProblem.topic} · {platform === "leetcode" ? `Time: ${(dailyProblem as Problem).estimatedTime}` : `Rating: ${(dailyProblem as CodeforcesProblem).rating}`}
                </p>
                {platform === "leetcode" ? (
                  <Link href={`/problems/${(dailyProblem as Problem).id}`} className="button" style={{ width: "100%", justifyContent: "center" }}>
                    <span>Solve Challenge</span>
                    <ArrowRight size={14} />
                  </Link>
                ) : (
                  <a href={dailyProblem.url} target="_blank" rel="noopener noreferrer" className="button" style={{ width: "100%", justifyContent: "center" }}>
                    <span>Solve on Codeforces</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Practice Actions & Dynamic Workspace */}
          <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
            {/* Practice Modes Selectors */}
            <div className="modes-grid">

              {/* Random Card */}
              <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <Dices size={16} /> Random Pick
                  </h3>
                  <p className="muted" style={{ fontSize: 12, margin: "0 0 16px 0" }}>
                    Pull a single unsolved challenge based on your current active filters.
                  </p>
                </div>
                <button onClick={handlePickRandom} className="button ghost" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Shuffle Problem</span>
                </button>
              </div>

              {/* Practice Set Card */}
              <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 16, display: "flex", alignItems: "center", gap: 8 }}>
                    <Shuffle size={16} /> Checklist Generator
                  </h3>
                  <p className="muted" style={{ fontSize: 12, margin: "0 0 16px 0" }}>
                    Select set size and compile a custom checklist track.
                  </p>
                  <div className="row" style={{ marginBottom: 16, gap: 12 }}>
                    <span className="muted" style={{ fontSize: 12 }}>Set size:</span>
                    <select
                      className="select"
                      style={{ padding: "4px 8px", fontSize: 12 }}
                      value={setSize}
                      onChange={(e) => setSetSize(Number(e.target.value))}
                    >
                      <option value={3}>3 problems</option>
                      <option value={5}>5 problems</option>
                      <option value={10}>10 problems</option>
                    </select>
                  </div>
                </div>
                <button onClick={handleGenerateSet} className="button" style={{ width: "100%", justifyContent: "center" }}>
                  <span>Generate Track</span>
                </button>
              </div>
            </div>

            {/* Dynamic Results Display */}

            {/* Picked Random problem Details preview */}
            {singlePick && (
              <div className="card">
                <div className="row" style={{ marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "var(--primary)" }}>
                    Random Recommendation
                  </span>
                  <button className="button ghost" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setSinglePick(null)}>
                    Clear
                  </button>
                </div>

                <div style={{ padding: "16px 20px", background: "var(--muted-bg)", borderRadius: 12 }}>
                  <div className="row">
                    <h4 style={{ margin: 0, fontSize: 17 }}>
                      {platform === "leetcode" ? `#${(singlePick as Problem).id} ` : ""}
                      {singlePick.title}
                    </h4>
                    <span className={`pill ${platform === "leetcode" ? (singlePick as Problem).difficulty.toLowerCase() : "easy"}`} style={{ textTransform: "capitalize" }}>
                      {platform === "leetcode" ? (singlePick as Problem).difficulty : (singlePick as CodeforcesProblem).difficulty}
                    </span>
                  </div>
                  <p className="muted" style={{ fontSize: 13, margin: "6px 0 16px 0" }}>
                    Topic: <b>{singlePick.topic}</b> · {platform === "leetcode" ? `Acceptance: ${(singlePick as Problem).acceptance}` : `Rating: ${(singlePick as CodeforcesProblem).rating}`}
                  </p>

                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {platform === "leetcode" ? (
                      <Link href={`/problems/${(singlePick as Problem).id}`} className="button">
                        <span>Go to problem workspace</span>
                        <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <a href={singlePick.url} target="_blank" rel="noopener noreferrer" className="button">
                        <span>Solve on Codeforces</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    <button
                      className="button ghost"
                      onClick={() => handleToggleCompleted(singlePick)}
                      style={{ color: isCompleted(singlePick) ? "var(--easy-fg)" : "inherit" }}
                    >
                      {isCompleted(singlePick) ? <Check size={14} /> : null}
                      <span>{isCompleted(singlePick) ? "Completed" : "Mark Completed"}</span>
                    </button>

                    <button
                      className="button ghost"
                      onClick={() => handleToggleFavorite(singlePick)}
                    >
                      <Star size={14} fill={isFavorited(singlePick) ? "currentColor" : "none"} color={isFavorited(singlePick) ? "var(--medium-fg)" : "currentColor"} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Generated Set Checklist */}
            {generatedSet.length > 0 && (
              <div className="card">
                <div className="row" style={{ marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", color: "var(--primary)" }}>
                    Practice Track Checklist
                  </span>
                  <button className="button ghost" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setGeneratedSet([])}>
                    Dismiss Set
                  </button>
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {generatedSet.map((item, idx) => {
                    const done = isCompleted(item);
                    const fav = isFavorited(item);
                    const itemId = platform === "leetcode" ? (item as Problem).id : (item as CodeforcesProblem).problemId;
                    return (
                      <div
                        key={itemId}
                        className="row"
                        style={{
                          padding: "12px 16px",
                          background: done ? "rgba(255,255,255,0.01)" : "var(--muted-bg)",
                          border: done ? "1px solid var(--border)" : "1px solid transparent",
                          borderRadius: 10,
                          opacity: done ? 0.7 : 1,
                          transition: "var(--transition)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <button
                            onClick={() => handleToggleCompleted(item)}
                            style={{
                              background: "transparent",
                              border: 0,
                              cursor: "pointer",
                              padding: 0,
                              color: done ? "var(--easy-fg)" : "var(--muted)",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {done ? <CheckSquare size={20} /> : <Square size={20} />}
                          </button>
                          <div>
                            <span style={{ fontSize: 14, fontWeight: 600, textDecoration: done ? "line-through" : "none" }}>
                              {platform === "leetcode" ? `#${(item as Problem).id} ` : ""}
                              {item.title}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: 11 }} className="muted">
                              <span>{item.topic}</span>
                              <span>·</span>
                              <span className={platform === "leetcode" ? (item as Problem).difficulty.toLowerCase() : "easy"}>
                                {platform === "leetcode" ? (item as Problem).difficulty : `${(item as CodeforcesProblem).rating} Rating`}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <button
                            onClick={() => handleToggleFavorite(item)}
                            style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
                          >
                            <Star size={16} fill={fav ? "var(--medium-fg)" : "none"} color={fav ? "var(--medium-fg)" : "var(--muted)"} />
                          </button>

                          {platform === "leetcode" ? (
                            <Link href={`/problems/${(item as Problem).id}`} className="button ghost" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12 }}>
                              <ArrowRight size={14} />
                            </Link>
                          ) : (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className="button ghost" style={{ padding: "6px 10px", borderRadius: 8, fontSize: 12 }}>
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
