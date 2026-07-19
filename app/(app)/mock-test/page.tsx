"use client";
import { useState } from "react";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Mock() {
  const { problems } = useRoadmap();
  const [test, setTest] = useState<number[]>([]);
  const generate = () =>
    setTest(
      [...problems]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
        .map((p) => p.id),
    );
  return (
    <>
      <div className="eyebrow">Test your range</div>
      <h1 className="title">Mock test</h1>
      <div className="card">
        <p className="muted">
          Generate a timed set from your imported dataset. Default: 10 randomized questions.
        </p>
        <button className="button" onClick={generate}>
          Generate test
        </button>
        {test.length > 0 && <p style={{ marginBottom: 0 }}>Test generated: {test.join(", ")}</p>}
      </div>
    </>
  );
}
