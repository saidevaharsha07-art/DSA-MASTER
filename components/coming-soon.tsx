export function ComingSoon({ title, detail }: { title: string; detail: string }) {
  return (
    <>
      <div className="eyebrow">DSA Master</div>
      <h1 className="title">{title}</h1>
      <div className="card" style={{ maxWidth: 760 }}>
        <p className="muted">{detail}</p>
        <p className="muted">
          This local-first module is ready to be extended as your dataset and learning history grow.
        </p>
      </div>
    </>
  );
}
