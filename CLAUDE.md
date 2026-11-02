# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Official website for 奇模工程有限公司 (Chimore Engineering): public pages (`/`, `/intro`, `/service`, `/projects`, `/projects/[id]`, `/contact`) plus an admin page (`/admin/projects`) for editing 案例實績 (projects) and their categories.

Stack: Next.js 15 App Router, React 19, Joy UI (`@mui/joy`), SCSS modules, Redux Toolkit store + redux-saga, react-hook-form. Source is JSX (`.jsx`); only `next.config.ts` is TypeScript. The README's stack section (React 18 / Ant Design) is out of date.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`).

```bash
pnpm install
cp .env.example .env.local
pnpm dev          # next dev
pnpm build        # next build
pnpm lint         # biome check . (lint + import order + format check)
pnpm format       # biome format --write .
```

Biome is the only lint/format tool (no ESLint/Prettier): 2-space indent, 80-col lines. There is no test suite.

## Architecture

### Routing / page file contract
Each route folder under `src/app` uses three files:
- `page.jsx` — server component; exports `metadata` and just renders `<XxxContent />`.
- `content.jsx` — `"use client"`; all hooks, dispatch, and component composition.
- `page.module.scss` — page-scoped styles (never add a plain `page.scss`).

`src/app/layout.jsx` wraps everything in `Providers` (`src/app/providers.jsx`: Redux `Provider` + Joy `CssVarsProvider`) with shared `Header`/`Footer`.

### Data flow (Redux + Saga)
Components never call the network directly. Flow is: component `dispatch(action)` → saga (`src/redux/saga/*`) → service → `*_SUCCESS` / `*_FAILURE` action → reducer (`src/redux/reducers/*`).
- Action types are UPPER_SNAKE constants with creators in `src/redux/actions/*`; each async op has `X`, `X_SUCCESS`, `X_FAILURE`.
- Sagas use `takeLatest` for fetches and `takeEvery` for create/update/delete. Error messages fall back to Chinese strings.
- The store is created with `thunk: false`; side effects belong only in sagas.
- Import `useDispatch`/`useSelector` from `@hooks/use-redux`, not `react-redux` directly.
- HTTP goes through `fetchApi` (`src/redux/api/apiService.jsx`, a thin `fetch` wrapper; no axios). Endpoints are in `src/redux/api/API.jsx`, prefixed by `NEXT_PUBLIC_API_BASE_URL`.

### Project data: API vs. localStorage mock
`src/redux/api/projectService.jsx` is a facade the project saga calls; it dispatches each call to either `projectApiService` (backend) or `projectMockService` (browser localStorage, key `chimore_projects_v2`, seeded from `src/utils/project-seed-data.jsx`). The switch is `isUseProjectMock()` in `src/utils/project-config.jsx`:
- `NEXT_PUBLIC_USE_PROJECT_MOCK=true` → mock; `=false` → API.
- Unset → API if `NEXT_PUBLIC_API_BASE_URL` is set, otherwise mock.

Any new project operation must be implemented in **both** services and exposed through the facade. Backend shapes are converted via `src/utils/project-normalize.jsx` (`normalizeProject` maps `imageUrl` → `image`, fills defaults; `toApiProjectPayload` goes the other way). When using the API, the separate backend must be running and seeded (`npm run db:seed` in the backend repo).

`src/hooks/use-project-data.jsx` is the shared read hook for public pages: it fetches on mount and derives featured projects / per-category lists via `src/utils/project-view-utils.jsx`.

### Forms
react-hook-form with Joy inputs wired through `Controller`. Reuse `src/components/new-forms/form-field.jsx` and `select-field.jsx`. Validation rules live in `src/utils/*-rules.jsx` (e.g. `project-rules.jsx`, `contact-rules.jsx`), not inline in components. Field errors render in red below the field.

### Components, styles, imports
- Shared components in `src/components`, re-exported from `src/components/index.jsx` (import as `@components`). Admin-only pieces live in `src/components/project-admin/`.
- Shared SCSS variables: `src/styles/variables.module.scss` (Sass `includePaths` is `src`, so it can be imported from `styles/...`).
- Path aliases (`jsconfig.json`): `@/*`, `@components`, `@hooks/*`, `@redux/*`, `@utils/*`. Prefer them over relative paths.
- Keep files under ~500 lines; split into hooks/utils/subcomponents when approaching that.
- Site-wide static content/constants are in `src/utils/site-data.jsx` and `site-constants.jsx`.

## Conventions

- Commit messages (from `.github/prompts/commit.prompt.md`): Traditional Chinese, first line `<type>: <簡短說明>` (~50 chars) with type in `feat|fix|refactor|perf|style|chore|docs|test`, optional `- ` bullet body grouped by theme.
- Don't add extra documentation files unless asked; keep comments to non-obvious logic; keep changes focused.
- Full contributor rules are in `.github/copilot-instructions.md` (note: it references `src/app/forbidden/` and axios, neither of which exist in this repo).
