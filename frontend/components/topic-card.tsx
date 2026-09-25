import Link from "next/link";
import { Problem } from "@/types";
import { pct } from "@/lib/utils";
export function TopicCard({
  topic,
  problems,
  completed,
}: {
  topic: string;
  problems: Problem[];
  completed: number[];
}) {
  const done = problems.filter((x) => completed.includes(x.id)).length;
  return (
    <Link href={`/topic/${encodeURIComponent(topic)}`} className="card topic-card">
      <div className="row">
        <b>{topic}</b>
        <span className="muted">
          {done}/{problems.length}
        </span>
      </div>
      <div className="progress">
        <span style={{ width: pct(done, problems.length) + "%" }} />
      </div>
      <div className="row muted" style={{ marginTop: 14, fontSize: 12 }}>
        <span>
          {problems.filter((p) => p.difficulty === "Easy").length} Easy ·{" "}
          {problems.filter((p) => p.difficulty === "Medium").length} Medium ·{" "}
          {problems.filter((p) => p.difficulty === "Hard").length} Hard
        </span>
      </div>
    </Link>
  );
}
