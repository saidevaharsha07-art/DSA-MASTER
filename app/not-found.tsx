import Link from "next/link";
export default function NotFound() {
  return (
    <main className="page">
      <div className="empty">
        <h1 className="title">Problem not found</h1>
        <p className="muted">This problem does not exist in the current catalogue.</p>
        <Link className="button" href="/roadmap">
          Return to roadmap
        </Link>
      </div>
    </main>
  );
}
