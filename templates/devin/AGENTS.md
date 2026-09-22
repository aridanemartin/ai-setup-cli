<!--
  Devin CLI reads AGENTS.md from the repo root as an always-on rule file.
  Devin also reads AGENTS.md in subdirectories, loading them lazily when it touches files
  there — so keep cross-cutting rules here and put file-type-specific ones in .devin/rules/.
  Commit this file so every team member shares the same agent context.
  Docs: https://docs.devin.ai/cli/extensibility/rules
-->

# Project

<!-- TIP 1 — Project Overview: Start with an elevator pitch. Devin can't write relevant code
     without knowing what the app does, who uses it, and what it's trying to achieve.
     Include purpose, audience, and key features in 2-4 sentences.
     Example: "B2B invoicing tool for freelancers. TypeScript monorepo — Node API + React
     web app. PDF generation via Puppeteer. Payments via Stripe." -->

<!-- Replace with your project name and a 2-4 sentence description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — Name every layer with its version. Without this, Devin may suggest APIs from the
     wrong version or mix patterns from incompatible frameworks. Devin explores your codebase
     for established patterns, so the more explicit you are here the more consistently it
     follows your conventions. -->

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

## Architecture

<!-- Describe how your main components interact. This prevents Devin from creating duplicate
     abstractions or placing logic in the wrong layer.
     Example: "Express API → PostgreSQL via Prisma. React frontend in /web. Business logic
     lives in /src/services — no HTTP dependencies there." -->

## Commands

<!-- Give Devin exact commands. These are the verification signals it uses to confirm changes
     are correct. Without them it has no way to close the feedback loop. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this Devin guesses where to place new files and may
     scatter code inconsistently. File-type-specific rules live in .devin/rules/ and load only
     when relevant, keeping this file lean.
     Example:
     - src/
       - api/       — Express routes and controllers
       - services/  — Business logic (no HTTP dependencies)
       - models/    — Prisma schema and types
     - web/         — React frontend
     - scripts/     — Dev automation (see Resources below)
     - tests/       — Integration and e2e tests -->

<!-- Replace with your actual directory layout -->
- src/
  - api/        — Express routes and controllers
  - services/   — Business logic (no HTTP dependencies here)
  - models/     — Prisma schema and derived types
  - lib/        — Shared utilities
- tests/        — Integration and e2e tests (unit tests live next to source)
- scripts/      — Dev automation (see Resources below)
- docs/         — Architecture decisions and API documentation

## Coding Conventions

<!-- TIP 3 — Spell out rules concretely. "Follow best practices" is not actionable. Each rule
     should be specific enough to verify. Cross-cutting rules go here; file-type-specific
     rules go in .devin/rules/ so they load only for relevant files. Consider a skill
     (.devin/skills/) for anything that is a multi-step procedure rather than a standing rule. -->
- ES modules, named exports, no default exports
- TypeScript strict mode — no `any` without an explanatory comment
- Tests live next to source: `foo.ts` → `foo.test.ts`
- No hardcoded secrets — use environment variables
- Never commit directly to `main`

## Agent Permissions

<!-- These mirror the policy in .devin/config.json. Update both together if you change them. -->
- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config without asking
- Do not run destructive shell commands (`rm -rf`, `git reset --hard`) without asking

## Available Resources

<!-- TIP 5 — Point to skills, scripts, and MCP servers. Devin can use these to automate setup,
     testing, and deployment — but only if it knows they exist.
     Example:
     ### Skills (in .devin/skills/)
     - create-pr — open a pull request from the current branch

     ### Scripts (in /scripts)
     - setup.sh      — Install dependencies and seed the local database
     - test-all.sh   — Run unit, integration, and e2e suites
     - deploy.sh     — Build and push to staging

     ### MCP Servers (configured in .devin/mcp_config.json)
     - GitHub MCP    — Manage PRs and issues from the terminal
     - Playwright MCP — Drive the browser for end-to-end testing -->
