---
applyTo: "**/*.ts,**/*.tsx"
---

<!-- TIP 3 — Coding Guidelines (scoped): The applyTo frontmatter above means this file only
     loads when Copilot is editing TypeScript files. Scoping keeps rules focused: TypeScript
     conventions don't need to be in context during Markdown or YAML edits. This is how you
     stay specific without overwhelming the main instruction file. -->

## TypeScript conventions

- Use ES modules (`import`/`export`), not CommonJS
- Named exports only — no default exports
- Strict mode — no `any` without an explanatory comment
- `const` over `let`; never `var`
- Keep functions small; extract when a function exceeds ~40 lines
