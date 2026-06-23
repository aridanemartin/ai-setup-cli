---
paths:
  - "**/*.test.*"
  - "**/*.spec.*"
  - "**/*_test.*"
  - "**/test_*.*"
  - "**/tests/**"
  - "**/__tests__/**"
---

<!-- This rule loads only when working on test files, keeping it out of context during all
     other tasks. If you add a testing convention, add it here — not in the main instruction
     file — so the rule stays focused and only loads when it's actually relevant. -->

# Testing

## Structure

- One concept per test — if a test needs the word "and" in its name, split it
- Name tests as full sentences describing behaviour: "returns empty list when input is blank"
- Follow Arrange → Act → Assert: set up state, execute the action, then verify the outcome
- Group related tests in descriptive suites or describe blocks

## What to test

- Test behaviour and observable contracts, not implementation details or internal state
- Cover the happy path, edge cases (empty, null, zero, boundary values), and error conditions
- Do not test framework or third-party library code — test what your code does with it
- Prefer testing at the highest level that still runs fast and deterministically

## Workflow

- Write a failing test before fixing a bug — confirm the test catches the defect before patching
- Run the single relevant test while iterating; only run the full suite before committing
- Never commit a skipped or disabled test without an inline comment explaining why and when it will be re-enabled

## Isolation and dependencies

- Each test must be independent — no test should rely on another test's output or side effects
- Avoid mocking internal modules; use real implementations or lightweight in-memory fakes
- Mock only at true system boundaries: external APIs, databases, clocks, file system, randomness
- Reset all shared state between tests — global variables, singletons, caches
