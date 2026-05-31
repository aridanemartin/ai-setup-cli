<!-- Windsurf reads AGENTS.md from the repo root as an always-on rule. -->
<!-- Files in subdirectories are scoped to that directory automatically. -->
<!-- Commit this file so all team members share the same agent context. -->

# Project

<!-- Replace with your project's name and a 1-2 sentence description. -->

## Architecture

<!-- Briefly describe the main components and how they interact. -->
<!-- Example: "Express API → PostgreSQL via Prisma. React frontend in /web." -->

## Commands

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Coding conventions

- ES modules, named exports, no default exports
- TypeScript strict mode — no `any` without comment
- Tests live next to source: `foo.ts` → `foo.test.ts`
- No hardcoded secrets — use environment variables

## Agent permissions

- Read all files freely
- Edit source files in `src/`
- Do not modify `package-lock.json`, `.env`, or CI config without asking
- Do not run destructive shell commands (`rm -rf`, `git reset --hard`) without asking
