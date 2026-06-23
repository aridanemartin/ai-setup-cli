<!-- GitHub Copilot reads only the first ~4,000 characters of this file. Keep it concise. -->
<!-- Docs: https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions -->

## Repository overview

<!-- TIP 1 — Project Overview: Write an elevator pitch. Copilot can't suggest relevant code
     without understanding what the app does, who uses it, and what it's trying to accomplish.
     Include: purpose, target audience, primary languages/frameworks, and target runtimes. -->

<!-- Replace with your project description -->
**[Your Project Name]** — [What it does, who uses it, primary language/runtime.]

## Tech stack

<!-- TIP 2 — Identify every layer with its version. Copilot detects some versions from
     package.json, but explicit listing prevents it from suggesting deprecated APIs or mixing
     incompatible patterns. Breaking it out by layer makes it easier to maintain. -->

### Backend
<!-- Replace with your actual backend stack -->
- Node.js 20 + TypeScript 5 (strict)
- Express 4 — REST API
- PostgreSQL 16 via Prisma ORM

### Frontend
<!-- Replace with your actual frontend stack -->
- React 18 + Vite 5
- Tailwind CSS 3

### Testing
<!-- Replace with your test frameworks -->
- Vitest — unit and integration tests
- Playwright — end-to-end tests

## Build & validation

<!-- Give Copilot exact commands so it can verify its own work. Always run these yourself
     once to confirm they work before adding them here — stale commands erode trust. -->
- Bootstrap: `npm ci`
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`

Always run lint and tests before proposing a change. Run a single test file (`npm test -- path/to/file`) rather than the full suite when iterating.

## Project layout

<!-- TIP 4 — Map your directory structure. Without this, Copilot guesses where to place new
     files and may scatter code across inconsistent locations. Call out non-obvious
     conventions (e.g. tests colocated with source rather than in a separate folder). -->

<!-- Replace with your actual directory layout -->
- src/
  - api/         — Express routes and controllers
  - services/    — Business logic (no HTTP dependencies here)
  - models/      — Prisma schema and derived types
- tests/         — Integration and e2e tests
- scripts/       — Dev and deployment automation (see Resources below)
- docs/          — Architecture decisions and API documentation

## Code quality

<!-- TIP 3 — Spell out coding guidelines explicitly. Cross-cutting rules go here; file-type
     conventions live in .github/instructions/ so they only load when Copilot is editing
     matching files. This keeps the main file under the ~4,000-character limit. -->
- Functions should be small and focused with a single responsibility
- Use clear, descriptive names for variables, functions, and classes
- Prefer early returns to reduce nesting
- No commented-out code in pull requests

## Available resources

<!-- TIP 5 — Point to scripts and MCP servers. Copilot can suggest or invoke these tools to
     automate setup, testing, and deployment — but only if it knows they exist. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh      — Bootstrap dependencies and seed the local database
- test-all.sh   — Run unit, integration, and e2e suites
- deploy.sh     — Build and push to staging

### MCP Servers
<!-- Remove this section if you have no MCP servers configured -->
- GitHub MCP    — Interact with PRs, issues, and CI from the terminal
- Playwright MCP — Drive the browser for end-to-end testing

## Modular instructions

<!-- TIP 3 (continued) — Domain-specific conventions belong in scoped instruction files, not
     here. Each .instructions.md file declares an applyTo glob so Copilot loads it only when
     editing matching files. This keeps the main file short and ensures rules reach the files
     they actually apply to. -->
Domain-specific conventions live in `.github/instructions/*.instructions.md` and are scoped via the `applyTo` glob in each file's frontmatter. Copilot loads them automatically when editing matching files:

- `typescript.instructions.md` — TypeScript files (`**/*.ts,**/*.tsx`)
- `testing.instructions.md` — test files (`**/*.test.*,**/*.spec.*`)
- `security.instructions.md` — all files
- `documentation.instructions.md` — source and markdown files
- `code-review.instructions.md` — all files (used during code review)

Project-level conventions and agent permissions live in `AGENTS.md` at the repository root.
