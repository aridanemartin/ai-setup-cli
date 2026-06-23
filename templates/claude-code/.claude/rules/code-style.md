<!-- TIP 3 — Coding Guidelines: Rules here are concrete and verifiable — "use ES modules" is
     checkable; "write clean code" is not. If you've corrected the AI on the same issue twice,
     it belongs here as a rule. No paths frontmatter means this rule loads unconditionally
     at every session start, so keep it to cross-cutting conventions only. -->

# Code Style

- Use ES modules (`import`/`export`) not CommonJS
- Destructure imports: `import { foo } from 'bar'`
- Named exports only — no default exports
- `const` over `let`; never `var`
- Prefer early returns over nested conditionals
- No trailing whitespace; files end with a newline
