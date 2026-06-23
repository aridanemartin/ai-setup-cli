# Project

<!-- TIP 1 — Project Overview: Start with an elevator pitch. OpenCode can't write targeted
     code without knowing what the app does, who uses it, and what it aims to accomplish.
     Include purpose, audience, and key features in 2-4 sentences. -->

<!-- Replace with your project name and description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — List every technology by layer with versions. Without this, OpenCode may suggest
     APIs from the wrong version or mix patterns from incompatible frameworks. -->

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

<!-- Describe how your main components interact. This prevents OpenCode from creating
     duplicate abstractions or placing logic in the wrong layer. -->

<!-- Replace with your actual architecture description -->
Express API → PostgreSQL via Prisma. React frontend in /web communicates only via REST. Business logic lives in /src/services — no HTTP code there.

## Commands

<!-- Give OpenCode exact commands so it can verify its own work. These are the checks it runs
     before considering a task done. Always confirm they work before adding them here. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this OpenCode guesses where new files belong and
     may scatter code inconsistently across the project. -->

<!-- Replace with your actual directory layout -->
- src/
  - api/       — Express routes and controllers
  - services/  — Business logic (no HTTP dependencies)
  - models/    — Prisma schema and types
- web/         — React frontend
- scripts/     — Dev automation (see Resources below)
- tests/       — Integration and e2e tests

## Coding Conventions

<!-- TIP 3 — Spell out rules explicitly and concretely. "Keep code clean" tells OpenCode
     nothing. Each rule should be specific enough to verify. Document standards that differ
     from language defaults or patterns you've had to correct before. -->
- ES modules, named exports, no default exports
- TypeScript strict mode — no `any` without comment
- Tests live next to source: `foo.ts` → `foo.test.ts`
- No hardcoded secrets — use environment variables

## Agent Permissions

<!-- Explicit permissions help OpenCode stay in scope and protect sensitive files. -->
- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config without asking
- Do not run destructive shell commands (`rm -rf`, `git reset --hard`) without asking

## Available Agents

<!-- OpenCode supports multiple named agents defined in opencode.json. Each agent can have
     its own model, permissions, and system prompt in prompts/<agent-name>.txt. -->
- **build** — primary agent, can read and edit
- **plan** — planning agent, read-only
- **code-reviewer** — sub-agent for security + correctness review, read-only

## Available Resources

<!-- TIP 5 — Point to scripts and MCP servers. OpenCode can invoke these to automate setup,
     testing, and deployment — but only if it knows they exist. You can also reference
     additional docs lazily using @path/ syntax so they only load when needed. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh    — Install dependencies and seed the database
- test-all.sh — Run unit, integration, and e2e suites
- deploy.sh   — Build and push to staging

### MCP Servers (configured in opencode.json)
<!-- Remove this section if you have no MCP servers configured -->
- GitHub MCP    — Manage PRs and issues from the terminal
- Playwright MCP — Drive the browser for end-to-end testing

### Lazy-loaded documentation
<!-- Use @path/ syntax so these only load into context when OpenCode needs them -->
- TypeScript style: @docs/typescript-guidelines.md
- API design: @docs/api-standards.md
