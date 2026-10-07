# Contributing to pwasdk

Thanks for helping improve this project.

## Setup

```bash
pnpm install
pnpm --filter @pwasdk/core build
pnpm dev
```

- Node.js 20+
- pnpm 9+

## Project layout

```
packages/core   # publishable SDK (@pwasdk/core)
apps/playground # local demo app (not published)
```

## Development guidelines

1. Keep modules browser-only and side-effect free on import.
2. Prefer small, focused modules with an `isSupported()` helper.
3. Avoid `console.log` in library code; throw or return typed results instead.
4. Do not add default secrets or hardcoded production keys.
5. Match existing TypeScript style and naming (PascalCase namespaces).

## Pull requests

1. Fork and create a branch from `main`.
2. Keep PRs focused and small when possible.
3. Update docs if you change a public API.
4. Ensure the core package builds cleanly.

## Reporting issues

Use the GitHub issue templates for bugs and feature requests.
Include browser/OS and package version for bugs.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
