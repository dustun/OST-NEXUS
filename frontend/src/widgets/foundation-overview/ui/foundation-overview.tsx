const foundationParts = [
  {
    title: "Публичное приложение",
    description: "Next.js, React, TypeScript и адаптивная визуальная система.",
    technology: "фронтенд · Next.js",
  },
  {
    title: "Ядро каталога",
    description: "Laravel REST API, PostgreSQL и единый формат ответов.",
    technology: "бэкенд · API v1",
  },
  {
    title: "Редакторский контроль",
    description: "Filament внутри Laravel для модерации и публикации контента.",
    technology: "админ-панель · /admin",
  },
] as const;

export function FoundationOverview() {
  return (
    <section className="foundation" id="foundation">
      <div className="section-heading">
        <p className="eyebrow">Единая точка запуска</p>
        <h2>Основание для вертикальных срезов</h2>
      </div>
      <div className="system-grid">
        {foundationParts.map((part, index) => (
          <article className="system-card" key={part.title}>
            <span className="card-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{part.title}</h3>
            <p>{part.description}</p>
            <span className="tech-label">{part.technology}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
