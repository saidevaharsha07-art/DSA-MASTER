"use client";
import { useState } from "react";
import Link from "next/link";
import { useRoadmap } from "@/hooks/use-roadmap";
import { TOPICS } from "@/types";
export default function Practice() {
  const { problems } = useRoadmap();
  const [topic, setTopic] = useState("All"),
    [difficulty, setDifficulty] = useState("All"),
    [pick, setPick] = useState<number>();
  const pool = problems.filter(
    (p) =>
      (topic === "All" || p.topic === topic) &&
      (difficulty === "All" || p.difficulty === difficulty),
  );
  const random = () => setPick(pool[Math.floor(Math.random() * pool.length)]?.id);
  return (
    <>
      <div className="eyebrow">Practice mode</div>
      <h1 className="title">Choose your next challenge</h1>
      <div className="card" style={{ maxWidth: 680 }}>
        <div className="toolbar">
          <select className="select" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>All</option>
            {TOPICS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <select
            className="select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button className="button" onClick={random}>
            Random practice
          </button>
        </div>
        {pick ? (
          <Link className="button ghost" href={`/problems/${pick}`}>
            Start selected problem →
          </Link>
        ) : (
          <p className="muted">{pool.length} matching problems available.</p>
        )}
      </div>
    </>
  );
}
