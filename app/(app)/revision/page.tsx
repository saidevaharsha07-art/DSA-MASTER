"use client";
import { ProblemTable } from "@/components/problem-table";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Revision() {
  const { problems, state } = useRoadmap();
  const due = problems.filter(
    (problem) => state.revision[problem.id] && new Date(state.revision[problem.id]) <= new Date(),
  );
  return (
    <>
      <div className="eyebrow">Spaced repetition</div>
      <h1 className="title">Revision queue</h1>
      <p className="muted">
        Review problems due today or overdue. Marking one revised removes it from this queue; use
        its problem page to schedule the next review.
      </p>
      <ProblemTable revisionQueue items={due} />
    </>
  );
}
