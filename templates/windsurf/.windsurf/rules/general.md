---
trigger: always_on
---

<!-- TIP 3 — Coding Guidelines: trigger: always_on means this rule loads in every session.
     Keep it to cross-cutting conventions that apply to all files. File-type-specific rules
     belong in separate files with glob triggers so they only load when relevant, preserving
     context window space. -->

- Use ES modules (`import`/`export`), not CommonJS
- Named exports only — no default exports
- TypeScript strict mode — no `any` without an explanatory comment
- `const` over `let`; never `var`
- Keep functions small; extract when a function exceeds ~40 lines
- No hardcoded secrets — use environment variables
- No `console.log` in production code — use a logger
- Prefer early returns over nested conditionals
