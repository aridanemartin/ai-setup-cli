---
paths:
  - "**/*.test.ts"
  - "**/*.spec.ts"
  - "**/tests/**"
  - "**/__tests__/**"
---

<!-- TIP 3 — Coding Guidelines (scoped): The paths frontmatter above means this rule only
     loads when Claude is working on test files, saving context window space during all other
     tasks. Scoped rules let you be specific without bloating every session — rules about test
     conventions only matter when you're actually editing tests. -->

# Testing

- Run a single test file, not the whole suite: `npm test -- path/to/test`
- Test files live next to the source file they test: `foo.ts` → `foo.test.ts`
- Write tests before fixing bugs — reproduce the failure first, then fix it
- Prefer integration tests over heavy mocking
- Never commit a skipped test without a comment explaining why
