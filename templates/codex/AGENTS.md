# Project

<!-- TIP 1 — Project Overview: Start with an elevator pitch. Codex can't write targeted code
     without knowing what the app does, who uses it, and what it's trying to achieve. Include
     purpose, target audience, and key features in 2-4 sentences. -->

<!-- Replace with your project name and description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — List every technology by layer, including versions. Without this, Codex may
     suggest APIs or patterns from an incompatible version or a different framework entirely. -->

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

## Architecture

<!-- Describe how your main components interact. This prevents Codex from creating duplicate
     abstractions or placing logic in the wrong layer. -->

<!-- Replace with your actual architecture description -->
Express API → PostgreSQL via Prisma. React frontend in /web communicates only via REST. Business logic lives in /src/services — no HTTP code there.

## Commands

<!-- Give Codex exact commands it can run to verify its own work. Include all validation
     steps so it can close the feedback loop without asking you. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this Codex guesses where to put new files and
     often gets it wrong in monorepos or non-standard layouts. -->

<!-- Replace with your actual directory layout -->
- src/
  - api/       — Express routes and controllers
  - services/  — Business logic (no HTTP dependencies)
  - models/    — Prisma schema and types
- web/         — React frontend
- scripts/     — Dev automation (see Resources below)
- tests/       — Integration and e2e tests

## Coding Conventions

<!-- TIP 3 — Spell out rules explicitly. "Write clean code" tells Codex nothing. Each rule
     should be concrete enough to verify. Focus on standards that differ from language defaults
     or patterns you've had to correct before. -->
- ES modules, named exports, no default exports
- TypeScript strict mode — no `any` without comment
- Tests live next to source: `foo.ts` → `foo.test.ts`
- No hardcoded secrets — use environment variables

## Agent Permissions

<!-- Declare what Codex is and isn't allowed to do. Explicit permissions reduce the risk of
     accidental edits to sensitive files and help the agent stay in scope. -->
- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config without asking
- Do not run destructive shell commands (`rm -rf`, `git reset --hard`) without asking

## Available Resources

<!-- TIP 5 — Point to scripts and MCP servers. Codex can run these to automate setup,
     testing, and deployment — but only if it knows they exist. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh    — Install dependencies and seed the database
- test-all.sh — Run unit, integration, and e2e suites in order
- deploy.sh   — Build and push the Docker image to staging
