---
trigger: glob
globs: **/*.test.ts, **/*.spec.ts
---

<!-- TIP 3 — Coding Guidelines (scoped): trigger: glob means this rule only loads when
     Windsurf is working on files matching the globs above. Testing conventions don't need
     to be in context during unrelated tasks — scoping keeps sessions focused. -->

- Test files live next to source: `foo.ts` → `foo.test.ts`
- Run a single test file, not the whole suite: `npm test -- path/to/test`
- Write the failing test before fixing a bug — reproduce first
- Prefer integration tests over heavy mocking
- Never commit a skipped test without a comment explaining why
- No assertions on implementation details — test behaviour, not internals
