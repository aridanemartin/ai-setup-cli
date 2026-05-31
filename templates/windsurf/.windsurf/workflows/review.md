# Code Review

Review the current branch or a specific file for security, correctness, and maintainability issues.

## Steps

1. Run `git diff main...HEAD` to see all changes on this branch (or read the file/path provided by the user)
2. Check for:
   - Security issues: injection vectors, exposed secrets, unvalidated input
   - Correctness: logic errors, unhandled edge cases, missing error handling
   - Performance: N+1 queries, blocking I/O in hot paths
   - Maintainability: unclear naming, functions over ~40 lines
3. Output one finding per bullet: `[critical|warning|note] file:line — what and why`
4. Skip style nits the linter already catches
5. End with a one-sentence summary: "X critical issues, Y warnings"
