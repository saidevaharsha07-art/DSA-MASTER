"use client";
import { useParams } from "next/navigation";
import { useRoadmap } from "@/hooks/use-roadmap";
import { displayTopic } from "@/lib/utils";
import { ProblemTable } from "@/components/problem-table";
export default function Topic() {
  const { topic } = useParams<{ topic: string }>();
  const t = displayTopic(topic),
    { problems } = useRoadmap(),
    list = problems.filter((p) => p.topic === t);
  return (
    <>
      <div className="eyebrow">Topic</div>
      <h1 className="title">{t}</h1>
      <p className="muted">{list.length} curated problems ordered by difficulty.</p>
      {(["Easy", "Medium", "Hard"] as const).map((d) => (
        <section key={d} style={{ marginTop: 32 }}>
          <h2 className="title" style={{ fontSize: 21 }}>
            {d}
          </h2>
          <ProblemTable items={list.filter((p) => p.difficulty === d)} />
        </section>
      ))}
    </>
  );
}
