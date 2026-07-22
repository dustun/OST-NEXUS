import { routes } from "@/shared/config";

export function NexusHero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Основа · Итерация 0</p>
        <h1>
          Игровые миры
          <span> продолжают звучать.</span>
        </h1>
        <p className="hero-text">
          Энциклопедия саундтреков, интерактивное радио и музыкальная карта
          связанных миров. Первый технический контур уже собран.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={routes.health}>
            Проверить API
          </a>
          <a className="button button-secondary" href={routes.foundation}>
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
  );
}
