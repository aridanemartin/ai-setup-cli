---
applyTo: "**/*.test.*,**/*.spec.*,**/tests/**,**/__tests__/**"
---

<!-- TIP 3 — Coding Guidelines (scoped): This file only loads when Copilot is editing test
     files. Scoping prevents testing conventions from appearing in context during unrelated
     tasks, and lets you be more prescriptive here without adding noise elsewhere. -->

## Testing conventions

- Test files live next to source: `foo.ts` → `foo.test.ts`
- Run a single test file, not the whole suite: `npm test -- path/to/test`
- Write the failing test before fixing a bug — reproduce first
- Prefer integration tests over heavy mocking
- Never commit a skipped test without a comment explaining why
- No assertions on implementation details — test behaviour, not internals
