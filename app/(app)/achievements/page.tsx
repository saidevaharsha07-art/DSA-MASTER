"use client";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Achievements() {
  const { state } = useRoadmap();
  const level = Math.floor(state.xp / 100) + 1;
  return (
    <>
      <div className="eyebrow">Keep showing up</div>
      <h1 className="title">Achievements</h1>
      <div className="grid cards">
        <div className="card">
          <span className="muted">XP</span>
          <div className="metric">{state.xp}</div>
        </div>
        <div className="card">
          <span className="muted">Level</span>
          <div className="metric">{level}</div>
        </div>
        <div className="card">
          <span className="muted">Badges earned</span>
          <div className="metric">{state.completed.length >= 10 ? 1 : 0}</div>
        </div>
        <div className="card">
          <span className="muted">Next badge</span>
          <div className="metric">10 solves</div>
        </div>
      </div>
    </>
  );
}
