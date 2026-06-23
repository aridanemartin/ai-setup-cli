<!-- Windsurf reads AGENTS.md from the repo root as an always-on rule. -->
<!-- Files in subdirectories are scoped to that directory automatically. -->
<!-- Commit this file so all team members share the same agent context. -->

# Project

<!-- TIP 1 — Project Overview: Start with an elevator pitch. Windsurf can't write relevant
     code without knowing what the app does, who uses it, and what it's trying to achieve.
     Include purpose, audience, and key features in 2-4 sentences.
     Example: "B2B invoicing tool for freelancers. TypeScript monorepo — Node API + React
     web app. PDF generation via Puppeteer. Payments via Stripe." -->

## Tech Stack

<!-- TIP 2 — Name every layer with its version. Without this, Windsurf may suggest APIs
     from the wrong version or mix patterns from incompatible frameworks. Windsurf's Cascade
     flow scans established patterns in your codebase too, so the more explicit you are here
     the more consistently it follows your conventions.

     ### Backend
     - Node.js 20 + TypeScript 5 (strict)
     - Express 4 — REST API
     - PostgreSQL 16 via Prisma ORM

     ### Frontend
     - React 18 + Vite 5
     - Tailwind CSS 3

     ### Testing
     - Vitest — unit and integration tests
     - Playwright — end-to-end tests -->

## Architecture

<!-- Describe how your main components interact. This prevents Windsurf from creating
     duplicate abstractions or placing logic in the wrong layer.
     Example: "Express API → PostgreSQL via Prisma. React frontend in /web. Business logic
     lives in /src/services — no HTTP dependencies there." -->

## Commands

<!-- Give Windsurf exact commands. These are the verification signals it uses to confirm
     changes are correct. Without them it has no way to close the feedback loop. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Project Structure

<!-- TIP 4 — Map your directories. Without this Windsurf guesses where to place new files
     and may scatter code inconsistently. File-type-specific rules live in .windsurf/rules/
     and are loaded only when working on matching files — keeping this file lean.
     Example:
     - src/
       - api/       — Express routes and controllers
       - services/  — Business logic (no HTTP dependencies)
       - models/    — Prisma schema and types
     - web/         — React frontend
     - scripts/     — Dev automation (see Resources below)
     - tests/       — Integration and e2e tests -->

## Coding Conventions

<!-- TIP 3 — Spell out rules concretely. "Follow best practices" is not actionable. Each rule
     should be specific enough to verify. Cross-cutting rules go here; file-type-specific
     rules go in .windsurf/rules/ so they load only for relevant files. -->
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

<!-- TIP 5 — Point to scripts and MCP servers. Windsurf can use these to automate setup,
     testing, and deployment — but only if it knows they exist.
     Example:
     ### Scripts (in /scripts)
     - setup.sh      — Install dependencies and seed the database
     - test-all.sh   — Run unit, integration, and e2e suites
     - deploy.sh     — Build and push to staging

     ### MCP Servers (if configured in .mcp.json or Windsurf settings)
     - GitHub MCP    — Manage PRs and issues from the terminal
     - Playwright MCP — Drive the browser for end-to-end testing -->
