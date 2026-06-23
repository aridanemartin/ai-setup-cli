# Project

<!-- TIP 1 — Project Overview: Start with an elevator pitch. Cursor can't suggest relevant
     code without understanding what the app does, who uses it, and what it's trying to
     accomplish. Include purpose, audience, and key features in 2-4 sentences. -->

<!-- Replace with your project name and description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — Name every layer with its version. Without this, Cursor may suggest deprecated
     APIs or mix patterns from incompatible frameworks. Cursor also scans the codebase for
     established patterns, so explicit listing reinforces your actual conventions. -->

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

<!-- Describe how your main components interact. This prevents Cursor from creating duplicate
     abstractions or placing logic in the wrong layer. -->

<!-- Replace with your actual architecture description -->
Express API → PostgreSQL via Prisma. React frontend in /web. Business logic lives in /src/services — no HTTP code there.

## Commands

<!-- Give Cursor exact commands to run. These are the verification signals it uses to confirm
     its changes are correct — without them it has no way to close the feedback loop. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this Cursor guesses where to place new files and
     may scatter code inconsistently. File-type-specific rules live in .cursor/rules/ and are
     loaded only when working on matching files, keeping this file lean. -->

<!-- Replace with your actual directory layout -->
- src/
  - api/       — Express routes and controllers
  - services/  — Business logic (no HTTP dependencies)
  - models/    — Prisma schema and types
- web/         — React frontend
- scripts/     — Dev automation (see Resources below)
- tests/       — Integration and e2e tests

## Coding Conventions

<!-- TIP 3 — Spell out rules concretely. "Follow best practices" is not actionable. Each rule
     should be specific enough to verify. Cross-cutting rules go here; put file-type
     conventions in .cursor/rules/ so they load only when relevant. -->
- ES modules, named exports, no default exports
- TypeScript strict mode — no `any` without comment
- Tests live next to source: `foo.ts` → `foo.test.ts`
- No hardcoded secrets — use environment variables

## Agent Permissions

- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config without asking
- Do not run destructive shell commands (`rm -rf`, `git reset --hard`) without asking

## Available Resources

<!-- TIP 5 — Point to scripts and MCP servers configured in .cursor/mcp.json. Cursor can
     invoke these to automate setup, testing, and deployment — but only if it knows they
     exist. List each resource with its purpose so Cursor picks the right one. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh      — Install dependencies and seed the database
- test-all.sh   — Run unit, integration, and e2e suites
- deploy.sh     — Build and push to staging

### MCP Servers (configured in .cursor/mcp.json)
<!-- Remove this section if you have no MCP servers configured -->
- GitHub MCP    — Manage PRs and issues from the terminal
- Playwright MCP — Drive the browser for end-to-end testing
