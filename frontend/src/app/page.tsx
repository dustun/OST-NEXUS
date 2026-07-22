export default function Home() {
  return (
    <main className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="OST NEXUS, на главную">
          <span className="brand-mark" aria-hidden="true" />
          <span>OST NEXUS</span>
        </a>
        <nav className="topbar-links" aria-label="Системные ссылки">
          <a href="/api/v1/health">API</a>
          <a href="/admin">Filament</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Foundation · Iteration 0</p>
          <h1>
            Игровые миры
            <span> продолжают звучать.</span>
          </h1>
          <p className="hero-text">
            Энциклопедия саундтреков, интерактивное радио и музыкальная
            карта связанных миров. Первый технический контур уже собран.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/api/v1/health">
              Проверить API
            </a>
            <a className="button button-secondary" href="#foundation">
              Открыть архитектуру
            </a>
          </div>
        </div>

        <div className="nexus-stage" aria-label="Абстрактное ядро OST NEXUS">
          <div className="orbit orbit-outer" />
          <div className="orbit orbit-inner" />
          <div className="nexus-core">
            <span>N</span>
          </div>
          <i className="node node-one" />
          <i className="node node-two" />
          <i className="node node-three" />
        </div>
      </section>

      <section className="foundation" id="foundation">
        <div className="section-heading">
          <p className="eyebrow">Единая точка запуска</p>
          <h2>Основание для вертикальных срезов</h2>
        </div>
        <div className="system-grid">
          <article className="system-card">
            <span className="card-index">01</span>
            <h3>Public experience</h3>
            <p>Next.js, React, TypeScript и адаптивная визуальная система.</p>
            <span className="tech-label">frontend · Next.js</span>
          </article>
          <article className="system-card">
            <span className="card-index">02</span>
            <h3>Catalog core</h3>
            <p>Laravel REST API, PostgreSQL и единый формат ответов.</p>
            <span className="tech-label">backend · API v1</span>
          </article>
          <article className="system-card">
            <span className="card-index">03</span>
            <h3>Editorial control</h3>
            <p>Filament внутри Laravel для модерации и публикации контента.</p>
            <span className="tech-label">admin · /admin</span>
          </article>
        </div>
      </section>

      <footer className="footer">
        <span>OST NEXUS</span>
        <span>Next: catalog schema and first curated world</span>
      </footer>
    </main>
  );
}
