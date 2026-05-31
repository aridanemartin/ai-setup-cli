---
trigger: always_on
---

- Use ES modules (`import`/`export`), not CommonJS
- Named exports only — no default exports
- TypeScript strict mode — no `any` without an explanatory comment
- `const` over `let`; never `var`
- Keep functions small; extract when a function exceeds ~40 lines
- No hardcoded secrets — use environment variables
- No `console.log` in production code — use a logger
- Prefer early returns over nested conditionals
