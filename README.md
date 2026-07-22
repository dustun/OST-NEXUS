# OST NEXUS

OST NEXUS is a game soundtrack encyclopedia, an interactive radio, and a visual musical world. This repository is the shared monorepo for the public Next.js application, the Laravel REST API, the Filament administration panel, and local infrastructure.

## Repository layout

```text
frontend/       Next.js, React, TypeScript, Tailwind CSS
backend/        Laravel REST API and Filament
docker/         Caddy and application images
docs/           Architecture decisions and delivery roadmap
compose.yml     Local development stack
Taskfile.yml    Single command entry point
```

## Quick start

Requirements: Docker Desktop, [Task](https://taskfile.dev/), [Caddy](https://caddyserver.com/docs/install), Node.js 20.9+, PHP 8.3+, and Composer.

```bash
task setup
task dev
```

Then open:

- application: <http://localhost:8090>
- API health: <http://localhost:8090/api/v1/health>
- Filament: <http://localhost:8090/admin>
- PostgreSQL from the host: `localhost:54320`

PostgreSQL runs in Docker. Task starts Caddy, Laravel, and Next.js as local development processes so file watching stays fast on macOS, Linux, and Windows/WSL.

Run all checks with `task test`. Use `task --list` to see the full command set.

## Git workflow

- `main` - release-ready history;
- `dev` - integration branch for completed work;
- `feature/*`, `fix/*`, `chore/*` - short-lived branches created from `dev` and merged back through review.

The initial Foundation work is developed on `feature/foundation`, based on `dev`.

## Product constraints

- listeners do not need an account in the MVP;
- Laravel and PostgreSQL are the source of truth, and Filament is the only admin panel;
- tracks are provider-independent entities; a YouTube video is one playback source;
- YouTube playback must use a visible official embedded player;
- imported content remains a draft until editorial review;
- Motion and 3D must degrade gracefully and respect reduced-motion settings.

See [architecture](docs/architecture.md) and [roadmap](docs/roadmap.md) for the implementation boundaries derived from specification v1.2.
