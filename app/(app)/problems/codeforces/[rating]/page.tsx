"use client";
import { Check, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCodeforces } from "@/hooks/use-codeforces";
type Problem = {
  problemId: string;
  title: string;
  rating: number;
  topic: string;
  difficulty: string;
  url: string;
};
export default function Rating() {
  const { rating } = useParams<{ rating: string }>();
  const [items, setItems] = useState<Problem[]>([]);
  const [error, setError] = useState(false);
  const { state, toggle } = useCodeforces();
  useEffect(() => {
    fetch(`/data/codeforces/rating${rating}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setItems)
      .catch(() => setError(true));
  }, [rating]);
  if (error)
    return (
      <div className="empty" role="alert">
        This Codeforces rating database could not be loaded.
      </div>
    );
  if (!items.length)
    return (
      <div className="empty" role="status">
        Loading Codeforces problems…
      </div>
    );
  return (
    <>
      <div className="eyebrow">Problems &gt; Codeforces</div>
      <h1 className="title">Rating {rating}</h1>
      <p className="muted">
        {items.filter((p) => state.completed.includes(p.problemId)).length}/{items.length} solved.
      </p>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Done</th>
              <th>#</th>
              <th>Problem</th>
              <th>Rating</th>
              <th>Concept</th>
              <th>Difficulty</th>
              <th>Open</th>
              <th>Favorite</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.problemId}>
                <td>
                  <button
                    className="button ghost"
                    onClick={() => toggle("completed", p.problemId)}
                    aria-label={`Toggle ${p.title} complete`}
                  >
                    {state.completed.includes(p.problemId) && <Check size={15} />}
                  </button>
                </td>
                <td>{p.problemId}</td>
                <td>
                  <b>{p.title}</b>
                </td>
                <td>{p.rating}</td>
                <td>{p.topic}</td>
                <td>{p.difficulty}</td>
                <td>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    Open
                  </a>
                </td>
                <td>
                  <button
                    className="button ghost"
                    onClick={() => toggle("favorites", p.problemId)}
                    aria-label={`Toggle ${p.title} favorite`}
                  >
                    <Star
                      size={15}
                      fill={state.favorites.includes(p.problemId) ? "currentColor" : "none"}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
