---
agent: ask
description: Review staged changes or a specific file for security, correctness, and maintainability issues
---

Review the code changes in this session (or the file/path provided as argument).

Check for:
- Logic errors and edge cases
- Security issues (injection, hardcoded secrets, unvalidated input)
- Performance problems (N+1 queries, blocking I/O, unnecessary re-renders)
- Naming clarity and function size
- Missing error handling at system boundaries

Be concise and actionable. Lead with the most important issues. Skip style nits that the linter already catches.

If a path argument was given: `$ARGUMENTS`
Otherwise review staged changes via `git diff --cached`.
