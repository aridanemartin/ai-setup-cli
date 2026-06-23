# Project

<!-- TIP 1 — Project Overview: Write an elevator pitch. The AI can't write good code for an
     app it doesn't understand. Include what it does, who uses it, and its key features.
     A concrete description prevents the model from making assumptions about your domain. -->

<!-- Replace with your project name and a 2-4 sentence description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — Name every layer with its version. Without this, the AI may suggest APIs or
     patterns from the wrong framework or an incompatible version. -->

### Backend
<!-- Replace with your actual backend stack -->
- Node.js 20 + TypeScript 5 (strict mode)
- Express 4 — REST API
- PostgreSQL 16 via Prisma ORM

### Frontend
<!-- Replace with your actual frontend stack -->
- React 18 + Vite 5
- Tailwind CSS 3

### Testing
<!-- Replace with your test frameworks and what each covers -->
- Vitest — unit and integration tests
- Playwright — end-to-end tests

## Commands

<!-- These are the verification checks Claude should run to confirm work is correct.
     Exact commands give the AI a pass/fail signal so it can iterate without waiting for you
     to manually spot mistakes — this is how you close the feedback loop. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`

## Project Structure

<!-- TIP 4 — Map your directories. Without this the AI guesses where to put new files and
     often gets it wrong, especially in monorepos or non-standard layouts. -->

<!-- Replace with your actual directory layout -->
- src/
  - api/        — Express routes and controllers
  - services/   — Business logic (no HTTP dependencies here)
  - models/     — Prisma schema and derived types
  - lib/        — Shared utilities
- tests/        — Integration and e2e tests (unit tests live next to source)
- scripts/      — Dev automation (see Resources below)
- docs/         — Architecture decisions and API documentation

## Code Style

<!-- TIP 3 — Spell out coding guidelines concretely. "Format code nicely" is useless — each
     rule below is specific enough to verify. Focus on standards that differ from language
     defaults or that you've had to correct the AI on before. File-type-specific rules live
     in .claude/rules/ so they only load when relevant, saving context window space. -->
- Use ES modules (`import`/`export`), not CommonJS (`require`)
- Destructure imports when possible: `import { foo } from 'bar'`
- Prefer `const` over `let`; never use `var`
- No default exports — always named exports
- Keep functions small and focused; extract when a function exceeds ~40 lines

## Workflow

- Typecheck after a series of code changes
- Run the single relevant test, not the whole suite: `npm test -- path/to/test`
- Never commit directly to `main`

## Banned Patterns

- No hardcoded secrets, API keys, or passwords — use environment variables
- No `console.log` in production code — use a logger
- No `any` in TypeScript without an explanatory comment
- No `rm -rf` without explicit confirmation

## Available Resources

<!-- TIP 5 — Point to scripts and MCP servers. Claude can use these to automate setup,
     testing, and deployment — but only if it knows they exist. An AI that can run your
     setup script is far more self-sufficient than one that asks you to do it manually. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh     — Install dependencies and seed the local database
- test-all.sh  — Run unit, integration, and e2e suites in sequence
- deploy.sh    — Build and push the Docker image to staging

### MCP Servers (configured in .mcp.json)
<!-- Remove this section if you have no MCP servers configured -->
- GitHub MCP    — Create PRs, comment on issues, check CI status
- Playwright MCP — Drive the browser for end-to-end and visual testing
