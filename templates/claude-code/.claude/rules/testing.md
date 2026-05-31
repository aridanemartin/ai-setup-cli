# Testing

- Run a single test file, not the whole suite: `npm test -- path/to/test`
- Test files live next to the source file they test: `foo.ts` → `foo.test.ts`
- Write tests before fixing bugs (reproduce the bug first)
- Prefer integration tests over heavy mocking
- Never commit a skipped test without a comment explaining why
