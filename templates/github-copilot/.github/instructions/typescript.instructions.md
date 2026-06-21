## TypeScript conventions

- Use ES modules (`import`/`export`), not CommonJS
- Named exports only — no default exports
- Strict mode — no `any` without an explanatory comment
- `const` over `let`; never `var`
- Keep functions small; extract when a function exceeds ~40 lines