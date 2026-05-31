# Project

<!-- Replace this section with your project's name and a 1-2 sentence description. -->
<!-- Example: "This is a REST API for managing user accounts." -->

## Commands

<!-- Fill in your actual commands. -->
- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type-check: `npm run typecheck`

## Code Style

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
