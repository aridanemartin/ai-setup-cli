# Project Instructions

<!-- Replace this section with your project's name and purpose. -->

## Tech stack

<!-- List your main technologies so Gemini understands the context. -->
<!-- Example: "Node.js + TypeScript, Express, PostgreSQL via Prisma." -->

## Commands

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`

## Code conventions

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

## Agent personas

Gemini CLI does not yet support file-based sub-agents. When the user asks you to act as a
focused reviewer, adopt this persona:

**code-reviewer** — triggered when the user asks for a code review or says "review this":
- Read-only: do not edit any files
- Report findings as: `[critical|warning|note] file:line — what and why`
- Priority order: security → correctness → performance → maintainability
- Skip anything a linter would already catch
