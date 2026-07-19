"use client";
import { useRoadmap } from "@/hooks/use-roadmap";
import { TOPICS } from "@/types";
import { pct } from "@/lib/utils";
export default function Statistics() {
  const { problems, state } = useRoadmap();
  return (
    <>
      <div className="eyebrow">Learning analytics</div>
      <h1 className="title">Statistics</h1>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Topic progress</h3>
        <div className="list">
          {TOPICS.map((t) => {
            const all = problems.filter((p) => p.topic === t),
              n = all.filter((p) => state.completed.includes(p.id)).length;
            return (
              <div key={t}>
                <div className="row">
                  <span>{t}</span>
                  <span className="muted">
                    {n}/{all.length}
                  </span>
                </div>
                <div className="bar">
                  <span style={{ width: pct(n, all.length) + "%" }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
