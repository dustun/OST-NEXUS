import { routes } from "@/shared/config";

export function SiteHeader() {
  return (
    <header className="topbar">
      <a className="brand" href={routes.home} aria-label="OST NEXUS, на главную">
        <span className="brand-mark" aria-hidden="true" />
        <span>OST NEXUS</span>
      </a>
      <nav className="topbar-links" aria-label="Системные ссылки">
        <a href={routes.health}>API</a>
        <a href={routes.admin}>Админ-панель</a>
      </nav>
    </header>
  );
}
