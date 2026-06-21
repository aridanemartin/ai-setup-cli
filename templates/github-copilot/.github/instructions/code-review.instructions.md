## Code review priorities

Evaluate changes in this order:
1. **Security** — no secrets, injection risks, auth bypass
2. **Correctness** — does the change actually fix the problem without breaking other things?
3. **Performance** — unnecessary loops, N+1 queries, large payloads
4. **Maintainability** — clear naming, single responsibility, appropriate abstractions

Report issues as `[critical|warning|note] file:line message`.