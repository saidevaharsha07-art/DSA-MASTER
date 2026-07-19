"use client";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Profile() {
  const { state } = useRoadmap();
  return (
    <>
      <div className="eyebrow">Your profile</div>
      <h1 className="title">DSA learner</h1>
      <div className="card" style={{ maxWidth: 600 }}>
        <p className="muted">
          You have completed {state.completed.length} problems and earned {state.xp} XP. Your
          progress is saved locally on this device.
        </p>
      </div>
    </>
  );
}
