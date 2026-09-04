# Bingo Mixer Agent Guide

## Scope

- For customization requests, edit only agent instructions, skills, agents, prompts, or hooks; do not implement the product task mentioned in the request.
- For product changes, preserve the existing component boundaries and link to the relevant workshop guidance instead of duplicating it.

## Start Here

- [README.md](README.md) covers prerequisites, local setup, build, and deployment.
- [workshop/GUIDE.md](workshop/GUIDE.md) is the workshop map and checklist.
- [CONTRIBUTING.md](CONTRIBUTING.md) and [SECURITY.md](SECURITY.md) define project policies.

## Commands

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

Run focused checks for changed code, then the relevant full checks. The production build runs TypeScript and Vite.

## Architecture

- [src/App.tsx](src/App.tsx) wires game state to the start and game screens.
- [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts) owns state, `localStorage` persistence, transitions, and modal state.
- [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) owns board generation, square toggling, and win detection.
- [src/types/index.ts](src/types/index.ts) defines domain types; [src/data/questions.ts](src/data/questions.ts) defines the question pool and free-space text.
- [src/components/](src/components/) contains presentational screens, board, squares, and modal.

There is no router, backend, API, or external state library. React state and browser storage are the persistence boundary.

## Invariants And Risks

- Keep board updates immutable and use the existing bingo logic helpers.
- The center square is index `12`, starts marked, and cannot be toggled.
- Persisted state uses the `bingo-game-state` key and a versioned validation path. Update both when changing the stored shape.
- The bingo transition uses `queueMicrotask`; test changes to its timing.
- Current tests are concentrated in [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts). Add focused component or hook tests when changing those areas.
- `checkBingo()` expects a complete 25-square board; preserve that contract or update its tests and callers together.

## Frontend And Docs

- React 19, TypeScript, Vite, and Tailwind CSS v4 are the primary frontend tools.
- Read [tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md) before changing Tailwind styles; tokens live in [src/index.css](src/index.css) via `@theme`.
- Use [frontend-design/SKILL.md](.github/skills/frontend-design/SKILL.md) for UI work and the matching specialized agent in [.github/agents/](.github/agents/) when useful.
- Workshop translations include an `l10n-sync` marker. Keep translated structure aligned with the source workshop file when editing localized docs.

## Deployment

- [deploy.yml](.github/workflows/deploy.yml) publishes GitHub Pages from `main` using Node 22 and `npm ci`.
- `VITE_REPO_NAME` controls the `/game/` base path on Pages; local development uses `/`.# Bingo Mixer Agent Guide

## Start Here

- Read [README.md](README.md) for prerequisites, setup, and deployment.
- Use [workshop/GUIDE.md](workshop/GUIDE.md) for the project's full development workflow.
- Follow [CONTRIBUTING.md](CONTRIBUTING.md) for contribution and CLA requirements.

## Commands

```bash
npm install
npm run dev
npm run lint
npm test
npm run build
```

Run the focused checks for the files changed, then run the full relevant checks before finishing. `npm run build` performs the TypeScript build and Vite production build.

## Architecture

- [src/App.tsx](src/App.tsx) routes between the start and game views.
- [src/hooks/useBingoGame.ts](src/hooks/useBingoGame.ts) owns game state, persistence, and bingo transitions.
- [src/utils/bingoLogic.ts](src/utils/bingoLogic.ts) owns board generation, square toggling, and winning-line detection.
- [src/types/index.ts](src/types/index.ts) defines the domain types and `GameState`.
- [src/components/](src/components/) contains the start screen, game screen, board, squares, and bingo modal.
- [src/data/questions.ts](src/data/questions.ts) is the question pool and free-space source.

There is no router, backend, API, or external state library. React state and browser `localStorage` are the persistence boundary.

## Important Invariants

- Keep board updates immutable and use the existing bingo logic helpers.
- The center square is always index `12`, starts marked, and cannot be toggled.
- Saved state uses the `bingo-game-state` `localStorage` key and includes validation/versioning. Update that validation when changing the persisted shape.
- Bingo detection currently returns the first matching line; preserve or explicitly test any change to that behavior.
- The bingo transition is scheduled with `queueMicrotask`; test changes to this timing-sensitive flow.
- Existing tests primarily cover [src/utils/bingoLogic.test.ts](src/utils/bingoLogic.test.ts). Add focused tests for new hook, persistence, accessibility, or component behavior when changing those areas.

## Frontend Conventions

- Tailwind CSS is v4 and uses CSS-first configuration. Read [tailwind-4.instructions.md](.github/instructions/tailwind-4.instructions.md) before changing Tailwind styles.
- Prefer the existing component boundaries and inline Tailwind utility style over introducing a new styling system or configuration.
- Use the frontend workflow in [.github/skills/frontend-design/SKILL.md](.github/skills/frontend-design/SKILL.md) for UI work.
- Use the specialized agents in [.github/agents/](.github/agents/) when their workflow matches the task, especially TDD, quiz content, and UI review work.

## Deployment

GitHub Pages builds need the `VITE_REPO_NAME` base path. Keep local development on the default `/` base and verify production changes with `npm run build`.