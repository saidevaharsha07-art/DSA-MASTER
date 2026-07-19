"use client";

import Link from "next/link";
import { Check, ExternalLink, RotateCcw, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useRoadmap } from "@/hooks/use-roadmap";
import { difficultyRank, minutes } from "@/lib/utils";
import type { Problem } from "@/types";

export function ProblemTable({
  items,
  revisionQueue = false,
}: {
  items: Problem[];
  revisionQueue?: boolean;
}) {
  const { state, toggle, schedule, markRevised, search } = useRoadmap();
  const [sort, setSort] = useState("id");
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");
  const rows = useMemo(() => {
    const scoped = query
      ? search(query).filter((problem) => items.some((item) => item.id === problem.id))
      : items;
    return scoped
      .filter(
        (problem) =>
          (difficulty === "All" || problem.difficulty === difficulty) &&
          (status === "All" || (status === "Solved") === state.completed.includes(problem.id)),
      )
      .sort((a, b) =>
        sort === "difficulty"
          ? difficultyRank(a.difficulty) - difficultyRank(b.difficulty)
          : sort === "acceptance"
            ? parseFloat(b.acceptance) - parseFloat(a.acceptance)
            : sort === "time"
              ? minutes(a.estimatedTime) - minutes(b.estimatedTime)
              : sort === "title"
                ? a.title.localeCompare(b.title)
                : a.id - b.id,
      );
  }, [items, sort, query, difficulty, status, state.completed, search]);
  if (!items.length)
    return (
      <div className="empty">
        No problems found. Import your dataset into <code>public/data/problems.json</code> and
        refresh.
      </div>
    );
  return (
    <>
      <div className="toolbar">
        <input
          className="input"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search name, number, tags, company…"
        />
        <select
          className="select"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select
          className="select"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option>All</option>
          <option>Solved</option>
          <option>Unsolved</option>
        </select>
        <span className="muted">{rows.length} problems</span>
        <select className="select" value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="id">Sort: Number</option>
          <option value="difficulty">Difficulty</option>
          <option value="acceptance">Acceptance</option>
          <option value="time">Estimated time</option>
          <option value="title">Alphabetical</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Done</th>
              <th>#</th>
              <th>Problem name</th>
              <th>Difficulty</th>
              <th>Pattern</th>
              <th>Acceptance</th>
              <th>Companies</th>
              <th>Tags</th>
              <th>Time</th>
              <th>Open</th>
              <th>Favorite</th>
              <th>Revision</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((problem) => {
              const done = state.completed.includes(problem.id);
              return (
                <tr key={problem.id}>
                  <td>
                    <button
                      className="button ghost"
                      onClick={() => toggle("completed", problem.id)}
                      aria-label={`Mark ${problem.title} ${done ? "incomplete" : "complete"}`}
                    >
                      {done && <Check size={15} />}
                    </button>
                  </td>
                  <td>{problem.id}</td>
                  <td>
                    <Link href={`/problems/${problem.id}`}>
                      <b>{problem.title}</b>
                    </Link>
                  </td>
                  <td>
                    <span className={`pill ${problem.difficulty.toLowerCase()}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>{problem.pattern}</td>
                  <td>{problem.acceptance}</td>
                  <td>{problem.companies?.slice(0, 2).join(", ")}</td>
                  <td>{problem.tags?.slice(0, 2).join(", ")}</td>
                  <td>{problem.estimatedTime}</td>
                  <td>
                    <a
                      href={problem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${problem.title} on LeetCode`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </td>
                  <td>
                    <button
                      className="button ghost"
                      onClick={() => toggle("favorites", problem.id)}
                      aria-label={`Toggle ${problem.title} favorite`}
                    >
                      <Star
                        size={15}
                        fill={state.favorites.includes(problem.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </td>
                  <td>
                    {revisionQueue ? (
                      <button
                        className="button ghost"
                        onClick={() => markRevised(problem.id)}
                        title="Mark revised"
                        aria-label={`Mark ${problem.title} revised`}
                      >
                        <Check size={15} />
                      </button>
                    ) : (
                      <button
                        className="button ghost"
                        onClick={() => schedule(problem.id, 1)}
                        title="Reschedule for tomorrow"
                        aria-label={`Reschedule ${problem.title} for tomorrow`}
                      >
                        <RotateCcw size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
