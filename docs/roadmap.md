# Delivery roadmap

Each phase ends with a testable vertical slice. Work branches start from `dev` and remain narrow enough to review.

## 0. Foundation - current

- monorepo and Git workflow;
- Next.js and Laravel applications;
- Filament panel installation;
- PostgreSQL, Caddy, Docker Compose, and Taskfile;
- API response convention and health endpoint;
- initial UI tokens, responsive shell, and reduced-motion fallback.

## 1. First vertical slice

Acceptance dataset: one game, three tracks, one composer, two moods, two scene types, and one YouTube source per track.

Expected user path: open a published game, play any track in a persistent visible player, navigate without stopping playback, favorite a track, reload, and recover the local state.

Suggested branches:

- `feature/catalog-schema` - PostgreSQL migrations, constraints, factories, and seed data;
- `feature/catalog-admin` - Filament resources and editorial workflow;
- `feature/catalog-api` - public read-only game and track endpoints;
- `feature/frontend-shell` - layouts, tokens, navigation, and catalog API client;
- `feature/global-player` - visible YouTube IFrame player and persistent queue;
- `feature/local-favorites` - Dexie storage, favorites, and recovery.

## 2. MVP increments

1. Personalization: local history, queue, settings, and spoiler-safe mode.
2. Radio: filters, scoring, controlled randomness, and dynamic curves.
3. Share and social: anonymous public playlists and Filament-managed links.
4. Motion and 3D: Motion interactions, then one optimized Nexus Core scene.
5. Quality: accessibility, SEO, performance budgets, provider compliance, and source monitoring.

Registration, social feeds, native apps, user uploads, audio extraction, and ML recommendations are not part of the MVP.

