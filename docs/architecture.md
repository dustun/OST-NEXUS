# Architecture

## Decision record

OST NEXUS uses one Git monorepo. Frontend and backend are independently buildable applications, but a single Taskfile and Docker Compose project control the local environment. This keeps API and UI changes atomic while preserving clear service boundaries.

## Runtime topology

```text
Browser :8090
    |
  Caddy
    |-- /api/*, /admin*, Filament assets --> Laravel :8100
    `-- everything else -----------------> Next.js :3100

Laravel --> PostgreSQL :5432
```

PostgreSQL runs in Docker. Task starts Caddy, Next.js, and Laravel as host development processes. This avoids slow cross-platform dependency volumes while preserving one command (`task dev`) and a same-origin surface. PostgreSQL is the only application database. Redis is intentionally deferred until a measured queue or cache need appears.

## Application boundaries

Frontend modules will follow the specification vocabulary:

- entities: game, track, composer, station;
- features: search, queue, favorites, sharing, spoiler mode;
- widgets: header, player, Nexus Core, station grid, footer;
- shared: API client, UI primitives, motion tokens, storage adapters.

Backend domains will be introduced as vertical slices:

- Catalog;
- Playback Source;
- Radio;
- Collection and Shared Playlist;
- Content and Social Link;
- Provider Integration;
- Anonymous Analytics;
- Admin.

Laravel Eloquent models and PostgreSQL remain the source of truth. Filament uses the same models and never becomes a separate backend. The Next.js client only consumes versioned Laravel REST endpoints.

## API conventions

Public endpoints use the `/api/v1` prefix and return a stable envelope:

```json
{
  "data": {},
  "meta": {},
  "errors": []
}
```

The first endpoint is `GET /api/v1/health`. Catalog reads are the next API increment.

## Local persistence

Browser preferences such as theme, volume, and spoiler mode belong in `localStorage`. Favorites, history, and the persistent queue will use IndexedDB through Dexie. Sensitive data and hidden cross-device profiling are explicitly out of scope.

## Performance and compliance guardrails

- load 3D only after meaningful content and provide a static fallback;
- respect `prefers-reduced-motion` from the first UI increment;
- do not download, extract, hide, or background-play YouTube media;
- keep the provider player visible, attributed, and large enough;
- query the OST NEXUS database for product search instead of YouTube on each input;
- keep secrets in environment configuration.
