---
applyTo: "**"
---

<!-- TIP 3 — Coding Guidelines (review): A dedicated review file means Copilot applies a
     consistent evaluation order rather than ad-hoc judgement. Separating it from other
     conventions also makes it easy to update the review process independently. -->

## Code review priorities

Evaluate changes in this order:
1. **Security** — no secrets, injection risks, auth bypass
2. **Correctness** — does the change actually fix the problem without breaking other things?
3. **Performance** — unnecessary loops, N+1 queries, large payloads
4. **Maintainability** — clear naming, single responsibility, appropriate abstractions

Report issues as `[critical|warning|note] file:line message`.
