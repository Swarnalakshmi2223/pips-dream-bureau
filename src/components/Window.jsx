export default function Window({ title, children }) {
  return (
    <article className="window">
      <header className="window-bar">
        <span className="window-title">{title}</span>
        <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
      </header>
      <div className="window-body">{children}</div>
    </article>
  );
}