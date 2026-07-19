"use client";
import { notFound, useParams } from "next/navigation";
import { useRoadmap } from "@/hooks/use-roadmap";
export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const { problems, state, note, schedule, toggle, ready, error } = useRoadmap();
  const problem = problems.find((item) => item.id === Number(id));
  if (!ready)
    return (
      <div className="empty" role="status">
        Loading problem…
      </div>
    );
  if (error)
    return (
      <div className="empty" role="alert">
        {error}
      </div>
    );
  if (!problem) notFound();
  return (
    <>
      <div className="eyebrow">
        {problem.topic} · {problem.pattern}
      </div>
      <h1 className="title">
        {problem.id}. {problem.title}
      </h1>
      <div className="toolbar">
        <span className={`pill ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
        <span className="muted">
          Acceptance {problem.acceptance} · {problem.estimatedTime}
        </span>
        <a className="button" target="_blank" rel="noopener noreferrer" href={problem.url}>
          Open problem
        </a>
        <button className="button ghost" onClick={() => toggle("completed", problem.id)}>
          {state.completed.includes(problem.id) ? "Completed" : "Mark completed"}
        </button>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1fr 300px" }}>
        <section className="card">
          <h2 style={{ marginTop: 0 }}>Notes</h2>
          <p className="muted">Markdown-friendly autosaved notes. Use code fences for snippets.</p>
          <textarea
            className="note"
            value={state.notes[problem.id] || ""}
            onChange={(event) => note(problem.id, event.target.value)}
            placeholder="What did you learn?"
          />
        </section>
        <aside className="card">
          <h3 style={{ marginTop: 0 }}>Revision schedule</h3>
          <div className="list">
            {[1, 3, 7, 15, 30].map((days) => (
              <button
                key={days}
                className="button ghost"
                onClick={() => schedule(problem.id, days)}
              >
                Review in {days} day{days > 1 ? "s" : ""}
              </button>
            ))}
          </div>
          <h3>Resources</h3>
          {Object.entries(problem.resources || {})
            .filter(([, url]) => url)
            .map(([name, url]) => (
              <a
                className="muted"
                style={{ display: "block", marginTop: 8 }}
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
              </a>
            ))}
        </aside>
      </div>
    </>
  );
}
