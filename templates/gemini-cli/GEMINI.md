# Project Instructions

<!-- TIP 1 — Project Overview: Start with an elevator pitch. Gemini can't contribute
     meaningfully without understanding what the app does and who uses it. Include: purpose,
     target audience, and key features. Keep it to 2-4 sentences. -->

<!-- Replace with your project name and description -->
**[Your Project Name]** — [What it does, who uses it, and its core features.]

## Tech Stack

<!-- TIP 2 — Name every layer with its version. Without this, Gemini may suggest APIs from
     the wrong framework version or patterns that don't fit your stack. -->

### Backend
<!-- Replace with your actual backend stack -->
- Node.js 20 + TypeScript 5
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

## Commands

<!-- Give Gemini exact commands. These serve as the verification signal — Gemini should run
     them before finishing a task rather than guessing the work is done. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this Gemini guesses where new files belong and
     often places them inconsistently, especially in monorepos or non-standard layouts. -->

<!-- Replace with your actual directory layout -->
- src/
  - api/       — Express routes and controllers
  - services/  — Business logic (no HTTP dependencies here)
  - models/    — Prisma schema and derived types
  - lib/       — Shared utilities
- tests/       — Integration and e2e tests (unit tests live next to source)
- scripts/     — Dev automation (see Resources below)
- docs/        — Architecture decisions and API documentation

## Code Conventions

<!-- TIP 3 — Spell out rules that differ from language defaults or that you've had to correct
     before. Vague rules ("keep code clean") are useless — each entry below is verifiable. -->
- ES modules (`import`/`export`), not CommonJS
- Named exports only — no default exports
- TypeScript strict mode throughout
- No `console.log` in production code — use a logger

## Testing

- Run a single test file: `npm test -- path/to/test`
- Tests live next to source files: `foo.ts` → `foo.test.ts`
- Write the failing test before fixing a bug

## Tone

- Be concise — skip explanations of basic concepts
- Prefer showing code over describing it
- Raise security concerns immediately, don't defer

## Available Resources

<!-- TIP 5 — List scripts and MCP servers. Gemini can use these to automate work — setup,
     test runs, deployments — but only if it knows they exist. Include the purpose of each
     so Gemini can pick the right tool for the task. -->

### Scripts (in /scripts)
<!-- Replace with your actual scripts -->
- setup.sh     — Install dependencies and seed the local database
- test-all.sh  — Run unit, integration, and e2e suites in sequence
- deploy.sh    — Build and push the Docker image to staging

### MCP Servers (configured in .gemini/settings.json)
<!-- Remove this section if you have no MCP servers configured -->
- GitHub MCP    — Manage PRs, issues, and CI status from the terminal
- Playwright MCP — Drive the browser for end-to-end testing

## Agent Personas

<!-- Gemini CLI does not yet support file-based sub-agents. When the user asks for a focused
     role, adopt the matching persona inline: -->

**code-reviewer** — triggered when the user asks for a code review or says "review this":
- Read-only: do not edit any files
- Report findings as: `[critical|warning|note] file:line — what and why`
- Priority order: security → correctness → performance → maintainability
- Skip anything a linter would already catch

**accessibility-reviewer** — triggered when the user asks for an accessibility audit:
- Read-only: never modify the repository
- Audit against WCAG 2.2 Level AA; note possible EU/Spain scope (Directive 2019/882, EN 301 549 v3.2.1) without assuming applicability
- If the code contains no user-facing interfaces, respond: "This request does not contain user-facing interfaces to review for accessibility." and stop
- Report each finding as: `[blocker|high|medium|low|manual-check] file:line — WCAG criterion, evidence, user impact, remediation`
- Never claim full WCAG conformance based on static code review alone
