"use client";
import { useRoadmap } from "@/hooks/use-roadmap";
import { TOPICS } from "@/types";
import { TopicCard } from "@/components/topic-card";
export default function Roadmap() {
  const { problems, state } = useRoadmap();
  return (
    <>
      <div className="eyebrow">Curriculum</div>
      <h1 className="title">DSA Roadmap</h1>
      <p className="muted">
        Move through topics in sequence. Each card opens a difficulty-grouped problemset.
      </p>
      <div className="grid topic-grid" style={{ marginTop: 25 }}>
        {TOPICS.map((t) => (
          <TopicCard
            key={t}
            topic={t}
            problems={problems.filter((p) => p.topic === t)}
            completed={state.completed}
          />
        ))}
      </div>
    </>
  );
}
