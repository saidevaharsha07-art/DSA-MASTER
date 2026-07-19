"use client";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Settings() {
  const { state } = useRoadmap();
  return (
    <>
      <div className="eyebrow">Personalize</div>
      <h1 className="title">Settings</h1>
      <div className="card">
        <h3>Data source</h3>
        <p className="muted">
          Replace <code>public/data/problems.json</code> with an array of problems in the specified
          format. Your learning progress remains in this browser.
        </p>
        <h3>Daily goal</h3>
        <p>{state.dailyGoal} problems per day</p>
      </div>
    </>
  );
}
